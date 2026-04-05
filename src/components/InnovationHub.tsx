'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInUp } from '@/lib/motion'

export default function InnovationHub() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="innovation" id="innovation">
      <div className="innovation-container">
        <motion.div
          className="innovation-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span className="tag-line"></span>
            <span className="tag-text">{t.innovationHub.tag}</span>
            <span className="tag-line"></span>
          </div>
          <h2>{t.innovationHub.title[0]} <em>{t.innovationHub.title[1]}</em></h2>
          <p className="innovation-sub" style={jpFont}>
            {t.innovationHub.subtitle}
          </p>
        </motion.div>

        <div className="hub-grid">
          {t.innovationHub.items.map((item, index) => (
            <motion.div
              key={index}
              className="hub-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="hub-icon-wrap">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p style={jpFont}>{item.desc}</p>
              {item.link && (
                <Link href="#" className="hub-link">
                  {item.link}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
