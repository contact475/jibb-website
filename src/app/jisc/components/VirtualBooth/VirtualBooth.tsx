'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { BoothData, BoothDocument } from './boothData'
import PDFModal from './PDFModal'
import './VirtualBooth.css'

interface VirtualBoothProps {
  data: BoothData
}

export default function VirtualBooth({ data }: VirtualBoothProps) {
  const [selectedDoc, setSelectedDoc] = useState<BoothDocument | null>(null)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="virtual-booth-container">
      {/* Scrollable wrapper for mobile responsiveness */}
      <div className="virtual-booth-stage-wrapper">
        {/* Booth Stage Area */}
        <div
          className="virtual-booth-stage"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsSidePanelOpen(true)}
        >
          {/* Layer 1: Booth Background Components */}
          <Image src="/jisc/virtual-booth/background-image.png" alt="Exhibition Hall Background" fill className="virtual-booth-layer" style={{ zIndex: 0 }} />
          <Image src="/jisc/virtual-booth/floor.png" alt="Floor" fill className="virtual-booth-layer" style={{ zIndex: 1 }} />
          <Image src="/jisc/virtual-booth/backdrop-wall.png" alt="Backdrop" fill className="virtual-booth-layer" style={{ zIndex: 2 }} />

          {/* Standees */}
          <Image src="/jisc/virtual-booth/left standee.png" alt="Left Standee" fill className="virtual-booth-layer" style={{ zIndex: 3 }} />
          <Image src="/jisc/virtual-booth/right standee.png" alt="Right Standee" fill className="virtual-booth-layer" style={{ zIndex: 3 }} />

          {/* Table & Receptionist */}
          <Image src="/jisc/virtual-booth/table.png" alt="Table" fill className="virtual-booth-layer" style={{ zIndex: 4 }} />
          <Image src="/jisc/virtual-booth/lady.png" alt="Receptionist" fill className="virtual-booth-layer" style={{ zIndex: 5 }} />

          {/* Layer 2: Video Screen */}
          <div
            className="video-screen"
            style={{ zIndex: 3, overflow: 'hidden', borderRadius: '2px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={data.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none' }}
            />
          </div>

          {/* Company Logo (On Reception Table) */}
          {data.logo ? (
            <Image
              src={data.logo}
              alt={`${data.companyName} Logo`}
              width={100}
              height={50}
              className="company-logo"
            />
          ) : (
            // <div className="company-logo company-logo-text">
            //   {data.companyName}
            // </div>
            <Image
              src="/jisc/virtual-booth/your-logo-here.png"
              alt="Your Logo Here"
              width={100}
              height={50}
              className="company-logo"
              style={{ objectFit: 'contain' }}
            />
          )}

          {/* Left Standee Content */}
          <div className="left-standee-content">
            <svg viewBox="0 0 100 240" className="standee-svg">
              <text x="50" y="45" textAnchor="middle" className="svg-standee-title">{data.city.toUpperCase()}</text>
              <text x="50" y="75" textAnchor="middle" className="svg-standee-sub">{data.country}</text>
              
              {/* Elegant divider line */}
              <line x1="25" y1="110" x2="75" y2="110" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              
              <text x="50" y="155" textAnchor="middle" className="svg-standee-label">OBJECTIVE</text>
              <text x="50" y="195" textAnchor="middle" className="svg-standee-value">
                {data.objectives.length > 0 ? data.objectives[0] : 'Other'}
              </text>
            </svg>
          </div>

          {/* Right Standee Content */}
          <div className="right-standee-content">
            <svg viewBox="0 0 100 130" className="standee-svg">
              <text x="50" y="45" textAnchor="middle" className="svg-standee-label">RESOURCES</text>
              <text x="50" y="85" textAnchor="middle" className="svg-standee-title">
                {data.documents.length} PDF{data.documents.length !== 1 ? 's' : ''}
              </text>
              <line x1="25" y1="115" x2="75" y2="115" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
            </svg>
            <div className="standee-row-button-container">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSidePanelOpen(true)
                }} 
                className="document-action-btn"
              >
                <span className="material-symbols-outlined action-btn-icon">visibility</span> View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel for Company Info */}
      {isSidePanelOpen && mounted && createPortal(
        <div className="booth-side-panel-overlay" onClick={() => setIsSidePanelOpen(false)}>
          <div className="booth-side-panel" onClick={(e) => e.stopPropagation()}>
            <button className="side-panel-close" onClick={() => setIsSidePanelOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="side-panel-header">
              <h3>{data.companyName}</h3>
              <div className="side-panel-location">
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '4px' }}>location_on</span>
                {data.city}, {data.country}
              </div>
            </div>

            <div className="side-panel-section">
              <h4>Objectives</h4>
              <ul className="side-panel-list">
                {data.objectives.map((obj, idx) => (
                  <li key={idx}>• {obj}</li>
                ))}
              </ul>
            </div>

            <div className="side-panel-section">
              <h4>Specialization</h4>
              <ul className="side-panel-list">
                {data.specialization.map((spec, idx) => (
                  <li key={idx}>• {spec}</li>
                ))}
              </ul>
            </div>

            <div className="side-panel-section">
              <h4>Documents</h4>
              {data.documents.map((doc, idx) => (
                <div key={idx} className="side-panel-doc">
                  <div className="side-panel-doc-info">
                    <span className="material-symbols-outlined">
                      {doc.type === 'pdf' ? 'picture_as_pdf' : 'image'}
                    </span>
                    {doc.title}
                  </div>
                  <div className="side-panel-doc-actions">
                    <button
                      className="side-panel-doc-btn"
                      onClick={() => setSelectedDoc(doc)}
                      title="View Document"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <a
                      href={doc.file}
                      download
                      className="side-panel-doc-btn"
                      title="Download Document"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined">download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* PDF Viewer Modal */}
      {selectedDoc && (
        <PDFModal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          pdfUrl={selectedDoc.file}
          title={selectedDoc.title}
        />
      )}
    </div>
  )
}
