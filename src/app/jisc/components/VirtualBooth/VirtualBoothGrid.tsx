'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { BoothData } from './boothData'
import { useLanguage } from '@/lib/LanguageContext'

// Dynamically import the VirtualBooth component to code-split and lazy-load its video assets
const VirtualBooth = dynamic(() => import('./VirtualBooth'), {
  ssr: false,
  loading: () => (
    <div className="virtual-booth-loading-placeholder">
      <div className="placeholder-spinner" />
      <span>Loading Booth...</span>
    </div>
  )
})

interface VirtualBoothGridProps {
  companies: BoothData[]
}

export default function VirtualBoothGrid({ companies }: VirtualBoothGridProps) {
  const { locale } = useLanguage()
  const [visibleCount, setVisibleCount] = useState(2)

  // Reset visibleCount back to 2 whenever the companies array changes (e.g. when filters are applied)
  useEffect(() => {
    setVisibleCount(2)
  }, [companies])

  if (!companies || companies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
        <p>{locale === 'ja' ? '該当する企業が見つかりませんでした。' : 'No companies found matching the selected criteria.'}</p>
      </div>
    )
  }

  const visibleCompanies = companies.slice(0, visibleCount)

  return (
    <div className="virtual-booth-grid-wrapper">
      <div className="virtual-booth-grid">
        {visibleCompanies.map((company) => (
          <VirtualBooth key={company.id} data={company} />
        ))}
      </div>

      {visibleCount < companies.length && (
        <div className="virtual-booth-grid-more-container">
          <button
            className="virtual-booth-grid-more-btn"
            onClick={() => setVisibleCount(companies.length)}
          >
            <span>{locale === 'ja' ? 'もっと見る...' : 'Show more...'}</span>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      )}
    </div>
  )
}
