'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { Navbar, Footer } from '@/components'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerSlow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
}

const services = [
  { icon: 'handshake', en: 'Consulting & Marketing', ja: 'コンサルティング＆マーケティング', descEn: 'Sales strategy, planning, management, and implementation support', descJa: '販売戦略、企画、管理、実施の支援' },
  { icon: 'search', en: 'Market Research', ja: '市場調査', descEn: 'Decision-making flow analysis and industry trend monitoring', descJa: '意思決定フローの分析と業界動向のモニタリング' },
  { icon: 'campaign', en: 'Promotion', ja: 'プロモーション', descEn: 'Pre-exhibition PR and strategic meeting setup', descJa: '展示会前のPRと戦略的ミーティングの設定' },
  { icon: 'store', en: 'Exhibitions', ja: '展示会', descEn: 'Selection, planning, design, setup, and production', descJa: '選定、企画、デザイン、設営、制作' },
  { icon: 'groups', en: 'Seminars & Conferences', ja: 'セミナー＆カンファレンス', descEn: 'Planning and management of industry events and academic conferences', descJa: '業界イベントおよび学術会議の企画・運営' },
  { icon: 'local_shipping', en: 'Trade & Logistics', ja: '貿易＆物流', descEn: 'Trade practices, logistics coordination, and installation', descJa: '貿易実務、物流調整、設置' },
  { icon: 'apartment', en: 'Incorporation', ja: '法人設立', descEn: 'Office, showroom, and factory establishment proposals', descJa: 'オフィス・ショールーム・工場設立の提案' },
  { icon: 'verified', en: 'BIS Acquisition', ja: 'BIS取得支援', descEn: 'BIS certification support in the machine tool field', descJa: '工作機械分野のBIS認証取得支援' },
  { icon: 'engineering', en: 'Human Resources', ja: '人材支援', descEn: 'Technical instructors, engineers, and system engineers', descJa: '技術指導員、エンジニア、システムエンジニア' },
  { icon: 'hub', en: 'Business Matching', ja: 'ビジネスマッチング', descEn: 'Introductions to R&D and key decision makers', descJa: 'R&Dおよびキーパーソンへの紹介' },
]

const hubPillars = [
  {
    icon: 'school',
    en: { title: 'Academic Synergy', desc: 'Indian & Japanese academic institutions provide high-risk experimentation and early-stage technical know-how.' },
    ja: { title: 'アカデミアの相乗効果', desc: '日印両国の学術機関が緊密に連携し、ハイリスクな研究開発や初期段階の技術ノウハウを提供。' }
  },
  {
    icon: 'corporate_fare',
    en: { title: 'Corporate Synergy', desc: 'Corporate partners provide market scale, rapid pathway integration, and global pathways for commercial success.' },
    ja: { title: '企業の相乗効果', desc: '企業パートナーが市場規模、迅速なプロセス統合、そして商業的成功に向けたグローバルな展開手段を提供。' }
  },
  {
    icon: 'precision_manufacturing',
    en: { title: 'High-Tech Infrastructure', desc: 'Specialized wet labs, fabrication tools, testing & verification labs, and technical libraries.' },
    ja: { title: 'ハイテクインフラ', desc: '専門のウェットラボ、製造ツール、テスト・検証ラボ、技術ライブラリ。' }
  },
  {
    icon: 'rocket_launch',
    en: { title: 'TRL Lifecycle Pipeline', desc: 'From nascent research (TRL 1-3) to validation (TRL 4-6) to commercial scaling (TRL 7-9).' },
    ja: { title: 'TRLライフサイクルパイプライン', desc: '初期研究（TRL 1-3）から検証・実証（TRL 4-6）、そして商業的スケーリング（TRL 7-9）まで一気通貫で支援。' }
  },
]

const purposes = [
  {
    icon: 'handshake',
    en: { title: 'Japanese Corporate Collaboration', desc: 'Accelerating collaboration in both domestic and global markets through partnerships with international organizations, supported by exhibitions, industry conferences, and government-led initiatives.' },
    ja: { title: '日本企業との協業推進', desc: '展示会、業界カンファレンス、政府主導の取り組みを通じて、国際機関とのパートナーシップにより国内外の市場における協業を加速。' }
  },
  {
    icon: 'public',
    en: { title: 'India-International Cooperation', desc: 'Promoting technology collaboration and company matching between Indian and international companies and academic institutions, along with industry-academia-government collaboration.' },
    ja: { title: 'グローバル連携の促進', desc: 'インド企業とグローバル企業・学術機関の間の技術協力や企業マッチング、産学官連携の推進。' }
  },
  {
    icon: 'trending_up',
    en: { title: 'Market Trend Research', desc: 'Research on market and technology trends in the Indian semiconductor and electronic components industry, providing information difficult to obtain through media sources.' },
    ja: { title: '市場動向調査', desc: 'メディアでは入手困難なインド半導体・電子部品業界の市場・技術動向の調査と情報提供。' }
  },
  {
    icon: 'biotech',
    en: { title: 'Technology Development', desc: 'Promotion of technology transfer, licensing, and collaboration opportunities for joint ventures, enhancing inter-country development through regular technical presentations.' },
    ja: { title: '技術共同開発の促進', desc: '技術移転やライセンス供与、合弁事業（JV）立ち上げ等の協業機会を創出。定期的な技術発表会を通じた日印相互の開発力強化。' }
  },
  {
    icon: 'storefront',
    en: { title: 'Marketing & Promotion', desc: 'Inter-company collaboration in marketing and promotion in the Indian market overcomes the limitations of entering the market alone. Working as a unified effort.' },
    ja: { title: 'マーケティング＆プロモーション', desc: 'インド市場におけるマーケティング・プロモーションの企業間アライアンスを構築し、単独参入による限界を克服。一体となった取り組みを推進。' }
  },
]

const associations = [
  {
    logo: '/jisc/iesa_logo.png',
    en: { name: 'Indian Electronics and Semiconductor Association (IESA)', desc: 'India\'s premier industry body representing the ESDM and semiconductor sectors, with 300+ member companies driving policy advocacy, talent development, and startup support.' },
    ja: { name: 'インド電子・半導体工業会 (IESA)', desc: '300社以上の会員企業を擁し、ESDM・半導体分野を代表するインドの主要業界団体。政策提言、人材育成、スタートアップ支援を推進。' }
  },
  {
    logo: '/jisc/imtma-logo.png',
    en: { name: 'Indian Machine Tool Builders\' Association (IMTMA)', desc: 'Founded in 1946, representing ~460 companies including machine tool manufacturers, tooling companies, and trading organizations. Organizer of IMTEX exhibition.' },
    ja: { name: 'インド工作機械工業会 (IMTMA)', desc: '1946年設立。工作機械メーカー、工具会社、商社など約460社で構成。IMTEX展示会の主催者。' }
  },
  {
    logo: '/jisc/amttf-logo.jpg',
    en: { name: 'Advanced Machine Tool Testing Facility (AMTTF)', desc: 'A center for machine tool testing, evaluation, and technology development operating with ISO 9001:2015 certification and world-class testing infrastructure.' },
    ja: { name: '先進工作機械試験施設 (AMTTF)', desc: 'ISO 9001:2015認証を取得し、世界クラスの試験インフラを備えた工作機械の試験・評価・技術開発センター。' }
  },
  {
    logo: '/jisc/icc-logo.jpg',
    en: { name: 'Indian Chemistry Council (ICC)', desc: 'Founded in 1938 with 150+ member companies representing organic/inorganic chemicals, petrochemicals, plastics, dyes, fertilizers, pesticides, and specialty chemicals.' },
    ja: { name: 'インド化学評議会 (ICC)', desc: '1938年設立。有機・無機化学、石油化学、プラスチック、染料、肥料、農薬、機能性化学品分野の企業150社以上で構成。' }
  },
  {
    logo: '/jisc/jspe-logo.png',
    en: { name: 'Japan Society for Precision Engineering (JSPE)', desc: 'Founded in 1933, specializing in precision engineering with members from universities, research institutes, and industry. Covers design systems, mechatronics, and nano-technology.' },
    ja: { name: '精密工学会 (JSPE)', desc: '1933年設立。大学・研究機関・産業界のメンバーで構成される精密工学の学術団体。設計システム、メカトロニクス、ナノテクノロジーを網羅。' }
  },
  {
    logo: '/jisc/widegap-logo.png',
    en: { name: 'Wide-Gap Semiconductor Society (WideG)', desc: 'Promotes R&D and social implementation of light-emitting and electronic devices using wide-bandgap semiconductors such as SiC and GaN.' },
    ja: { name: 'ワイドギャップ半導体学会 (WideG)', desc: 'SiCやGaN等のワイドバンドギャップ半導体を活用した発光デバイスおよび電子デバイスのR&Dと社会実装を推進。' }
  }
]

