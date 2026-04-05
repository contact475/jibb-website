'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Locale, TranslationType } from './translations'

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationType
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function detectUserLocale(): Locale {
  if (typeof window === 'undefined') return 'en'

  // Check localStorage first
  const saved = localStorage.getItem('jibb-locale')
  if (saved === 'ja' || saved === 'en') return saved

  // Check browser language
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ''
  if (browserLang.startsWith('ja')) return 'ja'

  // Check timezone for Japan (Asia/Tokyo)
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timezone === 'Asia/Tokyo') return 'ja'
  } catch {
    // Timezone detection not supported
  }

  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detectedLocale = detectUserLocale()
    setLocaleState(detectedLocale)
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('jibb-locale', newLocale)
    document.documentElement.lang = newLocale
  }

  const t = translations[locale]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: 'en', setLocale, t: translations.en }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
