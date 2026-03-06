import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCounterReason } from '@/data/counterReasons';
import { counterRelations, getRoleName, heroes, type Hero } from '@/data/heroData';
import { maps } from '@/data/mapData';
import { getSynergyReason } from '@/data/synergyReasons';
import { synergyRelations } from '@/data/synergyRelations';
import { useI18n } from '@/i18n';
import * as d3 from 'd3';
import {
  Check,
  Copy,
  FileText,
  HelpCircle,
  Info,
  RotateCcw,
  ShieldAlert,
  Swords,
  Users,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  nameEn: string;
  role: 'tank' | 'damage' | 'support';
  color: string;
  image: string;
  radius: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  source: string | NodeDatum;
  target: string | NodeDatum;
}

interface ForceGraphProps {
  selectedRole: string | null;
  selectedHeroes: string[];
  onHeroSelect: (heroIds: string[]) => void;
  isDrawerOpen?: boolean;
  selectedMap?: string | null;
}

const ForceGraph = ({
  selectedRole,
  selectedHeroes,
  onHeroSelect,
  isDrawerOpen = true,
  selectedMap = null
}: ForceGraphProps) => {
  const selectedMapData = useMemo(() => selectedMap ? maps.find(m => m.id === selectedMap) : null, [selectedMap]);
  const mapRecommendedHeroes = useMemo(() => selectedMapData?.recommendedHeroes || [], [selectedMapData]);

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

  const displayedHero = selectedHeroes.length === 1 ? heroes.find(h => h.id === selectedHeroes[0]) : null;
  const selectedHero = selectedHeroes.length === 1 ? selectedHeroes[0] : null;
  const [activeCounterTab, setActiveCounterTab] = useState<'counteredBy' | 'counters' | 'synergy'>('counteredBy');
  const [isCopied, setIsCopied] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const isMultiSelect = selectedHeroes.length > 1;

  const getCommonCounters = useCallback((heroIds: string[]) => {
    if (heroIds.length === 0) return [];
    
    return heroes
      .map(h => {
        const relations = heroIds.map(targetId => 
          counterRelations.find(r => r.source === h.id && r.target === targetId)
        );
        
        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength || 1));
          return { hero: h, strength: minStrength };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, []);

  const getCommonCounted = useCallback((heroIds: string[]) => {
    if (heroIds.length === 0) return [];
    
    return heroes
      .map(h => {
        const relations = heroIds.map(sourceId => 
          counterRelations.find(r => r.source === sourceId && r.target === h.id)
        );
        
        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength || 1));
          return { hero: h, strength: minStrength };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, []);

  const getCommonSynergies = useCallback((heroIds: string[]) => {
    if (heroIds.length === 0) return [];
    
    return heroes
      .map(h => {
        const relations = heroIds.map(targetId => 
          synergyRelations.find(r => r.source === h.id && r.target === targetId)
        );
        
        if (relations.every(r => r !== undefined)) {
          const minStrength = Math.min(...relations.map(r => r!.strength || 1));
          return { hero: h, strength: minStrength };
        }
        return null;
      })
      .filter((item): item is { hero: Hero; strength: number } => item !== null)
      .sort((a, b) => b.strength - a.strength);
  }, []);

  const counteredBy = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return counterRelations
        .filter(r => r.target === selectedHeroes[0])
        .map(r => ({
          hero: heroes.find(h => h.id === r.source),
          strength: r.strength || 1
        }))
        .filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonCounters(selectedHeroes);
  }, [selectedHeroes, getCommonCounters]);

  const counters = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return counterRelations
        .filter(r => r.source === selectedHeroes[0])
        .map(r => ({
          hero: heroes.find(h => h.id === r.target),
          strength: r.strength || 1
        }))
        .filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonCounted(selectedHeroes);
  }, [selectedHeroes, getCommonCounted]);

  const synergyPartners = useMemo(() => {
    if (selectedHeroes.length === 0) return [];
    if (selectedHeroes.length === 1) {
      return synergyRelations
        .filter(r => r.target === selectedHeroes[0])
        .map(r => ({
          hero: heroes.find(h => h.id === r.source),
          strength: r.strength || 1
        }))
        .filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
        .sort((a, b) => b.strength - a.strength);
    }
    return getCommonSynergies(selectedHeroes);
  }, [selectedHeroes, getCommonSynergies]);

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

  const handleHeroClick = (heroId: string, event: any) => {
    event.stopPropagation();
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      onHeroSelect(
        selectedHeroes.includes(heroId)
          ? selectedHeroes.filter(id => id !== heroId)
          : [...selectedHeroes, heroId]
      );
    } else {
      onHeroSelect(
        selectedHeroes.length === 1 && selectedHeroes[0] === heroId ? [] : [heroId]
      );
    }
  };

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

  const renderHeroList = (items: typeof counteredBy, strength: number, colorClass: string, targetHeroIds: string[], swapSourceTarget = false) => {
    const filtered = items.filter(i => i.strength === strength);
    const sorted = sortByRole(filtered);
    const isMulti = targetHeroIds.length > 1;
    
    // For single select, get the target hero name
    const targetHero = !isMulti ? heroes.find(h => h.id === targetHeroIds[0]) : null;
    const targetHeroName = targetHero ? (language === 'zh' ? targetHero.name : targetHero.nameEn) : '';

    return sorted.map(({ hero, strength: s }) => {
      let formattedReason = '';
      const heroName = language === 'zh' ? hero.name : hero.nameEn;
      
      if (!isMulti) {
        const targetHeroId = targetHeroIds[0];
        const reason = getCounterReason(swapSourceTarget ? targetHeroId : hero.id, swapSourceTarget ? hero.id : targetHeroId, language);
        formattedReason = reason.includes('→') ? reason.replace(/^(.+?) → (.+)$/, (_, ability, weakness) => `${swapSourceTarget ? targetHeroName : heroName} ${ability} → ${swapSourceTarget ? heroName : targetHeroName} ${weakness}`) : reason;
      } else {
        // 多选模式：提供更详细的关系描述
        const targetHeroNames = targetHeroIds.map(id => {
          const h = heroes.find(hero => hero.id === id);
          return h ? (language === 'zh' ? h.name : h.nameEn) : '';
        }).filter(name => name).join(language === 'zh' ? '、' : ', ');
        
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

      return (
        <div key={hero.id} className={`flex items-start gap-3 p-2 rounded-lg border backdrop-blur-sm mb-2 ${colorClass}`}>
          <div className={`w-10 h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 ring-2 ${colorClass.includes('red') ? 'ring-red-500/50' : 'ring-green-500/50'}`}>
            <img src={hero.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{heroName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${hero.role === 'tank' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : hero.role === 'damage' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                  {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {selectedMap && mapRecommendedHeroes.includes(hero.id) && (
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 font-bold bg-cyan-400">
                    {t('mapRecommended')}
                  </Badge>
                )}
                <Badge variant="secondary" className={`text-[9px] px-1 py-0 text-slate-900 font-bold shadow-sm border-none ${s === 3 ? 'bg-red-400' : s === 2 ? 'bg-orange-400' : 'bg-slate-400'}`}>
                  {s === 3 ? t('hardCounter') : s === 2 ? t('strongCounter') : t('softCounter')} LV.{s}
                </Badge>
              </div>
            </div>
            <p className={`text-[11px] leading-relaxed mt-1 ${colorClass.includes('red') ? 'text-red-300' : 'text-green-300'}`}>
              {formattedReason}
            </p>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (selectedHero) return;
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
    const handleResize = () => {
      if (!containerRef.current || !svgRef.current || !simulationRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      d3.select(svgRef.current).attr('width', width).attr('height', height);
      simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2)).alpha(0.08).restart();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prepareData = useCallback(() => {
    const nodes: NodeDatum[] = heroes
      .filter(h => !selectedRole || h.role === selectedRole)
      .map(h => {
        const radiusByStrength = (heroId: string, targetIds: string[]): number => {
          if (targetIds.length === 0) return h.role === 'tank' ? 32 : 28;
          if (targetIds.includes(heroId)) return 42;
          
          let relation;
          if (isMultiSelect) {
            if (commonRelatedIds.includes(heroId)) {
              const commonItem = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
                .find(item => item.hero.id === heroId);
              if (commonItem) {
                relation = { strength: commonItem.strength };
              }
            }
          } else {
            const targetId = targetIds[0];
            if (activeCounterTab === 'synergy') {
              relation = synergyRelations.find(r => r.source === heroId && r.target === targetId);
            } else {
              relation = counterRelations.find(r =>
                (r.source === heroId && r.target === targetId) ||
                (r.target === heroId && r.source === targetId)
              );
            }
          }
          
          if (!relation) return h.role === 'tank' ? 28 : 24;
          const strength = relation.strength || 1;
          if (strength === 3) return h.role === 'tank' ? 40 : 36;
          if (strength === 2) return h.role === 'tank' ? 34 : 30;
          return h.role === 'tank' ? 28 : 24;
        };
        return {
          id: h.id,
          name: h.name,
          nameEn: h.nameEn,
          role: h.role,
          color: h.role === 'tank' ? '#f59e0b' : h.role === 'damage' ? '#ef4444' : '#22c55e',
          image: h.image,
          radius: radiusByStrength(h.id, selectedHeroes),
        };
      });
    const nodeIds = new Set(nodes.map(n => n.id));
    
    let links: LinkDatum[] = [];
    
    if (isMultiSelect) {
      // For multi-select, show links between selected heroes and common related heroes
      if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
        // Source is common hero, Target is one of selected heroes
        links = (activeCounterTab === 'synergy' ? synergyRelations : counterRelations)
          .filter(r => selectedHeroes.includes(r.target) && commonRelatedIds.includes(r.source) && nodeIds.has(r.source) && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      } else {
        // Source is one of selected heroes, Target is common hero
        links = counterRelations
          .filter(r => selectedHeroes.includes(r.source) && commonRelatedIds.includes(r.target) && nodeIds.has(r.source) && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      }
    } else if (selectedHeroes.length === 1) {
      const selectedHeroId = selectedHeroes[0];
      if (activeCounterTab === 'synergy') {
        links = synergyRelations
          .filter(r => r.target === selectedHeroId && nodeIds.has(r.source))
          .map(r => ({ source: r.source, target: r.target }));
      } else if (activeCounterTab === 'counteredBy') {
        links = counterRelations
          .filter(r => r.target === selectedHeroId && nodeIds.has(r.source))
          .map(r => ({ source: r.source, target: r.target }));
      } else {
        links = counterRelations
          .filter(r => r.source === selectedHeroId && nodeIds.has(r.target))
          .map(r => ({ source: r.source, target: r.target }));
      }
    } else {
      // Default: show all counter links (but filtered by node visibility)
      links = counterRelations
        .filter(l => nodeIds.has(l.source) && nodeIds.has(l.target))
        .map(l => ({ source: l.source, target: l.target }));
    }

    return { nodes, links };
  }, [selectedRole, selectedHeroes, activeCounterTab, isMultiSelect, commonRelatedIds, synergyPartners, counteredBy, counters]);

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
    zoomRef.current = zoom;

    const { nodes, links } = prepareData();
    nodes.forEach(node => {
      defs.append('clipPath').attr('id', `clip-${node.id}`).append('circle').attr('r', node.radius - 2);
    });

    const simulation = d3.forceSimulation<NodeDatum>(nodes)
      .velocityDecay(0.6)
      .alphaDecay(0.02)
      .velocityDecay(0.6)
      .force('link', d3.forceLink<NodeDatum, LinkDatum>(links).id(d => d.id).distance(d => {
        if (!selectedHero) return 140;
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        if (!rel) return 140;
        const isRelated = activeCounterTab === 'counteredBy' ?
          (targetId === selectedHero || sourceId === selectedHero) :
          (sourceId === selectedHero || targetId === selectedHero);
        if (!isRelated) return 140;
        return rel.strength === 3 ? 100 : rel.strength === 2 ? 120 : 140;
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
      }).strength(1.0))
      .force('y', d3.forceY<NodeDatum>().y(() => {
        if (selectedRole && selectedRole !== 'all') return height / 2;
        return height / 2;
      }).strength(0.1));
    simulationRef.current = simulation;

    const link = g.append('g').attr('class', 'links').selectAll('line').data(links).enter().append('line').attr('stroke-width', 1.5);

    // Animated flowing particles group
    const particleGroup = g.append('g').attr('class', 'particles');

    // Create particles for each link
    particleGroup.selectAll('circle')
      .data(links)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', (d: LinkDatum) => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 6 : s === 2 ? 4.5 : 3;
      })
      .attr('fill', (d: LinkDatum) => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        
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
      const hasConnection = counterRelations.some(r =>
        (r.source === d.id && r.target === selectedHero) ||
        (r.target === d.id && r.source === selectedHero)
      );
      return hasConnection ? 1 : 0.65;
    }).call(d3.drag<SVGGElement, NodeDatum>()
      .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeGroup.append('circle').attr('r', d => d.radius + 4).attr('fill', 'none').attr('stroke', d => d.color).attr('stroke-width', 2).attr('opacity', 0.3).attr('class', 'glow-ring');
    nodeGroup.append('circle').attr('r', d => d.radius).attr('fill', '#1a1a2e').attr('stroke', d => d.color).attr('stroke-width', 3).attr('class', 'node-circle');
    nodeGroup.append('image').attr('xlink:href', d => d.image).attr('x', d => -(d.radius - 2)).attr('y', d => -(d.radius - 2)).attr('width', d => (d.radius - 2) * 2).attr('height', d => (d.radius - 2) * 2).attr('clip-path', d => `url(#clip-${d.id})`).attr('preserveAspectRatio', 'xMidYMid slice').style('pointer-events', 'none');
    nodeGroup.append('text').attr('class', 'node-name').attr('text-anchor', 'middle').attr('dy', d => d.radius + 20).attr('fill', '#e2e8f0').attr('font-size', '12px').attr('font-weight', '700').text(d => language === 'zh' ? d.name : d.nameEn).style('pointer-events', 'none').style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)').style('opacity', '1');
    
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
      .attr('font-size', '9px')
      .attr('font-weight', '800')
      .text(t('mapRecommended'));

    nodeGroup.on('click', (event, d) => { handleHeroClick(d.id, event); });

    // Track particle animation progress
    let particleProgress = 0;
    const particleSpeed = 0.015;

    // Separate animation loop for particles - runs independently of simulation
    const particleAnimation = () => {
      particleProgress += particleSpeed;
      if (particleProgress > 1) particleProgress = 0;

      particleGroup.selectAll<SVGCircleElement, LinkDatum>('.particle')
        .attr('opacity', (d) => {
          // Synergy模式下取消流动粒子
          if (activeCounterTab === 'synergy') return 0;
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
          
          let isRelevant = false;
          if (isMultiSelect) {
            isRelevant = activeCounterTab === 'counteredBy' 
              ? (selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId))
              : (selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId));
          } else {
            const targetHero = selectedHeroes[0];
            isRelevant = activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
          }
          
          if (!isRelevant) return 0;
          return 0.9;
        })
        .attr('cx', (d) => {
          const source = d.source as NodeDatum;
          const target = d.target as NodeDatum;
          const sourceId = source.id;
          const targetId = target.id;
          
          let isRelevant = false;
          if (isMultiSelect) {
            isRelevant = activeCounterTab === 'counteredBy' 
              ? (selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId))
              : (selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId));
          } else {
            const targetHero = selectedHeroes[0];
            isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
          }
          
          if (!isRelevant) return 0;
          const dx = (target.x || 0) - (source.x || 0);
          const maxPos = activeCounterTab === 'synergy' ? 0.5 : 1;
          const pos = ((particleProgress + (links.indexOf(d) * 0.1)) % 1) * maxPos;
          return (source.x || 0) + dx * pos;
        })
        .attr('cy', (d) => {
          const source = d.source as NodeDatum;
          const target = d.target as NodeDatum;
          const sourceId = source.id;
          const targetId = target.id;
          
          let isRelevant = false;
          if (isMultiSelect) {
            isRelevant = activeCounterTab === 'counteredBy' 
              ? (selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId))
              : (selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId));
          } else {
            const targetHero = selectedHeroes[0];
            isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
          }
          
          if (!isRelevant) return 0;
          const dy = (target.y || 0) - (source.y || 0);
          const maxPos = activeCounterTab === 'synergy' ? 0.5 : 1;
          const pos = ((particleProgress + (links.indexOf(d) * 0.1)) % 1) * maxPos;
          return (source.y || 0) + dy * pos;
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

    if (selectedHeroes.length > 0) {
      simulation.alpha(0.1).restart();

      nodeGroup.transition().duration(300).style('opacity', d => {
        if (selectedHeroes.includes(d.id)) return 0.85;
        
        let isRelated;
        if (isMultiSelect) {
          isRelated = commonRelatedIds.includes(d.id);
        } else {
          const targetHero = selectedHeroes[0];
          if (activeCounterTab === 'synergy') {
            isRelated = synergyRelations.some(r => r.source === d.id && r.target === targetHero);
          } else {
            isRelated = activeCounterTab === 'counteredBy' 
              ? counterRelations.some(r => r.source === d.id && r.target === targetHero) 
              : counterRelations.some(r => r.source === targetHero && r.target === d.id);
          }
        }
        return isRelated ? 1 : 0.7;
      });

      nodeGroup.select('.node-name').transition().duration(300).style('opacity', 1);
      nodeGroup.each(function (d) {
        const group = d3.select(this);
        
        let relation;
        if (isMultiSelect) {
          if (commonRelatedIds.includes(d.id)) {
            // Find relations to determine strength (use average or min or just representative)
            // For now, we use the results from getCommonXXX which already sorted/filtered
            const commonItem = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
              .find(item => item.hero.id === d.id);
            if (commonItem) {
              relation = { strength: commonItem.strength };
            }
          }
        } else {
          const targetHero = selectedHeroes[0];
          if (activeCounterTab === 'synergy') {
            relation = synergyRelations.find(r => r.source === d.id && r.target === targetHero);
          } else {
            relation = activeCounterTab === 'counteredBy' 
              ? counterRelations.find(r => r.source === d.id && r.target === targetHero) 
              : counterRelations.find(r => r.source === targetHero && r.target === d.id);
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
        let showLabel = false;
        if (isRecommended) {
          if (selectedHeroes.includes(d.id)) {
            showLabel = true;
          } else if (isMultiSelect) {
            showLabel = commonRelatedIds.includes(d.id);
          } else {
            const targetHero = selectedHeroes[0];
            if (activeCounterTab === 'synergy') {
              showLabel = synergyRelations.some(r => r.source === d.id && r.target === targetHero);
            } else if (activeCounterTab === 'counteredBy') {
              showLabel = counterRelations.some(r => r.source === d.id && r.target === targetHero);
            } else {
              showLabel = counterRelations.some(r => r.source === targetHero && r.target === d.id);
            }
          }
        }

        group.select('.map-strong-label')
          .transition()
          .duration(300)
          .style('opacity', showLabel ? 1 : 0)
          .attr('transform', `translate(0, ${-(scale - 1) * d.radius})`);
      });

      link.attr('stroke-opacity', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        
        let isRelevant = false;
        let s = 1;

        if (isMultiSelect) {
          if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
            isRelevant = selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId);
            if (isRelevant) {
              const rel = (activeCounterTab === 'synergy' ? synergyRelations : counterRelations)
                .find(r => r.source === sourceId && r.target === targetId);
              s = rel?.strength || 1;
            }
          } else {
            isRelevant = selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId);
            if (isRelevant) {
              const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
              s = rel?.strength || 1;
            }
          }
        } else {
          const targetHero = selectedHeroes[0];
          isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
          if (isRelevant) {
            const rel = (activeCounterTab === 'synergy' ? synergyRelations : counterRelations)
              .find(r => r.source === sourceId && r.target === targetId);
            s = rel?.strength || 1;
          }
        }

        if (!isRelevant) return 0.01;
        return s === 3 ? 1.0 : s === 2 ? 0.5 : 0.25;
      }).attr('stroke-width', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        
        let isRelevant = false;
        let s = 1;

        if (isMultiSelect) {
          if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
            isRelevant = selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId);
          } else {
            isRelevant = selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId);
          }
        } else {
          const targetHero = selectedHeroes[0];
          isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
        }

        if (!isRelevant) return 1;
        
        const rel = (activeCounterTab === 'synergy' ? synergyRelations : counterRelations)
          .find(r => r.source === sourceId && r.target === targetId);
        s = rel?.strength || 1;
        
        return s === 3 ? 15 : s === 2 ? 9 : 4.5;
      }).attr('stroke', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = (activeCounterTab === 'synergy' ? synergyRelations : counterRelations)
          .find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        if (activeCounterTab === 'synergy') return '#a855f7';
        if (activeCounterTab === 'counteredBy') return s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5';
        return s === 3 ? '#15803d' : s === 2 ? '#22c55e' : '#86efac';
      }).attr('marker-end', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        
        let isRelevant = false;
        if (isMultiSelect) {
          if (activeCounterTab === 'synergy' || activeCounterTab === 'counteredBy') {
            isRelevant = selectedHeroes.includes(targetId) && commonRelatedIds.includes(sourceId);
          } else {
            isRelevant = selectedHeroes.includes(sourceId) && commonRelatedIds.includes(targetId);
          }
        } else {
          const targetHero = selectedHeroes[0];
          isRelevant = activeCounterTab === 'synergy' ? (targetId === targetHero || sourceId === targetHero) : activeCounterTab === 'counteredBy' ? targetId === targetHero : sourceId === targetHero;
        }

        if (!isRelevant) return null;
        if (activeCounterTab === 'synergy') return null;
        
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return `url(#arrow-${activeCounterTab === 'counteredBy' ? 'red' : 'green'}-${s})`;
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
        group.select('.map-strong-label')
          .transition()
          .duration(300)
          .style('opacity', isRecommended ? 1 : 0)
          .attr('transform', 'translate(0, 0)');
      });
      link.attr('stroke-opacity', d => {
        if (activeCounterTab === 'synergy') {
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
          const synergyRel = synergyRelations.find(r => r.source === sourceId && r.target === targetId);
          const s = synergyRel?.strength || 1;
          return s === 3 ? 0.5 : s === 2 ? 0.15 : 0.05;
        }
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 0.5 : s === 2 ? 0.15 : 0.05;
      }).attr('stroke-width', d => {
        // Synergy links use counter strength-based width
        if (activeCounterTab === 'synergy') {
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
          const synergyRel = synergyRelations.find(r => r.source === sourceId && r.target === targetId);
          const s = synergyRel?.strength || 1;
          return s === 3 ? 4.5 : s === 2 ? 3 : 1.5;
        }
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 4.5 : s === 2 ? 3 : 1.5;
      }).attr('stroke', d => {
        // Synergy links use cyan color
        if (activeCounterTab === 'synergy') return '#a855f7';
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5';
      }).attr('marker-end', d => {
        // No arrow for synergy links
        if (activeCounterTab === 'synergy') return null;
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return `url(#arrow-red-${s})`;
      });
    }

    svg.on('click', () => onHeroSelect([]));
    return () => { simulation.stop(); };
  }, [
    prepareData,
    selectedHero,
    language,
    activeCounterTab,
    selectedMap,
    mapRecommendedHeroes,
    onHeroSelect,
    selectedRole,
    t
  ]);

  const handleZoomIn = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 1.3);
  const handleZoomOut = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 0.7);
  const handleReset = () => { if (svgRef.current) d3.select(svgRef.current).transition().duration(500).call(zoomRef.current!.transform, d3.zoomIdentity); onHeroSelect([]); };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* 英雄详情面板 */}
      <div className="absolute z-10 w-96 flex flex-col" style={{ top: '1rem', right: '1rem', bottom: '1rem' }}>
        <div className="flex-1 overflow-hidden pointer-events-auto h-full">
          <Card className="p-3 bg-slate-800/60 border-slate-700 backdrop-blur-md shadow-xl h-full flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <h3 className="text-lg font-bold text-slate-100">
                {t('heroCounterPanel')}
                {selectedMapData && (
                  <span className="ml-2 text-sm font-normal text-cyan-400">
                    {language === 'zh' ? selectedMapData.name : selectedMapData.nameEn}
                  </span>
                )}
              </h3>
            </div>

            {displayedHero || isMultiSelect ? (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-4 mb-4 flex-shrink-0" onMouseDown={handlePanelDragStart}>
                  {displayedHero ? (
                    <>
                      <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ border: `3px solid ${displayedHero.color}`, backgroundColor: '#1a1a2e' }}>
                        <img src={displayedHero.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-100 leading-tight">{language === 'zh' ? displayedHero?.name : displayedHero?.nameEn}</h3>
                          <Badge variant="outline" className="text-xs px-2 py-0" style={{ borderColor: displayedHero.color, color: displayedHero.color }}>{getRoleName(displayedHero.role, language)}</Badge>
                          {selectedMap && mapRecommendedHeroes.includes(displayedHero.id) && (
                            <Badge variant="outline" className="text-xs px-2 py-0 text-cyan-400 border-cyan-400/50 bg-cyan-400/10">
                              {t('mapRecommended')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-200 leading-tight mt-0.5">{language === 'zh' ? displayedHero?.nameEn : displayedHero?.name}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-100 leading-tight mb-3">
                        {t('multiSelectMode') || '多选模式'}
                        <span className="ml-2 text-sm font-normal text-slate-400">
                          {(language === 'zh' ? '已选择 ' : 'Selected ') + selectedHeroes.length + (language === 'zh' ? ' 个英雄' : ' heroes')}
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedHeroes.map(heroId => {
                          const hero = heroes.find(h => h.id === heroId);
                          if (!hero) return null;
                          return (
                            <div key={heroId} className="flex items-center gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-700/50 min-w-0 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ border: `2px solid ${hero.color}`, backgroundColor: '#1a1a2e' }}>
                                <img src={hero.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-bold text-slate-100 truncate">{language === 'zh' ? hero.name : hero.nameEn}</span>
                                  <span className="text-[10px] px-1 py-0.5 rounded border font-medium" style={{ borderColor: hero.color, color: hero.color }}>
                                    {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 truncate">{language === 'zh' ? hero.nameEn : hero.name}</p>
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
                          <span className="text-[11px] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('counteredBy')}</span>
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
                          <span className="text-[11px] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('counters')}</span>
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
                          <span className="text-[11px] truncate">{isMultiSelect ? t('commonPrefix') : ''}{t('synergy')}</span>
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
                      </>
                    )}
                    {counters.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('noCounters')}</div>}
                  </TabsContent>

                  <TabsContent value="synergy" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-purple-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                    {selectedHeroes.length > 0 && synergyPartners.length > 0 && (
                      <div className="space-y-2">
                        {synergyPartners.map(partner => {
                          const hero = partner.hero;
                          if (!hero) return null;
                          return (
                            <div key={hero.id} className="flex items-center gap-3 p-2 rounded-lg border bg-purple-900/20 border-purple-700/30">
                              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/50 flex-shrink-0">
                                <img src={hero.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white">{language === 'zh' ? hero.name : hero.nameEn}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${hero.role === 'tank' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : hero.role === 'damage' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                                      {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {selectedMap && mapRecommendedHeroes.includes(hero.id) && (
                                      <Badge variant="secondary" className="text-[9px] px-1 py-0 font-bold bg-cyan-400">
                                        {t('mapRecommended')}
                                      </Badge>
                                    )}
                                    <Badge variant="secondary" className={`text-[9px] px-1 py-0 text-slate-900 font-bold shadow-sm border-none ${partner.strength === 3 ? 'bg-red-500' : partner.strength === 2 ? 'bg-yellow-500' : 'bg-slate-400'}`}>
                                      {partner.strength === 3 ? t('hardCounter').replace('Counter', 'Synergy').replace('克制', '契合') : partner.strength === 2 ? t('strongCounter').replace('Counter', 'Synergy').replace('克制', '契合') : t('softCounter').replace('Counter', 'Synergy').replace('克制', '契合')} LV.{partner.strength}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-[11px] text-purple-300 leading-relaxed mt-1">
                                  {!isMultiSelect 
                                    ? getSynergyReason(hero.id, selectedHeroes[0], language)
                                    : (() => {
                                        const targetHeroNames = selectedHeroes.map(id => {
                                          const h = heroes.find(hero => hero.id === id);
                                          return h ? (language === 'zh' ? h.name : h.nameEn) : '';
                                        }).filter(name => name).join(language === 'zh' ? '、' : ', ');
                                        const currentHeroName = language === 'zh' ? hero.name : hero.nameEn;
                                        
                                        return language === 'zh'
                                          ? `${currentHeroName} 与 ${targetHeroNames} 形成${hero.role === 'tank' ? '前排保护' : hero.role === 'damage' ? '火力压制' : '治疗支援'}的完美协同，${partner.strength === 3 ? '极大提升' : partner.strength === 2 ? '有效增强' : '适当补充'}团队作战能力`
                                          : `${currentHeroName} synergizes perfectly with ${targetHeroNames} for ${hero.role === 'tank' ? 'frontline protection' : hero.role === 'damage' ? 'firepower suppression' : 'healing support'}, ${partner.strength === 3 ? 'significantly boosting' : partner.strength === 2 ? 'effectively enhancing' : 'appropriately supplementing'} team combat capabilities`;
                                      })()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {synergyPartners.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('noSynergy')}</div>}
                  </TabsContent>
                </Tabs>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-white">{activeCounterTab === 'counteredBy' ? t('counteredByTemplate') : activeCounterTab === 'counters' ? t('countersTemplate') : t('synergyDesc')}</span>
                    </div>
                    {(activeCounterTab === 'synergy' ? synergyPartners.length > 0 : (activeCounterTab === 'counteredBy' ? counteredBy : counters).length > 0) && (
                      <Button variant="ghost" size="sm" className={`h-7 px-2 text-[10px] gap-1.5 hover:bg-slate-800 text-slate-200 ${activeCounterTab === 'synergy' ? 'hover:text-purple-400' : 'hover:text-cyan-400'}`} onClick={(e) => {
                        e.stopPropagation();
                        let text = '';
                        const commonHeroesNames = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
                          .map(p => language === 'zh' ? p.hero.name : p.hero.nameEn).join(', ');
                        
                        if (isMultiSelect) {
                          const selectedHeroNames = selectedHeroes.map(id => {
                            const h = heroes.find(hero => hero.id === id);
                            return h ? (language === 'zh' ? h.name : h.nameEn) : '';
                          }).filter(name => name).join(', ');
                          
                          if (activeCounterTab === 'synergy') {
                            text = `${selectedHeroNames} ${t('commonSynergy')} ${t('heroes')} ${commonHeroesNames}`;
                          } else {
                            const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
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
                          const hName = language === 'zh' ? displayedHero?.name : displayedHero?.nameEn;
                          if (activeCounterTab === 'synergy') {
                            text = `${hName} ${t('synergy')} ${t('heroes')} ${commonHeroesNames}`;
                          } else {
                            const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
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
                  <p className="text-[10px] text-slate-200 mb-2 leading-tight">{t('copyTip')}</p>
                  <div
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-200 select-all cursor-pointer hover:border-slate-700 relative group transition-colors"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      let text = '';
                      const commonHeroesNames = (activeCounterTab === 'synergy' ? synergyPartners : (activeCounterTab === 'counteredBy' ? counteredBy : counters))
                        .map(p => language === 'zh' ? p.hero.name : p.hero.nameEn).join(', ');

                      if (isMultiSelect) {
                        const selectedHeroNames = selectedHeroes.map(id => {
                          const h = heroes.find(hero => hero.id === id);
                          return h ? (language === 'zh' ? h.name : h.nameEn) : '';
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
                                const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
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
                            text = `${displayedHero.name} ${t('synergy')} ${t('heroes')} ${commonHeroesNames}`;
                            handleCopyToClipboard(text);
                          }
                        } else {
                          const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                          if (list.length > 0) {
                            const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                            list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                            const formatGroup = (arr: typeof list, prefix: string) =>
                              arr.length > 0 ? `${prefix}${arr.map(i => {
                                const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
                                return name;
                              }).join(', ')}` : '';
                            const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                            const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                            const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                            const groups = [strong3, strong2, strong1].filter(Boolean).join(' | ');
                            const header = activeCounterTab === 'counteredBy' ? `${displayedHero.name}${t('counteredByHeader')}` : `${displayedHero.name}${t('countersHeader')}`;
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
                            const name = language === 'zh' ? p.hero.name : p.hero.nameEn;
                            if (language === 'zh' && p.hero.nickname) {
                              return `${name}（${p.hero.nickname}）`;
                            }
                            return name;
                          }).join('、');
                          
                          const selectedHeroNames = selectedHeroes.map(id => {
                            const h = heroes.find(hero => hero.id === id);
                            return h ? (language === 'zh' ? h.name : h.nameEn) : '';
                          }).filter(name => name).join('、');
                          
                          const hNameWithNickname = isMultiSelect ? selectedHeroNames : (
                            language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : 
                            (language === 'zh' ? displayedHero?.name : displayedHero?.nameEn)
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
                            const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
                            if (language === 'zh' && i.hero.nickname) {
                              return `${name}（${i.hero.nickname}）`;
                            }
                            return name;
                          }).join('、')}</div> : null;
                        
                        const selectedHeroNames = selectedHeroes.map(id => {
                          const h = heroes.find(hero => hero.id === id);
                          return h ? (language === 'zh' ? h.name : h.nameEn) : '';
                        }).filter(name => name).join('、');
                        
                        const hNameWithNickname = isMultiSelect ? selectedHeroNames : (
                          language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : 
                          (language === 'zh' ? displayedHero?.name : displayedHero?.nameEn)
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
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-[10px] text-slate-200 bg-slate-900 px-1 rounded">{t('doubleClickToCopy')}</span></div>
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

      <div className={`absolute bottom-6 left-[420px] z-10 flex flex-col gap-3 pointer-events-auto transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-80'}`}>
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
              <HelpCircle className="w-6 h-6 text-cyan-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="p-0 border-none bg-transparent shadow-none mb-3">
            <Card className="p-5 bg-slate-950/95 backdrop-blur-md border border-slate-700/50 shadow-2xl rounded-2xl w-96 text-left">
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

              <div className="space-y-6">
                {/* 克制强度说明 - 节点尺寸 + 连线箭头 */}
                <div className="text-[11px] text-slate-200">

                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('nodeSizeTip')}</p>
                  <div className="flex items-center justify-center gap-6 px-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500/50">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] text-red-400 font-medium">{t('nodeSizeLv3')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-orange-500/50">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] text-orange-400 font-medium">{t('nodeSizeLv2')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-slate-500/50 opacity-70">
                        <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium">{t('nodeSizeLv1')}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-200">

                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-1 pt-4">{t('arrowDirection')} <span className="text-slate-400 normal-case font-normal">({t('whoCountersWho')})</span></p>
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
                <div className="text-[11px] text-slate-200">
                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-1 pt-4">{t('mapFactor')}</p>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-cyan-300/80">{t('mapRecommendedTip')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-200">

                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('networkFilter')}</p>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-1">{t('networkFilterDesc')}</p>
                </div>

                {/* 交互说明 */}
                <div className="text-[11px] text-slate-200">
                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mb-1">{t('interactionGuide')}</p>
                  <div className="space-y-1.5 mt-2">
                    <div className="text-slate-300 flex items-start gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span><span className="font-medium">{splitDesc(t('clickDesc')).title}</span><span className="text-slate-400"> {splitDesc(t('clickDesc')).content}</span></span>
                    </div>
                    <div className="text-slate-200 flex items-start gap-2">
                      <span className="w-1 h-1 bg-cyan-800 rounded-full mt-1 flex-shrink-0"></span>
                      <span><span className="font-medium">{splitDesc(t('hoverDesc')).title}</span><span className="text-slate-400"> {splitDesc(t('hoverDesc')).content}</span></span>
                    </div>
                    <div className="text-slate-300 flex items-start gap-2">
                      <span className="w-1 h-1 bg-slate-600 rounded-full mt-1 flex-shrink-0"></span>
                      <span><span className="font-medium">{splitDesc(t('dragDesc')).title}</span><span className="text-slate-400"> {splitDesc(t('dragDesc')).content}</span></span>
                    </div>
                    <div className="text-cyan-300 flex items-start gap-2 bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <p className="font-medium">{splitDesc(t('zoomDesc')).title} </p>
                        <p className="font-medium"> {splitDesc(t('touchZoomDesc')).title}</p>
                        {/* <span className="text-cyan-300/80"> {splitDesc(t('zoomDesc')).content} / {splitDesc(t('touchZoomDesc')).content}</span> */}
                      </span>
                    </div>
                    <div className="text-cyan-300 flex items-start gap-2 bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <p className="font-medium">{splitDesc(t('panDesc')).title}</p>
                        <p className="font-medium"> {splitDesc(t('touchPanDesc')).title}</p>
                        {/* <span className="text-cyan-300/80"> {splitDesc(t('panDesc')).content} / {splitDesc(t('touchPanDesc')).content}</span> */}
                      </span>
                    </div>
                    <div className="text-cyan-300 flex items-start gap-2 bg-cyan-900/20 p-2 rounded-lg border border-cyan-800/30">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mt-1 flex-shrink-0"></span>
                      <span>
                        <span className="font-medium"> {language === 'zh' ? '多选英雄：' : 'Multi-select heroes'}</span>
                        <span className="font-medium text-cyan-300/80">{t('ctrlMultiSelect')}</span>
                      </span>
                    </div>
                      
                  </div>
                </div>
              </div>
            </Card>
          </PopoverContent>
        </Popover>

        {/* 缩放按钮横向排列 */}
        <div className="flex flex-row gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9" title={t('zoomIn') || "Zoom In"}><ZoomIn className="w-4 h-4 text-cyan-400" /></Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9" title={t('zoomOut') || "Zoom Out"}><ZoomOut className="w-4 h-4 text-cyan-400" /></Button>
          <Button variant="secondary" size="icon" onClick={handleReset} className="bg-slate-800/60 backdrop-blur-md hover:bg-slate-700 border border-slate-700 shadow-lg w-9 h-9" title={t('resetView') || "Reset View"}><RotateCcw className="w-4 h-4 text-cyan-400" /></Button>
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-full cursor-move" style={{ background: 'transparent' }} />
    </div>
  );

};

export default ForceGraph;