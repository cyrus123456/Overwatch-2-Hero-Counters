import { useCallback, useEffect, useState } from 'react';

import type { HeroRelationStatItem } from '@/services/api';
import { api } from '@/services/api';

interface HeroRelationStatsData {
  counter: HeroRelationStatItem[];
  counteredBy: HeroRelationStatItem[];
  synergy: HeroRelationStatItem[];
}

interface UseHeroRelationStatsReturn {
  stats: HeroRelationStatsData | null;
  isLoading: boolean;
  error: string | null;
  getNetCount: (targetHeroId: string, relationType: 'counter' | 'counteredBy' | 'synergy') => number | null;
  refreshStats: () => Promise<void>;
}

type RefreshCallback = () => void;
const refreshCallbacks: Set<RefreshCallback> = new Set();

export function registerHeroRelationStatsRefresh(callback: RefreshCallback) {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback);
}

export function triggerHeroRelationStatsRefresh() {
  for (const callback of refreshCallbacks) {
    callback();
  }
}

export function useHeroRelationStats(heroId: string | null): UseHeroRelationStatsReturn {
  const [stats, setStats] = useState<HeroRelationStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshStats = useCallback(async () => {
    if (!heroId) {
      setStats(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getHeroRelationStats(heroId);
      const statsData: HeroRelationStatsData = {
        counter: data.counter || [],
        counteredBy: data.counteredBy || [],
        synergy: data.synergy || [],
      };

      setStats(statsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load hero relation stats';
      setError(message);
      console.error('[HeroRelationStats] Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [heroId]);

  const getNetCount = useCallback((targetHeroId: string, relationType: 'counter' | 'counteredBy' | 'synergy'): number | null => {
    if (!stats) return null;

    const relationStats = stats[relationType];
    if (!relationStats) return null;

    const heroStat = relationStats.find(s => s.heroId === targetHeroId);
    return heroStat?.netCount ?? null;
  }, [stats]);

  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    const unregister = registerHeroRelationStatsRefresh(handleRefresh);
    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    if (!heroId) {
      setStats(null);
      return;
    }

    refreshStats();
  }, [heroId, refreshStats, refreshTrigger]);

  return {
    stats,
    isLoading,
    error,
    getNetCount,
    refreshStats,
  };
}
