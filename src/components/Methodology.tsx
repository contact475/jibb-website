'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInLeft } from '@/lib/motion'

export default function Methodology() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="methodology">
      <motion.div
        className="method-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <div className="section-tag">
          <span className="tag-line"></span>
          <span className="tag-text">{t.methodology.tag}</span>
        </div>
        <h2>{t.methodology.title[0]}<em>{t.methodology.title[1]}</em></h2>
        <p className="method-desc" style={jpFont}>
          {t.methodology.desc}
        </p>
      </motion.div>

      <div className="method-right">
        <div className="steps-container">
          {t.methodology.steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ x: 8, transition: { duration: 0.25 } }}
            >
              <span className="step-number">{step.phase}</span>
              <div className="step-icon">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text" style={jpFont}>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
