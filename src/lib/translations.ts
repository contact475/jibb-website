export type Locale = 'en' | 'ja'

// Define the translation structure type
export type TranslationType = {
  nav: {
    aboutUs: string
    strategicSectors: string
    innovationHub: string
    contact: string
    joinBureau: string
  }
  hero: {
    eyebrow: string
    title: string[]
    description: string
    ctaPrimary: string
    ctaSecondary: string
    stats: Array<{ value: string; suffix: string; label: string; sublabel: string }>
    locations: Array<{ code: string; text: string; city: string }>
  }
  whoWeAre: {
    tag: string
    title: string[]
    description: string
    locations: Array<{ code: string; city: string; role: string; desc: string }>
  }
  vision: {
    tag: string
    title: string[]
    text: string
  }
  mission: {
    tag: string
    title: string[]
    text: string
  }
  beliefs: {
    tag: string
    title: string[]
    subtitle: string
    pillars: Array<{ icon: string; num: string; title: string; desc: string }>
    bottomStatement: string[]
  }
  framework: {
    tag: string
    title: string[]
    subtitle: string
    services: Array<{ index: string; icon: string; title: string; desc: string; highlight: boolean }>
    viewFramework: string[]
  }
  sectors: {
    tag: string
    title: string[]
    intro: string
    items: Array<{ icon: string; name: string }>
  }
  methodology: {
    tag: string
    title: string[]
    desc: string
    steps: Array<{ phase: string; icon: string; title: string; text: string }>
  }
  innovationHub: {
    tag: string
    title: string[]
    subtitle: string
    items: Array<{ icon: string; title: string; desc: string; link: string }>
  }
  quote: {
    text: string[]
    author: string
    title: string
  }
  cta: {
    title: string
    desc: string
    button: string
    whyJoin: string[]
    benefits: string[]
  }
  footer: {
    brand: string
    bureau: { title: string; items: string[] }
    services: { title: string; items: string[] }
    contact: { title: string; items: string[] }
    copyright: string
  }
}

