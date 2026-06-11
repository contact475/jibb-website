'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

interface Notification {
  id: string
  title: {
    en: string
    ja: string
  }
  description?: {
    en: string
    ja: string
  }
  image: string
  link: string
  date: string
  badge?: {
    en: string
    ja: string
  }
  type: 'event' | 'update' | 'announcement'
}

const notifications: Notification[] = [
  {
    id: 'manufacturing-event-july-2026',
    title: {
      en: "Unlocking India's Manufacturing Growth Story",
      ja: 'インド製造業の成長ストーリーを紐解くセミナー'
    },
    description: {
      en: 'Join us on July 3, 2026 for an exclusive seminar in Tokyo on investment and market entry opportunities.',
      ja: '2026年7月3日東京開催 - 日本製造企業向け投資・パートナーシップ・参入機会セミナー。'
    },
    image: '/events/JIBB_Event_3_July_2026.jpg',
    link: '/events/india-japan-manufacturing-collaboration-2026',
    date: '2026-07-03',
    badge: {
      en: 'Upcoming Event',
      ja: '開催予定'
    },
    type: 'event'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

import type { Variants } from 'framer-motion'

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
}

// Predefined rotation angles for realistic notices
const cardRotations = ['-1.5deg', '1.2deg', '-0.8deg']

export default function NotifyAll() {
  const { locale } = useLanguage()
  const [dismissed, setDismissed] = useState<string[]>([])
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  const activeNotifications = notifications.filter(
    notification => !dismissed.includes(notification.id)
  )

  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDismissed(prev => [...prev, id])
  }

  if (activeNotifications.length === 0) {
    return null
  }

  return (
    <section className="notify-all-section">
      <div className="notify-board-header">
        <h2 className="notify-board-title" style={jpFont}>
          {locale === 'ja' ? 'お知らせ・セミナー' : 'Notice Board'}
        </h2>
        <p className="notify-board-subtitle" style={jpFont}>
          {locale === 'ja' ? 'イベント ＆ お知らせ' : 'Updates & Announcements'}
        </p>
      </div>

      <motion.div
        className="notify-all-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <AnimatePresence mode="popLayout">
          {activeNotifications.map((notification, index) => {
            const rotation = cardRotations[index % cardRotations.length]
            return (
              <motion.div
                key={notification.id}
                variants={cardVariants}
                exit="exit"
                className="notify-all-card"
                style={{ '--card-rotate': rotation } as React.CSSProperties}
              >
                {/* Visual Push Pin / Tack */}
                <div className="notify-pin" />

                {/* Dismiss Button */}
                <button
                  className="notify-dismiss-btn"
                  onClick={(e) => handleDismiss(e, notification.id)}
                  aria-label={locale === 'ja' ? '閉じる' : 'Dismiss'}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                <Link href={notification.link} className="notify-card-link">
                  {/* Image Section */}
                  <div className="notify-image-wrapper">
                    <Image
                      src={notification.image}
                      alt={notification.title[locale as 'en' | 'ja']}
                      width={400}
                      height={200}
                      className="notify-image"
                      priority
                    />
                  </div>

                  {/* Content Section */}
                  <div className="notify-content">
                    {/* Badge */}
                    {notification.badge && (
                      <div className={`notify-badge notify-badge-${notification.type}`}>
                        <span className="material-symbols-outlined">
                          {notification.type === 'event' ? 'event' :
                            notification.type === 'update' ? 'update' :
                              'campaign'}
                        </span>
                        <span style={jpFont}>
                          {notification.badge[locale as 'en' | 'ja']}
                        </span>
                      </div>
                    )}

                    <h3 className="notify-title" style={jpFont}>
                      {notification.title[locale as 'en' | 'ja']}
                    </h3>

                    {notification.description && (
                      <p className="notify-description" style={jpFont}>
                        {notification.description[locale as 'en' | 'ja']}
                      </p>
                    )}

                    <div className="notify-cta">
                      <span style={jpFont}>
                        {locale === 'ja' ? '詳細を見る' : 'Learn More'}
                      </span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