const supportedLogos = [
  { name: 'India Semiconductor Mission', src: '/jisc/govt-backed/india-semiconductor-mission-logo.png' },
  { name: 'Invest India', src: '/jisc/govt-backed/invest-india-logo.png' },
  { name: 'Invest UP', src: '/jisc/govt-backed/invest-up-logo.jpg' },
  { name: 'Guidance Tamil Nadu', src: '/jisc/govt-backed/guidance-tamilnadu-logo.png' },
  { name: 'CII', src: '/jisc/govt-backed/cii-logo.png' },
  { name: 'IESA', src: '/jisc/govt-backed/iesa-logo.webp' },
  { name: 'ELCINA', src: '/jisc/govt-backed/elcina-logo.jpg' }
]

const officeSpaces = [
  { icon: 'display_settings', en: 'Display Area', ja: 'ディスプレイエリア', image: '/jisc/display-area.jpg' },
  { icon: 'groups', en: 'Conference Room', ja: '会議室', image: '/jisc/conference-room.jpg' },
  { icon: 'desktop_windows', en: 'Workstation', ja: 'ワークステーション', image: '/jisc/workstation.jpg' }
]

interface CompanyData {
  name: string;
  about: string;
  sectors: string[];
  readMore: string;
  state: string;
  products: string[];
  address: string;
}

interface Company {
  website: string;
  logo: string;
  side: 'Japan' | 'India';
  objectives: ('Sale' | 'Procurement' | 'Joint Venture' | 'Technical tie-up' | 'Other')[];
  en: CompanyData;
  ja: CompanyData;
}

const memberCompanies: Company[] = [
  {
    website: 'https://www.companya.com',
    logo: '',
    side: 'Japan',
    objectives: ['Sale'],
    en: {
      name: 'Company A',
      about: 'Precision manufacturer of industrial machinery parts and system components.',
      sectors: ['Industrial Machinery', 'Precision Parts'],
      readMore: 'Specializing in the development and wholesale supply of advanced industrial machinery parts to top manufacturing hubs globally.',
      state: 'Tokyo',
      products: ['Industrial machinery parts'],
      address: '1-2-3 Marunouchi, Tokyo'
    },
    ja: {
      name: '株式会社A',
      about: '産業機械部品およびシステムコンポーネントの精密製造会社。',
      sectors: ['産業用機械', '精密部品'],
      readMore: '最先端の産業機械部品を開発し、世界中の主要な製造拠点へ卸売供給することを専門としています。',
      state: '東京都',
      products: ['産業機械部品'],
      address: '東京都千代田区丸の内1-2-3'
    }
  },
  {
    website: 'https://www.companyb.com',
    logo: '',
    side: 'Japan',
    objectives: ['Technical tie-up'],
    en: {
      name: 'Company B',
      about: 'High-tech innovator designing next-generation automotive electronic components.',
      sectors: ['Automotive Electronics', 'Sensors'],
      readMore: 'Pioneering smart mobility solutions and advanced driver-assistance system (ADAS) components through global research partnerships.',
      state: 'Osaka',
      products: ['Automotive electronic components'],
      address: '4-5-6 Umeda, Osaka'
    },
    ja: {
      name: '株式会社B',
      about: '次世代の自動車用電子部品を設計・製造するハイテクイノベーター。',
      sectors: ['自動車用電子機器', 'センサー'],
      readMore: 'グローバルな研究提携を通じて、スマートモビリティソリューションおよび先進運転支援システム（ADAS）用部品を開拓しています。',
      state: '大阪府',
      products: ['自動車用電子部品'],
      address: '大阪府大阪市北区梅田4-5-6'
    }
  },
  {
    website: 'https://www.companyc.com',
    logo: '',
    side: 'India',
    objectives: ['Procurement'],
    en: {
      name: 'Company C',
      about: 'Premier manufacturer and exporter of sustainable textile and garment products.',
      sectors: ['Textile Manufacturing', 'Export'],
      readMore: 'Leading supplier of eco-friendly fabrics and garments to major fashion houses across Japan and the Asia-Pacific region.',
      state: 'Maharashtra',
      products: ['Textile and garment products'],
      address: '12 MG Road, Mumbai'
    },
    ja: {
      name: '企業C',
      about: '持続可能な繊維および衣類製品の主要な製造・輸出企業。',
      sectors: ['繊維製造', '輸出業'],
      readMore: '日本およびアジア太平洋地域の主要なファッションハウスへ、環境に優しい布地とアパレル製品を供給するリーディングカンパニー。',
      state: 'マハラシュトラ州',
      products: ['繊維・衣類製品'],
      address: 'インド国マハラシュトラ州ムンバイ MGロード12番地'
    }
  },
  {
    website: 'https://www.companyd.com',
    logo: '',
    side: 'India',
    objectives: ['Joint Venture'],
    en: {
      name: 'Company D',
      about: 'Leading digital transformation firm specializing in IT software services and cloud solutions.',
      sectors: ['IT Services', 'Cloud Computing', 'AI Solutions'],
      readMore: 'Delivering end-to-end software engineering, data analytics, and enterprise technology integration services to global businesses.',
      state: 'Karnataka',
      products: ['IT software services'],
      address: '88 Brigade Road, Bengaluru'
    },
    ja: {
      name: '企業D',
      about: 'ITソフトウェアサービスとクラウドソリューションを専門とする、デジタル変革のリーディング企業。',
      sectors: ['ITサービス', 'クラウドコンピューティング', 'AIソリューション'],
      readMore: '世界中のビジネス向けに、エンドツーエンドのソフトウェア開発、データ分析、およびエンタープライズ技術統合サービスを提供しています。',
      state: 'カルナタカ州',
      products: ['ITソフトウェアサービス'],
      address: 'インド国カルナタカ州ベンガルール・ブリゲードロード88番地'
    }
  }
]

