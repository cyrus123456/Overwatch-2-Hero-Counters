import { useCallback, useEffect, useState } from 'react';

import { api } from '@/services/api';

interface HeroStat {
  heroId: string;
  addedCount: number;
  removedCount: number;
  netCount: number;
}

type MapStatsRecord = Record<string, Record<string, HeroStat>>;

interface UseMapStatsReturn {
  mapStats: MapStatsRecord;
  isLoading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

const MAP_STATS_CACHE_KEY = 'ow2-map-stats-cache';
const MAP_STATS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CachedMapStats {
  data: MapStatsRecord;
  timestamp: number;
}

// 全局刷新回调
type RefreshCallback = () => void;
const refreshCallbacks: Set<RefreshCallback> = new Set();

export function registerMapStatsRefresh(callback: RefreshCallback) {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback);
}

export function triggerMapStatsRefresh() {
  // 清除缓存
  localStorage.removeItem(MAP_STATS_CACHE_KEY);
  // 触发所有注册的刷新回调
  for (const callback of refreshCallbacks) {
    callback();
  }
}

export function useMapStats(mapIds: string[]): UseMapStatsReturn {
  const [mapStats, setMapStats] = useState<MapStatsRecord>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshStats = useCallback(async () => {
    if (mapIds.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        mapIds.map(mapId => api.getMapStats(mapId))
      );

      const newStats: MapStatsRecord = {};
      for (const result of results) {
        newStats[result.mapId] = {};
        for (const stat of result.heroStats) {
          newStats[result.mapId][stat.heroId] = {
            heroId: stat.heroId,
            addedCount: stat.addedCount,
            removedCount: stat.removedCount,
            netCount: stat.netCount,
          };
        }
      }

      setMapStats(newStats);

      // Cache the results
      const cacheData: CachedMapStats = {
        data: newStats,
        timestamp: Date.now(),
      };
      localStorage.setItem(MAP_STATS_CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load stats';
      setError(message);
      console.error('[MapStats] Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [mapIds]);

  // 注册全局刷新回调
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    registerMapStatsRefresh(handleRefresh);
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    // Try to load from cache first
    try {
      const cached = localStorage.getItem(MAP_STATS_CACHE_KEY);
      if (cached) {
        const parsed: CachedMapStats = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < MAP_STATS_CACHE_TTL) {
          setMapStats(parsed.data);
          return;
        }
      }
    } catch {
      // Ignore cache errors
    }

    refreshStats();
  }, [refreshStats, refreshTrigger]);

  return {
    mapStats,
    isLoading,
    error,
    refreshStats,
  };
}

export function getHeroNetCount(
  mapStats: MapStatsRecord,
  mapId: string,
  heroId: string
): number | null {
  const mapData = mapStats[mapId];
  if (!mapData) return null;
  const heroData = mapData[heroId];
  if (!heroData) return null;
  return heroData.netCount;
}
