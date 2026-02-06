import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Crosshair,
  Github,
  Globe,
  Heart,
  MapPin,
  Search,
  Shield,
  Target
} from 'lucide-react';
import { useMemo, useState } from 'react';

import ForceGraph from '@/components/ForceGraph';
import { heroes } from '@/data/heroData';
import { getMapTypeColor, getMapTypeName, maps } from '@/data/mapData';

import { useI18n } from '@/i18n';
import './App.css';

function AppContent() {
  const { t, language, setLanguage } = useI18n();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [mapSearch, setMapSearch] = useState('');
  const [activeMapType, setActiveMapType] = useState<string>('all');
  const [isMapCopied, setIsMapCopied] = useState(false);

  const handleMapCopyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsMapCopied(true);
      setTimeout(() => setIsMapCopied(false), 2000);
    });
  };

  const mapTypes = [
    { id: 'all', name: language === 'zh' ? '全部' : 'All' },
    { id: 'control', name: language === 'zh' ? '占领' : 'Control' },
    { id: 'hybrid', name: language === 'zh' ? '混合' : 'Hybrid' },
    { id: 'escort', name: language === 'zh' ? '运载' : 'Escort' },
    { id: 'push', name: language === 'zh' ? '推进' : 'Push' },
    { id: 'flashpoint', name: language === 'zh' ? '闪点' : 'Flash' },
  ];

  const filteredMaps = useMemo(() => {
    let result = maps;
    if (activeMapType !== 'all') {
      result = result.filter(m => m.type === activeMapType);
    }
    if (mapSearch) {
      const search = mapSearch.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(search) || 
        m.nameEn.toLowerCase().includes(search)
      );
    }
    return result;
  }, [mapSearch, activeMapType]);

  const roles = [
    { id: 'tank', name: t('tank'), nameEn: 'Tank', icon: Shield, color: '#f59e0b' },
    { id: 'damage', name: t('damage'), nameEn: 'Damage', icon: Crosshair, color: '#ef4444' },
    { id: 'support', name: t('support'), nameEn: 'Support', icon: Heart, color: '#22c55e' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm z-50 flex-shrink-0">
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
                    <p className="text-[10px] text-white uppercase tracking-widest font-bold">{t('subtitle')}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-6 pl-8 border-l border-slate-800/50">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-cyan-400 font-mono tracking-tighter">{heroes.length}</span>
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">{t('totalHeroes')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-red-500 font-mono tracking-tighter">400+</span>
                      <span className="text-[9px] text-white uppercase tracking-widest font-bold">{t('counterRelations')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/30 hover:bg-slate-800 text-white hover:text-white gap-2 h-8 px-3 rounded-full transition-all" onClick={toggleLanguage}>
                  <Globe className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-xs font-bold">{language === 'zh' ? 'EN' : '中文'}</span>
                </Button>
                <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/30 hover:bg-slate-800 text-white hover:text-white h-8 w-8 p-0 rounded-full transition-all" onClick={() => window.open('https://github.com/cyrus123456/Overwatch-2-Hero-Counters', '_blank')}>
                  <Github className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-row overflow-hidden relative">
          {/* 左侧地图卡片面板 */}
          <div className="absolute left-4 top-4 bottom-4 z-10 flex flex-col w-[440px] pointer-events-none">
            <div className="flex-1 overflow-hidden pointer-events-auto h-full relative">
              <Card className="p-6 bg-slate-900/95 border-slate-700 backdrop-blur-sm shadow-xl h-full flex flex-col rounded-xl border border-slate-800/50">
                <div className="flex items-center justify-between mb-1 flex-shrink-0 border-b border-slate-700/50 pb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-slate-100 uppercase tracking-wide">{t('mapRecommendations')}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs border-slate-700 text-white font-mono px-3">
                    {filteredMaps.length}
                  </Badge>
                </div>

                {/* 地图搜索与分类 */}
                <div className="space-y-2 mb-1 flex-shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                    <Input 
                      placeholder={language === 'zh' ? "快速查找地图..." : "Search maps..."} 
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
                        className={`p-5 rounded-xl cursor-pointer transition-all border group ${
                          selectedMap === map.id 
                            ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-900/20' 
                            : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 shadow-sm'
                        }`} 
                        onClick={() => setSelectedMap(selectedMap === map.id ? null : map.id)}
                      >

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          {selectedMap === map.id ? (
                            <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white flex-shrink-0 transition-colors" />
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="text-base font-bold text-slate-100 truncate group-hover:text-cyan-400 transition-colors">
                              {language === 'zh' ? map.name : map.nameEn}
                            </span>
                            {selectedMap !== map.id && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {map.recommendedHeroes.map(heroId => {
                                  const hero = heroes.find(h => h.id === heroId);
                                  if (!hero) return null;
                                  return (
                                    <Tooltip key={heroId}>
                                      <TooltipTrigger asChild>
                                        <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-slate-900 flex-shrink-0 shadow-md cursor-help ring-1 ring-slate-800/50">
                                          <img src={hero.image} alt="" className="w-full h-full object-cover scale-110" />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent side="right" className="bg-slate-900 border-slate-700 p-3 max-w-[240px] z-[100] shadow-2xl rounded-lg backdrop-blur-xl">
                                        <div className="flex flex-col gap-1.5">
                                          <span className="text-sm font-black text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
                                            {language === 'zh' ? hero.name : hero.nameEn}
                                          </span>
                                         <p className="text-xs text-white leading-relaxed">
                                             {map.heroReasons[heroId]}
                                           </p>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs font-bold h-7 px-3 flex-shrink-0 border-slate-800 text-white group-hover:border-slate-700" 
                          style={{ color: getMapTypeColor(map.type), borderColor: `${getMapTypeColor(map.type)}44` }}
                        >
                          {getMapTypeName(map.type, language)}
                        </Badge>
                       </div>
                       {selectedMap === map.id && (
                         <div className="mt-5 pt-5 border-t border-slate-800/50 pl-6 space-y-3">
                           <div className="mb-2">
                             <span className="text-xs font-semibold text-white">{language === 'zh' ? '首发阵容' : 'Starting Lineup'}</span>
                            </div>
                             <div className="flex items-center justify-between">
                               <span className="text-[10px] text-white">{language === 'zh' ? '复制阵容发送到聊天框帮助队友选择英雄' : 'Copy lineup to chat to help teammates'}</span>
                               <Tooltip>
                                 <TooltipTrigger asChild>
                                   <div 
                                     className="cursor-pointer"
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       const heroNames = map.recommendedHeroes.map(heroId => {
                                         const hero = heroes.find(h => h.id === heroId);
                                         return hero ? (language === 'zh' ? hero.name : hero.nameEn) : '';
                                       }).filter(Boolean);
                                       
                                       const reasons = map.recommendedHeroes.map(heroId => {
                                         const hero = heroes.find(h => h.id === heroId);
                                         const reason = map.heroReasons[heroId];
                                         if (!hero || !reason) return '';
                                         return `${hero.name}: ${reason}`;
                                       }).filter(Boolean);
                                       
                                       const mapName = language === 'zh' ? map.name : map.nameEn;
                                       const text = `${mapName}\n${language === 'zh' ? '推荐首发阵容' : 'Recommended Lineup'}: ${heroNames.join('、')}\n\n${reasons.join('\n')}`;
                                       handleMapCopyToClipboard(text);
                                     }}
                                   >
                                     <Button 
                                       variant="ghost" 
                                       size="sm" 
                                       className="h-7 px-2 text-[10px] gap-1.5 hover:bg-slate-800 text-white hover:text-cyan-400"
                                     >
                                       {isMapCopied ? <Copy className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                       <span>{isMapCopied ? (language === 'zh' ? '已复制' : 'Copied') : (language === 'zh' ? '复制' : 'Copy')}</span>
                                     </Button>
                                   </div>
                                 </TooltipTrigger>
                                 <TooltipContent side="top" className="p-3 bg-slate-900 border-slate-700 max-w-lg z-[100]">
                                  <div className="space-y-2">
                                    <p className="text-xs font-bold text-cyan-400">{language === 'zh' ? '预览完整复制内容' : 'Preview Full Content'}</p>
                                    <div className="text-[10px] text-white whitespace-pre-wrap bg-slate-800 p-2 rounded max-h-64 overflow-y-auto">
                                      {(() => {
                                        const heroNames = map.recommendedHeroes.map(heroId => {
                                          const hero = heroes.find(h => h.id === heroId);
                                          return hero ? (language === 'zh' ? hero.name : hero.nameEn) : '';
                                        }).filter(Boolean);
                                        
                                        const reasons = map.recommendedHeroes.map(heroId => {
                                          const hero = heroes.find(h => h.id === heroId);
                                          const reason = map.heroReasons[heroId];
                                          if (!hero || !reason) return '';
                                          return `${language === 'zh' ? hero.name : hero.nameEn}: ${reason}`;
                                        }).filter(Boolean);
                                        
                                        const mapName = language === 'zh' ? map.name : map.nameEn;
                                         return `${mapName}\n${language === 'zh' ? '推荐首发阵容' : 'Recommended Lineup'}: ${heroNames.join('、')}\n\n${reasons.join('\n')}`;
                                       })()}
                                     </div>
                                   </div>
                                 </TooltipContent>
                               </Tooltip>
                             </div>
                            {map.recommendedHeroes.map(heroId => {
                              const hero = heroes.find(h => h.id === heroId);
                              if (!hero) return null;
                              return (
                                <div 
                                  key={heroId} 
                                  className="flex items-start gap-4 p-2.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-all border border-transparent hover:border-slate-700/50" 
                                  onClick={(e) => { e.stopPropagation(); setSelectedHero(heroId); }}
                                >
                                  <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-800 shadow-md flex-shrink-0 ring-1 ring-cyan-500/20">
                                    <img src={hero.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-slate-200 tracking-tight">{language === 'zh' ? hero.name : hero.nameEn}</p>
                                    <p className="text-[11px] text-white leading-tight mt-1 line-clamp-2 font-medium">{map.heroReasons[heroId] || ''}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 右侧可视化区域 */}
          <div className="flex-1 relative overflow-hidden bg-slate-950/20">
            {/* 顶部工具栏容器 - 筛选模块 视觉居中优化（对齐左右面板间隙） */}
            <div className="absolute top-6 left-[calc(50%+28px)] -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-700/50 p-1.5 rounded-full shadow-2xl pointer-events-auto">
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
                <span className="text-[11px] font-black uppercase tracking-widest">{t('allHeroes')}</span>
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
                  <span className="text-[11px] font-black uppercase tracking-widest">{language === 'zh' ? role.name : role.nameEn}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-1 text-[10px] h-4.5 px-2 font-mono font-black ${
                      selectedRole === role.id ? 'bg-white/20 text-white border-transparent' : 'bg-slate-900 text-white border-slate-800'
                    }`}
                  >
                    {heroes.filter(h => h.role === role.id).length}
                  </Badge>
                </Button>
              ))}
            </div>
            <ForceGraph selectedRole={selectedRole} selectedHero={selectedHero} onHeroSelect={setSelectedHero} />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
