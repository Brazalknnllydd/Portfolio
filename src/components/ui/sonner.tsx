import { Toaster as Sonner, type ToasterProps } from 'sonner'

type AppToasterProps = ToasterProps & {
  theme?: 'light' | 'dark' | 'system'
}

export function Toaster({ theme = 'dark', ...props }: AppToasterProps) {
  return (
    <Sonner
      theme={theme}
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        style: {
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-strong)',
          color: 'var(--color-text-strong)',
        },
      }}
      {...props}
    />
  )
}
