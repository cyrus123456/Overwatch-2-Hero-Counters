import { useCallback, useEffect, useRef, useState } from 'react';

import type { HeroRelationData, MapHeroData } from '@/services/api';
import { api } from '@/services/api';
import { triggerMapStatsRefresh } from '@/hooks/useMapStats';
import { triggerHeroRelationStatsRefresh } from '@/hooks/useHeroRelationStats';

interface CustomMapHero {
  heroId: string;
  reason: string;
}

// 全局同步状态
type SyncCallback = () => Promise<void>;
const syncCallbacks: Set<SyncCallback> = new Set();

// 注册同步回调
export function registerSyncCallback(callback: SyncCallback) {
  syncCallbacks.add(callback);
  return () => syncCallbacks.delete(callback);
}

// 触发全局同步
export async function triggerGlobalSync() {
  console.log('[GlobalSync] Triggering sync...');
  for (const callback of syncCallbacks) {
    try {
      await callback();
    } catch (error) {
      console.error('[GlobalSync] Sync callback error:', error);
    }
  }
}

// 上传所有本地数据到云端
export async function uploadAllLocalData(): Promise<boolean> {
  try {
    // 1. 上传地图英雄数据
    const customMapHeroesStr = localStorage.getItem('ow2-custom-map-heroes');
    const deletedDefaultHeroesStr = localStorage.getItem('ow2-deleted-default-heroes');
    
    const customMapHeroes = customMapHeroesStr ? JSON.parse(customMapHeroesStr) : {};
    const deletedDefaultHeroes = deletedDefaultHeroesStr ? JSON.parse(deletedDefaultHeroesStr) : {};

    const hasMapData = Object.keys(customMapHeroes).length > 0 || Object.keys(deletedDefaultHeroes).length > 0;
    
    if (hasMapData) {
      const convertedCustomMapHeroes: Record<string, { heroId: string; reason: string }[]> = {};
      for (const [mapId, heroes] of Object.entries(customMapHeroes)) {
        convertedCustomMapHeroes[mapId] = (heroes as CustomMapHero[]).map(h => ({
          heroId: h.heroId,
          reason: h.reason,
        }));
      }

      const mapData: MapHeroData = {
        customMapHeroes: convertedCustomMapHeroes,
        deletedDefaultHeroes,
      };

      await api.saveMapHeroData(mapData);
      console.log('[Upload] Map hero data uploaded successfully');
    }

    // 2. 上传英雄关系数据
    const relations: HeroRelationData['relations'] = [];

    // 自定义克制关系
    const customCounterRelations = localStorage.getItem('ow2-custom-counter-relations');
    if (customCounterRelations) {
      const parsed = JSON.parse(customCounterRelations);
      for (const relation of parsed) {
        relations.push({
          sourceHeroId: relation.source,
          targetHeroId: relation.target,
          relationType: 'counter',
          isCustom: true,
        });
      }
    }

    // 删除的默认克制关系
    const deletedDefaultRelations = localStorage.getItem('ow2-deleted-default-relations');
    if (deletedDefaultRelations) {
      const parsed: string[] = JSON.parse(deletedDefaultRelations);
      for (const relationKey of parsed) {
        const [source, target] = relationKey.split('-');
        if (source && target) {
          relations.push({
            sourceHeroId: source,
            targetHeroId: target,
            relationType: 'counter',
            isCustom: false,
          });
        }
      }
    }

    // 自定义协同关系
    const customSynergyRelations = localStorage.getItem('ow2-custom-synergy-relations');
    if (customSynergyRelations) {
      const parsed = JSON.parse(customSynergyRelations);
      for (const relation of parsed) {
        relations.push({
          sourceHeroId: relation.source,
          targetHeroId: relation.target,
          relationType: 'synergy',
          isCustom: true,
        });
      }
    }

    // 删除的默认协同关系
    const deletedDefaultSynergyRelations = localStorage.getItem('ow2-deleted-default-synergy-relations');
    if (deletedDefaultSynergyRelations) {
      const parsed: string[] = JSON.parse(deletedDefaultSynergyRelations);
      for (const relationKey of parsed) {
        const [source, target] = relationKey.split('-');
        if (source && target) {
          relations.push({
            sourceHeroId: source,
            targetHeroId: target,
            relationType: 'synergy',
            isCustom: false,
          });
        }
      }
    }

    if (relations.length > 0) {
      await api.saveHeroRelationData({ relations });
      console.log('[Upload] Hero relation data uploaded successfully:', relations.length, 'relations');
    }

    // 触发统计数据刷新
    triggerMapStatsRefresh();
    triggerHeroRelationStatsRefresh();
    console.log('[Upload] Stats refresh triggered');

    return true;
  } catch (error) {
    console.error('[Upload] Failed to upload local data:', error);
    return false;
  }
}

