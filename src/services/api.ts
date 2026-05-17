// 根据环境自动选择 API 地址
// 开发环境: 使用相对路径 + Vite 代理
// 生产环境: 使用完整 URL
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? '' 
  : import.meta.env.VITE_API_URL || 'https://ow2-hero-counters-api.b8c72dzp5t.workers.dev';

export interface MapHeroData {
  customMapHeroes: Record<string, { heroId: string; reason: string }[]>;
  deletedDefaultHeroes: Record<string, string[]>;
}

export interface HeroRelationData {
  relations: {
    sourceHeroId: string;
    targetHeroId: string;
    relationType: 'counter' | 'countered_by' | 'synergy';
    isCustom?: boolean;
  }[];
}

export interface UserData {
  userId: string;
  mapHeroData: MapHeroData;
  heroRelationData: HeroRelationData;
}

export interface MapHeroStats {
  mapId: string;
  heroStats: {
    heroId: string;
    addedCount: number;
    removedCount: number;
    netCount: number;
  }[];
}

export interface HeroRelationStatItem {
  heroId: string;
  addedCount: number;
  removedCount: number;
  netCount: number;
}

export interface HeroRelationStats {
  heroId: string;
  relationType?: string;
  counter?: HeroRelationStatItem[];
  counteredBy?: HeroRelationStatItem[];
  synergy?: HeroRelationStatItem[];
  relatedHeroStats?: HeroRelationStatItem[];
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[API] ${options?.method || 'GET'} ${url}`);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  async getUserData(): Promise<UserData> {
    return fetchApi<UserData>('/api/user');
  },

  async saveMapHeroData(data: MapHeroData): Promise<{ success: boolean; message: string }> {
    return fetchApi('/api/map-hero-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async saveHeroRelationData(data: HeroRelationData): Promise<{ success: boolean; message: string }> {
    return fetchApi('/api/hero-relation-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMapStats(mapId: string): Promise<MapHeroStats> {
    return fetchApi<MapHeroStats>(`/api/stats/map/${mapId}`);
  },

  async getHeroRelationStats(heroId: string): Promise<HeroRelationStats> {
    return fetchApi<HeroRelationStats>(`/api/stats/hero/${heroId}`);
  },

  async getHeroRelationStatsByType(
    heroId: string,
    relationType: 'counter' | 'countered_by' | 'synergy'
  ): Promise<HeroRelationStats> {
    return fetchApi<HeroRelationStats>(`/api/stats/hero/${heroId}/${relationType}`);
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return fetchApi('/api/health');
  },
};
