// 守望先锋英雄数据 - 基于参考图片整理的被克制关系
export interface Hero {
  id: string;
  name: string;
  nameEn: string;
  nickname?: string;
  role: 'tank' | 'damage' | 'support';
  color: string;
  image: string;
}

export interface CounterRelation {
  source: string; // 克制方英雄ID
  target: string; // 被克制方英雄ID
  strength?: number; // 1-3, 3为最强
}


// 英雄图片URL - 使用官方CDN资源
// 来源: Blizzard 官方 Overwatch 2 资源

const heroImages: Record<string, string> = {
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
  jinyu: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/1161c112292c56c052c0ae711792fcde06e3251b98bc9709e582dd7585b5dcd6.png`,

  
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
  ruixi: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/a2c8dd2fdc10e5b5110062e2bd5dc3fc56e692a812f35f0fcea3b580fd01f578.png`,
  feitianmao: `https://d15f34w2p8l1cc.cloudfront.net/overwatch/03a184cd0de27091e0099ac22635ad9615a8f6997881a5c25cc5f2444764f729.png`,
};

// 英雄数据
export const heroes: Hero[] = [
  // 坦克英雄
  { id: 'dva', name: 'D.Va', nameEn: 'D.Va', nickname: '宋哈娜', role: 'tank', color: '#f59e0b', image: heroImages.dva },
  { id: 'doomfist', name: '末日铁拳', nameEn: 'Doomfist', nickname: '铁拳', role: 'tank', color: '#f59e0b', image: heroImages.doomfist },
  { id: 'hazard', name: '骇灾', nameEn: 'Hazard', role: 'tank', color: '#f59e0b', image: heroImages.hazard },
  { id: 'junker_queen', name: '渣客女王', nameEn: 'Junker Queen', role: 'tank', color: '#f59e0b', image: heroImages.junker_queen },
  { id: 'mauga', name: '毛加', nameEn: 'Mauga', role: 'tank', color: '#f59e0b', image: heroImages.mauga },
  { id: 'orisa', name: '奥丽莎', nameEn: 'Orisa', nickname: '美羊羊', role: 'tank', color: '#f59e0b', image: heroImages.orisa },
  { id: 'ramattra', name: '拉玛刹', nameEn: 'Ramattra', nickname: '喜之郎', role: 'tank', color: '#f59e0b', image: heroImages.ramattra },
  { id: 'reinhardt', name: '莱因哈特', nameEn: 'Reinhardt', nickname: '大锤', role: 'tank', color: '#f59e0b', image: heroImages.reinhardt },
  { id: 'roadhog', name: '路霸', nameEn: 'Roadhog', nickname: '猪', role: 'tank', color: '#f59e0b', image: heroImages.roadhog },
  { id: 'sigma', name: '西格玛', nameEn: 'Sigma', role: 'tank', color: '#f59e0b', image: heroImages.sigma },
  { id: 'winston', name: '温斯顿', nameEn: 'Winston', nickname: '猩猩', role: 'tank', color: '#f59e0b', image: heroImages.winston },
  { id: 'wrecking_ball', name: '破坏球', nameEn: 'Wrecking Ball', nickname: '球', role: 'tank', color: '#f59e0b', image: heroImages.wrecking_ball },
  { id: 'zarya', name: '查莉娅', nameEn: 'Zarya', nickname: '毛妹', role: 'tank', color: '#f59e0b', image: heroImages.zarya },
  { id: 'jinyu', name: '金驭', nameEn: 'Jinyu', role: 'tank', color: '#f59e0b', image: heroImages.jinyu },
  
  // 输出英雄
  { id: 'ashe', name: '艾什', nameEn: 'Ashe', role: 'damage', color: '#ef4444', image: heroImages.ashe },
  { id: 'bastion', name: '堡垒', nameEn: 'Bastion', nickname: '按Q键回城的那个', role: 'damage', color: '#ef4444', image: heroImages.bastion },
  { id: 'cassidy', name: '卡西迪', nameEn: 'Cassidy', nickname: '麦爹', role: 'damage', color: '#ef4444', image: heroImages.cassidy },
  { id: 'echo', name: '回声', nameEn: 'Echo', role: 'damage', color: '#ef4444', image: heroImages.echo },
  { id: 'freja', name: '芙蕾雅', nameEn: 'Freja', role: 'damage', color: '#ef4444', image: heroImages.freja },
  { id: 'genji', name: '源氏', nameEn: 'Genji', nickname: '源', role: 'damage', color: '#ef4444', image: heroImages.genji },
  { id: 'hanzo', name: '半藏', nameEn: 'Hanzo', nickname: '随缘箭', role: 'damage', color: '#ef4444', image: heroImages.hanzo },
  { id: 'junkrat', name: '狂鼠', nameEn: 'Junkrat', role: 'damage', color: '#ef4444', image: heroImages.junkrat },
  { id: 'mei', name: '美', nameEn: 'Mei', nickname: '小美', role: 'damage', color: '#ef4444', image: heroImages.mei },
  { id: 'pharah', name: '法老之鹰', nameEn: 'Pharah', nickname: '法鸡', role: 'damage', color: '#ef4444', image: heroImages.pharah },
  { id: 'reaper', name: '死神', nameEn: 'Reaper', nickname: '活神', role: 'damage', color: '#ef4444', image: heroImages.reaper },
  { id: 'sojourn', name: '索杰恩', nameEn: 'Sojourn', role: 'damage', color: '#ef4444', image: heroImages.sojourn },
  { id: 'soldier76', name: '士兵:76', nameEn: 'Soldier: 76', role: 'damage', color: '#ef4444', image: heroImages.soldier76 },
  { id: 'sombra', name: '黑影', nameEn: 'Sombra', role: 'damage', color: '#ef4444', image: heroImages.sombra },
  { id: 'symmetra', name: '秩序之光', nameEn: 'Symmetra', nickname: '阿三', role: 'damage', color: '#ef4444', image: heroImages.symmetra },
  { id: 'torbjorn', name: '托比昂', nameEn: 'Torbjörn', nickname: '炮台', role: 'damage', color: '#ef4444', image: heroImages.torbjorn },
  { id: 'tracer', name: '猎空', nameEn: 'Tracer', nickname: '闪光', role: 'damage', color: '#ef4444', image: heroImages.tracer },
  { id: 'venture', name: '探奇', nameEn: 'Venture', role: 'damage', color: '#ef4444', image: heroImages.venture },
  { id: 'widowmaker', name: '黑百合', nameEn: 'Widowmaker', nickname: '寡妇', role: 'damage', color: '#ef4444', image: heroImages.widowmaker },
  { id: 'vendetta', name: '斩仇', nameEn: 'VENDETTA', role: 'damage', color: '#ef4444', image: heroImages.vendetta },
  { id: 'anran', name: '安燃', nameEn: 'Anran', role: 'damage', color: '#ef4444', image: heroImages.anran },
  { id: 'emrey', name: '埃姆雷', nameEn: 'Emrey', role: 'damage', color: '#ef4444', image: heroImages.emrey },
  
  // 支援英雄
  { id: 'ana', name: '安娜', nameEn: 'Ana', nickname: '安娜奶奶', role: 'support', color: '#22c55e', image: heroImages.ana },
  { id: 'baptiste', name: '巴蒂斯特', nameEn: 'Baptiste', role: 'support', color: '#22c55e', image: heroImages.baptiste },
  { id: 'brigitte', name: '布丽吉塔', nameEn: 'Brigitte', role: 'support', color: '#22c55e', image: heroImages.brigitte },
  { id: 'illari', name: '伊拉锐', nameEn: 'Illari', role: 'support', color: '#22c55e', image: heroImages.illari },
  { id: 'juno', name: '朱诺', nameEn: 'Juno', nickname: '火星妹', role: 'support', color: '#22c55e', image: heroImages.juno },
  { id: 'kiriko', name: '雾子', nameEn: 'Kiriko', role: 'support', color: '#22c55e', image: heroImages.kiriko },
  { id: 'lifeweaver', name: '生命之梭', nameEn: 'Lifeweaver', nickname: '花男', role: 'support', color: '#22c55e', image: heroImages.lifeweaver },
  { id: 'lucio', name: '卢西奥', nameEn: 'Lúcio', nickname: 'DJ', role: 'support', color: '#22c55e', image: heroImages.lucio },
  { id: 'mercy', name: '天使', nameEn: 'Mercy', nickname: '医生', role: 'support', color: '#22c55e', image: heroImages.mercy },
  { id: 'moira', name: '莫伊拉', nameEn: 'Moira', nickname: '阿姨', role: 'support', color: '#22c55e', image: heroImages.moira },
  { id: 'zenyatta', name: '禅雅塔', nameEn: 'Zenyatta', nickname: '和尚', role: 'support', color: '#22c55e', image: heroImages.zenyatta },
  { id: 'wuyang', name: '无漾', nameEn: 'Wuyang', role: 'support', color: '#22c55e', image: heroImages.wuyang },
  { id: 'ruixi', name: '瑞稀', nameEn: 'Ruixi', role: 'support', color: '#22c55e', image: heroImages.ruixi },
  { id: 'feitianmao', name: '飞天猫', nameEn: 'Jetpack Cat', role: 'support', color: '#22c55e', image: heroImages.feitianmao },
];

