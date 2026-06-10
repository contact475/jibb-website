'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { Navbar, Footer } from '@/components'

function ParallaxHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Parallax: image moves DOWN and fades out as user scrolls past
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <div ref={ref} className="events-parallax-header">
      <motion.div
        className="events-parallax-bg"
        style={{
          y,
          opacity,
          scale,
        }}
      />
    </div>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

// Slide from left
const slideFromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } }
}

// Slide from right
const slideFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } }
}

// Scale up entrance
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
}

// Stagger children container for scroll-triggered sections
const staggerOnScroll = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

// Program row stagger
const programRowVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] as const }
  })
}

// Venue detail row animation
const venueRowVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] as const }
  })
}

interface ProgramItem {
  time: string
  speaker: string
  org: string
  topic: string
  isBreak: boolean
  isHighlight?: boolean
  detailsTitle?: string
  details?: string[]
}

interface EventLocaleData {
  tagline: string
  title: string
  titleHighlight: string
  titleEnd: string
  subtitle: string
  date: string
  dateDay: string
  time: string
  receptionTime: string
  venue: string
  venueAddress: string
  format: string
  seminarCapacity: string
  receptionCapacity: string
  deadline: string
  program: ProgramItem[]
  organizer: string
  coOrganizers?: string[]
  specialSupport?: string
  supporters?: string[]
  specialCooperation?: string
  mediaPartner?: string
  secretariat?: string
  access?: string
  airport?: string
  overview?: string
  whoShouldAttend?: string[]
}

interface EventData {
  id: string
  en: EventLocaleData
  ja: EventLocaleData
  posterEn: string
  posterJa: string
  registrationUrl: string
  mapUrl?: string
  flyerUrl?: string
}

type EventKey = 'manufacturing' | 'semicon' | 'mobility'

const getPartnerLogo = (name: string): string | null => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('invest india') || lowerName.includes('インベスト・インディア')) {
    return '/events/invest_india.png'
  }
  if (lowerName.includes('japan india business bureau') || lowerName.includes('日本インドビジネスビューロー') || lowerName.includes('jibb')) {
    return '/events/japan_india_business_bureau.jpg'
  }
  if (lowerName.includes('japan-india consulting') || lowerName.includes('japan india consulting') || lowerName.includes('日印コンサルティング') || lowerName.includes('jic')) {
    return '/events/japan_india_consulting_jp_logo.jpg'
  }
  if (lowerName.includes('machine tool') || lowerName.includes('工作機械') || lowerName.includes('jmtba')) {
    return '/events/JMTBA.jpg'
  }
  if (lowerName.includes('semiconductor equipment') || lowerName.includes('半導体製造装置') || lowerName.includes('seaj')) {
    return '/events/SEAJ.gif'
  }
  if (lowerName.includes('machinery federation') || lowerName.includes('機械工業連合') || lowerName.includes('jmf')) {
    return '/events/JMF.png'
  }
  if (lowerName.includes('robot') || lowerName.includes('ロボット') || lowerName.includes('jara') || lowerName.includes('jra')) {
    return '/events/JRA.png'
  }
  if (lowerName.includes('iesa') || lowerName.includes('electronics & semiconductor')) {
    return '/jisc/govt-backed/iesa-logo.webp'
  }
  if (lowerName.includes('jspe') || lowerName.includes('precision engineering')) {
    return '/jisc/jspe-logo.png'
  }
  if (lowerName.includes('jisc') || lowerName.includes('semiconductor committee')) {
    return '/jisc/jisc-india-japan.png'
  }
  return null
}

