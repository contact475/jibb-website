'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion } from '@/lib/motion'

export default function Vision() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="vision-section">
      <div className="decorative-corner corner-tl"></div>
      <div className="decorative-corner corner-br"></div>
      <motion.div
        className="vm-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="section-tag">
          <span className="tag-line"></span>
          <span className="tag-text">{t.vision.tag}</span>
        </div>
        <motion.div
          className="vm-icon"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="material-symbols-outlined">visibility</span>
        </motion.div>
        <h2>{t.vision.title[0]} <em>{t.vision.title[1]}</em></h2>
        <p className="vm-text" style={jpFont}>
          {t.vision.text}
        </p>
      </motion.div>
    </section>
  )
}
