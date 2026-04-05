'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInLeft, fadeInRight } from '@/lib/motion'

export default function CTA() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="cta-section" id="join">
      <motion.div
        className="cta-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInLeft}
      >
        <h2>{t.cta.title}</h2>
        <p style={jpFont}>
          {t.cta.desc}
        </p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a href="mailto:vc@np-jibb.org" className="cta-btn">
            {t.cta.button}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="cta-right"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInRight}
      >
        <h3>{t.cta.whyJoin[0]} <em>{t.cta.whyJoin[1]}</em>{t.cta.whyJoin[2]}</h3>
        <ul className="cta-list">
          {t.cta.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              style={jpFont}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <span className="material-symbols-outlined">verified</span>
              {benefit}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
