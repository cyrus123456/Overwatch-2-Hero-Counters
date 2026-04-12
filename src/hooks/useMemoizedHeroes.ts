import { heroes, type Hero, type HeroId } from '@/data/heroData';
import { useCallback, useMemo } from 'react';

/**
 * 性能优化 hook：预构建英雄查找表，避免重复的 Array.find() 调用
 * 
 * 原始问题：每次渲染时，地图列表中每个英雄头像都会调用 heroes.find(h => h.id === heroId)
 * 在 40+ 张地图、每张 5-6 个推荐英雄的情况下，每帧可能产生 200+ 次 O(n) 查找
 * 
 * 优化后：使用 Map 实现 O(1) 查找
 */
export function useMemoizedHeroes() {
  const heroMap = useMemo(() => {
    const map = new Map<HeroId, Hero>();
    for (const hero of heroes) {
      map.set(hero.id, hero);
    }
    return map;
  }, []);

  /** O(1) 查找英雄 */
  const getHero = useCallback((id: HeroId): Hero | undefined => heroMap.get(id), [heroMap]);

  /** 获取英雄名称（带缓存） */
  const getHeroName = useCallback((heroId: HeroId, language: string): string => {
    const hero = heroMap.get(heroId);
    if (!hero) return '';
    return language === 'zh' ? hero.name : hero.nameEn;
  }, [heroMap]);

  return { heroes, heroMap, getHero, getHeroName };
}

/** 角色排序权重（预定义常量，避免每次渲染重新创建） */
export const ROLE_ORDER: Record<string, number> = Object.freeze({
  tank: 0,
  damage: 1,
  support: 2,
});

/**
 * 预计算的角色排序函数（稳定排序）
 */
export function sortByRole<T extends { role: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]);
}
