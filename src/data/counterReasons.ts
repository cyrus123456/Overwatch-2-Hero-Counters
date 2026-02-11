export type CounterLanguage = 'zh' | 'en' | 'ja' | 'ko' | 'zh-TW' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'it';

export interface CounterAbilityData {
  abilityZh: string;
  abilityEn: string;
  abilityJa?: string;
  abilityKo?: string;
  abilityZhTW?: string;
  abilityEs?: string;
  abilityFr?: string;
  abilityDe?: string;
  abilityPt?: string;
  abilityRu?: string;
  abilityIt?: string;
}

export interface WeaknessData {
  weaknessZh: string;
  weaknessEn: string;
  weaknessJa?: string;
  weaknessKo?: string;
  weaknessZhTW?: string;
  weaknessEs?: string;
  weaknessFr?: string;
  weaknessDe?: string;
  weaknessPt?: string;
  weaknessRu?: string;
  weaknessIt?: string;
}

export const heroCounterAbilities: Record<string, CounterAbilityData> = {
  // 坦克
  dva: {
    abilityZh: '防御矩阵吞噬弹药/推进追击',
    abilityEn: 'Defense Matrix absorbs projectiles / Boosters for pursuit'
  },
  doomfist: {
    abilityZh: '高机动性突脸/上勾拳击飞',
    abilityEn: 'High mobility dive / Uppercut knockup'
  },
  hazard: {
    abilityZh: '区域控制能力/毒素伤害',
    abilityEn: 'Area denial / Poison damage'
  },
  junker_queen: {
    abilityZh: '抗治疗能力/近战压制',
    abilityEn: 'Anti-heal capabilities / Melee pressure'
  },
  mauga: {
    abilityZh: '持续高伤害输出/控场能力',
    abilityEn: 'Sustained high damage / Area control'
  },
  orisa: {
    abilityZh: '矛刺穿甲/坚毅挡控技',
    abilityEn: 'Javelin penetrates / Fortify blocks CC'
  },
  ramattra: {
    abilityZh: '涅槃形态近战输出/护盾阻挡',
    abilityEn: 'Nemesis form melee damage / Shield blocking'
  },
  reinhardt: {
    abilityZh: '盾牌阻挡/锤击控制',
    abilityEn: 'Shield blocking / Hammer control'
  },
  roadhog: {
    abilityZh: '钩子拉人秒杀/高生存能力',
    abilityEn: 'Hook combo kills / High survivability'
  },
  sigma: {
    abilityZh: '动能护甲吸收弹药/石化控制',
    abilityEn: 'Kinetic Grasp absorbs / Accretion stun'
  },
  winston: {
    abilityZh: '跳跃突脸/电击无需瞄准',
    abilityEn: 'Jump dive / Tesla no aim needed'
  },
  wrecking_ball: {
    abilityZh: '高机动扰阵/地雷区域封锁',
    abilityEn: 'High mobility disruption / Minefield area denial'
  },
  zarya: {
    abilityZh: '护盾吸收伤害充能/高能量输出',
    abilityEn: 'Bubble absorbs damage to charge / High energy damage'
  },
  
  // 输出
  ashe: {
    abilityZh: '远程高爆发/炸弹击退',
    abilityEn: 'Long-range burst / Dynamite knockback'
  },
  bastion: {
    abilityZh: '架枪形态极高DPS',
    abilityEn: 'Turret form extreme DPS'
  },
  cassidy: {
    abilityZh: '磁力手雷粘附/高爆发伤害',
    abilityEn: 'Magnetic Grenade sticks / High burst damage'
  },
  echo: {
    abilityZh: '飞行追击/粘弹高爆发',
    abilityEn: 'Flight pursuit / Sticky bomb burst'
  },
  freja: {
    abilityZh: '强化弩箭/滞空能力/高爆发伤害',
    abilityEn: 'Enhanced crossbow / Air mobility / High burst damage'
  },
  genji: {
    abilityZh: '高机动骚扰/反弹技能',
    abilityEn: 'High mobility harass / Deflect abilities'
  },
  hanzo: {
    abilityZh: '远程秒杀能力/声呐探敌',
    abilityEn: 'One-shot potential / Sonic Arrow reveals'
  },
  junkrat: {
    abilityZh: '炸弹消耗屏障/陷阱控制',
    abilityEn: 'Bombs break barriers / Trap control'
  },
  mei: {
    abilityZh: '冰冻减速/冰墙分割战场',
    abilityEn: 'Freeze slows / Ice Wall splits fights'
  },
  pharah: {
    abilityZh: '空中输出/近战英雄无法触及',
    abilityEn: 'Aerial attacks / Out of melee range'
  },
  reaper: {
    abilityZh: '近距离高伤害/幽灵形态逃脱',
    abilityEn: 'Close-range devastation / Wraith escapes'
  },
  sojourn: {
    abilityZh: '高机动远程输出/蓄能秒杀',
    abilityEn: 'Mobile hitscan / Railgun one-shots'
  },
  soldier76: {
    abilityZh: '稳定远程输出/螺旋飞弹',
    abilityEn: 'Consistent hitscan / Helix burst'
  },
  sombra: {
    abilityZh: '黑客禁用技能/隐身偷袭',
    abilityEn: 'Hack disables abilities / Stealth ambush'
  },
  symmetra: {
    abilityZh: '光束蓄能穿透/炮塔骚扰',
    abilityEn: 'Beam charges through / Turret harassment'
  },
  torbjorn: {
    abilityZh: '炮塔自动瞄准/过载增强',
    abilityEn: 'Auto-aim turret / Overcharge boost'
  },
  tracer: {
    abilityZh: '闪烁骚扰/回溯逃脱',
    abilityEn: 'Blink harass / Recall escape'
  },
  venture: {
    abilityZh: '钻地突袭/高机动近战',
    abilityEn: 'Burrow ambush / Mobile melee'
  },
   widowmaker: {
     abilityZh: '狙击秒杀/红外探敌',
     abilityEn: 'Sniper one-shots / Infra-Sight reveals'
   },
     vendetta: {
       abilityZh: '巨剑近战/高机动切入/爆发连招',
       abilityEn: 'Greatsword melee / High mobility dive / Burst combos'
     },
    anran: {
       abilityZh: '火焰突进/无敌反击/燃烧被动',
       abilityEn: 'Flame dash / Invulnerable counter / Burn passive'
     },
     emrey: {
       abilityZh: '三连发步枪/虹吸生命/终极变身',
       abilityEn: 'Burst rifle / Life drain / Ultimate transformation'
     },
    
    // 支援
  ana: {
    abilityZh: '睡眠针控制/生化手雷禁疗',
    abilityEn: 'Sleep Dart CC / Anti-nade blocks healing'
  },
  baptiste: {
    abilityZh: '不死力场保护/再生爆发',
    abilityEn: 'Immortality Field saves / Regen burst'
  },
  brigitte: {
    abilityZh: '盾牌格挡/盾击打断',
    abilityEn: 'Shield blocks / Shield Bash interrupts'
  },
  illari: {
    abilityZh: '太阳光线高伤害/击退控制',
    abilityEn: 'Solar Rifle damage / Knockback control'
  },
  juno: {
    abilityZh: '高机动支援/环形轨道能力',
    abilityEn: 'Mobile support / Orbital abilities'
  },
  kiriko: {
    abilityZh: '铃铛净化/传送逃脱',
    abilityEn: 'Suzu cleanses / Swift Step escapes'
  },
  lifeweaver: {
    abilityZh: '生命之握拉回队友/荆棘封路',
    abilityEn: 'Life Grip saves / Thorn wall blocks'
  },
  lucio: {
    abilityZh: '速度光环/击退推人',
    abilityEn: 'Speed boost / Boop knockback'
  },
  mercy: {
    abilityZh: '守护天使逃脱/复活队友',
    abilityEn: 'Guardian Angel escapes / Resurrect'
  },
  moira: {
    abilityZh: '锁定光束无需瞄准/消散逃脱',
    abilityEn: 'Lock-on beam / Fade escapes'
  },
  zenyatta: {
    abilityZh: '不和之珠增伤/高输出',
    abilityEn: 'Discord Orb amplifies damage / High DPS'
  },
  wuyang: {
    abilityZh: '水元素治疗/节奏截断/位移技能',
    abilityEn: 'Water healing / Rhythm interruption / Mobility'
  },
  ruixi: {
    abilityZh: '治疗镰刃/纸人位移/护魂结界/束缚锁链',
    abilityEn: 'Healing scythe / Paper dash / Spirit barrier / Chain bind'
  },
  feitianmao: {
    abilityZh: '永久飞行/扩散弹/救生索拖拽/击退治疗',
    abilityEn: 'Permanent flight / Spread shots / Lifeline drag / Knockback heal'
  },
};

