// 最佳拍档理由数据 - 详细的、英雄特定的配合描述
// 技能名称已根据官方技能数据（heroSkills.ts，来源 ow.blizzard.cn）优化对齐
import type { CounterLanguage } from './counterReasons';
import type { HeroId } from './heroData';

// 拍档原因数据 - key 为 "source-target" 格式
export interface SynergyReasonData {
  reasonZh: string;
  reasonEn: string;
}

// 最佳拍档理由数据 - 详细且符合每个英雄特点的描述
// 格式: "拍档英雄ID-被配对英雄ID"
export const synergyReasons: Record<string, SynergyReasonData> = {
  // ========== Tank heroes 最佳拍档理由 ==========
  // D.Va 的最佳拍档
  // 雾子 → D.Va
  'kiriko-dva': {
    reasonZh: '雾子铃净化无敌并瞬瞬移跟随治疗，让D.Va放心推进器冲锋切入',
    reasonEn: 'Kiriko\'s healing and teleport allow D.Va to push confidently'
  },
  // 禅雅塔 → D.Va
  'zenyatta-dva': {
    reasonZh: '禅雅塔乱法球增伤，让D.Va防御矩阵掩护后的集火更致命',
    reasonEn: 'Zenyatta\'s Harmony orb boosts D.Va\'s matrix pressure'
  },
  // 索杰恩 → D.Va
  'sojourn-dva': {
    reasonZh: 'D.Va推进器开团配合索杰恩电磁炮蓄能穿透一击，快速集火秒杀',
    reasonEn: 'D.Va\'s mobility pairs with Sojourn\'s railgun for quick picks'
  },
  // 巴蒂斯特 → D.Va
  'baptiste-dva': {
    reasonZh: '巴蒂斯特愈合冲击群体治疗，维生力场让D.Va深入敌阵也能持续作战',
    reasonEn: 'Baptiste\'s AOE healing and immortality protect D.Va\'s sustained fight'
  },
  // 源氏 → D.Va
  'genji-dva': {
    reasonZh: 'D.Va防御矩阵掩护源氏闪格挡切入，双高机动形成交叉火力',
    reasonEn: 'D.Va matrix protects Genji, both highly mobile create crossfire'
  },
  // 猎空 → D.Va
  'tracer-dva': {
    reasonZh: 'D.Va防御矩阵掩护猎空闪现切入，快速建立人数优势',
    reasonEn: 'D.Va matrix protects Tracer dives for quick number advantage'
  },
  // 回声 → D.Va
  'echo-dva': {
    reasonZh: 'D.Va防御矩阵掩护回声飞行与黏性炸弹贴附时的脆弱期',
    reasonEn: 'D.Va\'s matrix protects Echo while flying'
  },

  // 末日铁拳的最佳拍档
  // 雾子 → 末日铁拳
  'kiriko-doomfist': {
    reasonZh: '雾子铃让铁拳火箭重拳突进后免被控秒，容错率极高',
    reasonEn: 'Kiriko\'s Suzu protects Doomfist after diving in'
  },
  // 查莉娅 → 末日铁拳
  'zarya-doomfist': {
    reasonZh: '查莉娅重力喷涌聚拢敌人，铁拳火箭重拳击墙打出完美连招',
    reasonEn: 'Graviton Surge + Rocket Punch creates guaranteed kills'
  },
  // 死神 → 末日铁拳
  'reaper-doomfist': {
    reasonZh: '两者都是近战高爆发，铁拳先手控住，死神瞬间补足伤害',
    reasonEn: 'Both melee burst - Fist sets up, Reaper finishes'
  },
  // 安娜 → 末日铁拳
  'ana-doomfist': {
    reasonZh: '安娜的纳米激素能增强铁拳的伤害，大招配合击杀效率极高',
    reasonEn: 'Ana\'s Nano boosts Doomfist\'s damage for lethal combos'
  },
  // 源氏 → 末日铁拳
  'genji-doomfist': {
    reasonZh: '源氏和铁拳都是高机动近战，能快速切入秒杀',
    reasonEn: 'Both highly mobile melees - quick dive kills'
  },
  // 巴蒂斯特 → 末日铁拳
  'baptiste-doomfist': {
    reasonZh: '巴蒂斯特维生力场保护铁拳入场后的生存',
    reasonEn: 'Baptiste\'s immortality protects Doomfist after engaging'
  },

  // 骇灾的最佳拍档
  // 雾子 → 骇灾
  'kiriko-hazard': {
    reasonZh: '雾子铃与瞬保障骇灾狂跃切入后的持续作战能力',
    reasonEn: 'Kiriko enables Hazard\'s sustained front-line pressure'
  },
  // 卡西迪 → 骇灾
  'cassidy-hazard': {
    reasonZh: '卡西迪维和者中距离输出与骇灾尖刺墙击退封锁形成交叉火力',
    reasonEn: 'Cassidy\'s mid-range pressure complements Hazard\'s zone control'
  },
  // 艾什 → 骇灾
  'ashe-hazard': {
    reasonZh: '艾什的狙击和视野优势能帮助骇灾发现侧面切入的敌人',
    reasonEn: 'Ashe\'s long-range vision helps Hazard track flankers'
  },
  // 源氏 → 骇灾
  'genji-hazard': {
    reasonZh: '源氏影冲刺配合骇灾千针雨定身，快速建立优势',
    reasonEn: 'Genji\'s mobility pairs well with Hazard\'s control'
  },

  // 渣客女王的最佳拍档
  // 雾子 → 渣客女王
  'kiriko-junker_queen': {
    reasonZh: '雾子的免死是近战坦克的标配，防止被集火秒杀',
    reasonEn: 'Kiriko\'s Suzu is essential for melee tanks like Junker Queen'
  },
  // 艾什 → 渣客女王
  'ashe-junker_queen': {
    reasonZh: '艾什延时雷管引燃配合女王轰翻天禁疗冲锋，大招联动效果极佳',
    reasonEn: 'Ashe\'s dynamite + Junker Queen\'s shout creates combo potential'
  },
  // 卡西迪 → 渣客女王
  'cassidy-junker_queen': {
    reasonZh: '卡西迪磁性手雷留住敌人，为女王锯齿利刃与血斩近战创造机会',
    reasonEn: 'Cassidy\'s grenade sets up Junker Queen\'s melee damage'
  },
  // 查莉娅 → 渣客女王
  'zarya-junker_queen': {
    reasonZh: '查莉娅的能量配合女王的冲锋能快速击杀',
    reasonEn: 'Zarya\'s energy + Junker Queen\'s charge = quick kills'
  },
  // 死神 → 渣客女王
  'reaper-junker_queen': {
    reasonZh: '死神配合女王的近战能快速建立优势',
    reasonEn: 'Reaper pairs well with Junker Queen\'s melee aggression'
  },

  // 毛加的最佳拍档
  // 雾子 → 毛加
  'kiriko-mauga': {
    reasonZh: '毛加需要持续治疗来维持高输出，雾子是最好的选择',
    reasonEn: 'Mauga needs sustained healing to maintain high DPS - Kiriko excels'
  },
  // 巴蒂斯特 → 毛加
  'baptiste-mauga': {
    reasonZh: '巴蒂斯特愈合冲击群体治疗，维生力场契合毛加心脏过载的团队回复',
    reasonEn: 'Baptiste\'s AOE healing matches Mauga\'s area damage'
  },
  // 卡西迪 → 毛加
  'cassidy-mauga': {
    reasonZh: '卡西迪的远程支援能补充毛加的中距离输出空缺',
    reasonEn: 'Cassidy fills Mauga\'s mid-range gap with reliable damage'
  },
  // 查莉娅 → 毛加
  'zarya-mauga': {
    reasonZh: '查莉娅的护盾保护毛加的持续输出',
    reasonEn: 'Zarya\'s bubble protects Mauga\'s sustained damage'
  },
  // 死神 → 毛加
  'reaper-mauga': {
    reasonZh: '死神配合毛加的高输出能快速击杀',
    reasonEn: 'Reaper pairs well with Mauga\'s high damage output'
  },

  // 奥丽莎的最佳拍档
  // 雾子 → 奥丽莎
  'kiriko-orisa': {
    reasonZh: '奥丽莎定点输出时需要位移治疗保障，雾子瞬完美适配',
    reasonEn: 'Kiriko\'s mobility supports Orisa\'s stationary playstyle'
  },
  // 禅雅塔 → 奥丽莎
  'zenyatta-orisa': {
    reasonZh: '禅雅塔乱法球增伤让奥丽莎能量标枪连招更具威胁',
    reasonEn: 'Zenyatta\'s damage boost makes Orisa\'s damage more threatening'
  },
  // 狂鼠 → 奥丽莎
  'junkrat-orisa': {
    reasonZh: '狂鼠的范围伤害配合奥丽莎的定点控制，形成封锁阵线',
    reasonEn: 'Junkrat\'s area denial + Orisa\'s hold creates defensive line'
  },
  // 西格玛 → 奥丽莎
  'sigma-orisa': {
    reasonZh: '西格玛实验屏障配合奥丽莎标枪旋击形成双盾防线',
    reasonEn: 'Sigma\'s shield + Orisa\'s control = solid defense'
  },
  // 巴蒂斯特 → 奥丽莎
  'baptiste-orisa': {
    reasonZh: '巴蒂斯特维生力场保护奥丽莎撼地猛刺的架位',
    reasonEn: 'Baptiste\'s immortality protects Orisa\'s set-up position'
  },
  // 半藏 → 奥丽莎
  'hanzo-orisa': {
    reasonZh: '半藏音箭显示敌人位置，帮助奥丽莎锁定远处目标',
    reasonEn: 'Hanzo\'s sonar helps Orisa spot distant targets'
  },

  // 拉玛刹的最佳拍档
  // 雾子 → 拉玛刹
  'kiriko-ramattra': {
    reasonZh: '拉玛刹诛天罚形态近战时需要快速治疗，雾子铃与瞬及时支援',
    reasonEn: 'Kiriko provides quick healing during Ramattra\'s Nemesis form'
  },
  // 禅雅塔 → 拉玛刹
  'zenyatta-ramattra': {
    reasonZh: '禅雅塔乱法球增伤让拉玛刹猛拳贯穿波AOE伤害更致命',
    reasonEn: 'Zenyatta\'s boost makes Ramattra\'s AOE damage lethal'
  },
  // 半藏 → 拉玛刹
  'hanzo-ramattra': {
    reasonZh: '半藏音箭帮助拉玛刹发现远处的威胁',
    reasonEn: 'Hanzo\'s sonar arrow helps Ramattra spot distant threats'
  },
  // 查莉娅 → 拉玛刹
  'zarya-ramattra': {
    reasonZh: '查莉娅配合拉玛刹形成强力前排',
    reasonEn: 'Zarya pairs well with Ramattra for strong frontline'
  },

  // 莱因哈特的最佳拍档
  // 查莉娅 → 莱因哈特
  'zarya-reinhardt': {
    reasonZh: '查莉娅重力喷涌聚敌，大锤冲锋接高能量粒子炮能秒人',
    reasonEn: 'High-energy Zarya + Reinhardt charge = guaranteed eliminations'
  },
  // 雾子 → 莱因哈特
  'kiriko-reinhardt': {
    reasonZh: '雾子铃保护冲锋后的大锤不被集火秒杀',
    reasonEn: 'Kiriko\'s Suzu protects Reinhardt after charging in'
  },
  // 巴蒂斯特 → 莱因哈特
  'baptiste-reinhardt': {
    reasonZh: '巴蒂斯特增幅矩阵掩护大锤冲锋后的火力真空',
    reasonEn: 'Baptiste\'s matrix protects Reinhardt during charges'
  },
  // 布丽吉塔 → 莱因哈特
  'brigitte-reinhardt': {
    reasonZh: '布丽吉塔能量盾击击退配合大锤冲锋，打出完美连招',
    reasonEn: 'Brigitte\'s stun + Reinhardt charge = perfect combo'
  },
  // 死神 → 莱因哈特
  'reaper-reinhardt': {
    reasonZh: '死神配合大锤冲锋能快速击杀',
    reasonEn: 'Reaper follows Reinhardt charge for quick kills'
  },

  // 路霸的最佳拍档
  // 雾子 → 路霸
  'kiriko-roadhog': {
    reasonZh: '路霸的钩子需要治疗保障才有信心持续先手',
    reasonEn: 'Kiriko enables Roadhog\'s aggressive hook plays'
  },
  // 狂鼠 → 路霸
  'junkrat-roadhog': {
    reasonZh: '狂鼠的地雷配合路霸的钩子，能打出意想不到的连招',
    reasonEn: 'Junkrat\'s mines + Roadhog\'s hook creates unexpected combos'
  },
  // 卡西迪 → 路霸
  'cassidy-roadhog': {
    reasonZh: '卡西迪磁性手雷黏住被链钩拉中的敌人',
    reasonEn: 'Cassidy\'s grenade secures Roadhog\'s hook targets'
  },
  // 查莉娅 → 路霸
  'zarya-roadhog': {
    reasonZh: '查莉娅粒子屏障保护路霸链钩先手',
    reasonEn: 'Zarya\'s bubble protects Roadhog\'s hook plays'
  },

  // 西格玛的最佳拍档
  // 雾子 → 西格玛
  'kiriko-sigma': {
    reasonZh: '西格玛需要位移来调整位置，雾子提供灵活支援',
    reasonEn: 'Kiriko enables Sigma\'s repositioning playstyle'
  },
  // 禅雅塔 → 西格玛
  'zenyatta-sigma': {
    reasonZh: '禅雅塔乱法球增伤让西格玛超能之球更具威胁',
    reasonEn: 'Zenyatta\'s boost makes Sigma\'s damage more threatening'
  },
  // 卡西迪 → 西格玛
  'cassidy-sigma': {
    reasonZh: '卡西迪的中距离输出弥补西格玛的输出空窗期',
    reasonEn: 'Cassidy covers Sigma\'s damage gaps at mid-range'
  },
  // 巴蒂斯特 → 西格玛
  'baptiste-sigma': {
    reasonZh: '巴蒂斯特维生力场保护西格玛的输出位置',
    reasonEn: 'Baptiste\'s immortality protects Sigma\'s positioning'
  },
  // 堡垒 → 西格玛
  'bastion-sigma': {
    reasonZh: '西格玛实验屏障保护火炮模式的堡垒',
    reasonEn: 'Sigma\'s shield protects stationary Bastion'
  },

  // 温斯顿的最佳拍档
  // 雾子 → 温斯顿
  'kiriko-winston': {
    reasonZh: '温斯顿喷射背包跳入敌阵时，雾子铃与瞬保障生存',
    reasonEn: 'Kiriko enables Winston\'s diving strategy'
  },
  // 源氏 → 温斯顿
  'genji-winston': {
    reasonZh: '源氏和温斯顿都是高机动切入，配合集火效果极佳',
    reasonEn: 'Both divers - Winston dives, Genji cleans up'
  },
  // 猎空 → 温斯顿
  'tracer-winston': {
    reasonZh: '猎空的高机动配合温斯顿的跳跃，能快速转移战场',
    reasonEn: 'Both highly mobile - Winston jumps, Tracer blinks'
  },
  // 查莉娅 → 温斯顿
  'zarya-winston': {
    reasonZh: '查莉娅粒子屏障保护温斯顿的切入',
    reasonEn: 'Zarya\'s bubble protects Winston\'s dives'
  },
  // D.Va → 温斯顿
  'dva-winston': {
    reasonZh: 'D.Va配合温斯顿形成双跳，敌方后排难以应对',
    reasonEn: 'D.Va + Winston double dive overwhelms backline'
  },

  // 破坏球的最佳拍档
  // 雾子 → 破坏球
  'kiriko-wrecking_ball': {
    reasonZh: '破坏球需要持续位移和治疗来维持高机动性骚扰',
    reasonEn: 'Kiriko enables Wrecking Ball\'s ballsy plays'
  },
  // 禅雅塔 → 破坏球
  'zenyatta-wrecking_ball': {
    reasonZh: '禅雅塔乱法球增伤让破坏球工程抓钩连招更可观',
    reasonEn: 'Zenyatta\'s boost makes Wrecking Ball\'s AOE impactful'
  },
  // 源氏 → 破坏球
  'genji-wrecking_ball': {
    reasonZh: '源氏能跟进破坏球的入场进行收割',
    reasonEn: 'Genji can follow Wrecking Ball\'s engage for cleanup'
  },
  // 查莉娅 → 破坏球
  'zarya-wrecking_ball': {
    reasonZh: '查莉娅粒子屏障保护破坏球的入场',
    reasonEn: 'Zarya\'s bubble protects Wrecking Ball\'s engage'
  },

  // 查莉娅的最佳拍档
  // 雾子 → 查莉娅
  'kiriko-zarya': {
    reasonZh: '查莉娅需要治疗来维持高能量，雾子提供稳定支援',
    reasonEn: 'Kiriko maintains Zarya\'s high energy with consistent healing'
  },
  // 源氏 → 查莉娅
  'genji-zarya': {
    reasonZh: '重力喷涌控住敌人后，源氏龙刃跟进收割',
    reasonEn: 'Graviton Surge + Genji dash = eliminations'
  },
  // 死神 → 查莉娅
  'reaper-zarya': {
    reasonZh: '查莉娅控场，死神入场收割，配合简单高效',
    reasonEn: 'Zarya sets up, Reaper cleans up - simple and effective'
  },

  // 金驭的最佳拍档
  // 雾子 → 金驭
  'kiriko-domina': {
    reasonZh: '金驭需要前排治疗保障，雾子提供及时位移支援',
    reasonEn: 'Kiriko provides mobile healing for Domina\'s front-line play'
  },
  // 源氏 → 金驭
  'genji-domina': {
    reasonZh: '源氏高机动配合金驭全景牢笼囚禁引爆，快速建立优势',
    reasonEn: 'High mobility Genji + Domina\'s control = quick advantages'
  },
  // 卡西迪 → 金驭
  'cassidy-domina': {
    reasonZh: '卡西迪的远程输出弥补金驭的输出空缺',
    reasonEn: 'Cassidy covers Domina\'s damage gaps at range'
  },

  // ========== Damage heroes 最佳拍档理由 ==========
  // 艾什的最佳拍档
  // 查莉娅 → 艾什
  'zarya-ashe': {
    reasonZh: '查莉娅粒子屏障保护艾什开镜狙击时的安全',
    reasonEn: 'Zarya\'s bubble protects Ashe while she\'s set up'
  },
  // 巴蒂斯特 → 艾什
  'baptiste-ashe': {
    reasonZh: '巴蒂斯特维生力场保护艾什不被切入秒杀',
    reasonEn: 'Baptiste\'s immortality protects Ashe from flankers'
  },
  // 禅雅塔 → 艾什
  'zenyatta-ashe': {
    reasonZh: '禅雅塔乱法球增伤让艾什的狙击伤害更致命',
    reasonEn: 'Zenyatta\'s Discord makes Ashe\'s snipes lethal'
  },
  // 西格玛 → 艾什
  'sigma-ashe': {
    reasonZh: '西格玛实验屏障保护艾什的架枪位置',
    reasonEn: 'Sigma\'s shield protects Ashe\'s positioning'
  },
  // 奥丽莎 → 艾什
  'orisa-ashe': {
    reasonZh: '奥丽莎的保护配合艾什的高点输出',
    reasonEn: 'Orisa\'s protection enables Ashe\'s high ground dominance'
  },

  // 堡垒的最佳拍档
  // 西格玛 → 堡垒
  'sigma-bastion': {
    reasonZh: '西格玛实验屏障保护火炮模式的堡垒',
    reasonEn: 'Sigma\'s shield protects stationary Bastion'
  },
  // 奥丽莎 → 堡垒
  'orisa-bastion': {
    reasonZh: '奥丽莎的强固防御挡控保护堡垒火炮模式时的安全',
    reasonEn: 'Orisa\'s Fortify protects Bastion while turreted'
  },
  // 巴蒂斯特 → 堡垒
  'baptiste-bastion': {
    reasonZh: '巴蒂斯特维生力场与增幅矩阵让堡垒完成火炮模式的关键输出',
    reasonEn: 'Baptiste\'s matrix gives Bastion crucial setup time'
  },
  // 查莉娅 → 堡垒
  'zarya-bastion': {
    reasonZh: '查莉娅粒子屏障保护堡垒的架枪位置',
    reasonEn: 'Zarya\'s bubble protects Bastion\'s positioning'
  },

  // 卡西迪的最佳拍档
  // 查莉娅 → 卡西迪
  'zarya-cassidy': {
    reasonZh: '查莉娅的能量高时配合卡西迪能快速击杀前排',
    reasonEn: 'High-energy Zarya + Cassidy = quick tank kills'
  },
  // 雾子 → 卡西迪
  'kiriko-cassidy': {
    reasonZh: '雾子的治疗保护中距离输出的卡西迪',
    reasonEn: 'Kiriko protects Cassidy\'s mid-range positioning'
  },
  // 巴蒂斯特 → 卡西迪
  'baptiste-cassidy': {
    reasonZh: '巴蒂斯特的治疗和位移让卡西迪更敢主动出击',
    reasonEn: 'Baptiste enables Cassidy\'s aggressive plays'
  },
  // 安娜 → 卡西迪
  'ana-cassidy': {
    reasonZh: '安娜的纳米激素增强卡西迪的输出',
    reasonEn: 'Ana\'s Nano boosts Cassidy\'s damage'
  },
  // 布丽吉塔 → 卡西迪
  'brigitte-cassidy': {
    reasonZh: '布丽吉塔能量盾击击退帮助卡西迪留住敌人',
    reasonEn: 'Brigitte\'s stun helps Cassidy secure kills'
  },

  // 回声的最佳拍档
  // D.Va → 回声
  'dva-echo': {
    reasonZh: 'D.Va防御矩阵掩护回声飞行时的脆弱期',
    reasonEn: 'D.Va\'s matrix protects Echo while flying'
  },
  // 雾子 → 回声
  'kiriko-echo': {
    reasonZh: '雾子和回声都是高机动，配合切入收割效果极佳',
    reasonEn: 'Both highly mobile - Kiriko enables Echo\'s dives'
  },
  // 禅雅塔 → 回声
  'zenyatta-echo': {
    reasonZh: '禅雅塔乱法球增伤让回声的爆发伤害更高',
    reasonEn: 'Zenyatta\'s boost makes Echo\'s burst damage lethal'
  },
  // 源氏 → 回声
  'genji-echo': {
    reasonZh: '源氏配合回声高机动切入收割',
    reasonEn: 'Genji follows Echo\'s high mobility for cleanup'
  },

  // 源氏的最佳拍档
  // 查莉娅 → 源氏
  'zarya-genji': {
    reasonZh: '查莉娅重力喷涌控住后，源氏龙刃跟进收割',
    reasonEn: 'Graviton Surge + Genji blade = ultimate combo'
  },
  // 禅雅塔 → 源氏
  'zenyatta-genji': {
    reasonZh: '禅雅塔乱法球增伤让源氏龙刃伤害爆表',
    reasonEn: 'Zenyatta\'s Discord makes Genji\'s blade lethal'
  },
  // 雾子 → 源氏
  'kiriko-genji': {
    reasonZh: '雾子的治疗和位移与源氏的高机动完美契合',
    reasonEn: 'Kiriko enables Genji\'s aggressive dive strategy'
  },
  // 安娜 → 源氏
  'ana-genji': {
    reasonZh: '安娜的纳米激素增强源氏龙刃伤害',
    reasonEn: 'Ana\'s Nano boosts Genji\'s blade damage'
  },
  // D.Va → 源氏
  'dva-genji': {
    reasonZh: 'D.Va防御矩阵保护源氏的切入',
    reasonEn: 'D.Va matrix protects Genji\'s dives'
  },

  // 半藏的最佳拍档
  // 查莉娅 → 半藏
  'zarya-hanzo': {
    reasonZh: '半藏音箭探敌配合查莉娅充能，快速攒出竜',
    reasonEn: 'Hanzo\'s sonic + Zarya\'s energy = fast ultimate charge'
  },
  // 禅雅塔 → 半藏
  'zenyatta-hanzo': {
    reasonZh: '禅雅塔乱法球增伤显著提升半藏的爆发伤害',
    reasonEn: 'Zenyatta\'s Discord makes Hanzo\'s burst devastating'
  },
  // 雾子 → 半藏
  'kiriko-hanzo': {
    reasonZh: '雾子保护半藏在中远距离的输出位置',
    reasonEn: 'Kiriko protects Hanzo\'s long-range position'
  },
  // 黑百合 → 半藏
  'widowmaker-hanzo': {
    reasonZh: '黑百合和半藏形成双狙击，压制力极强',
    reasonEn: 'Widow + Hanzo double sniper = overwhelming pressure'
  },

  // 狂鼠的最佳拍档
  // 查莉娅 → 狂鼠
  'zarya-junkrat': {
    reasonZh: '查莉娅重力喷涌聚敌后，狂鼠炸弹轮胎造成巨额AOE伤害',
    reasonEn: 'Zarya\'s Graviton + Junkrat\'s tire = massive AOE'
  },
  // 雾子 → 狂鼠
  'kiriko-junkrat': {
    reasonZh: '雾子的治疗保障狂鼠在前排的持续输出',
    reasonEn: 'Kiriko enables Junkrat\'s aggressive positioning'
  },
  // 巴蒂斯特 → 狂鼠
  'baptiste-junkrat': {
    reasonZh: '巴蒂斯特维生力场让狂鼠安心布设震荡地雷与捕兽夹',
    reasonEn: 'Baptiste\'s immortality protects Junkrat\'s mine plays'
  },

  // 法老之鹰的最佳拍档
  // 天使 → 法老之鹰
  'mercy-pharah': {
    reasonZh: '天使守护天使全程跟随增伤，是法老之鹰的经典标配组合',
    reasonEn: 'Mercy\'s mobility and boost are Pharah\'s classic synergy'
  },
  // 雾子 → 法老之鹰
  'kiriko-pharah': {
    reasonZh: '雾子的瞬能跟上法老之鹰的飞行节奏',
    reasonEn: 'Kiriko can keep up with Pharah\'s flight path'
  },
  // 禅雅塔 → 法老之鹰
  'zenyatta-pharah': {
    reasonZh: '禅雅塔乱法球增伤让法老之鹰的火箭伤害爆表',
    reasonEn: 'Zenyatta\'s Discord makes Pharah\'s rockets lethal'
  },
  // 巴蒂斯特 → 法老之鹰
  'baptiste-pharah': {
    reasonZh: '巴蒂斯特维生力场保护法老之鹰的飞行',
    reasonEn: 'Baptiste\'s immortality protects Pharah in air'
  },

  // 死神的最佳拍档
  // 查莉娅 → 死神
  'zarya-reaper': {
    reasonZh: '查莉娅控场后，死神入场收割残血',
    reasonEn: 'Zarya sets up, Reaper cleans up low HP targets'
  },
  // 雾子 → 死神
  'kiriko-reaper': {
    reasonZh: '雾子铃保护死神幽灵形态入场后的生存',
    reasonEn: 'Kiriko\'s Suzu protects Reaper after wraith in'
  },
  // 禅雅塔 → 死神
  'zenyatta-reaper': {
    reasonZh: '禅雅塔乱法球增伤让死神的近战爆发更高',
    reasonEn: 'Zenyatta\'s Discord makes Reaper\'s melee lethal'
  },
  // 莫伊拉 → 死神
  'moira-reaper': {
    reasonZh: '莫伊拉的治疗保障死神的持续作战',
    reasonEn: 'Moira\'s healing enables Reaper\'s sustained fights'
  },

  // 士兵76的最佳拍档
  // 雾子 → 士兵:76
  'kiriko-soldier76': {
    reasonZh: '雾子瞬的位移治疗能让士兵76保持灵活游击',
    reasonEn: 'Kiriko enables Soldier\'s hit-and-run tactics'
  },
  // 巴蒂斯特 → 士兵:76
  'baptiste-soldier76': {
    reasonZh: '巴蒂斯特愈合冲击与维生力场保障士兵76的持续作战',
    reasonEn: 'Baptiste enables Soldier\'s sustained fighting'
  },
  // 禅雅塔 → 士兵:76
  'zenyatta-soldier76': {
    reasonZh: '禅雅塔乱法球增伤提升士兵76重型脉冲步枪的伤害',
    reasonEn: 'Zenyatta\'s Discord boosts Soldier\'s rifle damage'
  },
  // 安娜 → 士兵:76
  'ana-soldier76': {
    reasonZh: '安娜的纳米激素增强士兵76的输出',
    reasonEn: 'Ana\'s Nano boosts Soldier\'s damage'
  },

  // 索杰恩的最佳拍档
  // D.Va → 索杰恩
  'dva-sojourn': {
    reasonZh: 'D.Va防御矩阵掩护索杰恩电磁炮蓄能，充能完成后秒杀前排',
    reasonEn: 'D.Va\'s matrix protects Sojourn charging railgun'
  },
  // 雾子 → 索杰恩
  'kiriko-sojourn': {
    reasonZh: '雾子的治疗保护索杰恩的侧面输出位置',
    reasonEn: 'Kiriko protects Sojourn\'s flank positioning'
  },
  // 禅雅塔 → 索杰恩
  'zenyatta-sojourn': {
    reasonZh: '禅雅塔乱法球增伤提高索杰恩电磁炮穿透一击的秒杀线',
    reasonEn: 'Zenyatta\'s Discord raises Sojourn\'s one-shot threshold'
  },
  // 查莉娅 → 索杰恩
  'zarya-sojourn': {
    reasonZh: '查莉娅配合索杰恩能快速充能',
    reasonEn: 'Zarya helps Sojourn charge railgun quickly'
  },

  // 秩序之光的最佳拍档
  // 查莉娅 → 秩序之光
  'zarya-symmetra': {
    reasonZh: '秩序之光需要前排保护，查莉娅粒子屏障刚好合适',
    reasonEn: 'Zarya\'s bubble protects Symmetra\'s setup'
  },
  // 雾子 → 秩序之光
  'kiriko-symmetra': {
    reasonZh: '雾子保护秩序之光架设传送面板时的安全',
    reasonEn: 'Kiriko protects Symmetra while setting up'
  },
  // 禅雅塔 → 秩序之光
  'zenyatta-symmetra': {
    reasonZh: '禅雅塔乱法球增伤秩序之光光子发射器的能量球伤害',
    reasonEn: 'Zenyatta\'s Discord boosts Symmetra\'s orb damage'
  },

  // 托比昂的最佳拍档
  // 查莉娅 → 托比昂
  'zarya-torbjorn': {
    reasonZh: '查莉娅粒子屏障保护托比昂部署炮台',
    reasonEn: 'Zarya\'s bubble protects Torbjorn\'s turret setup'
  },
  // 雾子 → 托比昂
  'kiriko-torbjorn': {
    reasonZh: '雾子的治疗保护托比昂的近战骚扰打法',
    reasonEn: 'Kiriko protects Torbjorn\'s aggressive playstyle'
  },
  // 巴蒂斯特 → 托比昂
  'baptiste-torbjorn': {
    reasonZh: '巴蒂斯特维生力场保护关键炮台，增幅矩阵翻倍炮台输出',
    reasonEn: 'Baptiste\'s matrix protects critical turrets'
  },

  // 猎空的最佳拍档
  // 查莉娅 → 猎空
  'zarya-tracer': {
    reasonZh: '查莉娅重力喷涌聚敌帮助猎空脉冲炸弹定点秒杀',
    reasonEn: 'Graviton Surge + Tracer blink = guaranteed picks'
  },
  // 禅雅塔 → 猎空
  'zenyatta-tracer': {
    reasonZh: '禅雅塔乱法球增伤让猎空的爆发更高',
    reasonEn: 'Zenyatta\'s Discord makes Tracer\'s burst lethal'
  },
  // 雾子 → 猎空
  'kiriko-tracer': {
    reasonZh: '雾子的治疗和位移与猎空的高机动完美配合',
    reasonEn: 'Kiriko enables Tracer\'s aggressive blink plays'
  },

  // 探奇的最佳拍档
  // 雾子 → 探奇
  'kiriko-venture': {
    reasonZh: '雾子保护探奇钻地突袭切入后的脆弱期',
    reasonEn: 'Kiriko protects Venture after burrowing in'
  },
  // 禅雅塔 → 探奇
  'zenyatta-venture': {
    reasonZh: '禅雅塔乱法球增伤探奇的爆发伤害',
    reasonEn: 'Zenyatta\'s Discord boosts Venture\'s burst'
  },
  // 源氏 → 探奇
  'genji-venture': {
    reasonZh: '源氏能跟进探奇的入场进行双切入',
    reasonEn: 'Genji follows Venture\'s engage for double dive'
  },

  // 黑百合的最佳拍档
  // 查莉娅 → 黑百合
  'zarya-widowmaker': {
    reasonZh: '查莉娅粒子屏障保护黑百合开镜狙击时的安全',
    reasonEn: 'Zarya\'s bubble protects Widowmaker while scoped'
  },
  // 雾子 → 黑百合
  'kiriko-widowmaker': {
    reasonZh: '雾子治疗和保护黑百合的远距离狙击位置',
    reasonEn: 'Kiriko protects Widowmaker\'s long-range position'
  },
  // 禅雅塔 → 黑百合
  'zenyatta-widowmaker': {
    reasonZh: '禅雅塔乱法球增伤让黑百合的秒杀线更高',
    reasonEn: 'Zenyatta\'s Discord raises Widowmaker\'s one-shot threshold'
  },

  // 芙蕾雅的最佳拍档
  // 雾子 → 芙蕾雅
  'kiriko-freja': {
    reasonZh: '雾子帮助上升气流滞空输出的芙蕾雅保持生存',
    reasonEn: 'Kiriko enables Freja\'s aerial DPS strategy'
  },
  // 禅雅塔 → 芙蕾雅
  'zenyatta-freja': {
    reasonZh: '禅雅塔乱法球增伤芙蕾雅瞄准射击的爆炸弩箭',
    reasonEn: 'Zenyatta\'s Discord boosts Freja\'s crossbow damage'
  },
  // 源氏 → 芙蕾雅
  'genji-freja': {
    reasonZh: '源氏能保护滞空的芙蕾雅免受敌方切入',
    reasonEn: 'Genji protects aerial Freja from flankers'
  },

  // 斩仇的最佳拍档
  // D.Va → 斩仇
  'dva-vendetta': {
    reasonZh: 'D.Va防御矩阵保护斩仇招架姿态入场后的安全',
    reasonEn: 'D.Va\'s matrix protects Vendetta after diving in'
  },
  // 黑百合 → 斩仇
  'widowmaker-vendetta': {
    reasonZh: '黑百合远距离狙击压低血线，斩仇收割',
    reasonEn: 'Widowmaker weakens targets, Vendetta cleans up'
  },
  // 半藏 → 斩仇
  'hanzo-vendetta': {
    reasonZh: '半藏音箭发现远处目标，斩仇旋风疾步快速切入',
    reasonEn: 'Hanzo\'s sonar reveals targets, Vendetta dives'
  },

  // 安燃的最佳拍档
  // D.Va → 安燃
  'dva-anran': {
    reasonZh: 'D.Va防御矩阵掩护安燃怒炎冲突进路线，高机动快速转点',
    reasonEn: 'D.Va enables Anran\'s aggressive repositioning'
  },
  // 源氏 → 安燃
  'genji-anran': {
    reasonZh: '源氏和安燃都是高机动，能形成交叉火力',
    reasonEn: 'Both divers - Genji and Anran create crossfire'
  },
  // 猎空 → 安燃
  'tracer-anran': {
    reasonZh: '猎空和安燃的高机动配合能快速建立人数优势',
    reasonEn: 'Both highly mobile - quick number advantage'
  },

  // 埃姆雷的最佳拍档
  // 雾子 → 埃姆雷
  'kiriko-emrey': {
    reasonZh: '雾子铃与瞬保护覆盖协议变身后的埃姆雷，容错率极高',
    reasonEn: 'Kiriko enables Emrey\'s aggressive playstyle'
  },
  // 禅雅塔 → 埃姆雷
  'zenyatta-emrey': {
    reasonZh: '禅雅塔乱法球增伤让埃姆雷赛博手雷与步枪爆发更致命',
    reasonEn: 'Zenyatta\'s Discord boosts Emrey\'s AOE damage'
  },
  // 源氏 → 埃姆雷
  'genji-emrey': {
    reasonZh: '源氏能配合埃姆雷的双切入战术',
    reasonEn: 'Genji complements Emrey\'s double-dive strategy'
  },

  // 安娜的最佳拍档
  // D.Va → 安娜
  'dva-ana': {
    reasonZh: 'D.Va的高机动性能让安娜安全转移位置',
    reasonEn: 'D.Va enables Ana\'s safe repositioning'
  },
  // 莱因哈特 → 安娜
  'reinhardt-ana': {
    reasonZh: '莱因哈特的屏障力场能保护安娜的安全狙击环境',
    reasonEn: 'Reinhardt\'s shield creates safe sniping space'
  },
  // 查莉娅 → 安娜
  'zarya-ana': {
    reasonZh: '查莉娅粒子屏障保护安娜不被秒倒',
    reasonEn: 'Zarya\'s bubble protects Ana from being picked'
  },
  // 西格玛 → 安娜
  'sigma-ana': {
    reasonZh: '西格玛实验屏障保护安娜的狙击位置',
    reasonEn: 'Sigma\'s shield protects Ana\'s sniping position'
  },

  // 巴蒂斯特的最佳拍档
  // D.Va → 巴蒂斯特
  'dva-baptiste': {
    reasonZh: 'D.Va防御矩阵保护巴蒂斯特开启增幅矩阵时的安全',
    reasonEn: 'D.Va protects Baptiste during his ultimate'
  },
  // 莱因哈特 → 巴蒂斯特
  'reinhardt-baptiste': {
    reasonZh: '莱因哈特的冲锋配合巴蒂斯特的高台输出',
    reasonEn: 'Reinhardt charges in, Baptiste provides high ground DPS'
  },
  // 卡西迪 → 巴蒂斯特
  'cassidy-baptiste': {
    reasonZh: '卡西迪的中距离输出弥补巴蒂斯特的输出空缺',
    reasonEn: 'Cassidy covers Baptiste\'s mid-range gaps'
  },
  // 士兵:76 → 巴蒂斯特
  'soldier76-baptiste': {
    reasonZh: '士兵76配合巴蒂斯特形成双DPS',
    reasonEn: 'Soldier pairs with Baptiste for double DPS'
  },
  // 奥丽莎 → 巴蒂斯特
  'orisa-baptiste': {
    reasonZh: '奥丽莎配合巴蒂斯特形成双前排',
    reasonEn: 'Orisa pairs with Baptiste for double tank'
  },

  // 布丽吉塔的最佳拍档
  // D.Va → 布丽吉塔
  'dva-brigitte': {
    reasonZh: 'D.Va配合布丽吉塔的前排压制',
    reasonEn: 'D.Va enables Brigitte\'s aggressive frontline play'
  },
  // 莱因哈特 → 布丽吉塔
  'reinhardt-brigitte': {
    reasonZh: '大锤冲锋后布丽吉塔能量盾击跟进击退，完成连招',
    reasonEn: 'Reinhardt charges, Brigitte follows for stun combo'
  },
  // 查莉娅 → 布丽吉塔
  'zarya-brigitte': {
    reasonZh: '查莉娅和布丽吉塔都是前排，形成强力阵线',
    reasonEn: 'Zarya + Brigitte create strong frontline'
  },
  // 猎空 → 布丽吉塔
  'tracer-brigitte': {
    reasonZh: '猎空配合布丽吉塔的前排压制',
    reasonEn: 'Tracer pairs with Brigitte for aggressive frontline'
  },

  // 雾子的最佳拍档
  // D.Va → 雾子
  'dva-kiriko': {
    reasonZh: 'D.Va的高机动配合雾子，能快速支援各路',
    reasonEn: 'D.Va + Kiriko enables rapid rotation support'
  },
  // 源氏 → 雾子
  'genji-kiriko': {
    reasonZh: '源氏和雾子都是高机动，配合切入效果极佳',
    reasonEn: 'Both highly mobile - Genji dives, Kiriko heals'
  },
  // 猎空 → 雾子
  'tracer-kiriko': {
    reasonZh: '猎空和雾子的高机动组合能快速建立优势',
    reasonEn: 'High mobility duo - quick advantage generation'
  },
  // 温斯顿 → 雾子
  'winston-kiriko': {
    reasonZh: '温斯顿跳入敌阵时雾子能及时治疗',
    reasonEn: 'Kiriko enables Winston\'s diving strategy'
  },
  // 末日铁拳 → 雾子
  'doomfist-kiriko': {
    reasonZh: '雾子铃保护铁拳的突进',
    reasonEn: 'Kiriko protects Doomfist\'s engages'
  },

  // 生命之梭的最佳拍档
  // D.Va → 生命之梭
  'dva-lifeweaver': {
    reasonZh: 'D.Va保护生命之梭的站位，花男安心辅助',
    reasonEn: 'D.Va protects Lifeweaver\'s positioning'
  },
  // 源氏 → 生命之梭
  'genji-lifeweaver': {
    reasonZh: '源氏切入后，生命之梭能及时生命之握拉人',
    reasonEn: 'Lifeweaver can rez Genji after aggressive dives'
  },
  // 卡西迪 → 生命之梭
  'cassidy-lifeweaver': {
    reasonZh: '卡西迪的中距离压制配合生命之梭的远程辅助',
    reasonEn: 'Cassidy pressure + Lifeweaver range support'
  },
  // 美 → 生命之梭
  'mei-lifeweaver': {
    reasonZh: '小美的冰墙配合花男的花瓣平台能创造超高狙击点',
    reasonEn: 'Mei ice wall + Lifeweaver platform = ultra high ground'
  },

  // 卢西奥的最佳拍档
  // D.Va → 卢西奥
  'dva-lucio': {
    reasonZh: 'D.Va配合卢西奥的加速音效，能快速转场',
    reasonEn: 'D.Va + Lucio speed = rapid repositioning'
  },
  // 源氏 → 卢西奥
  'genji-lucio': {
    reasonZh: '源氏和卢西奥的高机动，能形成快速支援',
    reasonEn: 'High mobility duo - Genji + Lucio speed'
  },
  // 猎空 → 卢西奥
  'tracer-lucio': {
    reasonZh: '猎空和卢西奥的加速能打出灵活的游击战',
    reasonEn: 'Speed combo - Tracer + Lucio hit-and-run'
  },
  // 温斯顿 → 卢西奥
  'winston-lucio': {
    reasonZh: '温斯顿配合卢西奥加速能快速转移',
    reasonEn: 'Winston + Lucio speed = rapid rotation'
  },

  // 天使的最佳拍档
  // 法老之鹰 → 天使
  'pharah-mercy': {
    reasonZh: '天使守护天使跟随增伤是法老之鹰的经典标配',
    reasonEn: 'Mercy\'s mobility is Pharah\'s classic synergy'
  },
  // 回声 → 天使
  'echo-mercy': {
    reasonZh: '回声飞行时，天使能安全跟进增伤',
    reasonEn: 'Mercy can keep up with Echo\'s flight'
  },
  // 黑百合 → 天使
  'widowmaker-mercy': {
    reasonZh: '天使保护黑百合的狙击位置不被切入',
    reasonEn: 'Mercy protects Widowmaker\'s sniping position'
  },
  // 源氏 → 天使
  'genji-mercy': {
    reasonZh: '天使保护源氏的切入位置',
    reasonEn: 'Mercy protects Genji\'s positioning'
  },
  // 猎空 → 天使
  'tracer-mercy': {
    reasonZh: '天使保护猎空的侧翼',
    reasonEn: 'Mercy protects Tracer\'s flanks'
  },

  // 莫伊拉的最佳拍档
  // D.Va → 莫伊拉
  'dva-moira': {
    reasonZh: 'D.Va配合莫伊拉的高机动治疗，能持续作战',
    reasonEn: 'D.Va + Moira enables sustained fighting'
  },
  // 莱因哈特 → 莫伊拉
  'reinhardt-moira': {
    reasonZh: '大锤冲锋时，莫伊拉能及时提供治疗',
    reasonEn: 'Moira heals Reinhardt during charges'
  },
  // 查莉娅 → 莫伊拉
  'zarya-moira': {
    reasonZh: '查莉娅需要持续治疗来维持高能量',
    reasonEn: 'Moira maintains Zarya\'s high energy'
  },
  // 路霸 → 莫伊拉
  'roadhog-moira': {
    reasonZh: '路霸配合莫伊拉形成强力前排',
    reasonEn: 'Roadhog + Moira = strong frontline'
  },

  // 禅雅塔的最佳拍档
  // 源氏 → 禅雅塔
  'genji-zenyatta': {
    reasonZh: '源氏龙刃配合乱法球增伤，能瞬间清场',
    reasonEn: 'Genji blade + Discord orb = team wipe'
  },
  // 猎空 → 禅雅塔
  'tracer-zenyatta': {
    reasonZh: '禅雅塔乱法球增伤让猎空的爆发更高',
    reasonEn: 'Zenyatta\'s Discord makes Tracer burst lethal'
  },
  // D.Va → 禅雅塔
  'dva-zenyatta': {
    reasonZh: 'D.Va保护禅雅塔的站位，矩阵吸收伤害',
    reasonEn: 'D.Va protects Zenyatta\'s positioning'
  },
  // 温斯顿 → 禅雅塔
  'winston-zenyatta': {
    reasonZh: '温斯顿配合禅雅塔能保护后排',
    reasonEn: 'Winston + Zenyatta protects backline'
  },

  // 无漾的最佳拍档
  // D.Va → 无漾
  'dva-wuyang': {
    reasonZh: 'D.Va配合无漾惊涛破击倒控制，能快速先手',
    reasonEn: 'D.Va enables Wuyang\'s aggressive CC plays'
  },
  // 黑百合 → 无漾
  'widowmaker-wuyang': {
    reasonZh: '黑百合远距离狙击压血线，无漾跟进控制',
    reasonEn: 'Widowmaker weakens, Wuyang follows with CC'
  },
  // 半藏 → 无漾
  'hanzo-wuyang': {
    reasonZh: '半藏音箭发现目标，无漾飞流步快速跟进',
    reasonEn: 'Hanzo reveals, Wuyang quickly follows up'
  },

  // 瑞稀的最佳拍档
  // D.Va → 瑞稀
  'dva-mizuki': {
    reasonZh: 'D.Va高机动配合瑞稀替魂纸人位移，能快速转场',
    reasonEn: 'D.Va + Mizuki enables rapid rotation'
  },
  // 源氏 → 瑞稀
  'genji-mizuki': {
    reasonZh: '源氏和瑞稀双切入，能快速秒杀后排',
    reasonEn: 'Genji + Mizuki double dive = quick backline picks'
  },
  // 猎空 → 瑞稀
  'tracer-mizuki': {
    reasonZh: '猎空和瑞稀的高机动配合能建立人数优势',
    reasonEn: 'High mobility duo - quick number advantage'
  },

  // 黑影的最佳拍档
  // 查莉娅 → 黑影
  'zarya-sombra': {
    reasonZh: '查莉娅重力喷涌配合黑影黑客入侵能快速击杀',
    reasonEn: 'Zarya + Sombra hack = quick eliminations'
  },
  // 源氏 → 黑影
  'genji-sombra': {
    reasonZh: '源氏配合黑影的黑客入侵能形成双重威胁',
    reasonEn: 'Genji + Sombra double threat'
  },
  // 猎空 → 黑影
  'tracer-sombra': {
    reasonZh: '猎空配合黑影形成双侧翼',
    reasonEn: 'Tracer + Sombra double flank'
  },

  // 小美的最佳拍档
  // 查莉娅 → 美
  'zarya-mei': {
    reasonZh: '查莉娅重力喷涌配合小美暴雪冰冻形成连招',
    reasonEn: 'Zarya + Mei control combo'
  },
  // 巴蒂斯特 → 美
  'baptiste-mei': {
    reasonZh: '巴蒂斯特维生力场保护小美冰墙与暴雪的关键释放',
    reasonEn: 'Baptiste immortality protects Mei\'s key abilities'
  },

  // 伊拉锐的最佳拍档
  // D.Va → 伊拉锐
  'dva-illari': {
    reasonZh: 'D.Va保护伊拉锐治疗光塔的部署位置',
    reasonEn: 'D.Va protects Illari\'s sun spot positioning'
  },
  // 查莉娅 → 伊拉锐
  'zarya-illari': {
    reasonZh: '查莉娅粒子屏障保护伊拉锐架设治疗光塔',
    reasonEn: 'Zarya\'s bubble protects Illari while setting up'
  },
  // 源氏 → 伊拉锐
  'genji-illari': {
    reasonZh: '源氏能保护伊拉锐的侧翼安全',
    reasonEn: 'Genji protects Illari\'s flank positioning'
  },

  // 朱诺的最佳拍档
  // D.Va → 朱诺
  'dva-juno': {
    reasonZh: 'D.Va配合朱诺超能环域加速，能快速转场',
    reasonEn: 'D.Va + Juno speed ring = rapid repositioning'
  },
  // 源氏 → 朱诺
  'genji-juno': {
    reasonZh: '源氏配合朱诺超能环域加速，能快速切入收割',
    reasonEn: 'Genji + Juno speed = quick dive cleanup'
  },
  // 猎空 → 朱诺
  'tracer-juno': {
    reasonZh: '猎空配合朱诺超能环域能达到超高机动',
    reasonEn: 'Tracer + Juno speed ring = extreme mobility'
  },
  // 温斯顿 → 朱诺
  'winston-juno': {
    reasonZh: '温斯顿配合朱诺超能环域加速能快速转移战场',
    reasonEn: 'Winston + Juno speed = rapid rotation'
  },

  // 飞天猫的最佳拍档
  // 雾子 → 飞天猫
  'kiriko-feitianmao': {
    reasonZh: '两位都是支援高机动，能快速互相支援',
    reasonEn: 'Both mobile supports - mutual protection'
  },
  // 禅雅塔 → 飞天猫
  'zenyatta-feitianmao': {
    reasonZh: '禅雅塔乱法球增伤飞天猫生物猫爪弹的输出',
    reasonEn: 'Zenyatta\'s Discord boosts Feitianmao\'s damage'
  },
  // 源氏 → 飞天猫
  'genji-feitianmao': {
    reasonZh: '源氏能配合飞天猫进行双切入',
    reasonEn: 'Genji follows Feitianmao for double dive'
  },

  // 死怨的最佳拍档
  // 雾子 → 死怨
  'kiriko-shion': {
    reasonZh: '雾子铃铛保护死怨切入时免控免伤，瞬传送可跟随深入后排持续治疗',
    reasonEn: 'Kiriko Suzu protects Shion from CC during dive, Swift Step follows for sustained healing in backline'
  },
  // 安娜 → 死怨
  'ana-shion': {
    reasonZh: '安娜纳米激素让死怨变肉坦，交叉枪决散弹爆发伤害翻倍，切入后排毁天灭地',
    reasonEn: 'Ana Nano turns Shion into a tank, doubling shotgun burst damage for devastating backline dives'
  },
  // 温斯顿 → 死怨
  'winston-shion': {
    reasonZh: '温斯顿喷射背包跳入吸引火力，死怨跟进交叉枪决散弹收割残血支援，双切入后排无法招架',
    reasonEn: 'Winston dives drawing aggro with Tesla, Shion follows with shotgun burst to finish supports - double dive overwhelms backline'
  },
  // 猎空 → 死怨
  'tracer-shion': {
    reasonZh: '猎空闪烁骚扰吸引注意，死怨纵情狂飙切入散弹收割，双刺客后排无人生还',
    reasonEn: 'Tracer blinks to distract, Shion motorcycle dives with shotgun burst to clean up - dual assassin backline wipe'
  },
  // 禅雅塔 → 死怨
  'zenyatta-shion': {
    reasonZh: '禅雅塔乱法球增伤让死怨交叉枪决散弹爆发更致命，一喷即杀',
    reasonEn: 'Zenyatta Discord makes Shion\'s shotgun burst even more lethal, one-shotting 250HP targets'
  },
  // D.Va → 死怨
  'dva-shion': {
    reasonZh: 'D.Va防御矩阵掩护死怨纵情狂飙切入路线，双高机动组合快速转场压制',
    reasonEn: 'D.Va matrix covers Shion\'s motorcycle dive path, dual mobility for rapid rotation and pressure'
  },
  // 查莉娅 → 死怨
  'zarya-shion': {
    reasonZh: '查莉娅粒子屏障保护切入中的死怨不被秒杀，高能量配合散弹收割前排',
    reasonEn: 'Zarya bubble protects diving Shion from being burst down, high energy pairs with shotgun for frontline kills'
  },
  // 卢西奥 → 死怨
  'lucio-shion': {
    reasonZh: '卢西奥加速音效帮助死怨快速近身发挥散弹威力，贴脸输出效率拉满',
    reasonEn: 'Lucio speed boost helps Shion close distance for devastating shotgun damage, maximizing close-range efficiency'
  },
  // 源氏 → 死怨
  'genji-shion': {
    reasonZh: '源氏和死怨双切入组合压制后排，源氏龙刃+死怨散弹让支援无处可逃',
    reasonEn: 'Genji + Shion double dive crushes backline, Dragonblade + shotgun burst leaves supports nowhere to hide'
  },
  // 黑影 → 死怨
  'sombra-shion': {
    reasonZh: '黑影电磁脉冲先手禁用技能，死怨趁机纵情狂飙切入散弹收割，被侵入的敌人无法还手',
    reasonEn: 'Sombra EMP disables abilities first, Shion dives in with shotgun to clean up - hacked enemies can\'t fight back'
  },
  // 巴蒂斯特 → 死怨
  'baptiste-shion': {
    reasonZh: '巴蒂斯特维生力场保护死怨切入后的生存，动力战靴高台提供散弹输出角度',
    reasonEn: 'Baptiste Immortality Field saves diving Shion, Exo Boots provide high ground angles for shotgun damage'
  },
  // 回声 → 死怨
  'echo-shion': {
    reasonZh: '回声和死怨双高机动切入，空中+地面同时施压让敌方防不胜防',
    reasonEn: 'Echo + Shion dual high-mobility dive, aerial + ground pressure overwhelms enemy defenses'
  },
  // 朱诺 → 死怨
  'juno-shion': {
    reasonZh: '朱诺超能环域帮助死怨快速近身，散弹贴脸输出效率最大化',
    reasonEn: 'Juno speed ring helps Shion close distance quickly, maximizing point-blank shotgun efficiency'
  },

  // D.mon的最佳拍档
  // 雾子 → D.mon
  'kiriko-dmon': {
    reasonZh: '雾子的铃净化和瞬移能保护D.mon突进后的生存，容错率极高',
    reasonEn: 'Kiriko\'s Suzu and teleport protect D.mon after diving, providing high survivability'
  },
  // 安娜 → D.mon
  'ana-dmon': {
    reasonZh: '安娜的纳米激素强化D.mon的突进伤害，大招配合击杀效率极高',
    reasonEn: 'Ana\'s Nano Boost amplifies D.mon\'s dive damage for lethal combos'
  },
  // 查莉娅 → D.mon
  'zarya-dmon': {
    reasonZh: '查莉娅的粒子屏障保护D.mon突进时免受集火，双坦克前排组合',
    reasonEn: 'Zarya\'s bubble protects D.mon during dives, forming a strong dual-tank frontline'
  },
  // 巴蒂斯特 → D.mon
  'baptiste-dmon': {
    reasonZh: '巴蒂斯特的维生力场保护D.mon突进后不会被秒杀',
    reasonEn: 'Baptiste\'s immortality field prevents D.mon from being bursted after diving'
  },
  // 死神 → D.mon
  'reaper-dmon': {
    reasonZh: 'D.mon先手突进开团，死神跟进近距离爆发收割，双近战组合',
    reasonEn: 'D.mon dives in first, Reaper follows up with close-range burst - dual melee combo'
  },
  // 源氏 → D.mon
  'genji-dmon': {
    reasonZh: 'D.mon前排突进吸引火力，源氏侧翼切入收割，双机动压制',
    reasonEn: 'D.mon draws aggro upfront while Genji flanks - dual mobility pressure'
  },
  // 猎空 → D.mon
  'tracer-dmon': {
    reasonZh: 'D.mon正面粉碎前排，猎空骚扰后排，双方向同时施压',
    reasonEn: 'D.mon breaks the frontline while Tracer harasses the backline - dual pressure'
  },
  // 卢西奥 → D.mon
  'lucio-dmon': {
    reasonZh: '卢西奥的加速音效帮助D.mon快速近身，护甲+速度让突进势不可挡',
    reasonEn: 'Lúcio\'s speed boost helps D.mon close distance, armor + speed makes dives unstoppable'
  },
  // 禅雅塔 → D.mon
  'zenyatta-dmon': {
    reasonZh: '禅雅塔的乱法球使D.mon的突进爆发更加致命',
    reasonEn: 'Zenyatta\'s Discord orb makes D.mon\'s dive burst even more lethal'
  },

  // 血律的最佳拍档
  // 源氏 → 血律
  'genji-doctrine': {
    reasonZh: '血律的焕生无人机加快源氏挥刀攻速，双高机动组合切入后排难以被限制',
    reasonEn: 'Doctrine\'s Vitalizing Drone boosts Genji\'s swing speed; the dual-mobility dive is hard to pin down'
  },
  // 猎空 → 血律
  'tracer-doctrine': {
    reasonZh: '无人机攻速增益放大猎空高频点射，两者高机动互相掩护骚扰后排',
    reasonEn: 'The drone attack-speed buff amplifies Tracer\'s rapid fire while both mobility profiles cover each other'
  },
  // 死神 → 血律
  'reaper-doctrine': {
    reasonZh: '血律大招削减敌方最大生命值，配合死神近身爆发轻松收割，过量治疗保障换血',
    reasonEn: 'Doctrine\'s ult shreds enemy max HP for Reaper\'s close-range execution while overheal sustains trades'
  },
  // 温斯顿 → 血律
  'winston-doctrine': {
    reasonZh: '温斯顿跳脸开团，血律迅影疾行跟随切入并用大招压制敌方重装血量',
    reasonEn: 'Winston dives to open fights while Doctrine dashes in and reduces enemy tank HP with the ult'
  },
  // D.Va → 血律
  'dva-doctrine': {
    reasonZh: 'D.Va防御矩阵掩护血律的中距离权杖输出，双机动组合灵活转点',
    reasonEn: 'D.Va\'s matrix covers Doctrine\'s mid-range scepter pressure; both reposition freely'
  },
  // 查莉娅 → 血律
  'zarya-doctrine': {
    reasonZh: '查莉娅粒子屏障保护血律的突进治疗，减少其对位移技能的依赖',
    reasonEn: 'Zarya\'s bubble protects Doctrine during pushes, reducing reliance on dash cooldowns'
  },
  // 探奇 → 血律
  'venture-doctrine': {
    reasonZh: '探奇钻地伏击配合血律大招削减最大生命值，集火瞬间秒杀目标',
    reasonEn: 'Venture\'s burrow ambush plus Doctrine\'s max-HP reduction deletes focused targets instantly'
  },
  // 巴蒂斯特 → 血律
  'baptiste-doctrine': {
    reasonZh: '双治疗续航组合，巴蒂斯特维生力场与血律过量治疗互补保护突进阵容',
    reasonEn: 'A double-heal sustain combo: Baptiste\'s field and Doctrine\'s overheal protect dive comps'
  },

};

/**
 * 获取最佳拍档理由
 * @param sourceHeroId 拍档方英雄ID
 * @param targetHeroId 被配对英雄ID
 * @param language 语言
 * @returns 拍档理由
 */
export const getSynergyReason = (
  sourceHeroId: HeroId,
  targetHeroId: HeroId,
  language: CounterLanguage = 'zh'
): string => {
  const key = `${sourceHeroId}-${targetHeroId}`;
  const reason = synergyReasons[key];

  if (!reason) {
    // 默认返回通用配合描述
    return language === 'zh' ? '配合默契，协同作战' : 'Great synergy and teamwork';
  }

  return language === 'zh' ? reason.reasonZh : reason.reasonEn;
};
