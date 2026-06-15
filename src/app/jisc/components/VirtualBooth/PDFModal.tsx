'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './VirtualBooth.css'

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
}

export default function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <h3>{title}</h3>
          <button className="pdf-modal-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="pdf-modal-body">
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title={title}
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

