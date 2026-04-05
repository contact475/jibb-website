'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInLeft } from '@/lib/motion'

export default function WhoWeAre() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="who-we-are" id="about">
      <motion.div
        className="who-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <div className="section-tag">
          <span className="tag-line"></span>
          <span className="tag-text">{t.whoWeAre.tag}</span>
        </div>
        <h2>
          {t.whoWeAre.title[0]}<em>{t.whoWeAre.title[1]}</em>
        </h2>
        <p className="who-description" style={jpFont}>
          {t.whoWeAre.description}
        </p>
      </motion.div>

      <div className="who-right">
        {t.whoWeAre.locations.map((loc, index) => (
          <motion.div
            key={index}
            className="location-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
          >
            <div className="location-header">
              <div className="location-emblem">
                <span className="location-code">{loc.code}</span>
              </div>
              <div className="location-info">
                <h3>{loc.city}</h3>
                <span className="location-role">{loc.role}</span>
              </div>
            </div>
            <p className="location-desc" style={jpFont}>{loc.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
