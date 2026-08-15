// 守望先锋英雄数据 - 基于参考图片整理的被克制关系

// 英雄ID联合类型
export type HeroId = 
  | 'dva' | 'doomfist' | 'hazard' | 'junker_queen' | 'mauga' | 'orisa' | 'ramattra' 
  | 'reinhardt' | 'roadhog' | 'sigma' | 'winston' | 'wrecking_ball' | 'zarya' | 'domina' | 'dmon'
  | 'ashe' | 'bastion' | 'cassidy' | 'echo' | 'freja' | 'genji' | 'hanzo' | 'junkrat' 
  | 'mei' | 'pharah' | 'reaper' | 'sojourn' | 'soldier76' | 'sombra' | 'symmetra' 
  | 'torbjorn' | 'tracer' | 'venture' | 'widowmaker' | 'vendetta' | 'anran' | 'emrey' | 'sierra' | 'shion'
  | 'ana' | 'baptiste' | 'brigitte' | 'illari' | 'juno' | 'kiriko' | 'lifeweaver' 
  | 'lucio' | 'mercy' | 'moira' | 'zenyatta' | 'wuyang' | 'mizuki' | 'feitianmao';

export type Role = 'tank' | 'damage' | 'support';

export type RelationStrength = 1 | 2 | 3;

export type CounterType = 'skill' | 'numeric' | 'range' | 'role';

export interface Hero {
  id: HeroId;
  name: string;
  nameEn: string;
  nickname?: string;
  pinyin?: string;
  role: Role;
  color: string;
  image: string;
}

export interface CounterRelation {
  source: HeroId;
  target: HeroId;
  strength?: RelationStrength;
  type?: CounterType;
}


// 英雄图片URL - 使用官方CDN资源
// 来源: Blizzard 官方 Overwatch 2 资源

