# JIBB Landing Page - Design & Development Blueprint

## Project Overview

**Organization**: Japan India Business Bureau (JIBB)
**Type**: Non-profit organization / Strategic business bridge
**Mission**: Connecting businesses, governments, and startups across Japan and India to empower innovation and facilitate cross-border collaborations.
**Locations**: Headquarters in Tokyo, Japan | Operations in Noida, India

---

## Brand Identity & Color System

### Primary Colors (NO GRADIENTS - Flat, solid colors only)

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **JIBB Blue** | `#1E3A8A` | Primary brand color, headers, CTAs, trust elements |
| **White** | `#FFFFFF` | Backgrounds, card surfaces, text on dark |
| **Sakura Blossom** | `#F9A8D4` | Subtle accents, Japan cultural touch (use sparingly) |
| **Bhagwa (Saffron)** | `#EA580C` | India cultural touch, secondary CTAs, highlights |
| **Black** | `#0F172A` | Primary text, professional contrast |

### Extended Palette

```css
:root {
  /* Primary */
  --primary: #1E3A8A;
  --primary-foreground: #FFFFFF;

  /* Secondary (Bhagwa/Saffron) */
  --secondary: #EA580C;
  --secondary-foreground: #FFFFFF;

  /* Background & Surface */
  --background: #FFFFFF;
  --foreground: #0F172A;
  --card: #FFFFFF;
  --card-foreground: #0F172A;

  /* Muted & Borders */
  --muted: #F1F5F9;
  --muted-foreground: #64748B;
  --border: #E2E8F0;

  /* Accent (Sakura - use sparingly) */
  --accent: #F9A8D4;
  --accent-foreground: #0F172A;

  /* Destructive */
  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;
}
```

### Color Rules
- NO gradients anywhere - use flat, solid colors
- Blue for professional trust, authority, Japan
- Bhagwa/Saffron for energy, action, India
- Sakura only for subtle cultural touches (dividers, small icons)
- White backgrounds with adequate contrast
- Minimum 4.5:1 contrast ratio for all text

---

## Typography System

### Recommended Font Pairings

**Option 1: Modern Professional (Recommended)**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap');

/* Noto Sans JP for Japanese cultural connection */
/* Noto Sans for body - excellent multilingual support */
```

**Option 2: Authority & Trust**
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap');

/* Source Sans 3 for body - professional, readable */
/* Merriweather for key headlines - authority, trust */
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px - hero */
--text-6xl: 3.75rem;   /* 60px - hero large */
```

---

## Page Structure (Single Page, No Career Section)

### 1. Navigation (Sticky)
- Logo (JIBB wordmark or logo)
- Nav items: About | Services | Sectors | Approach | Contact
- Primary CTA: "Join Us" or "Support the Bureau"
- Clean, minimal - white background with subtle shadow on scroll

### 2. Hero Section
**Headline**: "Enabling the Next Global Manufacturing Shift"

**Subheadline**: "We connect stakeholders, businesses, institutions, and governments to create meaningful partnerships, drive investments, and build long-term industrial growth between Japan and India."

**CTAs**:
- Primary: "Support the Bureau" (Blue)
- Secondary: "Join Us" (Outlined or Saffron)

**Visual**:
- Abstract representation of Japan-India connection
- Could use subtle motifs: Mt. Fuji silhouette + Lotus or similar
- Or clean professional imagery of collaboration/industry

### 3. About JIBB Section
**Headline**: "Who We Are"

**Content**: The Japan India Business Bureau (JIBB) is a non-profit organization dedicated to strengthening economic, industrial, and cultural ties between Japan and India. Positioned as a strategic bridge between the two nations, JIBB enables meaningful collaboration by connecting stakeholders, businesses, institutions, and government stakeholders across both ecosystems.

**Key Points** (icon + text cards):
- Headquarters: Tokyo, Japan
- Operations: Noida, India
- Focus: Cross-border partnerships & market entry

### 4. What We Do Section
**Headline**: "Creating Pathways for Cross-Border Success"

**Services Grid** (4-5 cards):

1. **Trade & Investment Facilitation**
   Icon: Exchange/handshake
   "Facilitate trade and investment between India and Japan"

2. **Strategic Partnerships**
   Icon: Network/connection
   "Enable strategic partnerships and joint ventures"

3. **Market Entry Support**
   Icon: Globe/compass
   "Support market entry, localization, and expansion"

4. **Knowledge Exchange**
   Icon: Lightbulb/book
   "Drive knowledge exchange through industry insights"

5. **Innovation Scaling**
   Icon: Rocket/growth
   "Foster innovation and support global scaling of ideas"

### 5. Key Sectors Section
**Headline**: "Industries Shaping the Future"

**Sectors Grid** (8 items - clean icons + labels):
- Electronics & Semiconductors
- Automotive & Electric Vehicles
- Renewable Energy
- Pharmaceuticals
- Infrastructure
- Chemicals & Advanced Materials
- Advanced Manufacturing
- Emerging Technologies

**Design**: Clean grid, each sector with a simple line icon and label. Can use subtle hover effect (scale or color shift).

### 6. Our Approach Section
**Headline**: "How We Work"
**Subheadline**: "Successful cross-border collaboration requires more than connections-it requires understanding, trust, and execution."

**Three Pillars** (horizontal on desktop, vertical on mobile):

1. **Connect**
   "We bring together the right stakeholders across India and Japan"

2. **Facilitate**
   "We simplify market entry, partnerships, and operations"

3. **Enable Growth**
   "We support long-term collaboration and scalable business success"