interface UseDataSyncOptions {
  customMapHeroes: Record<string, CustomMapHero[]>;
  deletedDefaultHeroes: Record<string, string[]>;
  onSyncComplete?: (data: MapHeroData) => void;
  onSyncError?: (error: Error) => void;
}

interface UseDataSyncReturn {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  syncError: Error | null;
  syncData: () => Promise<void>;
  pullData: () => Promise<MapHeroData | null>;
}

export function useDataSync(options: UseDataSyncOptions): UseDataSyncReturn {
  const { customMapHeroes, deletedDefaultHeroes, onSyncComplete, onSyncError } = options;

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<Error | null>(null);

  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef<string>('');

  const convertToApiFormat = useCallback((): MapHeroData => {
    const convertedCustomMapHeroes: Record<string, { heroId: string; reason: string }[]> = {};

    for (const [mapId, heroes] of Object.entries(customMapHeroes)) {
      convertedCustomMapHeroes[mapId] = heroes.map(h => ({
        heroId: h.heroId,
        reason: h.reason,
      }));
    }

    return {
      customMapHeroes: convertedCustomMapHeroes,
      deletedDefaultHeroes,
    };
  }, [customMapHeroes, deletedDefaultHeroes]);

  const syncData = useCallback(async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const data = convertToApiFormat();
      await api.saveMapHeroData(data);
      setLastSyncTime(new Date());
      onSyncComplete?.(data);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Sync failed');
      setSyncError(err);
      onSyncError?.(err);
    } finally {
      setIsSyncing(false);
    }
  }, [convertToApiFormat, isSyncing, onSyncComplete, onSyncError]);

  const pullData = useCallback(async (): Promise<MapHeroData | null> => {
    setIsSyncing(true);
    setSyncError(null);

    try {
      const userData = await api.getUserData();
      setLastSyncTime(new Date());
      return userData.mapHeroData;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Pull failed');
      setSyncError(err);
      onSyncError?.(err);
      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [onSyncError]);

  useEffect(() => {
    const currentData = JSON.stringify({ customMapHeroes, deletedDefaultHeroes });

    if (currentData === prevDataRef.current) return;
    prevDataRef.current = currentData;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      syncData();
    }, 2000);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [customMapHeroes, deletedDefaultHeroes, syncData]);

  return {
    isSyncing,
    lastSyncTime,
    syncError,
    syncData,
    pullData,
  };
}

export function useCloudSync() {
  const [isEnabled, setIsEnabled] = useState(() => {
    const stored = localStorage.getItem('ow2-cloud-sync-enabled');
    return stored === 'true';
  });

  const toggleSync = useCallback(() => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('ow2-cloud-sync-enabled', String(newValue));
  }, [isEnabled]);

  return {
    isEnabled,
    toggleSync,
  };
}

