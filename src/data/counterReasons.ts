import type { HeroId } from './heroData';

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

export const heroCounterAbilities: Record<HeroId, CounterAbilityData> = {
  // 坦克
  // D.Va
  dva: {
    abilityZh: '防御矩阵吞噬大部分投射物但激光束除外并用推进追击',
    abilityEn: 'Defense Matrix absorbs most projectiles except beams and uses Boosters for pursuit'
  },
  // 末日铁拳
  doomfist: {
    abilityZh: '高机动性突脸并用火箭重拳击飞但易被闪避时无力',
    abilityEn: 'High mobility dive with Rocket Punch knockup but weak when dodged'
  },
  // 骇灾
  hazard: {
    abilityZh: '骨刺尖刺持续输出并用尖刺墙击退封锁，狂跃突进劈砍，千针雨定身敌人',
    abilityEn: 'Spike damage with Spike Wall knockback denial, Feral Leap pounce and Rain of Spores root'
  },
  // 渣客女王
  junker_queen: {
    abilityZh: '抗治疗能力并用斧头连招近战压制',
    abilityEn: 'Anti-heal capabilities with axe combo melee pressure'
  },
  // 毛加
  mauga: {
    abilityZh: '持续高伤害输出并用双枪燃烧进行控场',
    abilityEn: 'Sustained high damage with dual incendiary guns for area control'
  },
  // 奥丽莎
  orisa: {
    abilityZh: '矛刺穿甲并用坚毅挡控技保持高生存',
    abilityEn: 'Javelin penetrates with Fortify blocking CC for high survivability'
  },
  // 拉玛刹
  ramattra: {
    abilityZh: '涅槃形态近战输出并用形态切换灵活阻挡护盾',
    abilityEn: 'Nemesis form melee damage with form swap for shield blocking'
  },
  // 莱因哈特
  reinhardt: {
    abilityZh: '盾牌阻挡并用锤击控制和冲锋开团',
    abilityEn: 'Shield blocking with Hammer control and charge initiation'
  },
  // 路霸
  roadhog: {
    abilityZh: '链钩拉人接爆裂枪二连发秒杀，废品压缩器吸收射弹压缩反击，呼吸器自愈保生存',
    abilityEn: 'Hook into Scrap Gun double-barrel combo kills, Scrap Compactor absorbs projectiles for return fire, Take a Breather self-heal'
  },
  // 西格玛
  sigma: {
    abilityZh: '动能护甲吸收弹药并用漂浮机动进行石化控制',
    abilityEn: 'Kinetic Grasp absorbs with floating mobility for Accretion stun'
  },
  // 温斯顿
  winston: {
    abilityZh: '跳跃突脸并用电击无需瞄准造成群体伤害',
    abilityEn: 'Jump dive with Tesla no aim needed for AoE damage'
  },
  // 破坏球
  wrecking_ball: {
    abilityZh: '高机动扰阵并用抓钩连招和地雷区域封锁',
    abilityEn: 'High mobility disruption with hook combos and Minefield area denial'
  },
  // 查莉娅
  zarya: {
    abilityZh: "护盾吸收伤害充能并在高能量时输出更高",
    abilityEn: "Bubble absorbs damage to charge with higher damage at high energy"
  },
  // 金驭
  domina: {
    abilityZh: "中距光束汇聚强力一击并用分段屏障遮挡，爆能水晶引爆，音速斥力场撞墙击晕，全景牢笼囚禁引爆",
    abilityEn: "Mid-range beam converges into a heavy shot with segmented barrier, Detonator Crystal blast, Sonic Repulsor wall-stun and Panoramic Cage trap detonation"
  },
  // D.mon
  dmon: {
    abilityZh: "机甲速射机枪压制并用无极斩增伤回血，助推器任意方向突进，突进刺击击退敌人",
    abilityEn: "Mech rapid cannons pressure with Overdrive Slash damage amp and overhealth, Boosters omnidirectional dash and charge stab knockback"
  },
  // 输出
  // 艾什
  ashe: {
    abilityZh: '毒蛇开镜狙击高爆发并用短筒猎枪后撤离位，延时雷管引爆，鲍勃冲锋击飞',
    abilityEn: 'Scoped Viper one-shots with Coach Gun repositioning, Dynamite detonate and B.O.B. charge knockup'
  },
  // 堡垒
  bastion: {
    abilityZh: '侦察模式机动射击并用A-36榴弹弹射，强攻模式机枪压制，火炮模式固定三连炮弹',
    abilityEn: 'Assault mode mobile fire with A-36 bounce grenade, Tank mode minigun pressure and Artillery fixed triple shells'
  },
  // 卡西迪
  cassidy: {
    abilityZh: '维和者左轮高爆发并用战术翻滚减伤装填，磁性手雷粘附追击',
    abilityEn: 'Peacekeeper revolver burst with Combat Roll damage reduction reload and Magnetic Grenade stick pursuit'
  },
  // 回声
  echo: {
    abilityZh: '飞行追击并用粘弹爆发同时复制大招',
    abilityEn: 'Flight pursuit with sticky bomb burst and Duplicate ult'
  },
  // 芙蕾雅
  freja: {
    abilityZh: '速射弩消耗并用瞄准射击爆炸弩箭，疾冲刷新瞄准，上升气流滞空，流星索束缚拖拽',
    abilityEn: 'Auto crossbow chip with Aim Shot explosive bolt, Dash refresh, Updraft airtime and Tether Snare drag'
  },
  // 源氏
  genji: {
  abilityZh: '高机动骚扰并反弹大部分投射物，但光束型、无需瞄准的持续伤害（如Winston电、莫伊拉锁定、秩序之光光束）、能量线以及Sigma石头等硬控无法反弹',
  abilityEn: 'High mobility harass while reflecting most projectiles, but cannot reflect beams, auto-locking/continuous no-aim damage (e.g. Winston Tesla, Moira grasp, Symmetra beam), energy lines, or hard CC like Sigma Accretion'
},
  // 半藏
  hanzo: {
    abilityZh: '远程秒杀能力并用声呐探敌释放龙击',
    abilityEn: 'One-shot potential with Sonic Arrow reveals and Dragonstrike'
  },
  // 狂鼠
  junkrat: {
    abilityZh: '炸弹消耗屏障并用地雷加轮胎进行陷阱控制',
    abilityEn: 'Bombs break barriers with mine plus tire for trap control'
  },
  // 美
  mei: {
    abilityZh: '冰冻减速并用自愈加冰冻分割战场',
    abilityEn: 'Freeze slows with self-heal plus cryo to split fights'
  },
  // 法老之鹰
  pharah: {
    abilityZh: '空中输出并用火箭跳加悬停让近战英雄无法触及',
    abilityEn: 'Aerial attacks with hover plus jump jet to stay out of melee range'
  },
  // 死神
  reaper: {
    abilityZh: '近距离高伤害并用影步加大招进行幽灵形态逃脱',
    abilityEn: 'Close-range devastation with teleport plus ult for Wraith escapes'
  },
  // 索杰恩
  sojourn: {
    abilityZh: '高机动远程输出并用滑铲加轨道炮实现蓄能秒杀',
    abilityEn: 'Mobile hitscan with slide plus rail for one-shots'
  },
  // 士兵:76
  soldier76: {
    abilityZh: '稳定远程输出并用自愈加冲刺发射螺旋飞弹',
    abilityEn: 'Consistent hitscan with self-heal plus sprint and Helix burst'
  },
  // 黑影（支援）
  sombra: {
    abilityZh: '电磁脉冲按比例削血并摧毁屏障，赛博空间削弱敌人治疗盟友，在线修复治疗队友并侵入急救包与敌方部署物',
    abilityEn: 'EMP proportional damage destroying barriers, Cyberspace weakens enemies and heals allies, Online Repair heals and hacks packs and enemy deployables'
  },
  // 秩序之光
  symmetra: {
    abilityZh: '光束蓄能穿透并用炮塔骚扰而激光束无法被反弹',
    abilityEn: 'Beam charges through with turret harassment while the beam cannot be deflected'
  },
  // 托比昂
  torbjorn: {
    abilityZh: '炮塔自动瞄准并用升级炮塔实现过载增强',
    abilityEn: 'Auto-aim turret with turret upgrade for overcharge boost'
  },
  // 猎空
  tracer: {
    abilityZh: '闪烁骚扰并用回溯逃脱同时释放脉冲炸弹',
    abilityEn: 'Blink harass with Recall escape and pulse bomb'
  },
  // 探奇
  venture: {
    abilityZh: '钻地突袭并用钻头连招实现高机动近战',
    abilityEn: 'Burrow ambush with drill combos for mobile melee'
  },
  // 黑百合
  widowmaker: {
    abilityZh: '狙击远距离秒杀并用抓钩占高台，剧毒诡雷控区，红外侦测为队友提供情报',
    abilityEn: 'Long-range sniper one-shots with Grapple for high ground, Venom Mine area denial and Infra-Sight team intel'
  },
  // 斩仇
  vendetta: {
    abilityZh: '光束巨剑连击爆发并用招架姿态格挡减伤，旋风疾步切入，斩地巨剑击破防御',
    abilityEn: 'Beam greatsword combo burst with Parry Stance damage reduction, Whirl Sprint dive and Earthsplitter armor-breaking slash'
  },
  // 安燃
  anran: {
    abilityZh: '朱雀扇点燃敌人并用煽火风强化燃烧，熠闪舞无敌闪避反击，朱羽焚冲锋点燃，朱魂返阵亡复生',
    abilityEn: 'Vermilion Fan ignites with Fan the Flames burn amp, Shimmer Dance invulnerable dodge counter, Vermilion Burst dash ignite and death-rebirth passive'
  },
  // 埃姆雷
  emrey: {
    abilityZh: "合成步枪三连发并用开镜精准射击，虹吸冲击枪生命汲取提速，覆盖协议变为人形兵器",
    abilityEn: "Burst rifle with scoped precision, Siphon Blaster life drain speed boost and Overwrite Protocol transformation"
  },
  // 希拉
  sierra: {
    abilityZh: "螺旋步枪持续开火精度提高并用追踪弹自动锁定，震地手雷冲击波，锚点无人机高机动转移",
    abilityEn: "Rifle accuracy rises while firing with Tracer Rounds auto-tracking, Tremor Grenade shockwave and Anchor Drone mobility"
  },
  // 死怨
  shion: {
    abilityZh: '牙罗双枪速射并用交叉枪决X形齐射近距离爆发，机动闪避疾冲获得过量生命，纵情狂飙发射摩托切入后排',
    abilityEn: 'Twin spirit pistols rapid fire with Crossfire X-spread close-range burst, Evade dash overhealth and Joyride launched motorcycle backline dive'
  },
  // 支援
  // 安娜
  ana: {
    abilityZh: '麻醉镖让敌人入眠并用生物手雷禁疗增疗，纳米激素强化队友，开镜远距狙击',
    abilityEn: 'Sleep Dart puts enemies to sleep with Biotic Grenade anti-heal, Nano Boost ally amp and scoped long-range rifle'
  },
  // 巴蒂斯特
  baptiste: {
    abilityZh: '维生力场防止队友死亡并用增幅矩阵翻倍治疗伤害，动力战靴高跳占高台',
    abilityEn: 'Immortality Field prevents deaths with Amplification Matrix doubling damage and healing, plus Exo Boots high ground'
  },
  // 布丽吉塔
  brigitte: {
    abilityZh: '火箭连枷近战并用屏障护盾格挡，能量盾击击退打断，恢复包持续治疗',
    abilityEn: 'Rocket Flail melee with Barrier shield block, Shield Bash knockback interrupt and Repair Pack sustain'
  },
  // 伊拉锐
  illari: {
    abilityZh: '阳焰步枪充能射击并用治疗光塔持续治疗，烈日冲击弹射击退敌人，桎梏灼日减速引爆',
    abilityEn: 'Solar Rifle charged shots with Healing Pylon sustain, Outburst knockback and Captive Sun slow-then-detonate'
  },
  // 朱诺
  juno: {
    abilityZh: '医疗冲击枪治疗输出并用超能环域提速，脉冲星飞雷追踪治疗，轨道射线增伤',
    abilityEn: 'Medi-blaster heal and damage with Hyper Ring speed, Pulsar Torpedo tracking heal and Orbital Ray damage amp'
  },
  // 雾子
  kiriko: {
    abilityZh: '铃净化负面效果并短暂无敌，瞬瞬移脱身，狐强化团队移速攻速冷却',
    abilityEn: 'Suzu cleanses with brief invulnerability, Swift Step teleport escapes and Kitsune Rush team speed and cooldown buff'
  },
  // 生命之梭
  lifeweaver: {
    abilityZh: '愈疗灵花充能治疗并用花瓣平台托举占位，生命之握拉回队友，生命之树持续治疗',
    abilityEn: 'Healing Blossom charge heal with Petal Platform lift, Life Grip pulls allies to safety and Tree of Life sustain'
  },
  // 卢西奥
  lucio: {
    abilityZh: '速度光环并用墙壁滑行实现击退推人',
    abilityEn: 'Speed boost with wall ride for boop knockback'
  },
  // 天使
  mercy: {
    abilityZh: '守护天使逃脱并用滑翔加复活救队友',
    abilityEn: 'Guardian Angel escapes with glide plus res for resurrect'
  },
  // 莫伊拉
  moira: {
    abilityZh: '锁定光束无需瞄准并用消散逃脱而激光束无法被反弹',
    abilityEn: 'Lock-on beam with Fade escapes while the beam cannot be deflected'
  },
  // 禅雅塔
  zenyatta: {
    abilityZh: '不和之珠增伤并用调和珠加球体保持高输出',
    abilityEn: 'Discord Orb amplifies damage with harmony plus orbs for high DPS'
  },
  // 无漾
  wuyang: {
    abilityZh: '玄武杖水珠可控轨迹并用翻江浪击退增疗，惊涛破保护盟友击倒敌人，飞流步提速',
    abilityEn: 'Controllable water orb with Rising Wave knockback and heal amp, Tidal Blast ally protect knockdown and Wave Step mobility'
  },
  // 飞天猫
  feitianmao: {
    abilityZh: "中距扩散子弹治疗输出并用咻咻飞加速飞行，救生索拖拽治疗盟友，呼噜噜脉冲治疗击退，猫猫劫击倒拴锁敌人",
    abilityEn: "Mid-range spread shots heal and damage with Boost flight speed, Lifeline drag-heal allies, Purr pulse heal knockback and Pounce ground slam tether"
  },
  // 瑞稀
  mizuki: {
    abilityZh: "御魂镰刃飞旋消耗并用缚魂锁链限制敌人，护魂结界吸收射弹，替魂纸人瞬移脱身",
    abilityEn: "Spinning scythe blade chip with Soul Binding Chain root, Spirit Ward barrier absorbing projectiles and Paper Doll teleport escape"
  },
  // 血律
  doctrine: {
    abilityZh: '永生权杖中距离治疗输出，灌注强化迅影疾行获得自由飞行，焕生无人机展开屏障辅助，救赎恩典无人机群削减敌方最大生命值并为盟友提供过量生命',
    abilityEn: 'Immortal Scepter mid-range heal/damage, Empower grants Infused Swift Dash free flight, Vitalizing Drone deploys barrier support, ult drone swarm reduces enemy max HP and overheals allies'
  },
};