// 被克制关系数据 - 基于参考图片整理
export const counterRelations: CounterRelation[] = [
  // ========== 坦克篇 ==========
  // 1. D.Va被克制
  { source: 'junker_queen', target: 'dva', strength: 3 },
  { source: 'sigma', target: 'dva', strength: 3 },
  { source: 'zarya', target: 'dva', strength: 3 },
  { source: 'moira', target: 'dva', strength: 3 },
  { source: 'zenyatta', target: 'dva', strength: 3 },
  { source: 'ana', target: 'dva', strength: 3 },
  { source: 'symmetra', target: 'dva', strength: 3 },
  { source: 'echo', target: 'dva', strength: 3 },
  { source: 'sombra', target: 'dva', strength: 3 },
  { source: 'widowmaker', target: 'dva', strength: 3 },
  { source: 'mei', target: 'dva', strength: 3 },
  { source: 'hanzo', target: 'dva', strength: 3 },
  
  // 2. 末日铁拳被克制
  { source: 'roadhog', target: 'doomfist', strength: 3 },
  { source: 'zarya', target: 'doomfist', strength: 3 },
  { source: 'orisa', target: 'doomfist', strength: 3 },
  { source: 'sombra', target: 'doomfist', strength: 3 },
  { source: 'cassidy', target: 'doomfist', strength: 3 },
  { source: 'tracer', target: 'doomfist', strength: 3 },
  { source: 'ana', target: 'doomfist', strength: 3 },
  { source: 'juno', target: 'doomfist', strength: 3 },
  { source: 'brigitte', target: 'doomfist', strength: 3 },
  
  // 3. 莱因哈特被克制
  { source: 'orisa', target: 'reinhardt', strength: 3 },
  { source: 'winston', target: 'reinhardt', strength: 3 },
  { source: 'ramattra', target: 'reinhardt', strength: 3 },
  { source: 'pharah', target: 'reinhardt', strength: 3 },
  { source: 'ashe', target: 'reinhardt', strength: 3 },
  { source: 'echo', target: 'reinhardt', strength: 3 },
  { source: 'bastion', target: 'reinhardt', strength: 3 },
  { source: 'mei', target: 'reinhardt', strength: 3 },
  { source: 'junkrat', target: 'reinhardt', strength: 3 },
  { source: 'torbjorn', target: 'reinhardt', strength: 3 },
  { source: 'ana', target: 'reinhardt', strength: 3 },
  { source: 'baptiste', target: 'reinhardt', strength: 3 },
  { source: 'brigitte', target: 'reinhardt', strength: 3 },
  { source: 'zenyatta', target: 'reinhardt', strength: 3 },
  { source: 'lucio', target: 'reinhardt', strength: 3 },
  { source: 'illari', target: 'reinhardt', strength: 3 },
  
  // 4. 骇灾被克制
  { source: 'dva', target: 'hazard', strength: 3 },
  { source: 'sigma', target: 'hazard', strength: 3 },
  { source: 'doomfist', target: 'hazard', strength: 3 },
  { source: 'roadhog', target: 'hazard', strength: 3 },
  { source: 'orisa', target: 'hazard', strength: 3 },
  { source: 'zarya', target: 'hazard', strength: 3 },
  { source: 'tracer', target: 'hazard', strength: 3 },
  { source: 'sojourn', target: 'hazard', strength: 3 },
  { source: 'torbjorn', target: 'hazard', strength: 3 },
  { source: 'echo', target: 'hazard', strength: 3 },
  { source: 'ana', target: 'hazard', strength: 3 },
  { source: 'zenyatta', target: 'hazard', strength: 3 },
  
  // 5. 路霸被克制
  { source: 'junker_queen', target: 'roadhog', strength: 3 },
  { source: 'zarya', target: 'roadhog', strength: 3 },
  { source: 'orisa', target: 'roadhog', strength: 3 },
  { source: 'doomfist', target: 'roadhog', strength: 3 },
  { source: 'mauga', target: 'roadhog', strength: 3 },
  { source: 'reinhardt', target: 'roadhog', strength: 3 },
  { source: 'echo', target: 'roadhog', strength: 3 },
  { source: 'widowmaker', target: 'roadhog', strength: 3 },
  { source: 'mei', target: 'roadhog', strength: 3 },
  { source: 'pharah', target: 'roadhog', strength: 3 },
  { source: 'reaper', target: 'roadhog', strength: 3 },
  { source: 'sojourn', target: 'roadhog', strength: 3 },
  { source: 'genji', target: 'roadhog', strength: 3 },
  { source: 'ashe', target: 'roadhog', strength: 3 },
  { source: 'hanzo', target: 'roadhog', strength: 3 },
  { source: 'sombra', target: 'roadhog', strength: 3 },
  { source: 'zenyatta', target: 'roadhog', strength: 3 },
  { source: 'ana', target: 'roadhog', strength: 3 },
  { source: 'baptiste', target: 'roadhog', strength: 3 },
  { source: 'brigitte', target: 'roadhog', strength: 3 },
  
  // 6. 渣客女王被克制
  { source: 'orisa', target: 'junker_queen', strength: 3 },
  { source: 'doomfist', target: 'junker_queen', strength: 3 },
  { source: 'mauga', target: 'junker_queen', strength: 3 },
  { source: 'hazard', target: 'junker_queen', strength: 3 },
  { source: 'zarya', target: 'junker_queen', strength: 3 },
  { source: 'pharah', target: 'junker_queen', strength: 3 },
  { source: 'mei', target: 'junker_queen', strength: 3 },
  { source: 'torbjorn', target: 'junker_queen', strength: 3 },
  { source: 'sojourn', target: 'junker_queen', strength: 3 },
  { source: 'echo', target: 'junker_queen', strength: 3 },
  { source: 'juno', target: 'junker_queen', strength: 3 },
  { source: 'ana', target: 'junker_queen', strength: 3 },
  { source: 'lucio', target: 'junker_queen', strength: 3 },
  { source: 'kiriko', target: 'junker_queen', strength: 3 },
  
  // 7. 西格玛被克制
  { source: 'doomfist', target: 'sigma', strength: 3 },
  { source: 'winston', target: 'sigma', strength: 3 },
  { source: 'reinhardt', target: 'sigma', strength: 3 },
  { source: 'ramattra', target: 'sigma', strength: 3 },
  { source: 'symmetra', target: 'sigma', strength: 3 },
  { source: 'mei', target: 'sigma', strength: 3 },
  { source: 'sombra', target: 'sigma', strength: 3 },
  { source: 'pharah', target: 'sigma', strength: 3 },
  { source: 'kiriko', target: 'sigma', strength: 3 },
  { source: 'brigitte', target: 'sigma', strength: 3 },
  { source: 'zenyatta', target: 'sigma', strength: 3 },
  { source: 'lifeweaver', target: 'sigma', strength: 3 },
  { source: 'moira', target: 'sigma', strength: 3 },
  
  // 8. 毛加被克制
  { source: 'sigma', target: 'mauga', strength: 3 },
  { source: 'zarya', target: 'mauga', strength: 3 },
  { source: 'orisa', target: 'mauga', strength: 3 },
  { source: 'pharah', target: 'mauga', strength: 3 },
  { source: 'echo', target: 'mauga', strength: 3 },
  { source: 'reaper', target: 'mauga', strength: 3 },
  { source: 'sojourn', target: 'mauga', strength: 3 },
  { source: 'widowmaker', target: 'mauga', strength: 3 },
  { source: 'zenyatta', target: 'mauga', strength: 3 },
  { source: 'ana', target: 'mauga', strength: 3 },
  { source: 'juno', target: 'mauga', strength: 3 },
  
  // 9. 温斯顿被克制
  { source: 'hazard', target: 'winston', strength: 3 },
  { source: 'mauga', target: 'winston', strength: 3 },
  { source: 'junker_queen', target: 'winston', strength: 3 },
  { source: 'dva', target: 'winston', strength: 3 },
  { source: 'torbjorn', target: 'winston', strength: 3 },
  { source: 'bastion', target: 'winston', strength: 3 },
  { source: 'reaper', target: 'winston', strength: 3 },
  { source: 'cassidy', target: 'winston', strength: 3 },
  { source: 'echo', target: 'winston', strength: 3 },
  { source: 'junkrat', target: 'winston', strength: 3 },
  { source: 'lucio', target: 'winston', strength: 3 },
  { source: 'illari', target: 'winston', strength: 3 },
  { source: 'ana', target: 'winston', strength: 3 },
  { source: 'brigitte', target: 'winston', strength: 3 },
  { source: 'zenyatta', target: 'winston', strength: 3 },
  { source: 'hanzo', target: 'winston', strength: 3 },
  
  // 10. 奥丽莎被克制
  { source: 'sigma', target: 'orisa', strength: 3 },
  { source: 'winston', target: 'orisa', strength: 3 },
  { source: 'zarya', target: 'orisa', strength: 3 },
  { source: 'wrecking_ball', target: 'orisa', strength: 3 },
  { source: 'baptiste', target: 'orisa', strength: 3 },
  { source: 'hanzo', target: 'orisa', strength: 3 },
  { source: 'ashe', target: 'orisa', strength: 3 },
  { source: 'sojourn', target: 'orisa', strength: 3 },
  { source: 'tracer', target: 'orisa', strength: 3 },
  { source: 'junkrat', target: 'orisa', strength: 3 },
  { source: 'echo', target: 'orisa', strength: 3 },
  { source: 'widowmaker', target: 'orisa', strength: 3 },
  { source: 'pharah', target: 'orisa', strength: 3 },
  { source: 'bastion', target: 'orisa', strength: 3 },
  { source: 'ana', target: 'orisa', strength: 3 },
  { source: 'illari', target: 'orisa', strength: 3 },
  { source: 'zenyatta', target: 'orisa', strength: 3 },
  
  // 11. 破坏球被克制
  { source: 'orisa', target: 'wrecking_ball', strength: 3 },
  { source: 'dva', target: 'wrecking_ball', strength: 3 },
  { source: 'doomfist', target: 'wrecking_ball', strength: 3 },
  { source: 'mauga', target: 'wrecking_ball', strength: 3 },
  { source: 'roadhog', target: 'wrecking_ball', strength: 3 },
  { source: 'sombra', target: 'wrecking_ball', strength: 3 },
  { source: 'cassidy', target: 'wrecking_ball', strength: 3 },
  { source: 'tracer', target: 'wrecking_ball', strength: 3 },
  { source: 'sojourn', target: 'wrecking_ball', strength: 3 },
  { source: 'torbjorn', target: 'wrecking_ball', strength: 3 },
  { source: 'ana', target: 'wrecking_ball', strength: 3 },
  { source: 'brigitte', target: 'wrecking_ball', strength: 3 },
  { source: 'lucio', target: 'wrecking_ball', strength: 3 },
  
  // 12. 拉玛刹被克制
  { source: 'sigma', target: 'ramattra', strength: 3 },
  { source: 'junker_queen', target: 'ramattra', strength: 3 },
  { source: 'mauga', target: 'ramattra', strength: 3 },
  { source: 'roadhog', target: 'ramattra', strength: 3 },
  { source: 'hazard', target: 'ramattra', strength: 3 },
  { source: 'bastion', target: 'ramattra', strength: 3 },
  { source: 'pharah', target: 'ramattra', strength: 3 },
  { source: 'genji', target: 'ramattra', strength: 3 },
  { source: 'torbjorn', target: 'ramattra', strength: 3 },
  { source: 'sojourn', target: 'ramattra', strength: 3 },
  { source: 'reaper', target: 'ramattra', strength: 3 },
  { source: 'mei', target: 'ramattra', strength: 3 },
  { source: 'tracer', target: 'ramattra', strength: 3 },
  { source: 'echo', target: 'ramattra', strength: 3 },
  { source: 'juno', target: 'ramattra', strength: 3 },
  { source: 'ana', target: 'ramattra', strength: 3 },
  { source: 'baptiste', target: 'ramattra', strength: 3 },
  { source: 'illari', target: 'ramattra', strength: 3 },
  { source: 'zenyatta', target: 'ramattra', strength: 3 },
  
  // 13. 查莉娅被克制
  { source: 'winston', target: 'zarya', strength: 3 },
  { source: 'wrecking_ball', target: 'zarya', strength: 3 },
  { source: 'ramattra', target: 'zarya', strength: 3 },
  { source: 'reinhardt', target: 'zarya', strength: 3 },
  { source: 'widowmaker', target: 'zarya', strength: 3 },
  { source: 'mei', target: 'zarya', strength: 3 },
  { source: 'ashe', target: 'zarya', strength: 3 },
  { source: 'zenyatta', target: 'zarya', strength: 3 },
  { source: 'lifeweaver', target: 'zarya', strength: 3 },
  
  // ========== 输出篇 ==========
  // 1. 艾什被克制
  { source: 'winston', target: 'ashe', strength: 3 },
  { source: 'ramattra', target: 'ashe', strength: 3 },
  { source: 'hazard', target: 'ashe', strength: 3 },
  { source: 'hanzo', target: 'ashe', strength: 3 },
  { source: 'widowmaker', target: 'ashe', strength: 3 },
  { source: 'tracer', target: 'ashe', strength: 3 },
  { source: 'sojourn', target: 'ashe', strength: 3 },
  { source: 'zenyatta', target: 'ashe', strength: 3 },
  { source: 'illari', target: 'ashe', strength: 3 },
  
  // 2. 死神被克制
  { source: 'sigma', target: 'reaper', strength: 3 },
  { source: 'zarya', target: 'reaper', strength: 3 },
  { source: 'orisa', target: 'reaper', strength: 3 },
  { source: 'ashe', target: 'reaper', strength: 3 },
  { source: 'hanzo', target: 'reaper', strength: 3 },
  { source: 'pharah', target: 'reaper', strength: 3 },
  { source: 'widowmaker', target: 'reaper', strength: 3 },
  { source: 'cassidy', target: 'reaper', strength: 3 },
  { source: 'echo', target: 'reaper', strength: 3 },
  { source: 'tracer', target: 'reaper', strength: 3 },
  { source: 'sojourn', target: 'reaper', strength: 3 },
  { source: 'torbjorn', target: 'reaper', strength: 3 },
  { source: 'genji', target: 'reaper', strength: 3 },
  { source: 'symmetra', target: 'reaper', strength: 3 },
  { source: 'ana', target: 'reaper', strength: 3 },
  { source: 'baptiste', target: 'reaper', strength: 3 },
  { source: 'brigitte', target: 'reaper', strength: 3 },
  { source: 'zenyatta', target: 'reaper', strength: 3 },
  { source: 'lucio', target: 'reaper', strength: 3 },
  { source: 'illari', target: 'reaper', strength: 3 },
  { source: 'juno', target: 'reaper', strength: 3 },
  
  // 3. 堡垒被克制
  { source: 'sigma', target: 'bastion', strength: 3 },
  { source: 'junker_queen', target: 'bastion', strength: 3 },
  { source: 'dva', target: 'bastion', strength: 3 },
  { source: 'hazard', target: 'bastion', strength: 3 },
  { source: 'mauga', target: 'bastion', strength: 3 },
  { source: 'ashe', target: 'bastion', strength: 3 },
  { source: 'hanzo', target: 'bastion', strength: 3 },
  { source: 'widowmaker', target: 'bastion', strength: 3 },
  { source: 'echo', target: 'bastion', strength: 3 },
  { source: 'junkrat', target: 'bastion', strength: 3 },
  { source: 'pharah', target: 'bastion', strength: 3 },
  { source: 'sojourn', target: 'bastion', strength: 3 },
  { source: 'genji', target: 'bastion', strength: 3 },
  { source: 'symmetra', target: 'bastion', strength: 3 },
  { source: 'ana', target: 'bastion', strength: 3 },
  { source: 'zenyatta', target: 'bastion', strength: 3 },
  { source: 'illari', target: 'bastion', strength: 3 },
  
  // 4. 索杰恩被克制
  { source: 'winston', target: 'sojourn', strength: 3 },
  { source: 'widowmaker', target: 'sojourn', strength: 3 },
  { source: 'echo', target: 'sojourn', strength: 3 },
  { source: 'tracer', target: 'sojourn', strength: 3 },
  { source: 'symmetra', target: 'sojourn', strength: 3 },
  
  // 5. 卡西迪被克制
  { source: 'hazard', target: 'cassidy', strength: 3 },
  { source: 'zarya', target: 'cassidy', strength: 3 },
  { source: 'orisa', target: 'cassidy', strength: 3 },
  { source: 'mauga', target: 'cassidy', strength: 3 },
  { source: 'mei', target: 'cassidy', strength: 3 },
  { source: 'ashe', target: 'cassidy', strength: 3 },
  { source: 'sojourn', target: 'cassidy', strength: 3 },
  { source: 'hanzo', target: 'cassidy', strength: 3 },
  { source: 'soldier76', target: 'cassidy', strength: 3 },
  { source: 'torbjorn', target: 'cassidy', strength: 3 },
  { source: 'widowmaker', target: 'cassidy', strength: 3 },
  { source: 'zenyatta', target: 'cassidy', strength: 3 },
  { source: 'baptiste', target: 'cassidy', strength: 3 },
  { source: 'ana', target: 'cassidy', strength: 3 },
  { source: 'illari', target: 'cassidy', strength: 3 },
  
  // 6. 士兵76被克制
  { source: 'sigma', target: 'soldier76', strength: 3 },
  { source: 'winston', target: 'soldier76', strength: 3 },
  { source: 'doomfist', target: 'soldier76', strength: 3 },
  { source: 'wrecking_ball', target: 'soldier76', strength: 3 },
  { source: 'junker_queen', target: 'soldier76', strength: 3 },
  { source: 'mauga', target: 'soldier76', strength: 3 },
  { source: 'hazard', target: 'soldier76', strength: 3 },
  { source: 'dva', target: 'soldier76', strength: 3 },
  { source: 'sojourn', target: 'soldier76', strength: 3 },
  { source: 'reaper', target: 'soldier76', strength: 3 },
  { source: 'bastion', target: 'soldier76', strength: 3 },
  { source: 'ashe', target: 'soldier76', strength: 3 },
  { source: 'widowmaker', target: 'soldier76', strength: 3 },
  { source: 'hanzo', target: 'soldier76', strength: 3 },
  { source: 'zenyatta', target: 'soldier76', strength: 3 },
  { source: 'baptiste', target: 'soldier76', strength: 3 },
  { source: 'illari', target: 'soldier76', strength: 3 },
  
  // 7. 回声被克制
  { source: 'winston', target: 'echo', strength: 3 },
  { source: 'zarya', target: 'echo', strength: 3 },
  { source: 'ashe', target: 'echo', strength: 3 },
  { source: 'soldier76', target: 'echo', strength: 3 },
  { source: 'widowmaker', target: 'echo', strength: 3 },
  { source: 'ana', target: 'echo', strength: 3 },
  { source: 'baptiste', target: 'echo', strength: 3 },
  { source: 'illari', target: 'echo', strength: 3 },
  
  // 8. 黑影被克制
  { source: 'winston', target: 'sombra', strength: 3 },
  { source: 'zarya', target: 'sombra', strength: 3 },
  { source: 'dva', target: 'sombra', strength: 3 },
  { source: 'torbjorn', target: 'sombra', strength: 3 },
  { source: 'tracer', target: 'sombra', strength: 3 },
  { source: 'soldier76', target: 'sombra', strength: 3 },
  { source: 'sojourn', target: 'sombra', strength: 3 },
  { source: 'symmetra', target: 'sombra', strength: 3 },
  { source: 'cassidy', target: 'sombra', strength: 3 },
  { source: 'brigitte', target: 'sombra', strength: 3 },
  { source: 'lucio', target: 'sombra', strength: 3 },
  
  // 9. 秩序之光被克制
  { source: 'winston', target: 'symmetra', strength: 3 },
  { source: 'zarya', target: 'symmetra', strength: 3 },
  { source: 'venture', target: 'symmetra', strength: 3 },
  { source: 'pharah', target: 'symmetra', strength: 3 },
  { source: 'widowmaker', target: 'symmetra', strength: 3 },
  { source: 'echo', target: 'symmetra', strength: 3 },
  { source: 'ashe', target: 'symmetra', strength: 3 },
  { source: 'ana', target: 'symmetra', strength: 3 },
  { source: 'zenyatta', target: 'symmetra', strength: 3 },
  { source: 'brigitte', target: 'symmetra', strength: 3 },
  { source: 'kiriko', target: 'symmetra', strength: 3 },
  
  // 10. 源氏被克制
  { source: 'winston', target: 'genji', strength: 3 },
  { source: 'zarya', target: 'genji', strength: 3 },
  { source: 'pharah', target: 'genji', strength: 3 },
  { source: 'echo', target: 'genji', strength: 3 },
  { source: 'torbjorn', target: 'genji', strength: 3 },
  { source: 'cassidy', target: 'genji', strength: 3 },
  { source: 'brigitte', target: 'genji', strength: 3 },
  { source: 'zenyatta', target: 'genji', strength: 3 },
  
  // 11. 托比昂被克制
  { source: 'orisa', target: 'torbjorn', strength: 3 },
  { source: 'zarya', target: 'torbjorn', strength: 3 },
  { source: 'mei', target: 'torbjorn', strength: 3 },
  { source: 'widowmaker', target: 'torbjorn', strength: 3 },
  { source: 'echo', target: 'torbjorn', strength: 3 },
  { source: 'junkrat', target: 'torbjorn', strength: 3 },
  { source: 'bastion', target: 'torbjorn', strength: 3 },
  { source: 'pharah', target: 'torbjorn', strength: 3 },
  { source: 'hanzo', target: 'torbjorn', strength: 3 },
  { source: 'ashe', target: 'torbjorn', strength: 3 },
  { source: 'sojourn', target: 'torbjorn', strength: 3 },
  { source: 'zenyatta', target: 'torbjorn', strength: 3 },
  { source: 'ana', target: 'torbjorn', strength: 3 },
  
  // 12. 半藏被克制
  { source: 'wrecking_ball', target: 'hanzo', strength: 3 },
  { source: 'winston', target: 'hanzo', strength: 3 },
  { source: 'hazard', target: 'hanzo', strength: 3 },
  { source: 'doomfist', target: 'hanzo', strength: 3 },
  { source: 'sombra', target: 'hanzo', strength: 3 },
  { source: 'echo', target: 'hanzo', strength: 3 },
  { source: 'tracer', target: 'hanzo', strength: 3 },
  { source: 'genji', target: 'hanzo', strength: 3 },
  { source: 'pharah', target: 'hanzo', strength: 3 },
  { source: 'lucio', target: 'hanzo', strength: 3 },
  { source: 'venture', target: 'hanzo', strength: 3 },
  { source: 'juno', target: 'hanzo', strength: 3 },
  { source: 'kiriko', target: 'hanzo', strength: 3 },
  { source: 'moira', target: 'hanzo', strength: 3 },
  
  // 13. 猎空被克制
  { source: 'dva', target: 'tracer', strength: 3 },
  { source: 'cassidy', target: 'tracer', strength: 3 },
  { source: 'torbjorn', target: 'tracer', strength: 3 },
  { source: 'baptiste', target: 'tracer', strength: 3 },
  { source: 'brigitte', target: 'tracer', strength: 3 },
  { source: 'illari', target: 'tracer', strength: 3 },
  { source: 'juno', target: 'tracer', strength: 3 },
  
  // 14. 狂鼠被克制
  { source: 'zarya', target: 'junkrat', strength: 3 },
  { source: 'ashe', target: 'junkrat', strength: 3 },
  { source: 'hanzo', target: 'junkrat', strength: 3 },
  { source: 'pharah', target: 'junkrat', strength: 3 },
  { source: 'echo', target: 'junkrat', strength: 3 },
  { source: 'tracer', target: 'junkrat', strength: 3 },
  { source: 'genji', target: 'junkrat', strength: 3 },
  { source: 'juno', target: 'junkrat', strength: 3 },
  { source: 'zenyatta', target: 'junkrat', strength: 3 },
  
  // 15. 探奇被克制
  { source: 'roadhog', target: 'venture', strength: 3 },
  { source: 'doomfist', target: 'venture', strength: 3 },
  { source: 'orisa', target: 'venture', strength: 3 },
  { source: 'sojourn', target: 'venture', strength: 3 },
  { source: 'echo', target: 'venture', strength: 3 },
  { source: 'pharah', target: 'venture', strength: 3 },
  { source: 'tracer', target: 'venture', strength: 3 },
  { source: 'cassidy', target: 'venture', strength: 3 },
  { source: 'juno', target: 'venture', strength: 3 },
  { source: 'kiriko', target: 'venture', strength: 3 },
  { source: 'brigitte', target: 'venture', strength: 3 },
  { source: 'lucio', target: 'venture', strength: 3 },
  { source: 'mercy', target: 'venture', strength: 3 },
  { source: 'moira', target: 'venture', strength: 3 },
  
  // 16. 小美被克制
  { source: 'ashe', target: 'mei', strength: 3 },
  { source: 'pharah', target: 'mei', strength: 3 },
  { source: 'widowmaker', target: 'mei', strength: 3 },
  { source: 'cassidy', target: 'mei', strength: 3 },
  { source: 'echo', target: 'mei', strength: 3 },
  { source: 'hanzo', target: 'mei', strength: 3 },
  { source: 'reaper', target: 'mei', strength: 3 },
  { source: 'venture', target: 'mei', strength: 3 },
  { source: 'zenyatta', target: 'mei', strength: 3 },
  { source: 'baptiste', target: 'mei', strength: 3 },
  { source: 'ana', target: 'mei', strength: 3 },
  { source: 'juno', target: 'mei', strength: 3 },
  { source: 'illari', target: 'mei', strength: 3 },
  
  // 17. 黑百合被克制
  { source: 'wrecking_ball', target: 'widowmaker', strength: 3 },
  { source: 'doomfist', target: 'widowmaker', strength: 3 },
  { source: 'sigma', target: 'widowmaker', strength: 3 },
  { source: 'winston', target: 'widowmaker', strength: 3 },
  { source: 'widowmaker', target: 'widowmaker', strength: 3 },
  { source: 'sombra', target: 'widowmaker', strength: 3 },
  { source: 'tracer', target: 'widowmaker', strength: 3 },
  { source: 'genji', target: 'widowmaker', strength: 3 },
  { source: 'kiriko', target: 'widowmaker', strength: 3 },
  { source: 'lucio', target: 'widowmaker', strength: 3 },
  
  // 18. 法老之鹰被克制
  { source: 'dva', target: 'pharah', strength: 3 },
  { source: 'wrecking_ball', target: 'pharah', strength: 3 },
  { source: 'ashe', target: 'pharah', strength: 3 },
  { source: 'echo', target: 'pharah', strength: 3 },
  { source: 'soldier76', target: 'pharah', strength: 3 },
  { source: 'widowmaker', target: 'pharah', strength: 3 },
  { source: 'baptiste', target: 'pharah', strength: 3 },
  { source: 'illari', target: 'pharah', strength: 3 },
  
  // ========== 芙蕾雅（Freja）克制关系 ==========
  // 芙蕾雅被克制 - 强化弩箭滞空输出，惧怕反弹和突进
  // 1. 源氏（核心克制 - 反弹弩箭）
  { source: 'genji', target: 'freja', strength: 3 },
  
  // 2. 高机动突进英雄
  { source: 'tracer', target: 'freja', strength: 3 },
  { source: 'sombra', target: 'freja', strength: 3 },
  
  // 3. 即时命中长枪（针对滞空）
  { source: 'widowmaker', target: 'freja', strength: 3 },
  { source: 'ashe', target: 'freja', strength: 3 },
  { source: 'soldier76', target: 'freja', strength: 3 },
  { source: 'cassidy', target: 'freja', strength: 3 },
  
  // ========== 斩仇（Vendetta/Zhanchou）克制关系 ==========
  // 斩仇被克制 - 纯近战英雄，缺乏远程能力
  // 1. 空中/飞行单位（天克）
  { source: 'pharah', target: 'vendetta', strength: 3 },
  { source: 'echo', target: 'vendetta', strength: 3 },
  { source: 'juno', target: 'vendetta', strength: 3 },
  
  // 2. 强控制与防突进英雄
  { source: 'sombra', target: 'vendetta', strength: 3 },
  { source: 'cassidy', target: 'vendetta', strength: 3 },
  { source: 'ana', target: 'vendetta', strength: 3 },
  { source: 'illari', target: 'vendetta', strength: 3 },
  { source: 'orisa', target: 'vendetta', strength: 3 },
  { source: 'mauga', target: 'vendetta', strength: 3 },
  
  // 3. 长距离消耗/狙击英雄
  { source: 'widowmaker', target: 'vendetta', strength: 3 },
  { source: 'ashe', target: 'vendetta', strength: 3 },
  { source: 'hanzo', target: 'vendetta', strength: 3 },
  { source: 'sojourn', target: 'vendetta', strength: 3 },
  { source: 'soldier76', target: 'vendetta', strength: 3 },
  
  // 4. 近战/陷阱/爆发英雄
  { source: 'roadhog', target: 'vendetta', strength: 3 },
  { source: 'junkrat', target: 'vendetta', strength: 3 },
  { source: 'torbjorn', target: 'vendetta', strength: 3 },
  { source: 'mei', target: 'vendetta', strength: 3 },
  { source: 'dva', target: 'vendetta', strength: 3 },
  { source: 'zarya', target: 'vendetta', strength: 3 },
  
  // 5. 高机动风筝型
  { source: 'tracer', target: 'vendetta', strength: 3 },
  { source: 'genji', target: 'vendetta', strength: 3 },
  { source: 'venture', target: 'vendetta', strength: 3 },
  
  // 6. 范围伤害/控制
  { source: 'symmetra', target: 'vendetta', strength: 3 },
  { source: 'baptiste', target: 'vendetta', strength: 3 },
  { source: 'brigitte', target: 'vendetta', strength: 3 },
  { source: 'kiriko', target: 'vendetta', strength: 3 },
  { source: 'moira', target: 'vendetta', strength: 3 },
  { source: 'zenyatta', target: 'vendetta', strength: 3 },
  { source: 'mercy', target: 'vendetta', strength: 3 },
  { source: 'lucio', target: 'vendetta', strength: 3 },
  
  // ========== 辅助篇 ==========
  // 1. 安娜被克制
  { source: 'orisa', target: 'ana', strength: 3 },
  { source: 'junker_queen', target: 'ana', strength: 3 },
  { source: 'wrecking_ball', target: 'ana', strength: 3 },
  { source: 'doomfist', target: 'ana', strength: 3 },
  { source: 'winston', target: 'ana', strength: 3 },
  { source: 'tracer', target: 'ana', strength: 3 },
  { source: 'sombra', target: 'ana', strength: 3 },
  { source: 'widowmaker', target: 'ana', strength: 3 },
  { source: 'venture', target: 'ana', strength: 3 },
  { source: 'hanzo', target: 'ana', strength: 3 },
  { source: 'genji', target: 'ana', strength: 3 },
  { source: 'kiriko', target: 'ana', strength: 3 },
  { source: 'zenyatta', target: 'ana', strength: 3 },
  
  // 2. 生命之梭被克制
  { source: 'mauga', target: 'lifeweaver', strength: 3 },
  { source: 'junker_queen', target: 'lifeweaver', strength: 3 },
  { source: 'sombra', target: 'lifeweaver', strength: 3 },
  { source: 'echo', target: 'lifeweaver', strength: 3 },
  { source: 'ashe', target: 'lifeweaver', strength: 3 },
  { source: 'widowmaker', target: 'lifeweaver', strength: 3 },
  { source: 'venture', target: 'lifeweaver', strength: 3 },
  { source: 'pharah', target: 'lifeweaver', strength: 3 },
  { source: 'ana', target: 'lifeweaver', strength: 3 },
  { source: 'zenyatta', target: 'lifeweaver', strength: 3 },
  
  // 3. 巴蒂斯特被克制
  { source: 'winston', target: 'baptiste', strength: 3 },
  { source: 'hazard', target: 'baptiste', strength: 3 },
  { source: 'junker_queen', target: 'baptiste', strength: 3 },
  { source: 'genji', target: 'baptiste', strength: 3 },
  { source: 'hanzo', target: 'baptiste', strength: 3 },
  { source: 'widowmaker', target: 'baptiste', strength: 3 },
  { source: 'sojourn', target: 'baptiste', strength: 3 },
  { source: 'illari', target: 'baptiste', strength: 3 },
  { source: 'ana', target: 'baptiste', strength: 3 },
  { source: 'zenyatta', target: 'baptiste', strength: 3 },
  { source: 'moira', target: 'baptiste', strength: 3 },
  
  // 4. 卢西奥被克制
  { source: 'pharah', target: 'lucio', strength: 3 },
  { source: 'sombra', target: 'lucio', strength: 3 },
  { source: 'echo', target: 'lucio', strength: 3 },
  { source: 'zenyatta', target: 'lucio', strength: 3 },
  { source: 'illari', target: 'lucio', strength: 3 },
  { source: 'juno', target: 'lucio', strength: 3 },
  { source: 'ana', target: 'lucio', strength: 3 },
  { source: 'baptiste', target: 'lucio', strength: 3 },
  
  // 5. 布丽吉塔被克制
  { source: 'hazard', target: 'brigitte', strength: 3 },
  { source: 'ramattra', target: 'brigitte', strength: 3 },
  { source: 'junker_queen', target: 'brigitte', strength: 3 },
  { source: 'pharah', target: 'brigitte', strength: 3 },
  { source: 'mei', target: 'brigitte', strength: 3 },
  { source: 'widowmaker', target: 'brigitte', strength: 3 },
  { source: 'echo', target: 'brigitte', strength: 3 },
  { source: 'junkrat', target: 'brigitte', strength: 3 },
  { source: 'torbjorn', target: 'brigitte', strength: 3 },
  { source: 'symmetra', target: 'brigitte', strength: 3 },
  { source: 'ashe', target: 'brigitte', strength: 3 },
  { source: 'hanzo', target: 'brigitte', strength: 3 },
  { source: 'bastion', target: 'brigitte', strength: 3 },
  { source: 'illari', target: 'brigitte', strength: 3 },
  { source: 'moira', target: 'brigitte', strength: 3 },
  { source: 'zenyatta', target: 'brigitte', strength: 3 },
  { source: 'ana', target: 'brigitte', strength: 3 },
  { source: 'baptiste', target: 'brigitte', strength: 3 },
  
  // 6. 天使被克制
  { source: 'dva', target: 'mercy', strength: 3 },
  { source: 'hazard', target: 'mercy', strength: 3 },
  { source: 'mauga', target: 'mercy', strength: 3 },
  { source: 'junker_queen', target: 'mercy', strength: 3 },
  { source: 'wrecking_ball', target: 'mercy', strength: 3 },
  { source: 'winston', target: 'mercy', strength: 3 },
  { source: 'illari', target: 'mercy', strength: 3 },
  { source: 'sombra', target: 'mercy', strength: 3 },
  { source: 'echo', target: 'mercy', strength: 3 },
  { source: 'ashe', target: 'mercy', strength: 3 },
  { source: 'tracer', target: 'mercy', strength: 3 },
  { source: 'soldier76', target: 'mercy', strength: 3 },
  { source: 'sojourn', target: 'mercy', strength: 3 },
  { source: 'juno', target: 'mercy', strength: 3 },
  { source: 'ana', target: 'mercy', strength: 3 },
  
  // 7. 雾子被克制
  { source: 'pharah', target: 'kiriko', strength: 3 },
  { source: 'tracer', target: 'kiriko', strength: 3 },
  { source: 'sojourn', target: 'kiriko', strength: 3 },
  { source: 'zenyatta', target: 'kiriko', strength: 3 },
  
  // 8. 朱诺被克制
  { source: 'junker_queen', target: 'juno', strength: 3 },
  { source: 'sombra', target: 'juno', strength: 3 },
  { source: 'sojourn', target: 'juno', strength: 3 },
  { source: 'illari', target: 'juno', strength: 3 },
  { source: 'ana', target: 'juno', strength: 3 },
  { source: 'zenyatta', target: 'juno', strength: 3 },
  
  // 9. 伊拉锐被克制
  { source: 'winston', target: 'illari', strength: 3 },
  { source: 'sigma', target: 'illari', strength: 3 },
  { source: 'widowmaker', target: 'illari', strength: 3 },
  { source: 'sojourn', target: 'illari', strength: 3 },
  { source: 'ashe', target: 'illari', strength: 3 },
  { source: 'zenyatta', target: 'illari', strength: 3 },
  
  // 10. 莫伊拉被克制
  { source: 'junker_queen', target: 'moira', strength: 3 },
  { source: 'wrecking_ball', target: 'moira', strength: 3 },
  { source: 'pharah', target: 'moira', strength: 3 },
  { source: 'widowmaker', target: 'moira', strength: 3 },
  { source: 'echo', target: 'moira', strength: 3 },
  { source: 'tracer', target: 'moira', strength: 3 },
  { source: 'torbjorn', target: 'moira', strength: 3 },
  { source: 'ashe', target: 'moira', strength: 3 },
  { source: 'zenyatta', target: 'moira', strength: 3 },
  { source: 'juno', target: 'moira', strength: 3 },
  { source: 'ana', target: 'moira', strength: 3 },
  { source: 'baptiste', target: 'moira', strength: 3 },
  
  // 11. 禅雅塔被克制
  { source: 'wrecking_ball', target: 'zenyatta', strength: 3 },
  { source: 'doomfist', target: 'zenyatta', strength: 3 },
  { source: 'winston', target: 'zenyatta', strength: 3 },
  { source: 'genji', target: 'zenyatta', strength: 3 },
  { source: 'hanzo', target: 'zenyatta', strength: 3 },
  { source: 'venture', target: 'zenyatta', strength: 3 },
  { source: 'widowmaker', target: 'zenyatta', strength: 3 },
  { source: 'sombra', target: 'zenyatta', strength: 3 },
  { source: 'echo', target: 'zenyatta', strength: 3 },
  { source: 'tracer', target: 'zenyatta', strength: 3 },
  { source: 'sojourn', target: 'zenyatta', strength: 3 },
  { source: 'kiriko', target: 'zenyatta', strength: 3 },
   
   // ========== 斩仇（Vendetta）克制他人 ==========
   // 斩仇作为高机动近战刺客，克制缺乏自保能力的脆皮和机动性差的目标
   // 1. 克制机动性较差的脆皮输出
   { source: 'vendetta', target: 'ashe', strength: 3 },
   { source: 'vendetta', target: 'bastion', strength: 3 },
   { source: 'vendetta', target: 'hanzo', strength: 3 },
   { source: 'vendetta', target: 'junkrat', strength: 3 },
   { source: 'vendetta', target: 'mei', strength: 2 },
   { source: 'vendetta', target: 'reaper', strength: 2 },
   { source: 'vendetta', target: 'sojourn', strength: 3 },
   { source: 'vendetta', target: 'soldier76', strength: 3 },
   { source: 'vendetta', target: 'symmetra', strength: 3 },
   { source: 'vendetta', target: 'torbjorn', strength: 3 },
   { source: 'vendetta', target: 'widowmaker', strength: 3 },
   { source: 'vendetta', target: 'freja', strength: 3 },
   
   // 2. 克制缺乏自保的支援
   { source: 'vendetta', target: 'ana', strength: 3 },
   { source: 'vendetta', target: 'baptiste', strength: 3 },
   { source: 'vendetta', target: 'brigitte', strength: 2 },
   { source: 'vendetta', target: 'illari', strength: 3 },
   { source: 'vendetta', target: 'juno', strength: 2 },
   { source: 'vendetta', target: 'kiriko', strength: 3 },
   { source: 'vendetta', target: 'lifeweaver', strength: 3 },
   { source: 'vendetta', target: 'lucio', strength: 3 },
   { source: 'vendetta', target: 'mercy', strength: 3 },
   { source: 'vendetta', target: 'moira', strength: 3 },
   { source: 'vendetta', target: 'zenyatta', strength: 3 },
   
   // 3. 与其他机动性英雄互有胜负
   { source: 'vendetta', target: 'genji', strength: 2 },
   { source: 'vendetta', target: 'tracer', strength: 2 },
   { source: 'vendetta', target: 'venture', strength: 2 },
   { source: 'vendetta', target: 'echo', strength: 1 },
   { source: 'vendetta', target: 'pharah', strength: 1 },
   { source: 'vendetta', target: 'sombra', strength: 2 },
   
   // 4. 对坦克威胁有限
   { source: 'vendetta', target: 'dva', strength: 1 },
   { source: 'vendetta', target: 'doomfist', strength: 1 },
   { source: 'vendetta', target: 'hazard', strength: 1 },
   { source: 'vendetta', target: 'junker_queen', strength: 1 },
   { source: 'vendetta', target: 'mauga', strength: 1 },
   { source: 'vendetta', target: 'orisa', strength: 1 },
   { source: 'vendetta', target: 'ramattra', strength: 1 },
   { source: 'vendetta', target: 'reinhardt', strength: 1 },
   { source: 'vendetta', target: 'roadhog', strength: 1 },
   { source: 'vendetta', target: 'sigma', strength: 1 },
   { source: 'vendetta', target: 'winston', strength: 1 },
   { source: 'vendetta', target: 'wrecking_ball', strength: 1 },
   { source: 'vendetta', target: 'zarya', strength: 1 },
   
   // ========== 安燃克制篇 ==========
   { source: 'anran', target: 'dva', strength: 2 },
   { source: 'anran', target: 'doomfist', strength: 2 },
   { source: 'anran', target: 'hazard', strength: 2 },
   { source: 'anran', target: 'junker_queen', strength: 2 },
   { source: 'anran', target: 'mauga', strength: 2 },
   { source: 'anran', target: 'orisa', strength: 2 },
   { source: 'anran', target: 'ramattra', strength: 2 },
   { source: 'anran', target: 'reinhardt', strength: 2 },
   { source: 'anran', target: 'roadhog', strength: 2 },
   { source: 'anran', target: 'sigma', strength: 2 },
   { source: 'anran', target: 'winston', strength: 2 },
   { source: 'anran', target: 'wrecking_ball', strength: 2 },
   { source: 'anran', target: 'zarya', strength: 2 },
   { source: 'anran', target: 'ashe', strength: 2 },
   { source: 'anran', target: 'bastion', strength: 2 },
   { source: 'anran', target: 'cassidy', strength: 2 },
   { source: 'anran', target: 'echo', strength: 2 },
   { source: 'anran', target: 'freja', strength: 2 },
   { source: 'anran', target: 'genji', strength: 3 },
   { source: 'anran', target: 'hanzo', strength: 2 },
   { source: 'anran', target: 'junkrat', strength: 2 },
   { source: 'anran', target: 'mei', strength: 2 },
   { source: 'anran', target: 'pharah', strength: 2 },
   { source: 'anran', target: 'reaper', strength: 2 },
   { source: 'anran', target: 'sojourn', strength: 2 },
   { source: 'anran', target: 'soldier76', strength: 2 },
   { source: 'anran', target: 'sombra', strength: 2 },
   { source: 'anran', target: 'symmetra', strength: 2 },
   { source: 'anran', target: 'torbjorn', strength: 2 },
   { source: 'anran', target: 'tracer', strength: 3 },
   { source: 'anran', target: 'venture', strength: 2 },
   { source: 'anran', target: 'widowmaker', strength: 2 },
   { source: 'anran', target: 'vendetta', strength: 2 },
   { source: 'anran', target: 'ana', strength: 2 },
   { source: 'anran', target: 'baptiste', strength: 2 },
    { source: 'anran', target: 'brigitte', strength: 2 },
    { source: 'anran', target: 'illari', strength: 2 },
    { source: 'anran', target: 'juno', strength: 2 },
    { source: 'anran', target: 'kiriko', strength: 2 },
    { source: 'anran', target: 'lifeweaver', strength: 2 },
    { source: 'anran', target: 'lucio', strength: 2 },
    { source: 'anran', target: 'mercy', strength: 2 },
    { source: 'anran', target: 'moira', strength: 3 },
    { source: 'anran', target: 'zenyatta', strength: 2 },
    
    // ========== 被安燃克制篇 ==========
    { source: 'brigitte', target: 'anran', strength: 3 },
    { source: 'ana', target: 'anran', strength: 3 },
    { source: 'baptiste', target: 'anran', strength: 3 },
    { source: 'dva', target: 'anran', strength: 2 },
    { source: 'winston', target: 'anran', strength: 2 },
    { source: 'doomfist', target: 'anran', strength: 2 },
    { source: 'widowmaker', target: 'anran', strength: 1 },
    { source: 'bastion', target: 'anran', strength: 2 },
    { source: 'cassidy', target: 'anran', strength: 2 },
    { source: 'soldier76', target: 'anran', strength: 2 },
    { source: 'symmetra', target: 'anran', strength: 2 },
     { source: 'torbjorn', target: 'anran', strength: 2 },
  
  // ========== 新英雄克制关系 ==========
  // 一、金驭（Jinyu）被克制
  { source: 'winston', target: 'jinyu', strength: 3 },
  { source: 'dva', target: 'jinyu', strength: 3 },
  { source: 'wrecking_ball', target: 'jinyu', strength: 3 },
  { source: 'ramattra', target: 'jinyu', strength: 3 },
  { source: 'reinhardt', target: 'jinyu', strength: 3 },
  { source: 'reaper', target: 'jinyu', strength: 3 },
  { source: 'tracer', target: 'jinyu', strength: 3 },
  { source: 'genji', target: 'jinyu', strength: 3 },
  { source: 'widowmaker', target: 'jinyu', strength: 3 },
  { source: 'hanzo', target: 'jinyu', strength: 3 },
  { source: 'sojourn', target: 'jinyu', strength: 3 },
  { source: 'sombra', target: 'jinyu', strength: 3 },
  { source: 'illari', target: 'jinyu', strength: 3 },
  { source: 'roadhog', target: 'jinyu', strength: 3 },
  { source: 'zarya', target: 'jinyu', strength: 3 },
  { source: 'pharah', target: 'jinyu', strength: 3 },
  
  // 二、埃姆雷（Emrey）被克制
  { source: 'widowmaker', target: 'emrey', strength: 3 },
  { source: 'hanzo', target: 'emrey', strength: 3 },
  { source: 'ashe', target: 'emrey', strength: 3 },
  { source: 'genji', target: 'emrey', strength: 3 },
  { source: 'tracer', target: 'emrey', strength: 3 },
  { source: 'roadhog', target: 'emrey', strength: 3 },
  { source: 'mauga', target: 'emrey', strength: 3 },
  { source: 'orisa', target: 'emrey', strength: 3 },
  { source: 'illari', target: 'emrey', strength: 3 },
  { source: 'ana', target: 'emrey', strength: 3 },
  
  // 三、安燃（Anran）被克制
  { source: 'pharah', target: 'anran', strength: 3 },
  { source: 'echo', target: 'anran', strength: 3 },
  { source: 'widowmaker', target: 'anran', strength: 3 },
  { source: 'cassidy', target: 'anran', strength: 3 },
  { source: 'roadhog', target: 'anran', strength: 3 },
  { source: 'sombra', target: 'anran', strength: 3 },
  { source: 'mei', target: 'anran', strength: 3 },
  { source: 'reinhardt', target: 'anran', strength: 3 },
  { source: 'orisa', target: 'anran', strength: 3 },
  
  // 四、无漾（Wuyang）被克制
  { source: 'sombra', target: 'wuyang', strength: 3 },
  { source: 'widowmaker', target: 'wuyang', strength: 3 },
  { source: 'sojourn', target: 'wuyang', strength: 3 },
  { source: 'winston', target: 'wuyang', strength: 3 },
  { source: 'genji', target: 'wuyang', strength: 3 },
  { source: 'wrecking_ball', target: 'wuyang', strength: 3 },
  { source: 'moira', target: 'wuyang', strength: 3 },
  { source: 'sigma', target: 'wuyang', strength: 3 },
  { source: 'ramattra', target: 'wuyang', strength: 3 },
  
  // 五、瑞稀（Ruixi）被克制
  { source: 'widowmaker', target: 'ruixi', strength: 3 },
  { source: 'ashe', target: 'ruixi', strength: 3 },
  { source: 'soldier76', target: 'ruixi', strength: 3 },
  { source: 'genji', target: 'ruixi', strength: 3 },

  { source: 'wrecking_ball', target: 'ruixi', strength: 3 },
  { source: 'winston', target: 'ruixi', strength: 3 },
  { source: 'zarya', target: 'ruixi', strength: 3 },
  { source: 'moira', target: 'ruixi', strength: 3 },
  { source: 'sombra', target: 'ruixi', strength: 3 },
  { source: 'illari', target: 'ruixi', strength: 3 },
  
  // 六、飞天猫（Feitianmao）被克制
  { source: 'widowmaker', target: 'feitianmao', strength: 3 },
  { source: 'cassidy', target: 'feitianmao', strength: 3 },
  { source: 'soldier76', target: 'feitianmao', strength: 3 },
  { source: 'ashe', target: 'feitianmao', strength: 3 },
  { source: 'sombra', target: 'feitianmao', strength: 3 },
  { source: 'dva', target: 'feitianmao', strength: 3 },
  { source: 'zarya', target: 'feitianmao', strength: 3 },
  { source: 'pharah', target: 'feitianmao', strength: 3 },
  { source: 'echo', target: 'feitianmao', strength: 3 },
  
  // 新英雄克制关系 - 补全缺失数据
  // 瑞希 (Ruixi) - 支援英雄，克制突进英雄
  { source: 'ruixi', target: 'genji', strength: 2 },
  { source: 'ruixi', target: 'tracer', strength: 2 },
  { source: 'ruixi', target: 'doomfist', strength: 2 },
  { source: 'ruixi', target: 'winston', strength: 1 },
  { source: 'ruixi', target: 'dva', strength: 1 },
  { source: 'ruixi', target: 'wrecking_ball', strength: 1 },
  
  // 飞天猫 (Feitianmao) - 输出英雄，克制脆皮
  { source: 'feitianmao', target: 'mercy', strength: 3 },
  { source: 'feitianmao', target: 'zenyatta', strength: 2 },
  { source: 'feitianmao', target: 'kiriko', strength: 2 },
  { source: 'feitianmao', target: 'ana', strength: 2 },
  { source: 'feitianmao', target: 'tracer', strength: 2 },
  { source: 'feitianmao', target: 'bastion', strength: 1 },
  
  // 武神 (Wuyang) - 支援英雄，克制敌方输出
  { source: 'wuyang', target: 'widowmaker', strength: 2 },
  { source: 'wuyang', target: 'hanzo', strength: 2 },
  { source: 'wuyang', target: 'ashe', strength: 2 },
  { source: 'wuyang', target: 'cassidy', strength: 1 },
  { source: 'wuyang', target: 'soldier76', strength: 1 },
  
  // 金驭 (Jinyu) - 坦克英雄
  { source: 'jinyu', target: 'reinhardt', strength: 2 },
  { source: 'jinyu', target: 'zarya', strength: 2 },
  { source: 'jinyu', target: 'sigma', strength: 1 },
  { source: 'jinyu', target: 'roadhog', strength: 1 },
  
  // Emrey - 输出英雄
  { source: 'emrey', target: 'mercy', strength: 3 },
  { source: 'emrey', target: 'ana', strength: 2 },
  { source: 'emrey', target: 'kiriko', strength: 2 },
  { source: 'emrey', target: 'zenyatta', strength: 2 },
  { source: 'emrey', target: 'widowmaker', strength: 1 },
  
  // Freja - 输出英雄
  { source: 'freja', target: 'mercy', strength: 3 },
  { source: 'freja', target: 'ana', strength: 2 },
  { source: 'freja', target: 'kiriko', strength: 2 },
  { source: 'freja', target: 'lucio', strength: 2 },
  { source: 'freja', target: 'pharah', strength: 1 },
  ];

