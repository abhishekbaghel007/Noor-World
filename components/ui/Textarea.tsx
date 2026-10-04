import React from 'react'

interface TextareaProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
  className?: string
  maxLength?: number
  rows?: number
}

export function Textarea({ 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  disabled = false, 
  error, 
  className = '',
  maxLength,
  rows = 4
}: TextareaProps) {
  const baseClass = 'w-full rounded-xl border border-line bg-paper text-sm py-2 px-3 focus:border-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-all duration-200'
  const errorClass = error ? 'border-red-500' : 'border-line'
  const disabledClass = disabled ? 'opacity-50' : ''
  const textareaClasses = baseClass + ' ' + errorClass + ' ' + disabledClass + ' ' + className
  
  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-sm font-medium text-muted mb-1'>
          {label}
        </label>
      )}
      <div className='relative'>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={textareaClasses}
        />
        {error && (
          <p className='mt-1 text-xs text-red-500'>
            {error}
          </p>
        )}
        {maxLength && (
          <p className='mt-1 text-xs text-muted text-right'>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