// 页面加载时自动上传本地数据到云端
export function useAutoUploadOnMount(
  customMapHeroes: Record<string, CustomMapHero[]>,
  deletedDefaultHeroes: Record<string, string[]>
) {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const hasUploadedRef = useRef(false);

  useEffect(() => {
    if (hasUploadedRef.current) return;

    const uploadData = async () => {
      setUploadStatus('uploading');
      setUploadError(null);

      try {
        // 1. 上传地图英雄数据
        const hasMapData = Object.keys(customMapHeroes).length > 0 || Object.keys(deletedDefaultHeroes).length > 0;
        
        if (hasMapData) {
          const convertedCustomMapHeroes: Record<string, { heroId: string; reason: string }[]> = {};

          for (const [mapId, heroes] of Object.entries(customMapHeroes)) {
            convertedCustomMapHeroes[mapId] = heroes.map(h => ({
              heroId: h.heroId,
              reason: h.reason,
            }));
          }

          const mapData: MapHeroData = {
            customMapHeroes: convertedCustomMapHeroes,
            deletedDefaultHeroes,
          };

          await api.saveMapHeroData(mapData);
          console.log('[AutoUpload] Map hero data uploaded successfully');
        }

        // 2. 上传英雄关系数据（从 localStorage 读取）
        const relations: HeroRelationData['relations'] = [];

        // 读取自定义克制关系 (isCustom: true)
        try {
          const customCounterRelations = localStorage.getItem('ow2-custom-counter-relations');
          if (customCounterRelations) {
            const parsed = JSON.parse(customCounterRelations);
            for (const relation of parsed) {
              relations.push({
                sourceHeroId: relation.source,
                targetHeroId: relation.target,
                relationType: 'counter',
                isCustom: true,
              });
            }
          }
        } catch (e) {
          console.error('[AutoUpload] Failed to parse custom counter relations:', e);
        }

        // 读取删除的默认克制关系 (isCustom: false)
        try {
          const deletedDefaultRelations = localStorage.getItem('ow2-deleted-default-relations');
          if (deletedDefaultRelations) {
            const parsed: string[] = JSON.parse(deletedDefaultRelations);
            for (const relationKey of parsed) {
              const [source, target] = relationKey.split('-');
              if (source && target) {
                relations.push({
                  sourceHeroId: source,
                  targetHeroId: target,
                  relationType: 'counter',
                  isCustom: false,
                });
              }
            }
          }
        } catch (e) {
          console.error('[AutoUpload] Failed to parse deleted default relations:', e);
        }

        // 读取自定义协同关系 (isCustom: true)
        try {
          const customSynergyRelations = localStorage.getItem('ow2-custom-synergy-relations');
          if (customSynergyRelations) {
            const parsed = JSON.parse(customSynergyRelations);
            for (const relation of parsed) {
              relations.push({
                sourceHeroId: relation.source,
                targetHeroId: relation.target,
                relationType: 'synergy',
                isCustom: true,
              });
            }
          }
        } catch (e) {
          console.error('[AutoUpload] Failed to parse custom synergy relations:', e);
        }

        // 读取删除的默认协同关系 (isCustom: false)
        try {
          const deletedDefaultSynergyRelations = localStorage.getItem('ow2-deleted-default-synergy-relations');
          if (deletedDefaultSynergyRelations) {
            const parsed: string[] = JSON.parse(deletedDefaultSynergyRelations);
            for (const relationKey of parsed) {
              const [source, target] = relationKey.split('-');
              if (source && target) {
                relations.push({
                  sourceHeroId: source,
                  targetHeroId: target,
                  relationType: 'synergy',
                  isCustom: false,
                });
              }
            }
          }
        } catch (e) {
          console.error('[AutoUpload] Failed to parse deleted default synergy relations:', e);
        }

        if (relations.length > 0) {
          await api.saveHeroRelationData({ relations });
          console.log('[AutoUpload] Hero relation data uploaded successfully:', relations.length, 'relations');
        }

        setUploadStatus('success');
        hasUploadedRef.current = true;

        console.log('[AutoUpload] All local data uploaded successfully');
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Upload failed');
        setUploadStatus('error');
        setUploadError(err.message);
        console.error('[AutoUpload] Failed to upload local data:', err);
      }
    };

    // 延迟 3 秒后上传，避免页面加载时过于拥挤
    const timer = setTimeout(() => {
      uploadData();
    }, 3000);

    return () => clearTimeout(timer);
  }, [customMapHeroes, deletedDefaultHeroes]);

  return {
    uploadStatus,
    uploadError,
  };
}

