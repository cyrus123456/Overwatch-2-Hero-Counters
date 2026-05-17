import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { HeroId } from '@/data/heroData';
import { useMemoizedHeroes } from '@/hooks/useMemoizedHeroes';
import type { Language } from '@/i18n';
import { useI18n } from '@/i18n';
import { ArrowDown, ArrowUp, BarChart3, Minus, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { HeroRelationStatItem } from '@/services/api';
import { api } from '@/services/api';

interface MapStatsDialogProps {
  mapId: string;
  mapName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

interface HeroStat {
  heroId: string;
  addedCount: number;
  removedCount: number;
  netCount: number;
}

export function MapStatsDialog({ mapId, mapName, open, onOpenChange, language }: MapStatsDialogProps) {
  const { t } = useI18n();
  const { getHero } = useMemoizedHeroes();
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && mapId) {
      setIsLoading(true);
      setError(null);
      api.getMapStats(mapId)
        .then(data => {
          setStats(data.heroStats);
        })
        .catch(err => {
          setError(err instanceof Error ? err.message : 'Failed to load stats');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, mapId]);

  const sortedStats = [...stats].sort((a, b) => Math.abs(b.netCount) - Math.abs(a.netCount));
  const maxAbsCount = Math.max(...sortedStats.map(s => Math.abs(s.netCount)), 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>{mapName}</span>
            <span className="text-sm text-slate-400 font-normal">{t('playerStatsTitle')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-400">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && stats.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{t('noStatsAvailable')}</p>
            </div>
          )}

          {!isLoading && !error && stats.length > 0 && (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
              {sortedStats.map((stat, index) => {
                const hero = getHero(stat.heroId as HeroId);
                if (!hero) return null;

                const percentage = (Math.abs(stat.netCount) / maxAbsCount) * 100;

                return (
                  <div
                    key={stat.heroId}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-[2rem]">
                      <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                      <img src={hero.image} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {language === 'zh' ? hero.name : hero.nameEn}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[0.625rem] px-1.5 py-0"
                          style={{
                            color: hero.role === 'tank' ? '#f59e0b' : hero.role === 'damage' ? '#ef4444' : '#22c55e',
                            borderColor: hero.role === 'tank' ? '#f59e0b40' : hero.role === 'damage' ? '#ef444440' : '#22c55e40',
                          }}
                        >
                          {t(hero.role)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              stat.netCount > 0 
                                ? 'bg-gradient-to-r from-green-500 to-green-400' 
                                : stat.netCount < 0 
                                  ? 'bg-gradient-to-r from-red-500 to-red-400'
                                  : 'bg-slate-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5">
                      <div className={`flex items-center gap-1 text-sm font-mono font-bold ${
                        stat.netCount > 0 
                          ? 'text-green-400' 
                          : stat.netCount < 0 
                            ? 'text-red-400'
                            : 'text-slate-400'
                      }`}>
                        {stat.netCount > 0 ? <ArrowUp className="w-3 h-3" /> : 
                         stat.netCount < 0 ? <ArrowDown className="w-3 h-3" /> : 
                         <Minus className="w-3 h-3" />}
                        <span>{stat.netCount > 0 ? `+${stat.netCount}` : stat.netCount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[0.625rem] text-slate-500">
                        <span className="text-green-400">+{stat.addedCount}</span>
                        <span>/</span>
                        <span className="text-red-400">-{stat.removedCount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          {t('statsDisclaimer')}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface HeroRelationStatsDialogProps {
  heroId: HeroId;
  heroName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

interface AllRelationStats {
  counter: HeroRelationStatItem[];
  counteredBy: HeroRelationStatItem[];
  synergy: HeroRelationStatItem[];
}

export function HeroRelationStatsDialog({
  heroId,
  heroName,
  open,
  onOpenChange,
  language,
}: HeroRelationStatsDialogProps) {
  const { t } = useI18n();
  const { getHero } = useMemoizedHeroes();
  const [stats, setStats] = useState<AllRelationStats>({ counter: [], counteredBy: [], synergy: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'counter' | 'counteredBy' | 'synergy'>('counteredBy');

  useEffect(() => {
    if (open && heroId) {
      setIsLoading(true);
      setError(null);
      api.getHeroRelationStats(heroId)
        .then(data => {
          setStats({
            counter: data.counter || [],
            counteredBy: data.counteredBy || [],
            synergy: data.synergy || [],
          });
        })
        .catch(err => {
          setError(err instanceof Error ? err.message : 'Failed to load stats');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, heroId]);

  const currentStats = stats[activeTab] || [];
  const sortedStats = [...currentStats].sort((a, b) => Math.abs(b.netCount) - Math.abs(a.netCount));
  const maxAbsCount = Math.max(...sortedStats.map(s => Math.abs(s.netCount)), 1);

  const renderStatList = (statList: HeroRelationStatItem[]) => {
    if (statList.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>{t('noStatsAvailable')}</p>
        </div>
      );
    }

    return (
      <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
        {sortedStats.map((stat, index) => {
          const hero = getHero(stat.heroId as HeroId);
          if (!hero) return null;

          const percentage = (Math.abs(stat.netCount) / maxAbsCount) * 100;

          return (
            <div
              key={stat.heroId}
              className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-[2rem]">
                <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
              </div>

              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                <img src={hero.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {language === 'zh' ? hero.name : hero.nameEn}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[0.625rem] px-1.5 py-0"
                    style={{
                      color: hero.role === 'tank' ? '#f59e0b' : hero.role === 'damage' ? '#ef4444' : '#22c55e',
                      borderColor: hero.role === 'tank' ? '#f59e0b40' : hero.role === 'damage' ? '#ef444440' : '#22c55e40',
                    }}
                  >
                    {t(hero.role)}
                  </Badge>
                </div>
                <div className="mt-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stat.netCount > 0 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : stat.netCount < 0 
                          ? 'bg-gradient-to-r from-red-500 to-red-400'
                          : 'bg-slate-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                <div className={`flex items-center gap-1 text-sm font-mono font-bold ${
                  stat.netCount > 0 
                    ? 'text-green-400' 
                    : stat.netCount < 0 
                      ? 'text-red-400'
                      : 'text-slate-400'
                }`}>
                  {stat.netCount > 0 ? <ArrowUp className="w-3 h-3" /> : 
                   stat.netCount < 0 ? <ArrowDown className="w-3 h-3" /> : 
                   <Minus className="w-3 h-3" />}
                  <span>{stat.netCount > 0 ? `+${stat.netCount}` : stat.netCount}</span>
                </div>
                <div className="flex items-center gap-2 text-[0.625rem] text-slate-500">
                  <span className="text-green-400">+{stat.addedCount}</span>
                  <span>/</span>
                  <span className="text-red-400">-{stat.removedCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>{heroName}</span>
            <span className="text-sm text-slate-400 font-normal">{t('heroRelationStatsTitle')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('counteredBy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'counteredBy'
                  ? 'bg-red-600 text-white border border-red-500'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {t('counteredBy')}
              <Badge variant="secondary" className="text-[0.625rem] px-1.5 py-0 ml-1">
                {stats.counteredBy?.length || 0}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab('counter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'counter'
                  ? 'bg-green-600 text-white border border-green-500'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {t('counters')}
              <Badge variant="secondary" className="text-[0.625rem] px-1.5 py-0 ml-1">
                {stats.counter?.length || 0}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab('synergy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'synergy'
                  ? 'bg-purple-600 text-white border border-purple-500'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {t('synergy')}
              <Badge variant="secondary" className="text-[0.625rem] px-1.5 py-0 ml-1">
                {stats.synergy?.length || 0}
              </Badge>
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-400">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && renderStatList(sortedStats)}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          {t('statsDisclaimer')}
        </div>
      </DialogContent>
    </Dialog>
  );
}
