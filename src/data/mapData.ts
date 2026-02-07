// 地图数据 - 各地图适合首发的强势英雄推荐
export interface Map {
  id: string;
  name: string;
  nameEn: string;
  type: 'control' | 'hybrid' | 'escort' | 'push' | 'flashpoint';
  recommendedHeroes: string[]; // 英雄ID数组
  heroReasons: Record<string, { zh: string; en: string }>; // 英雄推荐理由，key为heroId
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
      lucio: { zh: '地形复杂，音障可以配合队友在站点区域打团，滑行能利用高低差快速转点', en: 'Complex terrain allows Sound Barrier for team fights in the objective area; skating leverages elevation changes for fast rotations' },
      pharah: { zh: '多张高低差明显的子图，火箭弹幕可以压制站点区域', en: 'Multiple submaps with significant elevation changes; Rocket Barrage can suppress the objective area' },
      winston: { zh: '机动性强，能快速转点和支援队友，适合占领要点的快节奏', en: 'High mobility enables quick rotations and teammate support; ideal for the fast-paced Control point节奏' },
      dva: { zh: '推进器可以快速转点，自爆在封闭的站点区域威胁大', en: 'Boosters enable fast rotations; Self-Destruct is highly threatening in enclosed objective areas' },
      kiriko: { zh: '瞬可以帮助队友快速转点，铃铛在站点团战中保命能力强', en: 'Swift Step helps teammates rotate quickly; Protection Suzu has strong survivability in team fights' },
      genji: { zh: '机动性强，可以灵活转点，龙刃在站点团战中收割能力强', en: 'High mobility allows flexible rotations; Dragonblade has strong cleanup potential in team fights' },
    },
  },
  {
    id: 'ilios',
    name: '伊利奥斯',
    nameEn: 'Ilios',
    type: 'control',
    recommendedHeroes: ['roadhog', 'pharah', 'lucio', 'winston', 'brigitte', 'dva'],
    heroReasons: {
      roadhog: { zh: '深井地图钩子威胁极大，可以配合地形击杀敌人', en: 'Hook is extremely threatening on Well map; can combo with terrain for environmental kills' },
      pharah: { zh: '废墟和灯塔图有巨大的垂直空间，可以安全输出', en: 'Ruins and Lighthouse have huge vertical space for safe damage output' },
      lucio: { zh: '深井图可以利用音波将敌人推下悬崖', en: 'Can use Soundwave to knock enemies off the cliff on Well map' },
      winston: { zh: '机动性强，能快速跳回站点或支援队友', en: 'High mobility enables quick jumps back to objective or teammate support' },
      brigitte: { zh: '在狭窄的站点区域，盾击和集结号令威力巨大', en: 'Shield Bash and Rally are incredibly powerful in narrow objective areas' },
      dva: { zh: '深井图可以飞起来躲避钩子，同时用导弹压制', en: 'Can fly to avoid hooks while using missiles to pressure enemies' },
    },
  },
  {
    id: 'lijiang',
    name: '漓江塔',
    nameEn: "Lijiang Tower",
    type: 'control',
    recommendedHeroes: ['lucio', 'winston', 'dva', 'tracer', 'kiriko', 'genji'],
    heroReasons: {
      lucio: { zh: '夜市地图可以利用滑行在高低平台快速移动，控制室图音障团战价值高', en: 'Night Market allows skating for fast movement between elevation platforms; Control Center has high Sound Barrier value in fights' },
      winston: { zh: '控制室图站点区域小，原始暴怒可以轻松击飞多个敌人', en: 'Small objective area on Control Center; Primal Rage can easily knock multiple enemies off' },
      dva: { zh: '夜市图推进器可以在平台和桥下快速转移', en: 'Boosters enable fast transfers between platforms and under bridges on Night Market' },
      tracer: { zh: '地图紧凑，闪现可以快速绕后或逃离', en: 'Compact map allows Blink for quick flanking or escape' },
      kiriko: { zh: '瞬可以穿越夜市图的复杂地形快速支援', en: 'Swift Step can traverse Night Market complex terrain for fast support' },
      genji: { zh: '夜市图有很多可以利用的二层平台，适合源氏攀爬输出', en: 'Night Market has many usable upper platforms for climbing and damage' },
    },
  },
  {
    id: 'nepal',
    name: '尼泊尔',
    nameEn: 'Nepal',
    type: 'control',
    recommendedHeroes: ['winston', 'dva', 'pharah', 'lucio', 'kiriko', 'tracer'],
    heroReasons: {
      winston: { zh: '村庄和圣所图站点区域都有平台，机动性强可以灵活跳点', en: 'Both Village and Sanctuary have platformed objective areas; high mobility enables flexible jumping' },
      dva: { zh: '圣所图封闭空间多，自爆威胁大', en: 'Many enclosed spaces on Sanctuary; Self-Destruct is highly threatening' },
      pharah: { zh: '圣所图有大量室内空间限制，但村庄图开阔适合飞行', en: 'Sanctuary has indoor space limitations, but Village is open for flight' },
      lucio: { zh: '村庄图的深渊可以推人，圣所图的狭窄走廊适合音障团战', en: 'Village cliff can knock enemies off; narrow hallways in Sanctuary suit Sound Barrier team fights' },
      kiriko: { zh: '铃铛可以在圣所图的狭窄区域保护队友免控', en: 'Protection Suzu can protect teammates from crowd control in narrow Sanctuary areas' },
      tracer: { zh: '村庄图可以通过闪现快速转点绕后', en: 'Can use Blink for quick rotations and flanking on Village' },
    },
  },
  {
    id: 'oasis',
    name: '绿洲城',
    nameEn: 'Oasis',
    type: 'control',
    recommendedHeroes: ['pharah', 'winston', 'dva', 'lucio', 'kiriko', 'genji'],
    heroReasons: {
      pharah: { zh: '城市中心和花园图都有大量开阔空间，适合远程轰炸', en: 'City Center and Gardens have plenty of open space for long-range bombardment' },
      winston: { zh: '城市中心图可以利用弹跳台快速转点', en: 'Can use jump pads for quick rotations on City Center' },
      dva: { zh: '大学校园图有长直道，可以推进配合队友', en: 'University has long straight paths for boosting with teammates' },
      lucio: { zh: '弹跳台配合滑行可以实现超远距离移动', en: 'Jump pads combined with skating enable extreme range movement' },
      kiriko: { zh: '瞬可以利用弹跳台快速位移支援', en: 'Swift Step can use jump pads for fast repositioning and support' },
      genji: { zh: '花园图有很多掩体和高台，适合源氏穿梭作战', en: 'Gardens have plenty of cover and high ground suitable for Genji skirmishing' },
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
      reinhardt: { zh: '狭窄的街道和推车路段适合地推阵容，大锤举盾保护队友', en: 'Narrow streets and payload sections suit brawl compositions; Reinhardt shields protect teammates' },
      bastion: { zh: 'A点防守和推车路段都有良好的架点位置', en: 'Has good sentry positions for both point A defense and payload sections' },
      torbjorn: { zh: 'A点可以架设炮台防守，推车路段有长直道', en: 'Can set up turret for point A defense; payload sections have long straight paths' },
      baptiste: { zh: '窗户图可以卡高台，增幅矩阵在狭窄区域效果显著', en: 'Windows map allows high ground camping; Amplification Matrix is highly effective in narrow areas' },
      ana: { zh: '长直道视野好，睡眠针可以有效阻止敌方推进', en: 'Good sightlines on long paths; Sleep Dart can effectively stop enemy advances' },
      cassidy: { zh: '中近距离作战多，翻滚可以保命，神射手在推车段威胁大', en: 'Lots of close-to-medium range combat; Combat Roll for survival; Deadeye threatening on payload' },
    },
  },
  {
    id: 'eichenwalde',
    name: '艾兴瓦尔德',
    nameEn: 'Eichenwalde',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'dva', 'cassidy', 'baptiste', 'ana', 'hanzo'],
    heroReasons: {
      reinhardt: { zh: '经典的推车图，地推阵容首选，盾可以覆盖狭窄桥面', en: 'Classic payload map; brawl composition首选; shield covers narrow bridge' },
      dva: { zh: '可以快速飞上城堡二楼，控制高地优势', en: 'Can quickly fly to castle second floor; control high ground advantage' },
      cassidy: { zh: '中距离作战多，翻滚可以规避敌方技能', en: 'Lots of mid-range combat; Combat Roll dodges enemy abilities' },
      baptiste: { zh: '城堡高台是绝佳的输出和治疗位置', en: 'Castle high ground is excellent for damage and healing' },
      ana: { zh: '长直道视野好，纳米激素配合队友开团', en: 'Good sightlines on long paths; Nano Boost combos with teammates for engages' },
      hanzo: { zh: '龙可以覆盖狭窄的城堡通道和桥', en: 'Dragonstrike covers narrow castle corridors and bridge' },
    },
  },
  {
    id: 'hollywood',
    name: '好莱坞',
    nameEn: 'Hollywood',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'widowmaker', 'hanzo', 'baptiste', 'ana', 'cassidy'],
    heroReasons: {
      reinhardt: { zh: 'A点和推车路段都有狭窄通道，适合地推进攻', en: 'Both point A and payload sections have narrow corridors; suits brawl offense' },
      widowmaker: { zh: 'A点防守有多个狙击位，可以压制进攻方', en: 'Multiple sniper positions for point A defense; can suppress attackers' },
      hanzo: { zh: 'A点高台视野开阔，龙可以覆盖站点区域', en: 'High ground at point A has wide sightlines; Dragonstrike covers objective area' },
      baptiste: { zh: '工作室图二楼可以卡位，推车路段有掩体', en: 'Studio second floor allows position camping; payload sections have cover' },
      ana: { zh: '好莱坞有多个高台可以站位，视野好', en: 'Multiple high ground positions with good sightlines' },
      cassidy: { zh: '街道战近距离多，神射手可以威慑推车', en: 'Close-quarters street fighting; Deadeye threatens payload progress' },
    },
  },
  {
    id: 'kings_row',
    name: '国王大道',
    nameEn: "King's Row",
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'reaper', 'baptiste', 'ana', 'cassidy', 'mei'],
    heroReasons: {
      reinhardt: { zh: '最经典的推车图，狭窄街道完美适合地推', en: 'Most classic payload map; narrow streets perfect for brawl' },
      reaper: { zh: '狭窄的角落和房间多，可以绕后收割', en: 'Many narrow corners and rooms; can flank for cleanup' },
      baptiste: { zh: 'A点高台是最佳站位，矩阵可以覆盖整个街道', en: 'Point A high ground is optimal; Matrix covers entire street' },
      ana: { zh: '长直道视野极佳，睡眠针可以阻止敌方开团', en: 'Excellent sightlines on long straight; Sleep Dart stops enemy engages' },
      cassidy: { zh: '街道战近距离多，神射手威慑力强', en: 'Close-quarters street combat; Deadeye has strong deterrent effect' },
      mei: { zh: '冰墙可以分割狭窄的街道，暴风雪威力巨大', en: 'Ice Wall can divide narrow streets; Blizzard is incredibly powerful' },
    },
  },
  {
    id: 'midtown',
    name: '中城',
    nameEn: 'Midtown',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'sojourn', 'baptiste', 'kiriko', 'widowmaker', 'dva'],
    heroReasons: {
      reinhardt: { zh: 'A点和推车路段有宽阔街道，适合地推', en: 'Wide streets on point A and payload sections suit brawl' },
      sojourn: { zh: '长直道可以发挥超频的远程打击能力', en: 'Long straight sections maximize Overclock ranged damage' },
      baptiste: { zh: '地铁站二楼可以卡位，街道战有掩体', en: 'Subway station second floor allows position camping; street fights have cover' },
      kiriko: { zh: '瞬可以快速支援街道两侧的队友', en: 'Swift Step quickly supports teammates on both street sides' },
      widowmaker: { zh: 'A点有高楼可以狙击，街道视野好', en: 'High building for sniping at point A; good street sightlines' },
      dva: { zh: '可以快速飞到高台控制视野，核弹覆盖站点', en: 'Can quickly fly to high ground for vision control; Nuke covers objective' },
    },
  },
  {
    id: 'numbani',
    name: '努巴尼',
    nameEn: 'Numbani',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'dva', 'genji', 'tracer', 'lucio', 'kiriko'],
    heroReasons: {
      reinhardt: { zh: 'A点和推车路段狭窄，适合地推进攻', en: 'Narrow point A and payload sections suit brawl offense' },
      dva: { zh: '可以快速飞到A点二楼控制高地', en: 'Can quickly fly to point A second floor for high ground control' },
      genji: { zh: '高台和建筑物多，可以利用机动性穿梭', en: 'Many high grounds and buildings; can weave through with mobility' },
      tracer: { zh: '街道有很多绕后路线，可以快速骚扰后排', en: 'Many flanking routes; can quickly harass backline' },
      lucio: { zh: '滑板鞋可以快速转点，音障在站点团战中强', en: 'Skates enable fast rotations; Sound Barrier powerful in objective fights' },
      kiriko: { zh: '瞬可以跟随机动性强的队友快速支援', en: 'Swift Step keeps up with mobile teammates for fast support' },
    },
  },
  {
    id: 'paraiso',
    name: '帕拉伊苏',
    nameEn: 'Paraíso',
    type: 'hybrid',
    recommendedHeroes: ['reinhardt', 'pharah', 'baptiste', 'ana', 'mercy', 'echo'],
    heroReasons: {
      reinhardt: { zh: 'A点和推车路段有宽阔街道，适合地推', en: 'Wide streets on point A and payload sections suit brawl' },
      pharah: { zh: '开阔空间多，可以利用高度优势轰炸', en: 'Plenty of open space; can leverage height advantage for bombing' },
      baptiste: { zh: '街道两侧有掩体，可以卡位输出', en: 'Cover on both street sides for position camping and damage' },
      ana: { zh: '长直道视野好，高台站位安全', en: 'Good sightlines on long paths; high ground positioning is safe' },
      mercy: { zh: '开阔空间可以安全飞行，配合法老之鹰效果好', en: 'Open spaces allow safe flight; great synergy with Pharah' },
      echo: { zh: '可以飞到高处输出，复制可以在站点团战中发挥', en: 'Can fly to high ground for damage; Duplicate excels in objective fights' },
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
      sojourn: { zh: '长直道可以发挥超频的远程打击', en: 'Long straight sections maximize Overclock ranged damage' },
      widowmaker: { zh: 'A点有高楼狙击位，街道视野好', en: 'High building sniper position at point A; good street sightlines' },
      hanzo: { zh: '龙可以覆盖狭窄的街道', en: 'Dragonstrike covers narrow streets' },
      baptiste: { zh: '街道有掩体可以卡位，矩阵可以覆盖', en: 'Streets have cover for position camping; Matrix provides coverage' },
      ana: { zh: '视野开阔，睡眠针可以阻止推进', en: 'Open sightlines; Sleep Dart can stop advances' },
      sigma: { zh: '可以利用掩体poke，引力乱流可以配合队友开团', en: 'Can use cover for poke; Gravitic Flux enables team combos' },
    },
  },
  {
    id: 'dorado',
    name: '多拉多',
    nameEn: 'Dorado',
    type: 'escort',
    recommendedHeroes: ['hanzo', 'widowmaker', 'genji', 'lucio', 'ana', 'dva'],
    heroReasons: {
      hanzo: { zh: '街道和教堂有很多高点可以利用', en: 'Many high points to leverage on streets and cathedral' },
      widowmaker: { zh: 'A点防守有狙击位，可以压制进攻', en: 'Sniper position for point A defense; can suppress attackers' },
      genji: { zh: '建筑物多可以利用机动性穿梭', en: 'Many buildings for mobility and weaving' },
      lucio: { zh: '滑板鞋可以快速转点绕后', en: 'Skates enable fast rotations and flanking' },
      ana: { zh: '长直道视野好，可以远程支援', en: 'Good sightlines on long straight; can provide远程支援' },
      dva: { zh: '可以快速飞到高台控制视野', en: 'Can quickly fly to high ground for vision control' },
    },
  },
  {
    id: 'havana',
    name: '哈瓦那',
    nameEn: 'Havana',
    type: 'escort',
    recommendedHeroes: ['sojourn', 'widowmaker', 'hanzo', 'baptiste', 'ana', 'sigma'],
    heroReasons: {
      sojourn: { zh: '街道长直道多，超频效果好', en: 'Many long straight streets; Overclock is effective' },
      widowmaker: { zh: 'A点有高点狙击位', en: 'High point sniper position at point A' },
      hanzo: { zh: '龙可以覆盖狭窄的街道', en: 'Dragonstrike covers narrow streets' },
      baptiste: { zh: '有掩体可以卡位输出', en: 'Cover available for position camping and damage' },
      ana: { zh: '视野好，高台站位安全', en: 'Good sightlines; high ground positioning is safe' },
      sigma: { zh: '可以利用掩体poke输出', en: 'Can use cover for poke damage' },
    },
  },
  {
    id: 'junkertown',
    name: '渣客镇',
    nameEn: 'Junkertown',
    type: 'escort',
    recommendedHeroes: ['junkrat', 'pharah', 'widowmaker', 'ana', 'baptiste', 'roadhog'],
    heroReasons: {
      junkrat: { zh: '狭窄的街道和推车路段适合榴弹弹跳', en: 'Narrow streets and payload sections suit grenade bounces' },
      pharah: { zh: 'A点开阔可以轰炸，推车路段有高点', en: 'Open point A for bombing; payload sections have high ground' },
      widowmaker: { zh: 'A点有高点狙击位', en: 'High point sniper position at point A' },
      ana: { zh: '视野好，睡眠针可以阻止推进', en: 'Good sightlines; Sleep Dart can stop advances' },
      baptiste: { zh: '可以卡高台输出', en: 'Can camp high ground for damage' },
      roadhog: { zh: '狭窄的角落可以钩人', en: 'Can hook enemies in narrow corners' },
    },
  },
  {
    id: 'rialto',
    name: '里阿尔托',
    nameEn: 'Rialto',
    type: 'escort',
    recommendedHeroes: ['widowmaker', 'hanzo', 'genji', 'lucio', 'ana', 'dva'],
    heroReasons: {
      widowmaker: { zh: 'A点有高点狙击位，河道视野好', en: 'High point sniper position at point A; good canal sightlines' },
      hanzo: { zh: '龙可以覆盖狭窄的桥梁', en: 'Dragonstrike covers narrow bridges' },
      genji: { zh: '建筑物多可以利用机动性', en: 'Many buildings for mobility exploitation' },
      lucio: { zh: '河道可以滑行快速转点', en: 'Canal allows skating for fast rotations' },
      ana: { zh: '视野开阔，可以远程支援', en: 'Open sightlines; can provide远程支援' },
      dva: { zh: '可以快速飞到高台控制视野', en: 'Can quickly fly to high ground for vision control' },
    },
  },
  {
    id: 'route_66',
    name: '66号公路',
    nameEn: 'Route 66',
    type: 'escort',
    recommendedHeroes: ['widowmaker', 'hanzo', 'cassidy', 'ana', 'baptiste', 'sigma'],
    heroReasons: {
      widowmaker: { zh: 'A点有高点狙击位，峡谷视野好', en: 'High point sniper position at point A; good canyon sightlines' },
      hanzo: { zh: '龙可以覆盖狭窄的峡谷通道', en: 'Dragonstrike covers narrow canyon passages' },
      cassidy: { zh: '中近距离作战多，神射手威慑力强', en: 'Lots of close-to-mid combat; Deadeye has strong deterrent' },
      ana: { zh: '视野好，可以远程支援', en: 'Good sightlines; can provide远程支援' },
      baptiste: { zh: '有掩体可以卡位输出', en: 'Cover available for position camping and damage' },
      sigma: { zh: '可以利用掩体poke', en: 'Can use cover for poke' },
    },
  },
  {
    id: 'gibraltar',
    name: '直布罗陀',
    nameEn: 'Watchpoint: Gibraltar',
    type: 'escort',
    recommendedHeroes: ['pharah', 'echo', 'winston', 'dva', 'mercy', 'lucio'],
    heroReasons: {
      pharah: { zh: '室内空间高大，可以利用高度轰炸', en: 'Large indoor spaces allow height-based bombing' },
      echo: { zh: '可以飞到高处输出', en: 'Can fly to high ground for damage' },
      winston: { zh: '机动性强，可以快速转点', en: 'High mobility enables quick rotations' },
      dva: { zh: '可以快速飞到高台', en: 'Can quickly fly to high ground' },
      mercy: { zh: '可以配合法老之鹰空中输出', en: 'Can support Pharah aerial damage' },
      lucio: { zh: '滑板鞋可以快速转点', en: 'Skates enable fast rotations' },
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
      sojourn: { zh: '长直道可以发挥超频的远程打击', en: 'Long straight sections maximize Overclock ranged damage' },
      kiriko: { zh: '瞬可以快速支援推进或防守的队友', en: 'Swift Step quickly supports teammates on offense or defense' },
      lucio: { zh: '滑板鞋可以快速转点，音障团战强', en: 'Skates enable fast rotations; Sound Barrier powerful in fights' },
      dva: { zh: '机动性强，可以快速支援推进', en: 'High mobility for quick offense support' },
      genji: { zh: '机动性强，可以快速转点', en: 'High mobility for quick rotations' },
      winston: { zh: '机动性强，可以快速支援推进', en: 'High mobility for quick offense support' },
    },
  },
  {
    id: 'esperanca',
    name: '埃斯佩兰萨',
    nameEn: 'Esperança',
    type: 'push',
    recommendedHeroes: ['sojourn', 'kiriko', 'dva', 'lucio', 'genji', 'winston'],
    heroReasons: {
      sojourn: { zh: '开阔街道可以发挥超频', en: 'Open streets maximize Overclock effectiveness' },
      kiriko: { zh: '瞬可以快速支援队友', en: 'Swift Step quickly supports teammates' },
      dva: { zh: '机动性强，可以快速转点', en: 'High mobility enables fast rotations' },
      lucio: { zh: '滑板鞋可以快速转点', en: 'Skates enable fast rotations' },
      genji: { zh: '建筑物多可以利用机动性', en: 'Many buildings for mobility exploitation' },
      winston: { zh: '机动性强，可以快速支援', en: 'High mobility for quick support' },
    },
  },
  {
    id: 'new_queen_street',
    name: '新皇后街',
    nameEn: 'New Queen Street',
    type: 'push',
    recommendedHeroes: ['sojourn', 'kiriko', 'lucio', 'winston', 'dva', 'genji'],
    heroReasons: {
      sojourn: { zh: '长直道适合超频发挥', en: 'Long straight sections suit Overclock' },
      kiriko: { zh: '瞬可以快速支援', en: 'Swift Step quickly supports' },
      lucio: { zh: '滑板鞋快速转点', en: 'Skates for fast rotations' },
      winston: { zh: '机动性支援推进', en: 'Mobile support for push' },
      dva: { zh: '机动性转点支援', en: 'Mobile rotation support' },
      genji: { zh: '机动性穿梭作战', en: 'Mobile skirmishing' },
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
      winston: { zh: '机动性强，可以快速转点争夺', en: 'High mobility enables quick rotations and point contests' },
      dva: { zh: '推进器快速转点', en: 'Boosters for fast rotations' },
      pharah: { zh: '室内空间高大可以飞行', en: 'Large indoor spaces allow flight' },
      lucio: { zh: '滑板鞋快速转点', en: 'Skates for fast rotations' },
      kiriko: { zh: '瞬快速支援转点', en: 'Swift Step for fast support rotations' },
      genji: { zh: '机动性快速转点', en: 'Mobile fast rotations' },
    },
  },
  {
    id: 'new_junk_city',
    name: '新渣客城',
    nameEn: 'New Junk City',
    type: 'flashpoint',
    recommendedHeroes: ['junkrat', 'pharah', 'roadhog', 'kiriko', 'lucio', 'dva'],
    heroReasons: {
      junkrat: { zh: '狭窄的角落适合榴弹', en: 'Narrow corners suit grenades' },
      pharah: { zh: '开阔空间可以轰炸', en: 'Open spaces for bombing' },
      roadhog: { zh: '可以钩人进角落', en: 'Can hook enemies into corners' },
      kiriko: { zh: '瞬快速支援', en: 'Swift Step for fast support' },
      lucio: { zh: '快速转点', en: 'Fast rotations' },
      dva: { zh: '机动性转点', en: 'Mobile point rotation' },
    },
  },
  {
    id: 'suravasa',
    name: '苏拉瓦萨',
    nameEn: 'Suravasa',
    type: 'flashpoint',
    recommendedHeroes: ['winston', 'dva', 'genji', 'kiriko', 'lucio', 'tracer'],
    heroReasons: {
      winston: { zh: '机动性强快速转点', en: 'High mobility for fast rotations' },
      dva: { zh: '推进器快速支援', en: 'Boosters for fast support' },
      genji: { zh: '机动性穿梭', en: 'Mobile skirmishing' },
      kiriko: { zh: '瞬快速支援', en: 'Swift Step for fast support' },
      lucio: { zh: '滑板鞋转点', en: 'Skates for rotations' },
      tracer: { zh: '闪现快速转点', en: 'Blink for fast rotations' },
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
