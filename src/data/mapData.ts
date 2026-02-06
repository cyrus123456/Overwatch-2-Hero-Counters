// 地图数据 - 各地图适合首发的强势英雄推荐
export interface Map {
  id: string;
  name: string;
  nameEn: string;
  type: 'control' | 'hybrid' | 'escort' | 'push' | 'flashpoint';
  recommendedHeroes: string[]; // 英雄ID数组
  heroReasons: Record<string, string>; // 英雄推荐理由，key为heroId
}

// 地图类型名称
export const getMapTypeName = (type: string, language: 'zh' | 'en' = 'zh'): string => {
  const typeNames: Record<string, Record<string, string>> = {
    control: { zh: '占领要点', en: 'Control' },
    hybrid: { zh: '混合模式', en: 'Hybrid' },
    escort: { zh: '运载目标', en: 'Escort' },
    push: { zh: '推进模式', en: 'Push' },
    flashpoint: { zh: '闪点模式', en: 'Flashpoint' },
  };
  return typeNames[type]?.[language] || type;
};

// 地图数据
export const maps: Map[] = [
  // 占领要点地图
  {
    id: 'busan',
    name: '釜山',
    nameEn: 'Busan',
    type: 'control',
    recommendedHeroes: ['lucio', 'pharah', 'winston', 'dva', 'kiriko', 'genji'],
    heroReasons: {
      lucio: '地形复杂，音障可以配合队友在站点区域打团，滑行能利用高低差快速转点',
      pharah: '多张高低差明显的子图，火箭弹幕可以压制站点区域',
      winston: '机动性强，能快速转点和支援队友，适合占领要点的快节奏',
      dva: '推进器可以快速转点，自爆在封闭的站点区域威胁大',
      kiriko: '瞬可以帮助队友快速转点，铃铛在站点团战中保命能力强',
      genji: '机动性强，可以灵活转点，龙刃在站点团战中收割能力强',
    },
  },
  {
    id: 'ilios',
    name: '伊利奥斯',
    nameEn: 'Ilios',
    type: 'control',
    recommendedHeroes: ['roadhog', 'pharah', 'lucio', 'winston', 'brigitte', 'dva'],
    heroReasons: {
      roadhog: '深井地图钩子威胁极大，可以配合地形击杀敌人',
      pharah: '废墟和灯塔图有巨大的垂直空间，可以安全输出',
      lucio: '深井图可以利用音波将敌人推下悬崖',
      winston: '机动性强，能快速跳回站点或支援队友',
      brigitte: '在狭窄的站点区域，盾击和集结号令威力巨大',
      dva: '深井图可以飞起来躲避钩子，同时用导弹压制',
    },
  },
  {
    id: 'lijiang',
    name: '漓江塔',
    nameEn: "Lijiang Tower",
    type: 'control',
    recommendedHeroes: ['lucio', 'winston', 'dva', 'tracer', 'kiriko', 'genji'],
    heroReasons: {
      lucio: '夜市地图可以利用滑行在高低平台快速移动，控制室图音障团战价值高',
      winston: '控制室图站点区域小，原始暴怒可以轻松击飞多个敌人',
      dva: '夜市图推进器可以在平台和桥下快速转移',
      tracer: '地图紧凑，闪现可以快速绕后或逃离',
      kiriko: '瞬可以穿越夜市图的复杂地形快速支援',
      genji: '夜市图有很多可以利用的二层平台，适合源氏攀爬输出',
    },
  },
  {
    id: 'nepal',
    name: '尼泊尔',
    nameEn: 'Nepal',
    type: 'control',
    recommendedHeroes: ['winston', 'dva', 'pharah', 'lucio', 'kiriko', 'tracer'],
    heroReasons: {
      winston: '村庄和圣所图站点区域都有平台，机动性强可以灵活跳点',
      dva: '圣所图封闭空间多，自爆威胁大',
      pharah: '圣所图有大量室内空间限制，但村庄图开阔适合飞行',
      lucio: '村庄图的深渊可以推人，圣所图的狭窄走廊适合音障团战',
      kiriko: '铃铛可以在圣所图的狭窄区域保护队友免控',
      tracer: '村庄图可以通过闪现快速转点绕后',
    },
  },
  {
    id: 'oasis',
    name: '绿洲城',
    nameEn: 'Oasis',
    type: 'control',
    recommendedHeroes: ['pharah', 'winston', 'dva', 'lucio', 'kiriko', 'genji'],
    heroReasons: {
      pharah: '城市中心和花园图都有大量开阔空间，适合远程轰炸',
      winston: '城市中心图可以利用弹跳台快速转点',
      dva: '大学校园图有长直道，可以推进配合队友',
      lucio: '弹跳台配合滑行可以实现超远距离移动',
      kiriko: '瞬可以利用弹跳台快速位移支援',
      genji: '花园图有很多掩体和高台，适合源氏穿梭作战',
    },
  },
  
  // 混合模式地图
  {
    id: 'blizzard_world',
    name: '暴雪世界',
    nameEn: 'Blizzard World',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'bastion', 'torbjorn', 'baptiste', 'ana', 'cassidy'],
    heroReasons: {
      reinhardt: '狭窄的街道和推车路段适合地推阵容，大锤举盾保护队友',
      bastion: 'A点防守和推车路段都有良好的架点位置',
      torbjorn: 'A点可以架设炮台防守，推车路段有长直道',
      baptiste: '窗户图可以卡高台，增幅矩阵在狭窄区域效果显著',
      ana: '长直道视野好，睡眠针可以有效阻止敌方推进',
      cassidy: '中近距离作战多，翻滚可以保命，神射手在推车段威胁大',
    },
  },
  {
    id: 'eichenwalde',
    name: '艾兴瓦尔德',
    nameEn: 'Eichenwalde',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'dva', 'cassidy', 'baptiste', 'ana', 'hanzo'],
    heroReasons: {
      reinhardt: '经典的推车图，地推阵容首选，盾可以覆盖狭窄桥面',
      dva: '可以快速飞上城堡二楼，控制高地优势',
      cassidy: '中距离作战多，翻滚可以规避敌方技能',
      baptiste: '城堡高台是绝佳的输出和治疗位置',
      ana: '长直道视野好，纳米激素配合队友开团',
      hanzo: '龙可以覆盖狭窄的城堡通道和桥',
    },
  },
  {
    id: 'hollywood',
    name: '好莱坞',
    nameEn: 'Hollywood',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'widowmaker', 'hanzo', 'baptiste', 'ana', 'cassidy'],
    heroReasons: {
      reinhardt: 'A点和推车路段都有狭窄通道，适合地推进攻',
      widowmaker: 'A点防守有多个狙击位，可以压制进攻方',
      hanzo: 'A点高台视野开阔，龙可以覆盖站点区域',
      baptiste: '工作室图二楼可以卡位，推车路段有掩体',
      ana: '好莱坞有多个高台可以站位，视野好',
      cassidy: '街道战近距离多，神射手可以威慑推车',
    },
  },
  {
    id: 'kings_row',
    name: '国王大道',
    nameEn: "King's Row",
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'reaper', 'baptiste', 'ana', 'cassidy', 'mei'],
    heroReasons: {
      reinhardt: '最经典的推车图，狭窄街道完美适合地推',
      reaper: '狭窄的角落和房间多，可以绕后收割',
      baptiste: 'A点高台是最佳站位，矩阵可以覆盖整个街道',
      ana: '长直道视野极佳，睡眠针可以阻止敌方开团',
      cassidy: '街道战近距离多，神射手威慑力强',
      mei: '冰墙可以分割狭窄的街道，暴风雪威力巨大',
    },
  },
  {
    id: 'midtown',
    name: '中城',
    nameEn: 'Midtown',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'sojourn', 'baptiste', 'kiriko', 'widowmaker', 'dva'],
    heroReasons: {
      reinhardt: 'A点和推车路段有宽阔街道，适合地推',
      sojourn: '长直道可以发挥超频的远程打击能力',
      baptiste: '地铁站二楼可以卡位，街道战有掩体',
      kiriko: '瞬可以快速支援街道两侧的队友',
      widowmaker: 'A点有高楼可以狙击，街道视野好',
      dva: '可以快速飞到高台控制视野，核弹覆盖站点',
    },
  },
  {
    id: 'numbani',
    name: '努巴尼',
    nameEn: 'Numbani',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'dva', 'genji', 'tracer', 'lucio', 'kiriko'],
    heroReasons: {
      reinhardt: 'A点和推车路段狭窄，适合地推进攻',
      dva: '可以快速飞到A点二楼控制高地',
      genji: '高台和建筑物多，可以利用机动性穿梭',
      tracer: '街道有很多绕后路线，可以快速骚扰后排',
      lucio: '滑板鞋可以快速转点，音障在站点团战中强',
      kiriko: '瞬可以跟随机动性强的队友快速支援',
    },
  },
  {
    id: 'paraiso',
    name: '帕拉伊苏',
    nameEn: 'Paraíso',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'pharah', 'baptiste', 'ana', 'mercy', 'echo'],
    heroReasons: {
      reinhardt: 'A点和推车路段有宽阔街道，适合地推',
      pharah: '开阔空间多，可以利用高度优势轰炸',
      baptiste: '街道两侧有掩体，可以卡位输出',
      ana: '长直道视野好，高台站位安全',
      mercy: '开阔空间可以安全飞行，配合法老之鹰效果好',
      echo: '可以飞到高处输出，复制可以在站点团战中发挥',
    },
  },
  
  // 运载目标地图
  {
    id: 'circuit_royal',
    name: '皇家赛道',
    nameEn: 'Circuit Royal',
    type: 'escort',
    recommendedHeroes: ['sojourn', 'widowmaker', 'hanzo', 'baptiste', 'ana', 'sigma'],
    heroReasons: {
      sojourn: '长直道可以发挥超频的远程打击',
      widowmaker: 'A点有高楼狙击位，街道视野好',
      hanzo: '龙可以覆盖狭窄的街道',
      baptiste: '街道有掩体可以卡位，矩阵可以覆盖',
      ana: '视野开阔，睡眠针可以阻止推进',
      sigma: '可以利用掩体poke，引力乱流可以配合队友开团',
    },
  },
  {
    id: 'dorado',
    name: '多拉多',
    nameEn: 'Dorado',
    type: 'escort',
    recommendedHeroes: ['hanzo', 'widowmaker', 'genji', 'lucio', 'ana', 'dva'],
    heroReasons: {
      hanzo: '街道和教堂有很多高点可以利用',
      widowmaker: 'A点防守有狙击位，可以压制进攻',
      genji: '建筑物多可以利用机动性穿梭',
      lucio: '滑板鞋可以快速转点绕后',
      ana: '长直道视野好，可以远程支援',
      dva: '可以快速飞到高台控制视野',
    },
  },
  {
    id: 'havana',
    name: '哈瓦那',
    nameEn: 'Havana',
    type: 'escort',
    recommendedHeroes: ['sojourn', 'widowmaker', 'hanzo', 'baptiste', 'ana', 'sigma'],
    heroReasons: {
      sojourn: '街道长直道多，超频效果好',
      widowmaker: 'A点有高点狙击位',
      hanzo: '龙可以覆盖狭窄的街道',
      baptiste: '有掩体可以卡位输出',
      ana: '视野好，高台站位安全',
      sigma: '可以利用掩体poke输出',
    },
  },
  {
    id: 'junkertown',
    name: '渣客镇',
    nameEn: 'Junkertown',
    type: 'escort',
    recommendedHeroes: ['junkrat', 'pharah', 'widowmaker', 'ana', 'baptiste', 'roadhog'],
    heroReasons: {
      junkrat: '狭窄的街道和推车路段适合榴弹弹跳',
      pharah: 'A点开阔可以轰炸，推车路段有高点',
      widowmaker: 'A点有高点狙击位',
      ana: '视野好，睡眠针可以阻止推进',
      baptiste: '可以卡高台输出',
      roadhog: '狭窄的角落可以钩人',
    },
  },
  {
    id: 'rialto',
    name: '里阿尔托',
    nameEn: 'Rialto',
    type: 'escort',
    recommendedHeroes: ['widowmaker', 'hanzo', 'genji', 'lucio', 'ana', 'dva'],
    heroReasons: {
      widowmaker: 'A点有高点狙击位，河道视野好',
      hanzo: '龙可以覆盖狭窄的桥梁',
      genji: '建筑物多可以利用机动性',
      lucio: '河道可以滑行快速转点',
      ana: '视野开阔，可以远程支援',
      dva: '可以快速飞到高台控制视野',
    },
  },
  {
    id: 'route_66',
    name: '66号公路',
    nameEn: 'Route 66',
    type: 'escort',
    recommendedHeroes: ['widowmaker', 'hanzo', 'cassidy', 'ana', 'baptiste', 'sigma'],
    heroReasons: {
      widowmaker: 'A点有高点狙击位，峡谷视野好',
      hanzo: '龙可以覆盖狭窄的峡谷通道',
      cassidy: '中近距离作战多，神射手威慑力强',
      ana: '视野好，可以远程支援',
      baptiste: '有掩体可以卡位输出',
      sigma: '可以利用掩体poke',
    },
  },
  {
    id: 'gibraltar',
    name: '直布罗陀',
    nameEn: 'Watchpoint: Gibraltar',
    type: 'escort',
    recommendedHeroes: ['pharah', 'echo', 'winston', 'dva', 'mercy', 'lucio'],
    heroReasons: {
      pharah: '室内空间高大，可以利用高度轰炸',
      echo: '可以飞到高处输出',
      winston: '机动性强，可以快速转点',
      dva: '可以快速飞到高台',
      mercy: '可以配合法老之鹰空中输出',
      lucio: '滑板鞋可以快速转点',
    },
  },
  
  // 推进模式地图
  {
    id: 'colosseo',
    name: '斗兽场',
    nameEn: 'Colosseo',
    type: 'push',
    recommendedHeroes: ['sojourn', 'kiriko', 'lucio', 'dva', 'genji', 'winston'],
    heroReasons: {
      sojourn: '长直道可以发挥超频的远程打击',
      kiriko: '瞬可以快速支援推进或防守的队友',
      lucio: '滑板鞋可以快速转点，音障团战强',
      dva: '机动性强，可以快速支援推进',
      genji: '机动性强，可以快速转点',
      winston: '机动性强，可以快速支援推进',
    },
  },
  {
    id: 'esperanca',
    name: '埃斯佩兰萨',
    nameEn: 'Esperança',
    type: 'push',
    recommendedHeroes: ['sojourn', 'kiriko', 'dva', 'lucio', 'genji', 'winston'],
    heroReasons: {
      sojourn: '开阔街道可以发挥超频',
      kiriko: '瞬可以快速支援队友',
      dva: '机动性强，可以快速转点',
      lucio: '滑板鞋可以快速转点',
      genji: '建筑物多可以利用机动性',
      winston: '机动性强，可以快速支援',
    },
  },
  {
    id: 'new_queen_street',
    name: '新皇后街',
    nameEn: 'New Queen Street',
    type: 'push',
    recommendedHeroes: ['sojourn', 'kiriko', 'lucio', 'winston', 'dva', 'genji'],
    heroReasons: {
      sojourn: '长直道适合超频发挥',
      kiriko: '瞬可以快速支援',
      lucio: '滑板鞋快速转点',
      winston: '机动性支援推进',
      dva: '机动性转点支援',
      genji: '机动性穿梭作战',
    },
  },
  
  // 闪点模式地图
  {
    id: 'antarctic_peninsula',
    name: '南极半岛',
    nameEn: 'Antarctic Peninsula',
    type: 'flashpoint',
    recommendedHeroes: ['winston', 'dva', 'pharah', 'lucio', 'kiriko', 'genji'],
    heroReasons: {
      winston: '机动性强，可以快速转点争夺',
      dva: '推进器快速转点',
      pharah: '室内空间高大可以飞行',
      lucio: '滑板鞋快速转点',
      kiriko: '瞬快速支援转点',
      genji: '机动性快速转点',
    },
  },
  {
    id: 'new_junk_city',
    name: '新渣客城',
    nameEn: 'New Junk City',
    type: 'flashpoint',
    recommendedHeroes: ['junkrat', 'pharah', 'roadhog', 'kiriko', 'lucio', 'dva'],
    heroReasons: {
      junkrat: '狭窄的角落适合榴弹',
      pharah: '开阔空间可以轰炸',
      roadhog: '可以钩人进角落',
      kiriko: '瞬快速支援',
      lucio: '快速转点',
      dva: '机动性转点',
    },
  },
  {
    id: 'suravasa',
    name: '苏拉瓦萨',
    nameEn: 'Suravasa',
    type: 'flashpoint',
    recommendedHeroes: ['winston', 'dva', 'genji', 'kiriko', 'lucio', 'tracer'],
    heroReasons: {
      winston: '机动性强快速转点',
      dva: '推进器快速支援',
      genji: '机动性穿梭',
      kiriko: '瞬快速支援',
      lucio: '滑板鞋转点',
      tracer: '闪现快速转点',
    },
  },
];

// 获取地图类型颜色
export const getMapTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    control: '#3b82f6',    // 蓝色
    hybrid: '#8b5cf6',     // 紫色
    escort: '#f59e0b',     // 橙色
    push: '#10b981',       // 绿色
    flashpoint: '#ec4899', // 粉色
  };
  return colors[type] || '#6b7280';
};
