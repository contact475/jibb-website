'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { Navbar, Footer } from '@/components'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

type EventKey = 'semicon' | 'mobility'

export default function EventsPage() {
  const { locale } = useLanguage()
  const [activeEvent, setActiveEvent] = useState<EventKey>('semicon')
  const [posterLang, setPosterLang] = useState<'en' | 'ja'>('en')
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  const events = {
    semicon: {
      id: 'semicon',
      en: {
        tagline: 'Semicon India 2026',
        title: '1st Exhibition Briefing &',
        titleHighlight: 'Semiconductor Market',
        titleEnd: 'Outlook Seminar',
        subtitle: 'Join us for an exclusive briefing on India\'s semiconductor market and the Japan Pavilion exhibition opportunity at Semicon India 2026.',
        date: 'April 28, 2026',
        dateDay: 'Tuesday',
        time: '14:00 - 17:45',
        receptionTime: '17:45 - 19:30',
        venue: 'Plaza F, Yotsuya, Tokyo',
        venueAddress: '15 Rokubancho, Chiyoda-ku, Tokyo 102-0085',
        format: 'Hybrid',
        seminarCapacity: '120',
        receptionCapacity: '60',
        deadline: 'April 24, 2026',
        program: [
          { time: '14:00-14:05', speaker: 'Tatsutoshi Suzuki', org: 'JISC', topic: 'Opening Remarks', isBreak: false },
          { time: '14:05-14:10', speaker: 'Yasuhiko Takeno', org: 'GNC', topic: 'Greetings', isBreak: false },
          { time: '14:10-14:15', speaker: 'Ashok Chandak', org: 'IESA', topic: 'Welcome Address (Online)', isBreak: false },
          { time: '14:15-14:45', speaker: 'Dr. Toshiro Doi & Dr. Masaharu Kinoshita', org: 'CMP', topic: 'Greetings & CMP Committee Introduction', isBreak: false },
          { time: '14:45-15:15', speaker: 'Hirokuni Hiyama & Prof. Shuhei Kurokawa', org: 'CMP', topic: 'Global Semiconductor Trends & CMP Equipment', isBreak: false },
          { time: '15:15-16:05', speaker: 'Ashok Chandak', org: 'IESA', topic: 'India Market Status & Outlook (Online)', isBreak: false },
          { time: '16:05-16:10', speaker: '', org: '', topic: 'Semicon India 2026 Video Introduction', isBreak: true },
          { time: '16:10-16:25', speaker: 'IESA Representative', org: 'IESA', topic: 'Semicon India 2026 Exhibition Details (Online)', isBreak: false },
          { time: '16:25-16:45', speaker: 'Takuya Nishimura', org: 'Toho Koki', topic: 'One Year Performance Evaluation After India Entry', isBreak: false },
          { time: '16:45-17:05', speaker: 'Norihisa Akitani', org: 'JISC', topic: 'Semicon India Trends', isBreak: false },
          { time: '17:05-17:25', speaker: 'Sai Chandra Teja', org: 'Green PMU', topic: 'Accelerating Japan-India Semiconductor Industry', isBreak: false },
          { time: '17:25-17:35', speaker: 'Shigeru Yasui', org: 'JIBB', topic: 'Japan Pavilion Benefits & JISC Business Center', isBreak: false },
          { time: '17:35-17:45', speaker: '', org: '', topic: 'Q&A Session', isBreak: true },
          { time: '17:45-19:30', speaker: '', org: '', topic: 'Reception (Networking Party)', isBreak: false, isHighlight: true }
        ],
        organizer: 'India Electronics & Semiconductor Association (IESA)',
        coOrganizers: ['NPO Japan India Business Bureau (JIBB)', 'JIBB India', 'Japan India Semiconductor Committee (JISC)', 'JISC India'],
        specialSupport: 'JSPE CMP Technical Committee',
        supporters: ['FOURIN Inc.', 'Indobox Inc.'],
        specialCooperation: 'Global Net Corporation (GNC)',
        mediaPartner: 'Nikkan Kogyo Shimbun'
      },
      ja: {
        tagline: 'Semicon India 2026',
        title: '第一回 出展説明会 &',
        titleHighlight: '半導体市場',
        titleEnd: '展望セミナー',
        subtitle: 'Semicon India 2026 ジャパンパビリオンへの出展機会とインド半導体市場についての説明会にぜひご参加ください。',
        date: '2026年4月28日',
        dateDay: '火曜日',
        time: '14:00〜17:45',
        receptionTime: '17:45〜19:30',
        venue: '四ツ谷プラザエフ（東京）',
        venueAddress: '〒102-0085 東京都千代田区六番町15番地',
        format: 'ハイブリッド',
        seminarCapacity: '120名',
        receptionCapacity: '60名',
        deadline: '4月24日',
        program: [
          { time: '14:00-14:05', speaker: '鈴木 達俊', org: 'JISC', topic: '開会挨拶', isBreak: false },
          { time: '14:05-14:10', speaker: '竹野 康彦', org: 'GNC', topic: 'ご挨拶', isBreak: false },
          { time: '14:10-14:15', speaker: 'アショク・チャンダク', org: 'IESA', topic: '歓迎のご挨拶（オンライン）', isBreak: false },
          { time: '14:15-14:45', speaker: '土肥 俊郎 博士 & 木下 正治 博士', org: 'CMP', topic: 'ご挨拶 & CMPコミッティー紹介', isBreak: false },
          { time: '14:45-15:15', speaker: '日山 弘邦 & 黒川 修平 教授', org: 'CMP', topic: '世界半導体動向とCMP装置', isBreak: false },
          { time: '15:15-16:05', speaker: 'アショク・チャンダク', org: 'IESA', topic: 'インド市場の現状と展望（オンライン）', isBreak: false },
          { time: '16:05-16:10', speaker: '', org: '', topic: 'Semicon India 2026 ビデオ紹介', isBreak: true },
          { time: '16:10-16:25', speaker: 'IESA担当者', org: 'IESA', topic: 'Semicon India 2026 展示会詳細（オンライン）', isBreak: false },
          { time: '16:25-16:45', speaker: '西村 拓也', org: '東邦鋼機', topic: 'インド進出1年の実績評価', isBreak: false },
          { time: '16:45-17:05', speaker: '秋谷 宣久', org: 'JISC', topic: 'Semicon Indiaの動向', isBreak: false },
          { time: '17:05-17:25', speaker: 'サイ・チャンドラ・テジャ', org: 'Green PMU', topic: '日印半導体産業の加速', isBreak: false },
          { time: '17:25-17:35', speaker: '安井 茂', org: 'JIBB', topic: 'ジャパンパビリオン出展メリット & JISCビジネスセンター', isBreak: false },
          { time: '17:35-17:45', speaker: '', org: '', topic: '質疑応答', isBreak: true },
          { time: '17:45-19:30', speaker: '', org: '', topic: '懇親会（ネットワーキングパーティー）', isBreak: false, isHighlight: true }
        ],
        organizer: 'インドエレクトロニクス＆半導体協会（IESA）',
        coOrganizers: ['NPO法人 日本インドビジネスビューロー（JIBB）', 'JIBB India', '日印半導体コミッティ（JISC）', 'JISC India'],
        specialSupport: 'JSPE CMPテクニカルコミッティ',
        supporters: ['株式会社フォーイン', '株式会社インドボックス'],
        specialCooperation: 'グローバルネットコーポレーション（GNC）',
        mediaPartner: '日刊工業新聞社'
      },
      posterEn: '/events/semicon-india-2026-en.png',
      posterJa: '/events/semicon-india-2026-ja.jpeg'
    },
    mobility: {
      id: 'mobility',
      en: {
        tagline: 'Bharat Mobility 2027',
        title: 'India Automotive Business',
        titleHighlight: 'Entry Seminar',
        titleEnd: '& Exhibition Briefing',
        subtitle: 'ACMA delegation visits Japan! Learn about India\'s automotive market and the Bharat Mobility 2027 exhibition opportunity.',
        date: 'May 11, 2026',
        dateDay: 'Monday',
        time: '13:00 - 17:50',
        receptionTime: '',
        venue: 'Ginza Blossom, Tokyo',
        venueAddress: '2-15-6 Ginza, Chuo-ku, Tokyo 104-0061',
        format: 'Hybrid',
        seminarCapacity: '100',
        receptionCapacity: '',
        deadline: 'May 7, 2026',
        program: [
          { time: '13:00-13:10', speaker: '', org: '', topic: 'Opening & Welcome', isBreak: false },
          { time: '13:10-13:50', speaker: 'ACMA Representative', org: 'ACMA', topic: 'Bharat Mobility 2027 & India Automotive Industry Outlook', isBreak: false },
          { time: '13:50-14:20', speaker: 'JETRO Representative', org: 'JETRO', topic: 'Support for Japanese Companies Entering India', isBreak: false },
          { time: '14:20-14:50', speaker: 'JAPIA Representative', org: 'JAPIA', topic: 'JAPIA\'s India Market Initiatives & 2025 Delegation Report', isBreak: false },
          { time: '14:50-15:10', speaker: '', org: '', topic: 'Break', isBreak: true },
          { time: '15:10-15:40', speaker: 'FOURIN Analyst', org: 'FOURIN', topic: 'India Automotive Market Analysis', isBreak: false },
          { time: '15:40-16:10', speaker: 'S&P Global Mobility Analyst', org: 'S&P', topic: 'India Market Mid-to-Long Term Forecast', isBreak: false },
          { time: '16:10-16:40', speaker: 'Seiichi Kondo', org: 'Resonac', topic: 'Why is Semiconductor Industry Profitability High?', isBreak: false },
          { time: '16:40-17:50', speaker: '', org: '', topic: 'Q&A & Networking', isBreak: false, isHighlight: true }
        ],
        organizer: 'Automotive Component Manufacturers Association of India (ACMA)',
        coOrganizers: [],
        specialSupport: 'Japan Auto Parts Industries Association (JAPIA)',
        supporters: [],
        specialCooperation: 'FOURIN Inc., S&P Global Mobility, JISC',
        mediaPartner: 'Nikkan Kogyo Shimbun'
      },
      ja: {
        tagline: 'Bharat Mobility 2027',
        title: 'インド自動車ビジネス',
        titleHighlight: '進出セミナー',
        titleEnd: '& 出展説明会',
        subtitle: 'ACMA（インド自動車部品工業会）来日！インド自動車市場とBharat Mobility 2027展示会出展の機会について。',
        date: '2026年5月11日',
        dateDay: '月曜日',
        time: '13:00〜17:50',
        receptionTime: '',
        venue: '銀座ブロッサム（東京）',
        venueAddress: '〒104-0061 東京都中央区銀座2-15-6',
        format: 'ハイブリッド',
        seminarCapacity: '100名',
        receptionCapacity: '',
        deadline: '5月7日',
        program: [
          { time: '13:00-13:10', speaker: '', org: '', topic: '開会・ご挨拶', isBreak: false },
          { time: '13:10-13:50', speaker: 'ACMA担当者', org: 'ACMA', topic: 'Bharat Mobility 2027 & インド自動車産業展望', isBreak: false },
          { time: '13:50-14:20', speaker: 'JETRO担当者', org: 'JETRO', topic: 'インド進出における日本企業支援', isBreak: false },
          { time: '14:20-14:50', speaker: 'JAPIA担当者', org: 'JAPIA', topic: 'JAPIAのインド市場向け取り組み & 2025年視察報告', isBreak: false },
          { time: '14:50-15:10', speaker: '', org: '', topic: '休憩', isBreak: true },
          { time: '15:10-15:40', speaker: 'フォーイン', org: 'FOURIN', topic: 'インド自動車市場分析', isBreak: false },
          { time: '15:40-16:10', speaker: 'S&P Global Mobility', org: 'S&P', topic: 'インド市場中長期予測', isBreak: false },
          { time: '16:10-16:40', speaker: '近藤誠一', org: 'レゾナック', topic: '半導体産業の利益率はなぜ高いのか？', isBreak: false },
          { time: '16:40-17:50', speaker: '', org: '', topic: '質疑応答 & ネットワーキング', isBreak: false, isHighlight: true }
        ],
        organizer: 'インド自動車部品工業会（ACMA）',
        coOrganizers: [],
        specialSupport: '日本自動車部品工業会（JAPIA）',
        supporters: [],
        specialCooperation: '株式会社フォーイン, S&P Global Mobility, JISC',
        mediaPartner: '日刊工業新聞社'
      },
      posterEn: '/events/bharat-mobility-2027-en.png',
      posterJa: '/events/bharat-mobility-2027-ja.jpeg'
    }
  }

  const activeEventData = events[activeEvent]
  const t = activeEventData[locale]
  const currentPoster = posterLang === 'ja' ? activeEventData.posterJa : activeEventData.posterEn

  const content = {
    en: {
      pageTitle: 'Upcoming Events',
      pageSubtitle: 'Japan-India Business Seminars 2026',
      programTitle: 'Program Schedule',
      organizersTitle: 'Organizers & Partners',
      venueTitle: 'Venue & Access',
      contactTitle: 'Contact Information',
      contactOrg: 'NPO Japan India Business Bureau (JIBB) / Japan India Consulting',
      contactEmail: 'trade@ji-consulting.jp',
      travelDesc: 'Distance between central stations and airports in major Japanese cities',
      openMaps: 'Open in Google Maps',
      time: 'Time',
      reception: 'Reception',
      capacity: 'Capacity',
      deadline: 'Event Date',
      organizer: 'Organizer',
      coOrganizers: 'Co-organizers',
      specialSupport: 'Special Support',
      supporters: 'Supporters',
      specialCoop: 'Special Cooperation',
      mediaPartner: 'Media Partner'
    },
    ja: {
      pageTitle: '開催予定イベント',
      pageSubtitle: '日印ビジネスセミナー 2026',
      programTitle: 'プログラム',
      organizersTitle: '主催・後援',
      venueTitle: '会場・アクセス',
      contactTitle: 'お問い合わせ',
      contactOrg: 'NPO法人 日本インドビジネスビューロー（JIBB）/ 日印コンサルティング',
      contactEmail: 'trade@ji-consulting.jp',
      travelDesc: '国内の主要都市における中心駅と空港との距離',
      openMaps: 'Google マップで開く',
      time: '時間',
      reception: '懇親会',
      capacity: '定員',
      deadline: '開催日',
      organizer: '主催',
      coOrganizers: '共催',
      specialSupport: '特別協力',
      supporters: '後援',
      specialCoop: '協力',
      mediaPartner: 'メディアパートナー'
    }
  }

  const labels = content[locale]

  return (
    <>
      <Navbar />

      {/* Event Selector Tabs */}
      <div className="events-tab-bar">
        <div className="events-tab-container">
          <button
            className={`events-tab ${activeEvent === 'semicon' ? 'active semicon' : ''}`}
            onClick={() => setActiveEvent('semicon')}
            style={jpFont}
          >
            <span className="material-symbols-outlined">memory</span>
            <span>Semicon India 2026</span>
          </button>
          <button
            className={`events-tab ${activeEvent === 'mobility' ? 'active mobility' : ''}`}
            onClick={() => setActiveEvent('mobility')}
            style={jpFont}
          >
            <span className="material-symbols-outlined">directions_car</span>
            <span>Bharat Mobility 2027</span>
          </button>
        </div>
      </div>

      {/* Hero Section - Editorial Split Style */}
      <motion.section
        className="events-hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        key={activeEvent}
      >
        <div className="events-hero-bg"></div>

        <motion.div className="events-hero-left" variants={fadeInUp}>
          <div className="events-tag">
            <span className="events-tag-line"></span>
            <span className="events-tag-text" style={jpFont}>{t.tagline}</span>
          </div>
          <h1 className="events-hero-title" style={jpFont}>
            {t.title}<br />
            <em>{t.titleHighlight}</em><br />
            {t.titleEnd}
          </h1>
          <p className="events-hero-subtitle" style={jpFont}>{t.subtitle}</p>
        </motion.div>

        <motion.div className="events-hero-right" variants={fadeInUp}>
          <div className="events-badges">
            <span className="events-badge events-badge-date">{t.date}</span>
            <span className="events-badge events-badge-format">{t.format}</span>
          </div>
          <div className="events-details">
            <div className="events-detail-item">
              <span className="material-symbols-outlined">schedule</span>
              <div>
                <h4 style={jpFont}>{labels.time}</h4>
                <p>{t.time}</p>
                {t.receptionTime && <p className="events-detail-sub">{labels.reception}: {t.receptionTime}</p>}
              </div>
            </div>
            <div className="events-detail-item">
              <span className="material-symbols-outlined">location_on</span>
              <div>
                <h4 style={jpFont}>{locale === 'ja' ? '会場' : 'Venue'}</h4>
                <p>{t.venue}</p>
              </div>
            </div>
            <div className="events-detail-item">
              <span className="material-symbols-outlined">groups</span>
              <div>
                <h4 style={jpFont}>{labels.capacity}</h4>
                <p>{t.seminarCapacity}{t.receptionCapacity && ` | ${labels.reception}: ${t.receptionCapacity}`}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Program Section - Table Style */}
      <section className="events-program" id="program">
        <div className="events-section-header">
          <h2 className="events-section-title" style={jpFont}>{labels.programTitle}</h2>
          <span className="events-section-date">{t.date}</span>
        </div>

        <div className="events-table-header">
          <span>{locale === 'ja' ? '時間' : 'Time'}</span>
          <span>{locale === 'ja' ? 'セッション' : 'Session'}</span>
          <span>{locale === 'ja' ? '組織' : 'Organization'}</span>
        </div>

        <div className="events-program-table">
          {t.program.map((item, index) => (
            <div
              key={index}
              className={`events-table-row ${item.isBreak ? 'minimal' : ''} ${item.isHighlight ? 'highlight' : ''}`}
            >
              <div className="events-table-time">{item.time}</div>
              <div className="events-table-content">
                <h4 className="events-table-topic" style={jpFont}>{item.topic}</h4>
                {item.speaker && <p className="events-table-speaker"><strong>{item.speaker}</strong></p>}
              </div>
              <div className="events-table-org">
                {item.org && <span className="events-org-badge">{item.org}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Organizers Section - Carousel Style */}
      <section className="events-organizers">
        <div className="events-organizers-header">
          <div className="events-organizers-header-left">
            <p className="events-organizers-tag">{locale === 'ja' ? 'パートナー' : 'Our Partners'}</p>
            <h2 className="events-organizers-title" style={jpFont}>{labels.organizersTitle}</h2>
          </div>
        </div>


        {/* Partners Strip */}
        <div className="events-partners-strip">
          <div className="events-partners-inner">
            <div className="events-partners-header-bar">
              <h3 className="events-partners-bar-title" style={jpFont}>{locale === 'ja' ? 'イベントパートナー' : 'Event Partners'}</h3>
              <span className="events-partners-line"></span>
            </div>

            <div className="events-partners-grid">
              <div className="events-partner-card organizer">
                <p className="events-card-label">{labels.organizer}</p>
                <p className="events-card-name">{t.organizer}</p>
              </div>

              {t.coOrganizers && t.coOrganizers.length > 0 && (
                <div className="events-partner-card">
                  <p className="events-card-label">{labels.coOrganizers}</p>
                  <div className="events-card-names">
                    {t.coOrganizers.map((org, idx) => (
                      <p key={idx} className="events-card-name">{org}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="events-partner-card">
                <p className="events-card-label">{labels.specialSupport}</p>
                <p className="events-card-name">{t.specialSupport}</p>
              </div>

              {t.supporters && t.supporters.length > 0 && (
                <div className="events-partner-card">
                  <p className="events-card-label">{labels.supporters}</p>
                  <div className="events-card-names">
                    {t.supporters.map((org, idx) => (
                      <p key={idx} className="events-card-name">{org}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="events-partner-card">
                <p className="events-card-label">{labels.specialCoop}</p>
                <p className="events-card-name">{t.specialCooperation}</p>
              </div>

              <div className="events-partner-card">
                <p className="events-card-label">{labels.mediaPartner}</p>
                <p className="events-card-name">{t.mediaPartner}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Section - Full Bleed Style */}
      <section className="events-venue">
        <div className="events-venue-banner">
          <p className="events-banner-tag">{locale === 'ja' ? '会場・アクセス' : 'Location & Access'}</p>
          <h2 className="events-banner-title" style={jpFont}>{labels.venueTitle}</h2>
          <p className="events-venue-name-hero">{t.venue}</p>
        </div>

        <div className="events-venue-split">
          <div className="events-venue-details">
            <div className="events-detail-row">
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? '住所' : 'Address'}</p>
                <p className="events-detail-value" style={jpFont}>{t.venue}</p>
                <p className="events-detail-sub">{t.venueAddress}</p>
                <a
                  href="https://maps.google.com"
                  className="events-map-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.openMaps}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>

            <div className="events-detail-row">
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">train</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? 'アクセス' : 'Access'}</p>
                <p className="events-detail-value">{locale === 'ja' ? '最寄り駅から徒歩5分' : '5 min walk from nearest station'}</p>
              </div>
            </div>

            <div className="events-detail-row">
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">flight</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? '空港から' : 'From Airport'}</p>
                <p className="events-detail-value">{locale === 'ja' ? '成田から約60分、羽田から約30分' : '~60 min from Narita, ~30 min from Haneda'}</p>
              </div>
            </div>
          </div>

          <div className="events-travel-section">
            <div className="events-travel-header">
              <p className="events-travel-label">{locale === 'ja' ? '海外からお越しの方へ' : 'For International Attendees'}</p>
              <p className="events-travel-title" style={jpFont}>{labels.travelDesc}</p>
            </div>
            <Image
              src="/events/japan-travel-map.png"
              alt="Japan Travel Map"
              width={600}
              height={400}
              className="events-travel-map"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Contact Footer */}
        <div className="events-contact-footer">
          <div className="events-contact-inner">
            <div className="events-contact-left">
              <div className="events-contact-icon">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="events-contact-label">{labels.contactTitle}</p>
                <p className="events-contact-org" style={jpFont}>{labels.contactOrg}</p>
              </div>
            </div>
            <a href={`mailto:${labels.contactEmail}`} className="events-contact-email">{labels.contactEmail}</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
