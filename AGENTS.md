# AGENTS.md - Developer Guide for Overwatch-2-Hero-Counters

This file provides guidance for AI agents working in this repository.

## Project Overview

- **Type**: React 19 + TypeScript web application
- **Build Tool**: Vite 7
- **UI Framework**: Radix UI + TailwindCSS
- **Data Visualization**: D3.js 7
- **Deployment**: GitHub Pages

## Available Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173 (with --host for mobile access)
npm run build            # Production build (TypeScript + Vite)
npm run preview          # Preview production build
npm run lint             # Run ESLint on all files

# Deployment
npm run build            # Build the project
npm run deploy           # Deploy dist/ to GitHub Pages
npm run build:deploy     # Build and deploy in one command
```

**Note**: This project does not include a test framework.

## TypeScript Configuration

The project uses strict TypeScript settings. Key options in `tsconfig.app.json`:

- `strict: true` - Full type checking enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused function parameters
- `verbatimModuleSyntax: true` - Requires explicit type imports
- `noEmit: true` - TypeScript only checks, does not emit files

**IMPORTANT**: Never suppress type errors with `as any`, `@ts-ignore`, or `@ts-expect-error`.

## Import Guidelines

### Path Aliases
Use `@/` for imports from the `src/` directory:

```typescript
// Correct
import { Button } from '@/components/ui/button';
import { heroes } from '@/data/heroData';
import { cn } from '@/lib/utils';

// Avoid
import { Button } from '../components/ui/button';
```

### Import Order
Organize imports in groups (separate with blank lines):

1. External libraries (React, D3, Radix UI)
2. Internal components (@/components/...)
3. Data imports (@/data/...)
4. Utilities (@/lib/, @/hooks/, @/i18n/)
5. Type imports (use `type` keyword)

```typescript
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { heroes } from '@/data/heroData';
import { useI18n } from '@/i18n';
import type { Language } from '@/i18n';
```

## Type Annotations

Always use explicit type annotations. With `verbatimModuleSyntax`, use separate type imports:

```typescript
import { useState } from 'react';
import type { Language } from '@/i18n';

const [language, setLanguage] = useState<Language>('en');

interface ForceGraphProps {
  selectedRole: string | null;
  selectedHero: string | null;
  onHeroSelect: (heroId: string | null) => void;
}
```

## Naming Conventions

- **Components**: PascalCase (e.g., `ForceGraph.tsx`, `Button.tsx`)
- **Functions/variables**: camelCase (e.g., `handleCopyToClipboard`, `filteredMaps`)
- **Interfaces**: PascalCase with descriptive names (e.g., `NodeDatum`, `LinkDatum`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for configuration objects

## Component Patterns

### UI Components (Radix + cva)

```typescript
export { Button, buttonVariants };

const buttonVariants = cva("...", {
  variants: {
    variant: { default: "...", destructive: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### D3.js Force Graphs

```typescript
const simulationRef = useRef<d3.Simulation<NodeDatum, LinkDatum> | null>(null);

useEffect(() => {
  // Cleanup is mandatory
  return () => { simulation?.stop(); };
}, []);
```

## TailwindCSS & Styling Guidelines

### Unit Conventions
- **CSS files**: Prioritize `rem` units over `px`
- **TailwindCSS classes**: Never use arbitrary value syntax with `px` units, e.g., `[22.5rem]`, `[2.375rem]`
  - Instead, use Tailwind's built-in spacing scale: divide the pixel value by 4 and use `left-{value}/4`, `w-{value}/4`, etc.
  - Example: `22.5rem` → calculate rem equivalent or use `translate-x-[22rem]`; for pixel values like `38px` → `w-[9.5rem]` or find closest Tailwind class
  - For common sizes, prefer standard Tailwind classes: `w-7` (1.75rem/28px), `h-14` (3.5rem/56px), etc.

### TailwindCSS
- Use `cn()` from `@/lib/utils` for conditional classes
- Follow custom colors in `tailwind.config.js`

```typescript
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

## Error Handling

- Handle async operations with proper error states
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Provide fallback values for undefined data

```typescript
const hero = heroes.find(h => h.id === heroId);
const heroName = hero ? (language === 'zh' ? hero.name : hero.nameEn) : 'Unknown';

.filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
```

## Hard Blocks

- **NEVER** use `as any`, `@ts-ignore`, `@ts-expect-error` to suppress errors
- **NEVER** leave empty catch blocks `catch(e) {}`
- **NEVER** delete failing tests to "pass" (no test framework exists)
- **NEVER** commit unless explicitly requested

## Project Structure

```
src/
├── components/
│   ├── ForceGraph.tsx      # Main D3 visualization
│   └── ui/                 # Radix UI components
├── data/
│   ├── heroData.ts         # Hero definitions, counter/synergy relations
│   ├── counterReasons.ts   # Counter explanation text
│   ├── synergyRelations.ts # Synergy partner data
│   ├── synergyReasons.ts   # Synergy explanation text
│   └── mapData.ts          # Map information
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization (zh/en)
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
├── App.tsx                # Main application
└── main.tsx               # Entry point
```

## Key Libraries

- **React 19**: UI framework
- **Vite 7**: Build tool
- **Radix UI**: Accessible component primitives
- **TailwindCSS**: Styling
- **D3.js 7**: Force-directed graph visualization
- **Lucide React**: Icons
- **class-variance-authority**: Component variants
- **next-themes**: Theme switching

## Build Verification

After any changes, always run:
```bash
npm run build
```

Ensure the build passes (exit code 0) before considering work complete.
