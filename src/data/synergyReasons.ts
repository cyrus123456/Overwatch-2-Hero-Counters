// 最佳拍档理由数据 - 详细的、英雄特定的配合描述
import type { CounterLanguage } from './counterReasons';

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
  'kiriko-dva': { 
    reasonZh: '雾子的治愈之水和瞬移能让D.Va放心冲锋，生存能力大幅提升', 
    reasonEn: 'Kiriko\'s healing and teleport allow D.Va to push confidently' 
  },
  'zenyatta-dva': { 
    reasonZh: '禅雅塔的增伤和弦能显著提升D.Va的矩阵消耗效率', 
    reasonEn: 'Zenyatta\'s Harmony orb boosts D.Va\'s matrix pressure' 
  },
  'sojourn-dva': { 
    reasonZh: 'D.Va的高机动性配合索杰恩的右键高爆发，能快速集火秒杀', 
    reasonEn: 'D.Va\'s mobility pairs with Sojourn\'s railgun for quick picks' 
  },
  'baptiste-dva': {
    reasonZh: '巴蒂斯特的群体治疗和免死能保护D.Va的持续作战', 
    reasonEn: 'Baptiste\'s AOE healing and immortality protect D.Va\'s sustained fight' 
  },
  'genji-dva': {
    reasonZh: 'D.Va矩阵保护源氏切入，两者高机动形成交叉火力', 
    reasonEn: 'D.Va matrix protects Genji, both highly mobile create crossfire' 
  },
  'tracer-dva': {
    reasonZh: 'D.Va矩阵保护猎空切入，快速建立人数优势', 
    reasonEn: 'D.Va matrix protects Tracer dives for quick number advantage' 
  },
  'echo-dva': {
    reasonZh: 'D.Va的矩阵能保护回声飞行时的脆弱期', 
    reasonEn: 'D.Va\'s matrix protects Echo while flying' 
  },

  // 末日铁拳的最佳拍档
  'kiriko-doomfist': { 
    reasonZh: '雾子的免死技能保护铁拳突进后不会被秒，容错率极高', 
    reasonEn: 'Kiriko\'s Suzu protects Doomfist after diving in' 
  },
  'zarya-doomfist': { 
    reasonZh: '重力弹道配合铁拳的控制，能打出完美Combo连招', 
    reasonEn: 'Graviton Surge + Rocket Punch creates guaranteed kills' 
  },
  'reaper-doomfist': { 
    reasonZh: '两者都是近战高爆发，铁拳先手控住，死神瞬间补足伤害', 
    reasonEn: 'Both melee burst - Fist sets up, Reaper finishes' 
  },
  'ana-doomfist': {
    reasonZh: '安娜的纳米激素能增强铁拳的伤害，大招配合击杀效率极高', 
    reasonEn: 'Ana\'s Nano boosts Doomfist\'s damage for lethal combos' 
  },
  'genji-doomfist': {
    reasonZh: '源氏和铁拳都是高机动近战，能快速切入秒杀', 
    reasonEn: 'Both highly mobile melees - quick dive kills' 
  },
  'baptiste-doomfist': {
    reasonZh: '巴蒂斯特的免死保护铁拳入场后的生存', 
    reasonEn: 'Baptiste\'s immortality protects Doomfist after engaging' 
  },

  // 骇灾的最佳拍档
  'kiriko-hazard': { 
    reasonZh: '骇灾需要前排压制，雾子的治疗和位移能保障其持续作战能力', 
    reasonEn: 'Kiriko enables Hazard\'s sustained front-line pressure' 
  },
  'cassidy-hazard': { 
    reasonZh: '卡西迪的中距离输出和控场与骇灾的毒素区域形成交叉火力', 
    reasonEn: 'Cassidy\'s mid-range pressure complements Hazard\'s zone control' 
  },
  'ashe-hazard': { 
    reasonZh: '艾什的狙击和视野优势能帮助骇灾发现侧面切入的敌人', 
    reasonEn: 'Ashe\'s long-range vision helps Hazard track flankers' 
  },
  'genji-hazard': {
    reasonZh: '源氏高机动配合骇灾的控制能快速建立优势', 
    reasonEn: 'Genji\'s mobility pairs well with Hazard\'s control' 
  },

  // 渣客女王的最佳拍档
  'kiriko-junker_queen': { 
    reasonZh: '雾子的免死是近战坦克的标配，防止被集火秒杀', 
    reasonEn: 'Kiriko\'s Suzu is essential for melee tanks like Junker Queen' 
  },
  'ashe-junker_queen': { 
    reasonZh: '艾什的炸弹和渣客女王的冲锋形成Combo，大招联动效果极佳', 
    reasonEn: 'Ashe\'s dynamite + Junker Queen\'s shout creates combo potential' 
  },
  'cassidy-junker_queen': { 
    reasonZh: '卡西迪的磁雷能留住敌人，为女王的近战输出创造机会', 
    reasonEn: 'Cassidy\'s grenade sets up Junker Queen\'s melee damage' 
  },
  'zarya-junker_queen': {
    reasonZh: '查莉娅的能量配合女王的冲锋能快速击杀', 
    reasonEn: 'Zarya\'s energy + Junker Queen\'s charge = quick kills' 
  },
  'reaper-junker_queen': {
    reasonZh: '死神配合女王的近战能快速建立优势', 
    reasonEn: 'Reaper pairs well with Junker Queen\'s melee aggression' 
  },

  // 毛加的最佳拍档
  'kiriko-mauga': { 
    reasonZh: '毛加需要持续治疗来维持高输出，雾子是最好的选择', 
    reasonEn: 'Mauga needs sustained healing to maintain high DPS - Kiriko excels' 
  },
  'baptiste-mauga': { 
    reasonZh: '巴蒂斯特的群体治疗和免死与毛加的大范围输出完美契合', 
    reasonEn: 'Baptiste\'s AOE healing matches Mauga\'s area damage' 
  },
  'cassidy-mauga': { 
    reasonZh: '卡西迪的远程支援能补充毛加的中距离输出空缺', 
    reasonEn: 'Cassidy fills Mauga\'s mid-range gap with reliable damage' 
  },
  'zarya-mauga': {
    reasonZh: '查莉娅的护盾保护毛加的持续输出', 
    reasonEn: 'Zarya\'s bubble protects Mauga\'s sustained damage' 
  },
  'reaper-mauga': {
    reasonZh: '死神配合毛加的高输出能快速击杀', 
    reasonEn: 'Reaper pairs well with Mauga\'s high damage output' 
  },

  // 奥丽莎的最佳拍档
  'kiriko-orisa': { 
    reasonZh: '奥丽莎定点输出时需要位移治疗保障，雾子完美适配', 
    reasonEn: 'Kiriko\'s mobility supports Orisa\'s stationary playstyle' 
  },
  'zenyatta-orisa': { 
    reasonZh: '禅雅塔的增伤让奥丽莎的输出更具威胁性', 
    reasonEn: 'Zenyatta\'s damage boost makes Orisa\'s damage more threatening' 
  },
  'junkrat-orisa': { 
    reasonZh: '狂鼠的范围伤害配合奥丽莎的定点控制，形成封锁阵线', 
    reasonEn: 'Junkrat\'s area denial + Orisa\'s hold creates defensive line' 
  },
  'sigma-orisa': {
    reasonZh: '西格玛的护盾配合奥丽莎的控制能形成坚固防线', 
    reasonEn: 'Sigma\'s shield + Orisa\'s control = solid defense' 
  },
  'baptiste-orisa': {
    reasonZh: '巴蒂斯特的免死保护奥丽莎的架枪位置', 
    reasonEn: 'Baptiste\'s immortality protects Orisa\'s set-up position' 
  },
  'hanzo-orisa': {
    reasonZh: '半藏的视野箭帮助奥丽莎发现远处目标', 
    reasonEn: 'Hanzo\'s sonar helps Orisa spot distant targets' 
  },

  // 拉玛刹的最佳拍档
  'kiriko-ramattra': { 
    reasonZh: '拉玛刹开启涅槃形态时需要快速治疗，雾子及时支援', 
    reasonEn: 'Kiriko provides quick healing during Ramattra\'s Nemesis form' 
  },
  'zenyatta-ramattra': { 
    reasonZh: '禅雅塔的增伤让拉玛刹的AOE伤害更致命', 
    reasonEn: 'Zenyatta\'s boost makes Ramattra\'s AOE damage lethal' 
  },
  'hanzo-ramattra': { 
    reasonZh: '半藏的视野箭能帮助拉玛刹发现远处的威胁', 
    reasonEn: 'Hanzo\'s sonar arrow helps Ramattra spot distant threats' 
  },
  'zarya-ramattra': {
    reasonZh: '查莉娅配合拉玛刹形成强力前排', 
    reasonEn: 'Zarya pairs well with Ramattra for strong frontline' 
  },

  // 莱因哈特的最佳拍档
  'zarya-reinhardt': { 
    reasonZh: '查莉娅的能量越高伤害越高，大锤冲锋后接引力弹能秒人', 
    reasonEn: 'High-energy Zarya + Reinhardt charge = guaranteed eliminations' 
  },
  'kiriko-reinhardt': { 
    reasonZh: '雾子的免死保护冲锋后的大锤不被秒倒', 
    reasonEn: 'Kiriko\'s Suzu protects Reinhardt after charging in' 
  },
  'baptiste-reinhardt': { 
    reasonZh: '巴蒂斯特的护盾矩阵能保护大锤冲锋时的安全', 
    reasonEn: 'Baptiste\'s matrix protects Reinhardt during charges' 
  },
  'brigitte-reinhardt': {
    reasonZh: '布丽吉塔的击晕配合大锤冲锋能打出完美Combo', 
    reasonEn: 'Brigitte\'s stun + Reinhardt charge = perfect combo' 
  },
  'reaper-reinhardt': {
    reasonZh: '死神配合大锤冲锋能快速击杀', 
    reasonEn: 'Reaper follows Reinhardt charge for quick kills' 
  },

  // 路霸的最佳拍档
  'kiriko-roadhog': { 
    reasonZh: '路霸的钩子需要治疗保障才有信心持续先手', 
    reasonEn: 'Kiriko enables Roadhog\'s aggressive hook plays' 
  },
  'junkrat-roadhog': { 
    reasonZh: '狂鼠的地雷配合路霸的钩子，能打出意想不到的Combo', 
    reasonEn: 'Junkrat\'s mines + Roadhog\'s hook creates unexpected combos' 
  },
  'cassidy-roadhog': { 
    reasonZh: '卡西迪的磁雷能留住被路霸钩中的敌人', 
    reasonEn: 'Cassidy\'s grenade secures Roadhog\'s hook targets' 
  },
  'zarya-roadhog': {
    reasonZh: '查莉娅的护盾保护路霸的钩子先手', 
    reasonEn: 'Zarya\'s bubble protects Roadhog\'s hook plays' 
  },

  // 西格玛的最佳拍档
  'kiriko-sigma': { 
    reasonZh: '西格玛需要位移来调整位置，雾子提供灵活支援', 
    reasonEn: 'Kiriko enables Sigma\'s repositioning playstyle' 
  },
  'zenyatta-sigma': { 
    reasonZh: '禅雅塔的增伤让西格玛的实验性伤害更具威胁', 
    reasonEn: 'Zenyatta\'s boost makes Sigma\'s damage more threatening' 
  },
  'cassidy-sigma': { 
    reasonZh: '卡西迪的中距离输出弥补西格玛的输出空窗期', 
    reasonEn: 'Cassidy covers Sigma\'s damage gaps at mid-range' 
  },
  'baptiste-sigma': {
    reasonZh: '巴蒂斯特的免死保护西格玛的输出位置', 
    reasonEn: 'Baptiste\'s immortality protects Sigma\'s positioning' 
  },
  'bastion-sigma': {
    reasonZh: '西格玛护盾保护架枪状态的堡垒', 
    reasonEn: 'Sigma\'s shield protects stationary Bastion' 
  },

  // 温斯顿的最佳拍档
  'kiriko-winston': { 
    reasonZh: '温斯顿跳入敌阵时，雾子的治疗和位移能保障生存', 
    reasonEn: 'Kiriko enables Winston\'s diving strategy' 
  },
  'genji-winston': { 
    reasonZh: '源氏和温斯顿都是高机动切入，配合集火效果极佳', 
    reasonEn: 'Both divers - Winston dives, Genji cleans up' 
  },
  'tracer-winston': { 
    reasonZh: '猎空的高机动配合温斯顿的跳跃，能快速转移战场', 
    reasonEn: 'Both highly mobile - Winston jumps, Tracer blinks' 
  },
  'zarya-winston': {
    reasonZh: '查莉娅的护盾保护温斯顿的切入', 
    reasonEn: 'Zarya\'s bubble protects Winston\'s dives' 
  },
  'dva-winston': {
    reasonZh: 'D.Va配合温斯顿形成双跳，敌方后排难以应对', 
    reasonEn: 'D.Va + Winston double dive overwhelms backline' 
  },

  // 破坏球的最佳拍档
  'kiriko-wrecking_ball': { 
    reasonZh: '破坏球需要持续位移和治疗来维持高机动性骚扰', 
    reasonEn: 'Kiriko enables Wrecking Ball\'s ballsy plays' 
  },
  'zenyatta-wrecking_ball': { 
    reasonZh: '禅雅塔的增伤让破坏球的AOE伤害更可观', 
    reasonEn: 'Zenyatta\'s boost makes Wrecking Ball\'s AOE impactful' 
  },
  'genji-wrecking_ball': { 
    reasonZh: '源氏能跟进破坏球的入场进行收割', 
    reasonEn: 'Genji can follow Wrecking Ball\'s engage for cleanup' 
  },
  'zarya-wrecking_ball': {
    reasonZh: '查莉娅的护盾保护破坏球的入场', 
    reasonEn: 'Zarya\'s bubble protects Wrecking Ball\'s engage' 
  },

  // 查莉娅的最佳拍档
  'kiriko-zarya': { 
    reasonZh: '查莉娅需要治疗来维持高能量，雾子提供稳定支援', 
    reasonEn: 'Kiriko maintains Zarya\'s high energy with consistent healing' 
  },
  'genji-zarya': { 
    reasonZh: '引力弹道控住敌人后，源氏跟进输出完成收割', 
    reasonEn: 'Graviton Surge + Genji dash = eliminations' 
  },
  'reaper-zarya': { 
    reasonZh: '查莉娅控场，死神入场收割，配合简单高效', 
    reasonEn: 'Zarya sets up, Reaper cleans up - simple and effective' 
  },

  // 金驭的最佳拍档
  'kiriko-jinyu': { 
    reasonZh: '金驭需要前排治疗保障，雾子提供及时位移支援', 
    reasonEn: 'Kiriko provides mobile healing for Jinyu\'s front-line play' 
  },
  'genji-jinyu': { 
    reasonZh: '高机动的Genji配合金驭的控制能快速建立优势', 
    reasonEn: 'High mobility Genji + Jinyu\'s control = quick advantages' 
  },
  'cassidy-jinyu': { 
    reasonZh: '卡西迪的远程输出弥补金驭的输出空缺', 
    reasonEn: 'Cassidy covers Jinyu\'s damage gaps at range' 
  },

  // ========== Damage heroes 最佳拍档理由 ==========
  // 艾什的最佳拍档
  'zarya-ashe': { 
    reasonZh: '查莉娅的护盾能保护艾什架枪时的安全', 
    reasonEn: 'Zarya\'s bubble protects Ashe while she\'s set up' 
  },
  'baptiste-ashe': { 
    reasonZh: '巴蒂斯特的免死保护艾什不被切入秒杀', 
    reasonEn: 'Baptiste\'s immortality protects Ashe from flankers' 
  },
  'zenyatta-ashe': { 
    reasonZh: '禅雅塔的增伤让艾什的狙击伤害更致命', 
    reasonEn: 'Zenyatta\'s Discord makes Ashe\'s snipes lethal' 
  },
  'sigma-ashe': {
    reasonZh: '西格玛的护盾保护艾什的架枪位置', 
    reasonEn: 'Sigma\'s shield protects Ashe\'s positioning' 
  },
  'orisa-ashe': {
    reasonZh: '奥丽莎的保护配合艾什的高点输出', 
    reasonEn: 'Orisa\'s protection enables Ashe\'s high ground dominance' 
  },

  // 堡垒的最佳拍档
  'sigma-bastion': { 
    reasonZh: '西格玛的护盾能保护架枪状态的堡垒', 
    reasonEn: 'Sigma\'s shield protects stationary Bastion' 
  },
  'orisa-bastion': { 
    reasonZh: '奥丽莎的坚毅挡控保护堡垒架枪时的安全', 
    reasonEn: 'Orisa\'s Fortify protects Bastion while turreted' 
  },
  'baptiste-bastion': { 
    reasonZh: '巴蒂斯特的免死矩阵能让堡垒完成架枪输出的关键时机', 
    reasonEn: 'Baptiste\'s matrix gives Bastion crucial setup time' 
  },
  'zarya-bastion': {
    reasonZh: '查莉娅的护盾保护堡垒的架枪位置', 
    reasonEn: 'Zarya\'s bubble protects Bastion\'s positioning' 
  },

  // 卡西迪的最佳拍档
  'zarya-cassidy': { 
    reasonZh: '查莉娅的能量高时配合卡西迪能快速击杀前排', 
    reasonEn: 'High-energy Zarya + Cassidy = quick tank kills' 
  },
  'kiriko-cassidy': { 
    reasonZh: '雾子的治疗保护中距离输出的卡西迪', 
    reasonEn: 'Kiriko protects Cassidy\'s mid-range positioning' 
  },
  'baptiste-cassidy': { 
    reasonZh: '巴蒂斯特的治疗和位移让卡西迪更敢主动出击', 
    reasonEn: 'Baptiste enables Cassidy\'s aggressive plays' 
  },
  'ana-cassidy': {
    reasonZh: '安娜的纳米激素增强卡西迪的输出', 
    reasonEn: 'Ana\'s Nano boosts Cassidy\'s damage' 
  },
  'brigitte-cassidy': {
    reasonZh: '布丽吉塔的击晕帮助卡西迪留住敌人', 
    reasonEn: 'Brigitte\'s stun helps Cassidy secure kills' 
  },

  // 回声的最佳拍档
  'dva-echo': { 
    reasonZh: 'D.Va的矩阵能保护回声飞行时的脆弱期', 
    reasonEn: 'D.Va\'s matrix protects Echo while flying' 
  },
  'kiriko-echo': { 
    reasonZh: '雾子和回声都是高机动，配合切入收割效果极佳', 
    reasonEn: 'Both highly mobile - Kiriko enables Echo\'s dives' 
  },
  'zenyatta-echo': { 
    reasonZh: '禅雅塔的增伤让回声的爆发伤害更高', 
    reasonEn: 'Zenyatta\'s boost makes Echo\'s burst damage lethal' 
  },
  'genji-echo': {
    reasonZh: '源氏配合回声高机动切入收割', 
    reasonEn: 'Genji follows Echo\'s high mobility for cleanup' 
  },

  // 源氏的最佳拍档
  'zarya-genji': { 
    reasonZh: '查莉娅的引力弹道控住后，源氏跟进龙刃收割', 
    reasonEn: 'Graviton Surge + Genji blade = ultimate combo' 
  },
  'zenyatta-genji': { 
    reasonZh: '禅雅塔的增伤让源氏的龙刃伤害爆表', 
    reasonEn: 'Zenyatta\'s Discord makes Genji\'s blade lethal' 
  },
  'kiriko-genji': { 
    reasonZh: '雾子的治疗和位移与源氏的高机动完美契合', 
    reasonEn: 'Kiriko enables Genji\'s aggressive dive strategy' 
  },
  'ana-genji': {
    reasonZh: '安娜的纳米激素增强源氏龙刃伤害', 
    reasonEn: 'Ana\'s Nano boosts Genji\'s blade damage' 
  },
  'dva-genji': {
    reasonZh: 'D.Va矩阵保护源氏的切入', 
    reasonEn: 'D.Va matrix protects Genji\'s dives' 
  },

  // 半藏的最佳拍档
  'zarya-hanzo': { 
    reasonZh: '半藏的视野箭配合查莉娅的能量能快速充能', 
    reasonEn: 'Hanzo\'s sonic + Zarya\'s energy = fast ultimate charge' 
  },
  'zenyatta-hanzo': { 
    reasonZh: '禅雅塔的增伤显著提升半藏的爆发伤害', 
    reasonEn: 'Zenyatta\'s Discord makes Hanzo\'s burst devastating' 
  },
  'kiriko-hanzo': { 
    reasonZh: '雾子保护半藏在中远距离的输出位置', 
    reasonEn: 'Kiriko protects Hanzo\'s long-range position' 
  },
  'widowmaker-hanzo': {
    reasonZh: '黑百合和半藏形成双狙击，压制力极强', 
    reasonEn: 'Widow + Hanzo double sniper = overwhelming pressure' 
  },

  // 狂鼠的最佳拍档
  'zarya-junkrat': { 
    reasonZh: '查莉娅控场后，狂鼠的轮胎能造成巨额AOE伤害', 
    reasonEn: 'Zarya\'s Graviton + Junkrat\'s tire = massive AOE' 
  },
  'kiriko-junkrat': { 
    reasonZh: '雾子的治疗保障狂鼠在前排的持续输出', 
    reasonEn: 'Kiriko enables Junkrat\'s aggressive positioning' 
  },
  'baptiste-junkrat': { 
    reasonZh: '巴蒂斯特的免死让狂鼠完成关键埋雷', 
    reasonEn: 'Baptiste\'s immortality protects Junkrat\'s mine plays' 
  },

  // 法老之鹰的最佳拍档
  'mercy-pharah': { 
    reasonZh: '天使的升降和增伤是法老之鹰的经典标配组合', 
    reasonEn: 'Mercy\'s mobility and boost are Pharah\'s classic synergy' 
  },
  'kiriko-pharah': { 
    reasonZh: '雾子的位移能跟上法老之鹰的飞行节奏', 
    reasonEn: 'Kiriko can keep up with Pharah\'s flight path' 
  },
  'zenyatta-pharah': { 
    reasonZh: '禅雅塔的增伤让法老之鹰的火箭伤害爆表', 
    reasonEn: 'Zenyatta\'s Discord makes Pharah\'s rockets lethal' 
  },
  'baptiste-pharah': {
    reasonZh: '巴蒂斯特的免死保护法老之鹰的飞行', 
    reasonEn: 'Baptiste\'s immortality protects Pharah in air' 
  },

  // 死神的最佳拍档
  'zarya-reaper': { 
    reasonZh: '查莉娅控场后，死神入场收割残血', 
    reasonEn: 'Zarya sets up, Reaper cleans up low HP targets' 
  },
  'kiriko-reaper': { 
    reasonZh: '雾子的免死保护死神入场后的生存', 
    reasonEn: 'Kiriko\'s Suzu protects Reaper after wraith in' 
  },
  'zenyatta-reaper': { 
    reasonZh: '禅雅塔的增伤让死神的近战爆发更高', 
    reasonEn: 'Zenyatta\'s Discord makes Reaper\'s melee lethal' 
  },
  'moira-reaper': {
    reasonZh: '莫伊拉的治疗保障死神的持续作战', 
    reasonEn: 'Moira\'s healing enables Reaper\'s sustained fights' 
  },

  // 士兵76的最佳拍档
  'kiriko-soldier76': { 
    reasonZh: '雾子的位移能让士兵76保持灵活游击', 
    reasonEn: 'Kiriko enables Soldier\'s hit-and-run tactics' 
  },
  'baptiste-soldier76': { 
    reasonZh: '巴蒂斯特的治疗和免死保障士兵76的持续作战', 
    reasonEn: 'Baptiste enables Soldier\'s sustained fighting' 
  },
  'zenyatta-soldier76': { 
    reasonZh: '禅雅塔的增伤提升士兵76的T裸射伤害', 
    reasonEn: 'Zenyatta\'s Discord boosts Soldier\'s rifle damage' 
  },
  'ana-soldier76': {
    reasonZh: '安娜的纳米激素增强士兵76的输出', 
    reasonEn: 'Ana\'s Nano boosts Soldier\'s damage' 
  },

  // 索杰恩的最佳拍档
  'dva-sojourn': { 
    reasonZh: 'D.Va的矩阵能保护索杰恩充能右键', 
    reasonEn: 'D.Va\'s matrix protects Sojourn charging railgun' 
  },
  'kiriko-sojourn': { 
    reasonZh: '雾子的治疗保护索杰恩的侧面输出位置', 
    reasonEn: 'Kiriko protects Sojourn\'s flank positioning' 
  },
  'zenyatta-sojourn': { 
    reasonZh: '禅雅塔的增伤让索杰恩的右键秒杀线更高', 
    reasonEn: 'Zenyatta\'s Discord raises Sojourn\'s one-shot threshold' 
  },
  'zarya-sojourn': {
    reasonZh: '查莉娅配合索杰恩能快速充能', 
    reasonEn: 'Zarya helps Sojourn charge railgun quickly' 
  },

  // 秩序之光的最佳拍档
  'zarya-symmetra': { 
    reasonZh: '秩序之光需要前排保护，查莉娅的护盾刚好合适', 
    reasonEn: 'Zarya\'s bubble protects Symmetra\'s setup' 
  },
  'kiriko-symmetra': { 
    reasonZh: '雾子保护秩序之光架设传送门时的安全', 
    reasonEn: 'Kiriko protects Symmetra while setting up' 
  },
  'zenyatta-symmetra': { 
    reasonZh: '禅雅塔增伤秩序之光的光子球伤害', 
    reasonEn: 'Zenyatta\'s Discord boosts Symmetra\'s orb damage' 
  },

  // 托比昂的最佳拍档
  'zarya-torbjorn': { 
    reasonZh: '查莉娅的护盾能保护托比昂架设炮台', 
    reasonEn: 'Zarya\'s bubble protects Torbjorn\'s turret setup' 
  },
  'kiriko-torbjorn': { 
    reasonZh: '雾子的治疗保护托比昂的近战骚扰打法', 
    reasonEn: 'Kiriko protects Torbjorn\'s aggressive playstyle' 
  },
  'baptiste-torbjorn': { 
    reasonZh: '巴蒂斯特的免死保护托比昂的关键炮台', 
    reasonEn: 'Baptiste\'s matrix protects critical turrets' 
  },

  // 猎空的最佳拍档
  'zarya-tracer': { 
    reasonZh: '查莉娅的引力弹道能帮助猎空完成定点秒杀', 
    reasonEn: 'Graviton Surge + Tracer blink = guaranteed picks' 
  },
  'zenyatta-tracer': { 
    reasonZh: '禅雅塔的增伤让猎空的爆发更高', 
    reasonEn: 'Zenyatta\'s Discord makes Tracer\'s burst lethal' 
  },
  'kiriko-tracer': { 
    reasonZh: '雾子的治疗和位移与猎空的高机动完美配合', 
    reasonEn: 'Kiriko enables Tracer\'s aggressive blink plays' 
  },

  // 探奇的最佳拍档
  'kiriko-venture': { 
    reasonZh: '雾子保护探奇切入后的脆弱期', 
    reasonEn: 'Kiriko protects Venture after burrowing in' 
  },
  'zenyatta-venture': { 
    reasonZh: '禅雅塔增伤探奇的爆发伤害', 
    reasonEn: 'Zenyatta\'s Discord boosts Venture\'s burst' 
  },
  'genji-venture': { 
    reasonZh: '源氏能跟进探奇的入场进行双切入', 
    reasonEn: 'Genji follows Venture\'s engage for double dive' 
  },

  // 黑百合的最佳拍档
  'zarya-widowmaker': { 
    reasonZh: '查莉娅的护盾能保护黑百合架枪时的安全', 
    reasonEn: 'Zarya\'s bubble protects Widowmaker while scoped' 
  },
  'kiriko-widowmaker': { 
    reasonZh: '雾子治疗和保护黑百合的远距离狙击位置', 
    reasonEn: 'Kiriko protects Widowmaker\'s long-range position' 
  },
  'zenyatta-widowmaker': { 
    reasonZh: '禅雅塔的增伤让黑百合的秒杀线更高', 
    reasonEn: 'Zenyatta\'s Discord raises Widowmaker\'s one-shot threshold' 
  },

  // 芙蕾雅的最佳拍档
  'kiriko-freja': { 
    reasonZh: '雾子帮助滞空输出的芙蕾雅保持生存', 
    reasonEn: 'Kiriko enables Freja\'s aerial DPS strategy' 
  },
  'zenyatta-freja': { 
    reasonZh: '禅雅塔增伤芙蕾雅的十字弩伤害', 
    reasonEn: 'Zenyatta\'s Discord boosts Freja\'s crossbow damage' 
  },
  'genji-freja': { 
    reasonZh: '源氏能保护滞空的芙蕾雅免受敌方切入', 
    reasonEn: 'Genji protects aerial Freja from flankers' 
  },

  // 斩仇的最佳拍档
  'dva-vendetta': { 
    reasonZh: 'D.Va矩阵能保护斩仇入场后的安全', 
    reasonEn: 'D.Va\'s matrix protects Vendetta after diving in' 
  },
  'widowmaker-vendetta': { 
    reasonZh: '黑百合远距离狙击压低血线，斩仇收割', 
    reasonEn: 'Widowmaker weakens targets, Vendetta cleans up' 
  },
  'hanzo-vendetta': { 
    reasonZh: '半藏的视野箭发现远处目标，斩仇快速切入', 
    reasonEn: 'Hanzo\'s sonar reveals targets, Vendetta dives' 
  },

  // 安燃的最佳拍档
  'dva-anran': { 
    reasonZh: 'D.Va的高机动性能让安燃安全转移位置', 
    reasonEn: 'D.Va enables Anran\'s aggressive repositioning' 
  },
  'genji-anran': { 
    reasonZh: '源氏和安燃都是高机动，能形成交叉火力', 
    reasonEn: 'Both divers - Genji and Anran create crossfire' 
  },
  'tracer-anran': { 
    reasonZh: '猎空和安燃的高机动配合能快速建立人数优势', 
    reasonEn: 'Both highly mobile - quick number advantage' 
  },

  // 埃姆雷的最佳拍档
  'kiriko-emrey': { 
    reasonZh: '雾子保护埃姆雷的近战打法', 
    reasonEn: 'Kiriko enables Emrey\'s aggressive playstyle' 
  },
  'zenyatta-emrey': { 
    reasonZh: '禅雅塔增伤埃姆雷的AOE伤害', 
    reasonEn: 'Zenyatta\'s Discord boosts Emrey\'s AOE damage' 
  },
  'genji-emrey': { 
    reasonZh: '源氏能配合埃姆雷的双切入战术', 
    reasonEn: 'Genji complements Emrey\'s double-dive strategy' 
  },

  // 安娜的最佳拍档
  'dva-ana': { 
    reasonZh: 'D.Va的高机动性能让安娜安全转移位置', 
    reasonEn: 'D.Va enables Ana\'s safe repositioning' 
  },
  'reinhardt-ana': { 
    reasonZh: '莱因哈特的护盾能保护安娜的安全狙击环境', 
    reasonEn: 'Reinhardt\'s shield creates safe sniping space' 
  },
  'zarya-ana': { 
    reasonZh: '查莉娅的护盾能保护安娜不被秒倒', 
    reasonEn: 'Zarya\'s bubble protects Ana from being picked' 
  },
  'sigma-ana': {
    reasonZh: '西格玛的护盾保护安娜的狙击位置', 
    reasonEn: 'Sigma\'s shield protects Ana\'s sniping position' 
  },

  // 巴蒂斯特的最佳拍档
  'dva-baptiste': { 
    reasonZh: 'D.Va的矩阵能保护巴蒂斯特开大时的安全', 
    reasonEn: 'D.Va protects Baptiste during his ultimate' 
  },
  'reinhardt-baptiste': { 
    reasonZh: '莱因哈特的冲锋配合巴蒂斯特的高塔输出', 
    reasonEn: 'Reinhardt charges in, Baptiste provides high ground DPS' 
  },
  'cassidy-baptiste': { 
    reasonZh: '卡西迪的中距离输出弥补巴蒂斯特的输出空缺', 
    reasonEn: 'Cassidy covers Baptiste\'s mid-range gaps' 
  },
  'soldier76-baptiste': {
    reasonZh: '士兵76配合巴蒂斯特形成双DPS', 
    reasonEn: 'Soldier pairs with Baptiste for double DPS' 
  },
  'orisa-baptiste': {
    reasonZh: '奥丽莎配合巴蒂斯特形成双前排', 
    reasonEn: 'Orisa pairs with Baptiste for double tank' 
  },

  // 布丽吉塔的最佳拍档
  'dva-brigitte': { 
    reasonZh: 'D.Va配合布丽吉塔的前排压制', 
    reasonEn: 'D.Va enables Brigitte\'s aggressive frontline play' 
  },
  'reinhardt-brigitte': { 
    reasonZh: '大锤冲锋后布丽吉塔跟进击晕，完成Combo', 
    reasonEn: 'Reinhardt charges, Brigitte follows for stun combo' 
  },
  'zarya-brigitte': { 
    reasonZh: '查莉娅和布丽吉塔都是前排，形成强力阵线', 
    reasonEn: 'Zarya + Brigitte create strong frontline' 
  },
  'tracer-brigitte': {
    reasonZh: '猎空配合布丽吉塔的前排压制', 
    reasonEn: 'Tracer pairs with Brigitte for aggressive frontline' 
  },

  // 雾子的最佳拍档
  'dva-kiriko': { 
    reasonZh: 'D.Va的高机动配合雾子，能快速支援各路', 
    reasonEn: 'D.Va + Kiriko enables rapid rotation support' 
  },
  'genji-kiriko': { 
    reasonZh: '源氏和雾子都是高机动，配合切入效果极佳', 
    reasonEn: 'Both highly mobile - Genji dives, Kiriko heals' 
  },
  'tracer-kiriko': { 
    reasonZh: '猎空和雾子的高机动组合能快速建立优势', 
    reasonEn: 'High mobility duo - quick advantage generation' 
  },
  'winston-kiriko': {
    reasonZh: '温斯顿跳入敌阵时雾子能及时治疗', 
    reasonEn: 'Kiriko enables Winston\'s diving strategy' 
  },
  'doomfist-kiriko': {
    reasonZh: '雾子保护铁拳的突进', 
    reasonEn: 'Kiriko protects Doomfist\'s engages' 
  },

  // 生命之梭的最佳拍档
  'dva-lifeweaver': { 
    reasonZh: 'D.Va保护生命之梭的站位，花男安心辅助', 
    reasonEn: 'D.Va protects Lifeweaver\'s positioning' 
  },
  'genji-lifeweaver': { 
    reasonZh: '源氏切入后，生命之梭能及时拉人', 
    reasonEn: 'Lifeweaver can rez Genji after aggressive dives' 
  },
  'cassidy-lifeweaver': { 
    reasonZh: '卡西迪的中距离压制配合生命之梭的远程辅助', 
    reasonEn: 'Cassidy pressure + Lifeweaver range support' 
  },
  'mei-lifeweaver': {
    reasonZh: '小美的冰墙配合花男的花瓣平台能创造超高狙击点', 
    reasonEn: 'Mei ice wall + Lifeweaver platform = ultra high ground' 
  },

  // 卢西奥的最佳拍档
  'dva-lucio': { 
    reasonZh: 'D.Va配合卢西奥的加速，能快速转场', 
    reasonEn: 'D.Va + Lucio speed = rapid repositioning' 
  },
  'genji-lucio': { 
    reasonZh: '源氏和卢西奥的高机动，能形成快速支援', 
    reasonEn: 'High mobility duo - Genji + Lucio speed' 
  },
  'tracer-lucio': { 
    reasonZh: '猎空和卢西奥的加速能打出灵活的游击战', 
    reasonEn: 'Speed combo - Tracer + Lucio hit-and-run' 
  },
  'winston-lucio': {
    reasonZh: '温斯顿配合卢西奥加速能快速转移', 
    reasonEn: 'Winston + Lucio speed = rapid rotation' 
  },

  // 天使的最佳拍档
  'pharah-mercy': { 
    reasonZh: '天使的升降是法老之鹰的经典标配', 
    reasonEn: 'Mercy\'s mobility is Pharah\'s classic synergy' 
  },
  'echo-mercy': { 
    reasonZh: '回声飞行时，天使能安全跟进增伤', 
    reasonEn: 'Mercy can keep up with Echo\'s flight' 
  },
  'widowmaker-mercy': { 
    reasonZh: '天使保护黑百合的狙击位置不被切入', 
    reasonEn: 'Mercy protects Widowmaker\'s sniping position' 
  },
  'genji-mercy': {
    reasonZh: '天使保护源氏的切入位置', 
    reasonEn: 'Mercy protects Genji\'s positioning' 
  },
  'tracer-mercy': {
    reasonZh: '天使保护猎空的侧翼', 
    reasonEn: 'Mercy protects Tracer\'s flanks' 
  },

  // 莫伊拉的最佳拍档
  'dva-moira': { 
    reasonZh: 'D.Va配合莫伊拉的高机动治疗，能持续作战', 
    reasonEn: 'D.Va + Moira enables sustained fighting' 
  },
  'reinhardt-moira': { 
    reasonZh: '大锤冲锋时，莫伊拉能及时提供治疗', 
    reasonEn: 'Moira heals Reinhardt during charges' 
  },
  'zarya-moira': { 
    reasonZh: '查莉娅需要持续治疗来维持高能量', 
    reasonEn: 'Moira maintains Zarya\'s high energy' 
  },
  'roadhog-moira': {
    reasonZh: '路霸配合莫伊拉形成强力前排', 
    reasonEn: 'Roadhog + Moira = strong frontline' 
  },

  // 禅雅塔的最佳拍档
  'genji-zenyatta': { 
    reasonZh: '源氏的龙刃配合禅雅塔的增伤，能瞬间清场', 
    reasonEn: 'Genji blade + Discord orb = team wipe' 
  },
  'tracer-zenyatta': { 
    reasonZh: '禅雅塔的增伤让猎空的爆发更高', 
    reasonEn: 'Zenyatta\'s Discord makes Tracer burst lethal' 
  },
  'dva-zenyatta': { 
    reasonZh: 'D.Va保护禅雅塔的站位，矩阵吸收伤害', 
    reasonEn: 'D.Va protects Zenyatta\'s positioning' 
  },
  'winston-zenyatta': {
    reasonZh: '温斯顿配合禅雅塔能保护后排', 
    reasonEn: 'Winston + Zenyatta protects backline' 
  },

  // 无漾的最佳拍档
  'dva-wuyang': { 
    reasonZh: 'D.Va配合无漾的控制，能快速先手', 
    reasonEn: 'D.Va enables Wuyang\'s aggressive CC plays' 
  },
  'widowmaker-wuyang': { 
    reasonZh: '黑百合远距离狙击压血线，无漾跟进控制', 
    reasonEn: 'Widowmaker weakens, Wuyang follows with CC' 
  },
  'hanzo-wuyang': { 
    reasonZh: '半藏视野箭发现目标，无漾快速切入', 
    reasonEn: 'Hanzo reveals, Wuyang quickly follows up' 
  },

  // 瑞稀的最佳拍档
  'dva-ruixi': { 
    reasonZh: 'D.Va高机动配合瑞稀的位移，能快速转场', 
    reasonEn: 'D.Va + Ruixi enables rapid rotation' 
  },
  'genji-ruixi': { 
    reasonZh: '源氏和瑞稀双切入，能快速秒杀后排', 
    reasonEn: 'Genji + Ruixi double dive = quick backline picks' 
  },
  'tracer-ruixi': { 
    reasonZh: '猎空和瑞稀的高机动配合能建立人数优势', 
    reasonEn: 'High mobility duo - quick number advantage' 
  },

  // 黑影的最佳拍档
  'zarya-sombra': {
    reasonZh: '查莉娅配合黑影的黑客入侵能快速击杀', 
    reasonEn: 'Zarya + Sombra hack = quick eliminations' 
  },
  'genji-sombra': {
    reasonZh: '源氏配合黑影的黑客入侵能形成双重威胁', 
    reasonEn: 'Genji + Sombra double threat' 
  },
  'tracer-sombra': {
    reasonZh: '猎空配合黑影形成双侧翼', 
    reasonEn: 'Tracer + Sombra double flank' 
  },

  // 小美的最佳拍档
  'zarya-mei': {
    reasonZh: '查莉娅配合小美的控制能形成Combo', 
    reasonEn: 'Zarya + Mei control combo' 
  },
  'baptiste-mei': {
    reasonZh: '巴蒂斯特的免死保护小美的关键技能', 
    reasonEn: 'Baptiste immortality protects Mei\'s key abilities' 
  },

  // 伊拉锐的最佳拍档
  'dva-illari': { 
    reasonZh: 'D.Va保护伊拉锐的太阳能位置', 
    reasonEn: 'D.Va protects Illari\'s sun spot positioning' 
  },
  'zarya-illari': { 
    reasonZh: '查莉娅的护盾能保护伊拉锐架设太阳能', 
    reasonEn: 'Zarya\'s bubble protects Illari while setting up' 
  },
  'genji-illari': { 
    reasonZh: '源氏能保护伊拉锐的侧翼安全', 
    reasonEn: 'Genji protects Illari\'s flank positioning' 
  },

  // 朱诺的最佳拍档
  'dva-juno': { 
    reasonZh: 'D.Va配合朱诺的加速圈，能快速转场', 
    reasonEn: 'D.Va + Juno speed ring = rapid repositioning' 
  },
  'genji-juno': { 
    reasonZh: '源氏配合朱诺的加速，能快速切入收割', 
    reasonEn: 'Genji + Juno speed = quick dive cleanup' 
  },
  'tracer-juno': { 
    reasonZh: '猎空配合朱诺的加速能达到超高机动', 
    reasonEn: 'Tracer + Juno speed ring = extreme mobility' 
  },
  'winston-juno': {
    reasonZh: '温斯顿配合朱诺加速能快速转移战场', 
    reasonEn: 'Winston + Juno speed = rapid rotation' 
  },

  // 飞天猫的最佳拍档
  'kiriko-feitianmao': { 
    reasonZh: '两位都是支援高机动，能快速互相支援', 
    reasonEn: 'Both mobile supports - mutual protection' 
  },
  'zenyatta-feitianmao': { 
    reasonZh: '禅雅塔增伤飞天猫的输出', 
    reasonEn: 'Zenyatta\'s Discord boosts Feitianmao\'s damage' 
  },
  'genji-feitianmao': { 
    reasonZh: '源氏能配合飞天猫进行双切入', 
    reasonEn: 'Genji follows Feitianmao for double dive' 
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
  sourceHeroId: string,
  targetHeroId: string,
  language: CounterLanguage = 'zh'
): string => {
  const key = `${sourceHeroId}-${targetHeroId}`;
  const reason = synergyReasons[key];
  
  if (!reason) {
    return language === 'zh' ? '配合默契，协同作战' : 'Great synergy and teamwork';
  }
  
  return language === 'zh' ? reason.reasonZh : reason.reasonEn;
};