// 被克制英雄的弱点描述，用于生成更详细的克制理由
export const heroWeaknesses: Record<string, WeaknessData> = {
  // 坦克
  dva: {
    weaknessZh: '机甲外体积大易被针对',
    weaknessEn: 'Large mech hitbox easy to target'
  },
  doomfist: {
    weaknessZh: '技能CD长，被限制后无力',
    weaknessEn: 'Long cooldowns, weak when disabled'
  },
  hazard: {
    weaknessZh: '机动性有限，远程压制',
    weaknessEn: 'Limited mobility, vulnerable to range'
  },
  junker_queen: {
    weaknessZh: '需要近战输出，远程被风筝',
    weaknessEn: 'Needs close range, easily kited'
  },
  mauga: {
    weaknessZh: '体型巨大易中弹',
    weaknessEn: 'Huge hitbox, easy to hit'
  },
  orisa: {
    weaknessZh: '机动性差，侧翼易被突',
    weaknessEn: 'Low mobility, flanks vulnerable'
  },
  ramattra: {
    weaknessZh: '涅槃形态无护盾',
    weaknessEn: 'No barrier in Nemesis form'
  },
  reinhardt: {
    weaknessZh: '盾被破后脆弱',
    weaknessEn: 'Vulnerable when shield broken'
  },
  roadhog: {
    weaknessZh: '体型大容易上大招',
    weaknessEn: 'Big hitbox charges enemy ults'
  },
  sigma: {
    weaknessZh: '近战被贴脸',
    weaknessEn: 'Weak to close-range pressure'
  },
  winston: {
    weaknessZh: '伤害偏低，抗压差',
    weaknessEn: 'Low damage, poor sustain'
  },
  wrecking_ball: {
    weaknessZh: '易被控制打断',
    weaknessEn: 'Easily CC\'d out of momentum'
  },
  zarya: {
    weaknessZh: '低能量时输出低',
    weaknessEn: 'Low damage at low charge'
  },
  jinyu: {
    weaknessZh: '腿短近战弱，惧怕突脸/狙击/EMP',
    weaknessEn: 'Low mobility, weak in melee, vulnerable to dive/snipers/EMP'
  },

  // 输出
  ashe: {
    weaknessZh: '被突脸后难以自保',
    weaknessEn: 'Weak to dive, poor self-peel'
  },
  bastion: {
    weaknessZh: '架枪时完全静止',
    weaknessEn: 'Stationary in turret mode'
  },
  cassidy: {
    weaknessZh: '机动差，远程被压',
    weaknessEn: 'Low mobility, loses to range'
  },
  echo: {
    weaknessZh: '飞行时易被射',
    weaknessEn: 'Vulnerable while flying'
  },
  freja: {
    weaknessZh: '弩箭可被源氏反弹，滞空时被长枪点射',
    weaknessEn: 'Arrows deflectable by Genji, vulnerable to hitscan while airborne'
  },
  genji: {
    weaknessZh: '反弹被骗则无力',
    weaknessEn: 'Weak when deflect baited'
  },
  hanzo: {
    weaknessZh: '被近身后无力',
    weaknessEn: 'Weak at close range'
  },
  junkrat: {
    weaknessZh: '空中目标难打',
    weaknessEn: 'Can\'t hit aerial targets'
  },
  mei: {
    weaknessZh: '远程被风筝',
    weaknessEn: 'Kited by long range'
  },
  pharah: {
    weaknessZh: '被强力点射秒杀',
    weaknessEn: 'Countered by hitscan'
  },
  reaper: {
    weaknessZh: '远程无法触及',
    weaknessEn: 'Can\'t reach long range'
  },
  sojourn: {
    weaknessZh: '被近身突脸',
    weaknessEn: 'Vulnerable to dive'
  },
  soldier76: {
    weaknessZh: '被控制后无力',
    weaknessEn: 'Weak when CC\'d'
  },
  sombra: {
    weaknessZh: '被发现后脆弱',
    weaknessEn: 'Fragile when revealed'
  },
  symmetra: {
    weaknessZh: '蓄能慢，远程被压',
    weaknessEn: 'Slow charge-up, weak to range'
  },
  torbjorn: {
    weaknessZh: '炮塔被快速摧毁',
    weaknessEn: 'Turret destroyed quickly'
  },
  tracer: {
    weaknessZh: '血量极低',
    weaknessEn: 'Extremely low HP'
  },
   venture: {
     weaknessZh: '被远程风筝',
     weaknessEn: 'Kited by range'
   },
   widowmaker: {
     weaknessZh: '被突脸后无力',
     weaknessEn: 'Weak when dived'
   },
   vendetta: {
       weaknessZh: '纯近战无远程，飞行单位天敌，冲深被集火',
       weaknessEn: 'Pure melee no range, countered by flyers, vulnerable when overextended'
     },
  emrey: {
    weaknessZh: '缺乏位移自保，惧怕刺客突脸/强控/长枪',
    weaknessEn: 'No mobility, vulnerable to assassins/CC/long-range'
  },

    // 支援
  ana: {
    weaknessZh: '无位移技能',
    weaknessEn: 'No mobility abilities'
  },
  baptiste: {
    weaknessZh: '被突脸消耗',
    weaknessEn: 'Weak to sustained dive'
  },
  brigitte: {
    weaknessZh: '近战英雄，远程被打',
    weaknessEn: 'Melee hero, weak to range'
  },
  illari: {
    weaknessZh: '被近身后塔被毁',
    weaknessEn: 'Pylon destroyed when dived'
  },
  juno: {
    weaknessZh: '被突脸难以逃脱',
    weaknessEn: 'Weak when focused'
  },
  kiriko: {
    weaknessZh: '被集火时难以同时奶和逃脱',
    weaknessEn: 'Hard to heal and escape when focused'
  },
  lifeweaver: {
    weaknessZh: '输出能力较弱',
    weaknessEn: 'Weak offensive output'
  },
   lucio: {
     weaknessZh: '单目标治疗弱',
     weaknessEn: 'Poor single-target healing'
   },
   mercy: {
     weaknessZh: '自保能力最弱',
     weaknessEn: 'Weakest self-sustain'
   },
     moira: {
       weaknessZh: '消散CD后脆弱',
       weaknessEn: 'Vulnerable when Fade on CD'
     },
     anran: {
      weaknessZh: '手短缺乏远程，惧怕冰冻/风筝/禁疗/强盾拦截',
      weaknessEn: 'Short range, vulnerable to freeze/kiting/anti-heal/shields'
    },
    wuyang: {
      weaknessZh: '依赖技能生存，惧怕黑客/突脸/穿透伤害',
      weaknessEn: 'Skill-dependent survival, vulnerable to hack/dive/penetration'
    },
    ruixi: {
      weaknessZh: '机动性差无爬墙，惧怕高台长枪/光束穿透',
      weaknessEn: 'Low mobility, no wall climb, vulnerable to high ground/beams'
    },
    feitianmao: {
      weaknessZh: '飞行速度慢血低，惧怕即时命中/EMP/空对空',
      weaknessEn: 'Slow flight, low HP, vulnerable to hitscan/EMP/aerial combat'
    },
 };
 
