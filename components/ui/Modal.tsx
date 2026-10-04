import React, { useEffect, useRef } from 'react'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  variant?: 'sheet' | 'dialog'
  className?: string
}

export function Modal({ children, open, onClose, variant = 'sheet', className = '' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    const handleClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    if (modalRef.current) {
      modalRef.current.addEventListener('click', handleClick)
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (modalRef.current) {
        modalRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [open, onClose])

  if (!open) return null

  const backdropClass = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'
  const sheetClass = 'fixed left-0 right-0 bottom-0 z-50 max-h-[85vh] bg-paper rounded-t-3xl border-t border-line shadow-lg transform transition-transform duration-300 translate-y-full'
  const dialogClass = 'fixed inset-0 z-50 flex items-center justify-center p-4'
  const dialogContentClass = 'bg-paper rounded-3xl border border-line shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
  
  const modalClass = variant === 'sheet' 
    ? sheetClass + ' ' + className
    : dialogClass + ' ' + dialogContentClass + ' ' + className

  return (
    <div className={backdropClass} onClick={onClose}>
      <div 
        ref={modalRef}
        className={modalClass}
        onClick={e => e.stopPropagation()}
      >
        {variant === 'sheet' && (
          <>
            <div className='flex items-center justify-between p-4 border-b border-line'>
              <h2 className='text-lg font-semibold'>{(children as any).props?.title}</h2>
              <button 
                className='text-muted hover:text-ink'
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <div className='p-6'>
              {(children as any).props?.children}
            </div>
          </>
        )}
        {variant === 'dialog' && (
          <div className='p-6'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
