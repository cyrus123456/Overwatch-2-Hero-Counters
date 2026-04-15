import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCounterReason } from '@/data/counterReasons';
import { counterRelations, getHeroName, getRoleName, heroes, type Hero, type HeroId, type RelationStrength, type Role } from '@/data/heroData';
import { maps } from '@/data/mapData';
import { getSynergyReason } from '@/data/synergyReasons';
import { synergyRelations } from '@/data/synergyRelations';
import useDebounce from '@/hooks/useDebounce';
import { useMemoizedHeroes } from '@/hooks/useMemoizedHeroes';
import { useRelationMaps } from '@/hooks/useRelationMaps';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/utils';
import * as d3 from 'd3';
import {
  Check,
  ChevronLeft,
  Copy,
  FileText,
  HelpCircle,
  History,
  Info,
  MonitorDown,
  Plus,
  RotateCcw,
  Save,
  Search,
  ShieldAlert,
  Swords,
  Trash2,
  Users,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface NodeDatum extends d3.SimulationNodeDatum {
  id: HeroId;
  name: string;
  nameEn: string;
  role: Role;
  color: string;
  image: string;
  radius: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  source: HeroId | NodeDatum;
  target: HeroId | NodeDatum;
}

interface CustomMapHero {
  heroId: HeroId;
  reason: string;
}

// 自定义克制关系数据结构
interface CustomCounterRelation {
  source: HeroId;
  target: HeroId;
  strength: RelationStrength;
  isCustom: boolean;
}

// 自定义协同关系数据结构
interface CustomSynergyRelation {
  source: HeroId;
  target: HeroId;
  strength: RelationStrength;
  isCustom: boolean;
}

interface ForceGraphProps {
  selectedRole: string | null;
  selectedHeroes: HeroId[];
  onHeroSelect: (heroIds: HeroId[]) => void;
  isDrawerOpen?: boolean;
  selectedMap?: string | null;
  customMapHeroes?: Record<string, CustomMapHero[]>;
  deletedDefaultHeroes?: Record<string, HeroId[]>;
  mapDataActions?: {
    exportMapData: () => void;
    importMapData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearAllMapData: () => void;
    hasMapUnsavedChanges: boolean;
  };
}

const ForceGraph = ({
  selectedRole,
  selectedHeroes,
  onHeroSelect,
  isDrawerOpen = true,
  selectedMap = null,
  customMapHeroes = {},
  deletedDefaultHeroes = {},
  mapDataActions
}: ForceGraphProps) => {
  /** 移动端画布整体等比缩放倍数 */
  const MOBILE_SCALE = 0.3;

  const selectedMapData = useMemo(() => selectedMap ? maps.find(m => m.id === selectedMap) : null, [selectedMap]);
  const mapRecommendedHeroes = useMemo(() => {
    if (!selectedMapData || !selectedMap) return [];
    const defaultHeroes = selectedMapData.recommendedHeroes.filter(id => !(deletedDefaultHeroes[selectedMap] || []).includes(id));
    const customHeroes = (customMapHeroes[selectedMap] || []).map((ch: CustomMapHero) => ch.heroId);
    return [...new Set([...defaultHeroes, ...customHeroes])];
  }, [selectedMapData, selectedMap, deletedDefaultHeroes, customMapHeroes]);

  const { t, language } = useI18n();

  // Helper

  // Helper to split translation by colon safely
  const splitDesc = (desc: string) => {
    const parts = desc.split(':');
    return {
      title: parts[0],
      content: parts[1]?.trim() || ''
    };
  };
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<NodeDatum, LinkDatum> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodePositionsRef = useRef<Map<string, {x: number, y: number}>>(new Map());
  const savePositionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedHeroesRef = useRef<HeroId[]>(selectedHeroes);
  const onHeroSelectRef = useRef(onHeroSelect);

  // D3 selection refs for incremental updates (avoid full DOM rebuild)
  const nodeGroupRef = useRef<d3.Selection<SVGGElement, NodeDatum, SVGGElement, unknown> | null>(null);
  const linkSelectionRef = useRef<d3.Selection<SVGLineElement, LinkDatum, SVGGElement, unknown> | null>(null);
  const currentSelectedHeroesRef = useRef<HeroId[]>([]);
  const currentActiveCounterTabRef = useRef<string>('counteredBy');
  const currentCommonRelatedIdsRef = useRef<Set<string>>(new Set());
  const currentMatchedHeroIdsRef = useRef<Set<string>>(new Set());
  const currentIsMultiSelectRef = useRef(false);
  const currentMapRecommendedHeroesRef = useRef<string[]>([]);
  const currentSelectedHeroRef = useRef<string | null>(null);
  const currentMergedCounterRef = useRef<typeof mergedCounterRelations>([]);
  const currentMergedSynergyRef = useRef<typeof mergedSynergyRelations>([]);
  
  selectedHeroesRef.current = selectedHeroes;
  onHeroSelectRef.current = onHeroSelect;

  const displayedHero = selectedHeroes.length === 1 ? heroes.find(h => h.id === selectedHeroes[0]) : null;
  const selectedHero = selectedHeroes.length === 1 ? selectedHeroes[0] : null;
  const [activeCounterTab, setActiveCounterTab] = useState<'counteredBy' | 'counters' | 'synergy'>('counteredBy');
  const [isCopied, setIsCopied] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [heroSnapshots, setHeroSnapshots] = useState<{ id: string; heroIds: HeroId[]; timestamp: number }[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCounterPanelCollapsed, setIsCounterPanelCollapsed] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isMultiSelect = selectedHeroes.length > 1;

  // 自动保存英雄快照
  useEffect(() => {
    if (selectedHeroes.length > 0) {
      setHeroSnapshots(prev => {
        // 检查是否已存在相同的快照
        const lastSnapshot = prev[0];
        if (lastSnapshot && JSON.stringify(lastSnapshot.heroIds.sort()) === JSON.stringify([...selectedHeroes].sort())) {
          return prev;
        }
        const newSnapshot = {
          id: Date.now().toString(),
          heroIds: [...selectedHeroes],
          timestamp: Date.now()
        };
        return [newSnapshot, ...prev].slice(0, 10);
      });
    }
  }, [selectedHeroes]);

  // 自定义克制关系状态
  const [customCounterRelations, setCustomCounterRelations] = useState<CustomCounterRelation[]>([]);
  const [deletedDefaultRelations, setDeletedDefaultRelations] = useState<string[]>([]);
  const [isAddingCustomRelation, setIsAddingCustomRelation] = useState(false);
  const [newRelationTarget, setNewRelationTarget] = useState<HeroId | ''>('');
  const [newRelationStrength, setNewRelationStrength] = useState<RelationStrength>(2);
  const addRelationFormRef = useRef<HTMLDivElement>(null);

  // 自定义协同关系状态
  const [customSynergyRelations, setCustomSynergyRelations] = useState<CustomSynergyRelation[]>([]);
  const [deletedDefaultSynergyRelations, setDeletedDefaultSynergyRelations] = useState<string[]>([]);
  const [isAddingCustomSynergy, setIsAddingCustomSynergy] = useState(false);
  const [newSynergyTarget, setNewSynergyTarget] = useState<HeroId | ''>('');
  const [newSynergyStrength, setNewSynergyStrength] = useState<RelationStrength>(2);
  const addSynergyFormRef = useRef<HTMLDivElement>(null);

  // 计算搜索匹配的英雄 ID
  const matchedHeroIds = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const searchLower = debouncedSearchQuery.toLowerCase();
    return heroes
      .filter(hero => 
        hero.name.toLowerCase().includes(searchLower) ||
        hero.nameEn.toLowerCase().includes(searchLower) ||
        (hero.nickname && hero.nickname.toLowerCase().includes(searchLower))
      )
      .map(hero => hero.id);
  }, [debouncedSearchQuery]);

  // 合并默认和自定义克制关系
  const mergedCounterRelations = useMemo(() => {
    // 过滤掉被删除的默认关系
    const filteredDefaults = counterRelations.filter(r => {
      const relationId = `${r.source}-${r.target}`;
      return !deletedDefaultRelations.includes(relationId);
    });
    // 合并自定义关系并去重
    const all = [...filteredDefaults, ...customCounterRelations];
    const seen = new Set<string>();
    return all.filter(r => {
      const key = `${r.source}-${r.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [customCounterRelations, deletedDefaultRelations]);

  // 合并默认和自定义协同关系
  const mergedSynergyRelations = useMemo(() => {
    // 过滤掉被删除的默认关系
    const filteredDefaults = synergyRelations.filter(r => {
      const relationId = `${r.source}-${r.target}`;
      return !deletedDefaultSynergyRelations.includes(relationId);
    });
    // 合并自定义关系并去重
    const all = [...filteredDefaults, ...customSynergyRelations];
    const seen = new Set<string>();
    return all.filter(r => {
      const key = `${r.source}-${r.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [customSynergyRelations, deletedDefaultSynergyRelations]);

  // 关系查找 Map - O(1) 替代 20+ 处 O(n) 的 .find()
  const {
    counterMap: counterRelationMap,
    synergyMap: synergyRelationMap,
    getCounterStrength,
    hasCounterRelation,
    getSynergyStrength,
    hasSynergyRelation,
  } = useRelationMaps(mergedCounterRelations, mergedSynergyRelations);

  // O(1) 英雄查找
  const { getHero } = useMemoizedHeroes();

  const getCommonCounters = useCallback((heroIds: HeroId[]) => {
    if (heroIds.length === 0) return [];

    return heroes
      .map(h => {
        const relations = heroIds.map(targetId =>
          counterRelationMap.get(`${h.id}-${targetId}`)
        );

        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength));
          const isCustom = relations.some(r => r!.isCustom);
          return { hero: h, strength: minStrength, isCustom };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number; isCustom: boolean } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, [counterRelationMap]);

  const getCommonCounted = useCallback((heroIds: HeroId[]) => {
    if (heroIds.length === 0) return [];

    return heroes
      .map(h => {
        const relations = heroIds.map(sourceId =>
          counterRelationMap.get(`${sourceId}-${h.id}`)
        );

        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength));
          const isCustom = relations.some(r => r!.isCustom);
          return { hero: h, strength: minStrength, isCustom };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number; isCustom: boolean } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, [counterRelationMap]);

  const counteredBy = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return mergedCounterRelations
        .filter(r => r.target === selectedHeroes[0])
        .map(r => ({
          hero: getHero(r.source),
          strength: r.strength || 1,
          isCustom: (r as CustomCounterRelation).isCustom || false,
          source: r.source,
          target: r.target
        }))
        .filter((item): item is { hero: Hero; strength: RelationStrength; isCustom: boolean; source: HeroId; target: HeroId } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonCounters(selectedHeroes);
  }, [selectedHeroes, getCommonCounters, mergedCounterRelations, getHero]);

  const counters = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return mergedCounterRelations
        .filter(r => r.source === selectedHeroes[0])
        .map(r => ({
          hero: getHero(r.target),
          strength: r.strength || 1,
          isCustom: (r as CustomCounterRelation).isCustom || false,
          source: r.source,
          target: r.target
        }))
        .filter((item): item is { hero: Hero; strength: RelationStrength; isCustom: boolean; source: HeroId; target: HeroId } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonCounted(selectedHeroes);
  }, [selectedHeroes, getCommonCounted, mergedCounterRelations, getHero]);

  const getCommonSynergies = useCallback((heroIds: HeroId[]) => {
    if (heroIds.length === 0) return [];

    // O(1) Map.get 替代 O(R) .find()
    return heroes
      .map(h => {
        const relations = heroIds.map(targetId =>
          synergyRelationMap.get(`${h.id}-${targetId}`)
        );

        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength));
          const isCustom = relations.some(r => r!.isCustom);
          return { hero: h, strength: minStrength, isCustom };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number; isCustom: boolean } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, [synergyRelationMap]);

  const synergyPartners = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return mergedSynergyRelations
        .filter(r => r.target === selectedHeroes[0])
        .map(r => ({
          hero: getHero(r.source),
          strength: r.strength || 1,
          isCustom: (r as CustomSynergyRelation).isCustom || false,
          source: r.source,
          target: r.target
        }))
        .filter((item): item is { hero: Hero; strength: RelationStrength; isCustom: boolean; source: HeroId; target: HeroId } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonSynergies(selectedHeroes);
  }, [selectedHeroes, getCommonSynergies, mergedSynergyRelations, synergyRelationMap, getHero]);

  const commonRelatedIds = useMemo(() => {
    if (selectedHeroes.length <= 1) return [];
    if (activeCounterTab === 'synergy') {
      return synergyPartners.map(p => p.hero.id);
    } else if (activeCounterTab === 'counteredBy') {
      return counteredBy.map(p => p.hero.id);
    } else {
      return counters.map(p => p.hero.id);
    }
  }, [selectedHeroes.length, activeCounterTab, synergyPartners, counteredBy, counters]);

  // Sync state refs with latest values (for animation loop and incremental updates)
  currentSelectedHeroesRef.current = selectedHeroes;
  currentActiveCounterTabRef.current = activeCounterTab;
  currentCommonRelatedIdsRef.current = new Set(commonRelatedIds);
  currentMatchedHeroIdsRef.current = new Set(matchedHeroIds);
  currentIsMultiSelectRef.current = isMultiSelect;
  currentMapRecommendedHeroesRef.current = mapRecommendedHeroes;
  currentSelectedHeroRef.current = selectedHero;
  currentMergedCounterRef.current = mergedCounterRelations;
  currentMergedSynergyRef.current = mergedSynergyRelations;

  const handleHeroClick = useCallback((heroId: HeroId, event: any) => {
    event.stopPropagation();
    const currentSelected = selectedHeroesRef.current;
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      onHeroSelectRef.current(
        currentSelected.includes(heroId)
          ? currentSelected.filter(id => id !== heroId)
          : [...currentSelected, heroId]
      );
    } else {
      onHeroSelectRef.current(
        currentSelected.length === 1 && currentSelected[0] === heroId ? [] : [heroId]
      );
    }
    setSearchQuery('');
  }, []);

  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });


  const handleCopyToClipboard = (text: string) => {
    if (!text) return;
    const sanitized = text
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/、/g, ', ')
      .replace(/★★★/g, '[Strong]')
      .replace(/★★/g, '[Medium]')
      .replace(/★/g, '[Weak]')
      .replace(/：/g, ':')
      .replace(/:/g, ':')
      .replace(/→/g, '->')
      .replace(/●/g, '*')
      .replace(/【/g, '[')
      .replace(/】/g, ']')
      .replace(/《/g, '[')
      .replace(/》/g, ']')
      .replace(/——/g, '-')
      .replace(/…/g, '...')
      .replace(/　/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    navigator.clipboard.writeText(sanitized).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const roleOrder: Record<string, number> = { tank: 0, damage: 1, support: 2 };

  const sortByRole = <T extends { hero: { role: string } }>(items: T[]): T[] => {
    return [...items].sort((a, b) => roleOrder[a.hero.role] - roleOrder[b.hero.role]);
  };

  // 保存自定义克制关系到 localStorage
  const saveCustomCounterRelations = (relations: CustomCounterRelation[]) => {
    try {
      localStorage.setItem('ow2-custom-counter-relations', JSON.stringify(relations));
    } catch (e) {
      console.error('Failed to save custom counter relations:', e);
    }
  };

  const saveDeletedDefaultRelations = (relations: string[]) => {
    try {
      localStorage.setItem('ow2-deleted-default-relations', JSON.stringify(relations));
    } catch (e) {
      console.error('Failed to save deleted default relations:', e);
    }
  };

  // 保存自定义协同关系到 localStorage
  const saveCustomSynergyRelations = (relations: CustomSynergyRelation[]) => {
    try {
      localStorage.setItem('ow2-custom-synergy-relations', JSON.stringify(relations));
    } catch (e) {
      console.error('Failed to save custom synergy relations:', e);
    }
  };

  const saveDeletedDefaultSynergyRelations = (relations: string[]) => {
    try {
      localStorage.setItem('ow2-deleted-default-synergy-relations', JSON.stringify(relations));
    } catch (e) {
      console.error('Failed to save deleted default synergy relations:', e);
    }
  };

  // 添加自定义克制关系
  const addCustomCounterRelation = () => {
    if (!selectedHero || !newRelationTarget) return;
    
    // 此时 selectedHero 和 newRelationTarget 都已被类型收窄为 HeroId
    const sourceHero: HeroId = activeCounterTab === 'counters' ? selectedHero : newRelationTarget;
    const targetHero: HeroId = activeCounterTab === 'counters' ? newRelationTarget : selectedHero;

    const newRelation: CustomCounterRelation = {
      source: sourceHero,
      target: targetHero,
      strength: newRelationStrength,
      isCustom: true
    };

    const updated = [...customCounterRelations, newRelation];
    setCustomCounterRelations(updated);
    saveCustomCounterRelations(updated);
    setHasForceGraphUnsavedChanges(true);
    setNewRelationTarget('');
    setNewRelationStrength(2);
    setIsAddingCustomRelation(false);
  };

  // 删除自定义克制关系
  const removeCustomCounterRelation = (index: number) => {
    const updated = customCounterRelations.filter((_, i) => i !== index);
    setCustomCounterRelations(updated);
    saveCustomCounterRelations(updated);
    setHasForceGraphUnsavedChanges(true);
  };

  // 删除默认克制关系
  const deleteDefaultCounterRelation = (source: string, target: string) => {
    const relationId = `${source}-${target}`;
    const updated = [...deletedDefaultRelations, relationId];
    setDeletedDefaultRelations(updated);
    saveDeletedDefaultRelations(updated);
    setHasForceGraphUnsavedChanges(true);
  };

  // 添加自定义协同关系
  const addCustomSynergyRelation = () => {
    if (!selectedHero || !newSynergyTarget) return;

    const newRelation: CustomSynergyRelation = {
      source: newSynergyTarget,  // 协同伙伴
      target: selectedHero,      // 被选中的英雄
      strength: newSynergyStrength,
      isCustom: true
    };

    const updated = [...customSynergyRelations, newRelation];
    setCustomSynergyRelations(updated);
    saveCustomSynergyRelations(updated);
    setHasForceGraphUnsavedChanges(true);
    setNewSynergyTarget('');
    setNewSynergyStrength(2);
    setIsAddingCustomSynergy(false);
  };

  // 删除自定义协同关系
  const removeCustomSynergyRelation = (index: number) => {
    const updated = customSynergyRelations.filter((_, i) => i !== index);
    setCustomSynergyRelations(updated);
    saveCustomSynergyRelations(updated);
    setHasForceGraphUnsavedChanges(true);
  };

  // 删除默认协同关系
  const deleteDefaultSynergyRelation = (source: string, target: string) => {
    const relationId = `${source}-${target}`;
    const updated = [...deletedDefaultSynergyRelations, relationId];
    setDeletedDefaultSynergyRelations(updated);
    saveDeletedDefaultSynergyRelations(updated);
    setHasForceGraphUnsavedChanges(true);
  };

  // 导出自定义关系数据
  const exportForceGraphData = () => {
    const data = {
      customCounterRelations,
      deletedDefaultRelations,
      customSynergyRelations,
      deletedDefaultSynergyRelations
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `overwatch-forcegraph-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setHasForceGraphUnsavedChanges(false);
  };

  // 导入自定义关系数据
  const importForceGraphData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.customCounterRelations) {
          setCustomCounterRelations(data.customCounterRelations);
          saveCustomCounterRelations(data.customCounterRelations);
        }
        if (data.deletedDefaultRelations) {
          setDeletedDefaultRelations(data.deletedDefaultRelations);
          saveDeletedDefaultRelations(data.deletedDefaultRelations);
        }
        if (data.customSynergyRelations) {
          setCustomSynergyRelations(data.customSynergyRelations);
          saveCustomSynergyRelations(data.customSynergyRelations);
        }
        if (data.deletedDefaultSynergyRelations) {
          setDeletedDefaultSynergyRelations(data.deletedDefaultSynergyRelations);
          saveDeletedDefaultSynergyRelations(data.deletedDefaultSynergyRelations);
        }
      } catch (error) {
        console.error('Failed to import data:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // 清除所有自定义关系数据
  const clearAllForceGraphData = () => {
    if (confirm(t('confirmClearAll'))) {
      setCustomCounterRelations([]);
      setDeletedDefaultRelations([]);
      setCustomSynergyRelations([]);
      setDeletedDefaultSynergyRelations([]);
      saveCustomCounterRelations([]);
      saveDeletedDefaultRelations([]);
      saveCustomSynergyRelations([]);
      saveDeletedDefaultSynergyRelations([]);
      setHasForceGraphUnsavedChanges(false);
    }
  };

  // 恢复单个英雄的默认克制和协同关系
  const restoreHeroRelations = (heroId: string) => {
    const updatedCustomCounters = customCounterRelations.filter(
      r => r.source !== heroId && r.target !== heroId
    );
    const updatedDeletedCounters = deletedDefaultRelations.filter(
      id => !id.startsWith(`${heroId}-`) && !id.endsWith(`-${heroId}`)
    );
    const updatedCustomSynergies = customSynergyRelations.filter(
      r => r.source !== heroId && r.target !== heroId
    );
    const updatedDeletedSynergies = deletedDefaultSynergyRelations.filter(
      id => !id.startsWith(`${heroId}-`) && !id.endsWith(`-${heroId}`)
    );
    setCustomCounterRelations(updatedCustomCounters);
    setDeletedDefaultRelations(updatedDeletedCounters);
    setCustomSynergyRelations(updatedCustomSynergies);
    setDeletedDefaultSynergyRelations(updatedDeletedSynergies);
    saveCustomCounterRelations(updatedCustomCounters);
    saveDeletedDefaultRelations(updatedDeletedCounters);
    saveCustomSynergyRelations(updatedCustomSynergies);
    saveDeletedDefaultSynergyRelations(updatedDeletedSynergies);
    if (updatedCustomCounters.length === 0 && updatedDeletedCounters.length === 0 &&
        updatedCustomSynergies.length === 0 && updatedDeletedSynergies.length === 0) {
      setHasForceGraphUnsavedChanges(false);
    }
  };

  // 是否存在未保存的自定义数据
  const [hasForceGraphUnsavedChanges, setHasForceGraphUnsavedChanges] = useState(() =>
    customCounterRelations.length > 0 || deletedDefaultRelations.length > 0 || customSynergyRelations.length > 0 || deletedDefaultSynergyRelations.length > 0
  );

  const renderHeroList = (items: typeof counteredBy, strength: number, colorClass: string, targetHeroIds: string[], swapSourceTarget = false) => {
    const filtered = items.filter(i => i.strength === strength);
    const sorted = sortByRole(filtered);
    const isMulti = targetHeroIds.length > 1;

    // For single select, get the target hero name
    const targetHero = !isMulti ? heroes.find(h => h.id === targetHeroIds[0]) : null;
    const targetHeroName = targetHero ? getHeroName(targetHero, language) : '';

    return sorted.map((item) => {
      const { hero, strength: s } = item;
      // 使用类型断言获取可选属性
      const isCustom = (item as { isCustom?: boolean }).isCustom ?? false;
      const source = (item as { source?: string }).source;
      const target = (item as { target?: string }).target;

      let formattedReason = '';
      const heroName = getHeroName(hero, language);

      if (!isMulti) {
        const targetHeroId = targetHeroIds[0];
        const reason = getCounterReason(swapSourceTarget ? targetHeroId : hero.id, swapSourceTarget ? hero.id : targetHeroId, language);
        formattedReason = reason.includes('→') ? reason.replace(/^(.+?) → (.+)$/, (_, ability, weakness) => `${swapSourceTarget ? targetHeroName : heroName} ${ability} → ${swapSourceTarget ? heroName : targetHeroName} ${weakness}`) : reason;
      } else {
        // 多选模式：提供更详细的关系描述
        const targetHeroNames = targetHeroIds.map(id => {
          const h = heroes.find(hero => hero.id === id);
          return h ? getHeroName(h, language) : '';
        }).filter(name => name).join(t('listSeparator'));

        if (swapSourceTarget) {
          // 克制关系：选中英雄克制当前英雄
          formattedReason = language === 'zh'
            ? `${targetHeroNames} 的协同能力能够有效克制 ${heroName} 的${hero.role === 'tank' ? '前排压制' : hero.role === 'damage' ? '输出能力' : '治疗支援'}`
            : `${targetHeroNames}'s combined abilities effectively counter ${heroName}'s ${hero.role === 'tank' ? 'frontline pressure' : hero.role === 'damage' ? 'damage output' : 'healing support'}`;
        } else {
          // 被克制关系：当前英雄克制选中英雄
          formattedReason = language === 'zh'
            ? `${heroName} 的${hero.role === 'tank' ? '控制能力' : hero.role === 'damage' ? '高爆发伤害' : '反制技能'} 能够有效应对 ${targetHeroNames} 的组合`
            : `${heroName}'s ${hero.role === 'tank' ? 'crowd control' : hero.role === 'damage' ? 'burst damage' : 'counter abilities'} effectively handles ${targetHeroNames}'s combination`;
        }
      }

      // 计算关系source和target用于删除
      const relationSource = source || (swapSourceTarget ? hero.id : targetHeroIds[0]);
      const relationTarget = target || (swapSourceTarget ? targetHeroIds[0] : hero.id);

      return (
        <div key={`${hero.id}-${s}`} className={`flex items-start gap-3 p-2 rounded-lg border backdrop-blur-sm mb-2 ${colorClass} group`}>
          <div className={`w-10 h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 ring-2 ${colorClass.includes('red') ? 'ring-red-500/50' : 'ring-green-500/50'}`}>
            <img src={hero.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">{heroName}</span>
                  <span className={`text-[0.625rem] px-1.5 py-0.5 rounded border font-medium ${hero.role === 'tank' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : hero.role === 'damage' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                    {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                  </span>
                  {isCustom && (
                    <Badge variant="outline" className="text-[0.5625rem] px-1 py-0 text-white border-white/50 bg-white/10">
                      {t('custom')}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {selectedMap && mapRecommendedHeroes.includes(hero.id) && (
                  <Badge variant="secondary" className="text-[0.5625rem] px-1 py-0 font-bold bg-cyan-400">
                    {t('mapRecommended')}
                  </Badge>
                )}
                <Badge variant="secondary" className={`text-[0.5625rem] px-1 py-0 text-slate-900 font-bold shadow-sm border-none ${s === 3 ? 'bg-red-400' : s === 2 ? 'bg-orange-400' : 'bg-slate-400'}`}>
                  {s === 3 ? t('hardCounter') : s === 2 ? t('strongCounter') : t('softCounter')} LV.{s}
                </Badge>
                {!isMulti && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCustom) {
                        // 找到自定义关系的实际索引
                        const customIndex = customCounterRelations.findIndex(
                          r => r.source === relationSource && r.target === relationTarget
                        );
                        if (customIndex !== -1) {
                          removeCustomCounterRelation(customIndex);
                        }
                      } else {
                        deleteDefaultCounterRelation(relationSource, relationTarget);
                      }
                    }}
                    className="ml-1 p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-opacity"
                    title={t('delete')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
            <p className={`text-[0.6875rem] leading-relaxed mt-1 ${colorClass.includes('red') ? 'text-red-300' : 'text-green-300'}`}>
              {formattedReason}
            </p>
          </div>
        </div>
      );
    });
  };

  // 使用useEffect钩子来处理副作用
  useEffect(() => {
    // 检查是否已选择英雄，如果已选择则直接返回
    if (selectedHeroes.length > 0) return;
    const randomIndex = Math.floor(Math.random() * heroes.length);
    const randomHero = heroes[randomIndex];
    if (randomHero) onHeroSelect([randomHero.id]);
  }, []);

  const handlePanelDragStart = (e: React.MouseEvent) => {
    setIsDraggingPanel(true);
    dragStartRef.current = {
      x: e.clientX - panelPosition.x,
      y: e.clientY - panelPosition.y
    };
  };

  // Check if first visit and open intro popover
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsIntroOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    // Load saved node positions from localStorage
    try {
      const savedPositions = localStorage.getItem('nodePositions');
      if (savedPositions) {
        const positions = JSON.parse(savedPositions);
        nodePositionsRef.current = new Map(Object.entries(positions));
      }
    } catch (e) {
      console.error('Failed to load node positions:', e);
    }

    // Load custom counter relations from localStorage
    try {
      const savedCustomRelations = localStorage.getItem('ow2-custom-counter-relations');
      if (savedCustomRelations) {
        setCustomCounterRelations(JSON.parse(savedCustomRelations));
      }
      const savedDeletedRelations = localStorage.getItem('ow2-deleted-default-relations');
      if (savedDeletedRelations) {
        setDeletedDefaultRelations(JSON.parse(savedDeletedRelations));
      }

      // Load custom synergy relations from localStorage
      const savedCustomSynergy = localStorage.getItem('ow2-custom-synergy-relations');
      if (savedCustomSynergy) {
        setCustomSynergyRelations(JSON.parse(savedCustomSynergy));
      }
      const savedDeletedSynergy = localStorage.getItem('ow2-deleted-default-synergy-relations');
      if (savedDeletedSynergy) {
        setDeletedDefaultSynergyRelations(JSON.parse(savedDeletedSynergy));
      }
    } catch (e) {
      console.error('Failed to load custom counter relations:', e);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingPanel) {
        setPanelPosition({
          x: e.clientX - dragStartRef.current.x,
          y: e.clientY - dragStartRef.current.y
        });
      }
    };
    const handleMouseUp = () => setIsDraggingPanel(false);
    if (isDraggingPanel) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingPanel]);

  useEffect(() => {
    let rafId: number | null = null;
    const handleResize = () => {
      if (!containerRef.current || !svgRef.current || !simulationRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current || !svgRef.current || !simulationRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        d3.select(svgRef.current).attr('width', width).attr('height', height);
        simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2)).alpha(0.08).restart();
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (window.matchMedia?.('(pointer: coarse)')?.matches ?? false);
  }, []);

  const prepareBaseNodes = useCallback((): NodeDatum[] => {
    return heroes
      .filter(h => !selectedRole || h.role === selectedRole)
      .map(h => ({
        id: h.id,
        name: h.name,
        nameEn: h.nameEn,
        role: h.role as 'tank' | 'damage' | 'support',
        color: h.role === 'tank' ? '#f59e0b' : h.role === 'damage' ? '#ef4444' : '#22c55e',
        image: h.image,
        radius: h.role === 'tank' ? 32 : 28,
      }));
  }, [selectedRole, isTouchDevice]);

  const prepareLinks = useCallback((nodeIds: Set<string>): LinkDatum[] => {
    if (selectedHeroes.length === 0) {
      return mergedCounterRelations
        .filter(l => nodeIds.has(l.source) && nodeIds.has(l.target))
        .map(l => ({ source: l.source, target: l.target }));
    }
    
    const visibleSelectedHeroes = selectedHeroes.filter(id => nodeIds.has(id));
    
    if (isMultiSelect && visibleSelectedHeroes.length > 1) {
      const visibleCommonIds = commonRelatedIds.filter(id => nodeIds.has(id));
      if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
        return (activeCounterTab === 'synergy' ? mergedSynergyRelations : mergedCounterRelations)
          .filter(r => visibleSelectedHeroes.includes(r.target) && visibleCommonIds.includes(r.source) && nodeIds.has(r.source) && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      } else {
        return mergedCounterRelations
          .filter(r => visibleSelectedHeroes.includes(r.source) && visibleCommonIds.includes(r.target) && nodeIds.has(r.source) && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      }
    } else if (selectedHeroes.length === 1) {
      const selectedHeroId = selectedHeroes[0];
      if (!nodeIds.has(selectedHeroId)) return [];
      if (activeCounterTab === 'synergy') {
        return mergedSynergyRelations
          .filter(r => r.target === selectedHeroId && nodeIds.has(r.source))
          .map(r => ({ source: r.source, target: r.target }));
      } else if (activeCounterTab === 'counteredBy') {
        return mergedCounterRelations
          .filter(r => r.target === selectedHeroId && nodeIds.has(r.source))
          .map(r => ({ source: r.source, target: r.target }));
      } else {
        return mergedCounterRelations
          .filter(r => r.source === selectedHeroId && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      }
    }
    return [];
  }, [selectedHeroes, activeCounterTab, isMultiSelect, commonRelatedIds, mergedCounterRelations, mergedSynergyRelations]);

  const prepareData = useCallback(() => {
    const nodes = prepareBaseNodes();
    const nodeIds = new Set(nodes.map(n => n.id));
    const links = prepareLinks(nodeIds);
    return { nodes, links };
  }, [prepareBaseNodes, prepareLinks]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
    const defs = svg.append('defs');

    // Arrow defs
    const redShades = [
      { id: 'arrow-red-1', color: '#f87171', opacity: 0.4 },
      { id: 'arrow-red-2', color: '#ef4444', opacity: 0.7 },
      { id: 'arrow-red-3', color: '#b91c1c', opacity: 1.0 },
    ];
    redShades.forEach(shade => {
      defs.append('marker').attr('id', shade.id).attr('viewBox', '0 -5 10 10').attr('refX', 36).attr('refY', 0).attr('markerWidth', 3).attr('markerHeight', 3).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', shade.color).attr('opacity', shade.opacity);
    });
    const greenShades = [
      { id: 'arrow-green-1', color: '#86efac', opacity: 0.4 },
      { id: 'arrow-green-2', color: '#22c55e', opacity: 0.7 },
      { id: 'arrow-green-3', color: '#15803d', opacity: 1.0 },
    ];
    greenShades.forEach(shade => {
      defs.append('marker').attr('id', shade.id).attr('viewBox', '0 -5 10 10').attr('refX', 36).attr('refY', 0).attr('markerWidth', 3).attr('markerHeight', 3).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', shade.color).attr('opacity', shade.opacity);
    });

    // Purple arrow for synergy
    defs.append('marker').attr('id', 'arrow-purple-1').attr('viewBox', '0 -5 10 10').attr('refX', 36).attr('refY', 0).attr('markerWidth', 3).attr('markerHeight', 3).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#a855f7').attr('opacity', 0.8);

    // Animated arrow heads
    ['red', 'green'].forEach(color => {
      [1, 2, 3].forEach(s => {
        defs.append('marker').attr('id', `arrow-${color}-${s}-anim`).attr('viewBox', '0 -5 10 10').attr('refX', 36).attr('refY', 0).attr('markerWidth', 3).attr('markerHeight', 3).attr('orient', 'auto').append('path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('fill', color === 'red' ? (s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#f87171') : (s === 3 ? '#15803d' : s === 2 ? '#22c55e' : '#86efac'))
          .attr('opacity', 0.9);
      });
    });

    // Animated flowing circle markers
    ['red', 'green'].forEach(color => {
      [1, 2, 3].forEach(s => {
        defs.append('marker').attr('id', `arrow-${color}-${s}-flow`).attr('viewBox', '0 -3 6 6').attr('refX', 3).attr('refY', 0).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').append('circle').attr('r', 2.5).attr('fill', color === 'red' ? (s === 3 ? '#ff6b6b' : s === 2 ? '#ff8a8a' : '#ffa8a8') : (s === 3 ? '#4ade80' : s === 2 ? '#6ee7a0' : '#a3f7bc'));
      });
    });

    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g');
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .filter((event) => {
        // 允许左键拖拽、滚轮缩放、鼠标中键拖拽平移 + 触摸事件(双指缩放/平移)
        if (event.button === 0 || event.button === 1) return true;
        // 允许触摸事件 (双指缩放、双指平移)
        if (event.type.startsWith('touch')) return true;
        return false;
      })
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);
    // 初始化时设置 transform：移动端按 MOBILE_SCALE 围绕画布中心等比缩小，桌面端为 identity
    const initialTransform = isTouchDevice
      ? d3.zoomIdentity.translate(width / 2, height / 2).scale(MOBILE_SCALE).translate(-width / 2, -height / 2)
      : d3.zoomIdentity;
    svg.call(zoom.transform, initialTransform);
    zoomRef.current = zoom;

    const { nodes, links } = prepareData();

    // Restore node positions from saved state if available
    nodes.forEach(node => {
      const savedPosition = nodePositionsRef.current.get(node.id);
      if (savedPosition) {
        node.x = savedPosition.x;
        node.y = savedPosition.y;
      }
      defs.append('clipPath').attr('id', `clip-${node.id}`).append('circle').attr('r', node.radius - 2);
    });

    const simulation = d3.forceSimulation<NodeDatum>(nodes)
      .velocityDecay(0.6)
      .alphaDecay(0.035)
      .force('link', d3.forceLink<NodeDatum, LinkDatum>(links).id(d => d.id).distance(d => {
        const currentSelectedHero = currentSelectedHeroRef.current;
        const currentActiveCounterTab = currentActiveCounterTabRef.current;
        if (!currentSelectedHero) return 140;
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        // O(1) Map 查找替代 O(R) Array.find
        const strength = getCounterStrength(sourceId, targetId);
        if (!strength) return 140;
        const isRelated = currentActiveCounterTab === 'counteredBy' ?
          (targetId === currentSelectedHero || sourceId === currentSelectedHero) :
          (sourceId === currentSelectedHero || targetId === currentSelectedHero);
        if (!isRelated) return 140;
        return strength === 3 ? 100 : strength === 2 ? 120 : 140;
      }))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => (d as NodeDatum).radius + 20))
      .force('x', d3.forceX<NodeDatum>().x(d => {
        if (selectedRole && selectedRole !== 'all') return width / 2;
        const centerX = width / 2;
        if (d.role === 'tank') return centerX - 340;
        if (d.role === 'damage') return centerX;
        return centerX + 340;
      }).strength(0.5))
      .force('y', d3.forceY<NodeDatum>().y(() => {
        if (selectedRole && selectedRole !== 'all') return height / 2;
        return height / 2;
      }).strength(0.4));
    simulationRef.current = simulation;

    const link = g.append('g').attr('class', 'links').selectAll('line').data(links).enter().append('line').attr('stroke-width', 1.5);
    linkSelectionRef.current = link;

    // Animated flowing particles group
    const particleGroup = g.append('g').attr('class', 'particles');

    // Create particles for each link - 使用 O(1) Map 查找
    particleGroup.selectAll('circle')
      .data(links)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', (d: LinkDatum) => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        // O(1) 替代 O(R) .find()
        const s = getCounterStrength(sourceId, targetId) ?? 1;
        return s === 3 ? 6 : s === 2 ? 4.5 : 3;
      })
      .attr('fill', (d: LinkDatum) => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        // O(1) 替代 O(R) .find() (原代码此处调用了 2 次 find)
        const s = getCounterStrength(sourceId, targetId) ?? 1;

        // Synergy模式使用紫色系粒子
        if (activeCounterTab === 'synergy') {
          return s === 3 ? '#c084fc' : s === 2 ? '#d8b4fe' : '#e9d5ff';
        }
        
        // 统一粒子颜色逻辑：多选和单选使用相同的颜色规则
        let color = 'red';
        
        if (isMultiSelect) {
          // 多选模式：根据关系方向确定颜色
          if (activeCounterTab === 'counteredBy') {
            // 被克制关系：从共同被克制英雄流向选中英雄（红色）
            color = commonRelatedIds.includes(sourceId) && selectedHeroes.includes(targetId) ? 'red' : 'green';
          } else {
            // 克制关系：从选中英雄流向共同克制英雄（绿色）
            color = selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId) ? 'green' : 'red';
          }
        } else {
          // 单选模式：保持原有逻辑
          color = activeCounterTab === 'counteredBy' ?
            (targetId === selectedHeroes[0] ? 'red' : 'green') :
            (sourceId === selectedHeroes[0] ? 'green' : 'red');
        }
        
        // 使用与单选模式相同的粒子颜色
        return s === 3 ? (color === 'red' ? '#ff6b6b' : '#4ade80') :
          s === 2 ? (color === 'red' ? '#ff8a8a' : '#6ee7a0') :
            (color === 'red' ? '#ffa8a8' : '#a3f7bc');
      })
      .attr('opacity', 0);

    const nodeGroup = g.append('g').attr('class', 'nodes').selectAll('g').data(nodes).enter().append('g').attr('class', 'node-group').style('cursor', 'pointer').style('opacity', d => {
      if (!selectedHero) return 1;
      if (d.id === selectedHero) return 1;
      // O(1) Map.has 替代 O(R) .some()
      return (hasCounterRelation(d.id, selectedHero) || hasCounterRelation(selectedHero, d.id)) ? 1 : 0.65;
    }).call(d3.drag<SVGGElement, NodeDatum>()
      .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));
    nodeGroupRef.current = nodeGroup;

    nodeGroup.append('circle').attr('r', d => d.radius + 4).attr('fill', 'none').attr('stroke', d => d.color).attr('stroke-width', 2).attr('opacity', 0.3).attr('class', 'glow-ring');
    nodeGroup.append('circle').attr('r', d => d.radius).attr('fill', '#1a1a2e').attr('stroke', d => d.color).attr('stroke-width', 3).attr('class', 'node-circle');

    // 添加搜索匹配的闪烁效果圆环
    nodeGroup.append('circle')
      .attr('r', d => d.radius + 8)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3)
      .attr('opacity', 0)
      .attr('class', 'search-highlight');
    nodeGroup.append('image').attr('xlink:href', d => d.image).attr('x', d => -(d.radius - 2)).attr('y', d => -(d.radius - 2)).attr('width', d => (d.radius - 2) * 2).attr('height', d => (d.radius - 2) * 2).attr('clip-path', d => `url(#clip-${d.id})`).attr('preserveAspectRatio', 'xMidYMid slice').style('pointer-events', 'none');
    nodeGroup.append('text').attr('class', 'node-name').attr('text-anchor', 'middle').attr('dy', d => d.radius + 20).attr('fill', '#e2e8f0').attr('font-size', isTouchDevice ? '2.25rem' : '0.75rem').attr('font-weight', '700').text(d => language === 'zh' ? d.name : d.nameEn).style('pointer-events', 'none').style('text-shadow', '0 0.0625rem 0.1875rem rgba(0,0,0,0.8)').style('opacity', '1');
    
    // Add selection indicator (checkbox) at bottom right of the node image
    const checkGroup = nodeGroup.append('g')
      .attr('class', 'selection-indicator')
      .style('opacity', d => selectedHeroes.includes(d.id) ? 1 : 0)
      .style('pointer-events', 'none');

    // White background checkbox with gray border - increased to 30px and moved closer to center
    checkGroup.append('rect')
      .attr('x', d => d.radius * 0.3)  // Moved closer to center (from 0.5 to 0.3)
      .attr('y', d => d.radius * 0.3)  // Moved closer to center (from 0.5 to 0.3)
      .attr('width', 30)  // Increased from 16 to 30
      .attr('height', 30)  // Increased from 16 to 30
      .attr('rx', 6)  // Increased corner radius for larger size
      .attr('fill', '#ffffff')
      .attr('stroke', '#6b7280')
      .attr('stroke-width', 2);

    // Black checkmark - adjusted for larger size
    checkGroup.append('path')
      .attr('d', d => {
        const x = d.radius * 0.3 + 8;  // Adjusted for new position and size
        const y = d.radius * 0.3 + 15; // Adjusted for new position and size
        return `M${x},${y} l6,6 l10,-10`;  // Increased checkmark size
      })
      .attr('fill', 'none')
      .attr('stroke', '#000000')
      .attr('stroke-width', 3)  // Increased stroke width for larger checkmark
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Add "Map Strong" label above nodes
    const mapLabelGroup = nodeGroup.append('g')
      .attr('class', 'map-strong-label')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    mapLabelGroup.append('rect')
      .attr('x', -24)
      .attr('y', d => -(d.radius + 10))
      .attr('width', 48)
      .attr('height', 14)
      .attr('rx', 4)
      .attr('fill', '#22d3ee');

    mapLabelGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => -(d.radius))
      .attr('fill', '#0f172a')
      .attr('font-size', isTouchDevice ? '1.25rem' : '0.5625rem')
      .attr('font-weight', '800')
      .text(t('mapRecommended'));

    nodeGroup.on('click', (event, d) => { handleHeroClick(d.id, event); });

    // Pre-compute link indices for O(1) lookup in animation
    const linkIndexMap = new Map<LinkDatum, number>();
    links.forEach((link, i) => linkIndexMap.set(link, i));
    
    // computeIsRelevant reads from refs so it always uses the latest state
    const computeIsRelevant = (sourceId: HeroId, targetId: HeroId): boolean => {
      const currentSelectedHeroes = currentSelectedHeroesRef.current;
      const currentCommonRelatedIds = currentCommonRelatedIdsRef.current;
      const currentActiveCounterTab = currentActiveCounterTabRef.current;
      const currentIsMultiSelect = currentIsMultiSelectRef.current;
      const selectedHeroesSet = new Set(currentSelectedHeroes);
      if (currentIsMultiSelect) {
        return currentActiveCounterTab === 'counteredBy' 
          ? (selectedHeroesSet.has(targetId) && currentCommonRelatedIds.has(sourceId))
          : (selectedHeroesSet.has(sourceId) && currentCommonRelatedIds.has(targetId));
      } else {
        const targetHero = currentSelectedHeroes[0];
        if (!targetHero) return false;
        return currentActiveCounterTab === 'synergy' 
          ? (targetId === targetHero || sourceId === targetHero)
          : currentActiveCounterTab === 'counteredBy' 
            ? targetId === targetHero 
            : sourceId === targetHero;
      }
    };

    // Track particle animation progress
    let particleProgress = 0;
    const particleSpeed = 0.015;

    // Track search highlight animation progress
    let highlightProgress = 0;
    const highlightSpeed = 0.05;

    // Separate animation loop for particles - runs independently of simulation
    const particleAnimation = () => {
      particleProgress += particleSpeed;
      if (particleProgress > 1) particleProgress = 0;

      // Update search highlight animation
      highlightProgress += highlightSpeed;
      if (highlightProgress > 1) highlightProgress = 0;

      // Synergy mode: hide all particles (read from ref for latest state)
      const currentActiveCounterTab = currentActiveCounterTabRef.current;
      if (currentActiveCounterTab === 'synergy') {
        particleGroup.selectAll<SVGCircleElement, LinkDatum>('.particle').attr('opacity', 0);
      } else {
        particleGroup.selectAll<SVGCircleElement, LinkDatum>('.particle')
          .attr('opacity', (d) => {
            const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
            const targetId = typeof d.target === 'string' ? d.target : d.target.id;
            return computeIsRelevant(sourceId, targetId) ? 0.9 : 0;
          })
          .attr('cx', (d) => {
            const source = d.source as NodeDatum;
            const target = d.target as NodeDatum;
            const sourceId = source.id;
            const targetId = target.id;
            
            if (!computeIsRelevant(sourceId, targetId)) return 0;
            
            const dx = (target.x || 0) - (source.x || 0);
            const linkIndex = linkIndexMap.get(d) ?? 0;
            const pos = ((particleProgress + (linkIndex * 0.1)) % 1);
            return (source.x || 0) + dx * pos;
          })
          .attr('cy', (d) => {
            const source = d.source as NodeDatum;
            const target = d.target as NodeDatum;
            const sourceId = source.id;
            const targetId = target.id;
            
            if (!computeIsRelevant(sourceId, targetId)) return 0;
            
            const dy = (target.y || 0) - (source.y || 0);
            const linkIndex = linkIndexMap.get(d) ?? 0;
            const pos = ((particleProgress + (linkIndex * 0.1)) % 1);
            return (source.y || 0) + dy * pos;
          });
      }

      // Update search highlight animation (read from ref)
      const currentMatchedHeroIds = currentMatchedHeroIdsRef.current;
      nodeGroup.selectAll<SVGCircleElement, NodeDatum>('.search-highlight')
        .attr('opacity', (d: NodeDatum) => {
          if (!currentMatchedHeroIds.has(d.id)) return 0;
          // 使用正弦波创建平滑的闪烁效果
          const opacity = 0.3 + 0.7 * Math.sin(highlightProgress * Math.PI * 2);
          return opacity;
        })
        .attr('r', (d: NodeDatum) => {
          if (!currentMatchedHeroIds.has(d.id)) return d.radius + 8;
          // 创建脉冲效果：圆环半径随时间变化
          const pulseRadius = d.radius + 8 + 4 * Math.sin(highlightProgress * Math.PI * 2);
          return pulseRadius;
        });

      // Continue animation loop
      animationRef.current = requestAnimationFrame(particleAnimation);
    };

    // Start particle animation loop
    animationRef.current = requestAnimationFrame(particleAnimation);

    simulation.on('tick', () => {
      link.attr('x1', d => (d.source as NodeDatum).x || 0).attr('y1', d => (d.source as NodeDatum).y || 0).attr('x2', d => (d.target as NodeDatum).x || 0).attr('y2', d => (d.target as NodeDatum).y || 0);
      nodeGroup.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // 防抖的节点位置保存函数（使用 ref 跨 effect 保持状态）
    const debouncedSaveNodePositions = () => {
      if (savePositionTimerRef.current) clearTimeout(savePositionTimerRef.current);
      savePositionTimerRef.current = setTimeout(() => {
        nodes.forEach(node => {
          if (node.x !== undefined && node.y !== undefined) {
            nodePositionsRef.current.set(node.id, { x: node.x, y: node.y });
          }
        });
        try {
          const data = JSON.stringify(Object.fromEntries(nodePositionsRef.current));
          localStorage.setItem('nodePositions', data);
        } catch {}
        savePositionTimerRef.current = null;
      }, 1000);
    };
    
    simulation.on('end', debouncedSaveNodePositions);

    // Trigger initial visual update after SVG is built
    requestAnimationFrame(() => {
      if (selectedHeroes.length > 0 && nodeGroupRef.current && linkSelectionRef.current && simulationRef.current) {
        updateGraphVisuals();
        simulationRef.current.alpha(0.1).restart();
      }
    });

    svg.on('click', () => onHeroSelectRef.current([]));

    return () => { 
      simulation.stop(); 
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Final position save is already triggered by simulation.stop() → 'end' event → debouncedSavePositions
      nodeGroupRef.current = null;
      linkSelectionRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    prepareData,
    selectedRole,
    language,
    handleHeroClick,
  ]);

  // Incremental visual update function - updates DOM attributes without rebuilding SVG
  const updateGraphVisuals = useCallback(() => {
    const nodeGroup = nodeGroupRef.current;
    const linkSelection = linkSelectionRef.current;
    const simulation = simulationRef.current;
    if (!nodeGroup || !linkSelection || !simulation) return;

    const selectedHeroes = currentSelectedHeroesRef.current;
    const activeCounterTab = currentActiveCounterTabRef.current;
    const isMultiSelect = currentIsMultiSelectRef.current;
    const commonRelatedIds = currentCommonRelatedIdsRef.current;
    const mapRecommendedHeroes = currentMapRecommendedHeroesRef.current;

    if (selectedHeroes.length > 0) {
      simulation.alpha(0.1).restart();

      nodeGroup.transition().duration(300).style('opacity', d => {
        if (selectedHeroes.includes(d.id)) return 0.85;

        let isRelated;
        if (isMultiSelect) {
          isRelated = commonRelatedIds.has(d.id);
        } else {
          const targetHero: HeroId = selectedHeroes[0];
          if (activeCounterTab === 'synergy') {
            isRelated = hasSynergyRelation(d.id, targetHero);
          } else {
            isRelated = activeCounterTab === 'counteredBy'
              ? hasCounterRelation(d.id, targetHero)
              : hasCounterRelation(targetHero, d.id);
          }
        }
        return isRelated ? 1 : 0.7;
      });

      nodeGroup.select('.node-name').transition().duration(300).style('opacity', 1);
      nodeGroup.each(function (d) {
        const group = d3.select(this);

        let relation;
        if (isMultiSelect) {
          if (commonRelatedIds.has(d.id)) {
            // O(1) Map 查找
            const commonItem = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
              .find(item => item.hero.id === d.id);
            if (commonItem) {
              relation = { strength: commonItem.strength };
            }
          }
        } else {
          const targetHero: HeroId = selectedHeroes[0];
          const str = activeCounterTab === 'synergy'
            ? getSynergyStrength(d.id, targetHero)
            : (activeCounterTab === 'counteredBy'
              ? getCounterStrength(d.id, targetHero)
              : getCounterStrength(targetHero, d.id));
          if (str !== undefined) {
            relation = { strength: str };
          }
        }
        
        let scale = 0.8;
        if (selectedHeroes.includes(d.id)) scale = 1.5;
        else if (relation) scale = relation.strength === 3 ? 1.3 : relation.strength === 2 ? 1.1 : 1.0;
        
        const r = d.radius * scale;
        const imgR = (d.radius - 2) * scale;
        group.select('.node-circle').transition().duration(300).attr('r', r);
        group.select('.glow-ring').transition().duration(300).attr('r', r + 4);
        group.select('image').transition().duration(300).attr('x', -imgR).attr('y', -imgR).attr('width', imgR * 2).attr('height', imgR * 2);
        d3.select(`#clip-${d.id} circle`).transition().duration(300).attr('r', imgR);
        group.select('.node-name').transition().duration(300).attr('dy', r + 20);
        
        // Update selection indicator
        group.select('.selection-indicator')
          .transition()
          .duration(300)
          .style('opacity', selectedHeroes.includes(d.id) ? 1 : 0)
          .attr('transform', `translate(${(scale - 1) * d.radius}, ${(scale - 1) * d.radius})`);

        const isRecommended = selectedMap && mapRecommendedHeroes.includes(d.id);
        // 判断是否与选中节点有关系
        let hasRelation = false;
        if (selectedHeroes.length > 0) {
          if (isMultiSelect) {
            hasRelation = selectedHeroes.includes(d.id) || commonRelatedIds.has(d.id);
          } else {
            const targetHero: HeroId = selectedHeroes[0];
            hasRelation = activeCounterTab === 'synergy'
              ? (hasSynergyRelation(d.id, targetHero) || d.id === targetHero)
              : activeCounterTab === 'counteredBy'
                ? (hasCounterRelation(d.id, targetHero) || d.id === targetHero)
                : (hasCounterRelation(targetHero, d.id) || d.id === targetHero);
          }
        }
        // 有关系时完全不透明，无关系时半透明
        const labelOpacity = isRecommended ? (hasRelation ? 1 : 0.5) : 0;
        group.select('.map-strong-label')
          .transition()
          .duration(300)
          .style('opacity', labelOpacity)
          .attr('transform', `translate(0, ${-(scale - 1) * d.radius})`);
      });

      // 使用 selection.each 预计算一次，避免 5 个 attr 回调各自重复 .find()
      linkSelection.each(function(d) {
        const el = d3.select(this);
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;

        let isRelevant = false;
        let s = 1;

        if (isMultiSelect) {
          if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
            isRelevant = selectedHeroes.includes(targetId) && commonRelatedIds.has(sourceId);
            if (isRelevant) {
              s = activeCounterTab === 'synergy'
                ? (getSynergyStrength(sourceId, targetId) ?? 1)
                : (getCounterStrength(sourceId, targetId) ?? 1);
            }
          } else {
            isRelevant = selectedHeroes.includes(sourceId) && commonRelatedIds.has(targetId);
            if (isRelevant) s = getCounterStrength(sourceId, targetId) ?? 1;
          }
        } else {
          const targetHero = selectedHeroes[0];
          isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
          if (isRelevant) {
            s = activeCounterTab === 'synergy'
              ? (getSynergyStrength(sourceId, targetId) ?? 1)
              : (getCounterStrength(sourceId, targetId) ?? 1);
          }
        }

        // 一次性设置所有属性（5 次 find → 1 次 Map.get）
        if (!isRelevant) {
          el.attr('stroke-opacity', 0.01).attr('stroke-width', 1).attr('stroke', '#334155').attr('marker-end', null);
        } else {
          const opacity = s === 3 ? 1.0 : s === 2 ? 0.5 : 0.25;
          const width = s === 3 ? 15 : s === 2 ? 9 : 4.5;
          if (activeCounterTab === 'synergy') {
            el.attr('stroke-opacity', opacity).attr('stroke-width', width).attr('stroke', '#a855f7').attr('marker-end', null);
          } else if (activeCounterTab === 'counteredBy') {
            el.attr('stroke-opacity', opacity).attr('stroke-width', width)
              .attr('stroke', s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5')
              .attr('marker-end', `url(#arrow-red-${s})`);
          } else {
            el.attr('stroke-opacity', opacity).attr('stroke-width', width)
              .attr('stroke', s === 3 ? '#15803d' : s === 2 ? '#22c55e' : '#86efac')
              .attr('marker-end', `url(#arrow-green-${s})`);
          }
        }
      });
    } else {
      simulation.alpha(0.08).restart();

      nodeGroup.transition().duration(300).style('opacity', 1);
      nodeGroup.select('.node-name').transition().duration(300).style('opacity', 1);
      nodeGroup.each(function (d) {
        const group = d3.select(this);
        group.select('.node-circle').transition().duration(300).attr('r', d.radius);
        group.select('.glow-ring').transition().duration(300).attr('r', d.radius + 4);
        group.select('image').transition().duration(300).attr('x', -(d.radius - 2)).attr('y', -(d.radius - 2)).attr('width', (d.radius - 2) * 2).attr('height', (d.radius - 2) * 2);
        d3.select(`#clip-${d.id} circle`).transition().duration(300).attr('r', d.radius - 2);
        group.select('.node-name').transition().duration(300).attr('dy', d.radius + 20);

        const isRecommended = selectedMap && mapRecommendedHeroes.includes(d.id);
        // 无选中节点时，所有地图推荐英雄标签正常显示
        group.select('.map-strong-label')
          .transition()
          .duration(300)
          .style('opacity', isRecommended ? 1 : 0)
          .attr('transform', 'translate(0, 0)');
      });
      // 无选中状态：使用 each 预计算，4 次 O(R) find → 1 次 O(1) Map.get
      linkSelection.each(function(d) {
        const el = d3.select(this);
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;

        if (activeCounterTab === 'synergy') {
          const s = getSynergyStrength(sourceId, targetId) ?? 1;
          el.attr('stroke-opacity', s === 3 ? 0.5 : s === 2 ? 0.15 : 0.05)
            .attr('stroke-width', s === 3 ? 4.5 : s === 2 ? 3 : 1.5)
            .attr('stroke', '#a855f7')
            .attr('marker-end', null);
        } else {
          const s = getCounterStrength(sourceId, targetId) ?? 1;
          el.attr('stroke-opacity', s === 3 ? 0.5 : s === 2 ? 0.15 : 0.05)
            .attr('stroke-width', s === 3 ? 4.5 : s === 2 ? 3 : 1.5)
            .attr('stroke', s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5')
            .attr('marker-end', `url(#arrow-red-${s})`);
        }
      });
    }
  }, [selectedMap, synergyPartners, counteredBy, counters]);

  // Phase 2: Incremental visual update - only runs when visual state changes, NOT on role/language
  useEffect(() => {
    if (!nodeGroupRef.current || !linkSelectionRef.current || !simulationRef.current) return;
    updateGraphVisuals();
  }, [selectedHeroes, activeCounterTab, isMultiSelect, commonRelatedIds, matchedHeroIds, updateGraphVisuals]);

  const handleZoomIn = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 1.3);
  const handleZoomOut = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 0.7);
  const handleReset = () => { if (svgRef.current) d3.select(svgRef.current).transition().duration(500).call(zoomRef.current!.transform, d3.zoomIdentity); onHeroSelect([]); };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* 地图数据操作面板 - 左上角 */}
      {mapDataActions && (
        <div className={`absolute top-4 left-[25.625rem] z-20 border border-slate-700 px-3 py-2 rounded-lg bg-slate-800/60 backdrop-blur-md transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-80'}`}>
          <span className="text-xs text-slate-400 block mb-1">{t('saveCustomData')}</span>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={mapDataActions.exportMapData}
                  className={`p-1.5 rounded transition-colors ${mapDataActions.hasMapUnsavedChanges ? 'animate-pulse bg-cyan-500/20' : 'hover:bg-slate-700'}`}
                >
                  <Save className={`w-4 h-4 ${mapDataActions.hasMapUnsavedChanges ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className={`p-2 z-[100] ${mapDataActions.hasMapUnsavedChanges ? 'bg-cyan-600 border-cyan-500/50' : 'bg-slate-900 border-slate-700'}`}>
                <p className="text-xs font-medium text-white">{mapDataActions.hasMapUnsavedChanges ? t('unsavedChanges') : t('exportData')}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="p-1.5 rounded hover:bg-slate-700 transition-colors cursor-pointer">
                  <MonitorDown className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={mapDataActions.importMapData}
                    className="hidden"
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-slate-900 border-slate-700 p-2 z-[100]">
                <p className="text-xs text-white">{t('importData')}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={mapDataActions.clearAllMapData}
                  className="p-1.5 rounded hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400 hover:text-red-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-slate-900 border-slate-700 p-2 z-[100]">
                <p className="text-xs text-white">{t('clearAllData')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {/* 自定义关系数据操作面板 - 右上角 */}
      <div className={cn(
        "absolute top-4 right-[25.625rem] z-20 border border-slate-700 px-3 py-2 rounded-lg bg-slate-800/60 backdrop-blur-md transition-transform duration-300",
        isCounterPanelCollapsed ? "translate-x-80" : "translate-x-0"
      )}>
        <span className="text-xs text-slate-400 block mb-1">{t('saveCustomData')}</span>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={exportForceGraphData}
                className={`p-1.5 rounded transition-colors ${hasForceGraphUnsavedChanges ? 'animate-pulse bg-cyan-500/20' : 'hover:bg-slate-700'}`}
              >
                <Save className={`w-4 h-4 ${hasForceGraphUnsavedChanges ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className={`p-2 z-[100] ${hasForceGraphUnsavedChanges ? 'bg-cyan-600 border-cyan-500/50' : 'bg-slate-900 border-slate-700'}`}>
              <p className="text-xs font-medium text-white">{hasForceGraphUnsavedChanges ? t('unsavedChanges') : t('exportData')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <label className="p-1.5 rounded hover:bg-slate-700 transition-colors cursor-pointer">
                <MonitorDown className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                <input
                  type="file"
                  accept=".json"
                  onChange={importForceGraphData}
                  className="hidden"
                />
              </label>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-900 border-slate-700 p-2 z-[100]">
              <p className="text-xs text-white">{t('importData')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={clearAllForceGraphData}
                className="p-1.5 rounded hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-400 hover:text-red-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-900 border-slate-700 p-2 z-[100]">
              <p className="text-xs text-white">{t('clearAllData')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* 英雄详情面板 */}
      <div className={cn(
        "absolute z-10 w-96 flex flex-col transition-transform duration-300",
        isCounterPanelCollapsed ? "translate-x-80" : "translate-x-0"
      )} style={{ top: '1rem', right: '1rem', bottom: '1rem' }}>
        {/* 折叠按钮 - 放在面板左侧外面 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsCounterPanelCollapsed(!isCounterPanelCollapsed)}
              className="absolute -left-[2.375rem] top-1/2 -translate-y-1/2 z-20 w-7 h-14 bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group pointer-events-auto"
            >
              <ChevronLeft className={`w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-transform duration-200 ${isCounterPanelCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isCounterPanelCollapsed ? '展开面板' : '收起面板'}</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex-1 overflow-hidden pointer-events-auto h-full relative">
          <Card className="p-3 bg-slate-800/60 border-slate-700 backdrop-blur-md shadow-xl h-full flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <h3 className="text-lg font-bold text-slate-100">
                {t('heroCounterPanel')}
                {selectedMapData && (
                  <span className="ml-2 text-sm font-normal text-cyan-400">
                    {getHeroName(selectedMapData as unknown as Hero, language) || selectedMapData.name}
                  </span>
                )}
              </h3>
              <a
                href="https://wj.qq.com/s2/25853153/9804/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-400 underline-offset-2 transition-all"
              >
                {t('counterRelationsSurvey')}
              </a>
            </div>

            {displayedHero || isMultiSelect ? (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-4 mb-4 flex-shrink-0" onMouseDown={handlePanelDragStart}>
                  {displayedHero ? (
                    <>
                      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ border: `0.1875rem solid ${displayedHero.color}`, backgroundColor: '#1a1a2e' }}>
                        <img src={displayedHero.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-100 leading-tight">{getHeroName(displayedHero, language)}</h3>
                          <Badge variant="outline" className="text-xs px-2 py-0" style={{ borderColor: displayedHero.color, color: displayedHero.color }}>{getRoleName(displayedHero.role, language)}</Badge>
                          {selectedMap && mapRecommendedHeroes.includes(displayedHero.id) && (
                            <Badge variant="outline" className="text-xs px-2 py-0 text-cyan-400 border-cyan-400/50 bg-cyan-400/10">
                              {t('mapRecommended')}
                            </Badge>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => restoreHeroRelations(displayedHero.id)}
                                className="flex items-center gap-1 p-1 rounded hover:bg-slate-600/50 text-slate-500 hover:text-cyan-400 transition-colors flex-shrink-0"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span className="text-xs hover:text-cyan-400">{t('restoreHeroRelations')}</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('restoreHeroRelations')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-xs text-slate-200 leading-tight mt-0.5">{language === 'zh' ? displayedHero?.nameEn : displayedHero?.name}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-100 leading-tight mb-3">
                        {t('multiSelectMode')}
                        <span className="ml-2 text-sm font-normal text-slate-400">
                          {t('selected') + ' ' + selectedHeroes.length + t('heroesCount')}
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedHeroes.map(heroId => {
                          const hero = heroes.find(h => h.id === heroId);
                          if (!hero) return null;
                          return (
                            <div key={heroId} className="flex items-center gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-700/50 min-w-0 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ border: `0.125rem solid ${hero.color}`, backgroundColor: '#1a1a2e' }}>
                                <img src={hero.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-bold text-slate-100 truncate">{getHeroName(hero, language)}</span>
                                  <span className="text-[0.625rem] px-1 py-0.5 rounded border font-medium" style={{ borderColor: hero.color, color: hero.color }}>
                                    {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                                  </span>
                                </div>
                                <p className="text-[0.625rem] text-slate-400 truncate">{language === 'zh' ? hero.nameEn : hero.name}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <Tabs value={activeCounterTab} onValueChange={(v) => setActiveCounterTab(v as any)} className="flex-1 flex flex-col min-h-0">
                  <TabsList className="grid w-full grid-cols-3 mb-2 bg-slate-800/50 p-1 h-9 flex-shrink-0">
                    <TabsTrigger value="counteredBy" className="text-white data-[state=active]:bg-red-600 flex items-center justify-center gap-1.5 px-2 h-7 min-w-0">
                      <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-[0.6875rem] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('counteredBy')}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMultiSelect ? t('commonPrefix') : ''}{t('counteredBy')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TabsTrigger>

                    <TabsTrigger value="counters" className="text-white data-[state=active]:bg-green-600 flex items-center justify-center gap-1.5 px-2 h-7 min-w-0">
                      <Swords className="w-3.5 h-3.5 flex-shrink-0" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-[0.6875rem] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('counters')}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMultiSelect ? t('commonPrefix') : ''}{t('counters')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TabsTrigger>

                    <TabsTrigger value="synergy" className="text-white data-[state=active]:bg-purple-600 flex items-center justify-center gap-1.5 px-2 h-7 min-w-0">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-[0.6875rem] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('synergy')}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMultiSelect ? t('commonPrefix') : ''}{t('synergy')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="counteredBy" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-red-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                    {selectedHeroes.length > 0 && (
                      <>
                        {renderHeroList(counteredBy, 3, 'bg-red-900/30 border-red-700/50', selectedHeroes)}
                        {renderHeroList(counteredBy, 2, 'bg-red-800/20 border-red-600/40', selectedHeroes)}
                        {renderHeroList(counteredBy, 1, 'bg-red-700/10 border-red-500/30', selectedHeroes)}
                        {!isMultiSelect && (
                          <>
                            {!isAddingCustomRelation ? (
                              <button
                                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-600 hover:border-red-500 text-white hover:text-red-400 transition-all"
                                onClick={() => {
                                  setIsAddingCustomRelation(true);
                                  // 延迟滚动以确保 DOM 已更新
                                  setTimeout(() => {
                                    addRelationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                  }, 50);
                                }}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-xs">{t('addCustomCounter')}</span>
                              </button>
                            ) : (
                              <div ref={addRelationFormRef} data-prevent-map-toggle className="flex flex-col gap-2 p-3 rounded-lg bg-slate-700/50 border border-red-500/30">
                                <Select value={newRelationTarget} onValueChange={(value) => setNewRelationTarget(value as HeroId)}>
                                  <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                    <span className={newRelationTarget ? 'text-white' : 'text-slate-400'}>
                                      {newRelationTarget ? getHeroName(heroes.find(h => h.id === newRelationTarget), language) : t('selectTargetHero')}
                                    </span>
                                  </SelectTrigger>
                                  <SelectContent position="popper" className="bg-slate-800 border-slate-600 max-h-60 z-[9999]">
                                    {heroes
                                      .filter(h => h.id !== selectedHero && !counteredBy.some(c => c.hero.id === h.id))
                                      .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
                                      .map(hero => (
                                        <SelectItem key={hero.id} value={hero.id} className="text-white hover:bg-slate-700">
                                          <div className="flex items-center gap-2">
                                            <img src={hero.image} alt="" className="w-5 h-5 rounded-full" />
                                            <span>{getHeroName(hero, language)}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <Select value={String(newRelationStrength)} onValueChange={(v) => setNewRelationStrength(Number(v) as RelationStrength)}>
                                  <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                    <span className="text-white">{newRelationStrength === 3 ? t('hardCounter') : newRelationStrength === 2 ? t('strongCounter') : t('softCounter')} LV.{newRelationStrength}</span>
                                  </SelectTrigger>
                                  <SelectContent position="popper" className="bg-slate-800 border-slate-600 z-[9999]">
                                    <SelectItem value="3" className="text-white hover:bg-slate-700">{t('hardCounter')} LV.3</SelectItem>
                                    <SelectItem value="2" className="text-white hover:bg-slate-700">{t('strongCounter')} LV.2</SelectItem>
                                    <SelectItem value="1" className="text-white hover:bg-slate-700">{t('softCounter')} LV.1</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs text-slate-400 hover:text-white"
                                    onClick={() => { setIsAddingCustomRelation(false); setNewRelationTarget(''); }}
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    {t('cancel')}
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-7 px-2 text-xs bg-red-600 hover:bg-red-700"
                                    onClick={addCustomCounterRelation}
                                    disabled={!newRelationTarget}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    {t('add')}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {counteredBy.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('notCounteredByAny')}</div>}
                  </TabsContent>

                  <TabsContent value="counters" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-green-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                    {selectedHeroes.length > 0 && (
                      <>
                        {renderHeroList(counters, 3, 'bg-green-900/30 border-green-700/50', selectedHeroes, true)}
                        {renderHeroList(counters, 2, 'bg-green-800/20 border-green-600/40', selectedHeroes, true)}
                        {renderHeroList(counters, 1, 'bg-green-700/10 border-green-500/30', selectedHeroes, true)}
                        {!isMultiSelect && (
                          <>
                            {!isAddingCustomRelation ? (
                              <button
                                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-600 hover:border-green-500 text-slate-400 hover:text-green-400 transition-all"
                                onClick={() => {
                                  setIsAddingCustomRelation(true);
                                  // 延迟滚动以确保 DOM 已更新
                                  setTimeout(() => {
                                    addRelationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                  }, 50);
                                }}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-xs">{t('addCustomCounter')}</span>
                              </button>
                            ) : (
                              <div ref={addRelationFormRef} data-prevent-map-toggle className="flex flex-col gap-2 p-3 rounded-lg bg-slate-700/50 border border-green-500/30">
                                <Select value={newRelationTarget} onValueChange={(value) => setNewRelationTarget(value as HeroId)}>
                                  <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                    <span className={newRelationTarget ? 'text-white' : 'text-slate-400'}>
                                      {newRelationTarget ? getHeroName(heroes.find(h => h.id === newRelationTarget), language) : t('selectTargetHero')}
                                    </span>
                                  </SelectTrigger>
                                  <SelectContent position="popper" className="bg-slate-800 border-slate-600 max-h-60 z-[9999]">
                                    {heroes
                                      .filter(h => h.id !== selectedHero && !counters.some(c => c.hero.id === h.id))
                                      .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
                                      .map(hero => (
                                        <SelectItem key={hero.id} value={hero.id} className="text-white hover:bg-slate-700">
                                          <div className="flex items-center gap-2">
                                            <img src={hero.image} alt="" className="w-5 h-5 rounded-full" />
                                            <span>{getHeroName(hero, language)}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <Select value={String(newRelationStrength)} onValueChange={(v) => setNewRelationStrength(Number(v) as RelationStrength)}>
                                  <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                    <span className="text-white">{newRelationStrength === 3 ? t('hardCounter') : newRelationStrength === 2 ? t('strongCounter') : t('softCounter')} LV.{newRelationStrength}</span>
                                  </SelectTrigger>
                                  <SelectContent position="popper" className="bg-slate-800 border-slate-600 z-[9999]">
                                    <SelectItem value="3" className="text-white hover:bg-slate-700">{t('hardCounter')} LV.3</SelectItem>
                                    <SelectItem value="2" className="text-white hover:bg-slate-700">{t('strongCounter')} LV.2</SelectItem>
                                    <SelectItem value="1" className="text-white hover:bg-slate-700">{t('softCounter')} LV.1</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs text-slate-400 hover:text-white"
                                    onClick={() => { setIsAddingCustomRelation(false); setNewRelationTarget(''); }}
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    {t('cancel')}
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700"
                                    onClick={addCustomCounterRelation}
                                    disabled={!newRelationTarget}
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    {t('add')}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {counters.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('noCounters')}</div>}
                  </TabsContent>

                  <TabsContent value="synergy" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-purple-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                    {selectedHeroes.length > 0 && (
                      <>
                        {(synergyPartners.length > 0 || !isMultiSelect) && (
                          <div className="space-y-2">
                            {synergyPartners.map(partner => {
                              const hero = partner.hero;
                              if (!hero) return null;
                              // 使用类型断言获取可选属性
                              const isCustom = (partner as { isCustom?: boolean }).isCustom ?? false;
                              const source = (partner as { source?: string }).source;
                              const target = (partner as { target?: string }).target;
                              const relationSource = source || hero.id;
                              const relationTarget = target || selectedHeroes[0];
                              return (
                                <div key={hero.id} className="flex items-start gap-3 p-2 rounded-lg border bg-purple-900/20 border-purple-700/30 group">
                                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/50 flex-shrink-0">
                                    <img src={hero.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-sm font-bold text-white">{getHeroName(hero, language)}</span>
                                          <span className={`text-[0.625rem] px-1.5 py-0.5 rounded border font-medium ${hero.role === 'tank' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : hero.role === 'damage' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                                            {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                                          </span>
                                          {isCustom && (
                                            <Badge variant="outline" className="text-[0.5625rem] px-1 py-0 text-white border-white/50 bg-white/10">
                                              {t('custom')}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1.5 flex-shrink-0">
                                        {selectedMap && mapRecommendedHeroes.includes(hero.id) && (
                                          <Badge variant="secondary" className="text-[0.5625rem] px-1 py-0 font-bold bg-cyan-400">
                                            {t('mapRecommended')}
                                          </Badge>
                                        )}
                                        <Badge variant="secondary" className={`text-[0.5625rem] px-1 py-0 text-slate-900 font-bold shadow-sm border-none ${partner.strength === 3 ? 'bg-red-500' : partner.strength === 2 ? 'bg-yellow-500' : 'bg-slate-400'}`}>
                                          {partner.strength === 3 ? t('hardCounter').replace('Counter', 'Synergy').replace('克制', '契合') : partner.strength === 2 ? t('strongCounter').replace('Counter', 'Synergy').replace('克制', '契合') : t('softCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.{partner.strength}
                                        </Badge>
                                        {!isMultiSelect && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isCustom) {
                                                const customIndex = customSynergyRelations.findIndex(
                                                  r => r.source === relationSource && r.target === relationTarget
                                                );
                                                if (customIndex !== -1) {
                                                  removeCustomSynergyRelation(customIndex);
                                                }
                                              } else {
                                                deleteDefaultSynergyRelation(relationSource, relationTarget);
                                              }
                                            }}
                                            className="ml-1 p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-opacity"
                                            title={t('delete')}
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-[0.6875rem] text-purple-300 leading-relaxed mt-1">
                                      {!isMultiSelect 
                                        ? getSynergyReason(hero.id, selectedHeroes[0], language)
                                        : (() => {
                                            const targetHeroNames = selectedHeroes.map(id => {
                                              const h = heroes.find(hero => hero.id === id);
                                              return h ? getHeroName(h, language) : '';
                                            }).filter(name => name).join(t('listSeparator'));
                                            const currentHeroName = getHeroName(hero, language);
                                            
                                            return language === 'zh'
                                              ? `${currentHeroName} 与 ${targetHeroNames} 形成${hero.role === 'tank' ? '前排保护' : hero.role === 'damage' ? '火力压制' : '治疗支援'}的完美协同，${partner.strength === 3 ? '极大提升' : partner.strength === 2 ? '有效增强' : '适当补充'}团队作战能力`
                                              : `${currentHeroName} synergizes perfectly with ${targetHeroNames} for ${hero.role === 'tank' ? 'frontline protection' : hero.role === 'damage' ? 'firepower suppression' : 'healing support'}, ${partner.strength === 3 ? 'significantly boosting' : partner.strength === 2 ? 'effectively enhancing' : 'appropriately supplementing'} team combat capabilities`;
                                          })()}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                            {!isMultiSelect && (
                              <>
                                {!isAddingCustomSynergy ? (
                                  <button
                                    className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-600 hover:border-purple-500 text-slate-400 hover:text-purple-400 transition-all"
                                    onClick={() => {
                                      setIsAddingCustomSynergy(true);
                                      setTimeout(() => {
                                        addSynergyFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                      }, 50);
                                    }}
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-xs">{t('addCustomSynergy')}</span>
                                  </button>
                                ) : (
                                  <div ref={addSynergyFormRef} data-prevent-map-toggle className="flex flex-col gap-2 p-3 rounded-lg bg-slate-700/50 border border-purple-500/30">
                                    <Select value={newSynergyTarget} onValueChange={(value) => setNewSynergyTarget(value as HeroId)}>
                                      <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                        <span className={newSynergyTarget ? 'text-white' : 'text-slate-400'}>
                                          {newSynergyTarget ? getHeroName(heroes.find(h => h.id === newSynergyTarget), language) : t('selectTargetHero')}
                                        </span>
                                      </SelectTrigger>
                                      <SelectContent position="popper" className="bg-slate-800 border-slate-600 max-h-60 z-[9999]">
                                        {heroes
                                          .filter(h => h.id !== selectedHero && !synergyPartners.some(p => p.hero.id === h.id))
                                          .sort((a, b) => roleOrder[a.role] - roleOrder[b.role])
                                          .map(hero => (
                                            <SelectItem key={hero.id} value={hero.id} className="text-white hover:bg-slate-700">
                                              <div className="flex items-center gap-2">
                                                <img src={hero.image} alt="" className="w-5 h-5 rounded-full" />
                                                <span>{getHeroName(hero, language)}</span>
                                              </div>
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                    <Select value={String(newSynergyStrength)} onValueChange={(v) => setNewSynergyStrength(Number(v) as RelationStrength)}>
                                      <SelectTrigger className="h-8 bg-slate-800 border-slate-600 text-sm w-full">
                                        <span className="text-white">{newSynergyStrength === 3 ? t('hardCounter').replace('Counter', 'Synergy').replace('克制', '契合') : newSynergyStrength === 2 ? t('strongCounter').replace('Counter', 'Synergy').replace('克制', '契合') : t('softCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.{newSynergyStrength}</span>
                                      </SelectTrigger>
                                      <SelectContent position="popper" className="bg-slate-800 border-slate-600 z-[9999]">
                                        <SelectItem value="3" className="text-white hover:bg-slate-700">{t('hardCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.3</SelectItem>
                                        <SelectItem value="2" className="text-white hover:bg-slate-700">{t('strongCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.2</SelectItem>
                                        <SelectItem value="1" className="text-white hover:bg-slate-700">{t('softCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.1</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <div className="flex gap-2 justify-end">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs text-slate-400 hover:text-white"
                                        onClick={() => { setIsAddingCustomSynergy(false); setNewSynergyTarget(''); }}
                                      >
                                        <X className="w-3 h-3 mr-1" />
                                        {t('cancel')}
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-7 px-2 text-xs bg-purple-600 hover:bg-purple-700"
                                        onClick={addCustomSynergyRelation}
                                        disabled={!newSynergyTarget}
                                      >
                                        <Plus className="w-3 h-3 mr-1" />
                                        {t('add')}
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  {synergyPartners.length === 0 && isMultiSelect && <div className="text-center py-6 text-slate-200 text-xs">{t('noSynergy')}</div>}
                </TabsContent>
              </Tabs>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-white">{activeCounterTab === 'counteredBy' ? t('counteredByTemplate') : activeCounterTab === 'counters' ? t('countersTemplate') : t('synergyDesc')}</span>
                    </div>
                    {(activeCounterTab === 'synergy' ? synergyPartners.length > 0 : (activeCounterTab === 'counteredBy' ? counteredBy : counters).length > 0) && (
                      <Button variant="ghost" size="sm" className={`h-7 px-2 text-[0.625rem] gap-1.5 hover:bg-slate-800 text-slate-200 ${activeCounterTab === 'synergy' ? 'hover:text-purple-400' : 'hover:text-cyan-400'}`} onClick={(e) => {
                        e.stopPropagation();
                        let text = '';
                        const commonHeroesNames = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
                          .map(p => getHeroName(p.hero, language)).join(', ');
                        
                        if (isMultiSelect) {
                          const selectedHeroNames = selectedHeroes.map(id => {
                            const h = heroes.find(hero => hero.id === id);
                            return h ? getHeroName(h, language) : '';
                          }).filter(name => name).join(', ');
                          
                          if (activeCounterTab === 'synergy') {
                            text = `${selectedHeroNames} ${t('commonSynergy')} ${t('heroes')} ${commonHeroesNames}`;
                          } else {
                            const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = getHeroName(i.hero, language);
                                return name;
                              }).join(', ')}` : '';
                            const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                            const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                            const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                            const groups = [strong3, strong2, strong1].filter(Boolean).join(' | ');
                            const header = activeCounterTab === 'counteredBy' 
                              ? `${selectedHeroNames}${t('commonCounteredBy')}` 
                              : `${selectedHeroNames}${t('commonCounters')}`;
                            text = `${header} ${groups}`;
                          }
                        } else {
                          const hName = getHeroName(displayedHero, language);
                          if (activeCounterTab === 'synergy') {
                            text = `${hName} ${t('synergy')} ${t('heroes')} ${commonHeroesNames}`;
                          } else {
                            const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = getHeroName(i.hero, language);
                                return name;
                              }).join(', ')}` : '';
                            const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                            const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                            const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                            const groups = [strong3, strong2, strong1].filter(Boolean).join(' | ');
                            const header = activeCounterTab === 'counteredBy' ? `${hName}${t('counteredByHeader')}` : `${hName}${t('countersHeader')}`;
                            text = `${header} ${groups}`;
                          }
                        }
                        handleCopyToClipboard(text);
                      }}>
                        {isCopied ? <><Check className="w-3.5 h-3.5 text-green-500" /><span>{t('copied')}</span></> : <><Copy className="w-3.5 h-3.5" /><span>{t('copy')}</span></>}
                      </Button>
                    )}
                  </div>
                  <p className="text-[0.625rem] text-slate-200 mb-2 leading-tight">{t('copyTip')}</p>
                  <div
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-200 select-all cursor-pointer hover:border-slate-700 relative group transition-colors"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      let text = '';
                      const commonHeroesNames = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
                        .map(p => getHeroName(p.hero, language)).join(', ');

                      if (isMultiSelect) {
                        const selectedHeroNames = selectedHeroes.map(id => {
                          const h = heroes.find(hero => hero.id === id);
                          return h ? getHeroName(h, language) : '';
                        }).filter(name => name).join(', ');
                        
                        if (activeCounterTab === 'synergy') {
                          text = `${selectedHeroNames} ${t('commonSynergy')} ${t('heroes')} ${commonHeroesNames}`;
                        } else {
                          const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                          if (list.length > 0) {
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = getHeroName(i.hero, language);
                                return name;
                              }).join(', ')}` : '';
                            const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                            const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                            const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                            const groups = [strong3, strong2, strong1].filter(Boolean).join(' | ');
                            const header = activeCounterTab === 'counteredBy' 
                              ? `${selectedHeroNames}${t('commonCounteredBy')}` 
                              : `${selectedHeroNames}${t('commonCounters')}`;
                            text = `${header} ${groups}`;
                          }
                        }
                        handleCopyToClipboard(text);
                      } else if (displayedHero) {
                        if (activeCounterTab === 'synergy') {
                          if (synergyPartners.length > 0) {
                            text = `${getHeroName(displayedHero, language)} ${t('synergy')} ${t('heroes')} ${commonHeroesNames}`;
                            handleCopyToClipboard(text);
                          }
                        } else {
                          const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                          if (list.length > 0) {
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = getHeroName(i.hero, language);
                                return name;
                              }).join(', ')}` : '';
                            const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                            const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                            const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                            const groups = [strong3, strong2, strong1].filter(Boolean).join(' | ');
                            const header = activeCounterTab === 'counteredBy' ? `${getHeroName(displayedHero, language)}${t('counteredByHeader')}` : `${getHeroName(displayedHero, language)}${t('countersHeader')}`;
                            text = `${header} ${groups}`;
                            handleCopyToClipboard(text);
                          }
                        }
                      }
                    }}
                  >
                    {activeCounterTab === 'synergy' ? (
                      synergyPartners.length > 0 ? (
                        (() => {
                          const partnerNames = synergyPartners.map(p => {
                            const name = getHeroName(p.hero, language);
                            if (language === 'zh' && p.hero.nickname) {
                              return `${name}（${p.hero.nickname}）`;
                            }
                            return name;
                          }).join(t('listSeparator'));
                          
                          const selectedHeroNames = selectedHeroes.map(id => {
                            const h = heroes.find(hero => hero.id === id);
                            return h ? getHeroName(h, language) : '';
                          }).filter(name => name).join(t('listSeparator'));
                          
                          const hNameWithNickname = isMultiSelect ? selectedHeroNames : (
                            language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : 
                            getHeroName(displayedHero, language)
                          );
                          return <><div className="text-white font-bold text-2xl">{hNameWithNickname}</div><div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{isMultiSelect ? t('commonSynergy') : t('synergy')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div><div className="text-purple-300 font-medium">{partnerNames}</div></>;
                        })()
                      ) : t('noSynergy')
                    ) : ((activeCounterTab === 'counteredBy' ? counteredBy : counters).length > 0 ? (
                      (() => {
                        const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                        const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                        list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                        const formatDisplay = (arr: typeof list, prefix: string, colorClass: string) =>
                          arr.length > 0 ? <div className={`font-medium ${colorClass}`}>{prefix}{arr.map(i => {
                            const name = getHeroName(i.hero, language);
                            if (language === 'zh' && i.hero.nickname) {
                              return `${name}（${i.hero.nickname}）`;
                            }
                            return name;
                          }).join(t('listSeparator'))}</div> : null;
                        
                        const selectedHeroNames = selectedHeroes.map(id => {
                          const h = heroes.find(hero => hero.id === id);
                          return h ? getHeroName(h, language) : '';
                        }).filter(name => name).join(t('listSeparator'));
                        
                        const hNameWithNickname = isMultiSelect ? selectedHeroNames : (
                          language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : 
                          getHeroName(displayedHero, language)
                        );
                        
                        if (isMultiSelect) {
                          if (activeCounterTab === 'counteredBy') {
                            // Countered By关系保持不变：被克制英雄 → 选择的英雄
                            return <>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-red-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-red-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-red-200')}<div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{isMultiSelect ? t('commonCountered') : t('counteredBy')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div><div className="text-white font-bold text-2xl">{hNameWithNickname}</div></>;
                          } else {
                            // CommonCounters关系互换：选择的英雄 → 被克制英雄
                            return <><div className="text-white font-bold text-2xl">{hNameWithNickname}</div><div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{isMultiSelect ? t('commonCounter') : t('counter')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-green-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-green-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-green-200')}</>;
                          }
                        }
                        if (activeCounterTab === 'counteredBy') {
                          return <>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-red-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-red-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-red-200')}<div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{isMultiSelect ? t('commonCountered') : t('counteredBy')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div><div className="text-white font-bold text-2xl">{hNameWithNickname}</div></>;
                        } else {
                          return <><div className="text-white font-bold text-2xl">{hNameWithNickname}</div><div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{isMultiSelect ? t('commonCounter') : t('counter')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-green-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-green-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-green-200')}</>;
                        }
                      })()
                    ) : t('noCounterData'))}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-[0.625rem] text-slate-200 bg-slate-900 px-1 rounded">{t('doubleClickToCopy')}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                <div className="text-center p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p>{t('selectHeroTip')}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className={`absolute bottom-6 left-[25.625rem] z-10 flex flex-col gap-3 pointer-events-auto transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-80'}`}>
        {/* 网络节点介绍 - 问号图标 */}
        <Popover open={isIntroOpen} onOpenChange={setIsIntroOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-10 h-10 rounded-full transition-all flex items-center justify-center"
              onMouseEnter={() => setIsIntroOpen(true)}
              onClick={(e) => e.preventDefault()}
            >
              <HelpCircle className="w-6 h-6 text-yellow-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="p-0 border-none bg-transparent shadow-none mb-3">
            <Card className="p-5 bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-2xl rounded-2xl w-96 text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-400" />
                  <span className="text-base font-black text-slate-200 uppercase tracking-widest">{t('networkNodeIntro')}</span>
                </div>
                <button
                  onClick={() => setIsIntroOpen(false)}
                  className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
                {/* 克制强度说明 - 节点尺寸 + 连线箭头 */}
                <div className="text-[0.6875rem] text-slate-200">

                  <p className="text-[0.625rem] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('nodeSizeTip')}</p>
                  <div className="flex items-center justify-center gap-6 px-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500/50">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[0.5625rem] text-red-400 font-medium">{t('nodeSizeLv3')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-orange-500/50">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[0.5625rem] text-orange-400 font-medium">{t('nodeSizeLv2')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-slate-500/50 opacity-70">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[0.5625rem] text-slate-400 font-medium">{t('nodeSizeLv1')}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[0.6875rem] text-slate-200">

                  <p className="text-[0.625rem] text-cyan-400 font-semibold uppercase tracking-wider mb-1 pt-4">{t('arrowDirection')} <span className="text-slate-400 normal-case font-normal">({t('whoCountersWho')})</span></p>
                  <div className="flex items-center gap-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-red-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <svg className="w-10 h-3 -mx-1" viewBox="0 0 40 12">
                          <defs>
                            <marker id="intro-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                            </marker>
                          </defs>
                          <line x1="0" y1="6" x2="40" y2="6" stroke="#ef4444" strokeWidth="2" markerEnd="url(#intro-red)" />
                        </svg>
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-red-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png" alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-green-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <svg className="w-10 h-3 -mx-1" viewBox="0 0 40 12">
                          <defs>
                            <marker id="intro-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                            </marker>
                          </defs>
                          <line x1="0" y1="6" x2="40" y2="6" stroke="#22c55e" strokeWidth="2" markerEnd="url(#intro-green)" />
                        </svg>
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-green-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png" alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 地图优势因素说明 */}
                <div className="text-[0.6875rem] text-slate-200">
                  <p className="text-[0.625rem] text-cyan-400 font-semibold uppercase tracking-wider mb-1 pt-4">{t('mapFactor')}</p>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-slate-300">{t('mapRecommendedTip')}</span>
                  </div>
                </div>

                <div className="text-[0.6875rem] text-slate-200">

                  <p className="text-[0.625rem] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('networkFilter')}</p>
                  <p className="text-[0.6875rem] text-slate-300 leading-relaxed mb-1">{t('networkFilterDesc')}</p>
                </div>

                {/* 交互说明 */}
                <div className="text-[0.6875rem] text-slate-200">
                  <p className="text-[0.625rem] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('interactionGuide')}</p>
                  <div className="space-y-1.5 mt-2">
                    
                    <div className="text-amber-300 flex items-start gap-2 bg-amber-900/20 p-2 rounded-lg border border-amber-800/30">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <span className="font-medium"> {t('multiSelectHeroes')}</span>
                        <span className="font-medium">{t('ctrlMultiSelect')}</span>
                      </span>
                    </div>
                    <div className="text-yellow-300 flex items-start gap-2 bg-yellow-900/20 p-2 rounded-lg border border-yellow-800/30">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <span className="font-medium">{t('snapshotFeature')} </span>
                        <span className="text-yellow-300/80">{t('snapshotFeatureDesc')}</span>
                      </span>
                    </div>
                    <div className="text-cyan-300 flex items-start gap-2 bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <p className="font-medium">{splitDesc(t('zoomDesc')).title} <span className="text-cyan-300/80">{splitDesc(t('zoomDesc')).content}</span></p>
                        <p className="font-medium">{splitDesc(t('touchZoomDesc')).title} <span className="text-cyan-300/80">{splitDesc(t('touchZoomDesc')).content}</span></p>
                      </span>
                    </div>
                    <div className="text-cyan-300 flex items-start gap-2 bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <p className="font-medium">{splitDesc(t('panDesc')).title} <span className="text-cyan-300/80">{splitDesc(t('panDesc')).content}</span></p>
                        <p className="font-medium">{splitDesc(t('touchPanDesc')).title} <span className="text-cyan-300/80">{splitDesc(t('touchPanDesc')).content}</span></p>
                      </span>
                    </div>
                    <div className="text-slate-300 flex items-start gap-2">
                      <span className="w-1 h-1 bg-slate-600 rounded-full mt-1 flex-shrink-0"></span>
                      <span><span className="font-medium">{splitDesc(t('clickDesc')).title}</span><span className="text-slate-400"> {splitDesc(t('clickDesc')).content}</span></span>
                    </div>
                    <div className="text-slate-300 flex items-start gap-2">
                      <span className="w-1 h-1 bg-slate-600 rounded-full mt-1 flex-shrink-0"></span>
                      <span><span className="font-medium">{splitDesc(t('dragDesc')).title}</span><span className="text-slate-400"> {splitDesc(t('dragDesc')).content}</span></span>
                    </div>
                      
                  </div>
                </div>
              </div>
            </Card>
          </PopoverContent>
        </Popover>

        {/* 缩放按钮横向排列 */}
        <div className="flex flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9"><ZoomIn className="w-4 h-4 text-cyan-400" /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('zoomIn') || "Zoom In"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9"><ZoomOut className="w-4 h-4 text-cyan-400" /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('zoomOut') || "Zoom Out"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={handleReset} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9"><RotateCcw className="w-4 h-4 text-cyan-400" /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('resetView') || "Reset View"}</TooltipContent>
          </Tooltip>
        </div>

      </div>

      <svg ref={svgRef} className="w-full h-full cursor-move force-graph-container" style={{ background: 'transparent' }} onWheel={(e) => e.stopPropagation()} onMouseDown={(e) => { if (e.button === 1) { e.preventDefault(); } }} />

      {/* 历史记录按钮 - 英雄克制面板左下角外侧 */}
      <div className={cn(
        "absolute bottom-6 right-[25.625rem] z-10 flex flex-row gap-2 pointer-events-auto transition-transform duration-300",
        isCounterPanelCollapsed ? "translate-x-80" : "translate-x-0"
      )}>
        <Popover open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9"
              disabled={heroSnapshots.length === 0}
              onMouseEnter={() => setIsHistoryOpen(true)}
            >
              <History className="w-4 h-4 text-yellow-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="top" 
            align="end"
            sideOffset={8}
            className="p-0 border-none bg-transparent shadow-none mb-3"
            onMouseEnter={() => setIsHistoryOpen(true)}
            onMouseLeave={() => setIsHistoryOpen(false)}
          >
            <Card className="p-5 bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-2xl rounded-2xl w-80 text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-200 uppercase tracking-widest">{t('historySnapshots')}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setHeroSnapshots([])}
                    className="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:text-red-400"
                    title={t('clearHistory')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="max-h-72 overflow-y-auto">
                {heroSnapshots.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    {t('noHistorySnapshots')}
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    {heroSnapshots.map(snapshot => {
                      const snapshotHeroes = snapshot.heroIds.map(id => heroes.find(h => h.id === id)).filter(Boolean);
                      const heroNames = snapshotHeroes.map(h => getHeroName(h, language)).join(', ');
                      const date = new Date(snapshot.timestamp);
                      const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

                      return (
                        <div
                          key={snapshot.id}
                          className="group flex items-center justify-between p-2 rounded-md bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer"
                          onClick={() => {
                            onHeroSelect(snapshot.heroIds);
                            setIsHistoryOpen(false);
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-slate-400 mb-1">{timeStr}</div>
                            <div className="text-sm text-slate-200 truncate">{heroNames}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHeroSnapshots(prev => prev.filter(s => s.id !== snapshot.id));
                            }}
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-80 pointer-events-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white z-10" />
          <Input
            type="text"
            placeholder={t('searchHeroesPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white placeholder:text-white focus:border-cyan-500 focus:ring-cyan-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

};

export default React.memo(ForceGraph);