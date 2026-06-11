'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function EventTicker() {
  const { locale } = useLanguage()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const tickerText = locale === 'ja'
    ? '🎯 開催予定：インド製造業セミナー — 2026年7月3日、銀座（東京） — 参加登録はこちら →'
    : '🎯 Upcoming Event: India–Japan Manufacturing Collaboration 2026 — July 3, 2026 · Ginza, Tokyo — Register Now →'

  // Duplicate for seamless infinite scroll
  const items = [tickerText, tickerText, tickerText, tickerText]

  return (
    <div className="event-ticker" role="banner" aria-label="Upcoming event announcement">
      <div className="event-ticker-inner">
        <div className="event-ticker-track" aria-hidden="true">
          {items.map((text, i) => (
            <Link
              key={i}
              href="/events/india-japan-manufacturing-collaboration-2026"
              className="event-ticker-item"
              tabIndex={i === 0 ? 0 : -1}
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
      <button
        className="event-ticker-dismiss"
        onClick={() => setDismissed(true)}
        aria-label={locale === 'ja' ? '閉じる' : 'Dismiss announcement'}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  )
}
