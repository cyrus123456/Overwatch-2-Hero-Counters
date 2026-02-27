// 最佳拍档关系数据 - 基于2025-2026最新数据
// 配合强度: strength = 3 (核心搭档/Must Pick), 2 (优秀配合/Good Synergy), 1 (良好配合/Decent)
// 数据来源: overpicker.com synergy chart + 2025-2026 meta

export interface SynergyRelation {
  source: string; // 拍档方英雄ID
  target: string; // 被配对方英雄ID (即当前查看的英雄)
  strength?: number; // 3=核心搭档, 2=优秀配合, 1=良好配合
}

// 最佳拍档关系数据 - 根据实际配合效果设置，非固定数量
export const synergyRelations: SynergyRelation[] = [
  // ========== Tank 英雄的最佳拍档 ==========
  // D.Va - 高机动坦克，与高机动DPS和支援配合最佳
  { source: 'kiriko', target: 'dva', strength: 3 },     // 核心搭档
  { source: 'dva', target: 'dva', strength: 3 },       // 自保能力
  { source: 'zarya', target: 'dva', strength: 3 },
  { source: 'baptiste', target: 'dva', strength: 2 },
  { source: 'zenyatta', target: 'dva', strength: 2 },
  { source: 'genji', target: 'dva', strength: 2 },
  { source: 'tracer', target: 'dva', strength: 2 },
  { source: 'sojourn', target: 'dva', strength: 2 },
  { source: 'echo', target: 'dva', strength: 2 },

  // 末日铁拳 - 需要治疗保护
  { source: 'kiriko', target: 'doomfist', strength: 3 },  // 核心搭档
  { source: 'ana', target: 'doomfist', strength: 3 },      // 核心搭档
  { source: 'zarya', target: 'doomfist', strength: 2 },
  { source: 'reaper', target: 'doomfist', strength: 2 },
  { source: 'genji', target: 'doomfist', strength: 2 },
  { source: 'baptiste', target: 'doomfist', strength: 2 },

  // 骇灾 - 新兴坦克
  { source: 'kiriko', target: 'hazard', strength: 3 },
  { source: 'zarya', target: 'hazard', strength: 3 },
  { source: 'cassidy', target: 'hazard', strength: 2 },
  { source: 'ashe', target: 'hazard', strength: 2 },
  { source: 'genji', target: 'hazard', strength: 2 },

  // 渣客女王 - 需要治疗和输出
  { source: 'kiriko', target: 'junker_queen', strength: 3 },
  { source: 'zarya', target: 'junker_queen', strength: 3 },
  { source: 'cassidy', target: 'junker_queen', strength: 2 },
  { source: 'ashe', target: 'junker_queen', strength: 2 },
  { source: 'reaper', target: 'junker_queen', strength: 2 },

  // 毛加 - 高输出坦克
  { source: 'kiriko', target: 'mauga', strength: 3 },
  { source: 'zarya', target: 'mauga', strength: 3 },
  { source: 'baptiste', target: 'mauga', strength: 2 },
  { source: 'cassidy', target: 'mauga', strength: 2 },
  { source: 'reaper', target: 'mauga', strength: 2 },

  // 奥丽莎 - 副T定位
  { source: 'kiriko', target: 'orisa', strength: 2 },
  { source: 'zenyatta', target: 'orisa', strength: 3 },
  { source: 'sigma', target: 'orisa', strength: 3 },
  { source: 'baptiste', target: 'orisa', strength: 2 },
  { source: 'junkrat', target: 'orisa', strength: 2 },
  { source: 'hanzo', target: 'orisa', strength: 2 },

  // 拉玛刹 - 副T
  { source: 'kiriko', target: 'ramattra', strength: 2 },
  { source: 'zenyatta', target: 'ramattra', strength: 2 },
  { source: 'zarya', target: 'ramattra', strength: 2 },
  { source: 'hanzo', target: 'ramattra', strength: 2 },

  // 莱因哈特 - 需要副T保护
  { source: 'zarya', target: 'reinhardt', strength: 3 },
  { source: 'kiriko', target: 'reinhardt', strength: 3 },
  { source: 'baptiste', target: 'reinhardt', strength: 3 },
  { source: 'brigitte', target: 'reinhardt', strength: 2 },
  { source: 'reaper', target: 'reinhardt', strength: 2 },

  // 路霸 - 需要治疗
  { source: 'kiriko', target: 'roadhog', strength: 3 },
  { source: 'zarya', target: 'roadhog', strength: 2 },
  { source: 'junkrat', target: 'roadhog', strength: 2 },
  { source: 'cassidy', target: 'roadhog', strength: 2 },

  // 西格玛 - 副T
  { source: 'kiriko', target: 'sigma', strength: 2 },
  { source: 'zenyatta', target: 'sigma', strength: 3 },
  { source: 'baptiste', target: 'sigma', strength: 2 },
  { source: 'cassidy', target: 'sigma', strength: 2 },
  { source: 'bastion', target: 'sigma', strength: 2 },

  // 温斯顿 - 核心坦克
  { source: 'kiriko', target: 'winston', strength: 3 },
  { source: 'zarya', target: 'winston', strength: 2 },
  { source: 'genji', target: 'winston', strength: 3 },
  { source: 'tracer', target: 'winston', strength: 3 },
  { source: 'dva', target: 'winston', strength: 2 },

  // 破坏球 - 需要治疗
  { source: 'kiriko', target: 'wrecking_ball', strength: 3 },
  { source: 'zenyatta', target: 'wrecking_ball', strength: 2 },
  { source: 'zarya', target: 'wrecking_ball', strength: 2 },
  { source: 'genji', target: 'wrecking_ball', strength: 2 },

  // 查莉娅 - 核心输出坦克
  { source: 'kiriko', target: 'zarya', strength: 3 },
  { source: 'zarya', target: 'zarya', strength: 3 },      // 自保
  { source: 'genji', target: 'zarya', strength: 2 },
  { source: 'reaper', target: 'zarya', strength: 3 },
  { source: 'soldier76', target: 'zarya', strength: 2 },

  //  domina - 新英雄
  { source: 'kiriko', target: 'domina', strength: 2 },
  { source: 'zarya', target: 'domina', strength: 2 },
  { source: 'reaper', target: 'domina', strength: 2 },

  // 金驭
  { source: 'kiriko', target: 'jinyu', strength: 3 },
  { source: 'zarya', target: 'jinyu', strength: 2 },
  { source: 'genji', target: 'jinyu', strength: 2 },

  // ========== DPS 英雄的最佳拍档 ==========
  // 艾什 - 需要保护
  { source: 'zarya', target: 'ashe', strength: 2 },
  { source: 'baptiste', target: 'ashe', strength: 3 },
  { source: 'zenyatta', target: 'ashe', strength: 3 },
  { source: 'sigma', target: 'ashe', strength: 2 },
  { source: 'orisa', target: 'ashe', strength: 2 },

  // 堡垒 - 需要保护
  { source: 'sigma', target: 'bastion', strength: 3 },
  { source: 'orisa', target: 'bastion', strength: 3 },
  { source: 'baptiste', target: 'bastion', strength: 2 },
  { source: 'zarya', target: 'bastion', strength: 2 },

  // 卡西迪 - 万金油DPS
  { source: 'zarya', target: 'cassidy', strength: 2 },
  { source: 'kiriko', target: 'cassidy', strength: 2 },
  { source: 'baptiste', target: 'cassidy', strength: 2 },
  { source: 'ana', target: 'cassidy', strength: 2 },
  { source: 'brigitte', target: 'cassidy', strength: 2 },

  // 回声 - 高机动DPS
  { source: 'dva', target: 'echo', strength: 3 },
  { source: 'kiriko', target: 'echo', strength: 3 },
  { source: 'zenyatta', target: 'echo', strength: 2 },
  { source: 'genji', target: 'echo', strength: 2 },

  // 源氏 - 核心DPS
  { source: 'zarya', target: 'genji', strength: 3 },
  { source: 'zenyatta', target: 'genji', strength: 3 },   // 核心搭档
  { source: 'kiriko', target: 'genji', strength: 3 },     // 核心搭档
  { source: 'ana', target: 'genji', strength: 2 },
  { source: 'dva', target: 'genji', strength: 2 },

  // 半藏 - 需要视野
  { source: 'zarya', target: 'hanzo', strength: 2 },
  { source: 'zenyatta', target: 'hanzo', strength: 2 },
  { source: 'kiriko', target: 'hanzo', strength: 2 },
  { source: 'widowmaker', target: 'hanzo', strength: 2 },

  // 狂鼠 - AOE输出
  { source: 'zarya', target: 'junkrat', strength: 3 },
  { source: 'kiriko', target: 'junkrat', strength: 2 },
  { source: 'baptiste', target: 'junkrat', strength: 2 },

  // 法老之鹰 - 需要天使
  { source: 'mercy', target: 'pharah', strength: 3 },     // 核心搭档
  { source: 'kiriko', target: 'pharah', strength: 2 },
  { source: 'zenyatta', target: 'pharah', strength: 2 },
  { source: 'baptiste', target: 'pharah', strength: 2 },

  // 死神 - 近战DPS
  { source: 'zarya', target: 'reaper', strength: 3 },
  { source: 'kiriko', target: 'reaper', strength: 2 },
  { source: 'zenyatta', target: 'reaper', strength: 2 },
  { source: 'moira', target: 'reaper', strength: 2 },

  // 士兵76 - 万金油
  { source: 'kiriko', target: 'soldier76', strength: 2 },
  { source: 'baptiste', target: 'soldier76', strength: 3 },
  { source: 'zenyatta', target: 'soldier76', strength: 2 },
  { source: 'ana', target: 'soldier76', strength: 2 },

  // 索杰恩 - 高机动DPS
  { source: 'dva', target: 'sojourn', strength: 3 },
  { source: 'kiriko', target: 'sojourn', strength: 3 },
  { source: 'zenyatta', target: 'sojourn', strength: 2 },
  { source: 'zarya', target: 'sojourn', strength: 2 },

  // 秩序之光 - 防守型
  { source: 'zarya', target: 'symmetra', strength: 2 },
  { source: 'kiriko', target: 'symmetra', strength: 2 },
  { source: 'zenyatta', target: 'symmetra', strength: 2 },

  // 托比昂 - 防守型
  { source: 'zarya', target: 'torbjorn', strength: 2 },
  { source: 'kiriko', target: 'torbjorn', strength: 2 },
  { source: 'baptiste', target: 'torbjorn', strength: 2 },

  // 猎空 - 核心DPS
  { source: 'zarya', target: 'tracer', strength: 3 },
  { source: 'zenyatta', target: 'tracer', strength: 3 },  // 核心搭档
  { source: 'kiriko', target: 'tracer', strength: 3 },      // 核心搭档
  { source: 'dva', target: 'tracer', strength: 2 },

  // 探奇 - 新英雄
  { source: 'kiriko', target: 'venture', strength: 3 },
  { source: 'zenyatta', target: 'venture', strength: 2 },
  { source: 'genji', target: 'venture', strength: 2 },
  { source: 'zarya', target: 'venture', strength: 2 },

  // 黑百合 - 狙击
  { source: 'zarya', target: 'widowmaker', strength: 2 },
  { source: 'kiriko', target: 'widowmaker', strength: 2 },
  { source: 'zenyatta', target: 'widowmaker', strength: 2 },

  // 芙蕾雅 - 新英雄
  { source: 'kiriko', target: 'freja', strength: 2 },
  { source: 'zenyatta', target: 'freja', strength: 2 },
  { source: 'genji', target: 'freja', strength: 2 },

  // 斩仇 - 新英雄
  { source: 'dva', target: 'vendetta', strength: 3 },
  { source: 'widowmaker', target: 'vendetta', strength: 2 },
  { source: 'hanzo', target: 'vendetta', strength: 2 },

  // 安燃 - 新英雄
  { source: 'dva', target: 'anran', strength: 3 },
  { source: 'genji', target: 'anran', strength: 3 },
  { source: 'tracer', target: 'anran', strength: 3 },
  { source: 'kiriko', target: 'anran', strength: 2 },

  // 埃姆雷 - 新英雄
  { source: 'kiriko', target: 'emrey', strength: 3 },
  { source: 'zenyatta', target: 'emrey', strength: 2 },
  { source: 'genji', target: 'emrey', strength: 2 },

  // 黑影 - 黑客
  { source: 'zarya', target: 'sombra', strength: 2 },
  { source: 'genji', target: 'sombra', strength: 2 },
  { source: 'tracer', target: 'sombra', strength: 2 },

  // 小美 - 控制
  { source: 'zarya', target: 'mei', strength: 2 },
  { source: 'baptiste', target: 'mei', strength: 2 },
  { source: 'lifeweaver', target: 'mei', strength: 3 },    // 经典配合

  // ========== Support 英雄的最佳拍档 ==========
  // 安娜 - 需要前排保护
  { source: 'dva', target: 'ana', strength: 3 },
  { source: 'reinhardt', target: 'ana', strength: 3 },
  { source: 'zarya', target: 'ana', strength: 2 },
  { source: 'sigma', target: 'ana', strength: 2 },

  // 巴蒂斯特 - 万金油支援
  { source: 'dva', target: 'baptiste', strength: 3 },
  { source: 'reinhardt', target: 'baptiste', strength: 2 },
  { source: 'cassidy', target: 'baptiste', strength: 2 },
  { source: 'soldier76', target: 'baptiste', strength: 2 },
  { source: 'orisa', target: 'baptiste', strength: 2 },

  // 布丽吉塔 - 副支援
  { source: 'dva', target: 'brigitte', strength: 3 },
  { source: 'reinhardt', target: 'brigitte', strength: 3 },
  { source: 'zarya', target: 'brigitte', strength: 2 },
  { source: 'tracer', target: 'brigitte', strength: 2 },

  // 雾子 - 核心支援
  { source: 'dva', target: 'kiriko', strength: 3 },
  { source: 'genji', target: 'kiriko', strength: 3 },    // 核心搭档
  { source: 'tracer', target: 'kiriko', strength: 3 },    // 核心搭档
  { source: 'winston', target: 'kiriko', strength: 2 },
  { source: 'doomfist', target: 'kiriko', strength: 2 },

  // 生命之梭 - 需要保护
  { source: 'dva', target: 'lifeweaver', strength: 3 },
  { source: 'genji', target: 'lifeweaver', strength: 2 },
  { source: 'cassidy', target: 'lifeweaver', strength: 2 },
  { source: 'mei', target: 'lifeweaver', strength: 3 },   // 经典配合

  // 卢西奥 - 加速支援
  { source: 'dva', target: 'lucio', strength: 2 },
  { source: 'genji', target: 'lucio', strength: 3 },
  { source: 'tracer', target: 'lucio', strength: 3 },
  { source: 'winston', target: 'lucio', strength: 2 },

  // 天使 - 核心DPS挂件
  { source: 'pharah', target: 'mercy', strength: 3 },    // 核心搭档
  { source: 'echo', target: 'mercy', strength: 3 },      // 核心搭档
  { source: 'widowmaker', target: 'mercy', strength: 2 },
  { source: 'genji', target: 'mercy', strength: 2 },
  { source: 'tracer', target: 'mercy', strength: 2 },

  // 莫伊拉 - 需要前排
  { source: 'dva', target: 'moira', strength: 2 },
  { source: 'reinhardt', target: 'moira', strength: 3 },
  { source: 'zarya', target: 'moira', strength: 2 },
  { source: 'roadhog', target: 'moira', strength: 2 },

  // 禅雅塔 - 增伤核心
  { source: 'genji', target: 'zenyatta', strength: 3 },   // 核心搭档
  { source: 'tracer', target: 'zenyatta', strength: 3 },  // 核心搭档
  { source: 'dva', target: 'zenyatta', strength: 2 },
  { source: 'winston', target: 'zenyatta', strength: 2 },

  // 无漾 - 新支援
  { source: 'dva', target: 'wuyang', strength: 3 },
  { source: 'widowmaker', target: 'wuyang', strength: 2 },
  { source: 'hanzo', target: 'wuyang', strength: 2 },

  // 瑞稀 - 新支援
  { source: 'dva', target: 'ruixi', strength: 3 },
  { source: 'genji', target: 'ruixi', strength: 2 },
  { source: 'tracer', target: 'ruixi', strength: 2 },

  // 飞天猫 - 新支援
  { source: 'kiriko', target: 'feitianmao', strength: 2 },
  { source: 'zenyatta', target: 'feitianmao', strength: 2 },
  { source: 'genji', target: 'feitianmao', strength: 2 },

  // 伊拉锐 - 高输出支援
  { source: 'dva', target: 'illari', strength: 3 },
  { source: 'zarya', target: 'illari', strength: 2 },
  { source: 'genji', target: 'illari', strength: 2 },

  // 朱诺 - 新支援
  { source: 'dva', target: 'juno', strength: 3 },
  { source: 'genji', target: 'juno', strength: 3 },
  { source: 'tracer', target: 'juno', strength: 3 },
  { source: 'winston', target: 'juno', strength: 2 },

  // Mizuki - 新支援
  { source: 'dva', target: 'mizuki', strength: 2 },
  { source: 'zarya', target: 'mizuki', strength: 2 },
  { source: 'genji', target: 'mizuki', strength: 2 },
];
