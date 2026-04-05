'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { motion } from '@/lib/motion'

export default function Quote() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <section className="quote-section">
      <motion.div
        className="quote-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="quote-mark"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          &ldquo;
        </motion.span>
        <motion.p
          className="quote-text"
          style={jpFont}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.quote.text[0]} <span>{t.quote.text[1]}</span> {t.quote.text[2]}
        </motion.p>
        <motion.div
          className="quote-author"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="author-name">{t.quote.author}</span>
          <span className="author-title">{t.quote.title}</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