export default function EventsPage() {
  const { locale } = useLanguage()
  const [activeEvent, setActiveEvent] = useState<EventKey>('manufacturing')
  const [posterLang, setPosterLang] = useState<'en' | 'ja'>('en')
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  const toggleRow = (eventKey: string, index: number) => {
    const key = `${eventKey}-${index}`
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const events = {
    manufacturing: {
      id: 'manufacturing',
      en: {
        tagline: "Unlocking India's Manufacturing Growth Story (3 July 2026)",
        title: "Unlocking India's",
        titleHighlight: "Manufacturing Growth",
        titleEnd: "Story",
        subtitle: "Investment, Partnerships, and Market Entry Opportunities for Japanese Manufacturing Companies",
        date: "Friday, July 3, 2026",
        dateDay: "Friday",
        time: "13:30 - 17:00",
        receptionTime: "16:10 - 16:30",
        venue: "Ginza Blossom (Chuo City Central Hall)",
        venueAddress: "7th Floor, Margaret, 2-15-6 Ginza, Chuo-ku, Tokyo 104-0061 (TEL: 03-3542-8585)",
        access: "1-minute walk from Exit 1 of Shintomicho Station (Tokyo Metro Yurakucho Line) | 6-minute walk from Exit 5 of Higashi-Ginza Station (Tokyo Metro Hibiya Line and Toei Asakusa Line)",
        format: "In-Person (Free of Charge)",
        seminarCapacity: "80 Particpants (First-Come, First-Served)",
        receptionCapacity: "",
        deadline: "July 3, 2026",
        overview: "India is emerging as one of the world's most attractive manufacturing destinations, supported by strong economic growth, expanding domestic demand, competitive production capabilities, and proactive government policies.\n\nThis seminar will provide Japanese manufacturers with practical insights into investment opportunities, policy incentives, partnership models, and market entry pathways across key industrial sectors.\n\nThe session is specially designed for companies engaged in machine tools, semiconductor manufacturing equipment, factory automation, industrial machinery, robotics, precision engineering, and advanced manufacturing technologies.",
        whoShouldAttend: [
          "Machine Tools",
          "Industrial Machinery",
          "Semiconductor Manufacturing Equipment",
          "Factory Automation",
          "Robotics",
          "Precision Engineering",
          "Advanced Manufacturing Technologies"
        ],
        program: [
          { time: '13:30-14:00', speaker: '', org: '', topic: 'Registration and Networking', isBreak: true },
          {
            time: '14:00-14:10',
            speaker: 'Invest India & JIBB Representatives',
            org: 'Invest India / JIBB',
            topic: 'Welcome Remarks',
            isBreak: false,
            detailsTitle: 'Overview',
            details: [
              'India Japan industrial cooperation',
              'Objectives of the seminar'
            ]
          },
          {
            time: '14:10-14:55',
            speaker: 'Invest India Representative',
            org: 'Invest India',
            topic: "India's Manufacturing Opportunity: Why India, Why Now",
            isBreak: false,
            detailsTitle: 'Topics Covered',
            details: [
              "Investment opportunities in India's manufacturing sector",
              "Growth outlook for machine tools and industrial machinery",
              "Semiconductor ecosystem development and opportunities",
              "Government incentives and policy support",
              "Industrial partnerships and joint venture opportunities",
              "Support available through Invest India and JIBB for market entry"
            ]
          },
          {
            time: '14:55-15:25',
            speaker: 'JIBB Representative',
            org: 'JIBB',
            topic: 'From Strategy to Setup: How JIBB Supports Successful Market Entry into India',
            isBreak: false,
            detailsTitle: 'Topics Covered',
            details: [
              "Selecting the right manufacturing location",
              "Identifying strategic joint ventures and business partners",
              "Understanding central and state government incentive schemes",
              "Regulatory requirements and compliance roadmap",
              "Licenses, approvals, and clearances required for manufacturing operations",
              "End to end project execution support",
              "Case study of a Japanese company's successful entry into India"
            ]
          },
          {
            time: '15:25-15:50',
            speaker: 'Association Speakers',
            org: 'JMTBA / SEAJ / JMF / JARA',
            topic: 'Industry Perspectives from Japanese Manufacturing Associations',
            isBreak: false,
            detailsTitle: 'Topics',
            details: [
              "Industry outlook",
              "Expectations from the Indian market",
              "Areas for India Japan industrial collaboration"
            ]
          },
          {
            time: '15:50-16:10',
            speaker: 'Invest India, JIBB & Association Reps',
            org: 'Panel',
            topic: 'Panel Discussion and Open Q&A',
            isBreak: false,
            detailsTitle: 'Discussion Themes',
            details: [
              "Opportunities and challenges for Japanese manufacturers in India",
              "Building successful India Japan partnerships",
              "Future outlook for manufacturing collaboration"
            ]
          },
          { time: '16:10-16:30', speaker: '', org: '', topic: 'Networking Session and Individual Consultations', isBreak: false, isHighlight: true },
          { time: '16:30', speaker: 'JIBB Representative', org: 'JIBB', topic: 'Closing Remarks', isBreak: false }
        ],
        organizer: "Invest India (Government of India)",
        coOrganizers: ["NPO Japan India Business Bureau (JIBB)"],
        specialSupport: "Japan-India Consulting Co., Ltd. (Secretariat)",
        supporters: [
          "Japan Machine Tool Builders' Association",
          "Semiconductor Equipment Association of Japan",
          "Japan Machinery Federation",
          "Japan Robot Association"
        ],
        specialCooperation: "",
        mediaPartner: "",
        secretariat: ""
      },
      ja: {
        tagline: "インド製造業の成長ストーリー（2026年7月3日）",
        title: "インド製造業の",
        titleHighlight: "成長ストーリーを紐解く",
        titleEnd: "セミナー",
        subtitle: "日本製造企業向け投資・パートナーシップ・市場参入機会",
        date: "2026年7月3日（金）",
        dateDay: "金曜日",
        time: "14:00〜17:00",
        receptionTime: "16:10〜16:30",
        venue: "銀座ブロッサム（中央会館）",
        venueAddress: "〒104-0061 東京都中央区銀座2-15-6 7階 マーガレット (TEL: 03-3542-8585)",
        access: "新富町駅（東京メトロ有楽町線）出口1から徒歩1分 | 東銀座駅（東京メトロ日比谷線・都営浅草線）出口5から徒歩6分",
        format: "対面（会場開催）",
        seminarCapacity: "80名",
        receptionCapacity: "",
        deadline: "7月3日（金）",
        overview: "インドは、力強い経済成長、拡大する国内需要、競争力のある生産能力、積極的な政府の政策に支えられ、世界で最も魅力的な製造業の目的地の一つとして浮上しています。\n\n本セミナーでは、日本の製造業企業に向けて、主要産業分野における投資機会、政策インセンティブ、パートナーシップモデル、市場参入経路に関する実用的な洞察を提供します。\n\n本セッションは、工作機械、半導体製造装置、ファクトリーオートメーション、産業機械、ロボット工学、精密機械工学、および高度な製造技術に携わる企業向けに特別に設計されています。",
        whoShouldAttend: [
          "工作機械",
          "産業機械",
          "半導体製造装置",
          "ファクトリーオートメーション",
          "ロボット工学",
          "精密工学",
          "先端製造技術"
        ],
        program: [
          { time: '13:30-14:00', speaker: '', org: '', topic: '受付・ネットワーキング', isBreak: true },
          {
            time: '14:00-14:10',
            speaker: 'インベスト・インディア / JIBB 代表者',
            org: 'Invest India / JIBB',
            topic: '開会挨拶・本セミナーの目的',
            isBreak: false,
            detailsTitle: '概要',
            details: [
              '日印産業協力の現状と方向性',
              '本セミナーの目的'
            ]
          },
          {
            time: '14:10-14:55',
            speaker: 'インベスト・インディア 代表者',
            org: 'Invest India',
            topic: 'インドの製造業における機会：なぜ今、インドなのか',
            isBreak: false,
            detailsTitle: '主なテーマ',
            details: [
              'インド製造業セクターにおける投資機会',
              '工作機械および産業機械の成長見通し',
              '半導体エコシステムの開発と機会',
              '政府のインセンティブと政策支援',
              '産業パートナーシップおよび合弁事業の機会',
              'インベスト・インディアおよびJIBBによる市場参入支援'
            ]
          },
          {
            time: '14:55-15:25',
            speaker: 'JIBB 代表者',
            org: 'JIBB',
            topic: '戦略から設立まで：JIBBが支援するインド市場への進出成功ロードマップ',
            isBreak: false,
            detailsTitle: '主なテーマ',
            details: [
              '適切な製造拠点の選定',
              '戦略的合弁パートナーおよびビジネスパートナーの特定',
              '中央政府および州政府のインセンティブ制度の理解',
              '規制要件とコンプライアンス・ロードマップ',
              '製造操業に必要な許認可・承認手続き',
              'エンドツーエンドのプロジェクト実行支援',
              '日本企業のインド進出成功事例ケーススタディ'
            ]
          },
          {
            time: '15:25-15:50',
            speaker: '各業界団体 代表者',
            org: 'JMTBA / SEAJ / JMF / JARA',
            topic: '日本の製造業関連団体からの業界動向・展望',
            isBreak: false,
            detailsTitle: 'トピック',
            details: [
              '業界の展望・ロードマップ',
              'インド市場への期待',
              '日印産業協力の重点分野'
            ]
          },
          {
            time: '15:50-16:10',
            speaker: 'インベスト・インディア、JIBB、業界団体代表者',
            org: 'パネルディスカッションと質疑応答',
            isBreak: false,
            detailsTitle: 'ディスカッションテーマ',
            details: [
              '在印日本系製造企業の機会と課題',
              '日印パートナーシップ構築の成功要因',
              '製造業における今後の協力関係の展望'
            ]
          },
          { time: '16:10-16:30', speaker: '', org: '', topic: 'ネットワーキング・個別相談会', isBreak: false, isHighlight: true },
          { time: '16:30', speaker: 'JIBB 代表者', org: 'JIBB', topic: '閉会挨拶', isBreak: false }
        ],
        organizer: "インベスト・インディア（インド政府）",
        coOrganizers: ["NPO法人 日本インドビジネスビューロー（JIBB）"],
        specialSupport: "日印コンサルティング株式会社",
        supporters: [
          "一般社団法人日本工作機械工業会",
          "一般社団法人日本半導体製造装置協会",
          "一般社団法人日本機械工業連合会",
          "一般社団法人日本ロボット工業会"
        ],
        specialCooperation: "",
        mediaPartner: "",
        secretariat: ""
      },
      posterEn: '/events/manufacturing-2026-en.png',
      posterJa: '/events/manufacturing-2026-ja.jpeg',
      registrationUrl: 'https://forms.office.com/r/d7tMkBLaq8',
      mapUrl: 'https://www.google.com/maps/place/Ginza+Blossom/@35.6705574,139.771239,17z/data=!3m1!4b1!4m6!3m5!1s0x60188be1c5545555:0xe1ec40d7c71d9d95!8m2!3d35.6705574!4d139.7738139!16s%2Fg%2F11b6d13v8s',
      flyerUrl: '/events/JIBB_Event_3_July_2026.pdf'
    },
    semicon: {
      id: 'semicon',
      en: {
        tagline: 'Semicon India 2026 (Sep 17-19, 2026)',
        title: '1st Exhibition Briefing &',
        titleHighlight: 'Semiconductor Market',
        titleEnd: 'Outlook Seminar',
        subtitle: 'Join us for an exclusive briefing on India\'s semiconductor market and the Japan Pavilion exhibition opportunity at Semicon India 2026 in New Delhi.',
        date: 'April 28, 2026',
        dateDay: 'Tuesday',
        time: '14:00 - 17:45',
        receptionTime: '17:45 - 19:30',
        venue: 'Plaza F, Tokyo',
        venueAddress: '15 Rokubancho, Chiyoda-ku, Tokyo 102-0085',
        format: 'Hybrid',
        seminarCapacity: '120',
        receptionCapacity: '60',
        deadline: 'April 24, 2026',
        program: [
          { time: '14:00-14:05', speaker: 'Mr. Tatsutoshi Suzuki (JISC Chairman / Toho Koki Chairman)', org: 'JISC', topic: 'Opening Remarks', isBreak: false },
          { time: '14:05-14:10', speaker: 'Mr. Yasuhiko Takeno (President & CEO)', org: 'GNC', topic: 'Greetings', isBreak: false },
          { time: '14:10-14:15', speaker: 'Mr. Ashok Chandak (President)', org: 'IESA', topic: 'Greetings (Online)', isBreak: false },
          { time: '14:15-14:45', speaker: 'Dr. Toshiro Doi (Kyushu Univ. Professor Emeritus / CMP Committee Founder)', org: 'CMP Committee', topic: 'Greetings & CMP Committee Introduction', isBreak: false },
          { time: '14:45-15:15', speaker: 'Mr. Hirokuni Hiyama (Ebara Corp. Technical Advisor / CMP Committee Honorary Chair)', org: 'CMP Committee', topic: 'Global Semiconductor Trends & CMP Equipment', isBreak: false },
          { time: '15:15-16:05', speaker: 'Mr. Ashok Chandak (President)', org: 'IESA', topic: 'India Market Status & Outlook (Online)', isBreak: false },
          { time: '16:05-16:10', speaker: '', org: '', topic: 'Semicon India 2026 Video Introduction', isBreak: true },
          { time: '16:10-16:25', speaker: 'TBA', org: 'IESA', topic: 'Semicon India 2026 Exhibition Details (Online)', isBreak: false },
          { time: '16:25-16:45', speaker: 'Mr. Takuya Nishimura (General Manager)', org: 'Toho Koki', topic: 'One Year Performance Evaluation After India Entry', isBreak: false },
          { time: '16:45-17:05', speaker: 'Mr. Norihisa Akitani (Director)', org: 'JISC', topic: 'Semicon India Trends', isBreak: false },
          { time: '17:05-17:25', speaker: 'Mr. Sai Chandra Teja (Green PMU COO / Indobox Partner / JISC Member)', org: 'Green PMU', topic: 'Accelerating Japan-India Semiconductor Industry', isBreak: false },
          { time: '17:25-17:35', speaker: 'Mr. Shigeru Yasui (CEO)', org: 'JIBB / JISC', topic: 'Japan Pavilion Benefits, JISC Functions, Business Center & IT Talent', isBreak: false },
          { time: '17:35-17:45', speaker: '', org: '', topic: 'Q&A Session', isBreak: true },
          { time: '17:45-19:30', speaker: '', org: '', topic: 'Reception (Networking Party)', isBreak: false, isHighlight: true }
        ],
        organizer: 'India Electronics & Semiconductor Association (IESA)',
        coOrganizers: ['NPO Japan India Business Bureau (JIBB)'],
        specialSupport: 'JSPE Planarization CMP Technical Committee',
        supporters: ['FOURIN Inc.', 'Indobox Inc.'],
        specialCooperation: 'Global Net Corporation (GNC)',
        mediaPartner: 'Nikkan Kogyo Shimbun',
        secretariat: 'Japan India Consulting (JIC)'
      },
      ja: {
        tagline: 'Semicon India 2026（2026年9月17日〜19日 / ニューデリー）',
        title: '第一回 出展説明会 及び',
        titleHighlight: 'インド半導体市場の現状と展望',
        titleEnd: 'セミナー',
        subtitle: 'インド市場への具体的な進出方法 ―「セミコンインディア2026ジャパンパビリオン出展募集」―',
        date: '2026年4月28日',
        dateDay: '火曜日',
        time: '14:00〜17:45',
        receptionTime: '17:45〜19:30',
        venue: 'プラザエフ（東京）',
        venueAddress: '〒102-0085 東京都千代田区六番町15番地',
        format: 'ハイブリッド（会場＋オンライン）',
        seminarCapacity: '120名',
        receptionCapacity: '60名',
        deadline: '4月24日（金）',
        program: [
          { time: '14:00-14:05', speaker: '鈴木辰俊 氏（JISC会長 / 東邦鋼機製作所 会長）', org: 'JISC', topic: '開会挨拶', isBreak: false },
          { time: '14:05-14:10', speaker: '武野泰彦 氏（代表取締役社長）', org: 'GNC', topic: 'ご挨拶', isBreak: false },
          { time: '14:10-14:15', speaker: 'Ashok Chandak 氏（President）', org: 'IESA', topic: 'ご挨拶（オンライン）', isBreak: false },
          { time: '14:15-14:45', speaker: '土肥俊郎 氏（九州大学 名誉教授 / CMP専門委員会 創設者・名誉会長）', org: 'CMP専門委員会', topic: 'ご挨拶 ― CMP専門委員会の設立経緯・紹介', isBreak: false },
          { time: '14:45-15:15', speaker: '檜山浩國 氏（荏原製作所 技監 / CMP専門委員会 名誉委員長）', org: 'CMP専門委員会', topic: '半導体世界情勢とCMP装置', isBreak: false },
          { time: '15:15-16:05', speaker: 'Ashok Chandak 氏（President）', org: 'IESA', topic: 'インド市場の現状と展望（オンライン）', isBreak: false },
          { time: '16:05-16:10', speaker: '', org: '', topic: 'Semicon India 2026 ビデオ紹介', isBreak: true },
          { time: '16:10-16:25', speaker: '※登壇者名は後日確定', org: 'IESA', topic: 'Semicon India 2026 展示会説明（オンライン）', isBreak: false },
          { time: '16:25-16:45', speaker: '西村拓也 氏（事業統括部長）', org: '東邦鋼機製作所', topic: 'インド進出から一年での実績評価', isBreak: false },
          { time: '16:45-17:05', speaker: '穐谷宜親 氏（ディレクター）', org: 'JISC', topic: 'インドセミコンの流れ', isBreak: false },
          { time: '17:05-17:25', speaker: 'サイ・チャンドラ・テジャ 氏（Green PMU COO / Indobox パートナー / JISC委員）', org: 'Green PMU', topic: '日印間での半導体産業を加速させるための提案・方法・高度人材について', isBreak: false },
          { time: '17:25-17:35', speaker: '安井重麿 氏（CEO）', org: 'JIBB / JISC', topic: 'ジャパンパビリオンのメリット、JISCの機能紹介、日印半導体ビジネスセンター開設、インドIT人材の雇用について', isBreak: false },
          { time: '17:35-17:45', speaker: '', org: '', topic: '質疑応答', isBreak: true },
          { time: '17:45-19:30', speaker: '', org: '', topic: 'レセプション（懇親会）', isBreak: false, isHighlight: true }
        ],
        organizer: 'インド電子・半導体工業会（IESA）',
        coOrganizers: ['NPO法人 日本インドビジネスビューロー（JIBB）'],
        specialSupport: '精密工学会「プラナリゼーションCMPとその応用専門委員会」',
        supporters: ['株式会社FOURIN（フォーイン）', 'Indobox株式会社'],
        specialCooperation: 'グローバルネット株式会社（GNC）',
        mediaPartner: '日刊工業新聞（予定）',
        secretariat: '日印コンサルティング株式会社（JIC）'
      },
      posterEn: '/events/semicon-india-2026-en.png',
      posterJa: '/events/semicon-india-2026-ja.jpeg',
      registrationUrl: 'https://forms.office.com/r/0F9ajnDpp2'
    },
    mobility: {
      id: 'mobility',
      en: {
        tagline: 'Bharat Mobility 2027 (Feb 4-7, 2027)',
        title: '4th Bharat Mobility 2027 &',
        titleHighlight: 'India Automotive Business',
        titleEnd: 'Entry Seminar',
        subtitle: 'ACMA delegation visits Japan! Learn about India\'s automotive market outlook and entry methods, plus the Bharat Mobility 2027 exhibition opportunity.',
        date: 'May 11, 2026',
        dateDay: 'Monday',
        time: '14:00 - 17:50',
        receptionTime: '',
        venue: 'Ginza Blossom, Tokyo',
        venueAddress: '2-15-6 Ginza, Chuo-ku, Tokyo 104-0061',
        format: 'Hybrid',
        seminarCapacity: '200',
        receptionCapacity: '',
        deadline: 'April 30, 2026',
        program: [
          { time: '14:00-14:05', speaker: 'Yosuke Yanagase', org: 'JIBB', topic: 'Opening Remarks', isBreak: false },
          { time: '14:05-14:25', speaker: 'Masashi Kono', org: 'JETRO', topic: 'Support for Japanese Companies Entering India', isBreak: false },
          { time: '14:25-14:45', speaker: 'TBA', org: 'JAPIA', topic: 'JAPIA\'s India Market Initiatives', isBreak: false },
          { time: '14:45-15:00', speaker: 'Vinnie Mehta (Director General)', org: 'ACMA', topic: 'Greetings from ACMA (Online)', isBreak: false },
          { time: '15:00-15:40', speaker: 'Lokesh Raina (Deputy Executive Director)', org: 'ACMA', topic: 'India Automotive Industry Outlook', isBreak: false },
          { time: '15:40-16:10', speaker: 'Tetsuo Kubo & Kazuaki Funahashi', org: 'FOURIN', topic: 'Middle East Situation Impact & India Automotive Market Report', isBreak: false },
          { time: '16:10-16:40', speaker: 'Lokesh Raina', org: 'ACMA', topic: 'Bharat Mobility 2027 Exhibition Guide', isBreak: false },
          { time: '16:40-17:10', speaker: 'Masatoshi Nishimoto', org: 'S&P Global Mobility', topic: 'India Market Mid-to-Long Term Forecast', isBreak: false },
          { time: '17:10-17:40', speaker: 'Seiichi Kondo', org: 'Resonac', topic: 'Why is Semiconductor Industry Profitability High? Comparison with Automotive', isBreak: false },
          { time: '17:40-17:50', speaker: '', org: '', topic: 'Q&A', isBreak: false, isHighlight: true }
        ],
        organizer: 'Automotive Component Manufacturers Association of India (ACMA)',
        coOrganizers: [],
        specialSupport: 'Japan Auto Parts Industries Association (JAPIA)',
        supporters: ['NPO Japan India Business Bureau (JIBB)'],
        specialCooperation: 'FOURIN Inc., S&P Global Mobility, JISC',
        mediaPartner: 'Nikkan Kogyo Shimbun',
        secretariat: 'Japan India Consulting (JIC)'
      },
      ja: {
        tagline: 'Bharat Mobility 2027（2027年2月4日〜7日）',
        title: '第4回 Bharat Mobility 2027 &',
        titleHighlight: 'インド自動車ビジネス',
        titleEnd: '進出セミナー',
        subtitle: 'インド自動車産業 〜市場展望と進出方法〜 インド自動車部品工業会（ACMA）来日！',
        date: '2026年5月11日',
        dateDay: '月曜日',
        time: '14:00〜17:50',
        receptionTime: '',
        venue: '銀座ブロッサム（中央会館）会議室「マーガレット」',
        venueAddress: '〒104-0061 東京都中央区銀座2-15-6',
        format: 'ハイブリッド（会場＋オンライン）',
        seminarCapacity: '200名',
        receptionCapacity: '',
        deadline: '4月30日（木）',
        program: [
          { time: '14:00-14:05', speaker: '柳ヶ瀨 洋介 氏（名誉理事）', org: 'JIBB', topic: '開会挨拶', isBreak: false },
          { time: '14:05-14:25', speaker: '河野 将史 氏（調査部主幹）', org: 'JETRO', topic: 'インドにおける日本企業の進出支援など', isBreak: false },
          { time: '14:25-14:45', speaker: 'TBA', org: 'JAPIA', topic: 'インド市場に向けてのJAPIAの取り組み', isBreak: false },
          { time: '14:45-15:00', speaker: 'Vinnie Mehta 氏（Director General）', org: 'ACMA', topic: 'ACMAからの挨拶（オンライン）', isBreak: false },
          { time: '15:00-15:40', speaker: 'Lokesh Raina 氏（Deputy Executive Director）', org: 'ACMA', topic: 'インド自動車産業展望', isBreak: false },
          { time: '15:40-16:10', speaker: '久保 鉄男 氏 & 舟橋 一晃 氏', org: 'フォーイン', topic: '中東有事の影響について & インド自動車市場の報告', isBreak: false },
          { time: '16:10-16:40', speaker: 'Lokesh Raina 氏', org: 'ACMA', topic: 'Bharat Mobility 2027 出展案内', isBreak: false },
          { time: '16:40-17:10', speaker: '西本 真敏 氏（ダイレクター）', org: 'S&P Global Mobility', topic: 'インド市場の中長期 未来市場予測', isBreak: false },
          { time: '17:10-17:40', speaker: '近藤 誠一 氏', org: 'レゾナック', topic: '半導体産業の利益率はどうして高いのか？自動車産業と比較してみる', isBreak: false },
          { time: '17:40-17:50', speaker: '', org: '', topic: '質疑応答', isBreak: false, isHighlight: true }
        ],
        organizer: 'インド自動車部品工業会（ACMA）',
        coOrganizers: [],
        specialSupport: '日本自動車部品工業会（JAPIA）',
        supporters: ['NPO法人日本インドビジネスビューロー（JIBB）'],
        specialCooperation: '株式会社フォーイン / S&P Global Mobility / 日印半導体コミッティ（JISC）',
        mediaPartner: '日刊工業新聞社（予定）',
        secretariat: '日印コンサルティング株式会社（JIC）'
      },
      posterEn: '/events/bharat-mobility-2027-en.png',
      posterJa: '/events/bharat-mobility-2027-ja.jpeg',
      registrationUrl: 'https://forms.office.com/r/UbXevM8d3Y'
    }
  }

  const activeEventData = events[activeEvent] as unknown as EventData
  const t = activeEventData[locale as 'en' | 'ja']
  const currentPoster = posterLang === 'ja' ? activeEventData.posterJa : activeEventData.posterEn

  const getEventPartnerLogos = () => {
    const names: string[] = []
    if (t.organizer) names.push(t.organizer)
    if (t.coOrganizers) names.push(...t.coOrganizers)
    if (t.specialSupport) names.push(t.specialSupport)
    if (t.supporters) names.push(...t.supporters)
    if (t.specialCooperation) names.push(t.specialCooperation)
    if (t.mediaPartner) names.push(t.mediaPartner)
    if (t.secretariat) names.push(t.secretariat)

    const uniqueLogos: { name: string; src: string }[] = []
    const seen = new Set<string>()

    names.forEach(name => {
      const logo = getPartnerLogo(name)
      if (logo && !seen.has(logo)) {
        seen.add(logo)
        uniqueLogos.push({ name, src: logo })
      }
    })

    return uniqueLogos
  }

  const partnerLogos = getEventPartnerLogos()
  // Ensure we have at least 15 items in the marquee list for smooth infinite scrolling
  const marqueeItems = partnerLogos.length > 0
    ? Array(Math.ceil(15 / partnerLogos.length)).fill(partnerLogos).flat()
    : []

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
      register: 'Register Now',
      viewProgram: 'View Program',
      organizer: 'Organizer',
      coOrganizers: 'Co-organizers',
      specialSupport: 'Special Support',
      supporters: 'Supporters',
      specialCoop: 'Special Cooperation',
      mediaPartner: 'Media Partner',
      secretariat: 'Secretariat'
    },
    ja: {
      pageTitle: '開催予定イベント',
      pageSubtitle: '日印ビジネスセミナー 2026',
      programTitle: 'プログラム',
      organizersTitle: '主催・後援',
      venueTitle: '会場・アクセス',
      contactTitle: 'お問い合わせ',
      contactOrg: 'NPO法人 日本インドビジネスビューロー（JIBB）/ 日印コンサルティング株式会社',
      contactEmail: 'trade@ji-consulting.jp',
      travelDesc: '国内の主要都市における中心駅と空港との距離',
      openMaps: 'Google マップで開く',
      time: '時間',
      reception: '懇親会',
      capacity: '定員',
      deadline: '開催日',
      register: '参加申込',
      viewProgram: 'プログラム',
      organizer: '主催',
      coOrganizers: '共催',
      specialSupport: '特別後援',
      supporters: '後援',
      specialCoop: '特別協力',
      mediaPartner: '協力メディア',
      secretariat: '運営事務局'
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
            className={`events-tab ${activeEvent === 'manufacturing' ? 'active manufacturing' : ''}`}
            onClick={() => setActiveEvent('manufacturing')}
            style={jpFont}
          >
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <span>Manufacturing 2026</span>
          </button>
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

      {/* Parallax Header Section (Only for Manufacturing 2026 tab) */}
      {activeEvent === 'manufacturing' && (
        <ParallaxHeader />
      )}

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
          <div className="events-hero-buttons">
            <a
              href={activeEventData.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="events-btn events-btn-register"
            >
              <span className="material-symbols-outlined">edit_note</span>
              {labels.register}
            </a>
            <a
              href="#program"
              className="events-btn events-btn-secondary"
            >
              <span className="material-symbols-outlined">schedule</span>
              {labels.viewProgram}
            </a>
            {activeEventData.flyerUrl && (
              <a
                href={activeEventData.flyerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="events-btn events-btn-secondary"
              >
                <span className="material-symbols-outlined">picture_as_pdf</span>
                {locale === 'ja' ? 'チラシ (PDF)' : 'Brochure (PDF)'}
              </a>
            )}
          </div>
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

      {/* Overview and Who Should Attend Section */}
      {(t.overview || t.whoShouldAttend) && (
        <section className="events-overview-container">
          {t.overview && (
            <motion.div
              className="events-overview-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromLeft}
            >
              <h3 style={jpFont}>{locale === 'ja' ? 'イベント概要' : 'Event Overview'}</h3>
              <div className="events-overview-text" style={jpFont}>
                {t.overview}
              </div>
            </motion.div>
          )}
          {t.whoShouldAttend && t.whoShouldAttend.length > 0 && (
            <motion.div
              className="events-overview-right"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromRight}
            >
              <h3 style={jpFont}>{locale === 'ja' ? '対象となる企業' : 'Who Should Attend'}</h3>
              <motion.ul className="events-attendee-list" variants={staggerOnScroll} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {t.whoShouldAttend.map((item: string, idx: number) => (
                  <motion.li key={idx} className="events-attendee-item" style={jpFont} variants={fadeInUp}>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </section>
      )}

      {/* PDF Viewer Section */}
      {/* {activeEventData.flyerUrl && (
        <section className="events-pdf-section">
          <div className="events-pdf-header">
            <h3 style={jpFont}>{locale === 'ja' ? 'イベントフライヤー' : 'Event Flyer'}</h3>
            <a
              href={activeEventData.flyerUrl}
              download
              className="events-pdf-download-btn"
              title={locale === 'ja' ? 'ダウンロード' : 'Download PDF'}
            >
              <span className="material-symbols-outlined">download</span>
              <span>{locale === 'ja' ? 'ダウンロード' : 'Download'}</span>
            </a>
          </div>
          <div className="events-pdf-viewer">
            <iframe
              src={`${activeEventData.flyerUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title={locale === 'ja' ? 'イベントフライヤー' : 'Event Flyer'}
              className="events-pdf-iframe"
            />
          </div>
        </section>
      )} */}

      {/* Program Section - Table Style */}
      <motion.section
        className="events-program"
        id="program"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerOnScroll}
      >
        <motion.div className="events-section-header" variants={fadeInUp}>
          <h2 className="events-section-title" style={jpFont}>{labels.programTitle}</h2>
          <span className="events-section-date">{t.date}</span>
        </motion.div>

        <div className="events-table-header">
          <span>{locale === 'ja' ? '時間' : 'Time'}</span>
          <span>{locale === 'ja' ? 'セッション' : 'Session'}</span>
          <span>{locale === 'ja' ? '組織' : 'Organization'}</span>
        </div>

        <div className="events-program-table">
          {t.program.map((item, index) => {
            const hasDetails = !!item.details && item.details.length > 0
            const isExpanded = !!expandedRows[`${activeEvent}-${index}`]

            return (
              <motion.div
                key={index}
                className={`events-table-row ${item.isBreak ? 'minimal' : ''} ${item.isHighlight ? 'highlight' : ''} ${hasDetails ? 'collapsible' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={() => hasDetails && toggleRow(activeEvent, index)}
                style={{ '--card-index': index, ...(hasDetails ? { cursor: 'pointer' } : {}) } as React.CSSProperties}
                custom={index}
                variants={programRowVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="events-table-time">{item.time}</div>
                <div className="events-table-content">
                  <div className="events-table-topic-wrapper">
                    <h4 className="events-table-topic" style={jpFont}>{item.topic}</h4>
                    {hasDetails && (
                      <span className={`material-symbols-outlined dropdown-indicator ${isExpanded ? 'rotated' : ''}`}>
                        expand_more
                      </span>
                    )}
                  </div>
                  {item.speaker && <p className="events-table-speaker"><strong>{item.speaker}</strong></p>}

                  {hasDetails && (
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                      className="events-table-details-wrapper"
                    >
                      <div className="events-table-details" onClick={(e) => e.stopPropagation()}>
                        <p className="events-details-title" style={jpFont}><strong>{item.detailsTitle}:</strong></p>
                        <ul className="events-details-list">
                          {item.details?.map((detail, dIdx) => (
                            <li key={dIdx} style={jpFont}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="events-table-org">
                  {item.org && <span className="events-org-badge">{item.org}</span>}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Partners Marquee Section */}
      <motion.section
        className="events-partners-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleIn}
      >
        <motion.div className="events-partners-section-header" variants={fadeInUp}>
          <p className="events-banner-tag">{locale === 'ja' ? 'パートナー' : 'Our Partners'}</p>
          <h2 className="events-banner-title" style={jpFont}>{labels.organizersTitle}</h2>
        </motion.div>

        <div className="events-partners-marquee">
          <div className="events-partners-track">
            {marqueeItems.map((logo, index) => (
              <div key={index} className="events-partner-logo-item">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={80}
                  className="events-partner-marquee-img"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enquiries Section */}
      <section className="events-enquiries-section">
        <div className="events-contact-inner">
          <motion.div
            className="events-contact-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <div className="events-contact-icon">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h3 className="events-contact-title" style={jpFont}>
                {locale === 'ja' ? 'お問合せ' : 'Enquiries'}
              </h3>
              <p className="events-contact-subtitle" style={jpFont}>
                {locale === 'ja' ? '主催：日印コンサルティング株式会社' : 'Organised by: Japan-India Consulting Co., Ltd.'}
              </p>
            </div>
          </motion.div>

          <div className="events-contact-grid">
            <motion.div
              className="events-contact-person"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromLeft}
            >
              <h4 className="events-person-name" style={jpFont}>{locale === 'ja' ? '安井' : 'Yasui'}</h4>
              <div className="events-person-detail">
                <span className="material-symbols-outlined">phone</span>
                <a href="tel:090-9325-3456">090-9325-3456</a>
              </div>
              <div className="events-person-detail">
                <span className="material-symbols-outlined">mail</span>
                <a href="mailto:yasui@ji-consulting.jp">yasui@ji-consulting.jp</a>
              </div>
            </motion.div>

            <motion.div
              className="events-contact-person"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideFromRight}
            >
              <h4 className="events-person-name" style={jpFont}>{locale === 'ja' ? '橋倉' : 'Hashikura'}</h4>
              <div className="events-person-detail">
                <span className="material-symbols-outlined">phone</span>
                <a href="tel:080-6516-4331">080-6516-4331</a>
              </div>
              <div className="events-person-detail">
                <span className="material-symbols-outlined">mail</span>
                <a href="mailto:trade@ji-consulting.jp">trade@ji-consulting.jp</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Venue Section - Full Bleed Style */}
      <section className="events-venue">
        <motion.div
          className="events-venue-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={scaleIn}
        >
          <p className="events-banner-tag">{locale === 'ja' ? '会場・アクセス' : 'Location & Access'}</p>
          <h2 className="events-banner-title" style={jpFont}>{labels.venueTitle}</h2>
          <p className="events-venue-name-hero">{t.venue}</p>
        </motion.div>

        <div className="events-venue-split">
          <div className="events-venue-details">
            <motion.div
              className="events-detail-row"
              custom={0}
              variants={venueRowVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? '住所' : 'Address'}</p>
                <p className="events-detail-value" style={jpFont}>{t.venue}</p>
                <p className="events-detail-sub">{t.venueAddress}</p>
                <a
                  href={activeEventData.mapUrl || "https://maps.google.com"}
                  className="events-map-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.openMaps}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="events-detail-row"
              custom={1}
              variants={venueRowVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">train</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? 'アクセス' : 'Access'}</p>
                {t.access ? (
                  t.access.split('|').map((item: string, idx: number) => (
                    <p key={idx} className="events-detail-value" style={idx > 0 ? { marginTop: '0.35rem' } : {}}>
                      {item.trim()}
                    </p>
                  ))
                ) : (
                  <p className="events-detail-value">
                    {locale === 'ja' ? '最寄り駅から徒歩5分' : '5 min walk from nearest station'}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              className="events-detail-row"
              custom={2}
              variants={venueRowVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="events-detail-icon">
                <span className="material-symbols-outlined">flight</span>
              </div>
              <div className="events-detail-content">
                <p className="events-detail-label">{locale === 'ja' ? '空港から' : 'From Airport'}</p>
                <p className="events-detail-value">{t.airport || (locale === 'ja' ? '成田から約60分、羽田から約30分' : '~60 min from Narita, ~30 min from Haneda')}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="events-travel-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
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
          </motion.div>
        </div>

        {/* Contact Footer */}
        <motion.div
          className="events-contact-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

      </section>

      <Footer />
    </>
  )
}