// 被克制英雄的弱点描述（已优化融合所有括号内容，更自然流畅）
export const heroWeaknesses: Record<HeroId, WeaknessData> = {
  // 坦克
  // D.Va
  dva: {
    weaknessZh: '机甲体积巨大易被集火同时惧怕黑客禁用防御矩阵或EMP',
    weaknessEn: 'Large mech hitbox easy to target while fearing Sombra hack disabling Defense Matrix or EMP'
  },
  // 末日铁拳
  doomfist: {
    weaknessZh: '技能CD长被限制后无力同时火箭重拳易被闪避或控制打断',
    weaknessEn: 'Long cooldowns making him weak when disabled while Rocket Punch is easily dodged or interrupted'
  },
  // 骇灾
  hazard: {
    weaknessZh: '机动性有限易被远程压制，尖刺技能多依赖近距离命中易被风筝消耗',
    weaknessEn: 'Limited mobility making him vulnerable to range while spike abilities rely on close range and are easily kited'
  },
  // 渣客女王
  junker_queen: {
    weaknessZh: '需要近战输出易被远程风筝同时抗治疗易被生化手雷或铃铛反制',
    weaknessEn: 'Needs close range making her easily kited while anti-heal is countered by anti-nade or Suzu'
  },
  // 毛加
  mauga: {
    weaknessZh: '体型巨大易中弹同时惧怕高机动英雄风筝或蓄能秒杀',
    weaknessEn: 'Huge hitbox easy to hit while fearing high mobility kiting or railgun one-shots'
  },
  // 奥丽莎
  orisa: {
    weaknessZh: '机动性差侧翼易被突同时坚毅形态后仍可被睡眠针或石化控制',
    weaknessEn: 'Low mobility making flanks vulnerable while Fortify is still CCable by Sleep Dart or Accretion'
  },
  // 拉玛刹
  ramattra: {
    weaknessZh: '涅槃形态无护盾同时近战输出时易被风筝或远程点射',
    weaknessEn: 'No barrier in Nemesis form while easily kited or hitscanned in melee'
  },
  // 莱因哈特
  reinhardt: {
    weaknessZh: '盾被破后脆弱同时惧怕堡垒架枪形态或托比昂炮塔持续破坏',
    weaknessEn: 'Vulnerable when shield broken while fearing Bastion turret or Torbjorn turret melting shield'
  },
  // 路霸
  roadhog: {
    weaknessZh: '体型大容易上大招，链钩被闪避后只能依赖废品压缩器自保，惧怕源氏反弹钩子',
    weaknessEn: 'Big hitbox charges enemy ults, weak when hook dodged and relying on Scrap Compactor, fearing Genji deflecting hook'
  },
  // 西格玛
  sigma: {
    weaknessZh: '近战被贴脸同时动能护甲对近战与激光束无效',
    weaknessEn: 'Weak to close-range pressure while Kinetic Grasp is ineffective vs melee and beams'
  },
  // 温斯顿
  winston: {
    weaknessZh: '伤害偏低抗压差同时惧怕堡垒架枪形态极高DPS或托比昂炮塔',
    weaknessEn: 'Low damage with poor sustain while fearing Bastion turret extreme DPS or Torbjorn turrets'
  },
  // 破坏球
  wrecking_ball: {
    weaknessZh: '易被控制打断同时地雷易被清除或黑客禁用',
    weaknessEn: 'Easily CC\'d out of momentum while mines are easily destroyed or hacked'
  },
  // 查莉娅
  zarya: {
    weaknessZh: "低能量时输出低同时护盾被骗则无力惧怕黑影EMP清空能量",
    weaknessEn: "Low damage at low charge while bubbles baited make her weak and fearing Sombra EMP clearing charge"
  },
  // 金驭
  domina: {
    weaknessZh: "技能冷却长被限制后无力，惧怕高机动突脸和控制技能",
    weaknessEn: "Long skill cooldowns making her weak when disabled, fearing high mobility dive and CC"
  },
  // D.mon
  dmon: {
    weaknessZh: "护甲被穿透后生存能力骤降，惧怕禁疗与远程风筝",
    weaknessEn: "Survival drops sharply when armor is pierced, fearing anti-heal and long-range kiting"
  },
  // 输出
  // 艾什
  ashe: {
    weaknessZh: '被突脸后难以自保同时惧怕源氏高机动骚扰或黑影隐身偷袭',
    weaknessEn: 'Weak to dive with poor self-peel while fearing Genji high mobility harass or Sombra ambush'
  },
  // 堡垒
  bastion: {
    weaknessZh: '架枪时完全静止同时惧怕黑影黑客禁用或路霸钩子拉走',
    weaknessEn: 'Stationary in turret mode while fearing Sombra hack or Roadhog hook'
  },
  // 卡西迪
  cassidy: {
    weaknessZh: '机动差远程被压同时磁力手雷CD后脆弱惧怕梅冰墙分割',
    weaknessEn: 'Low mobility losing to range while vulnerable after Magnetic Grenade CD and fearing Mei Ice Wall'
  },
  // 回声
  echo: {
    weaknessZh: '飞行时易被射同时惧怕寡妇狙击或士兵76螺旋飞弹',
    weaknessEn: 'Vulnerable while flying while fearing Widowmaker snipes or Soldier Helix Rockets'
  },
  // 芙蕾雅
  freja: {
    weaknessZh: '弩箭可被源氏反弹同时滞空时被长枪点射',
    weaknessEn: 'Arrows deflectable by Genji while vulnerable to hitscan when airborne'
  },
  // 源氏
  genji: {
  weaknessZh: '惧怕光束型武器（如Winston电击、秩序之光、莫伊拉锁定光束、扎莉亚能量束）这些无需瞄准且无法反弹的持续伤害，同时近战被硬控（如Sigma石头、梅冰冻）或集火时极易阵亡',
  weaknessEn: 'Fears beam weapons (Winston Tesla, Symmetra, Moira lock-on, Zarya beam) that require no aim and cannot be deflected, while vulnerable to hard CC in close range (Sigma rock, Mei freeze) or focused fire leading to quick death'
},
  // 半藏
  hanzo: {
    weaknessZh: '被近身后无力同时惧怕梅冰墙分割战场或路霸钩子拉近',
    weaknessEn: 'Weak at close range while fearing Mei Ice Wall or Roadhog hook'
  },
  // 狂鼠
  junkrat: {
    weaknessZh: '空中目标难打同时惧怕法老之鹰空中输出或源氏飞行追击',
    weaknessEn: 'Can\'t hit aerial targets while fearing Pharah aerial attacks or Echo flight pursuit'
  },
  // 美
  mei: {
    weaknessZh: '远程被风筝同时惧怕法老之鹰等空中英雄冰冻对飞行单位效果差',
    weaknessEn: 'Kited by long range while fearing Pharah aerial heroes and freeze less effective on flyers'
  },
  // 法老之鹰
  pharah: {
    weaknessZh: '被强力点射秒杀同时惧怕寡妇狙击士兵76索杰恩等点射英雄',
    weaknessEn: 'Countered by hitscan while fearing Widowmaker Soldier 76 Sojourn hitscan heroes'
  },
  // 死神
  reaper: {
    weaknessZh: '远程无法触及同时惧怕法老之鹰空中输出或远程风筝幽灵形态CD后脆弱',
    weaknessEn: 'Can\'t reach long range while fearing Pharah aerial or range kiting and vulnerable when Wraith on CD'
  },
  // 索杰恩
  sojourn: {
    weaknessZh: '被近身突脸同时蓄能秒杀易被控制打断惧怕源氏反弹轨道炮',
    weaknessEn: 'Vulnerable to dive while railgun one-shots are interrupted by CC and fearing Genji deflecting rail'
  },
  // 士兵:76
  soldier76: {
    weaknessZh: '被控制后无力同时惧怕黑影黑客禁用螺旋飞弹或源氏反弹',
    weaknessEn: 'Weak when CC\'d while fearing Sombra hack disabling Helix or Genji deflect'
  },
  // 黑影（支援）
  sombra: {
    weaknessZh: '血量低依赖位移传动隐身脱身，赛博空间与在线修复冷却期间脆弱惧怕集火',
    weaknessEn: 'Low HP relying on Translocator invisibility to escape, fragile during Cyberspace and Online Repair cooldowns when focused'
  },
  // 秩序之光
  symmetra: {
    weaknessZh: '蓄能慢远程被压同时光束虽无法被反弹但自身机动性差',
    weaknessEn: 'Slow charge-up weak to range while beam cannot be deflected but low mobility'
  },
  // 托比昂
  torbjorn: {
    weaknessZh: '炮塔被快速摧毁同时惧怕源氏反弹或黑影黑客直接拆塔',
    weaknessEn: 'Turret destroyed quickly while fearing Genji deflect or Sombra hack destroying turret'
  },
  // 猎空
  tracer: {
    weaknessZh: '血量极低同时惧怕卡西迪磁力手雷粘附或梅冰冻减速易被单发秒杀',
    weaknessEn: 'Extremely low HP while fearing Cassidy Magnetic Grenade stick or Mei freeze slow and easy one-shot'
  },
  // 探奇
  venture: {
    weaknessZh: '被远程风筝同时钻地时易被控制打断',
    weaknessEn: 'Kited by range while burrow is easily interrupted by CC'
  },
  // 黑百合
  widowmaker: {
    weaknessZh: '被突脸后无力同时惧怕源氏高机动或黑影隐身偷袭',
    weaknessEn: 'Weak when dived while fearing Genji high mobility or Sombra stealth ambush'
  },
  // 斩仇
  vendetta: {
    weaknessZh: '纯近战无远程飞行单位天敌同时冲深被集火',
    weaknessEn: 'Pure melee no range countered by flyers while vulnerable when overextended'
  },
  // 埃姆雷
  emrey: {
    weaknessZh: "缺乏位移自保同时惧怕刺客突脸强控和长枪",
    weaknessEn: "No mobility while vulnerable to assassins CC and long-range"
  },
  // 希拉
  sierra: {
    weaknessZh: "被近距离突脸时无力，同时惧怕高机动英雄和持续控制技能",
    weaknessEn: "Weak when dived at close range, fearing high mobility heroes and continuous CC"
  },
  // 死怨
  shion: {
    weaknessZh: '左键伤害偏软且远程无力同时闪避临时生命值光速消失、摩托车可被睡针或冲锋等硬控打断、250血无甲无自保技能易被集火秒杀',
    weaknessEn: 'Left-click damage is weak and no ranged threat while Evade temp HP decays instantly, motorcycle can be interrupted by Sleep Dart or Charge etc, 250HP no armor no self-peel making her easy to focus down'
  },
  // 支援
  // 安娜
  ana: {
    weaknessZh: '无位移技能同时惧怕源氏或黑影突脸睡眠针CD后无力',
    weaknessEn: 'No mobility abilities while fearing Genji or Sombra dive and weak after Sleep Dart CD'
  },
  // 巴蒂斯特
  baptiste: {
    weaknessZh: '被突脸消耗同时不死力场易被黑客或EMP破坏',
    weaknessEn: 'Weak to sustained dive while Immortality Field is easily hacked or EMP\'d'
  },
  // 布丽吉塔
  brigitte: {
    weaknessZh: '近战英雄远程被打同时惧怕法老之鹰或索杰恩空中远程压制',
    weaknessEn: 'Melee hero weak to range while fearing Pharah or Sojourn aerial range pressure'
  },
  // 伊拉锐
  illari: {
    weaknessZh: '被近身后塔被毁同时太阳光线易被闪避或源氏反弹',
    weaknessEn: 'Pylon destroyed when dived while Solar Rifle is easily dodged or deflected by Genji'
  },
  // 朱诺
  juno: {
    weaknessZh: '被突脸难以逃脱同时环形轨道能力CD后脆弱',
    weaknessEn: 'Weak when focused while orbital abilities are vulnerable on CD'
  },
  // 雾子
  kiriko: {
    weaknessZh: '被集火时难以同时奶和逃脱同时铃铛净化有CD限制',
    weaknessEn: 'Hard to heal and escape when focused while Suzu has cooldown limit'
  },
  // 生命之梭
  lifeweaver: {
    weaknessZh: '输出能力较弱同时生命之握易被打断或黑客禁用',
    weaknessEn: 'Weak offensive output while Life Grip is easily interrupted or hacked'
  },
  // 卢西奥
  lucio: {
    weaknessZh: '单目标治疗弱同时惧怕黑客禁用速度光环或源氏光束穿透',
    weaknessEn: 'Poor single-target healing while fearing hack disabling speed aura or Symmetra beam'
  },
  // 天使
  mercy: {
    weaknessZh: '自保能力最弱同时惧怕黑影隐身偷袭或源氏突脸复活时无法移动',
    weaknessEn: 'Weakest self-sustain while fearing Sombra stealth ambush or Genji dive and stationary during Resurrect'
  },
  // 莫伊拉
  moira: {
    weaknessZh: '消散CD后脆弱同时锁定光束虽无法被反弹但易被集火风筝',
    weaknessEn: 'Vulnerable when Fade on CD while lock-on beam cannot be deflected but easily kited when focused'
  },
  // 安燃
  anran: {
    weaknessZh: '手短缺乏远程同时惧怕冰冻风筝禁疗和强盾拦截',
    weaknessEn: 'Short range while vulnerable to freeze kiting anti-heal and shields'
  },
  // 禅雅塔
  zenyatta: {
    weaknessZh: '血量极低无自保同时惧怕源氏突脸或黑影黑客禁用不和之珠',
    weaknessEn: 'Extremely low HP no self-peel while fearing Genji dive or Sombra hack disabling Discord Orb'
  },
  // 无漾
  wuyang: {
    weaknessZh: "依赖技能生存同时惧怕黑客突脸和穿透伤害",
    weaknessEn: "Skill-dependent survival while vulnerable to hack dive and penetration"
  },
  // 瑞稀
  mizuki: {
    weaknessZh: "机动性差无爬墙同时惧怕高台长枪和光束穿透",
    weaknessEn: "Low mobility no wall climb while vulnerable to high ground and beams"
  },
  // 飞天猫
  feitianmao: {
    weaknessZh: '飞行速度慢血低同时惧怕即时命中EMP和空对空',
    weaknessEn: 'Slow flight low HP while vulnerable to hitscan EMP and aerial combat'
  },
  // 血律
  doctrine: {
    weaknessZh: '中距离手短惧怕长枪狙击，依赖迅影疾行位移与被动回血生存，被禁疗冰冻后脆弱，救赎恩典需无人机群命中才生效',
    weaknessEn: 'Mid-range scepter weak to snipers while survival depends on Swift Dash and regen passive, fragile when anti-healed or frozen, ult requires drone swarm contact'
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

export function getCounterReason(sourceId: HeroId, targetId: HeroId, language: SupportedLanguage): string {
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