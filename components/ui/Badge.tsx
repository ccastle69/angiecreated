interface BadgeProps {
  children: React.ReactNode
  variant?: 'terracotta' | 'sage' | 'sand'
  className?: string
}

export function Badge({ children, variant = 'terracotta', className = '' }: BadgeProps) {
  const variants = {
    terracotta: 'bg-terracotta text-white',
    sage: 'bg-sage text-white',
    sand: 'bg-sand text-bark',
  }
  return (
    <span
      className={`inline-block text-xs font-body font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-display text-3xl md:text-4xl text-bark mb-3">{title}</h2>
      {subtitle && (
        <p className="font-body text-bark/70 text-lg max-w-xl mx-auto">{subtitle}</p>
      )}
      <div className={`mt-4 h-px bg-sand w-16 ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
