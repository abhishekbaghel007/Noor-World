import React from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
}

export function Section({ title, subtitle, eyebrow, className = '' }: SectionProps) {
  return (
    <div className={'mb-8' + className}>
      {eyebrow && (
        <p className='text-xs font-semibold text-uppercase letter-spacing-wider text-yellow-500 mb-1'>
          {eyebrow}
        </p>
      )}
      <h2 className='text-3xl font-bold text-ink mb-2'>
        {title}
      </h2>
      {subtitle && (
        <p className='text-xl text-muted mb-6'>
          {subtitle}
        </p>
      )}
    </div>
  )
}
