import { cn } from '../../lib/utils'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'

export type Theme = 'dark' | 'light'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ onToggle, theme }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'border border-[var(--color-border)] bg-[var(--color-soft-fill)] shadow-[0_8px_20px_color-mix(in_srgb,var(--color-panel-shadow)_55%,transparent)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-soft-fill-strong)]',
      )}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to night mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to night mode'}
    >
      <span className="inline-flex items-center justify-center">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </Button>
  )
}
