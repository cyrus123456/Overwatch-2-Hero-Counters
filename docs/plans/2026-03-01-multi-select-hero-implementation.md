# 多选英雄共同关系功能实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 支持在网络节点有向图中多选英雄，同时查看他们的共同克制/被克制/最佳拍档关系。

**Architecture:** 
1. 将 `selectedHero: string | null` 改为 `selectedHeroes: string[]` 支持多选
2. 计算"共同关系"逻辑，找出同时克制/被克制/最佳拍档所有选中英雄的英雄
3. 在D3节点图和侧边栏面板中只显示共同关系
4. 英雄节点添加复选框标记选中状态

**Tech Stack:** React, TypeScript, D3.js

---

### Task 1: 修改ForceGraphProps和App传递的props

**Files:**
- Modify: `src/components/ForceGraph.tsx:51-56`
- Modify: `src/App.tsx:513`

**Step 1: 修改ForceGraphProps接口**

```typescript
interface ForceGraphProps {
  selectedRole: string | null;
  selectedHeroes: string[];  // 改为数组
  onHeroSelect: (heroIds: string[]) => void;  // 改为数组参数
  isDrawerOpen?: boolean;
}
```

**Step 2: 修改App.tsx中的调用**

```typescript
// App.tsx 中
const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);

// 传递到ForceGraph
<ForceGraph 
  selectedRole={selectedRole} 
  selectedHeroes={selectedHeroes} 
  onHeroSelect={setSelectedHeroes} 
  isDrawerOpen={isDrawerOpen} 
/>
```

**Step 3: 修改handleHeroClick逻辑**

在ForceGraph中添加:
```typescript
const handleHeroClick = (heroId: string, event: MouseEvent) => {
  if (event.shiftKey || event.ctrlKey || event.metaKey) {
    // 多选模式
    setSelectedHeroes(prev => 
      prev.includes(heroId) 
        ? prev.filter(id => id !== heroId)
        : [...prev, heroId]
    );
  } else {
    // 单选模式
    setSelectedHeroes(prev => 
      prev.length === 1 && prev[0] === heroId ? [] : [heroId]
    );
  }
};
```

---

### Task 2: 添加共同关系计算逻辑

**Files:**
- Modify: `src/components/ForceGraph.tsx`

**Step 1: 添加共同关系计算函数**

```typescript
// 在组件内添加
const getCommonCounters = (heroIds: string[]): string[] => {
  if (heroIds.length === 0) return [];
  if (heroIds.length === 1) {
    // 单选时返回所有克制该英雄的英雄
    return counterRelations
      .filter(r => r.target === heroIds[0])
      .map(r => r.source);
  }
  // 多选时返回同时克制所有选中英雄的英雄
  return heroes
    .filter(counterHero => 
      heroIds.every(selectedHero =>
        counterRelations.some(r => r.source === counterHero.id && r.target === selectedHero)
      )
    )
    .map(h => h.id);
};

const getCommonCounted = (heroIds: string[]): string[] => {
  if (heroIds.length === 0) return [];
  if (heroIds.length === 1) {
    return counterRelations
      .filter(r => r.source === heroIds[0])
      .map(r => r.target);
  }
  return heroes
    .filter(countedHero =>
      heroIds.every(selectedHero =>
        counterRelations.some(r => r.source === selectedHero.id && r.target === countedHero.id)
      )
    )
    .map(h => h.id);
};

const getCommonSynergies = (heroIds: string[]): string[] => {
  if (heroIds.length === 0) return [];
  if (heroIds.length === 1) {
    return synergyRelations
      .filter(r => r.target === heroIds[0])
      .map(r => r.source);
  }
  return heroes
    .filter(synergyHero =>
      heroIds.every(selectedHero =>
        synergyRelations.some(r => r.source === selectedHero.id && r.target === synergyHero.id)
      )
    )
    .map(h => h.id);
};
```

---

### Task 3: 修改D3节点图高亮逻辑

**Files:**
- Modify: `src/components/ForceGraph.tsx` - link.attr相关代码

**Step 1: 修改选中判断逻辑**

