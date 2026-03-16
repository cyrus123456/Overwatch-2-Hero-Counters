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
    abilityZh: '防御矩阵吞噬大部分投射物但激光束除外并用推进追击',
    abilityEn: 'Defense Matrix absorbs most projectiles except beams and uses Boosters for pursuit'
  },
  doomfist: {
    abilityZh: '高机动性突脸并用火箭重拳击飞但易被闪避时无力',
    abilityEn: 'High mobility dive with Rocket Punch knockup but weak when dodged'
  },
  hazard: {
    abilityZh: '区域控制能力并持续叠加毒素伤害',
    abilityEn: 'Area denial with poison damage stacking'
  },
  junker_queen: {
    abilityZh: '抗治疗能力并用斧头连招近战压制',
    abilityEn: 'Anti-heal capabilities with axe combo melee pressure'
  },
  mauga: {
    abilityZh: '持续高伤害输出并用双枪燃烧进行控场',
    abilityEn: 'Sustained high damage with dual incendiary guns for area control'
  },
  orisa: {
    abilityZh: '矛刺穿甲并用坚毅挡控技保持高生存',
    abilityEn: 'Javelin penetrates with Fortify blocking CC for high survivability'
  },
  ramattra: {
    abilityZh: '涅槃形态近战输出并用形态切换灵活阻挡护盾',
    abilityEn: 'Nemesis form melee damage with form swap for shield blocking'
  },
  reinhardt: {
    abilityZh: '盾牌阻挡并用锤击控制和冲锋开团',
    abilityEn: 'Shield blocking with Hammer control and charge initiation'
  },
  roadhog: {
    abilityZh: '钩子拉人秒杀并用自愈保持高生存',
    abilityEn: 'Hook combo kills with self-heal for high survivability'
  },
  sigma: {
    abilityZh: '动能护甲吸收弹药并用漂浮机动进行石化控制',
    abilityEn: 'Kinetic Grasp absorbs with floating mobility for Accretion stun'
  },
  winston: {
    abilityZh: '跳跃突脸并用电击无需瞄准造成群体伤害',
    abilityEn: 'Jump dive with Tesla no aim needed for AoE damage'
  },
  wrecking_ball: {
    abilityZh: '高机动扰阵并用抓钩连招和地雷区域封锁',
    abilityEn: 'High mobility disruption with hook combos and Minefield area denial'
  },
  zarya: {
    abilityZh: '护盾吸收伤害充能并在高能量时输出更高',
    abilityEn: 'Bubble absorbs damage to charge with higher damage at high energy'
  },
  // 输出
  ashe: {
    abilityZh: '远程高爆发并用狙击加散弹配合炸弹击退',
    abilityEn: 'Long-range burst with snipe plus shotgun and Dynamite knockback'
  },
  bastion: {
    abilityZh: '架枪形态极高DPS并在配置模式中保持无敌',
    abilityEn: 'Turret form extreme DPS while staying invincible in Configuration Mode'
  },
  cassidy: {
    abilityZh: '磁力手雷粘附并用和平使者连发造成高爆发伤害',
    abilityEn: 'Magnetic Grenade sticks with Peacekeeper for high burst damage'
  },
  echo: {
    abilityZh: '飞行追击并用粘弹爆发同时复制大招',
    abilityEn: 'Flight pursuit with sticky bomb burst and Duplicate ult'
  },
  freja: {
    abilityZh: '强化弩箭配合滞空能力和高爆发伤害',
    abilityEn: 'Enhanced crossbow combined with air mobility and high burst damage'
  },
  genji: {
  abilityZh: '高机动骚扰并反弹大部分投射物，但光束型、无需瞄准的持续伤害（如Winston电、莫伊拉锁定、秩序之光光束）、能量线以及Sigma石头等硬控无法反弹',
  abilityEn: 'High mobility harass while reflecting most projectiles, but cannot reflect beams, auto-locking/continuous no-aim damage (e.g. Winston Tesla, Moira grasp, Symmetra beam), energy lines, or hard CC like Sigma Accretion'
},
  hanzo: {
    abilityZh: '远程秒杀能力并用声呐探敌释放龙击',
    abilityEn: 'One-shot potential with Sonic Arrow reveals and Dragonstrike'
  },
  junkrat: {
    abilityZh: '炸弹消耗屏障并用地雷加轮胎进行陷阱控制',
    abilityEn: 'Bombs break barriers with mine plus tire for trap control'
  },
  mei: {
    abilityZh: '冰冻减速并用自愈加冰冻分割战场',
    abilityEn: 'Freeze slows with self-heal plus cryo to split fights'
  },
  pharah: {
    abilityZh: '空中输出并用火箭跳加悬停让近战英雄无法触及',
    abilityEn: 'Aerial attacks with hover plus jump jet to stay out of melee range'
  },
  reaper: {
    abilityZh: '近距离高伤害并用影步加大招进行幽灵形态逃脱',
    abilityEn: 'Close-range devastation with teleport plus ult for Wraith escapes'
  },
  sojourn: {
    abilityZh: '高机动远程输出并用滑铲加轨道炮实现蓄能秒杀',
    abilityEn: 'Mobile hitscan with slide plus rail for one-shots'
  },
  soldier76: {
    abilityZh: '稳定远程输出并用自愈加冲刺发射螺旋飞弹',
    abilityEn: 'Consistent hitscan with self-heal plus sprint and Helix burst'
  },
  sombra: {
    abilityZh: '黑客禁用技能并用传送加EMP进行隐身偷袭',
    abilityEn: 'Hack disables abilities with translocator plus EMP for stealth ambush'
  },
  symmetra: {
    abilityZh: '光束蓄能穿透并用炮塔骚扰而激光束无法被反弹',
    abilityEn: 'Beam charges through with turret harassment while the beam cannot be deflected'
  },
  torbjorn: {
    abilityZh: '炮塔自动瞄准并用升级炮塔实现过载增强',
    abilityEn: 'Auto-aim turret with turret upgrade for overcharge boost'
  },
  tracer: {
    abilityZh: '闪烁骚扰并用回溯逃脱同时释放脉冲炸弹',
    abilityEn: 'Blink harass with Recall escape and pulse bomb'
  },
  venture: {
    abilityZh: '钻地突袭并用钻头连招实现高机动近战',
    abilityEn: 'Burrow ambush with drill combos for mobile melee'
  },
  widowmaker: {
    abilityZh: '狙击秒杀并用毒镖加隐身进行红外探敌',
    abilityEn: 'Sniper one-shots with venom mine plus invis for Infra-Sight reveals'
  },
  vendetta: {
    abilityZh: '巨剑近战并用高机动切入实现爆发连招',
    abilityEn: 'Greatsword melee with high mobility dive for burst combos'
  },
  anran: {
    abilityZh: '火焰突进并用无敌反击触发燃烧被动',
    abilityEn: 'Flame dash with invulnerable counter triggering burn passive'
  },
  emrey: {
    abilityZh: '三连发步枪并用虹吸生命实现终极变身',
    abilityEn: 'Burst rifle with life drain for ultimate transformation'
  },
  // 支援
  ana: {
    abilityZh: '睡眠针控制并用狙击加纳米释放生化手雷禁疗',
    abilityEn: 'Sleep Dart CC with snipe plus nano for anti-nade blocks healing'
  },
  baptiste: {
    abilityZh: '不死力场保护并用炮台加跳跃实现再生爆发',
    abilityEn: 'Immortality Field saves with exoskeleton plus jump for regen burst'
  },
  brigitte: {
    abilityZh: '盾牌格挡并用连枷加护盾进行盾击打断',
    abilityEn: 'Shield blocks with flail plus shield for Shield Bash interrupts'
  },
  illari: {
    abilityZh: '太阳光线高伤害并用太阳塔实现击退控制',
    abilityEn: 'Solar Rifle damage with pylon for knockback control'
  },
  juno: {
    abilityZh: '高机动支援并用火箭推进释放环形轨道能力',
    abilityEn: 'Mobile support with rocket boost for orbital abilities'
  },
  kiriko: {
    abilityZh: '铃铛净化并用狐狸步加神乐实现传送逃脱',
    abilityEn: 'Suzu cleanses with fox step plus kitsune for Swift Step escapes'
  },
  lifeweaver: {
    abilityZh: '生命之握拉回队友并用平台加握手封路',
    abilityEn: 'Life Grip saves with platform plus grip to block'
  },
  lucio: {
    abilityZh: '速度光环并用墙壁滑行实现击退推人',
    abilityEn: 'Speed boost with wall ride for boop knockback'
  },
  mercy: {
    abilityZh: '守护天使逃脱并用滑翔加复活救队友',
    abilityEn: 'Guardian Angel escapes with glide plus res for resurrect'
  },
  moira: {
    abilityZh: '锁定光束无需瞄准并用消散逃脱而激光束无法被反弹',
    abilityEn: 'Lock-on beam with Fade escapes while the beam cannot be deflected'
  },
  zenyatta: {
    abilityZh: '不和之珠增伤并用调和珠加球体保持高输出',
    abilityEn: 'Discord Orb amplifies damage with harmony plus orbs for high DPS'
  },
  wuyang: {
    abilityZh: '水元素治疗并用节奏截断和位移技能',
    abilityEn: 'Water healing with rhythm interruption and mobility'
  },
  ruixi: {
    abilityZh: '治疗镰刃并用纸人位移加护魂结界和束缚锁链',
    abilityEn: 'Healing scythe with paper dash plus spirit barrier and chain bind'
  },
  feitianmao: {
    abilityZh: '永久飞行并用扩散弹加救生索拖拽和击退治疗',
    abilityEn: 'Permanent flight with spread shots plus lifeline drag and knockback heal'
  },
};

