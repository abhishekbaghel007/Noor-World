import React from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  disabled?: boolean
  error?: string
  className?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
}

export function Input({ 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  type = 'text', 
  disabled = false, 
  error, 
  className = '',
  inputMode
}: InputProps) {
  const baseClass = 'w-full rounded-xl border border-line bg-paper text-sm py-2 px-3 focus:border-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-all duration-200'
  const errorClass = error ? 'border-red-500' : 'border-line'
  const disabledClass = disabled ? 'opacity-50' : ''
  const inputClasses = baseClass + ' ' + errorClass + ' ' + disabledClass + ' ' + className
  
  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-sm font-medium text-muted mb-1'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          inputMode={inputMode}
          className={inputClasses}
        />
        {error && (
          <p className='mt-1 text-xs text-red-500'>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