export type SupportedLanguage = 'zh' | 'en' | 'ja' | 'ko' | 'zh-TW' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'it';

export const fallbackMessages: Record<SupportedLanguage, string> = {
  zh: '存在克制关系',
  en: 'Counter relationship exists',
  ja: '相克関係があります',
  ko: '상성이 있습니다',
  'zh-TW': '存在剋制關係',
  es: 'Relación de contra existe',
  fr: 'Relation de contre existe',
  de: 'Gegner-Beziehung existiert',
  pt: 'Relação de contra existe',
  ru: 'Отношение контра существует',
  it: 'Relazione contro esiste',
};

export function getCounterReason(sourceId: string, targetId: string, language: SupportedLanguage): string {
  const sourceAbility = heroCounterAbilities[sourceId];
  const targetWeakness = heroWeaknesses[targetId];

  if (!sourceAbility || !targetWeakness) {
    return fallbackMessages[language];
  }

  const abilityZh = sourceAbility.abilityZh;
  const abilityEn = sourceAbility.abilityEn;
  const weaknessZh = targetWeakness.weaknessZh;
  const weaknessEn = targetWeakness.weaknessEn;

  switch (language) {
    case 'zh':
      return `${abilityZh} → ${weaknessZh}`;
    case 'zh-TW':
      return `${abilityZh} → ${weaknessZh}`;
    default:
      return `${abilityEn} → ${weaknessEn}`;
  }
}


