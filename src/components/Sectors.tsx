'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInUp } from '@/lib/motion'

export default function Sectors() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="sectors" id="sectors">
      <div className="sectors-container">
        <motion.div
          className="sectors-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div>
            <div className="section-tag">
              <span className="tag-line"></span>
              <span className="tag-text">{t.sectors.tag}</span>
            </div>
            <h2>{t.sectors.title[0]}<br /><em>{t.sectors.title[1]}</em></h2>
          </div>
          <div className="sectors-intro">
            <p style={jpFont}>
              {t.sectors.intro}
            </p>
          </div>
        </motion.div>

        <div className="sectors-grid">
          {t.sectors.items.map((sector, index) => (
            <motion.div
              key={index}
              className="sector-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                scale: 1.08,
                y: -5,
                transition: { duration: 0.25 }
              }}
            >
              <span className="material-symbols-outlined sector-icon">{sector.icon}</span>
              <span className="sector-name">{sector.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
