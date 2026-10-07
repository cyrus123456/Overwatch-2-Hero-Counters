// 守望先锋英雄技能数据
// 数据来源：暴雪官网 https://ow.blizzard.cn/heroes/ 各英雄详情页"技能"模块
// 通过 Playwright MCP 逐个点击技能图标抓取官方技能名称与描述（2026-09 抓取）
// 官网对卡西迪仅列出 3 项技能、毛加仅列出 4 项技能（部分武器并入主武器描述）

import type { HeroId } from './heroData';

export interface HeroSkill {
  /** 技能名称（官方简体中文） */
  name: string;
  /** 技能描述（官方简体中文） */
  desc: string;
}

export interface HeroSkillData {
  /** 官网英雄详情页地址 */
  source: string;
  skills: HeroSkill[];
}

export const heroSkills: Record<HeroId, HeroSkillData> = {
  // 坦克
  dva: {
    source: 'https://ow.blizzard.cn/heroes/dva/',
    skills: [
      { name: '聚变机炮', desc: '全自动近距离散射武器' },
      { name: '光枪', desc: '自动武器' },
      { name: '推进器', desc: '向你的正前方突进' },
      { name: '防御矩阵', desc: '挡住前方射来的飞射物' },
      { name: '微型飞弹', desc: '射出一连串高爆飞弹' },
      { name: '自毁', desc: '使机甲过载并将自己弹射出去，机甲会在短时间后爆炸' },
      { name: '呼叫机甲', desc: '呼叫一台全新的机甲' },
      { name: '弹射！', desc: '当机甲被摧毁时D.VA从中弹出' },
    ],
  },
  doomfist: {
    source: 'https://ow.blizzard.cn/heroes/doomfist/',
    skills: [
      { name: '手炮', desc: '可自动装弹的近距离散射武器' },
      { name: '火箭重拳', desc: '长按可蓄力向前冲锋并将一名敌人击退。将敌人拳击至墙面可造成更大伤害' },
      { name: '裂地重拳', desc: '跃起并重击地面' },
      { name: '悍猛格挡', desc: '格挡前方的攻击。格挡大量伤害后，强化火箭重拳' },
      { name: '毁天灭地', desc: '按下Q跃向空中。移动瞄准圈随后按下技能3发动攻击' },
    ],
  },
  hazard: {
    source: 'https://ow.blizzard.cn/heroes/hazard/',
    skills: [
      { name: '骨刺', desc: '发射一簇尖刺' },
      { name: '尖刺护体', desc: '格挡前方的攻击，向附近敌人发射追踪尖刺并恢复弹药' },
      { name: '狂跃', desc: '跃向前方。再次激活可劈砍敌人并将其击退。' },
      { name: '尖刺墙', desc: '发射一堵尖刺墙，对敌人造成伤害并击退。' },
      { name: '千针雨', desc: '降下一片尖刺雨，定身敌人' },
      { name: '翻越', desc: '攀爬矮墙并扒住边缘登上' },
    ],
  },
  junker_queen: {
    source: 'https://ow.blizzard.cn/heroes/junker-queen/',
    skills: [
      { name: '散弹枪', desc: '泵动式霰弹枪' },
      { name: '锯齿利刃', desc: '主动：投掷飞刀。再次使用可将其召回，并拉回被穿刺的敌人。被动：近身攻击或投掷会创伤敌人，造成持续伤害' },
      { name: '命令怒吼', desc: '为你和盟友提供临时生命值并提高移动速度' },
      { name: '血斩', desc: '创伤前方的所有敌人，造成持续伤害。每命中一名敌人都会降低冷却时间' },
      { name: '轰翻天', desc: '向前冲锋。创伤敌人，造成持续伤害并使其无法受到治疗' },
      { name: '狂血奔涌', desc: '创伤效果的持续伤害会治疗你' },
    ],
  },
  mauga: {
    source: 'https://ow.blizzard.cn/heroes/mauga/',
    skills: [
      { name: '蛮力冲撞', desc: '向前冲锋，重踏击飞敌人。冲锋时不可阻挡' },
      { name: '心脏过载', desc: '周围盟友受到的伤害降低，且造成伤害会恢复生命值' },
      { name: '狂战士', desc: '造成暴击伤害会获得临时生命值' },
      { name: '笼中斗', desc: '部署一面屏障将自己和敌人困在其中' },
    ],
  },
  orisa: {
    source: 'https://ow.blizzard.cn/heroes/orisa/',
    skills: [
      { name: '强化聚变驱动器', desc: '全自动热量式武器' },
      { name: '能量标枪', desc: '投出标枪，击晕并击退敌人。敌人撞墙时效果提升' },
      { name: '强固防御', desc: '获得临时生命值，降低受到的伤害并且不可阻挡。效果激活时，降低武器产生的热量' },
      { name: '标枪旋击', desc: '旋转标枪，可摧毁飞射物、阻挡近身攻击，击退敌人并提高前进速度' },
      { name: '撼地猛刺', desc: '困住并横扫敌人。获得强固防御效果。猛刺伤害随蓄力提升。按下Q可提前施放猛刺' },
    ],
  },
  ramattra: {
    source: 'https://ow.blizzard.cn/heroes/ramattra/',
    skills: [
      { name: '虚空加速器（智械形态）', desc: '发射一串粒子' },
      { name: '虚空屏障（智械形态）', desc: '在目标位置制造一面屏障' },
      { name: '猛拳（天罚形态）', desc: '出拳捶击，每次挥拳都会产生一道贯穿能量波' },
      { name: '吞噬漩涡', desc: '发射一枚能量球，在地面上生成一股减速漩涡，处于其中的敌人会受到伤害并被拽向地面' },
      { name: '诛', desc: '进入天罚形态并生成致命的粒子簇，痛击周围的敌人。只要敌人受到此效果伤害，效果持续时间就会延长' },
    ],
  },
  reinhardt: {
    source: 'https://ow.blizzard.cn/heroes/reinhardt/',
    skills: [
      { name: '火箭重锤', desc: '毁灭性的近战武器' },
      { name: '冲锋', desc: '向前冲锋并将一名敌人重击到墙上' },
      { name: '烈焰打击', desc: '射出一道炽热能量波' },
      { name: '屏障力场', desc: '按住可以展开一道正面能量屏障' },
      { name: '裂地猛击', desc: '击倒前方所有敌人' },
    ],
  },
  roadhog: {
    source: 'https://ow.blizzard.cn/heroes/roadhog/',
    skills: [
      { name: '爆裂枪', desc: '近距离二连发霰弹枪' },
      { name: '鸡飞狗跳', desc: '对面前的敌人造成伤害并将他们击退' },
      { name: '废品压缩器', desc: '吸收敌方射弹，压缩成一发废品爆裂弹' },
      { name: '链钩', desc: '将一个目标拉向身边' },
      { name: '呼吸器', desc: '治疗自己并降低受到的伤害' },
    ],
  },
  sigma: {
    source: 'https://ow.blizzard.cn/heroes/sigma/',
    skills: [
      { name: '超能之球', desc: '发射两团引力电荷，在一小段时间后爆炸，造成范围伤害' },
      { name: '动能俘获', desc: '阻挡从前方飞向你的子弹，并将它们转化成额外生命值' },
      { name: '质量吸附', desc: '汇聚一团物质投向敌人，将对方击倒' },
      { name: '实验屏障', desc: '按下按键可以制造出悬浮的屏障向外飞出，松开按键使其停止。再次按下会将屏障召回到你身边' },
      { name: '引力乱流', desc: '操控引力，将敌人先举到空中然后砸向地面' },
    ],
  },
  winston: {
    source: 'https://ow.blizzard.cn/heroes/winston/',
    skills: [
      { name: '特斯拉炮', desc: '可攻击前方锥形范围的电能武器。长按充能，松开后射出集束电击' },
      { name: '喷射背包', desc: '向前跃向空中，着陆后对附近的敌人造成伤害' },
      { name: '屏障发射器', desc: '部署一个保护性能量罩' },
      { name: '原始暴怒', desc: '额外获得大量生命值，但只能跳跃和拳击敌人' },
    ],
  },
  wrecking_ball: {
    source: 'https://ow.blizzard.cn/heroes/wrecking-ball/',
    skills: [
      { name: '四联火炮', desc: '全自动冲锋武器' },
      { name: '工程抓钩', desc: '发射抓钩令铁球在所处区域内高速摆动。可高速撞击敌人造成伤害和击退效果' },
      { name: '动力铁球', desc: '变成球形，提高最大移动速度' },
      { name: '重力坠击', desc: '从空中向下发动猛击，将敌人击飞' },
      { name: '感应护盾', desc: '产生临时的额外生命值，附近敌人越多增加的生命值越多。可将部分额外生命值转移给盟友' },
      { name: '地雷禁区', desc: '部署一大片感应地雷' },
    ],
  },
  zarya: {
    source: 'https://ow.blizzard.cn/heroes/zarya/',
    skills: [
      { name: '粒子炮', desc: '近距离线性光束武器 / 可以射出能量炸弹的武器' },
      { name: '粒子屏障', desc: '在你周围生成伤害吸收屏障' },
      { name: '投射屏障', desc: '在盟友周围生成伤害吸收屏障' },
      { name: '重力喷涌', desc: '生成重力漩涡将敌人拉向中心' },
      { name: '能量转换', desc: '阻挡伤害可以提高粒子炮的伤害' },
    ],
  },
  domina: {
    source: 'https://ow.blizzard.cn/heroes/domina/',
    skills: [
      { name: '光子马格南', desc: '能汇聚为强力一击的中距离光束' },
      { name: '屏障阵列', desc: '构造一道分段式屏障' },
      { name: '爆能水晶', desc: '投出一枚爆能水晶，再次激活即可引爆' },
      { name: '音速斥力场', desc: '击退敌人，若击退至墙面还可将其击晕' },
      { name: '全景牢笼', desc: '发射一道高强度光束屏障囚禁敌人，消失时会引爆' },
    ],
  },
  dmon: {
    source: 'https://ow.blizzard.cn/heroes/dmon/',
    skills: [
      { name: '等离子剑', desc: '高速能量近战武器' },
      { name: '手提聚变连发枪', desc: '重机枪' },
      { name: '无极斩', desc: '施放横扫斩击，使自身获得过量生命值，并提高敌人受到的伤害' },
      { name: '呼叫机甲', desc: '重组机甲' },
      { name: '弹射！', desc: '当机甲被摧毁时，D.Mon从中弹出' },
      { name: '强力屏障', desc: '按住在前方展开一道能量屏障' },
      { name: '助推器', desc: '消耗燃料，向任意水平方向突进' },
      { name: '聚变连发枪', desc: '激活速射机枪' },
      { name: '突进刺击', desc: '展开强力屏障后可以向前疾冲，对敌人造成伤害并将其击退' },
    ],
  },

  // 输出
  ashe: {
    source: 'https://ow.blizzard.cn/heroes/ashe/',
    skills: [
      { name: '毒蛇', desc: '半自动步枪。长按可以开镜瞄准，提高射击的伤害与精度，但射速会变慢' },
      { name: '短筒猎枪', desc: '轰击你前方的敌人，同时使你自己后退' },
      { name: '延时雷管', desc: '投出一捆炸药，在短暂的延迟后爆炸，或者射击炸药立即将其引爆' },
      { name: '召唤鲍勃', desc: '派出鲍勃向前冲锋，将敌人击飞到空中，然后用手臂上的火炮攻击他们' },
    ],
  },
  bastion: {
    source: 'https://ow.blizzard.cn/heroes/bastion/',
    skills: [
      { name: '强攻模式', desc: '配有大火力轮转机枪的慢速坦克模式' },
      { name: '侦察模式', desc: '配有轻型高精度武器的机动模式' },
      { name: 'A-36战术榴弹', desc: '发射一枚炸弹，能在墙壁间反弹并在击中敌人或地面时爆炸' },
      { name: '切换模式', desc: '切换不同的作战模式' },
      { name: '火炮模式', desc: '进入固定状态，发射最多3枚火力强大的炮弹' },
    ],
  },
  cassidy: {
    source: 'https://ow.blizzard.cn/heroes/cassidy/',
    skills: [
      { name: '维和者', desc: '准确致命的左轮枪。射光剩余的所有子弹' },
      { name: '战术翻滚', desc: '向移动方向翻滚，降低所受伤害并装填子弹' },
      { name: '神射手', desc: '面对你的敌人。按下Q锁定目标，随后按下Q或技能3开枪' },
    ],
  },
  echo: {
    source: 'https://ow.blizzard.cn/heroes/echo/',
    skills: [
      { name: '三角射击', desc: '同时发射三发子弹，以三角形分布' },
      { name: '黏性炸弹', desc: '发射出一连串黏性炸弹，一段时间之后爆炸' },
      { name: '飞行', desc: '迅速向前飞行，然后可以在一小段时间内自由飞行' },
      { name: '聚焦光线', desc: '引导一道光束，持续数秒时间，对生命值低于一半的敌人造成大量伤害' },
      { name: '人格复制', desc: '选择一个敌方英雄，成为其复制。技能持续期间该目标无法更换英雄' },
      { name: '滑翔', desc: '下落时按下跳跃键可以滑翔' },
    ],
  },
  freja: {
    source: 'https://ow.blizzard.cn/heroes/freja/',
    skills: [
      { name: '速射弩', desc: '快速发射自动弩箭' },
      { name: '瞄准射击', desc: '减缓动势仔细瞄准，射出一支高速爆炸弩箭。使用疾冲可刷新瞄准射击' },
      { name: '疾冲', desc: '向移动方向疾冲并刷新瞄准射击' },
      { name: '上升气流', desc: '乘风向上飞起' },
      { name: '流星索', desc: '发射一枚爆炸流星索，击中敌人后将其束缚并拖拽周围的其他敌人' },
    ],
  },
  genji: {
    source: 'https://ow.blizzard.cn/heroes/genji/',
    skills: [
      { name: '镖', desc: '扔出3发精准的手里剑。向前方弧形范围扔出3发手里剑' },
      { name: '闪', desc: '格挡向你射来的飞射物并将其向你瞄准方向反弹回去，同时还能格挡近战攻击' },
      { name: '影', desc: '快速向前冲刺，对遇到的敌人造成伤害。消灭敌人可以重置冷却时间' },
      { name: '斩', desc: '致命的近战武器' },
      { name: '灵', desc: '可以爬墙和二段跳' },
    ],
  },
  hanzo: {
    source: 'https://ow.blizzard.cn/heroes/hanzo/',
    skills: [
      { name: '风', desc: '长按鼠标左键然后放开可以射得更远' },
      { name: '岚', desc: '接下来的5发箭矢可以弹射。瞬间发出但伤害降低' },
      { name: '音', desc: '击中后短时间内显示敌人位置' },
      { name: '跃', desc: '二段跳' },
      { name: '竜', desc: '召唤致命的天竜之魂吞噬遇到的所有敌人' },
      { name: '攀', desc: '跃上并沿着墙壁攀爬' },
    ],
  },
  junkrat: {
    source: 'https://ow.blizzard.cn/heroes/junkrat/',
    skills: [
      { name: '榴弹发射器', desc: '弹跳爆炸式弹道武器' },
      { name: '震荡地雷', desc: '按下左Shift扔出一个可以击退敌人的地雷，然后按下技能1引爆' },
      { name: '捕兽夹', desc: '放置一个可暂时使敌人失去行动能力的陷阱' },
      { name: '炸弹轮胎', desc: '操控并引爆一个会爆炸的轮胎' },
      { name: '临别礼物', desc: '爆炸不会对自己造成伤害，阵亡后丢下炸弹' },
    ],
  },
  mei: {
    source: 'https://ow.blizzard.cn/heroes/mei/',
    skills: [
      { name: '冰霜冲击枪', desc: '可以减速敌人的近距离范围喷射武器 / 射出远距离冰锥' },
      { name: '急冻', desc: '变为无敌并恢复生命值' },
      { name: '冰墙', desc: '在前方生成一堵冰墙' },
      { name: '暴雪', desc: '发射一台气候控制无人机，可以冰冻大范围内的敌人' },
    ],
  },
  pharah: {
    source: 'https://ow.blizzard.cn/heroes/pharah/',
    skills: [
      { name: '火箭发射器', desc: '远距离爆炸式弹道武器' },
      { name: '疾冲背包', desc: '沿水平方向推进' },
      { name: '推进背包', desc: '快速向上飞行，补充部分燃料' },
      { name: '震荡冲击', desc: '射出爆炸性冲击，击退敌人' },
      { name: '火箭弹幕', desc: '发射一连串致命的迷你火箭' },
      { name: '悬浮背包', desc: '长按可以悬浮在空中' },
    ],
  },
  reaper: {
    source: 'https://ow.blizzard.cn/heroes/reaper/',
    skills: [
      { name: '地狱火霰弹枪', desc: '近距离散射武器' },
      { name: '暗影步', desc: '传送至指定位置' },
      { name: '幽灵形态', desc: '移动更快且变为无敌状态，但无法射击' },
      { name: '死亡绽放', desc: '对附近所有敌人造成伤害' },
      { name: '收割', desc: '造成伤害可治疗自己' },
    ],
  },
  sojourn: {
    source: 'https://ow.blizzard.cn/heroes/sojourn/',
    skills: [
      { name: '电磁炮', desc: '快速射击子弹，命中后产生能量 / 消耗存储的能量，射出可以穿透敌人的强力一击' },
      { name: '机动滑铲', desc: '贴地滑铲猛冲。可提前高高跳起结束滑铲' },
      { name: '干扰弹', desc: '发射一道能量冲击波，对其中的敌人造成伤害' },
      { name: '机体超频', desc: '电磁炮在短时间内自动充能' },
    ],
  },
  soldier76: {
    source: 'https://ow.blizzard.cn/heroes/soldier-76/',
    skills: [
      { name: '重型脉冲步枪', desc: '全自动突击武器' },
      { name: '疾跑', desc: '快速向前移动' },
      { name: '生物力场', desc: '部署一个可以治疗自己和盟友的力场' },
      { name: '螺旋飞弹', desc: '射出一连串高爆飞弹' },
      { name: '战术目镜', desc: '自动瞄准视野范围内的敌人' },
    ],
  },
  symmetra: {
    source: 'https://ow.blizzard.cn/heroes/symmetra/',
    skills: [
      { name: '光子发射器', desc: '威力逐渐增强的近距离光束武器 / 长按充能，松开后射出会爆炸的能量球' },
      { name: '哨戒炮', desc: '部署一个小型炮台，对敌人造成伤害并使其减速' },
      { name: '传送面板', desc: '制造两个临时传送面板，可以在它们之间进行瞬间传送' },
      { name: '光子屏障', desc: '部署一个大型能量屏障' },
    ],
  },
  torbjorn: {
    source: 'https://ow.blizzard.cn/heroes/torbjorn/',
    skills: [
      { name: '铆钉枪', desc: '慢射速的远距离武器 / 火力强大但命中率不佳的近距离武器' },
      { name: '锻造锤', desc: '挥动锻造锤可以修理炮台或攻击敌人' },
      { name: '部署炮台', desc: '部署一个自动建造的炮台' },
      { name: '热力过载', desc: '获得额外生命值，同时提高攻击、移动及装弹速度' },
      { name: '熔火核心', desc: '在地上制造熔渣池，对敌人造成伤害。对护甲造成额外伤害' },
    ],
  },
  tracer: {
    source: 'https://ow.blizzard.cn/heroes/tracer/',
    skills: [
      { name: '脉冲双枪', desc: '近距离全自动武器' },
      { name: '闪现', desc: '传送至移动方向' },
      { name: '闪回', desc: '回到传送前的位置并恢复至当时的生命值' },
      { name: '脉冲炸弹', desc: '扔出一枚威力巨大的粘性炸弹' },
    ],
  },
  venture: {
    source: 'https://ow.blizzard.cn/heroes/venture/',
    skills: [
      { name: '智能挖掘钻', desc: '发射一枚震波弹，前进一小段距离后爆炸' },
      { name: '钻头突刺', desc: '在地上或地下向前突刺，击退敌人。在地下时加快冷却速度' },
      { name: '钻地', desc: '钻入地下，变为无敌状态。按下或长按左Shift钻出并伤害敌人' },
      { name: '地壳震击', desc: '发射能造成伤害的冲击波' },
    ],
  },
  widowmaker: {
    source: 'https://ow.blizzard.cn/heroes/widowmaker/',
    skills: [
      { name: '黑百合之吻', desc: '全自动突击武器。长按可以进行远距离狙击' },
      { name: '抓钩', desc: '射出抓钩并把自己拉向目标位置' },
      { name: '剧毒诡雷', desc: '射出一个剧毒陷阱' },
      { name: '红外侦测', desc: '为队友提供敌方位置情报' },
    ],
  },
  vendetta: {
    source: 'https://ow.blizzard.cn/heroes/vendetta/',
    skills: [
      { name: '帕拉蒂尼之牙', desc: '高强度光束巨剑。连击会以一记势大力沉的竖直劈斩收尾。' },
      { name: '招架姿态', desc: '举剑格挡，降低前方受到的伤害并招架近身攻击。格挡伤害会消耗能量。' },
      { name: '旋风疾步', desc: '向前猛冲并回旋劈斩。' },
      { name: '飞空斩击', desc: '向面朝方向扔出大剑，接着飞到剑旁。' },
      { name: '锋锐剑气', desc: '可在招架姿态激活时使用。消耗能量，发射一道宽幅能量波。' },
      { name: '斩地巨剑', desc: '蓄势猛劈，击破大部分防御，对前方的敌人造成巨量伤害。' },
    ],
  },
  anran: {
    source: 'https://ow.blizzard.cn/heroes/anran/',
    skills: [
      { name: '朱雀扇', desc: '能扇出炽烈火焰的折扇' },
      { name: '煽火风', desc: '能强化燃烧伤害的灼热狂风' },
      { name: '怒炎冲', desc: '向前疾行，对击中的敌人造成伤害' },
      { name: '熠闪舞', desc: '闪避所有伤害并攻击周围敌人' },
      { name: '朱羽焚', desc: '向前猛冲，击中时爆炸并立即点燃敌人' },
      { name: '朱魂返', desc: '阵亡时，在炽烈的爆炸中复生' },
    ],
  },
  emrey: {
    source: 'https://ow.blizzard.cn/heroes/emre/',
    skills: [
      { name: '合成连发步枪', desc: '三连发武器' },
      { name: '瞄准射击', desc: '长按可以开镜瞄准，提高射击精度，扩大衰减射程' },
      { name: '虹吸冲击枪', desc: '临时使用装配生命汲取爆炸子弹的半自动手枪。使用时提高移动速度和跳跃高度' },
      { name: '赛博手雷', desc: '扔出一枚手雷，弹跳后会在短时间内引爆' },
      { name: '覆盖协议', desc: '启动覆盖程序，将你变为人形兵器' },
      { name: '机变体征', desc: '被动生命值恢复激活速度加快，并在激活时立即恢复30点生命值' },
    ],
  },
  sierra: {
    source: 'https://ow.blizzard.cn/heroes/sierra/',
    skills: [
      { name: '螺旋步枪', desc: '自动突击武器。螺旋射击弹道，持续开火时射击精度逐渐提高' },
      { name: '追踪弹', desc: '标记一名敌人。螺旋步枪的子弹会自动追踪被标记敌人' },
      { name: '震地手雷', desc: '投出一枚炸弹，击中地形时生成一道冲击波' },
      { name: '锚点无人机', desc: '发射一架锚点无人机。再次激活可向其发射抓钩' },
      { name: '开路先锋', desc: '部署一架无人机，向前飞行并空投炸弹' },
    ],
  },
  shion: {
    source: 'https://ow.blizzard.cn/heroes/shion/',
    skills: [
      { name: '牙罗双枪', desc: '速射幻灵手枪' },
      { name: '杀戮狂宴', desc: '尽情倾泻火力并向前冲刺3次' },
      { name: '交叉枪决', desc: '发射X形的齐射，长按可收紧散布' },
      { name: '机动闪避', desc: '疾冲并在短时间内获得过量生命值' },
      { name: '纵情狂飙', desc: '让摩托引擎狂飙。再次激活可跳车并向前发射摩托' },
    ],
  },

  // 支援
  ana: {
    source: 'https://ow.blizzard.cn/heroes/ana/',
    skills: [
      { name: '生物步枪', desc: '可以治疗盟友并对敌人造成伤害的远距离步枪。长按可以开镜瞄准' },
      { name: '麻醉镖', desc: '射出飞镖让敌人入眠' },
      { name: '生物手雷', desc: '扔出一枚手雷，治疗盟友并提高其受到的治疗量，同时还可以对敌人造成伤害并使其无法受到治疗' },
      { name: '纳米激素', desc: '提高一名队友造成的伤害，同时降低其受到的伤害' },
    ],
  },
  baptiste: {
    source: 'https://ow.blizzard.cn/heroes/baptiste/',
    skills: [
      { name: '生化榴弹枪', desc: '三连发冲锋枪 / 发射医疗飞弹，治疗落点周围的盟友' },
      { name: '愈合冲击', desc: '激活后立即治疗自己和周围盟友，并额外提供持续治疗效果。对生命值低于一半的目标，瞬间治疗量翻倍' },
      { name: '维生力场', desc: '投出力场装置，使周围盟友不会死亡。此装置可被摧毁' },
      { name: '增幅矩阵', desc: '投出一面矩阵，友方弹药穿过矩阵后伤害和治疗翻倍' },
      { name: '动力战靴', desc: '按住下蹲键可以跳得更高' },
    ],
  },
  brigitte: {
    source: 'https://ow.blizzard.cn/heroes/brigitte/',
    skills: [
      { name: '火箭连枷', desc: '较大范围的近战攻击' },
      { name: '恢复包', desc: '较短的时间内持续治疗一名盟友' },
      { name: '流星飞锤', desc: '向前方甩出连枷，将一名敌人击退' },
      { name: '屏障护盾', desc: '按住可以在前方展开一道能量屏障' },
      { name: '能量盾击', desc: '展开屏障护盾后可以向前疾冲，击退一名敌人' },
      { name: '集结号令', desc: '获得护甲，强化屏障护盾，并为周围的盟友提供额外生命值' },
      { name: '鼓舞士气', desc: '对敌人造成伤害会为周围的队友恢复生命' },
    ],
  },
  illari: {
    source: 'https://ow.blizzard.cn/heroes/illari/',
    skills: [
      { name: '阳焰步枪', desc: '远距离自动充能步枪 / 消耗太阳能的中距离治疗光束' },
      { name: '桎梏灼日', desc: '发射一颗会爆炸的太阳能量球。被击中的敌人会减速，并在受到大量伤害后爆炸' },
      { name: '治疗光塔', desc: '部署一个可以治疗盟友的光塔' },
      { name: '烈日冲击', desc: '向移动方向弹射而出，同时击退敌人。按住跳跃键弹射高度更高' },
    ],
  },
  juno: {
    source: 'https://ow.blizzard.cn/heroes/juno/',
    skills: [
      { name: '医疗冲击枪', desc: '可以治疗盟友并对敌人造成伤害的连发武器' },
      { name: '脉冲星飞雷', desc: '按下锁定目标，随后按下发射追踪飞雷。持续治疗盟友并对敌人造成伤害' },
      { name: '轨道射线', desc: '召唤一道射线向前移动，治疗盟友并提高其造成的伤害' },
      { name: '超能环域', desc: '部署一道环域。盟友穿过环域后，移动速度提升' },
      { name: '滑翔推进', desc: '提高移动速度并沿水平方向滑翔' },
      { name: '火星套靴', desc: '在空中时，按下空格可以二段跳。按住空格可以悬浮在空中' },
    ],
  },
  kiriko: {
    source: 'https://ow.blizzard.cn/heroes/kiriko/',
    skills: [
      { name: '符', desc: '引导一串能自动飞向目标盟友的治疗护身符' },
      { name: '锥', desc: '投出能远距离攻击的苦无' },
      { name: '瞬', desc: '瞬移至一名盟友身旁' },
      { name: '铃', desc: '投出一枚护身铃铛，使盟友在短时间内变为无敌状态，并净化大部分负面效果' },
      { name: '狐', desc: '召唤一只灵狐冲向前方，为置身路径中的盟友提高移动速度、攻击速度和技能冷却速度' },
    ],
  },
  lifeweaver: {
    source: 'https://ow.blizzard.cn/heroes/lifeweaver/',
    skills: [
      { name: '愈疗灵花', desc: '长按充能治疗冲击，松开后治疗目标盟友。不使用时会缓慢被动充能' },
      { name: '棘刺箭雨', desc: '快速发射一串棘刺' },
      { name: '花瓣平台', desc: '扔出一个平台，踩上后会向上升起。未使用时平台会归于原位' },
      { name: '回春疾行', desc: '向行进方向疾冲，并轻微治疗自己' },
      { name: '生命之握', desc: '把一名盟友拉到你的位置，在飞行过程中提供保护' },
      { name: '生命之树', desc: '种植一棵树，发芽时立即治疗盟友，树木存活时会持续产生周期性治疗' },
    ],
  },
  lucio: {
    source: 'https://ow.blizzard.cn/heroes/lucio/',
    skills: [
      { name: '音速扩音器', desc: '超音速飞弹发射器' },
      { name: '切歌', desc: '在两种音效之间切换：治愈音效可治疗附近盟友，加速音效可让附近盟友更快地移动' },
      { name: '强音', desc: '强化当前歌曲的效果' },
      { name: '音波', desc: '射出近距离冲击波，击退敌人' },
      { name: '音障', desc: '为附近盟友提供临时的额外生命值' },
      { name: '滑墙', desc: '跳向墙壁并在其表面滑行' },
    ],
  },
  mercy: {
    source: 'https://ow.blizzard.cn/heroes/mercy/',
    skills: [
      { name: '天使之杖', desc: '长按可以治疗队友 / 长按可以增加队友造成的伤害' },
      { name: '天使冲击枪', desc: '自动武器' },
      { name: '守护天使', desc: '飞向一名队友。在飞行时，按跳跃可以向前飞，按下蹲可以向上飞' },
      { name: '重生', desc: '复活一名阵亡的队友' },
      { name: '天使降临', desc: '减缓下降速度' },
      { name: '女武神', desc: '获得飞行能力并强化各技能' },
    ],
  },
  moira: {
    source: 'https://ow.blizzard.cn/heroes/moira/',
    skills: [
      { name: '生化之触', desc: '长按治疗前方所有队友，会消耗生化能量 / 远程光束武器。造成伤害时为你恢复生命并加速恢复生化能量' },
      { name: '生化之球', desc: '发射来回弹射的能量球，为附近的盟友恢复生命，或对附近的敌人造成伤害' },
      { name: '消散', desc: '消失，移动速度加快并变为无敌状态，但无法射击' },
      { name: '聚合射线', desc: '发射一道光束，为盟友恢复生命并对敌人造成伤害' },
    ],
  },
  zenyatta: {
    source: 'https://ow.blizzard.cn/heroes/zenyatta/',
    skills: [
      { name: '灭', desc: '弹道能量武器。蓄力后可以射出一连串法球' },
      { name: '乱', desc: '将纷乱法球射向一个敌人，可以增加其受到的伤害' },
      { name: '谐', desc: '将和谐法球射向盟友，可以为其恢复生命值' },
      { name: '圣', desc: '变为无敌状态，加速并治疗附近的盟友' },
      { name: '蹬', desc: '近身攻击伤害提高50%，击退效果大幅提高' },
    ],
  },
  wuyang: {
    source: 'https://ow.blizzard.cn/heroes/wuyang/',
    skills: [
      { name: '玄武杖', desc: '发射一颗伤害性水珠。按住可控制水珠轨迹并强化其爆炸' },
      { name: '养神泉', desc: '用一股可以被动治疗的泉水环绕一名盟友。对目标按住会消耗资源并手动快速治疗' },
      { name: '翻江浪', desc: '劈出一道向前的波浪，提高盟友受到的治疗量并击退敌人' },
      { name: '飞流步', desc: '乘波而行，提高移动速度和跳跃高度' },
      { name: '惊涛破', desc: '水流聚合成球，保护一名盟友或自身。一小段时间后水球爆炸，击倒敌人并为受保护的目标提供大量治疗' },
    ],
  },
  mizuki: {
    source: 'https://ow.blizzard.cn/heroes/mizuki/',
    skills: [
      { name: '御魂镰刃', desc: '扔出飞旋镰刃，击中敌人会快速造成伤害' },
      { name: '疗魂斗笠', desc: '扔出斗笠治疗一名盟友，会弹跳至周围盟友并在返回时治疗自身' },
      { name: '缚魂锁链', desc: '扔出一道束缚锁链，限制命中的第一个敌人' },
      { name: '替魂纸人', desc: '向前一跃，并在原地留下一个纸人。再次激活会返回原地，且在激活期间加快移动速度' },
      { name: '护魂结界', desc: '生成一道结界，能治疗盟友并吸收结界外发射的敌方射弹' },
      { name: '安魂灵气', desc: '治疗周围盟友。造成伤害或治疗会产生资源，资源越多，治疗量越高' },
    ],
  },
  feitianmao: {
    source: 'https://ow.blizzard.cn/heroes/jetpackcat/',
    skills: [
      { name: '生物猫爪弹', desc: '可治疗盟友并对敌人造成伤害的中距离扩散子弹' },
      { name: '咻咻飞', desc: '沿移动方向加速。运输其他玩家时减缓燃料恢复速度' },
      { name: '救生索', desc: '切换为运输模式，盟友可抓住救生索任你拖拽。加快移动速度并治疗被拖拽的盟友' },
      { name: '呼噜噜', desc: '脉冲式范围治疗，频率随时间提高。激活时击退周围敌人' },
      { name: '猫猫劫', desc: '冲向地面位置，击倒敌人并拴锁离你最近的敌人' },
    ],
  },
  sombra: {
    // 黑影已改为支援英雄，技能组全新（黑客入侵/病毒侵染已移除）
    source: 'https://ow.blizzard.cn/heroes/sombra/',
    skills: [
      { name: '自动手枪', desc: '近距离自动武器' },
      { name: '电磁脉冲', desc: '对周围所有敌人造成相当于其当前生命值一定比例的伤害，侵入敌人并摧毁附近的敌方屏障' },
      { name: '在线修复', desc: '为一名盟友持续治疗定量生命值。还可随意侵入急救包和大部分敌方可部署物' },
      { name: '赛博空间', desc: '扔出一枚智能体，击中时爆炸并生成一片赛博空间，削弱其中的敌人，治疗其中的盟友' },
      { name: '位移传动', desc: '扔出一个信标并传送至信标位置。传送完成后隐身，隐身状态持续片刻' },
    ],
  },
  doctrine: {
    source: 'https://ow.blizzard.cn/heroes/doctrine/',
    skills: [
      { name: '永生权杖', desc: '可以治疗盟友并对敌人造成伤害的中距离武器' },
      { name: '救赎恩典', desc: '发射无人机群，降低敌人的最大生命值，并为盟友提供过量生命值' },
      { name: '灌注', desc: '为你的下个技能增加强大的效果' },
      { name: '迅影疾行', desc: '沿水平方向疾行，获得受伤减免。灌注：获得自由飞行' },
      { name: '焕生无人机', desc: '按住在前方展开一道能量屏障' },
    ],
  },
};

/** 获取英雄技能数据（官网未收录时返回空数组） */
export function getHeroSkills(id: HeroId): HeroSkill[] {
  return heroSkills[id]?.skills ?? [];
}

/** 获取英雄的关键技能名称列表 */
export function getHeroSkillNames(id: HeroId): string[] {
  return getHeroSkills(id).map(s => s.name);
}
