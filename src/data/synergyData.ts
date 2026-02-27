export interface SynergyHero {
  id: string;
  reasonZh: string;
  reasonEn: string;
  role: 'tank' | 'damage' | 'support';
}

export interface HeroSynergies {
  [heroId: string]: SynergyHero[];
}

export const heroSynergies: HeroSynergies = {
  // Tank heroes
  dva: [
    { id: 'kiriko', reasonZh: '群体治疗与保命技能', reasonEn: 'Group healing and survival skills', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and consistent healing', role: 'support' },
    { id: 'sojourn', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst damage', role: 'damage' },
  ],
  doomfist: [
    { id: 'kiriko', reasonZh: '治疗与免死技能', reasonEn: 'Healing and survivability', role: 'support' },
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'reaper', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  hazard: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
    { id: 'ashe', reasonZh: '远程输出与视野', reasonEn: 'Ranged damage and vision', role: 'damage' },
  ],
  junker_queen: [
    { id: 'kiriko', reasonZh: '治疗与免死技能', reasonEn: 'Healing and survivability', role: 'support' },
    { id: 'ashe', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and crowd control', role: 'damage' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  mauga: [
    { id: 'kiriko', reasonZh: '持续治疗与增伤', reasonEn: 'Sustained healing and damage boost', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  orisa: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'junkrat', reasonZh: '范围伤害与控制', reasonEn: 'AOE damage and control', role: 'damage' },
  ],
  ramattra: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'hanzo', reasonZh: '高爆发与视野', reasonEn: 'Burst damage and vision', role: 'damage' },
  ],
  reinhardt: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与免死技能', reasonEn: 'Healing and survivability', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
  ],
  roadhog: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'junkrat', reasonZh: '范围伤害与控制', reasonEn: 'AOE damage and control', role: 'damage' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  sigma: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  winston: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'tracer', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  wrecking_ball: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  zarya: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'reaper', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],

  // Damage heroes
  ashe: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  bastion: [
    { id: 'sigma', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'orisa', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
  ],
  cassidy: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
  ],
  echo: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  genji: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
  ],
  hanzo: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
  ],
  junkrat: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
  ],
  pharah: [
    { id: 'mercy', reasonZh: '持续治疗与增伤', reasonEn: 'Sustained healing and damage boost', role: 'support' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  reaper: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  soldier76: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  sojourn: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  symmetra: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],
  torbjorn: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'baptiste', reasonZh: '群体治疗与免死', reasonEn: 'Group healing and immortality', role: 'support' },
  ],
  tracer: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
  ],
  venture: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  widowmaker: [
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
  ],

  // Support heroes
  ana: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'reinhardt', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  baptiste: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'reinhardt', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  brigitta: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'reinhardt', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  kiriko: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'tracer', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  lifeweaver: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  lucio: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'tracer', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  mercy: [
    { id: 'pharah', reasonZh: '持续治疗与增伤', reasonEn: 'Sustained healing and damage boost', role: 'damage' },
    { id: 'echo', reasonZh: '持续治疗与增伤', reasonEn: 'Sustained healing and damage boost', role: 'damage' },
    { id: 'widowmaker', reasonZh: '远程输出与视野', reasonEn: 'Ranged damage and vision', role: 'damage' },
  ],
  moira: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'reinhardt', reasonZh: '护盾与控制', reasonEn: 'Shield and crowd control', role: 'tank' },
    { id: 'zarya', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  zenyatta: [
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'tracer', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
  ],
  // New heroes
  feitianmao: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  emrey: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  ruixi: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'tracer', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
  jinyu: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
    { id: 'cassidy', reasonZh: '远程输出与控制', reasonEn: 'Ranged damage and control', role: 'damage' },
  ],
  wuyang: [
    { id: 'dva', reasonZh: '高机动性与保护', reasonEn: 'High mobility and protection', role: 'tank' },
    { id: 'widowmaker', reasonZh: '远程输出与视野', reasonEn: 'Ranged damage and vision', role: 'damage' },
    { id: 'hanzo', reasonZh: '高爆发与视野', reasonEn: 'Burst damage and vision', role: 'damage' },
  ],
  freja: [
    { id: 'kiriko', reasonZh: '治疗与位移技能', reasonEn: 'Healing and mobility', role: 'support' },
    { id: 'zenyatta', reasonZh: '增伤与持续治疗', reasonEn: 'Damage boost and healing', role: 'support' },
    { id: 'genji', reasonZh: '高机动性与高爆发', reasonEn: 'High mobility and burst', role: 'damage' },
  ],
};
