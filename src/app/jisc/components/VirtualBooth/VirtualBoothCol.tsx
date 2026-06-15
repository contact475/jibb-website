'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { BoothData, BoothDocument } from './boothData'
import VirtualBooth from './VirtualBooth'
import { useLanguage } from '@/lib/LanguageContext'
import './VirtualBoothCol.css'

interface VirtualBoothColProps {
  companies: BoothData[]
}

const OBJECTIVES = ['Sale', 'Procurement', 'Joint Venture', 'Technical tie-up', 'Other']

const OBJECTIVE_TRANSLATIONS_EN: Record<string, string> = {
  'Sale': 'Sale',
  'Procurement': 'Procurement',
  'Joint Venture': 'Joint Venture',
  'Technical tie-up': 'Technical tie-up',
  'Other': 'Other'
}

const OBJECTIVE_TRANSLATIONS_JA: Record<string, string> = {
  'Sale': '販売 (Sale)',
  'Procurement': '調達 (Procurement)',
  'Joint Venture': '合弁事業 (Joint Venture)',
  'Technical tie-up': '技術提携 (Technical tie-up)',
  'Other': 'その他 (Other)'
}

export default function VirtualBoothCol({ companies }: VirtualBoothColProps) {
  const { locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  const [selectedCountry, setSelectedCountry] = useState<'all' | 'India' | 'Japan'>('all')
  const [activeCompanyId, setActiveCompanyId] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting and mobile detection
  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter companies based on selected country
  const filtered = companies.filter(c => {
    if (selectedCountry === 'all') return true
    return c.country.toLowerCase() === selectedCountry.toLowerCase()
  })

  // Synchronize activeCompanyId when filtering changes
  useEffect(() => {
    if (filtered.length > 0) {
      const exists = filtered.some(c => c.id === activeCompanyId)
      if (!exists) {
        setActiveCompanyId(filtered[0].id)
      }
    } else {
      setActiveCompanyId('')
    }
  }, [selectedCountry, companies, filtered, activeCompanyId])

  // Get active company object
  const activeCompany = companies.find(c => c.id === activeCompanyId) || filtered[0] || companies[0]



  // Initialize active company on mount
  useEffect(() => {
    if (companies.length > 0 && !activeCompanyId) {
      setActiveCompanyId(companies[0].id)
    }
  }, [companies, activeCompanyId])

  if (!companies || companies.length === 0) return null

  const handleLogoClick = (companyId: string) => {
    setActiveCompanyId(companyId)
    if (isMobile) {
      setIsModalOpen(true)
    }
  }

  // Get display text for objective title
  const getObjectiveTitle = (obj: string) => {
    return locale === 'ja' 
      ? (OBJECTIVE_TRANSLATIONS_JA[obj] || obj) 
      : (OBJECTIVE_TRANSLATIONS_EN[obj] || obj)
  }

  return (
    <div className="virtual-booth-col-layout" style={jpFont}>
      {/* Header section with toggle filters */}
      <div className="virtual-booth-col-header">
        {/* Country filter toggle buttons */}
        <div className="virtual-booth-col-toggle-group">
          <button
            className={`virtual-booth-col-toggle-btn ${selectedCountry === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('all')}
          >
            {locale === 'ja' ? 'すべて' : 'All'}
          </button>
          <button
            className={`virtual-booth-col-toggle-btn ${selectedCountry === 'India' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('India')}
          >
            {locale === 'ja' ? 'インド' : 'India'}
          </button>
          <button
            className={`virtual-booth-col-toggle-btn ${selectedCountry === 'Japan' ? 'active' : ''}`}
            onClick={() => setSelectedCountry('Japan')}
          >
            {locale === 'ja' ? '日本' : 'Japan'}
          </button>
        </div>
      </div>

      {/* Main interactive grid area */}
      <div className="virtual-booth-col-main">
        {/* Left Column: Virtual Booth Showcase */}
        {activeCompany && (
          <div className="virtual-booth-col-left">
            <VirtualBooth key={activeCompany.id} data={activeCompany} />
            <div className="virtual-booth-col-active-details">
              <h3>{activeCompany.companyName}</h3>
              <div className="virtual-booth-col-active-location">
                <span className="material-symbols-outlined">location_on</span>
                <span>{activeCompany.city}, {activeCompany.country}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Grouped sponsor-like logo grid */}
        <div className="virtual-booth-col-right">
          {OBJECTIVES.map((objective) => {
            // Filter companies that have this objective
            const matchingCompanies = filtered.filter((c) =>
              c.objectives.some((obj) => obj.toLowerCase() === objective.toLowerCase())
            )

            if (matchingCompanies.length === 0) return null

            const objectiveIcons: Record<string, string> = {
              'Sale': 'sell',
              'Procurement': 'shopping_cart',
              'Joint Venture': 'handshake',
              'Technical tie-up': 'engineering',
              'Other': 'more_horiz'
            }

            return (
              <div key={objective} className="virtual-booth-col-group">
                <h4 className="virtual-booth-col-group-title">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-symbols-outlined objective-icon">
                      {objectiveIcons[objective] || 'business'}
                    </span>
                    {getObjectiveTitle(objective)}
                  </span>
                  <span className="virtual-booth-col-group-count">
                    {matchingCompanies.length}
                  </span>
                </h4>
                
                <div className="virtual-booth-col-logo-grid">
                  {matchingCompanies.map((company) => {
                    const isActive = company.id === activeCompanyId
                    return (
                      <button
                        key={company.id}
                        onClick={() => handleLogoClick(company.id)}
                        className={`virtual-booth-col-logo-card ${isActive ? 'active' : ''}`}
                        title={company.companyName}
                      >
                        <div className="virtual-booth-col-logo-card-badge" />
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={`${company.companyName} Logo`}
                            className="virtual-booth-col-logo-card-img"
                          />
                        ) : (
                          <span className="virtual-booth-col-logo-card-fallback-wrapper">
                            <span className="material-symbols-outlined fallback-icon">corporate_fare</span>
                            <span className="virtual-booth-col-logo-card-fallback">
                              {company.companyName}
                            </span>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Modal popup overlay */}
      {isMobile && isModalOpen && activeCompany && mounted && createPortal(
        <div className="virtual-booth-col-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="virtual-booth-col-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="virtual-booth-col-modal-header">
              <h3>{activeCompany.companyName}</h3>
              <button className="virtual-booth-col-modal-close" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="virtual-booth-col-modal-body">
              <VirtualBooth key={activeCompany.id} data={activeCompany} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