### 7. Innovation Hub Section (Optional but recommended)
**Headline**: "The JIBB Innovation Hub"
**Subheadline**: "Where raw ideas become market-ready solutions"

**Features** (3 cards):
- State-of-the-Art Laboratories (Electronics, EV, Pharma)
- Startup Incubation (Workspace, mentorship, investor access)
- Expert Ecosystem (Industry experts, government officials, entrepreneurs)

**Locations**: Tokyo & Noida

### 8. What We Believe Section
**Headline**: "Our Vision"

**Values** (clean typography, possibly large quotes):
- "The future of India-Japan collaboration lies in long-term partnerships built on mutual trust and shared value."
- "We bridge not just businesses, but cultures."
- "Innovation as a driver of growth."

### 9. Call to Action Section
**Headline**: "Ready to Expand Your Reach?"
**Subheadline**: "Partner with JIBB to access exclusive industry insights, dedicated support, and a powerful cross-cultural network."

**CTAs**:
- Primary: "Support the Bureau"
- Secondary: "Join Us"

### 10. Footer
- JIBB Logo
- Quick Links: About | Services | Sectors | Contact
- Locations: Tokyo, Japan | Noida, India
- Email: contact@npo-jibb.org (or appropriate)
- Social Links (if any)
- Copyright

---

## Design Principles

### Visual Style
- **Clean & Professional**: Government/B2B service aesthetic
- **Trust-focused**: Navy blue dominance, minimal decoration
- **Cultural harmony**: Subtle Japanese-Indian visual bridges without being kitschy
- **No gradients**: Flat colors, clean separations
- **Generous whitespace**: Let content breathe
- **Clear hierarchy**: Obvious visual flow

### Layout Guidelines
- Max content width: 1280px (container)
- Section padding: 80px-120px vertical
- Card spacing: 24px-32px gaps
- Mobile-first responsive
- 8px spacing system

### Imagery Guidelines
- Professional photography of collaboration/industry
- Abstract geometric patterns (optional subtle backgrounds)
- Clean line icons (Lucide, Heroicons, or custom)
- NO emoji icons
- NO stock photos that look generic
- Potential: subtle motifs combining Japanese and Indian elements

### Animation (Subtle)
- Scroll-triggered fade-in reveals
- Smooth hover states on cards/buttons
- No jarring or excessive animation
- Respect reduced-motion preferences

---

## Technical Stack Recommendations

### Option 1: Next.js + Tailwind + shadcn/ui
```bash
npx create-next-app@latest jibb-website --typescript --tailwind --eslint
npx shadcn@latest init
```

### Option 2: Astro + Tailwind
```bash
npm create astro@latest jibb-website
npx astro add tailwind
```

### Option 3: Plain HTML + Tailwind
For maximum simplicity and performance.

---

## Component Checklist

- [ ] Navbar (sticky, responsive, mobile menu)
- [ ] Hero section with CTAs
- [ ] About section with key points
- [ ] Services/What We Do grid
- [ ] Sectors grid with icons
- [ ] Approach three-pillar section
- [ ] Innovation Hub feature cards
- [ ] Values/Vision section
- [ ] Final CTA section
- [ ] Footer with links and contact

---

## Accessibility Requirements

- All interactive elements keyboard accessible
- Focus states visible (2-4px outline)
- Alt text for all images
- Semantic HTML (proper heading hierarchy h1-h6)
- Color contrast minimum 4.5:1
- Skip to main content link
- ARIA labels for icon-only buttons
- Reduced motion support

---

## Performance Targets

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Optimize images (WebP/AVIF)
- Lazy load below-fold content
- Preload critical fonts

---

## Content Tone & Voice

- **Professional but approachable**
- **Confident without being boastful**
- **Clear and direct** (avoid jargon)
- **Action-oriented** (invite participation)
- **Bridge metaphor** runs throughout (connecting, linking, enabling)

---

## DO's and DON'Ts

### DO
- Use flat, solid colors
- Maintain professional B2B aesthetic
- Create clear visual hierarchy
- Use generous whitespace
- Keep animations subtle
- Use SVG icons
- Test on mobile first

### DON'T
- Use gradients
- Add career/jobs section
- Use emoji as icons
- Use generic stock photography
- Overcrowd sections with text
- Use more than 2-3 accent colors
- Neglect accessibility
- Add unnecessary animations

---

## Sample Hero Section Code (Tailwind)

```html
<section class="relative bg-white py-24 lg:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Enabling the Next Global Manufacturing Shift
      </h1>
      <p class="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
        We connect stakeholders, businesses, institutions, and governments to create
        meaningful partnerships, drive investments, and build long-term industrial
        growth between Japan and India.
      </p>
      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <a href="#contact"
           class="rounded-lg bg-blue-900 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900">
          Support the Bureau
        </a>
        <a href="#join"
           class="rounded-lg border-2 border-orange-600 px-8 py-4 text-base font-semibold text-orange-600 hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Join Us
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## Next Steps

1. Set up project with chosen tech stack
2. Configure color variables and typography
3. Build component library (buttons, cards, sections)
4. Implement responsive navigation
5. Build sections top-to-bottom
6. Add subtle scroll animations
7. Optimize images and fonts
8. Test accessibility
9. Performance audit
10. Deploy

---

*This prompt file contains all the information needed to build a professional, accessible, and culturally-sensitive landing page for JIBB. Follow the color system strictly (no gradients), maintain the professional B2B aesthetic, and ensure the page communicates trust and authority while celebrating the Japan-India partnership.*
