'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInUp } from '@/lib/motion'

export default function Framework() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="framework">
      <motion.div
        className="framework-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="section-tag">
          <span className="tag-line"></span>
          <span className="tag-text">{t.framework.tag}</span>
        </div>
        <h2>{t.framework.title[0]} <em>{t.framework.title[1]}</em></h2>
        <span className="framework-sub">{t.framework.subtitle}</span>
      </motion.div>

      <div className="services-scroll">
        {t.framework.services.map((service, index) => (
          <motion.div
            key={index}
            className={`service-card ${service.highlight ? 'highlight' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="service-index">{service.index}</div>
            <div className="service-icon-wrap">
              <span className="material-symbols-outlined">{service.icon}</span>
            </div>
            <h3>{service.title}</h3>
            <p style={jpFont}>{service.desc}</p>
          </motion.div>
        ))}

        <motion.div
          className="service-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Link href="#contact">
            <span className="material-symbols-outlined">arrow_forward</span>
            {t.framework.viewFramework[0]}<br />{t.framework.viewFramework[1]}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
