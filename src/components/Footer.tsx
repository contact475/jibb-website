'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from '@/lib/motion'

const socialLinks = [
  { icon: 'language', href: '#' },
  { icon: 'mail', href: 'mailto:vc@npo-jibb.org' },
  { icon: 'share', href: '#' }
]

export default function Footer() {
  const { t, locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  return (
    <motion.footer
      className="footer"
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <Image
                src="/logo.webp"
                alt="JIBB - NPO Japan India Business Bureau"
                width={140}
                height={56}
                className="footer-logo-img"
              />
            </Link>
            <p style={jpFont}>
              {t.footer.brand}
            </p>
          </div>

          <div className="footer-cols-wrapper">
            <div className="footer-col">
              <h4>{t.footer.bureau.title}</h4>
              <ul>
                {t.footer.bureau.items.map((item, index) => (
                  <li key={index}><Link href="#">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.footer.services.title}</h4>
              <ul>
                {t.footer.services.items.map((item, index) => (
                  <li key={index}><Link href="#">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.footer.contact.title}</h4>
              <ul>
                {t.footer.contact.items.map((item, index) => (
                  <li key={index}><Link href="#">{item}</Link></li>
                ))}
                <li><a href="mailto:vc@npo-jibb.org">vc@npo-jibb.org</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {t.footer.copyright}</p>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href}>
                <span className="material-symbols-outlined">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
