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
npm run dev              # Start dev server at http://localhost:5173
npm run build            # Production build (TypeScript + Vite)
npm run preview          # Preview production build
npm run lint             # Run ESLint on all files

# Deployment
npm run deploy           # Deploy dist/ to GitHub Pages
npm run build            # Build and deploy
```

**Note**: This project does not include a test framework. There are no test commands available.

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript settings. Key options in `tsconfig.app.json`:

- `strict: true` - Full type checking enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused function parameters
- `verbatimModuleSyntax: true` - Requires explicit type imports
- `noEmit: true` - TypeScript only checks, does not emit files

### Path Aliases

Use `@/` for imports from the `src/` directory:

```typescript
// Correct
import { Button } from '@/components/ui/button';
import { heroes } from '@/data/heroData';
import { cn } from '@/lib/utils';

// Avoid
import { Button } from '../components/ui/button';
import { heroes } from '../../data/heroData';
```

### Import Order

Organize imports in the following groups (separate with blank lines):

1. External library imports (React, D3, Radix UI)
2. Internal component imports (@/components/...)
3. Data imports (@/data/...)
4. Utility imports (@/lib/, @/hooks/, @/i18n/)
5. Type imports (use `type` keyword)

```typescript
// Example import order
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { heroes } from '@/data/heroData';
import { useI18n } from '@/i18n';
import type { Language } from '@/i18n';
```

### Type Annotations

Always use explicit type annotations. With `verbatimModuleSyntax: true`, use separate type imports:

```typescript
// Correct - separate type imports
import { useState } from 'react';
import type { Language } from '@/i18n';

const [language, setLanguage] = useState<Language>('en');

// Interface for props
interface ForceGraphProps {
  selectedRole: string | null;
  selectedHero: string | null;
  onHeroSelect: (heroId: string | null) => void;
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ForceGraph.tsx`, `Button.tsx`)
- **Functions/variables**: camelCase (e.g., `handleCopyToClipboard`, `filteredMaps`)
- **Interfaces**: PascalCase with descriptive names (e.g., `NodeDatum`, `LinkDatum`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for configuration objects

### Component Patterns

Follow the existing patterns for UI components:

```typescript
// Export both component and utility functions
export { Button, buttonVariants };

// Use cva for variant props
const buttonVariants = cva("...", {
  variants: {
    variant: { default: "...", destructive: "...", ... },
    size: { default: "...", sm: "...", ... },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### TailwindCSS Usage

- Use Tailwind utility classes extensively
- Use `cn()` from `@/lib/utils` for conditional classes
- Follow the custom color scheme defined in `tailwind.config.js`

```typescript
// Correct - use cn() for class merging
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

### Error Handling

- Always handle async operations with proper error states
- Use optional chaining and nullish coalescing for safe property access
- Provide fallback values for potentially undefined data

```typescript
// Safe data access
const hero = heroes.find(h => h.id === heroId);
const heroName = hero ? (language === 'zh' ? hero.name : hero.nameEn) : 'Unknown';

// Filter and type guard
.filter((item): item is { hero: Hero; strength: number } => item.hero !== undefined)
```

### D3.js Patterns

When working with D3 force-directed graphs:

```typescript
// Use refs for D3 instances
const simulationRef = useRef<d3.Simulation<NodeDatum, LinkDatum> | null>(null);

// Cleanup in useEffect return
return () => { simulation.stop(); };
```

## Project Structure

```
src/
├── components/
│   ├── ForceGraph.tsx      # Main D3 visualization component
│   └── ui/                 # Radix UI-based components
├── data/
│   ├── heroData.ts         # Hero definitions and counter relations
│   ├── counterReasons.ts   # Counter explanation text
│   └── mapData.ts          # Map information
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
├── App.tsx                # Main application component
└── main.tsx               # Entry point
```

## Key Libraries

- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management
- **Tailwind Merge**: Class name merging utility
- **next-themes**: Theme switching support