const heroImages: Record<HeroId, string> = {
  // 坦克
  dva: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png`,
  doomfist: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png`,
  hazard: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/612ae1e6d28125bd4d4d18c2c4e5b004936c094556239ed24a1c0a806410a020.png`,
  junker_queen: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/b4fa5f937fe07ef56c78bca80be9602c062b8d4451692aecff50e2f68c5c6476.png`,
  mauga: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/9ee3f5a62893091d575ec0a0d66df878597086374202c6fc7da2d63320a7d02e.png`,
  orisa: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/71e96294617e81051d120b5d04b491bb1ea40e2933da44d6631aae149aac411d.png`,
  ramattra: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/3e0367155e1940a24da076c6f1f065aacede88dbc323631491aa0cd5a51e0b66.png`,
  reinhardt: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png`,
  roadhog: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/72e02e747b66b61fcbc02d35d350770b3ec7cbaabd0a7ca17c0d82743d43a7e8.png`,
  sigma: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/cd7a4c0a0df8924afb2c9f6df864ed040f20250440c36ca2eb634acf6609c5e4.png`,
  winston: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/bd9c8e634d89488459dfc1aeb21b602fa5c39aa05601a4167682f3a3fed4e0ee.png`,
  wrecking_ball: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/5c18e39ce567ee8a84078f775b9f76a2ba891de601c059a3d2b46b61ae4afb42.png`,
  zarya: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06f396d1e5231f7a.png`,
  domina: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/1161c112292c56c052c0ae711792fcde06e3251b98bc9709e582dd7585b5dcd6.png`,
  dmon: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a46c60b8562fdbd0b8308396d0808f7606fba208bc67cccf3f82fe56d2c73b9d.png`,

  
  // 输出
  ashe: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/8dc2a024c9b7d95c7141b2ef065590dbc8d9018d12ad15f76b01923986702228.png`,
  bastion: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/4d715f722c42215072b5dd0240904aaed7b5285df0b2b082d0a7f1865b5ea992.png`,
  cassidy: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png`,
  echo: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png`,
  freja: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/5d1a515607b70f87fd391d0478fb4d706e31a7aebfbcb0edd2cfce04efad256c.png`,
  genji: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png`,
  hanzo: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png`,
  junkrat: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/037e3df083624e5480f8996821287479a375f62b470572a22773da0eaf9441d0.png`,
  mei: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/1533fcb0ee1d3f9586f84b4067c6f63eca3322c1c661f69bfb41cd9e4f4bcc11.png`,
  pharah: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/f8261595eca3e43e3b37cadb8161902cc416e38b7e0caa855f4555001156d814.png`,
  reaper: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/2edb9af69d987bb503cd31f7013ae693640e692b321a73d175957b9e64394f40.png`,
  sojourn: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a53bf7ad9d2f33aaf9199a00989f86d4ba1f67c281ba550312c7d96e70fec4ea.png`,
  soldier76: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/20b4ef00ed05d6dba75df228241ed528df7b6c9556f04c8070bad1e2f89e0ff5.png`,
  sombra: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/bca8532688f01b071806063b9472f1c0f9fc9c7948e6b59e210006e69cec9022.png`,
  symmetra: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/7f2024c5387c9d76d944a5db021c2774d1e9d7cbf39e9b6a35b364d38ea250ac.png`,
  torbjorn: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/1309ab1add1cc19189a2c8bc7b1471f88efa1073e9705d2397fdb37d45707d01.png`,
  tracer: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a66413200e934da19540afac965cfe8a2de4ada593d9a52d53108bb28e8bbc9c.png`,
   venture: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/5d87623006ccc77578396831d4629f91b5162235a553b3f442e1a43161898e94.png`,
   widowmaker: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a714f1cb33cc91c6b5b3e89ffe7e325b99e7c89cc8e8feced594f81305147efe.png`,
   vendetta: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/62f32041c5bdcb11bdaff6581fee2a9a372d8f61e117b36a1dc8ff6d0c8a1ead.png`,
    anran: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/2cdf460c6080a031258e513713d1d635a8e68799cb5d7e27774be8963e95f6a3.png`,
    emrey: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/c51e2f698138861c0e3b6cfab3c3ca9d67fd709be175e7c397aa6f2649712a30.png`,
    
    // 支援
  ana: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812757c205e1b4568bc321772096ed86.png`,
  baptiste: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/f979896f74ba22db2a92a85ae1260124ab0a26665957a624365e0f96e5ac5b5c.png`,
  brigitte: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/48392820c6976ee1cd8dde13e71df85bf15560083ee5c8658fe7c298095d619a.png`,
  illari: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/5ea986038f9d307bd4613d5e6f2c4c8e7f15f30ceeeabbdd7a06637a38f17e1f.png`,
  juno: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/585b2d60cbd3c271b6ad5ad0922537af0c6836fab6c89cb9979077f7bb0832b5.png`,
  kiriko: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/088aff2153bdfa426984b1d5c912f6af0ab313f0865a81be0edd114e9a2f79f9.png`,
  lifeweaver: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/39d4514f1b858bc228035b09d5a74ed41f8eeefc9a0d1873570b216ba04334df.png`,
  lucio: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/e2ff2527610a0fbe0c9956f80925123ef3e66c213003e29d37436de30b90e4e1.png`,
  mercy: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/2508ddd39a178d5f6ae993ab43eeb3e7961e5a54a9507e6ae347381193f28943.png`,
  moira: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png`,
  zenyatta: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251e8e70f29de3c7bf494edacfe4.png`,
  wuyang: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/e4157a71bb307b4ca910d901773f43d187c22101c5f4284a0a5f3caba8ec4bdd.png`,
  mizuki: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a2c8dd2fdc10e5b5110062e2bd5dc3fc56e692a812f35f0fcea3b580fd01f578.png`,
  feitianmao: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/03a184cd0de27091e0099ac22635ad9615a8f6997881a5c25cc5f2444764f729.png`,
  sierra: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4bfd3d8b95844231115cb5bf4db03344c71bc3e865189c52403b2dc51438e63a.png',
  shion: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/070481cf871590a2b45a51d1335f9fe3d65eb4e4d361ecdd998b34fae2ed65d5.png',
};

// 英雄数据
export const heroes: Hero[] = [
  // 坦克英雄
  { id: 'dva', name: 'D.Va', nameEn: 'D.Va', nickname: '宋哈娜', pinyin: 'di va', role: 'tank', color: '#f59e0b', image: heroImages.dva },
  { id: 'doomfist', name: '末日铁拳', nameEn: 'Doomfist', nickname: '铁拳', pinyin: 'mo ri tie quan', role: 'tank', color: '#f59e0b', image: heroImages.doomfist },
  { id: 'hazard', name: '骇灾', nameEn: 'Hazard', pinyin: 'hai zai', role: 'tank', color: '#f59e0b', image: heroImages.hazard },
  { id: 'junker_queen', name: '渣客女王', nameEn: 'Junker Queen', pinyin: 'zha ke nv wang', role: 'tank', color: '#f59e0b', image: heroImages.junker_queen },
  { id: 'mauga', name: '毛加', nameEn: 'Mauga', pinyin: 'mao jia', role: 'tank', color: '#f59e0b', image: heroImages.mauga },
  { id: 'orisa', name: '奥丽莎', nameEn: 'Orisa', nickname: '美羊羊', pinyin: 'ao li sha', role: 'tank', color: '#f59e0b', image: heroImages.orisa },
  { id: 'ramattra', name: '拉玛刹', nameEn: 'Ramattra', nickname: '喜之郎', pinyin: 'la ma cha', role: 'tank', color: '#f59e0b', image: heroImages.ramattra },
  { id: 'reinhardt', name: '莱因哈特', nameEn: 'Reinhardt', nickname: '大锤', pinyin: 'lai yin ha te', role: 'tank', color: '#f59e0b', image: heroImages.reinhardt },
  { id: 'roadhog', name: '路霸', nameEn: 'Roadhog', nickname: '猪', pinyin: 'lu ba', role: 'tank', color: '#f59e0b', image: heroImages.roadhog },
  { id: 'sigma', name: '西格玛', nameEn: 'Sigma', pinyin: 'xi ge ma', role: 'tank', color: '#f59e0b', image: heroImages.sigma },
  { id: 'winston', name: '温斯顿', nameEn: 'Winston', nickname: '猩猩', pinyin: 'wen si dun', role: 'tank', color: '#f59e0b', image: heroImages.winston },
  { id: 'wrecking_ball', name: '破坏球', nameEn: 'Wrecking Ball', nickname: '球', pinyin: 'po huai qiu', role: 'tank', color: '#f59e0b', image: heroImages.wrecking_ball },
  { id: 'zarya', name: '查莉娅', nameEn: 'Zarya', nickname: '毛妹', pinyin: 'zha li ya', role: 'tank', color: '#f59e0b', image: heroImages.zarya },
  { id: 'domina', name: '金驭', nameEn: 'Domina', pinyin: 'jin yu', role: 'tank', color: '#f59e0b', image: heroImages.domina },
  { id: 'dmon', name: 'D.mon', nameEn: 'D.mon', pinyin: 'di mon', role: 'tank', color: '#f59e0b', image: heroImages.dmon },
  
  
  // 输出英雄
  { id: 'ashe', name: '艾什', nameEn: 'Ashe', pinyin: 'ai shi', role: 'damage', color: '#ef4444', image: heroImages.ashe },
  { id: 'bastion', name: '堡垒', nameEn: 'Bastion', nickname: '按Q键回城的那个', pinyin: 'bao lei', role: 'damage', color: '#ef4444', image: heroImages.bastion },
  { id: 'cassidy', name: '卡西迪', nameEn: 'Cassidy', nickname: '麦爹', pinyin: 'ka xi di', role: 'damage', color: '#ef4444', image: heroImages.cassidy },
  { id: 'echo', name: '回声', nameEn: 'Echo', pinyin: 'hui sheng', role: 'damage', color: '#ef4444', image: heroImages.echo },
  { id: 'freja', name: '芙蕾雅', nameEn: 'Freja', pinyin: 'fu lei ya', role: 'damage', color: '#ef4444', image: heroImages.freja },
  { id: 'genji', name: '源氏', nameEn: 'Genji', nickname: '源', pinyin: 'yuan shi', role: 'damage', color: '#ef4444', image: heroImages.genji },
  { id: 'hanzo', name: '半藏', nameEn: 'Hanzo', nickname: '随缘箭', pinyin: 'ban zang', role: 'damage', color: '#ef4444', image: heroImages.hanzo },
  { id: 'junkrat', name: '狂鼠', nameEn: 'Junkrat', pinyin: 'kuang shu', role: 'damage', color: '#ef4444', image: heroImages.junkrat },
  { id: 'mei', name: '美', nameEn: 'Mei', nickname: '小美', pinyin: 'mei', role: 'damage', color: '#ef4444', image: heroImages.mei },
  { id: 'pharah', name: '法老之鹰', nameEn: 'Pharah', nickname: '法鸡', pinyin: 'fa lao zhi ying', role: 'damage', color: '#ef4444', image: heroImages.pharah },
  { id: 'reaper', name: '死神', nameEn: 'Reaper', nickname: '活神', pinyin: 'si shen', role: 'damage', color: '#ef4444', image: heroImages.reaper },
  { id: 'sojourn', name: '索杰恩', nameEn: 'Sojourn', pinyin: 'suo jie en', role: 'damage', color: '#ef4444', image: heroImages.sojourn },
  { id: 'soldier76', name: '士兵:76', nameEn: 'Soldier: 76', pinyin: 'shi bing', role: 'damage', color: '#ef4444', image: heroImages.soldier76 },
  { id: 'sombra', name: '黑影', nameEn: 'Sombra', pinyin: 'hei ying', role: 'damage', color: '#ef4444', image: heroImages.sombra },
  { id: 'symmetra', name: '秩序之光', nameEn: 'Symmetra', nickname: '阿三', pinyin: 'zhi xu zhi guang', role: 'damage', color: '#ef4444', image: heroImages.symmetra },
  { id: 'torbjorn', name: '托比昂', nameEn: 'Torbjörn', nickname: '炮台', pinyin: 'tuo bi ang', role: 'damage', color: '#ef4444', image: heroImages.torbjorn },
  { id: 'tracer', name: '猎空', nameEn: 'Tracer', nickname: '闪光', pinyin: 'lie kong', role: 'damage', color: '#ef4444', image: heroImages.tracer },
  { id: 'venture', name: '探奇', nameEn: 'Venture', pinyin: 'tan qi', role: 'damage', color: '#ef4444', image: heroImages.venture },
  { id: 'widowmaker', name: '黑百合', nameEn: 'Widowmaker', nickname: '寡妇', pinyin: 'hei bai he', role: 'damage', color: '#ef4444', image: heroImages.widowmaker },
  { id: 'vendetta', name: '斩仇', nameEn: 'VENDETTA', pinyin: 'zhan chou', role: 'damage', color: '#ef4444', image: heroImages.vendetta },
  { id: 'anran', name: '安燃', nameEn: 'Anran', pinyin: 'an ran', role: 'damage', color: '#ef4444', image: heroImages.anran },
  { id: 'emrey', name: '埃姆雷', nameEn: 'Emrey', pinyin: 'ai mu lei', role: 'damage', color: '#ef4444', image: heroImages.emrey },
  { id: 'sierra', name: '希拉', nameEn: 'Sierra', pinyin: 'xi la', role: 'damage', color: '#ef4444', image: heroImages.sierra },
  { id: 'shion', name: '死怨', nameEn: 'Shion', pinyin: 'si yuan', role: 'damage', color: '#ef4444', image: heroImages.shion },

  // 支援英雄
  { id: 'ana', name: '安娜', nameEn: 'Ana', nickname: '安娜奶奶', pinyin: 'an na', role: 'support', color: '#22c55e', image: heroImages.ana },
  { id: 'baptiste', name: '巴蒂斯特', nameEn: 'Baptiste', pinyin: 'ba di si te', role: 'support', color: '#22c55e', image: heroImages.baptiste },
  { id: 'brigitte', name: '布丽吉塔', nameEn: 'Brigitte', pinyin: 'bu li ji ta', role: 'support', color: '#22c55e', image: heroImages.brigitte },
  { id: 'illari', name: '伊拉锐', nameEn: 'Illari', pinyin: 'yi la rui', role: 'support', color: '#22c55e', image: heroImages.illari },
  { id: 'juno', name: '朱诺', nameEn: 'Juno', nickname: '火星妹', pinyin: 'zhu nuo', role: 'support', color: '#22c55e', image: heroImages.juno },
  { id: 'kiriko', name: '雾子', nameEn: 'Kiriko', pinyin: 'wu zi', role: 'support', color: '#22c55e', image: heroImages.kiriko },
  { id: 'lifeweaver', name: '生命之梭', nameEn: 'Lifeweaver', nickname: '花男', pinyin: 'sheng ming zhi suo', role: 'support', color: '#22c55e', image: heroImages.lifeweaver },
  { id: 'lucio', name: '卢西奥', nameEn: 'Lúcio', nickname: 'DJ', pinyin: 'lu xi ao', role: 'support', color: '#22c55e', image: heroImages.lucio },
  { id: 'mercy', name: '天使', nameEn: 'Mercy', nickname: '医生', pinyin: 'tian shi', role: 'support', color: '#22c55e', image: heroImages.mercy },
  { id: 'moira', name: '莫伊拉', nameEn: 'Moira', nickname: '阿姨', pinyin: 'mo yi la', role: 'support', color: '#22c55e', image: heroImages.moira },
  { id: 'zenyatta', name: '禅雅塔', nameEn: 'Zenyatta', nickname: '和尚', pinyin: 'chan ya ta', role: 'support', color: '#22c55e', image: heroImages.zenyatta },
  { id: 'wuyang', name: '无漾', nameEn: 'Wuyang', pinyin: 'wu yang', role: 'support', color: '#22c55e', image: heroImages.wuyang },
  { id: 'mizuki', name: '瑞稀', nameEn: 'Mizuki', pinyin: 'rui xi', role: 'support', color: '#22c55e', image: heroImages.mizuki },
  { id: 'feitianmao', name: '飞天猫', nameEn: 'Jetpack Cat', pinyin: 'fei tian mao', role: 'support', color: '#22c55e', image: heroImages.feitianmao },
];

// 被克制关系数据 - 基于参考图片整理
// 克制类型说明：
// skill: 技能组克制（如源氏反弹、黑影黑客、小美冰冻等）
// numeric: 数值克制（如血量、伤害数值差异）
// range: 射程克制（远程压制近战、空中对地面等）
// role: 职责克制（重装克制支援、输出克制支援等）
export const counterRelations: CounterRelation[] = [
  // ========== 坦克篇 ==========
  // 1. D.Va被克制
  { source: 'junker_queen', target: 'dva', strength: 3, type: 'skill' }, // 渣客女王克制D.Va：抗治疗+近战压制
  { source: 'sigma', target: 'dva', strength: 3, type: 'skill' }, // 西格玛克制D.Va：动能捕获吸收弹药
  { source: 'zarya', target: 'dva', strength: 3, type: 'numeric' }, // 查莉娅克制D.Va：高能量输出压制
  { source: 'moira', target: 'dva', strength: 3, type: 'skill' }, // 莫伊拉克制D.Va：锁定光束无法被防御矩阵阻挡
  { source: 'zenyatta', target: 'dva', strength: 3, type: 'numeric' }, // 禅雅塔克制D.Va：增伤加快击杀
  { source: 'ana', target: 'dva', strength: 3, type: 'skill' }, // 安娜克制D.Va：禁疗+睡眠控制
  { source: 'symmetra', target: 'dva', strength: 3, type: 'skill' }, // 秩序之光克制D.Va：光束穿透防御矩阵
  { source: 'echo', target: 'dva', strength: 3, type: 'range' }, // 回声克制D.Va：飞行追击+粘弹爆发
  { source: 'sombra', target: 'dva', strength: 3, type: 'skill' }, // 黑影克制D.Va：黑客禁用防御矩阵
  { source: 'mei', target: 'dva', strength: 3, type: 'skill' }, // 美克制D.Va：冰冻减速
  { source: 'hanzo', target: 'dva', strength: 3, type: 'range' }, // 半藏克制D.Va：远程爆发
  { source: 'anran', target: 'dva', strength: 3, type: 'skill' }, // 安燃克制D.Va：火焰突进克制机甲
  { source: 'vendetta', target: 'dva', strength: 3, type: 'skill' }, // 斩仇克制D.Va：近战爆发克制机甲
  { source: 'brigitte', target: 'dva', strength: 3, type: 'skill' }, // 布丽吉塔克制D.Va：盾击打断
  { source: 'mizuki', target: 'dva', strength: 3, type: 'skill' }, // 瑞稀克制D.Va：护魂结界克制
  
  // 2. 末日铁拳被克制
  { source: 'roadhog', target: 'doomfist', strength: 3, type: 'skill' }, // 路霸克制末日铁拳：钩子克制突进
  { source: 'zarya', target: 'doomfist', strength: 3, type: 'skill' }, // 查莉娅克制末日铁拳：护盾吸收伤害
  { source: 'orisa', target: 'doomfist', strength: 3, type: 'skill' }, // 奥丽莎克制末日铁拳：长矛眩晕+坚毅
  { source: 'sombra', target: 'doomfist', strength: 3, type: 'skill' }, // 黑影克制末日铁拳：黑客禁用技能
  { source: 'cassidy', target: 'doomfist', strength: 3, type: 'skill' }, // 卡西迪克制末日铁拳：闪光弹+三连
  { source: 'tracer', target: 'doomfist', strength: 3, type: 'skill' }, // 猎空克制末日铁拳：高机动闪避
  { source: 'ana', target: 'doomfist', strength: 3, type: 'skill' }, // 安娜克制末日铁拳：睡眠针打断
  { source: 'juno', target: 'doomfist', strength: 3, type: 'skill' }, // 朱诺克制末日铁拳：环形轨道控制
  { source: 'brigitte', target: 'doomfist', strength: 3, type: 'skill' }, // 布丽吉塔克制末日铁拳：盾击打断
  { source: 'mizuki', target: 'doomfist', strength: 3, type: 'skill' }, // 瑞稀克制末日铁拳：护魂结界
  { source: 'feitianmao', target: 'doomfist', strength: 3, type: 'range' }, // 飞天猫克制末日铁拳：空中压制
  { source: 'symmetra', target: 'doomfist', strength: 3, type: 'skill' }, // 秩序之光克制末日铁拳：光束克制近战
  
  // 3. 莱因哈特被克制
  { source: 'orisa', target: 'reinhardt', strength: 3, type: 'skill' }, // 奥丽莎克制莱因哈特：长矛克制举盾
  { source: 'winston', target: 'reinhardt', strength: 3, type: 'role' }, // 温斯顿克制莱因哈特：机动突击克制站桩
  { source: 'ramattra', target: 'reinhardt', strength: 3, type: 'skill' }, // 拉玛刹克制莱因哈特：涅槃形态克制
  { source: 'pharah', target: 'reinhardt', strength: 3, type: 'range' }, // 法老之鹰克制莱因哈特：空中输出
  { source: 'ashe', target: 'reinhardt', strength: 3, type: 'range' }, // 艾什克制莱因哈特：远程狙击
  { source: 'echo', target: 'reinhardt', strength: 3, type: 'range' }, // 回声克制莱因哈特：飞行输出
  { source: 'bastion', target: 'reinhardt', strength: 3, type: 'numeric' }, // 堡垒克制莱因哈特：高DPS破盾
  { source: 'mei', target: 'reinhardt', strength: 3, type: 'skill' }, // 美克制莱因哈特：冰冻限制
  { source: 'junkrat', target: 'reinhardt', strength: 3, type: 'numeric' }, // 狂鼠克制莱因哈特：炸弹破盾
  { source: 'torbjorn', target: 'reinhardt', strength: 3, type: 'numeric' }, // 托比昂克制莱因哈特：炮塔输出
  { source: 'ana', target: 'reinhardt', strength: 3, type: 'skill' }, // 安娜克制莱因哈特：禁疗+睡眠
  { source: 'baptiste', target: 'reinhardt', strength: 3, type: 'skill' }, // 巴蒂斯特克制莱因哈特：矩阵保护队友
  { source: 'brigitte', target: 'reinhardt', strength: 3, type: 'skill' }, // 布丽吉塔克制莱因哈特：击退
  { source: 'zenyatta', target: 'reinhardt', strength: 3, type: 'numeric' }, // 禅雅塔克制莱因哈特：增伤
  { source: 'lucio', target: 'reinhardt', strength: 3, type: 'skill' }, // 卢西奥克制莱因哈特：加速拉扯
  { source: 'illari', target: 'reinhardt', strength: 3, type: 'range' }, // 伊拉锐克制莱因哈特：远程输出
  { source: 'anran', target: 'reinhardt', strength: 3, type: 'skill' }, // 安燃克制莱因哈特：火焰克制
  { source: 'feitianmao', target: 'reinhardt', strength: 3, type: 'range' }, // 飞天猫克制莱因哈特：空中压制
  { source: 'wuyang', target: 'reinhardt', strength: 3, type: 'skill' }, // 无漾克制莱因哈特：水元素控制
  { source: 'juno', target: 'reinhardt', strength: 3, type: 'skill' }, // 朱诺克制莱因哈特：远程控制
  
  // 4. 骇灾被克制
  { source: 'dva', target: 'hazard', strength: 3, type: 'skill' }, // D.Va克制骇灾：防御矩阵
  { source: 'sigma', target: 'hazard', strength: 3, type: 'skill' }, // 西格玛克制骇灾：动能捕获
  { source: 'doomfist', target: 'hazard', strength: 3, type: 'skill' }, // 末日铁拳克制骇灾：高机动突进
  { source: 'roadhog', target: 'hazard', strength: 3, type: 'skill' }, // 路霸克制骇灾：钩子秒杀
  { source: 'orisa', target: 'hazard', strength: 3, type: 'skill' }, // 奥丽莎克制骇灾：长矛+坚毅
  { source: 'zarya', target: 'hazard', strength: 3, type: 'numeric' }, // 查莉娅克制骇灾：高能量输出
  { source: 'tracer', target: 'hazard', strength: 3, type: 'skill' }, // 猎空克制骇灾：高机动骚扰
  { source: 'sojourn', target: 'hazard', strength: 3, type: 'range' }, // 索杰恩克制骇灾：远程点射
  { source: 'torbjorn', target: 'hazard', strength: 3, type: 'numeric' }, // 托比昂克制骇灾：炮塔输出
  { source: 'echo', target: 'hazard', strength: 3, type: 'range' }, // 回声克制骇灾：飞行输出
  { source: 'ana', target: 'hazard', strength: 3, type: 'skill' }, // 安娜克制骇灾：禁疗
  { source: 'zenyatta', target: 'hazard', strength: 3, type: 'numeric' }, // 禅雅塔克制骇灾：增伤
  { source: 'brigitte', target: 'hazard', strength: 3, type: 'skill' }, // 布丽吉塔克制骇灾：盾击
  
  // 5. 路霸被克制
  { source: 'junker_queen', target: 'roadhog', strength: 3, type: 'skill' }, // 渣客女王克制路霸：抗治疗克制回血
  { source: 'zarya', target: 'roadhog', strength: 3, type: 'numeric' }, // 查莉娅克制路霸：高能量
  { source: 'orisa', target: 'roadhog', strength: 3, type: 'skill' }, // 奥丽莎克制路霸：长矛眩晕
  { source: 'doomfist', target: 'roadhog', strength: 3, type: 'skill' }, // 末日铁拳克制路霸：高机动躲钩子
  { source: 'mauga', target: 'roadhog', strength: 3, type: 'numeric' }, // 毛加克制路霸：双枪压制
  { source: 'reinhardt', target: 'roadhog', strength: 3, type: 'skill' }, // 莱因哈特克制路霸：举盾挡钩子
  { source: 'echo', target: 'roadhog', strength: 3, type: 'range' }, // 回声克制路霸：飞行输出
  { source: 'widowmaker', target: 'roadhog', strength: 3, type: 'range' }, // 黑百合克制路霸：狙击
  { source: 'mei', target: 'roadhog', strength: 3, type: 'skill' }, // 美克制路霸：冰冻
  { source: 'pharah', target: 'roadhog', strength: 3, type: 'range' }, // 法老之鹰克制路霸：空中输出
  { source: 'reaper', target: 'roadhog', strength: 3, type: 'numeric' }, // 死神克制路霸：近距离爆发
  { source: 'sojourn', target: 'roadhog', strength: 3, type: 'range' }, // 索杰恩克制路霸：轨道炮
  { source: 'genji', target: 'roadhog', strength: 3, type: 'skill' }, // 源氏克制路霸：反弹钩子
  { source: 'ashe', target: 'roadhog', strength: 3, type: 'range' }, // 艾什克制路霸：狙击
  { source: 'hanzo', target: 'roadhog', strength: 3, type: 'range' }, // 半藏克制路霸：远程爆发
  { source: 'sombra', target: 'roadhog', strength: 3, type: 'skill' }, // 黑影克制路霸：黑客
  { source: 'zenyatta', target: 'roadhog', strength: 3, type: 'numeric' }, // 禅雅塔克制路霸：增伤
  { source: 'ana', target: 'roadhog', strength: 3, type: 'skill' }, // 安娜克制路霸：禁疗
  { source: 'baptiste', target: 'roadhog', strength: 3, type: 'skill' }, // 巴蒂斯特克制路霸：矩阵
  { source: 'brigitte', target: 'roadhog', strength: 3, type: 'skill' }, // 布丽吉塔克制路霸：击退还血
  { source: 'anran', target: 'roadhog', strength: 3, type: 'skill' }, // 安燃克制路霸：火焰克制
  
  // 6. 渣客女王被克制
  { source: 'orisa', target: 'junker_queen', strength: 3, type: 'skill' }, // 奥丽莎克制渣客女王：长矛克制近战
  { source: 'doomfist', target: 'junker_queen', strength: 3, type: 'skill' }, // 末日铁拳克制渣客女王：高机动
  { source: 'mauga', target: 'junker_queen', strength: 3, type: 'numeric' }, // 毛加克制渣客女王：火力压制
  { source: 'hazard', target: 'junker_queen', strength: 3, type: 'skill' }, // 骇灾克制渣客女王：毒素克制
  { source: 'zarya', target: 'junker_queen', strength: 3, type: 'numeric' }, // 查莉娅克制渣客女王：高能量
  { source: 'pharah', target: 'junker_queen', strength: 3, type: 'range' }, // 法老之鹰克制渣客女王：空中输出
  { source: 'mei', target: 'junker_queen', strength: 3, type: 'skill' }, // 美克制渣客女王：冰冻
  { source: 'torbjorn', target: 'junker_queen', strength: 3, type: 'numeric' }, // 托比昂克制渣客女王：炮塔
  { source: 'sojourn', target: 'junker_queen', strength: 3, type: 'range' }, // 索杰恩克制渣客女王：轨道炮
  { source: 'echo', target: 'junker_queen', strength: 3, type: 'range' }, // 回声克制渣客女王：飞行输出
  { source: 'juno', target: 'junker_queen', strength: 3, type: 'skill' }, // 朱诺克制渣客女王：控制
  { source: 'ana', target: 'junker_queen', strength: 3, type: 'skill' }, // 安娜克制渣客女王：禁疗
  { source: 'lucio', target: 'junker_queen', strength: 3, type: 'skill' }, // 卢西奥克制渣客女王：加速拉扯
  { source: 'kiriko', target: 'junker_queen', strength: 3, type: 'skill' }, // 雾子克制渣客女王：净化抗治疗
  { source: 'mizuki', target: 'junker_queen', strength: 3, type: 'skill' }, // 瑞稀克制渣客女王：瑞稀克制

  // 7. 西格玛被克制
  { source: 'doomfist', target: 'sigma', strength: 3, type: 'skill' }, // 末日铁拳克制西格玛：近战克制
  { source: 'winston', target: 'sigma', strength: 3, type: 'skill' }, // 温斯顿克制西格玛：跳脸
  { source: 'reinhardt', target: 'sigma', strength: 3, type: 'skill' }, // 莱因哈特克制西格玛：近身锤击
  { source: 'ramattra', target: 'sigma', strength: 3, type: 'skill' }, // 拉玛刹克制西格玛：涅槃形态
  { source: 'symmetra', target: 'sigma', strength: 3, type: 'skill' }, // 秩序之光克制西格玛：光束
  { source: 'mei', target: 'sigma', strength: 3, type: 'skill' }, // 美克制西格玛：冰冻
  { source: 'sombra', target: 'sigma', strength: 3, type: 'skill' }, // 黑影克制西格玛：黑客
  { source: 'pharah', target: 'sigma', strength: 3, type: 'range' }, // 法老之鹰克制西格玛：空中输出
  { source: 'kiriko', target: 'sigma', strength: 3, type: 'skill' }, // 雾子克制西格玛：净化
  { source: 'brigitte', target: 'sigma', strength: 3, type: 'skill' }, // 布丽吉塔克制西格玛：近战
  { source: 'zenyatta', target: 'sigma', strength: 3, type: 'numeric' }, // 禅雅塔克制西格玛：增伤
  { source: 'lifeweaver', target: 'sigma', strength: 3, type: 'skill' }, // 生命之梭克制西格玛：控制
  { source: 'moira', target: 'sigma', strength: 3, type: 'skill' }, // 莫伊拉克制西格玛：光束
  { source: 'wuyang', target: 'sigma', strength: 3, type: 'skill' }, // 无漾克制西格玛：水元素
  
  // 8. 毛加被克制
  { source: 'sigma', target: 'mauga', strength: 3, type: 'skill' }, // 西格玛克制毛加：石头控制
  { source: 'zarya', target: 'mauga', strength: 3, type: 'numeric' }, // 查莉娅克制毛加：高能量
  { source: 'orisa', target: 'mauga', strength: 3, type: 'skill' }, // 奥丽莎克制毛加：长矛
  { source: 'echo', target: 'mauga', strength: 3, type: 'range' }, // 回声克制毛加：飞行输出
  { source: 'reaper', target: 'mauga', strength: 3, type: 'numeric' }, // 死神克制毛加：近距离爆发
  { source: 'sojourn', target: 'mauga', strength: 3, type: 'range' }, // 索杰恩克制毛加：轨道炮
  { source: 'widowmaker', target: 'mauga', strength: 3, type: 'range' }, // 黑百合克制毛加：狙击
  { source: 'zenyatta', target: 'mauga', strength: 3, type: 'numeric' }, // 禅雅塔克制毛加：增伤
  { source: 'ana', target: 'mauga', strength: 3, type: 'skill' }, // 安娜克制毛加：禁疗
  { source: 'juno', target: 'mauga', strength: 3, type: 'skill' }, // 朱诺克制毛加：控制
  
  // 9. 温斯顿被克制
  { source: 'hazard', target: 'winston', strength: 3, type: 'skill' }, // 骇灾克制温斯顿：毒素
  { source: 'mauga', target: 'winston', strength: 3, type: 'numeric' }, // 毛加克制温斯顿：火力压制
  { source: 'junker_queen', target: 'winston', strength: 3, type: 'skill' }, // 渣客女王克制温斯顿：抗治疗
  { source: 'dva', target: 'winston', strength: 3, type: 'skill' }, // D.Va克制温斯顿：防御矩阵
  { source: 'torbjorn', target: 'winston', strength: 3, type: 'numeric' }, // 托比昂克制温斯顿：炮塔
  { source: 'bastion', target: 'winston', strength: 3, type: 'numeric' }, // 堡垒克制温斯顿：高DPS
  { source: 'reaper', target: 'winston', strength: 3, type: 'numeric' }, // 死神克制温斯顿：近距离爆发
  { source: 'cassidy', target: 'winston', strength: 3, type: 'skill' }, // 卡西迪克制温斯顿：闪光弹
  { source: 'echo', target: 'winston', strength: 3, type: 'range' }, // 回声克制温斯顿：飞行输出
  { source: 'junkrat', target: 'winston', strength: 3, type: 'numeric' }, // 狂鼠克制温斯顿：炸弹
  { source: 'lucio', target: 'winston', strength: 3, type: 'skill' }, // 卢西奥克制温斯顿：加速拉扯
  { source: 'illari', target: 'winston', strength: 3, type: 'range' }, // 伊拉锐克制温斯顿：远程输出
  { source: 'ana', target: 'winston', strength: 3, type: 'skill' }, // 安娜克制温斯顿：睡眠针
  { source: 'brigitte', target: 'winston', strength: 3, type: 'skill' }, // 布丽吉塔克制温斯顿：击退还血
  { source: 'zenyatta', target: 'winston', strength: 3, type: 'numeric' }, // 禅雅塔克制温斯顿：增伤
  { source: 'hanzo', target: 'winston', strength: 3, type: 'range' }, // 半藏克制温斯顿：远程爆发
  { source: 'mizuki', target: 'winston', strength: 3, type: 'skill' }, // 瑞稀克制温斯顿：护魂结界
  
  // 10. 奥丽莎被克制
  { source: 'sigma', target: 'orisa', strength: 3, type: 'skill' }, // 西格玛克制奥丽莎：石头+动能捕获
  { source: 'winston', target: 'orisa', strength: 3, type: 'skill' }, // 温斯顿克制奥丽莎：跳脸
  { source: 'zarya', target: 'orisa', strength: 3, type: 'numeric' }, // 查莉娅克制奥丽莎：高能量
  { source: 'wrecking_ball', target: 'orisa', strength: 3, type: 'skill' }, // 破坏球克制奥丽莎：机动骚扰
  { source: 'baptiste', target: 'orisa', strength: 3, type: 'skill' }, // 巴蒂斯特克制奥丽莎：矩阵
  { source: 'hanzo', target: 'orisa', strength: 3, type: 'range' }, // 半藏克制奥丽莎：远程爆发
  { source: 'ashe', target: 'orisa', strength: 3, type: 'range' }, // 艾什克制奥丽莎：狙击
  { source: 'sojourn', target: 'orisa', strength: 3, type: 'range' }, // 索杰恩克制奥丽莎：轨道炮
  { source: 'tracer', target: 'orisa', strength: 3, type: 'skill' }, // 猎空克制奥丽莎：高机动
  { source: 'junkrat', target: 'orisa', strength: 3, type: 'numeric' }, // 狂鼠克制奥丽莎：炸弹
  { source: 'echo', target: 'orisa', strength: 3, type: 'range' }, // 回声克制奥丽莎：飞行输出
  { source: 'widowmaker', target: 'orisa', strength: 3, type: 'range' }, // 黑百合克制奥丽莎：狙击
  { source: 'pharah', target: 'orisa', strength: 3, type: 'range' }, // 法老之鹰克制奥丽莎：空中输出
  { source: 'bastion', target: 'orisa', strength: 3, type: 'numeric' }, // 堡垒克制奥丽莎：高DPS
  { source: 'ana', target: 'orisa', strength: 3, type: 'skill' }, // 安娜克制奥丽莎：禁疗
  { source: 'illari', target: 'orisa', strength: 3, type: 'range' }, // 伊拉锐克制奥丽莎：远程输出
  { source: 'zenyatta', target: 'orisa', strength: 3, type: 'numeric' }, // 禅雅塔克制奥丽莎：增伤
  
  // 11. 破坏球被克制
  { source: 'orisa', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 奥丽莎克制破坏球：长矛
  { source: 'dva', target: 'wrecking_ball', strength: 3, type: 'skill' }, // D.Va克制破坏球：防御矩阵
  { source: 'doomfist', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 末日铁拳克制破坏球：高机动
  { source: 'mauga', target: 'wrecking_ball', strength: 3, type: 'numeric' }, // 毛加克制破坏球：火力压制
  { source: 'roadhog', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 路霸克制破坏球：钩子
  { source: 'sombra', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 黑影克制破坏球：黑客
  { source: 'cassidy', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 卡西迪克制破坏球：闪光弹
  { source: 'tracer', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 猎空克制破坏球：高机动
  { source: 'sojourn', target: 'wrecking_ball', strength: 3, type: 'range' }, // 索杰恩克制破坏球：轨道炮
  { source: 'torbjorn', target: 'wrecking_ball', strength: 3, type: 'numeric' }, // 托比昂克制破坏球：炮塔
  { source: 'ana', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 安娜克制破坏球：睡眠针
  { source: 'brigitte', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 布丽吉塔克制破坏球：盾击
  { source: 'lucio', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 卢西奥克制破坏球：加速拉扯
  { source: 'domina', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 金驭克制破坏球：金驭克制
  { source: 'feitianmao', target: 'wrecking_ball', strength: 3, type: 'range' }, // 飞天猫克制破坏球：空中压制
  { source: 'mizuki', target: 'wrecking_ball', strength: 3, type: 'skill' }, // 瑞稀克制破坏球：护魂结界
  
  // 12. 拉玛刹被克制
  { source: 'sigma', target: 'ramattra', strength: 3, type: 'skill' }, // 西格玛克制拉玛刹：动能捕获
  { source: 'junker_queen', target: 'ramattra', strength: 3, type: 'skill' }, // 渣客女王克制拉玛刹：抗治疗
  { source: 'mauga', target: 'ramattra', strength: 3, type: 'numeric' }, // 毛加克制拉玛刹：火力压制
  { source: 'roadhog', target: 'ramattra', strength: 3, type: 'skill' }, // 路霸克制拉玛刹：钩子
  { source: 'hazard', target: 'ramattra', strength: 3, type: 'skill' }, // 骇灾克制拉玛刹：毒素
  { source: 'bastion', target: 'ramattra', strength: 3, type: 'numeric' }, // 堡垒克制拉玛刹：高DPS
  { source: 'pharah', target: 'ramattra', strength: 3, type: 'range' }, // 法老之鹰克制拉玛刹：空中输出
  { source: 'genji', target: 'ramattra', strength: 3, type: 'skill' }, // 源氏克制拉玛刹：反弹
  { source: 'torbjorn', target: 'ramattra', strength: 3, type: 'numeric' }, // 托比昂克制拉玛刹：炮塔
  { source: 'sojourn', target: 'ramattra', strength: 3, type: 'range' }, // 索杰恩克制拉玛刹：轨道炮
  { source: 'reaper', target: 'ramattra', strength: 3, type: 'numeric' }, // 死神克制拉玛刹：近距离爆发
  { source: 'mei', target: 'ramattra', strength: 3, type: 'skill' }, // 美克制拉玛刹：冰冻
  { source: 'tracer', target: 'ramattra', strength: 3, type: 'skill' }, // 猎空克制拉玛刹：高机动
  { source: 'echo', target: 'ramattra', strength: 3, type: 'range' }, // 回声克制拉玛刹：飞行输出
  { source: 'juno', target: 'ramattra', strength: 3, type: 'skill' }, // 朱诺克制拉玛刹：控制
  { source: 'ana', target: 'ramattra', strength: 3, type: 'skill' }, // 安娜克制拉玛刹：禁疗
  { source: 'baptiste', target: 'ramattra', strength: 3, type: 'skill' }, // 巴蒂斯特克制拉玛刹：矩阵
  { source: 'illari', target: 'ramattra', strength: 3, type: 'range' }, // 伊拉锐克制拉玛刹：远程输出
  { source: 'zenyatta', target: 'ramattra', strength: 3, type: 'numeric' }, // 禅雅塔克制拉玛刹：增伤
  { source: 'feitianmao', target: 'ramattra', strength: 3, type: 'range' }, // 飞天猫克制拉玛刹：空中压制
  
  // 13. 查莉娅被克制
  { source: 'winston', target: 'zarya', strength: 3, type: 'skill' }, // 温斯顿克制查莉娅：跳脸
  { source: 'wrecking_ball', target: 'zarya', strength: 3, type: 'skill' }, // 破坏球克制查莉娅：机动骚扰
  { source: 'ramattra', target: 'zarya', strength: 3, type: 'skill' }, // 拉玛刹克制查莉娅：涅槃形态
  { source: 'reinhardt', target: 'zarya', strength: 3, type: 'skill' }, // 莱因哈特克制查莉娅：举盾推进
  { source: 'widowmaker', target: 'zarya', strength: 3, type: 'range' }, // 黑百合克制查莉娅：狙击
  { source: 'mei', target: 'zarya', strength: 3, type: 'skill' }, // 美克制查莉娅：冰冻
  { source: 'ashe', target: 'zarya', strength: 3, type: 'range' }, // 艾什克制查莉娅：狙击
  { source: 'zenyatta', target: 'zarya', strength: 3, type: 'numeric' }, // 禅雅塔克制查莉娅：增伤
  { source: 'lifeweaver', target: 'zarya', strength: 3, type: 'skill' }, // 生命之梭克制查莉娅：控制
  
  // ========== 输出篇 ==========
  // 1. 艾什被克制
  { source: 'winston', target: 'ashe', strength: 3, type: 'skill' }, // 温斯顿克制艾什：跳脸
  { source: 'ramattra', target: 'ashe', strength: 3, type: 'skill' }, // 拉玛刹克制艾什：远程控制
  { source: 'hazard', target: 'ashe', strength: 3, type: 'skill' }, // 骇灾克制艾什：毒素
  { source: 'hanzo', target: 'ashe', strength: 3, type: 'range' }, // 半藏克制艾什：远程爆发
  { source: 'widowmaker', target: 'ashe', strength: 3, type: 'range' }, // 黑百合克制艾什：狙击克制
  { source: 'tracer', target: 'ashe', strength: 3, type: 'skill' }, // 猎空克制艾什：高机动
  { source: 'sojourn', target: 'ashe', strength: 3, type: 'range' }, // 索杰恩克制艾什：轨道炮
  { source: 'zenyatta', target: 'ashe', strength: 3, type: 'numeric' }, // 禅雅塔克制艾什：增伤
  { source: 'illari', target: 'ashe', strength: 3, type: 'range' }, // 伊拉锐克制艾什：远程输出
  { source: 'freja', target: 'ashe', strength: 3, type: 'skill' }, // 芙蕾雅克制艾什：芙蕾雅克制
  
  // 2. 死神被克制
  { source: 'sigma', target: 'reaper', strength: 3, type: 'skill' }, // 西格玛克制死神：动能捕获
  { source: 'zarya', target: 'reaper', strength: 3, type: 'numeric' }, // 查莉娅克制死神：高能量
  { source: 'orisa', target: 'reaper', strength: 3, type: 'skill' }, // 奥丽莎克制死神：长矛
  { source: 'ashe', target: 'reaper', strength: 3, type: 'range' }, // 艾什克制死神：狙击
  { source: 'hanzo', target: 'reaper', strength: 3, type: 'range' }, // 半藏克制死神：远程爆发
  { source: 'pharah', target: 'reaper', strength: 3, type: 'range' }, // 法老之鹰克制死神：空中输出
  { source: 'widowmaker', target: 'reaper', strength: 3, type: 'range' }, // 黑百合克制死神：狙击
  { source: 'cassidy', target: 'reaper', strength: 3, type: 'skill' }, // 卡西迪克制死神：闪光弹
  { source: 'echo', target: 'reaper', strength: 3, type: 'range' }, // 回声克制死神：飞行输出
  { source: 'tracer', target: 'reaper', strength: 3, type: 'skill' }, // 猎空克制死神：高机动
  { source: 'sojourn', target: 'reaper', strength: 3, type: 'range' }, // 索杰恩克制死神：轨道炮
  { source: 'torbjorn', target: 'reaper', strength: 3, type: 'numeric' }, // 托比昂克制死神：炮塔
  { source: 'genji', target: 'reaper', strength: 2, type: 'skill' }, // 源氏克制死神：反弹
  { source: 'symmetra', target: 'reaper', strength: 3, type: 'skill' }, // 秩序之光克制死神：光束
  { source: 'ana', target: 'reaper', strength: 3, type: 'skill' }, // 安娜克制死神：禁疗
  { source: 'baptiste', target: 'reaper', strength: 3, type: 'skill' }, // 巴蒂斯特克制死神：矩阵
  { source: 'brigitte', target: 'reaper', strength: 3, type: 'skill' }, // 布丽吉塔克制死神：击退
  { source: 'zenyatta', target: 'reaper', strength: 3, type: 'numeric' }, // 禅雅塔克制死神：增伤
  { source: 'lucio', target: 'reaper', strength: 3, type: 'skill' }, // 卢西奥克制死神：加速拉扯
  { source: 'illari', target: 'reaper', strength: 3, type: 'range' }, // 伊拉锐克制死神：远程输出
  { source: 'juno', target: 'reaper', strength: 3, type: 'skill' }, // 朱诺克制死神：控制
  { source: 'junkrat', target: 'reaper', strength: 3, type: 'numeric' }, // 狂鼠克制死神：炸弹
  
  // 3. 堡垒被克制
  { source: 'sigma', target: 'bastion', strength: 3, type: 'skill' }, // 西格玛克制堡垒：动能捕获
  { source: 'junker_queen', target: 'bastion', strength: 3, type: 'skill' }, // 渣客女王克制堡垒：抗治疗
  { source: 'dva', target: 'bastion', strength: 3, type: 'skill' }, // D.Va克制堡垒：防御矩阵
  { source: 'hazard', target: 'bastion', strength: 3, type: 'skill' }, // 骇灾克制堡垒：毒素
  { source: 'mauga', target: 'bastion', strength: 3, type: 'numeric' }, // 毛加克制堡垒：火力压制
  { source: 'ashe', target: 'bastion', strength: 3, type: 'range' }, // 艾什克制堡垒：狙击
  { source: 'hanzo', target: 'bastion', strength: 3, type: 'range' }, // 半藏克制堡垒：远程爆发
  { source: 'widowmaker', target: 'bastion', strength: 3, type: 'range' }, // 黑百合克制堡垒：狙击
  { source: 'echo', target: 'bastion', strength: 3, type: 'range' }, // 回声克制堡垒：飞行输出
  { source: 'junkrat', target: 'bastion', strength: 3, type: 'numeric' }, // 狂鼠克制堡垒：炸弹
  { source: 'pharah', target: 'bastion', strength: 3, type: 'range' }, // 法老之鹰克制堡垒：空中输出
  { source: 'sojourn', target: 'bastion', strength: 3, type: 'range' }, // 索杰恩克制堡垒：轨道炮
  { source: 'genji', target: 'bastion', strength: 3, type: 'skill' }, // 源氏克制堡垒：反弹
  { source: 'symmetra', target: 'bastion', strength: 3, type: 'skill' }, // 秩序之光克制堡垒：光束
  { source: 'ana', target: 'bastion', strength: 3, type: 'skill' }, // 安娜克制堡垒：禁疗
  { source: 'zenyatta', target: 'bastion', strength: 3, type: 'numeric' }, // 禅雅塔克制堡垒：增伤
  { source: 'illari', target: 'bastion', strength: 3, type: 'range' }, // 伊拉锐克制堡垒：远程输出
  { source: 'domina', target: 'bastion', strength: 3, type: 'skill' }, // 金驭克制堡垒：金驭克制
  { source: 'wuyang', target: 'bastion', strength: 3, type: 'skill' }, // 无漾克制堡垒：水元素
  
  // 4. 索杰恩被克制
  { source: 'winston', target: 'sojourn', strength: 3, type: 'skill' }, // 温斯顿克制索杰恩：跳脸
  { source: 'widowmaker', target: 'sojourn', strength: 3, type: 'range' }, // 黑百合克制索杰恩：狙击克制
  { source: 'echo', target: 'sojourn', strength: 3, type: 'range' }, // 回声克制索杰恩：飞行输出
  { source: 'tracer', target: 'sojourn', strength: 3, type: 'skill' }, // 猎空克制索杰恩：高机动
  { source: 'symmetra', target: 'sojourn', strength: 3, type: 'skill' }, // 秩序之光克制索杰恩：光束
  
  // 5. 卡西迪被克制
  { source: 'hazard', target: 'cassidy', strength: 3, type: 'skill' }, // 骇灾克制卡西迪：毒素
  { source: 'zarya', target: 'cassidy', strength: 3, type: 'numeric' }, // 查莉娅克制卡西迪：高能量
  { source: 'orisa', target: 'cassidy', strength: 3, type: 'skill' }, // 奥丽莎克制卡西迪：长矛
  { source: 'mauga', target: 'cassidy', strength: 3, type: 'numeric' }, // 毛加克制卡西迪：火力压制
  { source: 'mei', target: 'cassidy', strength: 3, type: 'skill' }, // 美克制卡西迪：冰冻
  { source: 'ashe', target: 'cassidy', strength: 3, type: 'range' }, // 艾什克制卡西迪：狙击
  { source: 'sojourn', target: 'cassidy', strength: 3, type: 'range' }, // 索杰恩克制卡西迪：轨道炮
  { source: 'hanzo', target: 'cassidy', strength: 3, type: 'range' }, // 半藏克制卡西迪：远程爆发
  { source: 'soldier76', target: 'cassidy', strength: 3, type: 'numeric' }, // 士兵:76克制卡西迪：输出压制
  { source: 'torbjorn', target: 'cassidy', strength: 3, type: 'numeric' }, // 托比昂克制卡西迪：炮塔
  { source: 'widowmaker', target: 'cassidy', strength: 3, type: 'range' }, // 黑百合克制卡西迪：狙击
  { source: 'zenyatta', target: 'cassidy', strength: 3, type: 'numeric' }, // 禅雅塔克制卡西迪：增伤
  { source: 'baptiste', target: 'cassidy', strength: 3, type: 'skill' }, // 巴蒂斯特克制卡西迪：矩阵
  { source: 'ana', target: 'cassidy', strength: 3, type: 'skill' }, // 安娜克制卡西迪：禁疗
  { source: 'illari', target: 'cassidy', strength: 3, type: 'range' }, // 伊拉锐克制卡西迪：远程输出
  { source: 'emrey', target: 'cassidy', strength: 3, type: 'skill' }, // 埃姆雷克制卡西迪：埃姆雷克制
  
  // 6. 士兵76被克制
  { source: 'sigma', target: 'soldier76', strength: 3, type: 'skill' }, // 西格玛克制士兵:76：动能捕获
  { source: 'winston', target: 'soldier76', strength: 3, type: 'skill' }, // 温斯顿克制士兵:76：跳脸
  { source: 'doomfist', target: 'soldier76', strength: 3, type: 'skill' }, // 末日铁拳克制士兵:76：高机动
  { source: 'wrecking_ball', target: 'soldier76', strength: 3, type: 'skill' }, // 破坏球克制士兵:76：机动骚扰
  { source: 'junker_queen', target: 'soldier76', strength: 3, type: 'skill' }, // 渣客女王克制士兵:76：抗治疗
  { source: 'mauga', target: 'soldier76', strength: 3, type: 'numeric' }, // 毛加克制士兵:76：火力压制
  { source: 'hazard', target: 'soldier76', strength: 3, type: 'skill' }, // 骇灾克制士兵:76：毒素
  { source: 'dva', target: 'soldier76', strength: 3, type: 'skill' }, // D.Va克制士兵:76：防御矩阵
  { source: 'sojourn', target: 'soldier76', strength: 3, type: 'range' }, // 索杰恩克制士兵:76：轨道炮
  { source: 'reaper', target: 'soldier76', strength: 3, type: 'numeric' }, // 死神克制士兵:76：近距离爆发
  { source: 'bastion', target: 'soldier76', strength: 3, type: 'numeric' }, // 堡垒克制士兵:76：高DPS
  { source: 'ashe', target: 'soldier76', strength: 3, type: 'range' }, // 艾什克制士兵:76：狙击
  { source: 'widowmaker', target: 'soldier76', strength: 3, type: 'range' }, // 黑百合克制士兵:76：狙击
  { source: 'hanzo', target: 'soldier76', strength: 3, type: 'range' }, // 半藏克制士兵:76：远程爆发
  { source: 'zenyatta', target: 'soldier76', strength: 3, type: 'numeric' }, // 禅雅塔克制士兵:76：增伤
  { source: 'baptiste', target: 'soldier76', strength: 3, type: 'skill' }, // 巴蒂斯特克制士兵:76：矩阵
  { source: 'illari', target: 'soldier76', strength: 3, type: 'range' }, // 伊拉锐克制士兵:76：远程输出
  { source: 'emrey', target: 'soldier76', strength: 3, type: 'skill' }, // 埃姆雷克制士兵:76：埃姆雷克制
  { source: 'vendetta', target: 'soldier76', strength: 3, type: 'skill' }, // 斩仇克制士兵:76：斩仇克制
  
  // 7. 回声被克制
  { source: 'winston', target: 'echo', strength: 3, type: 'skill' }, // 温斯顿克制回声：跳脸
  { source: 'zarya', target: 'echo', strength: 3, type: 'numeric' }, // 查莉娅克制回声：高能量
  { source: 'ashe', target: 'echo', strength: 3, type: 'range' }, // 艾什克制回声：狙击
  { source: 'soldier76', target: 'echo', strength: 3, type: 'range' }, // 士兵:76克制回声：即时命中克制飞行
  { source: 'widowmaker', target: 'echo', strength: 3, type: 'range' }, // 黑百合克制回声：狙击
  { source: 'ana', target: 'echo', strength: 3, type: 'skill' }, // 安娜克制回声：禁疗
  { source: 'baptiste', target: 'echo', strength: 3, type: 'skill' }, // 巴蒂斯特克制回声：矩阵
  { source: 'illari', target: 'echo', strength: 3, type: 'range' }, // 伊拉锐克制回声：远程输出
  { source: 'sierra', target: 'echo', strength: 2, type: 'skill' }, // 希拉克制回声：Sierra克制
  
  // 8. 黑影被克制
  { source: 'winston', target: 'sombra', strength: 3, type: 'skill' }, // 温斯顿克制黑影：跳脸
  { source: 'zarya', target: 'sombra', strength: 3, type: 'numeric' }, // 查莉娅克制黑影：高能量
  { source: 'dva', target: 'sombra', strength: 3, type: 'skill' }, // D.Va克制黑影：防御矩阵
  { source: 'torbjorn', target: 'sombra', strength: 3, type: 'skill' }, // 托比昂克制黑影：炮塔自动追踪限制潜行骚扰
  { source: 'tracer', target: 'sombra', strength: 3, type: 'skill' }, // 猎空克制黑影：高机动
  { source: 'soldier76', target: 'sombra', strength: 3, type: 'numeric' }, // 士兵:76克制黑影：输出压制
  { source: 'sojourn', target: 'sombra', strength: 3, type: 'range' }, // 索杰恩克制黑影：轨道炮
  { source: 'symmetra', target: 'sombra', strength: 3, type: 'skill' }, // 秩序之光克制黑影：光束
  { source: 'cassidy', target: 'sombra', strength: 3, type: 'skill' }, // 卡西迪克制黑影：闪光弹
  { source: 'brigitte', target: 'sombra', strength: 3, type: 'skill' }, // 布丽吉塔克制黑影：盾击
  { source: 'lucio', target: 'sombra', strength: 3, type: 'skill' }, // 卢西奥克制黑影：加速拉扯
  { source: 'sierra', target: 'sombra', strength: 3, type: 'skill' }, // 希拉克制黑影：Sierra克制
  
  // 9. 秩序之光被克制
  { source: 'winston', target: 'symmetra', strength: 3, type: 'skill' }, // 温斯顿克制秩序之光：跳脸
  { source: 'zarya', target: 'symmetra', strength: 3, type: 'numeric' }, // 查莉娅克制秩序之光：高能量
  { source: 'venture', target: 'symmetra', strength: 3, type: 'skill' }, // 探奇克制秩序之光：机动性
  { source: 'pharah', target: 'symmetra', strength: 3, type: 'range' }, // 法老之鹰克制秩序之光：空中输出
  { source: 'widowmaker', target: 'symmetra', strength: 3, type: 'range' }, // 黑百合克制秩序之光：狙击
  { source: 'echo', target: 'symmetra', strength: 3, type: 'range' }, // 回声克制秩序之光：飞行输出
  { source: 'ashe', target: 'symmetra', strength: 3, type: 'range' }, // 艾什克制秩序之光：狙击
  { source: 'ana', target: 'symmetra', strength: 3, type: 'skill' }, // 安娜克制秩序之光：禁疗
  { source: 'zenyatta', target: 'symmetra', strength: 3, type: 'numeric' }, // 禅雅塔克制秩序之光：增伤
  { source: 'brigitte', target: 'symmetra', strength: 3, type: 'skill' }, // 布丽吉塔克制秩序之光：盾击
  { source: 'kiriko', target: 'symmetra', strength: 3, type: 'skill' }, // 雾子克制秩序之光：净化
  
  // 10. 源氏被克制
  { source: 'winston', target: 'genji', strength: 3, type: 'skill' }, // 温斯顿克制源氏：跳脸
  { source: 'zarya', target: 'genji', strength: 3, type: 'numeric' }, // 查莉娅克制源氏：高能量
  { source: 'pharah', target: 'genji', strength: 3, type: 'range' }, // 法老之鹰克制源氏：空中输出
  { source: 'echo', target: 'genji', strength: 3, type: 'range' }, // 回声克制源氏：飞行输出
  { source: 'torbjorn', target: 'genji', strength: 3, type: 'skill' }, // 托比昂克制源氏：炮塔持续射击无视反弹
  { source: 'cassidy', target: 'genji', strength: 3, type: 'skill' }, // 卡西迪克制源氏：闪光弹
  { source: 'brigitte', target: 'genji', strength: 3, type: 'skill' }, // 布丽吉塔克制源氏：盾击
  { source: 'zenyatta', target: 'genji', strength: 3, type: 'numeric' }, // 禅雅塔克制源氏：增伤
  { source: 'moira', target: 'genji', strength: 3, type: 'skill' }, // 莫伊拉克制源氏：光束
  { source: 'reaper', target: 'genji', strength: 2, type: 'numeric' }, // 死神克制源氏：近距离爆发
  { source: 'symmetra', target: 'genji', strength: 3, type: 'skill' }, // 秩序之光克制源氏：光束
  { source: 'emrey', target: 'genji', strength: 3, type: 'skill' }, // 埃姆雷克制源氏：埃姆雷克制
  { source: 'mizuki', target: 'genji', strength: 3, type: 'skill' }, // 瑞稀克制源氏：护魂结界
  
  // 11. 托比昂被克制
  { source: 'orisa', target: 'torbjorn', strength: 3, type: 'skill' }, // 奥丽莎克制托比昂：长矛
  { source: 'zarya', target: 'torbjorn', strength: 3, type: 'numeric' }, // 查莉娅克制托比昂：高能量
  { source: 'mei', target: 'torbjorn', strength: 3, type: 'skill' }, // 美克制托比昂：冰冻
  { source: 'widowmaker', target: 'torbjorn', strength: 3, type: 'range' }, // 黑百合克制托比昂：狙击
  { source: 'echo', target: 'torbjorn', strength: 3, type: 'range' }, // 回声克制托比昂：飞行输出
  { source: 'junkrat', target: 'torbjorn', strength: 3, type: 'numeric' }, // 狂鼠克制托比昂：炸弹
  { source: 'bastion', target: 'torbjorn', strength: 3, type: 'numeric' }, // 堡垒克制托比昂：高DPS
  { source: 'pharah', target: 'torbjorn', strength: 3, type: 'range' }, // 法老之鹰克制托比昂：空中输出
  { source: 'hanzo', target: 'torbjorn', strength: 3, type: 'range' }, // 半藏克制托比昂：远程爆发
  { source: 'ashe', target: 'torbjorn', strength: 3, type: 'range' }, // 艾什克制托比昂：狙击
  { source: 'sojourn', target: 'torbjorn', strength: 3, type: 'range' }, // 索杰恩克制托比昂：轨道炮
  { source: 'zenyatta', target: 'torbjorn', strength: 3, type: 'numeric' }, // 禅雅塔克制托比昂：增伤
  { source: 'ana', target: 'torbjorn', strength: 3, type: 'skill' }, // 安娜克制托比昂：禁疗
  
  // 12. 半藏被克制
  { source: 'wrecking_ball', target: 'hanzo', strength: 3, type: 'skill' }, // 破坏球克制半藏：机动骚扰
  { source: 'winston', target: 'hanzo', strength: 3, type: 'skill' }, // 温斯顿克制半藏：跳脸
  { source: 'hazard', target: 'hanzo', strength: 3, type: 'skill' }, // 骇灾克制半藏：毒素
  { source: 'doomfist', target: 'hanzo', strength: 3, type: 'skill' }, // 末日铁拳克制半藏：高机动
  { source: 'sombra', target: 'hanzo', strength: 3, type: 'skill' }, // 黑影克制半藏：黑客
  { source: 'echo', target: 'hanzo', strength: 3, type: 'range' }, // 回声克制半藏：飞行输出
  { source: 'tracer', target: 'hanzo', strength: 3, type: 'skill' }, // 猎空克制半藏：高机动
  { source: 'genji', target: 'hanzo', strength: 3, type: 'skill' }, // 源氏克制半藏：反弹+高机动
  { source: 'pharah', target: 'hanzo', strength: 3, type: 'range' }, // 法老之鹰克制半藏：空中输出
  { source: 'lucio', target: 'hanzo', strength: 3, type: 'skill' }, // 卢西奥克制半藏：加速拉扯
  { source: 'venture', target: 'hanzo', strength: 3, type: 'skill' }, // 探奇克制半藏：机动性
  { source: 'juno', target: 'hanzo', strength: 3, type: 'skill' }, // 朱诺克制半藏：控制
  { source: 'kiriko', target: 'hanzo', strength: 3, type: 'skill' }, // 雾子克制半藏：净化
  { source: 'moira', target: 'hanzo', strength: 3, type: 'skill' }, // 莫伊拉克制半藏：光束
  { source: 'emrey', target: 'hanzo', strength: 3, type: 'skill' }, // 埃姆雷克制半藏：埃姆雷克制
  { source: 'freja', target: 'hanzo', strength: 3, type: 'skill' }, // 芙蕾雅克制半藏：芙蕾雅克制
  
  // 13. 猎空被克制
  { source: 'dva', target: 'tracer', strength: 3, type: 'skill' }, // D.Va克制猎空：防御矩阵
  { source: 'cassidy', target: 'tracer', strength: 3, type: 'skill' }, // 卡西迪克制猎空：闪光弹
  { source: 'torbjorn', target: 'tracer', strength: 3, type: 'skill' }, // 托比昂克制猎空：炮塔自动追踪闪现
  { source: 'baptiste', target: 'tracer', strength: 3, type: 'skill' }, // 巴蒂斯特克制猎空：矩阵
  { source: 'brigitte', target: 'tracer', strength: 3, type: 'skill' }, // 布丽吉塔克制猎空：盾击
  { source: 'illari', target: 'tracer', strength: 3, type: 'range' }, // 伊拉锐克制猎空：远程输出
  { source: 'juno', target: 'tracer', strength: 3, type: 'skill' }, // 朱诺克制猎空：控制
  { source: 'reaper', target: 'tracer', strength: 3, type: 'numeric' }, // 死神克制猎空：近距离爆发
  { source: 'sierra', target: 'tracer', strength: 3, type: 'skill' }, // 希拉克制猎空：Sierra克制
  
  // 14. 狂鼠被克制
  { source: 'zarya', target: 'junkrat', strength: 3, type: 'skill' }, // 查莉娅克制狂鼠：护盾吸收
  { source: 'ashe', target: 'junkrat', strength: 3, type: 'range' }, // 艾什克制狂鼠：狙击
  { source: 'hanzo', target: 'junkrat', strength: 3, type: 'range' }, // 半藏克制狂鼠：远程爆发
  { source: 'pharah', target: 'junkrat', strength: 3, type: 'range' }, // 法老之鹰克制狂鼠：空中输出
  { source: 'echo', target: 'junkrat', strength: 3, type: 'range' }, // 回声克制狂鼠：飞行输出
  { source: 'tracer', target: 'junkrat', strength: 3, type: 'skill' }, // 猎空克制狂鼠：高机动
  { source: 'genji', target: 'junkrat', strength: 3, type: 'skill' }, // 源氏克制狂鼠：反弹
  { source: 'juno', target: 'junkrat', strength: 3, type: 'skill' }, // 朱诺克制狂鼠：控制
  { source: 'zenyatta', target: 'junkrat', strength: 3, type: 'numeric' }, // 禅雅塔克制狂鼠：增伤
  { source: 'domina', target: 'junkrat', strength: 3, type: 'skill' }, // 金驭克制狂鼠：金驭克制
  
  // 15. 探奇被克制
  { source: 'roadhog', target: 'venture', strength: 3, type: 'skill' }, // 路霸克制探奇：钩子
  { source: 'doomfist', target: 'venture', strength: 3, type: 'skill' }, // 末日铁拳克制探奇：高机动
  { source: 'orisa', target: 'venture', strength: 3, type: 'skill' }, // 奥丽莎克制探奇：长矛
  { source: 'sojourn', target: 'venture', strength: 3, type: 'range' }, // 索杰恩克制探奇：轨道炮
  { source: 'echo', target: 'venture', strength: 3, type: 'range' }, // 回声克制探奇：飞行输出
  { source: 'pharah', target: 'venture', strength: 3, type: 'range' }, // 法老之鹰克制探奇：空中输出
  { source: 'tracer', target: 'venture', strength: 3, type: 'skill' }, // 猎空克制探奇：高机动
  { source: 'cassidy', target: 'venture', strength: 3, type: 'skill' }, // 卡西迪克制探奇：闪光弹
  { source: 'juno', target: 'venture', strength: 3, type: 'skill' }, // 朱诺克制探奇：控制
  { source: 'kiriko', target: 'venture', strength: 3, type: 'skill' }, // 雾子克制探奇：净化
  { source: 'brigitte', target: 'venture', strength: 3, type: 'skill' }, // 布丽吉塔克制探奇：盾击
  { source: 'lucio', target: 'venture', strength: 3, type: 'skill' }, // 卢西奥克制探奇：加速拉扯
  { source: 'mercy', target: 'venture', strength: 3, type: 'skill' }, // 天使克制探奇：复活+机动性
  { source: 'moira', target: 'venture', strength: 3, type: 'skill' }, // 莫伊拉克制探奇：光束
  
  // 16. 小美被克制
  { source: 'ashe', target: 'mei', strength: 3, type: 'range' }, // 艾什克制美：狙击
  { source: 'pharah', target: 'mei', strength: 3, type: 'range' }, // 法老之鹰克制美：空中输出
  { source: 'widowmaker', target: 'mei', strength: 3, type: 'range' }, // 黑百合克制美：狙击
  { source: 'cassidy', target: 'mei', strength: 3, type: 'skill' }, // 卡西迪克制美：闪光弹
  { source: 'echo', target: 'mei', strength: 3, type: 'range' }, // 回声克制美：飞行输出
  { source: 'hanzo', target: 'mei', strength: 3, type: 'range' }, // 半藏克制美：远程爆发
  { source: 'reaper', target: 'mei', strength: 3, type: 'numeric' }, // 死神克制美：近距离爆发
  { source: 'venture', target: 'mei', strength: 3, type: 'skill' }, // 探奇克制美：机动性
  { source: 'zenyatta', target: 'mei', strength: 3, type: 'numeric' }, // 禅雅塔克制美：增伤
  { source: 'baptiste', target: 'mei', strength: 3, type: 'skill' }, // 巴蒂斯特克制美：矩阵
  { source: 'ana', target: 'mei', strength: 3, type: 'skill' }, // 安娜克制美：禁疗
  { source: 'juno', target: 'mei', strength: 3, type: 'skill' }, // 朱诺克制美：控制
  { source: 'illari', target: 'mei', strength: 3, type: 'range' }, // 伊拉锐克制美：远程输出
  
  // 17. 黑百合被克制
  { source: 'wrecking_ball', target: 'widowmaker', strength: 3, type: 'skill' }, // 破坏球克制黑百合：机动骚扰
  { source: 'doomfist', target: 'widowmaker', strength: 3, type: 'skill' }, // 末日铁拳克制黑百合：高机动
  { source: 'sigma', target: 'widowmaker', strength: 3, type: 'skill' }, // 西格玛克制黑百合：动能捕获
  { source: 'winston', target: 'widowmaker', strength: 3, type: 'skill' }, // 温斯顿克制黑百合：跳脸
  { source: 'widowmaker', target: 'widowmaker', strength: 3, type: 'range' }, // 黑百合克制黑百合：狙击克制
  { source: 'sombra', target: 'widowmaker', strength: 3, type: 'skill' }, // 黑影克制黑百合：黑客
  { source: 'tracer', target: 'widowmaker', strength: 3, type: 'skill' }, // 猎空克制黑百合：高机动
  { source: 'genji', target: 'widowmaker', strength: 3, type: 'skill' }, // 源氏克制黑百合：反弹
  { source: 'kiriko', target: 'widowmaker', strength: 3, type: 'skill' }, // 雾子克制黑百合：净化
  { source: 'lucio', target: 'widowmaker', strength: 3, type: 'skill' }, // 卢西奥克制黑百合：加速拉扯
  { source: 'feitianmao', target: 'widowmaker', strength: 3, type: 'range' }, // 飞天猫克制黑百合：空中压制
  { source: 'dva', target: 'widowmaker', strength: 3, type: 'skill' }, // D.Va克制黑百合：防御矩阵
  
  // 18. 法老之鹰被克制
  { source: 'dva', target: 'pharah', strength: 3, type: 'skill' }, // D.Va克制法老之鹰：防御矩阵
  { source: 'wrecking_ball', target: 'pharah', strength: 3, type: 'skill' }, // 破坏球克制法老之鹰：机动骚扰
  { source: 'ashe', target: 'pharah', strength: 3, type: 'range' }, // 艾什克制法老之鹰：狙击
  { source: 'echo', target: 'pharah', strength: 3, type: 'range' }, // 回声克制法老之鹰：飞行输出
  { source: 'soldier76', target: 'pharah', strength: 3, type: 'range' }, // 士兵:76克制法老之鹰：即时命中克制飞行
  { source: 'widowmaker', target: 'pharah', strength: 3, type: 'range' }, // 黑百合克制法老之鹰：狙击
  { source: 'baptiste', target: 'pharah', strength: 3, type: 'skill' }, // 巴蒂斯特克制法老之鹰：矩阵
  { source: 'illari', target: 'pharah', strength: 3, type: 'range' }, // 伊拉锐克制法老之鹰：远程输出
  { source: 'feitianmao', target: 'pharah', strength: 3, type: 'range' }, // 飞天猫克制法老之鹰：空中压制
  { source: 'mauga', target: 'pharah', strength: 3, type: 'numeric' }, // 毛加克制法老之鹰：火力压制
  { source: 'sierra', target: 'pharah', strength: 2, type: 'skill' }, // 希拉克制法老之鹰：Sierra克制
  
  // ========== 芙蕾雅（Freja）克制关系 ==========
  // 芙蕾雅被克制 - 强化弩箭滞空输出，惧怕反弹和突进
  // 1. 源氏（核心克制 - 反弹弩箭）
  { source: 'genji', target: 'freja', strength: 3, type: 'skill' }, // 源氏克制芙蕾雅：反弹
  
  // 2. 高机动突进英雄
  { source: 'tracer', target: 'freja', strength: 3, type: 'skill' }, // 猎空克制芙蕾雅：高机动
  { source: 'sombra', target: 'freja', strength: 3, type: 'skill' }, // 黑影克制芙蕾雅：黑客
  
  // 3. 即时命中长枪（针对滞空）
  { source: 'widowmaker', target: 'freja', strength: 3, type: 'range' }, // 黑百合克制芙蕾雅：狙击
  { source: 'ashe', target: 'freja', strength: 3, type: 'range' }, // 艾什克制芙蕾雅：狙击
  { source: 'soldier76', target: 'freja', strength: 3, type: 'range' }, // 士兵:76克制芙蕾雅：即时命中克制滞空
  { source: 'cassidy', target: 'freja', strength: 3, type: 'skill' }, // 卡西迪克制芙蕾雅：闪光弹

  // 4. 其他克制
  { source: 'dva', target: 'freja', strength: 3, type: 'skill' }, // D.Va克制芙蕾雅：防御矩阵
  { source: 'reaper', target: 'freja', strength: 3, type: 'numeric' }, // 死神克制芙蕾雅：近距离爆发
  // ========== 芙蕾雅（Freja）克制他人 ==========
  // 芙蕾雅强化弩箭滞空输出，克制笨重坦克与无位移目标（counterwatch: Pharah/Reinhardt/Mauga）
  { source: 'freja', target: 'pharah', strength: 3, type: 'range' }, // 芙蕾雅克制法老之鹰：空中对拼优势
  { source: 'freja', target: 'reinhardt', strength: 3, type: 'range' }, // 芙蕾雅克制莱因哈特：远程拉扯重装
  { source: 'freja', target: 'mauga', strength: 2, type: 'range' }, // 芙蕾雅克制毛加：大体积目标易命中
  { source: 'freja', target: 'brigitte', strength: 2, type: 'range' }, // 芙蕾雅克制布丽吉塔：远程压制近战辅助
  { source: 'freja', target: 'ramattra', strength: 2, type: 'range' }, // 芙蕾雅克制拉玛刹：远程拉扯

  // ========== 斩仇（Vendetta/Zhanchou）克制关系 ==========
  // 斩仇被克制 - 完全修改
  { source: 'roadhog', target: 'vendetta', strength: 3, type: 'skill' }, // 路霸克制斩仇：钩子
  { source: 'pharah', target: 'vendetta', strength: 3, type: 'range' }, // 法老之鹰克制斩仇：空中输出
  { source: 'widowmaker', target: 'vendetta', strength: 3, type: 'range' }, // 黑百合克制斩仇：狙击
  { source: 'bastion', target: 'vendetta', strength: 3, type: 'numeric' }, // 堡垒克制斩仇：高DPS
  { source: 'hanzo', target: 'vendetta', strength: 3, type: 'range' }, // 半藏克制斩仇：远程爆发
  { source: 'ashe', target: 'vendetta', strength: 3, type: 'range' }, // 艾什克制斩仇：狙击
  { source: 'soldier76', target: 'vendetta', strength: 3, type: 'numeric' }, // 士兵:76克制斩仇：输出压制
  { source: 'ana', target: 'vendetta', strength: 3, type: 'skill' }, // 安娜克制斩仇：禁疗
  { source: 'zarya', target: 'vendetta', strength: 3, type: 'numeric' }, // 查莉娅克制斩仇：高能量
  { source: 'mizuki', target: 'vendetta', strength: 3, type: 'skill' }, // 瑞稀克制斩仇：护魂结界
  { source: 'echo', target: 'vendetta', strength: 3, type: 'range' }, // 回声克制斩仇：飞行输出
  { source: 'cassidy', target: 'vendetta', strength: 3, type: 'skill' }, // 卡西迪克制斩仇：闪光弹
  { source: 'moira', target: 'vendetta', strength: 3, type: 'skill' }, // 莫伊拉克制斩仇：光束
  { source: 'brigitte', target: 'vendetta', strength: 3, type: 'skill' }, // 布丽吉塔克制斩仇：盾击

  // 社区数据补充（counterwatch: Pharah +8.7 最强 / Winston / Wrecking Ball / Doomfist）
  { source: 'winston', target: 'vendetta', strength: 3, type: 'skill' }, // 温斯顿克制斩仇：跳脸压制
  { source: 'wrecking_ball', target: 'vendetta', strength: 3, type: 'skill' }, // 破坏球克制斩仇：机动骚扰
  { source: 'doomfist', target: 'vendetta', strength: 3, type: 'skill' }, // 末日铁拳克制斩仇：高机动对拼
  { source: 'junkrat', target: 'vendetta', strength: 2, type: 'numeric' }, // 狂鼠克制斩仇：区域压制

  // ========== 辅助篇 ==========
  // 1. 安娜被克制
  { source: 'orisa', target: 'ana', strength: 3, type: 'skill' }, // 奥丽莎克制安娜：长矛
  { source: 'junker_queen', target: 'ana', strength: 3, type: 'skill' }, // 渣客女王克制安娜：抗治疗
  { source: 'wrecking_ball', target: 'ana', strength: 3, type: 'skill' }, // 破坏球克制安娜：机动骚扰
  { source: 'doomfist', target: 'ana', strength: 3, type: 'skill' }, // 末日铁拳克制安娜：高机动
  { source: 'winston', target: 'ana', strength: 3, type: 'skill' }, // 温斯顿克制安娜：跳脸
  { source: 'tracer', target: 'ana', strength: 3, type: 'skill' }, // 猎空克制安娜：高机动
  { source: 'sombra', target: 'ana', strength: 3, type: 'skill' }, // 黑影克制安娜：黑客
  { source: 'widowmaker', target: 'ana', strength: 3, type: 'range' }, // 黑百合克制安娜：狙击
  { source: 'venture', target: 'ana', strength: 3, type: 'skill' }, // 探奇克制安娜：机动性
  { source: 'hanzo', target: 'ana', strength: 3, type: 'range' }, // 半藏克制安娜：远程爆发
  { source: 'genji', target: 'ana', strength: 3, type: 'skill' }, // 源氏克制安娜：反弹
  { source: 'kiriko', target: 'ana', strength: 3, type: 'skill' }, // 雾子克制安娜：净化
  { source: 'zenyatta', target: 'ana', strength: 3, type: 'numeric' }, // 禅雅塔克制安娜：增伤
  { source: 'vendetta', target: 'ana', strength: 3, type: 'skill' }, // 斩仇克制安娜：斩仇克制
  { source: 'freja', target: 'ana', strength: 3, type: 'skill' }, // 芙蕾雅克制安娜：芙蕾雅克制
  
  // 2. 生命之梭被克制
  { source: 'mauga', target: 'lifeweaver', strength: 3, type: 'numeric' }, // 毛加克制生命之梭：火力压制
  { source: 'junker_queen', target: 'lifeweaver', strength: 3, type: 'skill' }, // 渣客女王克制生命之梭：抗治疗
  { source: 'sombra', target: 'lifeweaver', strength: 3, type: 'skill' }, // 黑影克制生命之梭：黑客
  { source: 'echo', target: 'lifeweaver', strength: 3, type: 'range' }, // 回声克制生命之梭：飞行输出
  { source: 'ashe', target: 'lifeweaver', strength: 3, type: 'range' }, // 艾什克制生命之梭：狙击
  { source: 'widowmaker', target: 'lifeweaver', strength: 3, type: 'range' }, // 黑百合克制生命之梭：狙击
  { source: 'venture', target: 'lifeweaver', strength: 3, type: 'skill' }, // 探奇克制生命之梭：机动性
  { source: 'pharah', target: 'lifeweaver', strength: 3, type: 'range' }, // 法老之鹰克制生命之梭：空中输出
  { source: 'ana', target: 'lifeweaver', strength: 3, type: 'skill' }, // 安娜克制生命之梭：禁疗
  { source: 'zenyatta', target: 'lifeweaver', strength: 3, type: 'numeric' }, // 禅雅塔克制生命之梭：增伤
  
  // 3. 巴蒂斯特被克制
  { source: 'winston', target: 'baptiste', strength: 3, type: 'skill' }, // 温斯顿克制巴蒂斯特：跳脸
  { source: 'hazard', target: 'baptiste', strength: 3, type: 'skill' }, // 骇灾克制巴蒂斯特：毒素
  { source: 'junker_queen', target: 'baptiste', strength: 3, type: 'skill' }, // 渣客女王克制巴蒂斯特：抗治疗
  { source: 'genji', target: 'baptiste', strength: 3, type: 'skill' }, // 源氏克制巴蒂斯特：反弹
  { source: 'hanzo', target: 'baptiste', strength: 3, type: 'range' }, // 半藏克制巴蒂斯特：远程爆发
  { source: 'widowmaker', target: 'baptiste', strength: 3, type: 'range' }, // 黑百合克制巴蒂斯特：狙击
  { source: 'sojourn', target: 'baptiste', strength: 3, type: 'range' }, // 索杰恩克制巴蒂斯特：轨道炮
  { source: 'illari', target: 'baptiste', strength: 3, type: 'range' }, // 伊拉锐克制巴蒂斯特：远程输出
  { source: 'ana', target: 'baptiste', strength: 3, type: 'skill' }, // 安娜克制巴蒂斯特：禁疗
  { source: 'zenyatta', target: 'baptiste', strength: 3, type: 'numeric' }, // 禅雅塔克制巴蒂斯特：增伤
  { source: 'moira', target: 'baptiste', strength: 3, type: 'skill' }, // 莫伊拉克制巴蒂斯特：光束
  { source: 'freja', target: 'baptiste', strength: 3, type: 'skill' }, // 芙蕾雅克制巴蒂斯特：芙蕾雅克制
  
  // 4. 卢西奥被克制
  { source: 'pharah', target: 'lucio', strength: 3, type: 'range' }, // 法老之鹰克制卢西奥：空中输出
  { source: 'sombra', target: 'lucio', strength: 3, type: 'skill' }, // 黑影克制卢西奥：黑客
  { source: 'echo', target: 'lucio', strength: 3, type: 'range' }, // 回声克制卢西奥：飞行输出
  { source: 'zenyatta', target: 'lucio', strength: 3, type: 'numeric' }, // 禅雅塔克制卢西奥：增伤
  { source: 'illari', target: 'lucio', strength: 3, type: 'range' }, // 伊拉锐克制卢西奥：远程输出
  { source: 'juno', target: 'lucio', strength: 3, type: 'skill' }, // 朱诺克制卢西奥：控制
  { source: 'ana', target: 'lucio', strength: 3, type: 'skill' }, // 安娜克制卢西奥：禁疗
  { source: 'baptiste', target: 'lucio', strength: 3, type: 'skill' }, // 巴蒂斯特克制卢西奥：矩阵
  { source: 'sierra', target: 'lucio', strength: 3, type: 'skill' }, // 希拉克制卢西奥：Sierra克制
  
  // 5. 布丽吉塔被克制
  { source: 'hazard', target: 'brigitte', strength: 3, type: 'skill' }, // 骇灾克制布丽吉塔：毒素
  { source: 'ramattra', target: 'brigitte', strength: 3, type: 'skill' }, // 拉玛刹克制布丽吉塔：涅槃形态
  { source: 'junker_queen', target: 'brigitte', strength: 3, type: 'skill' }, // 渣客女王克制布丽吉塔：抗治疗
  { source: 'pharah', target: 'brigitte', strength: 3, type: 'range' }, // 法老之鹰克制布丽吉塔：空中输出
  { source: 'mei', target: 'brigitte', strength: 3, type: 'skill' }, // 美克制布丽吉塔：冰冻
  { source: 'widowmaker', target: 'brigitte', strength: 3, type: 'range' }, // 黑百合克制布丽吉塔：狙击
  { source: 'echo', target: 'brigitte', strength: 3, type: 'range' }, // 回声克制布丽吉塔：飞行输出
  { source: 'junkrat', target: 'brigitte', strength: 3, type: 'numeric' }, // 狂鼠克制布丽吉塔：炸弹
  { source: 'torbjorn', target: 'brigitte', strength: 3, type: 'numeric' }, // 托比昂克制布丽吉塔：炮塔
  { source: 'symmetra', target: 'brigitte', strength: 3, type: 'skill' }, // 秩序之光克制布丽吉塔：光束
  { source: 'ashe', target: 'brigitte', strength: 3, type: 'range' }, // 艾什克制布丽吉塔：狙击
  { source: 'hanzo', target: 'brigitte', strength: 3, type: 'range' }, // 半藏克制布丽吉塔：远程爆发
  { source: 'bastion', target: 'brigitte', strength: 3, type: 'numeric' }, // 堡垒克制布丽吉塔：高DPS
  { source: 'illari', target: 'brigitte', strength: 3, type: 'range' }, // 伊拉锐克制布丽吉塔：远程输出
  { source: 'moira', target: 'brigitte', strength: 3, type: 'skill' }, // 莫伊拉克制布丽吉塔：光束
  { source: 'zenyatta', target: 'brigitte', strength: 3, type: 'numeric' }, // 禅雅塔克制布丽吉塔：增伤
  { source: 'ana', target: 'brigitte', strength: 3, type: 'skill' }, // 安娜克制布丽吉塔：禁疗
  { source: 'baptiste', target: 'brigitte', strength: 3, type: 'skill' }, // 巴蒂斯特克制布丽吉塔：矩阵
  { source: 'wuyang', target: 'brigitte', strength: 3, type: 'skill' }, // 无漾克制布丽吉塔：水元素
  
  // 6. 天使被克制
  { source: 'dva', target: 'mercy', strength: 3, type: 'skill' }, // D.Va克制天使：防御矩阵
  { source: 'hazard', target: 'mercy', strength: 3, type: 'skill' }, // 骇灾克制天使：毒素
  { source: 'mauga', target: 'mercy', strength: 3, type: 'numeric' }, // 毛加克制天使：火力压制
  { source: 'junker_queen', target: 'mercy', strength: 3, type: 'skill' }, // 渣客女王克制天使：抗治疗
  { source: 'wrecking_ball', target: 'mercy', strength: 3, type: 'skill' }, // 破坏球克制天使：机动骚扰
  { source: 'winston', target: 'mercy', strength: 3, type: 'skill' }, // 温斯顿克制天使：跳脸
  { source: 'illari', target: 'mercy', strength: 3, type: 'range' }, // 伊拉锐克制天使：远程输出
  { source: 'sombra', target: 'mercy', strength: 3, type: 'skill' }, // 黑影克制天使：黑客
  { source: 'echo', target: 'mercy', strength: 3, type: 'range' }, // 回声克制天使：飞行输出
  { source: 'ashe', target: 'mercy', strength: 3, type: 'range' }, // 艾什克制天使：狙击
  { source: 'tracer', target: 'mercy', strength: 3, type: 'skill' }, // 猎空克制天使：高机动
  { source: 'soldier76', target: 'mercy', strength: 3, type: 'numeric' }, // 士兵:76克制天使：输出压制
  { source: 'sojourn', target: 'mercy', strength: 3, type: 'range' }, // 索杰恩克制天使：轨道炮
  { source: 'juno', target: 'mercy', strength: 3, type: 'skill' }, // 朱诺克制天使：控制
  { source: 'ana', target: 'mercy', strength: 3, type: 'skill' }, // 安娜克制天使：禁疗
  
  // 7. 雾子被克制
  { source: 'pharah', target: 'kiriko', strength: 3, type: 'range' }, // 法老之鹰克制雾子：空中输出
  { source: 'tracer', target: 'kiriko', strength: 3, type: 'skill' }, // 猎空克制雾子：高机动
  { source: 'sojourn', target: 'kiriko', strength: 3, type: 'range' }, // 索杰恩克制雾子：轨道炮
  { source: 'zenyatta', target: 'kiriko', strength: 3, type: 'numeric' }, // 禅雅塔克制雾子：增伤
  { source: 'vendetta', target: 'kiriko', strength: 3, type: 'skill' }, // 斩仇克制雾子：斩仇克制
  
  // 8. 朱诺被克制
  { source: 'junker_queen', target: 'juno', strength: 3, type: 'skill' }, // 渣客女王克制朱诺：抗治疗
  { source: 'sombra', target: 'juno', strength: 3, type: 'skill' }, // 黑影克制朱诺：黑客
  { source: 'sojourn', target: 'juno', strength: 3, type: 'range' }, // 索杰恩克制朱诺：轨道炮
  { source: 'illari', target: 'juno', strength: 3, type: 'range' }, // 伊拉锐克制朱诺：远程输出
  { source: 'ana', target: 'juno', strength: 3, type: 'skill' }, // 安娜克制朱诺：禁疗
  { source: 'zenyatta', target: 'juno', strength: 3, type: 'numeric' }, // 禅雅塔克制朱诺：增伤
  
  // 9. 伊拉锐被克制
  { source: 'winston', target: 'illari', strength: 3, type: 'skill' }, // 温斯顿克制伊拉锐：跳脸
  { source: 'sigma', target: 'illari', strength: 3, type: 'skill' }, // 西格玛克制伊拉锐：动能捕获
  { source: 'widowmaker', target: 'illari', strength: 3, type: 'range' }, // 黑百合克制伊拉锐：狙击
  { source: 'sojourn', target: 'illari', strength: 3, type: 'range' }, // 索杰恩克制伊拉锐：轨道炮
  { source: 'ashe', target: 'illari', strength: 3, type: 'range' }, // 艾什克制伊拉锐：狙击
  { source: 'zenyatta', target: 'illari', strength: 3, type: 'numeric' }, // 禅雅塔克制伊拉锐：增伤
  
  // 10. 莫伊拉被克制
  { source: 'junker_queen', target: 'moira', strength: 3, type: 'skill' }, // 渣客女王克制莫伊拉：抗治疗
  { source: 'wrecking_ball', target: 'moira', strength: 3, type: 'skill' }, // 破坏球克制莫伊拉：机动骚扰
  { source: 'pharah', target: 'moira', strength: 3, type: 'range' }, // 法老之鹰克制莫伊拉：空中输出
  { source: 'widowmaker', target: 'moira', strength: 3, type: 'range' }, // 黑百合克制莫伊拉：狙击
  { source: 'echo', target: 'moira', strength: 3, type: 'range' }, // 回声克制莫伊拉：飞行输出
  { source: 'tracer', target: 'moira', strength: 3, type: 'skill' }, // 猎空克制莫伊拉：高机动
  { source: 'torbjorn', target: 'moira', strength: 3, type: 'numeric' }, // 托比昂克制莫伊拉：炮塔
  { source: 'ashe', target: 'moira', strength: 3, type: 'range' }, // 艾什克制莫伊拉：狙击
  { source: 'zenyatta', target: 'moira', strength: 3, type: 'numeric' }, // 禅雅塔克制莫伊拉：增伤
  { source: 'juno', target: 'moira', strength: 3, type: 'skill' }, // 朱诺克制莫伊拉：控制
  { source: 'ana', target: 'moira', strength: 3, type: 'skill' }, // 安娜克制莫伊拉：禁疗
  { source: 'baptiste', target: 'moira', strength: 3, type: 'skill' }, // 巴蒂斯特克制莫伊拉：矩阵
  { source: 'mizuki', target: 'moira', strength: 3, type: 'skill' }, // 瑞稀克制莫伊拉：瑞稀克制

  // 11. 禅雅塔被克制
  { source: 'wrecking_ball', target: 'zenyatta', strength: 3, type: 'skill' }, // 破坏球克制禅雅塔：机动骚扰
  { source: 'doomfist', target: 'zenyatta', strength: 3, type: 'skill' }, // 末日铁拳克制禅雅塔：高机动
  { source: 'winston', target: 'zenyatta', strength: 3, type: 'skill' }, // 温斯顿克制禅雅塔：跳脸
  { source: 'genji', target: 'zenyatta', strength: 3, type: 'skill' }, // 源氏克制禅雅塔：反弹
  { source: 'hanzo', target: 'zenyatta', strength: 3, type: 'range' }, // 半藏克制禅雅塔：远程爆发
  { source: 'venture', target: 'zenyatta', strength: 3, type: 'skill' }, // 探奇克制禅雅塔：机动性
  { source: 'widowmaker', target: 'zenyatta', strength: 3, type: 'range' }, // 黑百合克制禅雅塔：狙击
  { source: 'sombra', target: 'zenyatta', strength: 3, type: 'skill' }, // 黑影克制禅雅塔：黑客
  { source: 'echo', target: 'zenyatta', strength: 3, type: 'range' }, // 回声克制禅雅塔：飞行输出
  { source: 'tracer', target: 'zenyatta', strength: 3, type: 'skill' }, // 猎空克制禅雅塔：高机动
  { source: 'sojourn', target: 'zenyatta', strength: 3, type: 'range' }, // 索杰恩克制禅雅塔：轨道炮
  { source: 'kiriko', target: 'zenyatta', strength: 3, type: 'skill' }, // 雾子克制禅雅塔：净化
  { source: 'vendetta', target: 'zenyatta', strength: 3, type: 'skill' }, // 斩仇克制禅雅塔：斩仇克制
  { source: 'freja', target: 'zenyatta', strength: 3, type: 'skill' }, // 芙蕾雅克制禅雅塔：芙蕾雅克制
  { source: 'anran', target: 'zenyatta', strength: 3, type: 'skill' }, // 安燃克制禅雅塔：安燃克制
   
   // ========== 斩仇（Vendetta）克制他人 ==========
    { source: 'brigitte', target: 'anran', strength: 3, type: 'skill' }, // 布丽吉塔克制安燃：火焰克制
    { source: 'ana', target: 'anran', strength: 3, type: 'skill' }, // 安娜克制安燃：禁疗
    { source: 'baptiste', target: 'anran', strength: 3, type: 'skill' }, // 巴蒂斯特克制安燃：矩阵
    { source: 'dva', target: 'anran', strength: 2, type: 'skill' }, // D.Va克制安燃：防御矩阵
    { source: 'winston', target: 'anran', strength: 2, type: 'skill' }, // 温斯顿克制安燃：跳脸
    { source: 'doomfist', target: 'anran', strength: 2, type: 'skill' }, // 末日铁拳克制安燃：高机动
    { source: 'widowmaker', target: 'anran', strength: 1, type: 'range' }, // 黑百合克制安燃：狙击
    { source: 'bastion', target: 'anran', strength: 2, type: 'numeric' }, // 堡垒克制安燃：高DPS
    { source: 'cassidy', target: 'anran', strength: 2, type: 'skill' }, // 卡西迪克制安燃：闪光弹
    { source: 'soldier76', target: 'anran', strength: 2, type: 'numeric' }, // 士兵:76克制安燃：输出压制
    { source: 'symmetra', target: 'anran', strength: 2, type: 'skill' }, // 秩序之光克制安燃：光束
     { source: 'torbjorn', target: 'anran', strength: 2, type: 'numeric' }, // 托比昂克制安燃：炮塔
  
  // ========== 新英雄克制关系 ==========
  // 一、金驭（Domina）被克制 - 完全修改
  { source: 'winston', target: 'domina', strength: 3, type: 'skill' }, // 温斯顿克制金驭：跳脸
  { source: 'wrecking_ball', target: 'domina', strength: 3, type: 'skill' }, // 破坏球克制金驭：机动骚扰
  { source: 'reaper', target: 'domina', strength: 3, type: 'numeric' }, // 死神克制金驭：近距离爆发
  { source: 'bastion', target: 'domina', strength: 3, type: 'numeric' }, // 堡垒克制金驭：高DPS
  { source: 'junkrat', target: 'domina', strength: 3, type: 'numeric' }, // 狂鼠克制金驭：炸弹
  { source: 'sombra', target: 'domina', strength: 3, type: 'skill' }, // 黑影克制金驭：黑客
  { source: 'dva', target: 'domina', strength: 3, type: 'skill' }, // D.Va克制金驭：防御矩阵
  { source: 'tracer', target: 'domina', strength: 3, type: 'skill' }, // 猎空克制金驭：高机动
  { source: 'vendetta', target: 'domina', strength: 3, type: 'skill' }, // 斩仇克制金驭：斩仇克制
  { source: 'wuyang', target: 'domina', strength: 3, type: 'skill' }, // 无漾克制金驭：水元素
  { source: 'doomfist', target: 'domina', strength: 3, type: 'skill' }, // 末日铁拳克制金驭：高机动
  { source: 'reinhardt', target: 'domina', strength: 3, type: 'skill' }, // 莱因哈特克制金驭：举盾推进
  { source: 'sigma', target: 'domina', strength: 3, type: 'skill' }, // 西格玛克制金驭：动能捕获
  { source: 'ramattra', target: 'domina', strength: 3, type: 'skill' }, // 拉玛刹克制金驭：涅槃形态
  // 二、埃姆雷（Emrey）被克制 - 完全修改
  { source: 'genji', target: 'emrey', strength: 3, type: 'skill' }, // 源氏克制埃姆雷：反弹
  { source: 'tracer', target: 'emrey', strength: 3, type: 'skill' }, // 猎空克制埃姆雷：高机动
  { source: 'roadhog', target: 'emrey', strength: 3, type: 'skill' }, // 路霸克制埃姆雷：钩子
  { source: 'domina', target: 'emrey', strength: 3, type: 'skill' }, // 金驭克制埃姆雷：金驭克制
  { source: 'anran', target: 'emrey', strength: 3, type: 'skill' }, // 安燃克制埃姆雷：安燃克制
  { source: 'ana', target: 'emrey', strength: 3, type: 'skill' }, // 安娜克制埃姆雷：禁疗
  { source: 'reinhardt', target: 'emrey', strength: 3, type: 'skill' }, // 莱因哈特克制埃姆雷：举盾推进
  { source: 'sigma', target: 'emrey', strength: 3, type: 'skill' }, // 西格玛克制埃姆雷：动能捕获
  { source: 'hanzo', target: 'emrey', strength: 3, type: 'range' }, // 半藏克制埃姆雷：远程爆发
  { source: 'widowmaker', target: 'emrey', strength: 3, type: 'range' }, // 黑百合克制埃姆雷：狙击
  { source: 'echo', target: 'emrey', strength: 3, type: 'range' }, // 回声克制埃姆雷：飞行输出
  { source: 'pharah', target: 'emrey', strength: 3, type: 'range' }, // 法老之鹰克制埃姆雷：空中输出
  { source: 'cassidy', target: 'emrey', strength: 3, type: 'skill' }, // 卡西迪克制埃姆雷：闪光弹
  { source: 'soldier76', target: 'emrey', strength: 2, type: 'numeric' }, // 士兵:76克制埃姆雷：输出压制

  // 三、安燃（Anran）被克制 - 完全修改
  { source: 'roadhog', target: 'anran', strength: 3, type: 'skill' }, // 路霸克制安燃：钩子
  { source: 'orisa', target: 'anran', strength: 3, type: 'skill' }, // 奥丽莎克制安燃：长矛
  { source: 'pharah', target: 'anran', strength: 3, type: 'range' }, // 法老之鹰克制安燃：空中输出
  { source: 'echo', target: 'anran', strength: 3, type: 'range' }, // 回声克制安燃：飞行输出
  { source: 'cassidy', target: 'anran', strength: 3, type: 'skill' }, // 卡西迪克制安燃：闪光弹
  { source: 'ana', target: 'anran', strength: 3, type: 'skill' }, // 安娜克制安燃：禁疗
  { source: 'zenyatta', target: 'anran', strength: 3, type: 'numeric' }, // 禅雅塔克制安燃：增伤
  { source: 'moira', target: 'anran', strength: 3, type: 'skill' }, // 莫伊拉克制安燃：光束
  { source: 'genji', target: 'anran', strength: 3, type: 'skill' }, // 源氏克制安燃：反弹
  { source: 'reaper', target: 'anran', strength: 3, type: 'numeric' }, // 死神克制安燃：近距离爆发
  { source: 'junkrat', target: 'anran', strength: 3, type: 'numeric' }, // 狂鼠克制安燃：炸弹
  { source: 'venture', target: 'anran', strength: 3, type: 'skill' }, // 探奇克制安燃：机动性
  { source: 'mizuki', target: 'anran', strength: 3, type: 'skill' }, // 瑞稀克制安燃：护魂结界
  { source: 'anran', target: 'illari', strength: 3, type: 'skill' }, // 安燃克制伊拉锐：突进切辅助
  { source: 'anran', target: 'baptiste', strength: 2, type: 'skill' }, // 安燃克制巴蒂斯特：突进压制
  // 四、无漾（Wuyang）被克制 - 完全修改
  { source: 'soldier76', target: 'wuyang', strength: 3, type: 'numeric' }, // 士兵:76克制无漾：输出压制
  { source: 'cassidy', target: 'wuyang', strength: 3, type: 'skill' }, // 卡西迪克制无漾：闪光弹
  { source: 'ashe', target: 'wuyang', strength: 3, type: 'range' }, // 艾什克制无漾：狙击
  { source: 'genji', target: 'wuyang', strength: 3, type: 'skill' }, // 源氏克制无漾：反弹
  { source: 'tracer', target: 'wuyang', strength: 3, type: 'skill' }, // 猎空克制无漾：高机动
  { source: 'reaper', target: 'wuyang', strength: 3, type: 'numeric' }, // 死神克制无漾：近距离爆发
  { source: 'moira', target: 'wuyang', strength: 3, type: 'skill' }, // 莫伊拉克制无漾：光束
  { source: 'vendetta', target: 'wuyang', strength: 3, type: 'skill' }, // 斩仇克制无漾：斩仇克制
  { source: 'anran', target: 'wuyang', strength: 3, type: 'skill' }, // 安燃克制无漾：安燃克制
  { source: 'zenyatta', target: 'wuyang', strength: 3, type: 'numeric' }, // 禅雅塔克制无漾：增伤
  { source: 'widowmaker', target: 'wuyang', strength: 3, type: 'range' }, // 黑百合克制无漾：狙击
  { source: 'sombra', target: 'wuyang', strength: 3, type: 'skill' }, // 黑影克制无漾：黑客

  // ========== 无漾（Wuyang）克制他人 ==========
  // 无漾水元素拉扯，克制固定目标（counterwatch: Torbjörn +8.1 最强 / Zenyatta / Symmetra）
  { source: 'wuyang', target: 'torbjorn', strength: 3, type: 'skill' }, // 无漾克制托比昂：水元素压制炮塔
  { source: 'wuyang', target: 'zenyatta', strength: 3, type: 'numeric' }, // 无漾克制禅雅塔：水元素+增伤对拼
  { source: 'wuyang', target: 'symmetra', strength: 2, type: 'skill' }, // 无漾克制秩序之光：水元素拉扯
  { source: 'wuyang', target: 'mauga', strength: 2, type: 'skill' }, // 无漾克制毛加：水元素克制重装
  { source: 'wuyang', target: 'cassidy', strength: 2, type: 'skill' }, // 无漾克制卡西迪：拉扯压制

  // 五、瑞稀（Ruixi）被克制 - 完全修改
  // ========== 瑞稀（Mizuki）克制他人 ==========
  // 瑞稀护魂结界/锁链控制，克制重装与突进（counterwatch: Mauga +7.9 最强 / Hazard / Domina）
  { source: 'mizuki', target: 'mauga', strength: 3, type: 'skill' }, // 瑞稀克制毛加：护魂结界限制重装
  { source: 'mizuki', target: 'hazard', strength: 3, type: 'skill' }, // 瑞稀克制骇灾：锁链限制突进
  { source: 'mizuki', target: 'domina', strength: 3, type: 'skill' }, // 瑞稀克制金驭：护魂结界限制坦克
  { source: 'mizuki', target: 'tracer', strength: 2, type: 'skill' }, // 瑞稀克制猎空：锁链限制高机动
  { source: 'mizuki', target: 'wrecking_ball', strength: 2, type: 'skill' }, // 瑞稀克制破坏球：锁链限制骚扰

  // 六、飞天猫（Feitianmao）被克制 - 完全修改
  { source: 'cassidy', target: 'feitianmao', strength: 3, type: 'skill' }, // 卡西迪克制飞天猫：闪光弹
  { source: 'widowmaker', target: 'feitianmao', strength: 3, type: 'range' }, // 黑百合克制飞天猫：狙击
  { source: 'ashe', target: 'feitianmao', strength: 3, type: 'range' }, // 艾什克制飞天猫：狙击
  { source: 'torbjorn', target: 'feitianmao', strength: 3, type: 'skill' }, // 托比昂克制飞天猫：炮塔自动追踪飞行
  { source: 'sojourn', target: 'feitianmao', strength: 3, type: 'range' }, // 索杰恩克制飞天猫：轨道炮
  { source: 'soldier76', target: 'feitianmao', strength: 3, type: 'range' }, // 士兵:76克制飞天猫：即时命中克制飞行
  { source: 'sombra', target: 'feitianmao', strength: 3, type: 'skill' }, // 黑影克制飞天猫：黑客
  { source: 'echo', target: 'feitianmao', strength: 3, type: 'range' }, // 回声克制飞天猫：飞行输出
  { source: 'juno', target: 'feitianmao', strength: 3, type: 'skill' }, // 朱诺克制飞天猫：控制
  { source: 'baptiste', target: 'feitianmao', strength: 3, type: 'skill' }, // 巴蒂斯特克制飞天猫：矩阵
  { source: 'sierra', target: 'feitianmao', strength: 2, type: 'skill' }, // 希拉克制飞天猫：Sierra克制
  
  // 社区数据补充（rankedboost: Ashe +11.8 最强克制 / Sombra 黑客落地 / D.Va / Emre）
  { source: 'dva', target: 'feitianmao', strength: 3, type: 'skill' }, // D.Va克制飞天猫：防御矩阵吞弹+推进
  { source: 'emrey', target: 'feitianmao', strength: 2, type: 'range' }, // 埃姆雷克制飞天猫：克制滞空
  // 注：飞天猫克制他人见瑞稀（Mizuki）被克制段 feitianmao→mizuki

  // Sierra 被克制 - 硬克制（strength: 3）
  { source: 'genji', target: 'sierra', strength: 3, type: 'skill' }, // 源氏克制希拉：反弹技能
  { source: 'widowmaker', target: 'sierra', strength: 3, type: 'range' }, // 黑百合克制希拉：狙击
  { source: 'cassidy', target: 'sierra', strength: 3, type: 'skill' }, // 卡西迪克制希拉：闪光弹
  { source: 'ashe', target: 'sierra', strength: 3, type: 'range' }, // 艾什克制希拉：狙击
  // Sierra 被克制 - 强克制（strength: 2）
  { source: 'reaper', target: 'sierra', strength: 2, type: 'numeric' }, // 死神克制希拉：近距离爆发
  { source: 'winston', target: 'sierra', strength: 2, type: 'skill' }, // 温斯顿克制希拉：跳脸
  { source: 'dva', target: 'sierra', strength: 2, type: 'skill' }, // D.Va克制希拉：防御矩阵

  // ========== 死怨（Shion）被克制 ==========
  // 死怨弱点：远距离能力弱、无硬控、临时生命值消失快、摩托车可被打断
  // 坦克克制
  { source: 'winston', target: 'shion', strength: 3, type: 'skill' }, // 温斯顿克制死怨：跳脸压制，电击追踪高机动目标
  { source: 'reinhardt', target: 'shion', strength: 3, type: 'skill' }, // 莱因哈特克制死怨：举盾挡伤害，冲锋打断摩托车
  { source: 'roadhog', target: 'shion', strength: 3, type: 'skill' }, // 路霸克制死怨：钩子抓冲刺/骑摩托的死怨
  { source: 'orisa', target: 'shion', strength: 3, type: 'skill' }, // 奥丽莎克制死怨：长矛眩晕打断技能
  { source: 'dva', target: 'shion', strength: 3, type: 'skill' }, // D.Va克制死怨：防御矩阵吸收弹药
  { source: 'sigma', target: 'shion', strength: 2, type: 'skill' }, // 西格玛克制死怨：动能捕获+护盾阻挡
  { source: 'zarya', target: 'shion', strength: 2, type: 'numeric' }, // 查莉娅克制死怨：高能量输出，护盾保护队友
  // 输出克制
  { source: 'widowmaker', target: 'shion', strength: 3, type: 'range' }, // 黑百合克制死怨：远程狙击，死怨射程不足
  { source: 'ashe', target: 'shion', strength: 3, type: 'range' }, // 艾什克制死怨：远程狙击克制
  { source: 'hanzo', target: 'shion', strength: 3, type: 'range' }, // 半藏克制死怨：远程爆发
  { source: 'pharah', target: 'shion', strength: 3, type: 'range' }, // 法老之鹰克制死怨：空中输出，死怨无法触及
  { source: 'sombra', target: 'shion', strength: 3, type: 'skill' }, // 黑影克制死怨：黑客禁用技能
  { source: 'mei', target: 'shion', strength: 3, type: 'skill' }, // 美克制死怨：冰冻限制机动性
  { source: 'cassidy', target: 'shion', strength: 3, type: 'skill' }, // 卡西迪克制死怨：闪光弹打断冲刺/摩托车
  { source: 'sojourn', target: 'shion', strength: 2, type: 'range' }, // 索杰恩克制死怨：远程轨道炮
  { source: 'echo', target: 'shion', strength: 2, type: 'range' }, // 回声克制死怨：飞行输出
  { source: 'soldier76', target: 'shion', strength: 2, type: 'range' }, // 士兵:76克制死怨：远程输出压制
  { source: 'torbjorn', target: 'shion', strength: 2, type: 'skill' }, // 托比昂克制死怨：炮塔自动追踪冲刺
  { source: 'bastion', target: 'shion', strength: 2, type: 'numeric' }, // 堡垒克制死怨：高DPS压制
  // 支援克制
  { source: 'ana', target: 'shion', strength: 3, type: 'skill' }, // 安娜克制死怨：睡眠针打断摩托车/冲刺，禁疗
  { source: 'brigitte', target: 'shion', strength: 3, type: 'skill' }, // 布丽吉塔克制死怨：盾击打断
  { source: 'baptiste', target: 'shion', strength: 2, type: 'skill' }, // 巴蒂斯特克制死怨：矩阵保护队友
  { source: 'zenyatta', target: 'shion', strength: 2, type: 'numeric' }, // 禅雅塔克制死怨：增伤标记使死怨更脆

  // ========== 死怨（Shion）克制他人 ==========
  // 死怨优势：右键散弹近距离高爆发、全方向冲刺追击、摩托车高机动切入
  // 输出被死怨克制
  { source: 'shion', target: 'tracer', strength: 3, type: 'skill' }, // 死怨克制猎空：全方向冲刺追击，右键散弹爆发秒杀
  { source: 'shion', target: 'genji', strength: 2, type: 'skill' }, // 死怨克制源氏：右键散弹惩罚源氏突进
  { source: 'shion', target: 'echo', strength: 2, type: 'skill' }, // 死怨克制回声：冲刺追击回声
  { source: 'shion', target: 'widowmaker', strength: 2, type: 'skill' }, // 死怨克制黑百合：冲刺接近狙击手
  { source: 'shion', target: 'hanzo', strength: 2, type: 'skill' }, // 死怨克制半藏：冲刺接近半藏
  { source: 'shion', target: 'bastion', strength: 2, type: 'numeric' }, // 死怨克制堡垒：侧翼突袭背后爆发
  { source: 'shion', target: 'junkrat', strength: 2, type: 'skill' }, // 死怨克制狂鼠：冲刺绕过陷阱，近身爆发
  { source: 'shion', target: 'mei', strength: 2, type: 'skill' }, // 死怨克制美：高机动绕过冰冻
  { source: 'shion', target: 'reaper', strength: 2, type: 'skill' }, // 死怨克制死神：冲刺机动优势，右键对拼
  // 支援被死怨克制
  { source: 'shion', target: 'zenyatta', strength: 3, type: 'numeric' }, // 死怨克制禅雅塔：冲刺切入，近身爆发秒杀
  { source: 'shion', target: 'mercy', strength: 3, type: 'skill' }, // 死怨克制天使：冲刺追击天使
  { source: 'shion', target: 'ana', strength: 2, type: 'skill' }, // 死怨克制安娜：冲刺切入后排（互克关系）
  { source: 'shion', target: 'lifeweaver', strength: 2, type: 'skill' }, // 死怨克制生命之梭：冲刺追击
  { source: 'shion', target: 'illari', strength: 2, type: 'skill' }, // 死怨克制伊拉锐：冲刺切入
  { source: 'shion', target: 'moira', strength: 2, type: 'skill' }, // 死怨克制莫伊拉：冲刺追击莫伊拉
  { source: 'shion', target: 'baptiste', strength: 2, type: 'skill' }, // 死怨克制巴蒂斯特：冲刺切入后排爆发
  { source: 'shion', target: 'kiriko', strength: 2, type: 'skill' }, // 死怨克制雾子：冲刺追击雾子
  { source: 'shion', target: 'juno', strength: 2, type: 'skill' }, // 死怨克制朱诺：冲刺追击朱诺

  // ========== D.mon篇 ==========
  // D.mon被克制
  { source: 'sombra', target: 'dmon', strength: 3, type: 'skill' }, // 黑影克制D.mon：黑客禁用突进技能
  { source: 'ana', target: 'dmon', strength: 3, type: 'skill' }, // 安娜克制D.mon：禁疗+睡眠针打断突进
  { source: 'zenyatta', target: 'dmon', strength: 3, type: 'numeric' }, // 禅雅塔克制D.mon：增伤标记使护甲形同虚设
  { source: 'reaper', target: 'dmon', strength: 3, type: 'numeric' }, // 死神克制D.mon：近距离爆发穿透护甲
  { source: 'bastion', target: 'dmon', strength: 3, type: 'numeric' }, // 堡垒克制D.mon：高DPS撕碎护甲
  { source: 'junker_queen', target: 'dmon', strength: 3, type: 'skill' }, // 渣客女王克制D.mon：抗治疗克制突进坦克
  { source: 'mei', target: 'dmon', strength: 3, type: 'skill' }, // 美克制D.mon：冰冻限制机动性
  { source: 'cassidy', target: 'dmon', strength: 3, type: 'skill' }, // 卡西迪克制D.mon：闪光弹打断突进
  { source: 'brigitte', target: 'dmon', strength: 3, type: 'skill' }, // 布丽吉塔克制D.mon：盾击打断近战
  { source: 'pharah', target: 'dmon', strength: 3, type: 'range' }, // 法老之鹰克制D.mon：空中输出克制近战
  { source: 'echo', target: 'dmon', strength: 3, type: 'range' }, // 回声克制D.mon：飞行输出克制地面
  { source: 'widowmaker', target: 'dmon', strength: 3, type: 'range' }, // 黑百合克制D.mon：狙击穿透护甲
  { source: 'hanzo', target: 'dmon', strength: 3, type: 'range' }, // 半藏克制D.mon：远程爆发
  { source: 'sojourn', target: 'dmon', strength: 3, type: 'range' }, // 索杰恩克制D.mon：轨道炮穿透护甲
  { source: 'baptiste', target: 'dmon', strength: 3, type: 'skill' }, // 巴蒂斯特克制D.mon：矩阵保护队友
  { source: 'winston', target: 'dmon', strength: 2, type: 'skill' }, // 温斯顿克制D.mon：跳脸电击克制近战
  { source: 'orisa', target: 'dmon', strength: 3, type: 'skill' }, // 奥丽莎克制D.mon：长矛远程风筝+旋转标枪推挡近战突进，金身免疫控制

  // 社区数据补充（owstrategy: Pharah / Symmetra / Bastion / Reaper / Ramattra / Mei / Torbjörn / Lifeweaver / Reinhardt）
  { source: 'symmetra', target: 'dmon', strength: 3, type: 'skill' }, // 秩序之光克制D.mon：光子屏障分割近战
  { source: 'ramattra', target: 'dmon', strength: 3, type: 'skill' }, // 拉玛刹克制D.mon：近战对拼压制
  { source: 'torbjorn', target: 'dmon', strength: 2, type: 'skill' }, // 托比昂克制D.mon：炮塔自动追踪
  { source: 'lifeweaver', target: 'dmon', strength: 2, type: 'skill' }, // 生命之梭克制D.mon：拉扯保护队友
  { source: 'reinhardt', target: 'dmon', strength: 2, type: 'skill' }, // 莱因哈特克制D.mon：举盾+近战压制

  // D.mon克制（社区真实数据：owstrategy D.Va / Sigma / Junkrat / Hanzo / Zenyatta / Genji / Tracer）
  { source: 'dmon', target: 'sigma', strength: 3, type: 'skill' }, // D.mon克制西格玛：近战对拼压制
  { source: 'dmon', target: 'zenyatta', strength: 3, type: 'numeric' }, // D.mon克制禅雅塔：突进爆发秒杀脆皮
  { source: 'dmon', target: 'tracer', strength: 2, type: 'numeric' }, // D.mon克制猎空：护甲克制低血量高机动

];

export const getRoleColor = (role: Role): string => {
  switch (role) {
    case 'tank': return '#f59e0b';
    case 'damage': return '#ef4444';
    case 'support': return '#22c55e';
  }
};
   
export const getRoleName = (role: Role, language: string = 'zh'): string => {
  const roleNames: Record<Role, Record<string, string>> = {
    tank: { zh: '坦克', en: 'Tank', ja: 'タンク', ko: '탱크', 'zh-TW': '坦克', es: 'Tanque', fr: 'Tank', de: 'Tank', pt: 'Tanque', ru: 'Танк', it: 'Tank' },
    damage: { zh: '输出', en: 'Damage', ja: 'ダメージ', ko: '딜러', 'zh-TW': '輸出', es: 'Daño', fr: 'Dégâts', de: 'Schaden', pt: 'Dano', ru: 'ДПС', it: 'Danno' },
    support: { zh: '支援', en: 'Support', ja: 'サポート', ko: '서포터', 'zh-TW': '支援', es: 'Apoyo', fr: 'Support', de: 'Support', pt: 'Suporte', ru: 'Поддержка', it: 'Support' },
  };
  return roleNames[role]?.[language] || roleNames[role]?.['en'] || role;
};

export const getRoleNameEn = (role: Role): string => {
  switch (role) {
    case 'tank': return 'Tank';
    case 'damage': return 'Damage';
    case 'support': return 'Support';
  }
};

// 获取英雄名称（根据语言）
export const getHeroName = (hero: Hero | undefined | null, language: string = 'zh'): string => {
  if (!hero) return '';
  return language === 'zh' ? hero.name : hero.nameEn;
};