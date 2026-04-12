import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Crosshair,
  Github,
  Globe,
  Heart,
  MapPin,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Target,
  Trash2,
  X
} from 'lucide-react';
import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getMapName, getMapTypeColor, getMapTypeName, maps } from '@/data/mapData';
import type { HeroId } from '@/data/heroData';
import useDebounce from '@/hooks/useDebounce';
import { sortByRole, useMemoizedHeroes } from '@/hooks/useMemoizedHeroes';

import type { Language } from '@/i18n';
import { useI18n } from '@/i18n';
import './App.css';

// 懒加载 ForceGraph 组件 (2703 行大组件，包含 D3.js 力导向图)
const ForceGraph = lazy(() => import('@/components/ForceGraph').then(m => ({ default: m.default })));

interface CustomMapHero {
  heroId: HeroId;
  reason: string;
}

const CUSTOM_MAP_HEROES_KEY = 'ow2-custom-map-heroes';
const DELETED_DEFAULT_HEROES_KEY = 'ow2-deleted-default-heroes';

function loadCustomMapHeroes(): Record<string, CustomMapHero[]> {
  try {
    const stored = localStorage.getItem(CUSTOM_MAP_HEROES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to load custom map heroes from localStorage');
  }
  return {};
}

function saveCustomMapHeroes(data: Record<string, CustomMapHero[]>): void {
  try {
    localStorage.setItem(CUSTOM_MAP_HEROES_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save custom map heroes to localStorage');
  }
}

function loadDeletedDefaultHeroes(): Record<string, HeroId[]> {
  try {
    const stored = localStorage.getItem(DELETED_DEFAULT_HEROES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to load deleted default heroes from localStorage');
  }
  return {};
}

function saveDeletedDefaultHeroes(data: Record<string, HeroId[]>): void {
  try {
    localStorage.setItem(DELETED_DEFAULT_HEROES_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save deleted default heroes to localStorage');
  }
}

/**
 * MapHeroAvatar - 独立的英雄头像组件
 * 使用 React.memo 避免不必要的重渲染
 */
const MapHeroAvatar = React.memo(({ 
  heroId, customHero, reason, language,
}: { 
  heroId: HeroId; 
  customHero: CustomMapHero | undefined; 
  reason: string;
  language: string;
}) => {
  const { getHero } = useMemoizedHeroes();
  const hero = getHero(heroId);
  if (!hero) return null;
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`w-[1.375rem] h-[1.375rem] rounded-full overflow-hidden border flex-shrink-0 shadow-md cursor-help ring-1 ${customHero ? 'border-cyan-500/50 ring-cyan-500/30' : 'border-slate-900 ring-slate-800/50'}`}>
          <img src={hero.image} alt="" className="w-full h-full object-cover scale-110" loading="lazy" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-slate-900 border-slate-700 p-3 max-w-[15rem] z-[100] shadow-2xl rounded-lg backdrop-blur-xl">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-black text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
            {language === 'zh' ? hero.name : hero.nameEn}
          </span>
          <p className="text-xs text-white leading-relaxed">{reason}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});
MapHeroAvatar.displayName = 'MapHeroAvatar';

/** 预计算的地图英雄列表（带 memo） */
const MapHeroesList = React.memo(({
  defaultHeroes,
  customMapHeroesForMap,
  deletedDefaultForMap,
  language,
}: {
  defaultHeroes: HeroId[];
  customMapHeroesForMap: CustomMapHero[];
  deletedDefaultForMap: HeroId[];
  language: string;
}) => {
  const { getHero } = useMemoizedHeroes();
  
  // 合并并去重英雄列表
  const actualHeroes = useMemo(() => {
    const filteredDefaults = defaultHeroes.filter(id => !deletedDefaultForMap.includes(id));
    const customIds = customMapHeroesForMap.map(ch => ch.heroId);
    return [...new Set([...filteredDefaults, ...customIds])];
  }, [defaultHeroes, customMapHeroesForMap, deletedDefaultForMap]);
  
  // 按角色排序
  const sortedHeroes = useMemo(() => {
    return sortByRole(actualHeroes.map(id => getHero(id)).filter((h): h is NonNullable<typeof h> => h !== undefined));
  }, [actualHeroes, getHero]);
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {sortedHeroes.map(hero => {
        const customHero = customMapHeroesForMap.find(ch => ch.heroId === hero.id);
        const reason = customHero?.reason || '';
        return (
          <MapHeroAvatar 
            key={hero.id} 
            heroId={hero.id} 
            customHero={customHero} 
            reason={reason} 
            language={language}
          />
        );
      })}
    </div>
  );
});
MapHeroesList.displayName = 'MapHeroesList';

function AppContent() {
  const { t, language, setLanguage } = useI18n();
  const { getHero, heroes } = useMemoizedHeroes();
  
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedHeroes, setSelectedHeroes] = useState<HeroId[]>([]);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [mapSearch, setMapSearch] = useState('');
  const debouncedMapSearch = useDebounce(mapSearch, 300);
  const [activeMapType, setActiveMapType] = useState<string>('all');
const [isMapCopied, setIsMapCopied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [hoverTimer, setHoverTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const [customMapHeroes, setCustomMapHeroes] = useState<Record<string, CustomMapHero[]>>({});
  const [deletedDefaultHeroes, setDeletedDefaultHeroes] = useState<Record<string, HeroId[]>>({});
  const [newHeroId, setNewHeroId] = useState<HeroId | ''>('');
  const [newHeroReason, setNewHeroReason] = useState<string>('');
  const [addingHeroMapId, setAddingHeroMapId] = useState<string | null>(null);
  const addHeroFormRef = useRef<HTMLDivElement>(null);

  // 移动端全屏 / PWA 提示弹框状态
  const [showMobileDialog, setShowMobileDialog] = useState(false);
  const [mobileDialogType, setMobileDialogType] = useState<'fullscreen' | 'pwa'>('fullscreen');

  // 移动端检测：兼容 iPadOS 桌面模式（UA 显示为 Mac）
  const isMobile = typeof window !== 'undefined' && (() => {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod/i.test(ua)) return true;
    if (/Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints >= 5) return true;
    return false;
  })();

  useEffect(() => {
    if (selectedMap) {
      const element = document.getElementById(`map-${selectedMap}`);
      if (element) {
        // Use a small timeout to ensure DOM has updated if expansion is animated or takes space
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [selectedMap]);

  // 检测是否需要显示全屏或PWA安装提示
  useEffect(() => {
    if (!isMobile) return;

    const ua = navigator.userAgent;
    const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|OPR/.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
      || (/Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints >= 5);

    // iOS Safari: 检测 PWA 全屏模式 (standalone)
    if (isSafari || isIOS) {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
        || (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      if (!isInStandaloneMode) {
        setMobileDialogType('pwa');
        setShowMobileDialog(true);
      }
      return;
    }

    // Android: 检测全屏模式
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    const isFullscreen = doc.fullscreenElement !== null
      || doc.webkitFullscreenElement !== null;

    if (!isFullscreen) {
      setMobileDialogType('fullscreen');
      setShowMobileDialog(true);
    }
  }, [isMobile]);

  const handleEnterFullscreen = () => {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else {
        const el = elem as HTMLElement & { webkitRequestFullscreen?: () => void };
        if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      }
    } catch {
      console.error('Failed to enter fullscreen');
    }
    setShowMobileDialog(false);
  };

  const handleDismissMobileDialog = () => {
    setShowMobileDialog(false);
  };

  useEffect(() => {
    const loaded = loadCustomMapHeroes();
    setCustomMapHeroes(loaded);
    const deleted = loadDeletedDefaultHeroes();
    setDeletedDefaultHeroes(deleted);
  }, []);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const addCustomHero = (mapId: string, heroId: HeroId, reason: string) => {
    if (!heroId.trim()) return;
    setCustomMapHeroes(prev => {
      const updated = {
        ...prev,
        [mapId]: [...(prev[mapId] || []), { heroId, reason }],
      };
      saveCustomMapHeroes(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
    setNewHeroId('');
    setNewHeroReason('');
    setAddingHeroMapId(null);
  };

  const removeCustomHero = (mapId: string, index: number) => {
    setCustomMapHeroes(prev => {
      const mapHeroes = prev[mapId] || [];
      const updated = {
        ...prev,
        [mapId]: mapHeroes.filter((_, i) => i !== index),
      };
      saveCustomMapHeroes(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  const deleteDefaultHero = (mapId: string, heroId: HeroId) => {
    setDeletedDefaultHeroes(prev => {
      const updated = {
        ...prev,
        [mapId]: [...(prev[mapId] || []), heroId],
      };
      saveDeletedDefaultHeroes(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  const resetMapToDefault = (mapId: string) => {
    setCustomMapHeroes(prev => {
      const updated = { ...prev };
      delete updated[mapId];
      saveCustomMapHeroes(updated);
      return updated;
    });
    setDeletedDefaultHeroes(prev => {
      const updated = { ...prev };
      delete updated[mapId];
      saveDeletedDefaultHeroes(updated);
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  const exportData = useCallback(() => {
    const data = {
      customMapHeroes,
      deletedDefaultHeroes,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ow2-hero-recommendations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setHasUnsavedChanges(false);
  }, [customMapHeroes, deletedDefaultHeroes]);

  const importData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.customMapHeroes) {
          setCustomMapHeroes(data.customMapHeroes);
          saveCustomMapHeroes(data.customMapHeroes);
        }
        if (data.deletedDefaultHeroes) {
          setDeletedDefaultHeroes(data.deletedDefaultHeroes);
          saveDeletedDefaultHeroes(data.deletedDefaultHeroes);
        }
        setHasUnsavedChanges(false);
        alert(t('importSuccess'));
      } catch {
        alert(t('importError'));
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, [t]);

  const clearAllData = useCallback(() => {
    if (confirm(t('confirmClearAll'))) {
      setCustomMapHeroes({});
      setDeletedDefaultHeroes({});
      saveCustomMapHeroes({});
      saveDeletedDefaultHeroes({});
      setHasUnsavedChanges(false);
    }
  }, [t]);

  const mapDataActions = useMemo(() => ({
    exportMapData: exportData,
    importMapData: importData,
    clearAllMapData: clearAllData,
    hasMapUnsavedChanges: hasUnsavedChanges,
  }), [exportData, importData, clearAllData, hasUnsavedChanges]);

  const sortHeroesByRole = useCallback((heroIds: HeroId[]): HeroId[] => {
    return sortByRole(heroIds.map(id => getHero(id)).filter((h): h is Exclude<typeof h, undefined> => h !== undefined)).map(h => h.id);
  }, [getHero]);
  
  const sanitizeTextSimple = (text: string): string => {
    return text
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/、/g, ', ')
      .replace(/：/g, ':')
      .replace(/:/g, ':')
      .replace(/→/g, '->')
      .replace(/●/g, '*')
      .replace(/【/g, '[')
      .replace(/】/g, ']')
      .replace(/《/g, '[')
      .replace(/》/g, ']')
      .replace(/「/g, '"')
      .replace(/」/g, '"')
      .replace(/『/g, '"')
      .replace(/』/g, '"')
      .replace(/——/g, '-')
      .replace(/…/g, '...')
      .replace(/　/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const sanitizeMapTextChinese = (text: string): string => {
    return text
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/、/g, ', ')
      .replace(/：/g, ': ')
      .replace(/:/g, ': ')
      .replace(/→/g, '->')
      .replace(/●/g, '*')
      .replace(/【/g, '[')
      .replace(/】/g, ']')
      .replace(/《/g, '[')
      .replace(/》/g, ']')
      .replace(/——/g, '-')
      .replace(/…/g, '...')
      .replace(/　/g, ' ')
      .replace(/\n/g, ' | ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleMapCopyToClipboard = (text: string) => {
    if (!text) return;
    const sanitized = language === 'zh' ? sanitizeMapTextChinese(text) : sanitizeTextSimple(text);
    navigator.clipboard.writeText(sanitized).then(() => {
      setIsMapCopied(true);
      setTimeout(() => setIsMapCopied(false), 2000);
    });
  };

  const mapTypes = [
    { id: 'all', name: t('all') },
    { id: 'control', name: t('control') },
    { id: 'hybrid', name: t('hybrid') },
    { id: 'escort', name: t('escort') },
    { id: 'push', name: t('push') },
    { id: 'flashpoint', name: t('flashpoint') },
  ];

  const filteredMaps = useMemo(() => {
    let result = maps;
    if (activeMapType !== 'all') {
      result = result.filter(m => m.type === activeMapType);
    }
    if (debouncedMapSearch) {
      const search = debouncedMapSearch.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(search) || 
        m.nameEn.toLowerCase().includes(search)
      );
    }
    return result;
  }, [debouncedMapSearch, activeMapType]);

  const roles = [
    { id: 'tank', name: t('tank'), nameEn: 'Tank', icon: Shield, color: '#f59e0b' },
    { id: 'damage', name: t('damage'), nameEn: 'Damage', icon: Crosshair, color: '#ef4444' },
    { id: 'support', name: t('support'), nameEn: 'Support', icon: Heart, color: '#22c55e' },
  ];

  const languages: { value: Language; nativeName: string }[] = [
    { value: 'zh', nativeName: '中文' },
    { value: 'en', nativeName: 'English' },
    { value: 'ja', nativeName: '日本語' },
    { value: 'ko', nativeName: '한국어' },
    { value: 'zh-TW', nativeName: '繁體中文' },
    { value: 'es', nativeName: 'Español' },
    { value: 'fr', nativeName: 'Français' },
    { value: 'de', nativeName: 'Deutsch' },
    { value: 'pt', nativeName: 'Português' },
    { value: 'ru', nativeName: 'Русский' },
    { value: 'it', nativeName: 'Italiano' },
  ];

  return (
    <TooltipProvider>
      <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-800/60 backdrop-blur-sm z-50 flex-shrink-0">
          <div className="w-full px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-300/50 overflow-hidden">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-8 h-8"
                      aria-labelledby="blz-icon-title-overwatch"
                    >
                      <title id="blz-icon-title-overwatch">Overwatch</title>
                      <path fill="#ED6516" d="M13.9 13.901a14.284 14.284 0 0 1 20.2 0l4.043-4.042a20 20 0 0 0-28.286 0z"></path>
                      <path fill="#333E48" d="m39.312 11.135-4.063 4.062a14.29 14.29 0 0 1 .995 16.159L28.891 24l-4.006-9.413h-.02V27.31l7.938 7.938a14.29 14.29 0 0 1-17.606 0l7.939-7.938V14.636l-4.027 9.365-7.355 7.355a14.29 14.29 0 0 1 .997-16.159l-4.063-4.062a20.001 20.001 0 1 0 30.624 0"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent leading-none mb-1">
                      {t('title')}
                    </h1>
                    <p className="text-[0.625rem] text-white uppercase tracking-widest font-bold">{t('subtitle')}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-6 pl-8 border-l border-slate-800/50">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-cyan-400 font-mono tracking-tighter">{heroes.length}</span>
                      <span className="text-[0.5625rem] text-white uppercase tracking-widest font-bold">{t('totalHeroes')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-red-500 font-mono tracking-tighter">400+</span>
                      <span className="text-[0.5625rem] text-white uppercase tracking-widest font-bold">{t('counterRelations')}</span>
                    </div>
                  </div>
                </div>
              </div>
               
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 whitespace-nowrap">{t('selectLanguage')}</span>
                    <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                      <SelectTrigger className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white h-8 px-3 rounded-full transition-all data-[state=open]:bg-slate-700 flex items-center gap-2 min-w-[6.25rem]">
                        <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="truncate text-xs">{languages.find(l => l.value === language)?.nativeName}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white" position="popper">
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="focus:bg-cyan-500/30 hover:bg-cyan-500/20 cursor-pointer py-2 px-3 text-white transition-colors data-[highlighted]:text-cyan-300">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-xs">{lang.nativeName}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/30 hover:bg-slate-800 text-white hover:text-white gap-2 h-8 px-3 rounded-full transition-all" onClick={() => window.open('https://github.com/cyrus123456/Overwatch-2-Hero-Counters', '_blank')}>
                  <Github className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{t('github')}</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-row overflow-hidden relative">
{/* 左侧地图卡片面板 - 抽屉 */}
          <div className={`absolute top-4 bottom-4 left-4 z-10 flex flex-col w-96 pointer-events-none transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-80'}`}>
            {/* 抽屉Toggle按钮 - 放在面板右侧外面 */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className="absolute -right-[2.375rem] top-1/2 -translate-y-1/2 z-20 w-7 h-14 bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group pointer-events-auto"
                >
                  <ChevronLeft className={`w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-transform duration-200 ${isDrawerOpen ? '' : 'rotate-180'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDrawerOpen ? '收起面板' : '展开面板'}</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex-1 overflow-hidden pointer-events-auto h-full relative">
              <Card className="p-3 bg-slate-800/60 border-slate-700 backdrop-blur-md shadow-xl h-full flex flex-col gap-1 rounded-xl border">
                <div className="flex items-center justify-between flex-shrink-0 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wide max-w-[10.625rem] break-words leading-tight">{t('mapRecommendations')}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href="https://wj.qq.com/s2/25861398/c38c/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-400 underline-offset-2 transition-all max-w-[6.25rem] break-words leading-tight"
                    >
                      {t('mapHeroSurvey')}
                    </a>
                    <Badge variant="outline" className="text-xs border-slate-700 text-white font-mono px-3 flex-shrink-0">
                      {filteredMaps.length}
                    </Badge>
                  </div>
                </div>

                {/* 地图搜索与分类 */}
                <div className="space-y-2 mb-1 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                     <Input 
                       placeholder={t('searchMapsPlaceholder')} 
                      className="h-11 pl-11 bg-slate-950/60 border-slate-800 text-white text-sm rounded-lg focus-visible:ring-cyan-500/30 placeholder:text-white transition-all" 
                      value={mapSearch} 
                      onChange={(e) => setMapSearch(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {mapTypes.map(type => (
                      <button 
                        key={type.id} 
                        onClick={() => setActiveMapType(type.id)} 
                        className={`px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 ${
                          activeMapType === type.id 
                            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20 scale-105' 
                            : 'bg-slate-800/50 text-white hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                  {/* 可滚动的地图列表 */}
                  <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1 pb-4">
                    {filteredMaps.map(map => (
                      <div 
                        key={map.id} 
                        id={`map-${map.id}`}
                        className={`p-2 rounded-xl cursor-pointer transition-all border group ${
                          selectedMap === map.id 
                            ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-900/20' 
                            : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 shadow-sm'
                        }`} 
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.closest('[data-prevent-map-toggle]')) return;
                          setSelectedMap(selectedMap === map.id ? null : map.id);
                        }}
                        onMouseEnter={() => {
                          if (hoverTimer) {
                            clearTimeout(hoverTimer);
                          }

                          // 如果当前地图已经是展开状态，则不执行任何操作
                          if (selectedMap === map.id) return;
                          
                          // 设置新的倒计时
                          const timer = setTimeout(() => {
                            setSelectedMap(map.id);
                            setHoverTimer(null);
                          }, 3000);
                          
                          setHoverTimer(timer);
                        }}
                        onMouseLeave={() => {
                          // 鼠标移出时取消倒计时
                          if (hoverTimer) {
                            clearTimeout(hoverTimer);
                            setHoverTimer(null);
                          }
                        }}
                        >
                        {/* onMouseLeave={() => setSelectedMap(null)} */}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          {selectedMap === map.id ? (
                            <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white flex-shrink-0 transition-colors" />
                          )}
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-slate-100 truncate group-hover:text-cyan-400 transition-colors">
                                  {getMapName(map, language)}
                                </span>
                                {selectedMap === map.id && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-700 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); resetMapToDefault(map.id); }}
                                      >
                                        <RotateCcw className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-400" />
                                        <span className="text-xs text-slate-400 hover:text-cyan-400">{t('resetMapDefault')}</span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-slate-900 border-slate-700 p-2 z-[100]">
                                      <p className="text-xs text-white">{t('resetMapDefaultTip')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              <Badge 
                                variant="outline" 
                                className="text-xs font-bold h-7 px-3 flex-shrink-0 border-slate-800 text-white group-hover:border-slate-700 ml-2" 
                                style={{ color: getMapTypeColor(map.type), borderColor: `${getMapTypeColor(map.type)}44` }}
                              >
                                {getMapTypeName(map.type, language)}
                              </Badge>
                            </div>
                            {selectedMap !== map.id && (
                              <MapHeroesList
                                defaultHeroes={map.recommendedHeroes}
                                customMapHeroesForMap={customMapHeroes[map.id] || []}
                                deletedDefaultForMap={deletedDefaultHeroes[map.id] || []}
                                language={language}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                        {selectedMap === map.id && (
                          <div className="mt-2 pt-1 border-t border-slate-800/50 pl-6 space-y-3">
                            {map.description && (
                              <div className="mb-2 text-xs text-slate-400">
                                {map.description[language] || map.description.en || ''}
                              </div>
                            )}
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-white">{t('startingLineup')}</span>
                                <span className="text-[0.625rem] text-slate-400">{t('copyLineupTip')}</span>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className="cursor-pointer"
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         const sortedHeroes = sortHeroesByRole(map.recommendedHeroes);
                                         
                                         const heroNames = sortedHeroes.map(heroId => {
                                           const hero = getHero(heroId);
                                           return hero ? (language === 'zh' ? hero.name : hero.nameEn) : '';
                                         }).filter(Boolean);
                                         
                                         const reasons = sortedHeroes.map(heroId => {
                                           const hero = getHero(heroId);
                                           const reason = map.heroReasons[heroId];
                                           if (!hero || !reason) return '';
                                           const heroName = language === 'zh' ? hero.name : hero.nameEn;
                                           const reasonText = reason[language] || reason.en || reason.zh || '';
                                           return `${heroName}: ${sanitizeMapTextChinese(reasonText)}`;
                                         }).filter(Boolean);
                                         
                                          const mapName = getMapName(map, language);
                                          const mapDesc = map.description?.[language] || map.description?.en || '';
                                          const text = `${mapName} - ${mapDesc} | ${t('recommendedLineup')}: ${heroNames.join(', ')} | ${reasons.join(' | ')}`;
                                         handleMapCopyToClipboard(text);
                                       }}
                                   >
                                     <Button 
                                       variant="ghost" 
                                       size="sm" 
                                       className="h-7 px-2 text-[0.625rem] gap-1.5 hover:bg-slate-800 text-white hover:text-cyan-400"
                                     >
                                       {isMapCopied ? <Copy className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{isMapCopied ? t('copied') : t('copy')}</span>
                                     </Button>
                                   </div>
                                 </TooltipTrigger>
                                  <TooltipContent side="top" className="p-3 bg-slate-900 border-slate-700 max-w-lg z-[100]">
                                   <div className="space-y-2">
                                      <p className="text-xs font-bold text-cyan-400">{t('previewContent')}</p>
                                       <div className="text-[0.625rem] text-white whitespace-pre-wrap bg-slate-800 p-2 rounded max-h-64 overflow-y-auto">
                                         {(() => {
                                           const sortedHeroes = sortHeroesByRole(map.recommendedHeroes);
                                           const heroNames = sortedHeroes.map(heroId => {
                                             const hero = getHero(heroId);
                                             return hero ? (language === 'zh' ? hero.name : hero.nameEn) : '';
                                           }).filter(Boolean);
                                            
                                           const reasons = sortedHeroes.map(heroId => {
                                             const hero = getHero(heroId);
                                             const reason = map.heroReasons[heroId];
                                             if (!hero || !reason) return '';
                                             const heroName = language === 'zh' ? hero.name : hero.nameEn;
                                             const reasonText = reason[language] || reason.en || reason.zh || '';
                                             return `${heroName}: ${sanitizeMapTextChinese(reasonText)}`;
                                           }).filter(Boolean);
                                            
                                             const mapName = getMapName(map, language);
                                             const mapDesc = map.description?.[language] || map.description?.en || '';
                                             const preview = `${mapName} - ${mapDesc} | ${t('recommendedLineup')}: ${heroNames.join(', ')} | ${reasons.join(' | ')}`;
                                             return preview;
                                          })()}
                                       </div>
                                    </div>
                                  </TooltipContent>
                               </Tooltip>
                             </div>
                              <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-2">
                              {sortHeroesByRole(map.recommendedHeroes).filter(heroId => !(deletedDefaultHeroes[map.id] || []).includes(heroId)).map(heroId => {
                                const hero = getHero(heroId);
                                if (!hero) return null;
                                if (!hero) return null;
                                const roleColors = {
                                  tank: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                  damage: 'bg-red-500/20 text-red-400 border-red-500/30',
                                  support: 'bg-green-500/20 text-green-400 border-green-500/30',
                                };
                                const roleNames = {
                                  tank: t('tank'),
                                  damage: t('damage'),
                                  support: t('support'),
                                };
                                return (
                                  <div 
                                    key={heroId} 
                                    className="flex items-start gap-4 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer transition-all border border-slate-600/30 hover:border-slate-500/50" 
                                    onClick={(e) => { e.stopPropagation(); setSelectedHeroes([heroId]); }}
                                  >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shadow-md flex-shrink-0 ring-1 ring-cyan-500/30">
                                      <img src={hero.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-black text-slate-200 tracking-tight">{language === 'zh' ? hero.name : hero.nameEn}</p>
                                        <span className={`text-[0.625rem] px-1.5 py-0.5 rounded border font-medium ${roleColors[hero.role]}`}>
                                          {roleNames[hero.role]}
                                        </span>
                                      </div>
                                      <p className="text-[0.6875rem] text-slate-300 leading-relaxed mt-1">{map.heroReasons[heroId]?.[language] || map.heroReasons[heroId]?.en || ''}</p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                      onClick={(e) => { e.stopPropagation(); deleteDefaultHero(map.id, heroId); }}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                );
                              })}
                              {sortHeroesByRole((customMapHeroes[map.id] || []).map(ch => ch.heroId)).map((heroId) => {
                                const customHero = (customMapHeroes[map.id] || []).find(ch => ch.heroId === heroId);
                                if (!customHero) return null;
                                const hero = getHero(heroId);
                                if (!hero) return null;
                                const originalIndex = (customMapHeroes[map.id] || []).findIndex(ch => ch.heroId === heroId);
                                const roleColors = {
                                  tank: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                  damage: 'bg-red-500/20 text-red-400 border-red-500/30',
                                  support: 'bg-green-500/20 text-green-400 border-green-500/30',
                                };
                                const roleNames = {
                                  tank: t('tank'),
                                  damage: t('damage'),
                                  support: t('support'),
                                };
                                return (
                                  <div
                                    key={`custom-${heroId}`}
                                    className="flex items-start gap-4 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer transition-all border border-cyan-600/30 hover:border-cyan-500/50"
                                    onClick={(e) => { e.stopPropagation(); setSelectedHeroes([heroId]); }}
                                  >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shadow-md flex-shrink-0 ring-1 ring-cyan-500/30">
                                      <img src={hero.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-black text-slate-200 tracking-tight">{language === 'zh' ? hero.name : hero.nameEn}</p>
                                        <span className={`text-[0.625rem] px-1.5 py-0.5 rounded border font-medium ${roleColors[hero.role]}`}>
                                          {roleNames[hero.role]}
                                        </span>
                                        <Badge variant="outline" className="text-[0.5625rem] px-1 py-0 text-white border-white/50 bg-white/10">
                                          {t('custom')}
                                        </Badge>
                                      </div>
                                      <p className="text-[0.6875rem] text-slate-300 leading-relaxed mt-1">{customHero.reason}</p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                      onClick={(e) => { e.stopPropagation(); removeCustomHero(map.id, originalIndex); }}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                );
                              })}
                              {addingHeroMapId === map.id ? (
                                <div ref={addHeroFormRef} data-prevent-map-toggle className="flex flex-col gap-2 p-3 rounded-lg bg-slate-700/50 border border-cyan-500/30">
                                  <Select value={newHeroId} onValueChange={(value) => setNewHeroId(value as HeroId)}>
                                    <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                      <span className={newHeroId ? 'text-white' : 'text-slate-400'}>
                                        {newHeroId ? (language === 'zh' ? getHero(newHeroId)!.name : getHero(newHeroId)!.nameEn) : t('selectHero')}
                                      </span>
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-slate-800 border-slate-600 max-h-60 z-[9999]">
                                      {(() => {
                                        const existingHeroIds = new Set([
                                          ...map.recommendedHeroes.filter(id => !(deletedDefaultHeroes[map.id] || []).includes(id)),
                                          ...(customMapHeroes[map.id] || []).map(ch => ch.heroId)
                                        ]);
                                        return heroes.filter(h => !existingHeroIds.has(h.id)).map(h => (
                                          <SelectItem key={h.id} value={h.id} className="text-white hover:bg-slate-700">
                                            <div className="flex items-center gap-2">
                                            <img src={h.image} alt="" className="w-5 h-5 rounded-full" />
                                            <span>{language === 'zh' ? h.name : h.nameEn}</span>
                                          </div>
                                        </SelectItem>
                                      ));
                                      })()}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    value={newHeroReason}
                                    onChange={(e) => setNewHeroReason(e.target.value)}
                                    placeholder={t('enterReason')}
                                    className="h-8 bg-slate-800 border-slate-600 text-sm text-white placeholder:text-slate-400"
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs text-slate-400 hover:text-white"
                                      onClick={(e) => { e.stopPropagation(); setAddingHeroMapId(null); setNewHeroId(''); setNewHeroReason(''); }}
                                    >
                                      <X className="w-3 h-3 mr-1" />
                                      {t('cancel')}
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="h-7 px-2 text-xs bg-cyan-600 hover:bg-cyan-700"
                                      onClick={(e) => { e.stopPropagation(); if (newHeroId) addCustomHero(map.id, newHeroId, newHeroReason); }}
                                      disabled={!newHeroId}
                                    >
                                      <Plus className="w-3 h-3 mr-1" />
                                      {t('add')}
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-600 hover:border-cyan-500 text-white hover:text-cyan-400 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setAddingHeroMapId(map.id);
                                    // 延迟滚动以确保 DOM 已更新
                                    setTimeout(() => {
                                      addHeroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }, 50);
                                  }}
                                >
                                  <Plus className="w-4 h-4" />
                                  <span className="text-xs">{t('addHero')}</span>
                                </button>
                              )}
                              </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 右侧可视化区域 */}
          {/* 右侧可视化区域 */}
          <div className="flex-1 relative overflow-hidden bg-slate-950/20">
            {/* 顶部工具栏容器 - 筛选模块 视觉居中优化（对齐左右面板间隙） */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-800/60 backdrop-blur-md border border-slate-700 p-1.5 rounded-full shadow-2xl pointer-events-auto">
              <Button 
                variant={selectedRole === null ? 'default' : 'ghost'} 
                size="sm" 
                className={`rounded-full px-5 gap-2 transition-all duration-300 h-9 ${
                  selectedRole === null 
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40 scale-105' 
                    : 'text-white hover:text-white hover:bg-slate-800'
                }`} 
                onClick={() => setSelectedRole(null)}
              >
                <Target className="w-4 h-4" />
                <span className="text-[0.6875rem] font-black uppercase tracking-widest">{t('allHeroes')}</span>
              </Button>
              <div className="w-px h-4 bg-slate-800 mx-1" />
              {roles.map(role => (
                <Button 
                  key={role.id} 
                  variant={selectedRole === role.id ? 'default' : 'ghost'} 
                  size="sm" 
                  className={`rounded-full px-5 gap-2 transition-all duration-300 h-9 ${
                    selectedRole === role.id 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40 scale-105' 
                      : 'text-white hover:text-white hover:bg-slate-800'
                  }`} 
                  onClick={() => setSelectedRole(role.id)}
                >
                  <role.icon className="w-4 h-4" style={{ color: selectedRole === role.id ? '#fff' : role.color }} />
                  <span className="text-[0.6875rem] font-black uppercase tracking-widest">{role.name}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-1 text-[0.625rem] h-4.5 px-2 font-mono font-black ${
                      selectedRole === role.id ? 'bg-white/20 text-white border-transparent' : 'bg-slate-900 text-white border-slate-800'
                    }`}
                  >
                    {heroes.filter(h => h.role === role.id).length}
                  </Badge>
                </Button>
              ))}
            </div>
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400">{t('loading')}</p>
                </div>
              </div>
            }>
            <ForceGraph 
              selectedRole={selectedRole} 
              selectedHeroes={selectedHeroes} 
              onHeroSelect={setSelectedHeroes} 
              isDrawerOpen={isDrawerOpen} 
              selectedMap={selectedMap}
              customMapHeroes={customMapHeroes}
              deletedDefaultHeroes={deletedDefaultHeroes}
              mapDataActions={mapDataActions}
            />
            </Suspense>
          </div>
        </main>

        {/* 移动端全屏 / PWA 提示弹框 */}
        {showMobileDialog && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <Card className="max-w-sm w-full p-6 bg-slate-800/95 border border-slate-700 shadow-2xl text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  {mobileDialogType === 'pwa' ? (
                    <Globe className="w-8 h-8 text-cyan-400" />
                  ) : (
                    <Target className="w-8 h-8 text-cyan-400" />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-100">
                {mobileDialogType === 'pwa' ? t('mobilePwaTitle') : t('mobileFullscreenTitle')}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {mobileDialogType === 'pwa' ? t('mobilePwaDesc') : t('mobileFullscreenDesc')}
              </p>

              <div className="flex gap-3 justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDismissMobileDialog}
                  className="border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white px-5"
                >
                  {t('later')}
                </Button>
                <Button
                  size="sm"
                  onClick={handleEnterFullscreen}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 font-bold gap-2 shadow-lg shadow-cyan-900/30"
                >
                  {mobileDialogType === 'pwa' ? t('gotIt') : t('enterFullscreen')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;