// 获取角色颜色
export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'tank': return '#f59e0b';
    case 'damage': return '#ef4444';
    case 'support': return '#22c55e';
    default: return '#6b7280';
  }
};
   
// 获取角色名称
export const getRoleName = (role: string, language: string = 'zh'): string => {
  const roleNames: Record<string, Record<string, string>> = {
    tank: { zh: '坦克', en: 'Tank', ja: 'タンク', ko: '탱크', 'zh-TW': '坦克', es: 'Tanque', fr: 'Tank', de: 'Tank', pt: 'Tanque', ru: 'Танк', it: 'Tank' },
    damage: { zh: '输出', en: 'Damage', ja: 'ダメージ', ko: '딜러', 'zh-TW': '輸出', es: 'Daño', fr: 'Dégâts', de: 'Schaden', pt: 'Dano', ru: 'ДПС', it: 'Danno' },
    support: { zh: '支援', en: 'Support', ja: 'サポート', ko: '서포터', 'zh-TW': '支援', es: 'Apoyo', fr: 'Support', de: 'Support', pt: 'Suporte', ru: 'Поддержка', it: 'Support' },
  };
  return roleNames[role]?.[language] || roleNames[role]?.['en'] || role;
};

// 获取角色英文名称
export const getRoleNameEn = (role: string): string => {
  switch (role) {
    case 'tank': return 'Tank';
    case 'damage': return 'Damage';
    case 'support': return 'Support';
    default: return 'Unknown';
  }
};