export const translations: Record<Locale, TranslationType> = {
  en: {
    // Navigation
    nav: {
      aboutUs: 'About Us',
      strategicSectors: 'Key Sectors',
      innovationHub: 'Innovation Hub',
      contact: 'Contact',
      joinBureau: 'Join Us',
    },

    // Hero
    hero: {
      eyebrow: 'Empowering Innovation. Building Lasting Partnerships.',
      title: ['Enabling the Next', 'Global', 'Manufacturing', 'Shift'],
      description: 'We connect stakeholders, businesses, institutions, and governments to create meaningful partnerships, drive investments, and build long-term industrial growth between Japan and India.',
      ctaPrimary: 'Support the Bureau',
      ctaSecondary: 'Join Us',
      stats: [
        { value: '2', suffix: '', label: 'Strategic Locations', sublabel: 'Tokyo & Noida' },
        { value: '8', suffix: '+', label: 'Key Sectors', sublabel: 'Industry Focus' },
        { value: '100', suffix: '+', label: 'Partner Network', sublabel: 'Growing Ecosystem' },
        { value: '2', suffix: '', label: 'Nations United', sublabel: 'Japan & India' },
      ],
      locations: [
        { code: 'JP', text: 'Headquarters', city: 'Tokyo, Japan' },
        { code: 'IN', text: 'Operations Center', city: 'Noida, India' },
      ],
    },

    // Who We Are
    whoWeAre: {
      tag: 'About JIBB',
      title: ['Who', 'We Are'],
      description: 'JIBB is a cross-border industry facilitation platform that brings together businesses, institutions, and government stakeholders from Japan and India. We are not just a network, but an enabler of meaningful partnerships built on trust, transparency, and long-term vision. With a strong presence in both Tokyo and Noida, we operate at the intersection of two dynamic economies.',
      locations: [
        {
          code: 'JP',
          city: 'Tokyo, Japan',
          role: 'Headquarters',
          desc: 'Central hub for policy alignment, institutional outreach, and engagement across the Japanese business ecosystem.',
        },
        {
          code: 'IN',
          city: 'Noida, India',
          role: 'Operations Center',
          desc: 'Regional command center for industrial implementation, partnership development, and business scaling within India.',
        },
      ],
    },

    // Vision
    vision: {
      tag: 'Our Vision',
      title: ['A Collaborative Future as', 'Global Leaders'],
      text: 'To create a collaborative future where Japan and India stand together as global leaders in technology, industry, and sustainable growth.',
    },

    // Mission
    mission: {
      tag: 'Our Mission',
      title: ['Driving Meaningful', 'Partnerships', '& Progress'],
      text: 'To drive meaningful partnerships and industrial progress by providing expert market entry support, fostering cross-border collaboration, and delivering world-class innovation incubation for businesses and governments.',
    },

    // Beliefs
    beliefs: {
      tag: 'Our Philosophy',
      title: ['What We', 'Believe'],
      subtitle: 'The principles that guide every partnership, every initiative, and every bridge we build between Japan and India.',
      pillars: [
        {
          icon: 'handshake',
          num: 'I',
          title: 'Trust & Partnership',
          desc: 'We believe that the future of India-Japan collaboration lies in long-term partnerships built on mutual trust and shared value.',
        },
        {
          icon: 'diversity_3',
          num: 'II',
          title: 'Bridging Cultures',
          desc: 'We believe in bridging not just businesses, but cultures—because true collaboration goes beyond transactions.',
        },
        {
          icon: 'lightbulb',
          num: 'III',
          title: 'Innovation & Growth',
          desc: 'We believe in innovation as a driver of growth, supporting ideas from their inception and enabling them to scale globally.',
        },
      ],
      bottomStatement: ['Above all, we believe in', 'creating impact', '—where collaboration leads to sustainable development, stronger industries, and a shared economic future for both nations.'],
    },

    // Framework
    framework: {
      tag: 'What We Do',
      title: ['Our', 'Services'],
      subtitle: 'We create pathways for businesses to collaborate, expand, and succeed across borders.',
      services: [
        { index: '01', icon: 'flight_takeoff', title: 'Market Entry Support', desc: 'We help Japanese companies enter the Indian market and assist Indian businesses expanding into Japan with step-by-step entry strategies and localization support.', highlight: false },
        { index: '02', icon: 'hub', title: 'Partnership Facilitation', desc: 'We help you identify reliable customers, joint venture candidates, and manufacturing partners. We connect you with trusted industry leaders.', highlight: true },
        { index: '03', icon: 'handshake', title: 'Co-Innovation', desc: 'We facilitate joint projects between Indian and Japanese firms, helping share resources, reduce development costs, and create groundbreaking products.', highlight: false },
        { index: '04', icon: 'groups', title: 'Diaspora Networking', desc: 'We organize exclusive networking events to connect the Indian diaspora with Japanese business opportunities, fostering mutual understanding.', highlight: false },
        { index: '05', icon: 'school', title: 'Knowledge Exchange', desc: 'We bring together industry leaders, policymakers, and innovators to share insights and explore emerging opportunities.', highlight: false },
      ],
      viewFramework: ['Learn', 'More'],
    },

    // Sectors
    sectors: {
      tag: 'Industry Focus',
      title: ['Key', 'Sectors'],
      intro: 'We work across industries that are shaping the future of India-Japan collaboration.',
      items: [
        { icon: 'memory', name: 'Electronics & Semiconductors' },
        { icon: 'electric_car', name: 'Automotive & EVs' },
        { icon: 'energy_savings_leaf', name: 'Renewable Energy' },
        { icon: 'medication', name: 'Pharmaceuticals' },
        { icon: 'foundation', name: 'Infrastructure' },
        { icon: 'science', name: 'Chemicals & Materials' },
        { icon: 'precision_manufacturing', name: 'Advanced Manufacturing' },
        { icon: 'rocket_launch', name: 'Emerging Tech' },
      ],
    },

    // Methodology
    methodology: {
      tag: 'Our Approach',
      title: ['How We', 'Work'],
      desc: 'We believe that successful cross-border collaboration requires more than connections—it requires understanding, trust, and execution.',
      steps: [
        { phase: 'Step 01', icon: 'people', title: 'Connect', text: 'We bring together the right stakeholders across India and Japan.' },
        { phase: 'Step 02', icon: 'handshake', title: 'Facilitate', text: 'We simplify market entry, partnerships, and operations.' },
        { phase: 'Step 03', icon: 'lightbulb', title: 'Innovate', text: 'We foster co-innovation and help transform ideas into market-ready solutions.' },
        { phase: 'Step 04', icon: 'trending_up', title: 'Scale', text: 'We support long-term collaboration and scalable business success.' },
      ],
    },

    // Innovation Hub
    innovationHub: {
      tag: 'JIBB Innovation Hub',
      title: ['Innovation', 'Hub'],
      subtitle: 'Located in Tokyo and Noida, this dedicated space is where raw ideas become market-ready solutions.',
      items: [
        { icon: 'science', title: 'State-of-the-Art Labs', desc: 'Advanced R&D facilities where businesses can test, refine, and perfect products in electronics, EV, and pharma sectors.', link: '' },
        { icon: 'rocket_launch', title: 'Startup Incubation', desc: 'We give emerging startups the foundation they need—workspace, strategic mentorship, and direct access to investors from both nations.', link: '' },
        { icon: 'groups', title: 'Expert Ecosystem', desc: 'Surround yourself with industry experts, government officials, and ambitious entrepreneurs. This environment breeds creativity and accelerates adoption.', link: '' },
      ],
    },

    // Quote
    quote: {
      text: ['You do not just join JIBB to get advice. You become a member to plug into a', 'living, breathing ecosystem', 'that empowers innovation and builds lasting partnerships.'],
      author: 'JIBB Member',
      title: 'Innovation Hub, Tokyo',
    },

    // CTA
    cta: {
      title: 'Join the Bureau',
      desc: 'Expand your reach and innovate without borders. Partner with JIBB to access exclusive industry insights, dedicated support, and a powerful cross-cultural network.',
      button: 'Get Started',
      whyJoin: ['Why Join', 'JIBB', '?'],
      benefits: [
        'Expert market entry support and guidance',
        'Access to trusted partnership networks',
        'World-class innovation labs and facilities',
        'Cross-border networking and diaspora events',
      ],
    },

    // Footer
    footer: {
      brand: 'Empowering innovation and building lasting partnerships between Japan and India.',
      bureau: { title: 'Bureau', items: ['About Us'] },
      services: { title: 'Services', items: ['Market Entry', 'Innovation Hub'] },
      contact: { title: 'Contact', items: ['Tokyo Office', 'Noida Office'] },
      copyright: '2026 JIBB. All Rights Reserved.',
    },
  },

  ja: {
    // Navigation
    nav: {
      aboutUs: '私たちについて',
      strategicSectors: '主要セクター',
      innovationHub: 'イノベーションハブ',
      contact: 'お問い合わせ',
      joinBureau: '参加する',
    },

    // Hero
    hero: {
      eyebrow: 'イノベーションを推進。持続的なパートナーシップを構築。',
      title: ['次世代の', 'グローバル', '製造業', 'シフトを実現'],
      description: '私たちは、ステークホルダー、企業、機関、政府を結びつけ、有意義なパートナーシップを構築し、投資を促進し、日本とインド間の長期的な産業成長を支援します。',
      ctaPrimary: '当局を支援する',
      ctaSecondary: '参加する',
      stats: [
        { value: '2', suffix: '', label: '戦略的拠点', sublabel: '東京とノイダ' },
        { value: '8', suffix: '+', label: '主要セクター', sublabel: '産業フォーカス' },
        { value: '100', suffix: '+', label: 'パートナーネットワーク', sublabel: '成長するエコシステム' },
        { value: '2', suffix: '', label: '結ばれた国', sublabel: '日本とインド' },
      ],
      locations: [
        { code: 'JP', text: '本社', city: '東京、日本' },
        { code: 'IN', text: 'オペレーションセンター', city: 'ノイダ、インド' },
      ],
    },

    // Who We Are
    whoWeAre: {
      tag: 'JIBBについて',
      title: ['私たち', 'について'],
      description: 'JIBBは、日本とインドの企業、機関、政府関係者を結びつける国境を越えた産業促進プラットフォームです。私たちは単なるネットワークではなく、信頼、透明性、長期的なビジョンに基づいた有意義なパートナーシップの実現者です。東京とノイダに強力な拠点を持ち、2つのダイナミックな経済の交差点で活動しています。',
      locations: [
        {
          code: 'JP',
          city: '東京、日本',
          role: '本社',
          desc: '日本のビジネスエコシステム全体における政策調整、機関へのアウトリーチ、関与のための中央ハブ。',
        },
        {
          code: 'IN',
          city: 'ノイダ、インド',
          role: 'オペレーションセンター',
          desc: 'インド国内における産業実装、パートナーシップ開発、ビジネス拡大のための地域司令センター。',
        },
      ],
    },

    // Vision
    vision: {
      tag: 'ビジョン',
      title: ['グローバルリーダーとしての', '協力的な未来'],
      text: '日本とインドが技術、産業、持続可能な成長においてグローバルリーダーとして共に立つ協力的な未来を創造すること。',
    },

    // Mission
    mission: {
      tag: 'ミッション',
      title: ['有意義な', 'パートナーシップ', 'と進歩を推進'],
      text: '専門的な市場参入支援を提供し、国境を越えた協力を促進し、企業と政府に世界クラスのイノベーションインキュベーションを提供することで、有意義なパートナーシップと産業の進歩を推進します。',
    },

    // Beliefs
    beliefs: {
      tag: '私たちの哲学',
      title: ['私たちが', '信じること'],
      subtitle: '日本とインドの間に築くすべてのパートナーシップ、すべてのイニシアチブ、すべての架け橋を導く原則。',
      pillars: [
        {
          icon: 'handshake',
          num: 'I',
          title: '信頼とパートナーシップ',
          desc: '日印協力の未来は、相互信頼と共有価値に基づいた長期的なパートナーシップにあると私たちは信じています。',
        },
        {
          icon: 'diversity_3',
          num: 'II',
          title: '文化の架け橋',
          desc: '私たちはビジネスだけでなく、文化の架け橋を築くことを信じています—真のコラボレーションは取引を超えるからです。',
        },
        {
          icon: 'lightbulb',
          num: 'III',
          title: 'イノベーションと成長',
          desc: '私たちはイノベーションを成長の原動力として信じ、アイデアを創出段階からサポートし、グローバルに拡大することを可能にします。',
        },
      ],
      bottomStatement: ['何よりも、私たちは', 'インパクトの創出', 'を信じています—協力が持続可能な発展、より強い産業、そして両国の共有経済的未来につながる場所。'],
    },

    // Framework
    framework: {
      tag: '私たちの活動',
      title: ['私たちの', 'サービス'],
      subtitle: '企業が国境を越えて協力し、拡大し、成功するための道筋を創造します。',
      services: [
        { index: '01', icon: 'flight_takeoff', title: '市場参入支援', desc: '日本企業のインド市場参入とインド企業の日本進出を、段階的な参入戦略とローカライゼーションサポートで支援します。', highlight: false },
        { index: '02', icon: 'hub', title: 'パートナーシップ促進', desc: '信頼できる顧客、合弁事業候補、製造パートナーの特定を支援し、業界リーダーとの接続を実現します。', highlight: true },
        { index: '03', icon: 'handshake', title: '共同イノベーション', desc: 'インドと日本の企業間の共同プロジェクトを促進し、リソースの共有、開発コストの削減、画期的な製品の創造を支援します。', highlight: false },
        { index: '04', icon: 'groups', title: 'ディアスポラネットワーキング', desc: 'インドのディアスポラと日本のビジネス機会を結ぶ独占的なネットワーキングイベントを開催し、相互理解を促進します。', highlight: false },
        { index: '05', icon: 'school', title: '知識交流', desc: '業界リーダー、政策立案者、イノベーターを集め、洞察を共有し、新たな機会を探ります。', highlight: false },
      ],
      viewFramework: ['詳細を', '見る'],
    },

    // Sectors
    sectors: {
      tag: '産業フォーカス',
      title: ['主要', 'セクター'],
      intro: '日印協力の未来を形作る産業分野で活動しています。',
      items: [
        { icon: 'memory', name: 'エレクトロニクス・半導体' },
        { icon: 'electric_car', name: '自動車・EV' },
        { icon: 'energy_savings_leaf', name: '再生可能エネルギー' },
        { icon: 'medication', name: '医薬品' },
        { icon: 'foundation', name: 'インフラ' },
        { icon: 'science', name: '化学・素材' },
        { icon: 'precision_manufacturing', name: '先端製造' },
        { icon: 'rocket_launch', name: '新興技術' },
      ],
    },

    // Methodology
    methodology: {
      tag: 'アプローチ',
      title: ['私たちの', '働き方'],
      desc: '成功する国境を越えた協力には、接続以上のもの—理解、信頼、実行が必要だと私たちは信じています。',
      steps: [
        { phase: 'ステップ 01', icon: 'people', title: '接続', text: '日本とインド全体で適切なステークホルダーを結びつけます。' },
        { phase: 'ステップ 02', icon: 'handshake', title: '促進', text: '市場参入、パートナーシップ、運営を簡素化します。' },
        { phase: 'ステップ 03', icon: 'lightbulb', title: '革新', text: '共同イノベーションを促進し、アイデアを市場対応ソリューションに変換します。' },
        { phase: 'ステップ 04', icon: 'trending_up', title: '拡大', text: '長期的な協力とスケーラブルなビジネスの成功を支援します。' },
      ],
    },

    // Innovation Hub
    innovationHub: {
      tag: 'JIBBイノベーションハブ',
      title: ['イノベーション', 'ハブ'],
      subtitle: '東京とノイダに位置するこの専用スペースは、生のアイデアが市場対応ソリューションになる場所です。',
      items: [
        { icon: 'science', title: '最先端ラボ', desc: 'エレクトロニクス、EV、医薬品セクターで製品をテスト、改良、完成させる先進的なR&D施設。', link: '' },
        { icon: 'rocket_launch', title: 'スタートアップインキュベーション', desc: '新興スタートアップに必要な基盤—ワークスペース、戦略的メンターシップ、両国の投資家への直接アクセスを提供します。', link: '' },
        { icon: 'groups', title: 'エキスパートエコシステム', desc: '業界の専門家、政府関係者、野心的な起業家に囲まれた環境。この環境が創造性を生み、採用を加速します。', link: '' },
      ],
    },

    // Quote
    quote: {
      text: ['JIBBに参加するのはアドバイスを得るためだけではありません。', '生きた、呼吸するエコシステム', 'に参加し、イノベーションを推進し、持続的なパートナーシップを構築するためです。'],
      author: 'JIBBメンバー',
      title: 'イノベーションハブ、東京',
    },

    // CTA
    cta: {
      title: '当局に参加する',
      desc: '活動範囲を拡大し、国境なくイノベーションを。JIBBとパートナーシップを結び、独占的な業界インサイト、専門サポート、強力な異文化ネットワークにアクセスしてください。',
      button: '始める',
      whyJoin: ['なぜ', 'JIBB', 'に参加するのか？'],
      benefits: [
        '専門的な市場参入支援とガイダンス',
        '信頼できるパートナーシップネットワークへのアクセス',
        '世界クラスのイノベーションラボと施設',
        '国境を越えたネットワーキングとディアスポライベント',
      ],
    },

    // Footer
    footer: {
      brand: '日本とインドの間でイノベーションを推進し、持続的なパートナーシップを構築。',
      bureau: { title: '当局', items: ['私たちについて'] },
      services: { title: 'サービス', items: ['市場参入', 'イノベーションハブ'] },
      contact: { title: 'お問い合わせ', items: ['東京オフィス', 'ノイダオフィス'] },
      copyright: '2026 JIBB。全著作権所有。',
    },
  },
}
