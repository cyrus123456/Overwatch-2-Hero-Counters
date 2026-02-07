import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCounterReason } from '@/data/counterReasons';
import { counterRelations, getRoleName, heroes, type Hero } from '@/data/heroData';
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
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  selectedHero: string | null;
  onHeroSelect: (heroId: string | null) => void;
}

const ForceGraph = ({ 
  selectedRole, 
  selectedHero, 
  onHeroSelect 
}: ForceGraphProps) => {
  const { t, language } = useI18n();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<NodeDatum, LinkDatum> | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  
  const displayedHero = selectedHero ? heroes.find(h => h.id === selectedHero) : null;
  
  const counteredBy = displayedHero ? counterRelations
    .filter(r => r.target === displayedHero.id)
    .map(r => ({
      hero: heroes.find(h => h.id === r.source),
      strength: r.strength || 1
    }))
    .filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
    .sort((a, b) => b.strength - a.strength) : [];
  
  const counters = displayedHero ? counterRelations
    .filter(r => r.source === displayedHero.id)
    .map(r => ({
      hero: heroes.find(h => h.id === r.target),
      strength: r.strength || 1
    }))
    .filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
    .sort((a, b) => b.strength - a.strength) : [];

  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [activeCounterTab, setActiveCounterTab] = useState<'counteredBy' | 'counters'>('counteredBy');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    if (!text) return;
    const sanitized = text
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/、/g, ', ')
      .replace(/★★★/g, '[Strong]')
      .replace(/★★/g, '[Medium]')
      .replace(/★/g, '[Weak]')
      .replace(/：/g, ': ')
      .replace(/→/g, '->')
      .replace(/●/g, '*')
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

  const renderHeroList = (items: typeof counteredBy, strength: number, colorClass: string, targetHeroId: string) => {
    const filtered = items.filter(i => i.strength === strength);
    const sorted = sortByRole(filtered);
    return sorted.map(({ hero, strength: s }) => (
      <div key={hero.id} className={`flex flex-col gap-1 p-2 rounded-lg border backdrop-blur-sm mb-2 ${colorClass}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0 ring-1 ring-white/10">
            <img src={hero.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white">{language === 'zh' ? hero.name : hero.nameEn}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${hero.role === 'tank' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : hero.role === 'damage' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
              {hero.role === 'tank' ? t('tank') : hero.role === 'damage' ? t('damage') : t('support')}
            </span>
          </div>
          <Badge variant="secondary" className={`text-[9px] px-1 py-0 ml-auto text-white shadow-sm border-none ${s === 3 ? 'bg-red-500' : s === 2 ? 'bg-orange-500' : 'bg-slate-600'}`}>
            {s === 3 ? t('hardCounter') : s === 2 ? t('strongCounter') : t('softCounter')} LV.{s}
          </Badge>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed pl-10">
          {getCounterReason(hero.id, targetHeroId, language)}
        </p>
      </div>
    ));
  };

  useEffect(() => {
    if (selectedHero) return;
    const randomIndex = Math.floor(Math.random() * heroes.length);
    const randomHero = heroes[randomIndex];
    if (randomHero) onHeroSelect(randomHero.id);
  }, []);

  const handlePanelDragStart = (e: React.MouseEvent) => {
    setIsDraggingPanel(true);
    dragStartRef.current = {
      x: e.clientX - panelPosition.x,
      y: e.clientY - panelPosition.y
    };
  };

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
      simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prepareData = useCallback(() => {
    const nodes: NodeDatum[] = heroes
      .filter(h => !selectedRole || h.role === selectedRole)
      .map(h => {
        const radiusByStrength = (heroId: string, targetId: string | null): number => {
          if (!targetId) return h.role === 'tank' ? 32 : 28;
          if (heroId === targetId) return 42;
          const relation = counterRelations.find(r => 
            (r.source === heroId && r.target === targetId) || 
            (r.target === heroId && r.source === targetId)
          );
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
          radius: radiusByStrength(h.id, selectedHero),
        };
      });
    const nodeIds = new Set(nodes.map(n => n.id));
    const links: LinkDatum[] = counterRelations
      .filter(l => nodeIds.has(l.source) && nodeIds.has(l.target))
      .map(l => ({ source: l.source, target: l.target }));
    return { nodes, links };
  }, [selectedRole, selectedHero]);

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
    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.3, 3]).on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);
    zoomRef.current = zoom;

    const { nodes, links } = prepareData();
    nodes.forEach(node => {
      defs.append('clipPath').attr('id', `clip-${node.id}`).append('circle').attr('r', node.radius - 2);
    });

    const simulation = d3.forceSimulation<NodeDatum>(nodes)
      .force('link', d3.forceLink<NodeDatum, LinkDatum>(links).id(d => d.id).distance(d => {
        if (!selectedHero) return 100;
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        if (!rel) return 100;
        const isRelated = activeCounterTab === 'counteredBy' ? 
          (targetId === selectedHero || sourceId === selectedHero) : 
          (sourceId === selectedHero || targetId === selectedHero);
        if (!isRelated) return 100;
        return rel.strength === 3 ? 80 : rel.strength === 2 ? 100 : 120;
      }))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => (d as NodeDatum).radius + 15))
      .force('x', d3.forceX<NodeDatum>().x(d => {
        if (selectedRole && selectedRole !== 'all') return width / 2;
        const centerX = width / 2;
        if (d.role === 'tank') return centerX - 180;
        if (d.role === 'damage') return centerX;
        return centerX + 180;
      }).strength(0.3))
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
        const color = activeCounterTab === 'counteredBy' ? 
          (targetId === selectedHero ? 'red' : 'green') : 
          (sourceId === selectedHero ? 'green' : 'red');
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

    nodeGroup.on('click', (event, d) => { event.stopPropagation(); onHeroSelect(d.id === selectedHero ? null : d.id); });

    // Track particle animation progress
    let particleProgress = 0;
    const particleSpeed = 0.015;

    simulation.on('tick', () => {
      link.attr('x1', d => (d.source as NodeDatum).x || 0).attr('y1', d => (d.source as NodeDatum).y || 0).attr('x2', d => (d.target as NodeDatum).x || 0).attr('y2', d => (d.target as NodeDatum).y || 0);
      nodeGroup.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
      
      // Animate particles flowing along links
      particleProgress += particleSpeed;
      if (particleProgress > 1) particleProgress = 0;
      
      particleGroup.selectAll<SVGCircleElement, LinkDatum>('.particle')
        .attr('opacity', (d) => {
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
          const isRelevant = selectedHero ? 
            (activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero) : 
            false;
          if (!isRelevant) return 0;
          return 0.9;
        })
        .attr('cx', (d) => {
          const source = d.source as NodeDatum;
          const target = d.target as NodeDatum;
          const sourceId = source.id;
          const targetId = target.id;
          const isRelevant = selectedHero ? 
            (activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero) : 
            false;
          if (!isRelevant) return 0;
          const dx = (target.x || 0) - (source.x || 0);
          const pos = (particleProgress + (links.indexOf(d) * 0.1)) % 1;
          return (source.x || 0) + dx * pos;
        })
        .attr('cy', (d) => {
          const source = d.source as NodeDatum;
          const target = d.target as NodeDatum;
          const sourceId = source.id;
          const targetId = target.id;
          const isRelevant = selectedHero ? 
            (activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero) : 
            false;
          if (!isRelevant) return 0;
          const dy = (target.y || 0) - (source.y || 0);
          const pos = (particleProgress + (links.indexOf(d) * 0.1)) % 1;
          return (source.y || 0) + dy * pos;
        });
    });

    if (selectedHero) {
      simulation.alpha(0.5).restart();
      
      nodeGroup.transition().duration(300).style('opacity', d => {
        if (d.id === selectedHero) return 1;
        const isRelated = activeCounterTab === 'counteredBy' ? counterRelations.some(r => r.source === d.id && r.target === selectedHero) : counterRelations.some(r => r.source === selectedHero && r.target === d.id);
        return isRelated ? 1 : 0.7;
      });

      nodeGroup.select('.node-name').transition().duration(300).style('opacity', 1);

      nodeGroup.each(function(d) {
        const group = d3.select(this);
        const relation = activeCounterTab === 'counteredBy' ? counterRelations.find(r => r.source === d.id && r.target === selectedHero) : counterRelations.find(r => r.source === selectedHero && r.target === d.id);
        let scale = 0.8;
        if (d.id === selectedHero) scale = 1.5;
        else if (relation) scale = relation.strength === 3 ? 1.3 : relation.strength === 2 ? 1.1 : 1.0;
        const r = d.radius * scale;
        const imgR = (d.radius - 2) * scale;
        group.select('.node-circle').transition().duration(300).attr('r', r);
        group.select('.glow-ring').transition().duration(300).attr('r', r + 4);
        group.select('image').transition().duration(300).attr('x', -imgR).attr('y', -imgR).attr('width', imgR * 2).attr('height', imgR * 2);
        d3.select(`#clip-${d.id} circle`).transition().duration(300).attr('r', imgR);
        group.select('.node-name').transition().duration(300).attr('dy', r + 20);
      });

      link.attr('stroke-opacity', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const isRelevant = activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero;
        if (!isRelevant) return 0.01;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 1.0 : s === 2 ? 0.5 : 0.25;
      }).attr('stroke-width', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const isRelevant = activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero;
        if (!isRelevant) return 1;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 15 : s === 2 ? 9 : 4.5;
      }).attr('stroke', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        if (activeCounterTab === 'counteredBy') return s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5';
        return s === 3 ? '#15803d' : s === 2 ? '#22c55e' : '#86efac';
      }).attr('marker-end', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const isRelevant = activeCounterTab === 'counteredBy' ? targetId === selectedHero : sourceId === selectedHero;
        if (!isRelevant) return null;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return `url(#arrow-${activeCounterTab === 'counteredBy' ? 'red' : 'green'}-${s})`;
      });
    } else {
      simulation.alpha(0.3).restart();
      
      nodeGroup.transition().duration(300).style('opacity', 1);
      nodeGroup.select('.node-name').transition().duration(300).style('opacity', 1);
      nodeGroup.each(function(d) {
        const group = d3.select(this);
        group.select('.node-circle').transition().duration(300).attr('r', d.radius);
        group.select('.glow-ring').transition().duration(300).attr('r', d.radius + 4);
        group.select('image').transition().duration(300).attr('x', -(d.radius - 2)).attr('y', -(d.radius - 2)).attr('width', (d.radius - 2) * 2).attr('height', (d.radius - 2) * 2);
        d3.select(`#clip-${d.id} circle`).transition().duration(300).attr('r', d.radius - 2);
        group.select('.node-name').transition().duration(300).attr('dy', d.radius + 20);
      });
      link.attr('stroke-opacity', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? 0.5 : s === 2 ? 0.15 : 0.05;
      }).attr('stroke', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return s === 3 ? '#b91c1c' : s === 2 ? '#ef4444' : '#fca5a5';
      }).attr('marker-end', d => {
        const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
        const targetId = typeof d.target === 'string' ? d.target : d.target.id;
        const rel = counterRelations.find(r => r.source === sourceId && r.target === targetId);
        const s = rel?.strength || 1;
        return `url(#arrow-red-${s})`;
      });
    }

    svg.on('click', () => onHeroSelect(null));
    return () => { simulation.stop(); };
  }, [prepareData, selectedHero, language, activeCounterTab]);

  const handleZoomIn = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 1.3);
  const handleZoomOut = () => svgRef.current && d3.select(svgRef.current).transition().duration(300).call(zoomRef.current!.scaleBy, 0.7);
  const handleReset = () => { if (svgRef.current) d3.select(svgRef.current).transition().duration(500).call(zoomRef.current!.transform, d3.zoomIdentity); onHeroSelect(null); };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* 英雄详情面板 */}
      <div className="absolute z-10 w-96 flex flex-col" style={{ top: '1rem', right: '1rem', bottom: '1rem', transform: `translate(${panelPosition.x}px, ${panelPosition.y}px)`, cursor: isDraggingPanel ? 'grabbing' : 'default', pointerEvents: 'none' }}>
        <div className="flex-1 overflow-hidden pointer-events-auto h-full">
          <Card className="p-3 bg-slate-900/95 border-slate-700 backdrop-blur-sm shadow-xl h-full flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/50 flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <h3 className="text-lg font-bold text-slate-100">{t('heroCounterPanel')}</h3>
            </div>
            
            {displayedHero ? (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-4 mb-4 cursor-grab active:cursor-grabbing flex-shrink-0" onMouseDown={handlePanelDragStart} title={t('dragToMove') || "Drag to move"}>
                   <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ border: `3px solid ${displayedHero.color}`, backgroundColor: '#1a1a2e' }}>
                     <img src={displayedHero.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2">
                       <h3 className="text-base font-bold text-slate-100 leading-tight">{language === 'zh' ? displayedHero?.name : displayedHero?.nameEn}</h3>
                       <Badge variant="outline" className="text-xs px-2 py-0" style={{ borderColor: displayedHero.color, color: displayedHero.color }}>{getRoleName(displayedHero.role, language)}</Badge>
                     </div>
                     <p className="text-xs text-slate-200 leading-tight mt-0.5">{language === 'zh' ? displayedHero?.nameEn : displayedHero?.name}</p>
                   </div>
                </div>
                
                <Tabs value={activeCounterTab} onValueChange={(v) => setActiveCounterTab(v as any)} className="flex-1 flex flex-col min-h-0">
                  <TabsList className="grid w-full grid-cols-2 mb-2 bg-slate-800/50 p-1 h-9 flex-shrink-0">
                    <TabsTrigger value="counteredBy" className="text-white data-[state=active]:bg-red-600 flex items-center justify-center gap-2 px-2 h-7">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{t('counteredBy')}</span>
                    </TabsTrigger>
                    <TabsTrigger value="counters" className="text-white data-[state=active]:bg-green-600 flex items-center justify-center gap-2 px-2 h-7"><Swords className="w-3.5 h-3.5" /><span className="text-[11px]">{t('counters')}</span></TabsTrigger>
                  </TabsList>
                  
                   <TabsContent value="counteredBy" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-red-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                     {displayedHero && (
                       <>
                         {renderHeroList(counteredBy, 3, 'bg-red-900/30 border-red-700/50', displayedHero.id)}
                         {renderHeroList(counteredBy, 2, 'bg-red-800/20 border-red-600/40', displayedHero.id)}
                         {renderHeroList(counteredBy, 1, 'bg-red-700/10 border-red-500/30', displayedHero.id)}
                       </>
                     )}
                     {counteredBy.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('notCounteredByAny')}</div>}
                    </TabsContent>
                   
                   <TabsContent value="counters" className="flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg bg-green-950/20 mt-0 data-[state=active]:flex data-[state=active]:flex-col min-h-0">
                     {displayedHero && (
                       <>
                         {renderHeroList(counters, 3, 'bg-green-900/30 border-green-700/50', displayedHero.id)}
                         {renderHeroList(counters, 2, 'bg-green-800/20 border-green-600/40', displayedHero.id)}
                         {renderHeroList(counters, 1, 'bg-green-700/10 border-green-500/30', displayedHero.id)}
                       </>
                     )}
                     {counters.length === 0 && <div className="text-center py-6 text-slate-200 text-xs">{t('noCounters')}</div>}
                    </TabsContent>
                </Tabs>
                
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                       <span className="text-xs font-semibold text-white">{activeCounterTab === 'counteredBy' ? t('counteredByTemplate') : t('countersTemplate')}</span>
                    </div>
                    {(activeCounterTab === 'counteredBy' ? counteredBy : counters).length > 0 && (
                       <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] gap-1.5 hover:bg-slate-800 text-slate-200 hover:text-cyan-400" onClick={(e) => {
                        e.stopPropagation();
                        const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                        const hName = language === 'zh' ? displayedHero?.name : displayedHero?.nameEn;
                        const hNameWithNickname = language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : hName;
                        const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                        list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                        const formatGroup = (arr: typeof list, prefix: string) => 
                          arr.length > 0 ? `${prefix}${arr.map(i => {
                            const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
                            if (language === 'zh' && i.hero.nickname) {
                              return `${name}（${i.hero.nickname}）`;
                            }
                            return name;
                          }).join('、')}` : '';
                        const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                        const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                        const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                         const groups = [strong3, strong2, strong1].filter(Boolean).join('\n');
                         const header = activeCounterTab === 'counteredBy' ? `${hNameWithNickname}${t('counteredByHeader')}` : `${hNameWithNickname}${t('countersHeader')}`;
                         const text = `${header}\n${groups}`;
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
                      const list = activeCounterTab === 'counteredBy' ? counteredBy : counters;
                      if (list.length > 0) {
                         const hName = language === 'zh' ? displayedHero?.name : displayedHero?.nameEn;
                         const hNameWithNickname = language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : hName;
                         const grouped = { 3: [] as typeof list, 2: [] as typeof list, 1: [] as typeof list };
                         list.forEach(i => grouped[i.strength as keyof typeof grouped].push(i));
                         const formatGroup = (arr: typeof list, prefix: string) => 
                           arr.length > 0 ? `${prefix}${arr.map(i => {
                            const name = language === 'zh' ? i.hero.name : i.hero.nameEn;
                            if (language === 'zh' && i.hero.nickname) {
                              return `${name}（${i.hero.nickname}）`;
                            }
                            return name;
                          }).join('、')}` : '';
                         const strong3 = formatGroup(grouped[3], t('strength3') + ': ');
                         const strong2 = formatGroup(grouped[2], t('strength2') + ': ');
                         const strong1 = formatGroup(grouped[1], t('strength1') + ': ');
                          const groups = [strong3, strong2, strong1].filter(Boolean).join('\n');
                          const header = activeCounterTab === 'counteredBy' ? `${hNameWithNickname}${t('counteredByHeader')}` : `${hNameWithNickname}${t('countersHeader')}`;
                          const text = `${header}\n${groups}`;
                          handleCopyToClipboard(text);
                        }
                      }}
                    >
                    {(activeCounterTab === 'counteredBy' ? counteredBy : counters).length > 0 ? (
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
                          const hName = language === 'zh' ? displayedHero?.name : displayedHero?.nameEn;
                          const hNameWithNickname = language === 'zh' && displayedHero?.nickname ? `${displayedHero.name}（${displayedHero.nickname}）` : hName;
                          if (activeCounterTab === 'counteredBy') {
                             return <>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-red-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-red-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-red-200')}<div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{t('counter')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div><div className="text-cyan-400 font-bold text-2xl">{hNameWithNickname}</div></>;
                           } else {
                             return <><div className="text-cyan-400 font-bold text-2xl">{hNameWithNickname}</div><div className="my-1 font-bold text-white flex items-center gap-1"><span className="text-lg">●</span><span>{t('counter')}</span><span className="text-2xl tracking-widest font-bold text-white">→→</span></div>{formatDisplay(grouped[3], t('strength3') + ': ', 'text-green-400')}{formatDisplay(grouped[2], t('strength2') + ': ', 'text-green-300')}{formatDisplay(grouped[1], t('strength1') + ': ', 'text-green-200')}</>;
                           }
                      })()
                    ) : t('noCounterData')}
                     <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-[10px] text-slate-200 bg-slate-900 px-1 rounded">{t('doubleClickToCopy')}</span></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Swords className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                   <p className="text-slate-200 text-sm">{t('selectHeroPrompt')}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 缩放与介绍控制 - 进一步右移，避免贴合过紧 */}
      <div className="absolute bottom-6 left-[480px] z-10 flex flex-col gap-3 pointer-events-auto">
        {/* 网络节点介绍 - 问号图标 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-slate-800/95 hover:bg-slate-700 border-slate-500 shadow-lg w-10 h-10 rounded-full transition-all flex items-center justify-center"
            >
              <HelpCircle className="w-6 h-6 text-cyan-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="p-0 border-none bg-transparent shadow-none mb-3">
            <Card className="p-5 bg-slate-950/95 backdrop-blur-md border border-slate-700/50 shadow-2xl rounded-2xl w-80 text-left">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <span className="text-base font-black text-slate-200 uppercase tracking-widest">{t('networkNodeIntro')}</span>
              </div>
              
              <div className="space-y-4">
                {/* 职能说明 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 shadow-[0_0_8px_rgba(245,158,11,0.4)] flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-200 leading-none">{t('tank')}</p>
                       <p className="text-[11px] text-slate-300 mt-1">{t('tankBrief')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1 shadow-[0_0_8px_rgba(239,68,68,0.4)] flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-200 leading-none">{t('damage')}</p>
                       <p className="text-[11px] text-slate-300 mt-1">{t('damageBrief')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1 shadow-[0_0_8px_rgba(34,197,94,0.4)] flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-200 leading-none">{t('support')}</p>
                       <p className="text-[11px] text-slate-300 mt-1">{t('supportBrief')}</p>
                    </div>
                  </div>
                </div>
               
                {/* 克制强度说明 - 节点尺寸 + 连线箭头 */}
                <div className="space-y-3 pt-3 border-t border-slate-800/50">
                  <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">{t('nodeSizeTip')}</p>
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
                  
                  <p className="text-[10px] text-green-400 font-semibold uppercase tracking-wider mt-2">{t('arrowDirection')}</p>
                  <div className="flex items-center justify-center gap-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-red-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <svg className="w-6 h-3 -mx-1" viewBox="0 0 24 12">
                          <defs>
                            <marker id="intro-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                            </marker>
                          </defs>
                          <line x1="0" y1="6" x2="15" y2="6" stroke="#ef4444" strokeWidth="2" markerEnd="url(#intro-red)" />
                        </svg>
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-red-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png" alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-300">{t('counteredByHeader').trim()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-green-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png" alt="" className="w-full h-full object-cover" />
                        </div>
                        <svg className="w-6 h-3 -mx-1" viewBox="0 0 24 12">
                          <defs>
                            <marker id="intro-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                            </marker>
                          </defs>
                          <line x1="0" y1="6" x2="15" y2="6" stroke="#22c55e" strokeWidth="2" markerEnd="url(#intro-green)" />
                        </svg>
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-green-500/50">
                          <img src="https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png" alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-300">{t('countersHeader').trim()}</span>
                    </div>
                  </div>
                </div>

                {/* 交互说明 */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/50 text-[11px] text-slate-200">
                  <p className="flex items-center gap-2 italic">
                    <span className="text-red-500 font-black">A → B</span> {t('whoCountersWho')}
                  </p>
                  <div className="space-y-1 mt-2">
                    <p className="text-slate-300 font-medium flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                      {t('clickDesc')}
                    </p>
                     <p className="text-slate-200 flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-800 rounded-full"></span>
                      {t('hoverDesc')}
                    </p>
                     <p className="text-slate-300 flex items-center gap-2">
                       <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                       {t('dragDesc')}
                     </p>
                     <p className="text-slate-300 flex items-center gap-2">
                       <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                       {t('zoomDesc')}
                     </p>
                     <p className="text-slate-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      {t('panDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TooltipContent>
        </Tooltip>

        {/* 缩放按钮横向排列 */}
        <div className="flex flex-row gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn} className="bg-slate-800/95 hover:bg-slate-700 border-slate-500 shadow-lg w-9 h-9" title={t('zoomIn') || "Zoom In"}><ZoomIn className="w-4 h-4 text-cyan-400" /></Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut} className="bg-slate-800/95 hover:bg-slate-700 border-slate-500 shadow-lg w-9 h-9" title={t('zoomOut') || "Zoom Out"}><ZoomOut className="w-4 h-4 text-cyan-400" /></Button>
          <Button variant="secondary" size="icon" onClick={handleReset} className="bg-slate-800/95 hover:bg-slate-700 border-slate-500 shadow-lg w-9 h-9" title={t('resetView') || "Reset View"}><RotateCcw className="w-4 h-4 text-cyan-400" /></Button>
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-full" style={{ background: 'transparent' }} />
    </div>
  );
};

export default ForceGraph;