const advisoryMembers = [
  {
    name: 'Toshiro Doi',
    jaName: '土肥 俊郎',
    title: 'Honorary Director',
    jaTitle: '名誉理事',
    image: '/jisc/advisory-committee-members/toshiro-doi.png',
    points: {
      en: [
        'Professor Emeritus, Kyushu University',
        'Professor Emeritus, Saitama University',
        'Member, Engineering Academy of Japan (EAJ)',
        'Visiting Researcher, RIKEN',
        'Fellow and Honorary Member, Japan Society for Precision Engineering (JSPE)',
        'Founder and Honorary Chairman, Planarization CMP Special Committee, JSPE',
        'Chairman and Advisor, Optical Components Production Technology Division, JOEM'
      ],
      ja: [
        '九州大学 名誉教授',
        '埼玉大学 名誉教授',
        '日本工学アカデミー 会員',
        '理化学研究所 客員研究員',
        '精密工学会 フェロー・名誉会員',
        '精密工学会 平坦化CMP関係専門委員会 創設者・名誉委員長',
        '日本オプトメカトロニクス協会（JOEM）光学素子生産技術部会 委員長・アドバイザー'
      ]
    }
  },
  {
    name: 'Masaharu Kinoshita (Seiji Kinoshita)',
    jaName: '木下 将治 (木下 誠司)',
    title: 'President & CEO, Kinoshita Consulting',
    jaTitle: '木下コンサルティング 代表',
    image: '/jisc/advisory-committee-members/masaharu-kinoshita.png',
    points: {
      en: [
        'Former Chief Executive Officer, Nitta Haas Incorporated',
        'Former Chief Executive Officer, Toshiba Corporation',
        'President & Chief Executive Officer, Kinoshita Consulting',
        'Doctor of Engineering, The University of Tokyo'
      ],
      ja: [
        'ニッタ・ハース株式会社 元CEO',
        '株式会社東芝 元CEO',
        '木下コンサルティング 代表取締役',
        '東京大学 工学博士'
      ]
    }
  },
  {
    name: 'Hirokuni Hiyama',
    jaName: '日山 浩國',
    title: 'Technical Advisor, Ebara Corporation',
    jaTitle: '株式会社荏原製作所 技術顧問',
    image: '/jisc/advisory-committee-members/hirokuni-hiyama.png',
    points: {
      en: [
        'Fellow and Technical Advisor, Ebara Corporation',
        'Member, Semiconductor Equipment Association of Japan (SEAJ)',
        'Recipient of the ICPT Society Award (2025)'
      ],
      ja: [
        '株式会社荏原製作所 フェロー・技術顧問',
        '日本半導体製造装置協会（SEAJ）会員',
        'ICPT学会賞 受賞者（2025年）'
      ]
    }
  },
  {
    name: 'Shuhei Kurokawa',
    jaName: '黒河 周平',
    title: 'Professor, Kyushu University',
    jaTitle: '九州大学 教授',
    image: '/jisc/advisory-committee-members/shuhei-kurokawa.png',
    points: {
      en: [
        'Professor, Department of Mechanical Engineering, Kyushu University',
        'Fellow and Representative Member, Japan Society of Mechanical Engineers (JSME)',
        'Vice President, Director, and Fellow, Japan Society for Precision Engineering (JSPE)'
      ],
      ja: [
        '九州大学大学院 工学研究院 機械工学部門 教授',
        '日本機械学会 フェロー・代議員',
        '精密工学会 副会長・理事・フェロー'
      ]
    }
  },
  {
    name: 'Kazuto Yamauchi',
    jaName: '山内 和人',
    title: 'Professor, Osaka University',
    jaTitle: '大阪大学 教授',
    image: '/jisc/advisory-committee-members/kazuto-yamauchi.png',
    points: {
      en: [
        'Specially Appointed Full-Time Professor, Osaka University & RIKEN',
        'Member, Optical Society of Japan',
        'Member, Japanese Society for Synchrotron Radiation Research',
        'Member, Japan Society of Applied Physics',
        'Former President, Japan Society for Precision Engineering (JSPE)'
      ],
      ja: [
        '大阪大学・理化学研究所 専任教授',
        '日本光学会 会員',
        '日本放射光学会 会員',
        '応用物理学会 会員',
        '元精密工学会 会長'
      ]
    }
  },
  {
    name: 'Seiichi Kondo',
    jaName: '近藤 聖一',
    title: 'Committee Member, SIA',
    jaTitle: '半導体産業協会 委員',
    image: '/jisc/advisory-committee-members/seiichi-kondo.png',
    points: {
      en: [
        'Committee Member, Semiconductor Industry Association (SIA)',
        'Fellow and Ph.D., Resonac Holdings Corporation',
        'Specialist in Planarization CMP Technology Research'
      ],
      ja: [
        '半導体産業協会 委員',
        '株式会社レゾナック・ホールディングス フェロー・博士',
        '平坦化CMP技術研究 専門家'
      ]
    }
  },
  {
    name: 'Hideto Miyake',
    jaName: '三宅 秀人',
    title: 'Professor, Mie University',
    jaTitle: '三重大学 教授',
    image: '/jisc/advisory-committee-members/hideto-miyake.png',
    points: {
      en: [
        'Professor, Department of Electrical and Electronic Engineering, Mie University',
        'Director and Chairman, Wide-Gap Semiconductor Society',
        'Member, Japanese Association for Crystal Growth'
      ],
      ja: [
        '三重大学大学院 工学研究科 電気電子工学専攻 教授',
        'ワイドギャップ半導体学会 会長・理事',
        '日本結晶成長学会 会員'
      ]
    }
  },
  {
    name: 'Yasuhiko Takeno',
    jaName: '竹野 泰彦',
    title: 'Committee Member, SIA',
    jaTitle: '半導体産業協会 委員',
    image: '/jisc/advisory-committee-members/yasuhiko-takeno.png',
    points: {
      en: [
        'Committee Member, Semiconductor Industry Association (SIA)',
        'Fellow and Ph.D., Resonac Holdings Corporation',
        'Committee Member, Planarization CMP Technical Research Group'
      ],
      ja: [
        '半導体産業協会 委員',
        '株式会社レゾナック・ホールディングス フェロー・博士',
        '平坦化CMP技術研究会 委員'
      ]
    }
  }
]

const jiscInfo = {
  en: {
    whoWeAre: 'The Japan India Semiconductor Committee (JISC), operating under the Japan India Business Bureau (JIBB), aims to strengthen semiconductor collaboration between Japan and India by connecting Japanese technology companies with India’s growing semiconductor ecosystem.',
    points: [
      'Technology partnerships',
      'Manufacturing collaboration',
      'Semiconductor supply chain development',
      'Investment opportunities',
      'Innovation exchange between Japan and India'
    ]
  },
  ja: {
    whoWeAre: '日印半導体コミッティ（JISC）は、NPO法人 日本インドビジネスビューロー（JIBB）のもとで運営され、日本の優れたテクノロジー企業とインドのダイナミックに成長する半導体エコシステムを繋ぐことで、日印両国間の半導体連携と価値共創を強化することを目指しています。',
    points: [
      '技術パートナーシップ',
      '製造連携',
      '半導体サプライチェーンの構築・強化',
      '投資機会の創出',
      '日印間のイノベーション交流'
    ]
  }
}


