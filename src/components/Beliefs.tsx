'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion, fadeInUp } from '@/lib/motion'

export default function Beliefs() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="beliefs">
      <div className="beliefs-container">
        <motion.div
          className="beliefs-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span className="tag-line"></span>
            <span className="tag-text">{t.beliefs.tag}</span>
            <span className="tag-line"></span>
          </div>
          <h2>{t.beliefs.title[0]} <em>{t.beliefs.title[1]}</em></h2>
          <p style={jpFont}>
            {t.beliefs.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="pillars"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          {t.beliefs.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="pillar"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="pillar-icon">
                <span className="material-symbols-outlined">{pillar.icon}</span>
              </div>
              <span className="pillar-num">{pillar.num}</span>
              <h3>{pillar.title}</h3>
              <p style={jpFont}>{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bottom-statement"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.3 }
            }
          }}
        >
          <p style={jpFont}>
            {t.beliefs.bottomStatement[0]} <span>{t.beliefs.bottomStatement[1]}</span>{t.beliefs.bottomStatement[2]}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
