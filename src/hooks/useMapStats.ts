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

type RefreshCallback = () => void;
const refreshCallbacks: Set<RefreshCallback> = new Set();

export function registerMapStatsRefresh(callback: RefreshCallback) {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback);
}

export function triggerMapStatsRefresh() {
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load stats';
      setError(message);
      console.error('[MapStats] Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [mapIds]);

  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => prev + 1);
    };
    const unregister = registerMapStatsRefresh(handleRefresh);
    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
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
