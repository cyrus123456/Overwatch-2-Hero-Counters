import { useMemo } from 'react';

/**
 * 关系数据接口 - 本地定义避免循环导入
 */
interface RelationData {
  source: string;
  target: string;
  strength: number;
  isCustom: boolean;
}

/** 克制/协同关系输入格式 */
export type RelationInput = {
  source: string;
  target: string;
  strength?: number;
  isCustom?: boolean;
};

/**
 * 关系查找 Map - 将 O(n) 的 Array.find 降为 O(1) 的 Map.get
 * key 格式: "sourceId-targetId"
 */
export type RelationMap = Map<string, RelationData>;

/**
 * 为克制/协同关系预构建查找 Map
 * 在 ForceGraph 中有 20+ 处 .find(r => r.source === x && r.target === y) 调用，
 * 使用 Map 后每次查找从 O(R) 降为 O(1)，R ≈ 150-200 条关系
 */
export function useRelationMaps(
  counterRelations: RelationInput[],
  synergyRelations: RelationInput[]
) {
  const counterMap = useMemo<RelationMap>(() => {
    return new Map(
      counterRelations.map(r => [
        `${r.source}-${r.target}`,
        { source: r.source, target: r.target, strength: r.strength || 1, isCustom: r.isCustom || false }
      ])
    );
  }, [counterRelations]);

  const synergyMap = useMemo<RelationMap>(() => {
    return new Map(
      synergyRelations.map(r => [
        `${r.source}-${r.target}`,
        { source: r.source, target: r.target, strength: r.strength || 1, isCustom: r.isCustom || false }
      ])
    );
  }, [synergyRelations]);

  /**
   * O(1) 查找克制关系强度，返回 undefined 表示不存在
   */
  const getCounterStrength = (sourceId: string, targetId: string): number | undefined => {
    return counterMap.get(`${sourceId}-${targetId}`)?.strength;
  };

  /**
   * O(1) 判断克制关系是否存在
   */
  const hasCounterRelation = (sourceId: string, targetId: string): boolean => {
    return counterMap.has(`${sourceId}-${targetId}`);
  };

  /**
   * O(1) 查找协同关系强度
   */
  const getSynergyStrength = (sourceId: string, targetId: string): number | undefined => {
    return synergyMap.get(`${sourceId}-${targetId}`)?.strength;
  };

  /**
   * O(1) 判断协同关系是否存在
   */
  const hasSynergyRelation = (sourceId: string, targetId: string): boolean => {
    return synergyMap.has(`${sourceId}-${targetId}`);
  };

  return {
    counterMap,
    synergyMap,
    getCounterStrength,
    hasCounterRelation,
    getSynergyStrength,
    hasSynergyRelation,
  };
}
