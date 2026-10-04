import React from 'react'

interface SelectProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
  className?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  disabled = false, 
  error, 
  className = '',
  options
}: SelectProps) {
  const baseClass = 'w-full rounded-xl border border-line bg-paper text-sm py-2 px-3 focus:border-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-all duration-200'
  const errorClass = error ? 'border-red-500' : 'border-line'
  const disabledClass = disabled ? 'opacity-50' : ''
  const selectClasses = baseClass + ' ' + errorClass + ' ' + disabledClass + ' ' + className
  
  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-sm font-medium text-muted mb-1'>
          {label}
        </label>
      )}
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={selectClasses}
        >
          {placeholder && (
            <option value='' disabled>{placeholder}</option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className='mt-1 text-xs text-red-500'>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