// 英雄关系数据上传 hook（从 localStorage 读取）
export function useHeroRelationUpload() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const hasUploadedRef = useRef(false);

  useEffect(() => {
    if (hasUploadedRef.current) return;

    const uploadData = async () => {
      const relations: HeroRelationData['relations'] = [];

      // 读取自定义克制关系 (isCustom: true)
      try {
        const customCounterRelations = localStorage.getItem('ow2-custom-counter-relations');
        if (customCounterRelations) {
          const parsed = JSON.parse(customCounterRelations);
          for (const relation of parsed) {
            relations.push({
              sourceHeroId: relation.source,
              targetHeroId: relation.target,
              relationType: 'counter',
              isCustom: true,
            });
          }
        }
      } catch (e) {
        console.error('[HeroRelationUpload] Failed to parse custom counter relations:', e);
      }

      // 读取删除的默认克制关系 (isCustom: false)
      try {
        const deletedDefaultRelations = localStorage.getItem('ow2-deleted-default-relations');
        if (deletedDefaultRelations) {
          const parsed: string[] = JSON.parse(deletedDefaultRelations);
          for (const relationKey of parsed) {
            const [source, target] = relationKey.split('-');
            if (source && target) {
              relations.push({
                sourceHeroId: source,
                targetHeroId: target,
                relationType: 'counter',
                isCustom: false,
              });
            }
          }
        }
      } catch (e) {
        console.error('[HeroRelationUpload] Failed to parse deleted default relations:', e);
      }

      // 读取自定义协同关系 (isCustom: true)
      try {
        const customSynergyRelations = localStorage.getItem('ow2-custom-synergy-relations');
        if (customSynergyRelations) {
          const parsed = JSON.parse(customSynergyRelations);
          for (const relation of parsed) {
            relations.push({
              sourceHeroId: relation.source,
              targetHeroId: relation.target,
              relationType: 'synergy',
              isCustom: true,
            });
          }
        }
      } catch (e) {
        console.error('[HeroRelationUpload] Failed to parse custom synergy relations:', e);
      }

      // 读取删除的默认协同关系 (isCustom: false)
      try {
        const deletedDefaultSynergyRelations = localStorage.getItem('ow2-deleted-default-synergy-relations');
        if (deletedDefaultSynergyRelations) {
          const parsed: string[] = JSON.parse(deletedDefaultSynergyRelations);
          for (const relationKey of parsed) {
            const [source, target] = relationKey.split('-');
            if (source && target) {
              relations.push({
                sourceHeroId: source,
                targetHeroId: target,
                relationType: 'synergy',
                isCustom: false,
              });
            }
          }
        }
      } catch (e) {
        console.error('[HeroRelationUpload] Failed to parse deleted default synergy relations:', e);
      }

      if (relations.length === 0) return;

      setUploadStatus('uploading');
      setUploadError(null);

      try {
        await api.saveHeroRelationData({ relations });
        setUploadStatus('success');
        hasUploadedRef.current = true;
        console.log('[HeroRelationUpload] Hero relation data uploaded successfully');
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Upload failed');
        setUploadStatus('error');
        setUploadError(err.message);
        console.error('[HeroRelationUpload] Failed to upload hero relation data:', err);
      }
    };

    // 延迟 5 秒后上传
    const timer = setTimeout(() => {
      uploadData();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return {
    uploadStatus,
    uploadError,
  };
}