const CompanyCard = ({ company, locale, jpFont }: { company: Company, locale: string, jpFont: any }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const data = locale === 'ja' ? company.ja : company.en

  const hasLogo = company.logo && company.logo.trim() !== ''
  const initials = data.name ? data.name.substring(0, 2).toUpperCase() : 'CO'

  const objectiveTranslations: Record<string, string> = {
    'Sale': '販売',
    'Procurement': '調達',
    'Joint Venture': '合弁事業',
    'Technical tie-up': '技術提携',
    'Other': 'その他'
  }

  return (
    <div
      className={`jisc-company-card ${isExpanded ? 'is-expanded' : ''}`}
    >
      <div className="jisc-company-main">
        {/* Badge Row for Side */}
        <div className="jisc-card-badge-row">
          <span className={`jisc-side-badge ${company.side.toLowerCase()}`}>
            {/* <span style={{ marginRight: '0.35rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center' }}>
              {company.side === 'Japan' ? '🇯🇵' : '🇮🇳'}
            </span> */}
            {locale === 'ja'
              ? (company.side === 'Japan' ? '日本' : 'インド')
              : company.side
            }
          </span>
        </div>

        {/* Logo and Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Logo or placeholder */}
          {hasLogo ? (
            <div className="jisc-company-logo-wrap" style={{ width: '80px', height: '50px', padding: '0.5rem', marginBottom: 0, flexShrink: 0 }}>
              <Image
                src={company.logo}
                alt={`${data.name} Logo`}
                width={80}
                height={30}
                className="jisc-company-logo-img"
                style={{ maxHeight: '40px' }}
              />
            </div>
          ) : (
            <div className="jisc-card-logo-placeholder" style={{ width: '80px', height: '50px', padding: '0.5rem', fontSize: '1.1rem', marginBottom: 0, flexShrink: 0 }}>
              {initials}
            </div>
          )}

          <div className="jisc-company-header" style={{ marginBottom: 0 }}>
            <h3 style={{ ...jpFont, fontSize: '1.4rem', margin: 0 }}>{data.name}</h3>
          </div>
        </div>

        <p className="jisc-company-about" style={jpFont}>{data.about}</p>

        {/* Meta Area for State, Objectives, Address */}
        <div className="jisc-card-meta" style={jpFont}>
          <div className="jisc-meta-item">
            <span className="material-symbols-outlined">map</span>
            <span>
              {data.state}
            </span>
          </div>

          <div className="jisc-meta-item">
            <span className="material-symbols-outlined">ads_click</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
              {company.objectives.map((obj, oIdx) => (
                <span key={oIdx} className="jisc-objective-pill">
                  {locale === 'ja' ? (objectiveTranslations[obj] || obj) : obj}
                </span>
              ))}
            </div>
          </div>

          <div className="jisc-meta-item">
            <span className="material-symbols-outlined">home_pin</span>
            <span>
              {/* <strong className="jisc-meta-label">{locale === 'ja' ? '住所:' : 'Address:'}</strong> */}
              {data.address}
            </span>
          </div>
        </div>

        <button
          className="jisc-read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          style={jpFont}
        >
          {locale === 'ja'
            ? (isExpanded ? '閉じる' : '詳細を見る')
            : (isExpanded ? 'Read less' : 'Read more')
          }
          <span className="material-symbols-outlined">expand_more</span>
        </button>

        <div className="jisc-company-more">
          <div className="jisc-company-sectors" style={{ marginBottom: '1.25rem' }}>
            {data.sectors.map((sector, sIdx) => (
              <span key={sIdx} className="jisc-sector-pill">{sector}</span>
            ))}
          </div>

          <div className="jisc-card-products" style={{ marginBottom: '1.25rem' }}>
            <h4 style={jpFont}>{locale === 'ja' ? '主な製品 / 技術' : 'Products & Tech'}</h4>
            <div className="jisc-products-list">
              {data.products.map((prod, pIdx) => (
                <span key={pIdx} className="jisc-product-pill">{prod}</span>
              ))}
            </div>
          </div>

          <div className="jisc-more-content">
            <h4 style={jpFont}>{locale === 'ja' ? '詳細情報' : 'Additional Information'}</h4>
            <p style={jpFont}>{data.readMore}</p>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="jisc-company-link-btn" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>language</span>
              {locale === 'ja' ? '公式サイト' : 'Official Website'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Japan-India Semiconductor Committee (JISC)',
  'provider': {
    '@type': 'Organization',
    'name': 'Japan India Business Bureau',
    'logo': 'https://www.npo-jibb.org/logo.webp'
  },
  'description': 'Strengthening semiconductor collaboration between Japan and India by connecting Japanese technology companies with India’s growing semiconductor ecosystem.',
  'url': 'https://npo-jibb.org/jisc'
}

export default function JISCPage() {
  const { locale } = useLanguage()
  const jpFont = locale === 'ja' ? { fontFamily: 'var(--font-noto-jp)' } : {}

  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [objectiveFilter, setObjectiveFilter] = useState<string>('all')

  const filteredCompanies = memberCompanies.filter(company => {
    const matchCountry = countryFilter === 'all' || company.side.toLowerCase() === countryFilter.toLowerCase()
    const matchObjective = objectiveFilter === 'all' || company.objectives.some(obj => obj.toLowerCase() === objectiveFilter.toLowerCase())
    return matchCountry && matchObjective
  })


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ======================== HERO SECTION ======================== */}
      <motion.section
        className="jisc-hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="jisc-hero-bg"></div>
        <div className="jisc-hero-bg-image">
          <Image
            src="/jisc/jisc-india-japan.png"
            alt="Indo-Japan Background"
            fill
            className="jisc-hero-bg-img"
            priority
          />
        </div>

        <motion.div className="jisc-hero-left" variants={fadeInUp}>
          <div className="jisc-tag">
            <span className="jisc-tag-line"></span>
            <span className="jisc-tag-text" style={jpFont}>
              {locale === 'ja' ? '日印半導体コミッティ' : 'NPO Japan-India Business Bureau'}
            </span>
          </div>
          <h1 className="jisc-hero-title" style={jpFont}>
            {locale === 'ja' ? (
              <>日印半導体コミッティ</>
            ) : (
              <>Japan-India Semiconductor Committee <span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>J</span><span style={{ color: '#FF8C00', fontFamily: 'var(--font-noto)' }}>I</span><span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>SC</span></>
            )}
          </h1>
          <p className="jisc-hero-subtitle" style={jpFont}>
            {locale === 'ja'
              ? 'JISCは、半導体エコシステムにおける産業界、政府、学術機関、そして技術リーダー間の連携を強化するために活動しています。戦略的パートナーシップ、ビジネス推進、研究協力、人材育成、市場開拓支援を通じて、日印間における半導体産業の成長と新たな機会創出を加速させることを目指しています。'
              : 'JISC works to strengthen collaboration between industry, government, academia, and technology leaders across the semiconductor ecosystem. Through strategic partnerships, business facilitation, research collaboration, talent development, and market expansion support, JISC aims to accelerate semiconductor growth opportunities between Japan and India.'
            }
          </p>
          <div className="jisc-hero-buttons">
            <a href="#purpose" className="jisc-btn jisc-btn-primary">
              <span className="material-symbols-outlined">arrow_downward</span>
              {locale === 'ja' ? '詳しく見る' : 'Learn More'}
            </a>
            <a href="#partners" className="jisc-btn jisc-btn-secondary">
              <span className="material-symbols-outlined">diversity_3</span>
              {locale === 'ja' ? 'パートナー' : 'Our Partners'}
            </a>
          </div>
        </motion.div>

        <motion.div className="jisc-hero-right" variants={fadeInUp}>
          <div className="jisc-stat-cards">
            <div className="jisc-stat-card">
              <span className="jisc-stat-icon material-symbols-outlined">memory</span>
              <h3 className="jisc-stat-value">{locale === 'ja' ? 'JISC' : 'JISC'}</h3>
              <p className="jisc-stat-label" style={jpFont}>{locale === 'ja' ? '日印半導体コミッティ' : 'Japan-India Semiconductor Committee'}</p>
            </div>
            <div className="jisc-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span className="jisc-stat-icon material-symbols-outlined">location_on</span>IN</div>
              <h3 className="jisc-stat-value">JIBB, 6th Floor, 162, Sector 16, Noida, Uttar Pradesh</h3>
              <p className="jisc-stat-label" style={jpFont}>{locale === 'ja' ? '戦略的拠点' : 'Strategic Hub Location'}</p>
            </div>
            <div className="jisc-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span className="jisc-stat-icon material-symbols-outlined">location_on</span>JP</div>
              <h3 className="jisc-stat-value">Tameike Suzuki Building 3F, 1-2-13 Akasaka, Minato-ku, Tokyo</h3>
              <p className="jisc-stat-label" style={jpFont}>{locale === 'ja' ? '戦略的拠点' : 'Strategic Hub Location'}</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ======================== WHO WE ARE (ABOUT JISC) ======================== */}
      <motion.section
        className="jisc-who-we-are"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="jisc-who-container">
          <motion.div className="jisc-who-content" variants={fadeInUp}>
            <div className="jisc-tag">
              <span className="jisc-tag-line"></span>
              <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? '私たちについて' : 'Who We Are'}</span>
            </div>
            <h2 className="jisc-who-title" style={jpFont}>
              {locale === 'ja' ? <>JISCの <em>使命</em></> : <>The <em>Mission</em> of <span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>J</span><span style={{ color: '#FF8C00', fontFamily: 'var(--font-noto)' }}>I</span><span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>SC</span></>}
            </h2>
            <p className="jisc-who-desc" style={jpFont}>
              {locale === 'ja' ? jiscInfo.ja.whoWeAre : jiscInfo.en.whoWeAre}
            </p>
          </motion.div>
          <div className="jisc-who-grid">
            {(locale === 'ja' ? jiscInfo.ja.points : jiscInfo.en.points).map((point, index) => (
              <motion.div key={index} className="jisc-who-point" variants={fadeInUp}>
                <span className="material-symbols-outlined">check_circle</span>
                <span style={jpFont}>{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ======================== MEMBER COMPANIES ======================== */}
      {/* <motion.section
        className="jisc-companies"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-section-header" variants={fadeInUp}>
          <div className="jisc-tag" style={{ justifyContent: 'center' }}>
            <span className="jisc-tag-line"></span>
            <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? 'メンバー企業' : 'Member Companies'}</span>
          </div>
          <h2 className="jisc-section-title" style={{ ...jpFont, marginBottom: '0.5rem' }}>
            {locale === 'ja' ? <>インドの <em>エコシステム</em> に関心を持つ日本企業</> : <>Japanese Companies Interested in Indian <em style={{ color: '#2e3885' }}>Semiconductor</em> Ecosystem</>}
          </h2>
        </motion.div>

        <div className="jisc-companies-grid">
          {memberCompanies.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              locale={locale}
              jpFont={jpFont}
            />
          ))}
        </div>
      </motion.section> */}

      {/* ======================== OUR GROUP COMPANIES ======================== */}
      <motion.section
        className="jisc-companies"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-section-header" variants={fadeInUp}>
          <div className="jisc-tag" style={{ justifyContent: 'center' }}>
            <span className="jisc-tag-line"></span>
            <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? 'メンバー企業' : 'Member Companies'}</span>
          </div>
          <h2 className="jisc-section-title" style={{ ...jpFont, marginBottom: '0.5rem' }}>
            {locale === 'ja' ? <>半導体<em>エコシステム</em>に関心のある企業</> : <>Companies Interested in <em style={{ color: '#2e3885' }}>Semiconductor</em> Ecosystem</>}
          </h2>
        </motion.div>

        {/* ======================== FILTERS SECTION ======================== */}
        <motion.div className="jisc-filters-container" variants={fadeInUp} style={jpFont}>
          <div className="jisc-filters-group">
            <div className="jisc-filter-field">
              <label>{locale === 'ja' ? '国' : 'Country'}</label>
              <select
                className="jisc-filter-select"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <option value="all">{locale === 'ja' ? 'すべての国' : 'All Countries'}</option>
                <option value="japan">{locale === 'ja' ? '日本' : 'Japan'}</option>
                <option value="india">{locale === 'ja' ? 'インド' : 'India'}</option>
              </select>
            </div>

            <div className="jisc-filter-field">
              <label>{locale === 'ja' ? '目的 / 協業分野' : 'Objective'}</label>
              <select
                className="jisc-filter-select"
                value={objectiveFilter}
                onChange={(e) => setObjectiveFilter(e.target.value)}
              >
                <option value="all">{locale === 'ja' ? 'すべての目的' : 'All Objectives'}</option>
                <option value="sale">{locale === 'ja' ? '販売 (Sale)' : 'Sale'}</option>
                <option value="procurement">{locale === 'ja' ? '調達 (Procurement)' : 'Procurement'}</option>
                <option value="joint venture">{locale === 'ja' ? '合弁事業 (Joint Venture)' : 'Joint Venture'}</option>
                <option value="technical tie-up">{locale === 'ja' ? '技術提携 (Technical tie-up)' : 'Technical tie-up'}</option>
                <option value="other">{locale === 'ja' ? 'その他 (Other)' : 'Other'}</option>
              </select>
            </div>
          </div>

          <div className="jisc-filters-info">
            {locale === 'ja' ? (
              <>該当企業: <span>{filteredCompanies.length}</span> 件</>
            ) : (
              <>Found <span>{filteredCompanies.length}</span> companies</>
            )}
          </div>
        </motion.div>

        <div className="jisc-companies-grid" key={`${countryFilter}-${objectiveFilter}`}>
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.en.name}
              company={company}
              locale={locale}
              jpFont={jpFont}
            />
          ))}

          {/* Persistent Pitch / CTA Card */}
          <div
            className="jisc-company-card jisc-cta-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '2.5rem 2rem',
              borderRadius: '8px',
              minHeight: '360px',
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1rem' }}>
              handshake
            </span>
            <h3 style={{ ...jpFont, fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.4, fontFamily: 'var(--font-cormorant)' }}>
              {locale === 'ja'
                ? '日印ビジネスエコシステムとつながりませんか？'
                : 'Want to connect with the India Japan business ecosystem?'
              }
            </h3>
            <p style={{ ...jpFont, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {locale === 'ja'
                ? '企業カードに登録して、紹介パートナーになりましょう。'
                : 'Become a Featured Industry Partner'
              }
            </p>
            <a
              href="#contact"
              className="jisc-btn jisc-btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'var(--gold)',
                color: '#fff',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>mail</span>
              {locale === 'ja' ? 'お問合せ' : 'Contact Us'}
            </a>
          </div>
        </div>
      </motion.section>



      {/* ======================== SUPPORT SERVICES ========================
      <motion.section
        className="jisc-services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-section-header" variants={fadeInUp}>
          <p className="jisc-section-tag">{locale === 'ja' ? 'サポート内容' : 'Support Details'}</p>
          <h2 className="jisc-section-title" style={jpFont}>
            {locale === 'ja' ? '包括的ビジネスサポート' : 'Comprehensive Business Support'}
          </h2>
          <p className="jisc-section-subtitle" style={jpFont}>
            {locale === 'ja'
              ? '日本企業のインド市場参入を、あらゆる側面でサポートします。'
              : 'End-to-end solutions for Japanese companies entering the Indian market.'
            }
          </p>
        </motion.div>

        <div className="jisc-services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="jisc-service-card"
              variants={fadeInUp}
            >
              <div className="jisc-service-icon">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <div className="jisc-service-content">
                <h4 style={jpFont}>{locale === 'ja' ? service.ja : service.en}</h4>
                <p style={jpFont}>{locale === 'ja' ? service.descJa : service.descEn}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section> */}

      {/* ======================== INNOVATION HUB ======================== */}
      <motion.section
        className="jisc-hub"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Banner */}
        <div className="jisc-hub-banner">
          <motion.p className="jisc-hub-tag" variants={fadeInUp}>
            {locale === 'ja' ? 'グローバルディープテック・コリドー' : 'Global Deep-Tech Corridor'}
          </motion.p>
          <motion.h2 className="jisc-hub-title" style={jpFont} variants={fadeInUp}>
            {locale === 'ja' ? (
              <>日印半導体研究 &<br /><em>イノベーションハブ</em></>
            ) : (
              <>Indo-Japan Semiconductor<br /><em>Research & Innovation Hub</em></>
            )}
          </motion.h2>
          <motion.p className="jisc-hub-location" variants={fadeInUp}>Noida, Uttar Pradesh</motion.p>
        </div>

        {/* 3-Column layout: left info | center image | right TRL */}
        <div className="jisc-hub-central">

          {/* Left Column — Strategic & Collaborative info */}
          <motion.div className="jisc-hub-left-col" variants={staggerSlow}>
            <motion.div className="jisc-hub-info-card" variants={fadeInUp}>
              <span className="material-symbols-outlined">security</span>
              <div>
                <h3 style={jpFont}>{locale === 'ja' ? 'グローバルサプライチェーンの多角化' : 'Decentralizing the Global Supply Chain'}</h3>
                <p style={jpFont}>{locale === 'ja' ? '「メイド・イン・インディア」のディープテックIP（知的財産）を育成し、地政学的変動に対応する強靭（レジリエント）なイノベーションパイプラインを構築します。' : 'A resilient innovation pipeline to counter geopolitical shifts and foster native "Made in India" deep-tech IP.'}</p>
              </div>
            </motion.div>
            <motion.div className="jisc-hub-info-card" variants={fadeInUp}>
              <span className="material-symbols-outlined">location_on</span>
              <div>
                <h3 style={jpFont}>{locale === 'ja' ? 'ノイダの戦略的拠点' : 'Strategic Hub — Noida, UP'}</h3>
                <p style={jpFont}>{locale === 'ja' ? '先進的な電子機器クラスター内に位置し、組立工場への近接性と迅速なフィードバックループを実現。' : 'Situated within a premier electronics cluster providing startups with immediate proximity to consumer electronics assembly plants.'}</p>
              </div>
            </motion.div>
            <motion.div className="jisc-hub-info-card" variants={fadeInUp}>
              <span className="material-symbols-outlined">school</span>
              <div>
                <h3 style={jpFont}>{locale === 'ja' ? '日印アカデミアの相乗効果' : 'Synergy of Indian & Japanese Academia'}</h3>
                <p style={jpFont}>{locale === 'ja' ? '日印両国の学術機関が連携し、ハイリスクな実験や初期段階の技術ノウハウの供給源（送り手）となります。' : 'Academic institutions from both nations act as "senders" for high-risk experimentation and early-stage technical know-how.'}</p>
              </div>
            </motion.div>
            <motion.div className="jisc-hub-info-card" variants={fadeInUp}>
              <span className="material-symbols-outlined">corporate_fare</span>
              <div>
                <h3 style={jpFont}>{locale === 'ja' ? '日印企業の相乗効果' : 'Synergy of Indian & Japanese Corporations'}</h3>
                <p style={jpFont}>{locale === 'ja' ? '企業パートナーが市場規模、迅速なプロセス統合、そして商業的成功に向けたグローバルな展開手段を提供します。' : 'Corporate partners provide market scale, rapid pathway integration, and the global pathways required for commercial success.'}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Center — Blended Semiconductor Image */}
          <motion.div className="jisc-hub-center-image" variants={fadeInUp}>
            <Image
              src="/jisc/semiconductor-applications.png"
              alt="Semiconductor Applications"
              width={1200}
              height={600}
              className="jisc-hub-illustration"
            />
          </motion.div>

          {/* Right Column — TRL Pipeline */}
          <motion.div className="jisc-hub-right-col" variants={staggerSlow}>
            <motion.div className="jisc-hub-trl-header" variants={fadeInUp}>
              <span className="material-symbols-outlined">rocket_launch</span>
              <h3 style={jpFont}>{locale === 'ja' ? 'TRLライフサイクルパイプライン' : 'TRL Lifecycle Pipeline'}</h3>
            </motion.div>
            <motion.div className="jisc-hub-trl-stage" variants={fadeInUp}>
              <div className="jisc-hub-trl-badge jisc-trl-1">TRL 1–3</div>
              <div className="jisc-hub-trl-content">
                <h4 style={jpFont}>{locale === 'ja' ? '初期段階：研究開発 & リスク低減' : 'Nascent Stage: Research & De-risking'}</h4>
                <p style={jpFont}>{locale === 'ja' ? '分析的概念実証（PoC）とプロトタイプ試作を通じて、ディープテック分野への参入障壁を引き下げます。' : 'Analytical proof-of-concept and prototyping to lower the barrier to entry for deep tech.'}</p>
                <span className="jisc-hub-trl-contributor">{locale === 'ja' ? '主な推進主体：学術機関' : 'Key Contributors: Academia'}</span>
              </div>
            </motion.div>
            <motion.div className="jisc-hub-trl-stage" variants={fadeInUp}>
              <div className="jisc-hub-trl-badge jisc-trl-2">TRL 4–6</div>
              <div className="jisc-hub-trl-content">
                <h4 style={jpFont}>{locale === 'ja' ? '検証段階：プロトタイプテスト' : 'Validation Stage: Prototype Testing'}</h4>
                <p style={jpFont}>{locale === 'ja' ? '設計された技術を管理されたラボ環境から模擬的な実用環境へと移行し、機能的・技術的な実現可能性を検証します。' : 'Moving designs out of controlled labs into simulated environments to ensure functional viability.'}</p>
                <span className="jisc-hub-trl-contributor">{locale === 'ja' ? '主な推進主体：学術機関、企業パートナー' : 'Key Contributors: Academia, Corporations'}</span>
              </div>
            </motion.div>
            <motion.div className="jisc-hub-trl-stage" variants={fadeInUp}>
              <div className="jisc-hub-trl-badge jisc-trl-3">TRL 7–9</div>
              <div className="jisc-hub-trl-content">
                <h4 style={jpFont}>{locale === 'ja' ? '成熟・商業化段階：量産 & 事業拡大' : 'Maturity & Commercial Stage: Scaling'}</h4>
                <p style={jpFont}>{locale === 'ja' ? 'シリーズA/Bの資金調達、製造ライン（ファブ）へのアクセス、自動車や産業用製品サプライチェーンへの統合を推進します。' : 'Series A/B funding, fabrication access, and integration into automotive and industrial supply chains.'}</p>
                <span className="jisc-hub-trl-contributor">{locale === 'ja' ? '主な推進主体：企業パートナー' : 'Key Contributors: Corporations'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Infrastructure Strip — 4 columns */}
        <motion.div
          className="jisc-hub-infra"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerSlow}
        >
          <motion.div className="jisc-hub-infra-card" variants={fadeInUp}>
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <h4 style={jpFont}>{locale === 'ja' ? '高度な物理的開発環境' : 'Specialized Physical Environment'}</h4>
            <p style={jpFont}>{locale === 'ja' ? '一般的なオフィススペースの枠を超え、専門的なウェットラボや最先端の半導体試作・製造装置を完備した開発環境を提供します。' : 'The facility provides specialized wet labs and high-end semiconductor fabrication tools beyond basic office space.'}</p>
          </motion.div>
          <motion.div className="jisc-hub-infra-card" variants={fadeInUp}>
            <span className="material-symbols-outlined">biotech</span>
            <h4 style={jpFont}>{locale === 'ja' ? '先進的な測定・評価・検証ラボ' : 'Advanced Testing & Verification Labs'}</h4>
            <p style={jpFont}>{locale === 'ja' ? '複雑なIC・チップ設計やプロトタイプデバイスの信頼性・動作検証を行うための、専用設備や最先端測定機器へのアクセスを提供します。' : 'Access to specialized facilities and equipment necessary to verify complex chip designs and prototypes.'}</p>
          </motion.div>
          <motion.div className="jisc-hub-infra-card" variants={fadeInUp}>
            <span className="material-symbols-outlined">menu_book</span>
            <h4 style={jpFont}>{locale === 'ja' ? '専門的な技術・学術ライブラリ' : 'Specialized Technical Libraries'}</h4>
            <p style={jpFont}>{locale === 'ja' ? '厳選された最新の技術文書、学術論文、そして半導体設計に不可欠なデータセットへのセキュアなアクセス環境を提供します。' : 'Curated access to technical documentation, research papers, and essential semiconductor design datasets.'}</p>
          </motion.div>
          <motion.div className="jisc-hub-infra-card" variants={fadeInUp}>
            <span className="material-symbols-outlined">hub</span>
            <h4 style={jpFont}>{locale === 'ja' ? '「4つの柱」による協同モデル' : 'Quad-Pillar Collaborative Model'}</h4>
            <p style={jpFont}>{locale === 'ja' ? '日印の学術機関と企業を緊密に結びつけ、ディープテック分野における大規模な産業革新を創出するための相乗効果モデルです。' : 'A synergistic model connecting Indian & Japanese academia and corporations to drive deep-tech innovation at scale.'}</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="jisc-supported">
        <div className="jisc-supported-container">
          <div className="jisc-section-header" style={{ marginBottom: '3rem' }}>
            <div className="jisc-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <span className="jisc-tag-line"></span>
              <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? '支援機関' : 'Government & Industry Partners'}</span>
            </div>
            <h2 className="jisc-section-title" style={{ ...jpFont, marginBottom: '0.5rem' }}>
              {locale === 'ja' ? <>JISCは以下の政府および業界団体より <em>支援</em> を受けています</> : <><span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>J</span><span style={{ color: '#FF8C00', fontFamily: 'var(--font-noto)' }}>I</span><span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>SC</span> is <em>Supported</em> By</>}
            </h2>
          </div>

          <div className="jisc-supported-marquee">
            <div className="jisc-supported-track">
              {[...supportedLogos, ...supportedLogos].map((logo, index) => (
                <div key={index} className="jisc-supported-item">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={80}
                    className="jisc-supported-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================== PURPOSE SECTION ======================== */}
      <motion.section
        className="jisc-purpose"
        id="purpose"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-section-header" variants={fadeInUp}>
          <div className="jisc-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
            <span className="jisc-tag-line"></span>
            <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? '活動目的' : 'Our Strategic Mission'}</span>
          </div>
          <h2 className="jisc-section-title" style={{ ...jpFont, marginBottom: '0.5rem' }}>
            {locale === 'ja' ? '半導体エコシステムの成長を支援' : <>The <em>PURPOSE</em> of <span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>J</span><span style={{ color: '#FF8C00', fontFamily: 'var(--font-noto)' }}>I</span><span style={{ color: '#0047AB', fontFamily: 'var(--font-noto)' }}>SC</span></>}
          </h2>
        </motion.div>

        <div className="jisc-purpose-grid">
          {purposes.map((purpose, index) => (
            <motion.div
              key={index}
              className="jisc-purpose-card"
              variants={fadeInUp}
            >
              <div className="jisc-purpose-icon">
                <span className="material-symbols-outlined">{purpose.icon}</span>
              </div>
              <div className="jisc-purpose-content">
                <h3 style={jpFont}>{locale === 'ja' ? purpose.ja.title : purpose.en.title}</h3>
                <p style={jpFont}>{locale === 'ja' ? purpose.ja.desc : purpose.en.desc}</p>
              </div>
              <div className="jisc-purpose-index">{String(index + 1).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ======================== CHAIRMAN'S GREETING ======================== */}
      <motion.section
        className="jisc-greeting"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="jisc-greeting-inner">
          <motion.div className="jisc-greeting-container" variants={fadeInUp}>
            <div className="jisc-greeting-image-wrapper">
              <Image
                src="/jisc/tatsujoshi-suzuki.png"
                alt="Tatsutoshi Suzuki"
                width={400}
                height={500}
                className="jisc-greeting-image"
                quality={100}
                unoptimized
              />
            </div>
            <div className="jisc-greeting-content">
              <motion.div className="jisc-greeting-header">
                <p className="jisc-greeting-tag">{locale === 'ja' ? 'ご挨拶' : 'Greetings'}</p>
                <h2 className="jisc-greeting-name" style={jpFont}>
                  {locale === 'ja' ? '鈴木 辰俊' : 'Tatsutoshi Suzuki'}
                </h2>
                <div className="jisc-greeting-titles">
                  <span>{locale === 'ja' ? 'JISC 会長' : 'JISC Chairman'}</span>
                  <span className="jisc-title-divider">·</span>
                  <span>{locale === 'ja' ? 'プラナリゼーションCMP技術研究会 会長' : 'Planarization CMP Technology Study Group Chairman'}</span>
                  <span className="jisc-title-divider">·</span>
                  <span>{locale === 'ja' ? '東邦鋼機製作所 代表取締役' : 'Toho Steel Works Chairman'}</span>
                </div>
              </motion.div>
              <motion.div className="jisc-greeting-body">
                <p style={jpFont}>
                  {locale === 'ja'
                    ? '日本の半導体産業はかつての圧倒的な世界シェアからは後退したものの、製造装置や原材料の分野では依然としてグローバルな強みを維持しており、パワー半導体やイメージセンサーなど特定の高付加価値分野で強い存在感を示しています。近年では、政府の戦略的支援と国内各企業の旺盛なイノベーション投資により力強い回復の兆しを見せており、最先端のロジック・メモリ分野への投資や、緊密な国際連携を通じて持続可能な成長と競争力強化を目指す過渡期にあります。'
                    : 'Although Japan\'s semiconductor industry has fallen from its former top share, it still boasts world-class strengths in manufacturing equipment and materials, with a strong presence in power semiconductors and image sensors. It is in a transitional period aiming for renewed growth through investment in cutting-edge fields and international collaboration.'
                  }
                </p>
                <p style={jpFont}>
                  {locale === 'ja'
                    ? '半導体産業のグローバルなサプライチェーン再編が進む中、インドは地政学的なリスク分散（デカップリング）の動きとも連動し、新たな「世界の工場」として大きな注目を集めています。インド政府が掲げる「メイク・イン・インディア（Make in India）」政策の強力な推進のもと、急速な技術開発、外国投資の積極的な誘致、輸入依存からの脱却が図られており、国内における半導体一貫生産の実現に向けたエコシステムの構築が加速しています。'
                    : 'As the semiconductor industry expands globally, India is attracting attention as the "factory of the world" in conjunction with the movement to decouple from China. Under the "Make in India" policy, the country is promoting rapid technological development with the aim of domestic semiconductor production.'
                  }
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ======================== ADVISORY MEMBERS ======================== */}
      <motion.section
        className="jisc-advisory"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-section-header" variants={fadeInUp}>
          <div className="jisc-tag" style={{ justifyContent: 'center' }}>
            <span className="jisc-tag-line"></span>
            <span className="jisc-tag-text" style={jpFont}>{locale === 'ja' ? '顧問・委員' : 'Advisory & Committee Members'}</span>
          </div>
          <h2 className="jisc-section-title" style={jpFont}>
            {locale === 'ja' ? '業界をリードする専門家' : 'Leading Industry Experts'}
          </h2>
        </motion.div>

        <div className="jisc-advisory-grid">
          {advisoryMembers.map((member, index) => (
            <motion.div
              key={index}
              className="jisc-advisory-card"
              variants={fadeInUp}
            >
              <div className="jisc-advisory-image-container">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="jisc-advisory-photo"
                  quality={100}
                  unoptimized
                />
                <div className="jisc-advisory-overlay">
                  <div className="jisc-advisory-info">
                    <h3 style={jpFont}>{locale === 'ja' ? member.jaName : member.name}</h3>
                    <p className="jisc-advisory-role" style={jpFont}>{locale === 'ja' ? member.jaTitle : member.title}</p>
                    <ul className="jisc-advisory-points">
                      {(locale === 'ja' ? member.points.ja : member.points.en).map((point, pIdx) => (
                        <li key={pIdx} style={jpFont}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jisc-advisory-name-tag">
                <p style={jpFont}>{locale === 'ja' ? member.jaName : member.name}</p>
                <span className="material-symbols-outlined">add</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ======================== ASSOCIATION PARTNERS ======================== */}
      <motion.section
        className="jisc-partners"
        id="partners"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="jisc-partners-header" variants={fadeInUp}>
          <p className="jisc-section-tag">{locale === 'ja' ? '支援団体' : 'Support Associations'}</p>
          <h2 className="jisc-section-title" style={jpFont}>
            {locale === 'ja' ? 'パートナー組織' : 'Partner Organizations'}
          </h2>
        </motion.div>

        <div className="jisc-partners-carousel-container">
          <button
            className="jisc-carousel-btn prev"
            onClick={() => {
              const el = document.getElementById('partners-scroll');
              if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <motion.div
            id="partners-scroll"
            className="jisc-partners-scroll"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerSlow}
          >
            {associations.map((assoc, index) => (
              <motion.div
                key={index}
                className="jisc-partner-card"
                variants={fadeInUp}
              >
                <div className="jisc-partner-logo-wrapper">
                  <Image
                    src={assoc.logo}
                    alt={assoc.en.name}
                    width={120}
                    height={60}
                    className="jisc-partner-logo"
                  />
                </div>
                <h4 style={jpFont}>{locale === 'ja' ? assoc.ja.name : assoc.en.name}</h4>
                <p style={jpFont}>{locale === 'ja' ? assoc.ja.desc : assoc.en.desc}</p>
              </motion.div>
            ))}
            <motion.div
              className="jisc-partner-cta"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <a href="mailto:vc@npo-jibb.org">
                <span className="material-symbols-outlined">arrow_forward</span>
                {locale === 'ja' ? <>パートナーに<br />なる</> : <>Become a<br />Partner</>}
              </a>
            </motion.div>
          </motion.div>

          <button
            className="jisc-carousel-btn next"
            onClick={() => {
              const el = document.getElementById('partners-scroll');
              if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </motion.section>

      {/* ======================== OFFICE SECTION ======================== */}
      <motion.section
        className="jisc-office"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="jisc-office-banner">
          <motion.p className="jisc-office-tag" variants={fadeInUp}>
            {locale === 'ja' ? 'JIBBが運営' : 'Powered by JIBB'}
          </motion.p>
          <motion.h2 className="jisc-office-title" style={jpFont} variants={fadeInUp}>
            {locale === 'ja' ? 'オフィススペース' : 'Office Space'}
          </motion.h2>
          <motion.p className="jisc-office-org" variants={fadeInUp}>
            {locale === 'ja' ? 'NPO法人 日本インドビジネスビューロー' : 'Japan India Business Bureau (NPO)'}
          </motion.p>
        </div>

        <div className="jisc-office-carousel-container">
          <button
            className="jisc-carousel-btn prev"
            onClick={() => {
              const el = document.getElementById('office-track');
              if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
            }}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className="jisc-office-carousel-wrapper" id="office-track">
            <motion.div
              className="jisc-office-carousel-track"
              variants={staggerSlow}
            >
              {officeSpaces.map((space, index) => (
                <motion.div
                  key={index}
                  className="jisc-office-slide"
                  variants={fadeInUp}
                >
                  <div className="jisc-office-card-v2">
                    <div className="jisc-office-image-container">
                      <Image
                        src={space.image}
                        alt={space.en}
                        fill
                        className="jisc-office-photo"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="jisc-office-info">
                      <div className="jisc-office-info-header">
                        <span className="material-symbols-outlined">{space.icon}</span>
                        <h4 style={jpFont}>{locale === 'ja' ? space.ja : space.en}</h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            className="jisc-carousel-btn next"
            onClick={() => {
              const el = document.getElementById('office-track');
              if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
            }}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </motion.section>

      {/* ======================== CTA SECTION ======================== */}
      <section className="jisc-cta-section">
        <div className="jisc-cta-inner">
          <div className="jisc-cta-content">
            <p className="jisc-cta-tag">{locale === 'ja' ? '参加しましょう' : 'Get Involved'}</p>
            <h2 className="jisc-cta-title" style={jpFont}>
              {locale === 'ja' ? '半導体の未来を共に築く' : 'Building the Semiconductor Future Together'}
            </h2>
          </div>
          <div className="jisc-cta-divider"></div>
          <div className="jisc-cta-actions">
            <a href="mailto:vc@npo-jibb.org" className="jisc-btn jisc-btn-white">
              <span className="material-symbols-outlined">mail</span>
              {locale === 'ja' ? 'お問い合わせ' : 'Contact Us'}
            </a>
            <a href="/events" className="jisc-btn jisc-btn-ghost">
              <span className="material-symbols-outlined">event</span>
              {locale === 'ja' ? 'イベント情報' : 'Upcoming Events'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