将所有 `selectedHero` 引用改为 `selectedHeroes`：

```typescript
// 判断节点是否相关
const isRelevant = activeCounterTab === 'synergy' 
  ? (targetId === selectedHero || sourceId === selectedHero)
  : activeCounterTab === 'counteredBy' 
    ? targetId === selectedHero 
    : sourceId === selectedHero;

// 改为多选版本：
const isRelevant = activeCounterTab === 'synergy'
  ? (selectedHeroes.includes(targetId) || selectedHeroes.includes(sourceId))
  : activeCounterTab === 'counteredBy'
    ? selectedHeroes.includes(targetId)
    : selectedHeroes.includes(sourceId);
```

**Step 2: 修改高亮逻辑**

对于多选，需要根据共同关系来判断：

```typescript
// 多选时只显示共同关系
const commonRelated = activeCounterTab === 'synergy'
  ? getCommonSynergies(selectedHeroes)
  : activeCounterTab === 'counteredBy'
    ? getCommonCounters(selectedHeroes)
    : getCommonCounted(selectedHeroes);

const isCommonRelated = (heroId: string) => 
  selectedHeroes.length > 1 && commonRelated.includes(heroId);
```

---

### Task 4: 添加英雄节点复选框标记

**Files:**
- Modify: `src/components/ForceGraph.tsx` - 节点渲染部分

**Step 1: 在节点group中添加复选框**

在节点渲染代码中添加（节点图片旁边）:

```typescript
// 在节点group内添加
if (selectedHeroes.includes(d.id)) {
  group.append('rect')
    .attr('class', 'selected-check')
    .attr('x', d.radius - 6)
    .attr('y', d.radius - 6)
    .attr('width', 12)
    .attr('height', 12)
    .attr('rx', 2)
    .attr('fill', '#22d3ee')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);
}
```

---

### Task 5: 修改侧边栏Tab标题和内容

**Files:**
- Modify: `src/components/ForceGraph.tsx` - Tab和列表渲染部分

**Step 1: 修改Tab标题**

```typescript
// 在TabTrigger中添加条件渲染
<TabsTrigger value="counteredBy" className="text-xs">
  {selectedHeroes.length > 1 ? '共同' : ''}被克制
</TabsTrigger>
<TabsTrigger value="counters" className="text-xs">
  {selectedHeroes.length > 1 ? '共同' : ''}克制
</TabsTrigger>
<TabsTrigger value="synergy" className="text-xs">
  {selectedHeroes.length > 1 ? '共同' : ''}最佳拍档
</TabsTrigger>
```

**Step 2: 修改列表渲染逻辑**

将 `counteredBy` 和 `counters` 改为使用共同关系计算：

```typescript
// 替换现有列表渲染
const displayHeroes = activeCounterTab === 'synergy' 
  ? getCommonSynergies(selectedHeroes).map(id => heroes.find(h => h.id === id))
  : activeCounterTab === 'counteredBy'
    ? getCommonCounters(selectedHeroes).map(id => heroes.find(h => h.id === id))
    : getCommonCounted(selectedHeroes).map(id => heroes.find(h => h.id === id));
```

---

### Task 6: 修改复制功能

**Files:**
- Modify: `src/components/ForceGraph.tsx` - copy相关函数

**Step 1: 修改复制文本生成逻辑**

```typescript
// 在复制按钮的onClick中
const copyText = () => {
  const commonHeroes = displayHeroes
    .filter(h => h)
    .map(h => language === 'zh' ? h.name : h.nameEn)
    .join(', ');
    
  const prefix = activeCounterTab === 'counteredBy' 
    ? '共同被克制' 
    : activeCounterTab === 'counters' 
      ? '共同克制' 
      : '共同最佳拍档';
      
  const text = `${prefix}: ${commonHeroes}`;
  handleCopyToClipboard(text);
};
```

---

### Task 7: 验证构建

**Step 1: 运行构建**

```bash
npm run build
```

预期：Build successful，无TypeScript错误

---

**Plan complete and saved to `docs/plans/2026-03-01-multi-select-hero-design.md`. Two execution options:**

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

2. **Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