// 被克制英雄的弱点描述（已优化融合所有括号内容，更自然流畅）
export const heroWeaknesses: Record<string, WeaknessData> = {
  // 坦克
  dva: {
    weaknessZh: '机甲体积巨大易被集火同时惧怕黑客禁用防御矩阵或EMP',
    weaknessEn: 'Large mech hitbox easy to target while fearing Sombra hack disabling Defense Matrix or EMP'
  },
  doomfist: {
    weaknessZh: '技能CD长被限制后无力同时火箭重拳易被闪避或控制打断',
    weaknessEn: 'Long cooldowns making him weak when disabled while Rocket Punch is easily dodged or interrupted'
  },
  hazard: {
    weaknessZh: '机动性有限易被远程压制同时毒素伤害易被铃铛或净化技能清除',
    weaknessEn: 'Limited mobility making him vulnerable to range while poison is easily cleansed by Suzu or similar'
  },
  junker_queen: {
    weaknessZh: '需要近战输出易被远程风筝同时抗治疗易被生化手雷或铃铛反制',
    weaknessEn: 'Needs close range making her easily kited while anti-heal is countered by anti-nade or Suzu'
  },
  mauga: {
    weaknessZh: '体型巨大易中弹同时惧怕高机动英雄风筝或蓄能秒杀',
    weaknessEn: 'Huge hitbox easy to hit while fearing high mobility kiting or railgun one-shots'
  },
  orisa: {
    weaknessZh: '机动性差侧翼易被突同时坚毅形态后仍可被睡眠针或石化控制',
    weaknessEn: 'Low mobility making flanks vulnerable while Fortify is still CCable by Sleep Dart or Accretion'
  },
  ramattra: {
    weaknessZh: '涅槃形态无护盾同时近战输出时易被风筝或远程点射',
    weaknessEn: 'No barrier in Nemesis form while easily kited or hitscanned in melee'
  },
  reinhardt: {
    weaknessZh: '盾被破后脆弱同时惧怕堡垒架枪形态或托比昂炮塔持续破坏',
    weaknessEn: 'Vulnerable when shield broken while fearing Bastion turret or Torbjorn turret melting shield'
  },
  roadhog: {
    weaknessZh: '体型大容易上大招同时钩子被闪避后无力惧怕源氏反弹钩子',
    weaknessEn: 'Big hitbox charges enemy ults while weak if hook dodged and fearing Genji deflecting hook'
  },
  sigma: {
    weaknessZh: '近战被贴脸同时动能护甲对近战与激光束无效',
    weaknessEn: 'Weak to close-range pressure while Kinetic Grasp is ineffective vs melee and beams'
  },
  winston: {
    weaknessZh: '伤害偏低抗压差同时惧怕堡垒架枪形态极高DPS或托比昂炮塔',
    weaknessEn: 'Low damage with poor sustain while fearing Bastion turret extreme DPS or Torbjorn turrets'
  },
  wrecking_ball: {
    weaknessZh: '易被控制打断同时地雷易被清除或黑客禁用',
    weaknessEn: 'Easily CC\'d out of momentum while mines are easily destroyed or hacked'
  },
  zarya: {
    weaknessZh: '低能量时输出低同时护盾被骗则无力惧怕黑影EMP清空能量',
    weaknessEn: 'Low damage at low charge while bubbles baited make her weak and fearing Sombra EMP clearing charge'
  },
  jinyu: {
    weaknessZh: '腿短近战弱同时惧怕突脸狙击和EMP',
    weaknessEn: 'Low mobility and weak in melee while vulnerable to dive snipers and EMP'
  },
  // 输出
  ashe: {
    weaknessZh: '被突脸后难以自保同时惧怕源氏高机动骚扰或黑影隐身偷袭',
    weaknessEn: 'Weak to dive with poor self-peel while fearing Genji high mobility harass or Sombra ambush'
  },
  bastion: {
    weaknessZh: '架枪时完全静止同时惧怕黑影黑客禁用或路霸钩子拉走',
    weaknessEn: 'Stationary in turret mode while fearing Sombra hack or Roadhog hook'
  },
  cassidy: {
    weaknessZh: '机动差远程被压同时磁力手雷CD后脆弱惧怕梅冰墙分割',
    weaknessEn: 'Low mobility losing to range while vulnerable after Magnetic Grenade CD and fearing Mei Ice Wall'
  },
  echo: {
    weaknessZh: '飞行时易被射同时惧怕寡妇狙击或士兵76螺旋飞弹',
    weaknessEn: 'Vulnerable while flying while fearing Widowmaker snipes or Soldier Helix Rockets'
  },
  freja: {
    weaknessZh: '弩箭可被源氏反弹同时滞空时被长枪点射',
    weaknessEn: 'Arrows deflectable by Genji while vulnerable to hitscan when airborne'
  },
  genji: {
  weaknessZh: '惧怕光束型武器（如Winston电击、秩序之光、莫伊拉锁定光束、扎莉亚能量束）这些无需瞄准且无法反弹的持续伤害，同时近战被硬控（如Sigma石头、梅冰冻）或集火时极易阵亡',
  weaknessEn: 'Fears beam weapons (Winston Tesla, Symmetra, Moira lock-on, Zarya beam) that require no aim and cannot be deflected, while vulnerable to hard CC in close range (Sigma rock, Mei freeze) or focused fire leading to quick death'
},
  hanzo: {
    weaknessZh: '被近身后无力同时惧怕梅冰墙分割战场或路霸钩子拉近',
    weaknessEn: 'Weak at close range while fearing Mei Ice Wall or Roadhog hook'
  },
  junkrat: {
    weaknessZh: '空中目标难打同时惧怕法老之鹰空中输出或源氏飞行追击',
    weaknessEn: 'Can\'t hit aerial targets while fearing Pharah aerial attacks or Echo flight pursuit'
  },
  mei: {
    weaknessZh: '远程被风筝同时惧怕法老之鹰等空中英雄冰冻对飞行单位效果差',
    weaknessEn: 'Kited by long range while fearing Pharah aerial heroes and freeze less effective on flyers'
  },
  pharah: {
    weaknessZh: '被强力点射秒杀同时惧怕寡妇狙击士兵76索杰恩等点射英雄',
    weaknessEn: 'Countered by hitscan while fearing Widowmaker Soldier 76 Sojourn hitscan heroes'
  },
  reaper: {
    weaknessZh: '远程无法触及同时惧怕法老之鹰空中输出或远程风筝幽灵形态CD后脆弱',
    weaknessEn: 'Can\'t reach long range while fearing Pharah aerial or range kiting and vulnerable when Wraith on CD'
  },
  sojourn: {
    weaknessZh: '被近身突脸同时蓄能秒杀易被控制打断惧怕源氏反弹轨道炮',
    weaknessEn: 'Vulnerable to dive while railgun one-shots are interrupted by CC and fearing Genji deflecting rail'
  },
  soldier76: {
    weaknessZh: '被控制后无力同时惧怕黑影黑客禁用螺旋飞弹或源氏反弹',
    weaknessEn: 'Weak when CC\'d while fearing Sombra hack disabling Helix or Genji deflect'
  },
  sombra: {
    weaknessZh: '被发现后脆弱同时惧怕禅雅塔不和之珠增伤或秩序之光炮塔探测',
    weaknessEn: 'Fragile when revealed while fearing Zenyatta Discord Orb or Symmetra turrets detecting'
  },
  symmetra: {
    weaknessZh: '蓄能慢远程被压同时光束虽无法被反弹但自身机动性差',
    weaknessEn: 'Slow charge-up weak to range while beam cannot be deflected but low mobility'
  },
  torbjorn: {
    weaknessZh: '炮塔被快速摧毁同时惧怕源氏反弹或黑影黑客直接拆塔',
    weaknessEn: 'Turret destroyed quickly while fearing Genji deflect or Sombra hack destroying turret'
  },
  tracer: {
    weaknessZh: '血量极低同时惧怕卡西迪磁力手雷粘附或梅冰冻减速易被单发秒杀',
    weaknessEn: 'Extremely low HP while fearing Cassidy Magnetic Grenade stick or Mei freeze slow and easy one-shot'
  },
  venture: {
    weaknessZh: '被远程风筝同时钻地时易被控制打断',
    weaknessEn: 'Kited by range while burrow is easily interrupted by CC'
  },
  widowmaker: {
    weaknessZh: '被突脸后无力同时惧怕源氏高机动或黑影隐身偷袭',
    weaknessEn: 'Weak when dived while fearing Genji high mobility or Sombra stealth ambush'
  },
  vendetta: {
    weaknessZh: '纯近战无远程飞行单位天敌同时冲深被集火',
    weaknessEn: 'Pure melee no range countered by flyers while vulnerable when overextended'
  },
  emrey: {
    weaknessZh: '缺乏位移自保同时惧怕刺客突脸强控和长枪',
    weaknessEn: 'No mobility while vulnerable to assassins CC and long-range'
  },
  // 支援
  ana: {
    weaknessZh: '无位移技能同时惧怕源氏或黑影突脸睡眠针CD后无力',
    weaknessEn: 'No mobility abilities while fearing Genji or Sombra dive and weak after Sleep Dart CD'
  },
  baptiste: {
    weaknessZh: '被突脸消耗同时不死力场易被黑客或EMP破坏',
    weaknessEn: 'Weak to sustained dive while Immortality Field is easily hacked or EMP\'d'
  },
  brigitte: {
    weaknessZh: '近战英雄远程被打同时惧怕法老之鹰或索杰恩空中远程压制',
    weaknessEn: 'Melee hero weak to range while fearing Pharah or Sojourn aerial range pressure'
  },
  illari: {
    weaknessZh: '被近身后塔被毁同时太阳光线易被闪避或源氏反弹',
    weaknessEn: 'Pylon destroyed when dived while Solar Rifle is easily dodged or deflected by Genji'
  },
  juno: {
    weaknessZh: '被突脸难以逃脱同时环形轨道能力CD后脆弱',
    weaknessEn: 'Weak when focused while orbital abilities are vulnerable on CD'
  },
  kiriko: {
    weaknessZh: '被集火时难以同时奶和逃脱同时铃铛净化有CD限制',
    weaknessEn: 'Hard to heal and escape when focused while Suzu has cooldown limit'
  },
  lifeweaver: {
    weaknessZh: '输出能力较弱同时生命之握易被打断或黑客禁用',
    weaknessEn: 'Weak offensive output while Life Grip is easily interrupted or hacked'
  },
  lucio: {
    weaknessZh: '单目标治疗弱同时惧怕黑客禁用速度光环或源氏光束穿透',
    weaknessEn: 'Poor single-target healing while fearing hack disabling speed aura or Symmetra beam'
  },
  mercy: {
    weaknessZh: '自保能力最弱同时惧怕黑影隐身偷袭或源氏突脸复活时无法移动',
    weaknessEn: 'Weakest self-sustain while fearing Sombra stealth ambush or Genji dive and stationary during Resurrect'
  },
  moira: {
    weaknessZh: '消散CD后脆弱同时锁定光束虽无法被反弹但易被集火风筝',
    weaknessEn: 'Vulnerable when Fade on CD while lock-on beam cannot be deflected but easily kited when focused'
  },
  anran: {
    weaknessZh: '手短缺乏远程同时惧怕冰冻风筝禁疗和强盾拦截',
    weaknessEn: 'Short range while vulnerable to freeze kiting anti-heal and shields'
  },
  zenyatta: {
    weaknessZh: '血量极低无自保同时惧怕源氏突脸或黑影黑客禁用不和之珠',
    weaknessEn: 'Extremely low HP no self-peel while fearing Genji dive or Sombra hack disabling Discord Orb'
  },
  wuyang: {
    weaknessZh: '依赖技能生存同时惧怕黑客突脸和穿透伤害',
    weaknessEn: 'Skill-dependent survival while vulnerable to hack dive and penetration'
  },
  ruixi: {
    weaknessZh: '机动性差无爬墙同时惧怕高台长枪和光束穿透',
    weaknessEn: 'Low mobility no wall climb while vulnerable to high ground and beams'
  },
  feitianmao: {
    weaknessZh: '飞行速度慢血低同时惧怕即时命中EMP和空对空',
    weaknessEn: 'Slow flight low HP while vulnerable to hitscan EMP and aerial combat'
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


