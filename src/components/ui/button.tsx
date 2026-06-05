import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[background,color,border-color,box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-[var(--color-button-bg)] text-[var(--color-button-text)] shadow-[0_12px_26px_color-mix(in_srgb,var(--color-panel-shadow)_70%,transparent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-button-bg)_88%,white)]',
        ghost:
          'border border-transparent bg-transparent text-[var(--color-text-strong)] hover:-translate-y-px hover:bg-[var(--color-soft-fill)]',
        outline:
          'border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-strong)] hover:-translate-y-px hover:bg-[var(--color-soft-fill)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    className,
    size,
    type = 'button',
    variant,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      type={asChild ? undefined : type}
      {...props}
    />
  )
})

export { Button, buttonVariants }
