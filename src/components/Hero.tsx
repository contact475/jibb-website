'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const { t, locale } = useLanguage()

  return (
    <section className="hero-cinematic">
      {/* Full-screen Background Image */}
      <div className="hero-bg">
        <Image
          src="/hero-illustration.webp"
          alt="JIBB - Bridging Japan and India"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Vignette Effect */}
      <div className="hero-vignette"></div>

      {/* Content */}
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            style={{ fontFamily: locale === 'ja' ? 'var(--font-noto-jp), var(--font-cormorant)' : undefined }}
          >
            {t.hero.title[0]}<br />
            <em className="highlight">{t.hero.title[1]} {t.hero.title[2]}</em><br />
            {t.hero.title[3]}
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            style={{ fontFamily: locale === 'ja' ? 'var(--font-noto-jp)' : undefined }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          >
            <a href="mailto:vc@np-jibb.org" className="cta-primary">{t.hero.ctaPrimary}</a>
            <a href="#about" className="cta-secondary">{t.hero.ctaSecondary}</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-locations"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        >
          {t.hero.locations.map((loc, index) => (
            <div key={index} className="location-item">
              <div className="location-info">
                <span className="location-label">{loc.text}</span>
                <span className="location-city">{loc.city}</span>
              </div>
              <div className="location-icon">{loc.code}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span className="scroll-line"></span>
        <span className="scroll-text">Scroll</span>
      </motion.div>
    </section>
  )
}
