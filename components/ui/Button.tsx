'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  as: Component = 'button',
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-body font-semibold tracking-wide transition-all duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-terracotta text-white hover:bg-terracotta-dark active:scale-95 shadow-sm',
    secondary:
      'border-2 border-sage text-sage hover:bg-sage hover:text-white active:scale-95',
    ghost:
      'text-terracotta hover:text-terracotta-dark underline-offset-2 hover:underline',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (Component === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {loading ? <Spinner /> : children}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <Spinner /> : children}
    </button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
