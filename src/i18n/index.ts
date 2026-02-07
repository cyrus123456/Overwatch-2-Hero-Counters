import type { ReactNode } from 'react';
import React, { createContext, useCallback, useContext, useState } from 'react';

export type Language = 'zh' | 'en';

const translations: Record<Language, Record<string, string>> = {
  zh: {
    title: '守望先锋英雄被克制关系图',
    subtitle: 'Overwatch 2 Hero Counters - 谁克制我',
    allHeroes: '全部英雄',
    tank: '坦克',
    damage: '输出',
    support: '支援',
    roleFilter: '角色筛选',
    instructions: '使用说明',
    stats: '数据统计',
    totalHeroes: '英雄总数',
    counterRelations: '被克制关系',
    counteredBy: '被克制（怕这些）',
    counters: '克制（打这些）',
    deselect: '取消选择',
    grayArrow: '亮灰色箭头',
    arrowDirection: '箭头方向',

    dragNodes: '拖拽节点可调整位置',
    scrollZoom: '滚轮缩放画布',
    hoverView: '悬停查看克制/被克制关系',
    clickHighlight: '点击高亮相关连线',
    counterRelation: '被克制关系',
    whoCountersWho: 'A → B 表示 A 克制 B',
    language: '语言',
    github: 'GitHub',
    interactiveViz: '被克制关系可视化',
    loading: '加载中...',
    selectHeroPrompt: '请选择一位英雄展示克制关系',
    mapRecommendations: '地图强势英雄首发推荐',
    heroCounterPanel: '英雄克制关系',
    networkNodeIntro: '网络节点介绍',
    mapType: '地图类型',
    recommendedHeroes: '推荐英雄',
    control: '占领要点',
    hybrid: '混合模式',
    escort: '运载目标',
    push: '推进模式',
    flashpoint: '闪点模式',
    lv3Desc: '绝对克制 (职业天敌)',
    lv2Desc: '明显克制 (强势压制)',
    lv1Desc: '轻微克制 (博弈优势)',
    tankBrief: '高血量、防御核心',
    damageBrief: '高伤害、击杀核心',
    supportBrief: '治疗、战术增益',
    clickDesc: '点击英雄：展示其专属克制网并放大图标',
    dragDesc: '拖拽图标：长按并移动英雄可手动调整位置',
    zoomDesc: '滚轮缩放：在画布滚动鼠标中键可放大缩小',
    hoverDesc: '悬停预览：移动鼠标到头像上可查看高亮并微缩无关项',
    panDesc: '移动画板：按住并拖拽空白处可平移整个关系图',
    hardCounter: '硬克制',
    strongCounter: '强力',
    softCounter: '轻微',
    notCounteredByAny: '暂未被任何英雄克制',
    noCounters: '暂无克制的英雄',
    counteredByTemplate: '被克制文本模板',
    countersTemplate: '克制文本模板',
    copied: '已复制',
    copy: '复制',
    copyTip: '双击文本或点击按钮复制，发送攻略到队友聊天窗口帮助队友选择英雄',
    counter: '克制',
    doubleClickToCopy: '双击复制',
    strength3: '★★★强',
    strength2: '★★中',
    strength1: '★弱',
    noCounterData: '暂无足够的克制数据生成模板',
    all: '全部',
    searchMapsPlaceholder: '快速查找地图...',
    startingLineup: '首发阵容',
    copyLineupTip: '复制阵容发送到聊天框帮助队友选择英雄',
    previewContent: '预览完整复制内容',
    recommendedLineup: '推荐首发阵容',
  },
  en: {
    title: 'Overwatch 2 Hero Counter Relationships',
    subtitle: 'Who Counters Who - Counter Graph',
    allHeroes: 'All Heroes',
    tank: 'Tank',
    damage: 'Damage',
    support: 'Support',
    roleFilter: 'Role Filter',
    instructions: 'Instructions',
    stats: 'Statistics',
    totalHeroes: 'Total Heroes',
    counterRelations: 'Counter Relations',
    counteredBy: 'Countered By (Weak Against)',
    counters: 'Counters (Strong Against)',
    deselect: 'Deselect',
    grayArrow: 'Light Gray Arrow',
    arrowDirection: 'Arrow Direction',

    dragNodes: 'Drag nodes to reposition',
    scrollZoom: 'Scroll to zoom',
    hoverView: 'Hover to view counter relationships',
    clickHighlight: 'Click to highlight connections',
    counterRelation: 'Counter Relationship',
    whoCountersWho: 'A → B means A counters B',
    language: 'Language',
    github: 'GitHub',
    interactiveViz: 'Interactive Visualization',
    loading: 'Loading...',
    selectHeroPrompt: 'Please select a hero to view counter relationships',
    mapRecommendations: 'Map First Pick Recommendations',
    heroCounterPanel: 'Hero Counter Relations',
    networkNodeIntro: 'Network Node Introduction',
    mapType: 'Map Type',
    recommendedHeroes: 'Recommended Heroes',
    control: 'Control',
    hybrid: 'Hybrid',
    escort: 'Escort',
    push: 'Push',
    flashpoint: 'Flashpoint',
    lv3Desc: 'Hard Counter (Direct Nemesis)',
    lv2Desc: 'Strong Counter (Solid Advantage)',
    lv1Desc: 'Soft Counter (Skill Matchup)',
    tankBrief: 'High Health, Frontline Tank',
    damageBrief: 'High DPS, Damage Dealer',
    supportBrief: 'Healer, Utility Support',
    clickDesc: 'Click Hero: Focus on their relations & scale icon',
    dragDesc: 'Drag Icon: Hold and move to reposition manually',
    zoomDesc: 'Scroll Zoom: Use mouse wheel to zoom in/out',
    hoverDesc: 'Hover Focus: Mouse over icon to highlight and focus',
    panDesc: 'Pan Board: Click and drag empty space to move the graph',
    hardCounter: 'Hard',
    strongCounter: 'Strong',
    softCounter: 'Soft',
    notCounteredByAny: 'Not currently countered by any hero',
    noCounters: 'No heroes countered yet',
    counteredByTemplate: 'Weak Against Template',
    countersTemplate: 'Strong Against Template',
    copied: 'Copied',
    copy: 'Copy',
    copyTip: 'Double-click or click button to copy, send to teammates to help pick heroes',
    counter: 'Counter',
    doubleClickToCopy: 'Double-click to copy',
    strength3: '★★★Hard',
    strength2: '★★Medium',
    strength1: '★Soft',
    noCounterData: 'Not enough counter data to generate template',
    all: 'All',
    searchMapsPlaceholder: 'Search maps...',
    startingLineup: 'Starting Lineup',
    copyLineupTip: 'Copy lineup to chat to help teammates',
    previewContent: 'Preview Full Content',
    recommendedLineup: 'Recommended Lineup',
  },
};


interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
