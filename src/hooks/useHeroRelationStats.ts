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

const HERO_RELATION_STATS_CACHE_KEY = 'ow2-hero-relation-stats-cache';
const HERO_RELATION_STATS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CachedHeroRelationStats {
  heroId: string;
  data: HeroRelationStatsData;
  timestamp: number;
}

// 全局刷新回调
type RefreshCallback = () => void;
const refreshCallbacks: Set<RefreshCallback> = new Set();

export function registerHeroRelationStatsRefresh(callback: RefreshCallback) {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback);
}

export function triggerHeroRelationStatsRefresh() {
  // 清除缓存
  localStorage.removeItem(HERO_RELATION_STATS_CACHE_KEY);
  // 触发所有注册的刷新回调
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

      // Cache the results
      const cacheData: CachedHeroRelationStats = {
        heroId,
        data: statsData,
        timestamp: Date.now(),
      };
      localStorage.setItem(HERO_RELATION_STATS_CACHE_KEY, JSON.stringify(cacheData));
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

  // 注册全局刷新回调
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    registerHeroRelationStatsRefresh(handleRefresh);
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    if (!heroId) {
      setStats(null);
      return;
    }

    // Try to load from cache first
    try {
      const cached = localStorage.getItem(HERO_RELATION_STATS_CACHE_KEY);
      if (cached) {
        const parsed: CachedHeroRelationStats = JSON.parse(cached);
        if (parsed.heroId === heroId && Date.now() - parsed.timestamp < HERO_RELATION_STATS_CACHE_TTL) {
          setStats(parsed.data);
          return;
        }
      }
    } catch {
      // Ignore cache errors
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
