export type BrandId = 'inspired-analyst' | 'hadi-elearning'

export interface Brand {
  id: BrandId
  badge: string
  title: string
  tagline: string
  target: string
  channels: string
  showcaseTitle: string
  tone: 'purple' | 'green'
  logo?: string
}

export const brands: Brand[] = [
  {
    id: 'inspired-analyst',
    badge: '[ Personal Brand / Consulting ]',
    title: 'Inspired Analyst',
    tagline: 'Positioning Domain Expertise into Inbound B2B Opportunities',
    target: 'Decision-Makers & Founders',
    channels: 'LinkedIn & Instagram',
    showcaseTitle: 'Inspired Analyst Showcase',
    tone: 'purple',
    logo: '/inspired-analyst-logo.jpg',
  },
  {
    id: 'hadi-elearning',
    badge: '[ Corporate Brand / EdTech ]',
    title: 'Hadi E-learning',
    tagline: 'Scaling Educational Reach & High-Intent Student Conversions',
    target: 'Tech Aspirants & Professionals',
    channels: 'Instagram & LinkedIn',
    showcaseTitle: 'Hadi E-learning Showcase',
    tone: 'green',
    logo: '/hadi-elearning-logo.jpg',
  },
]

export const pillars = [
  {
    id: 'creative',
    label: 'Creative',
    title: 'Visual & Content Production',
    copy: 'High-converting visual slide decks, carousel design systems, short-form reel assets, and clean typography layouts tailored for maximum readability.',
    slot: 'Post screenshot slot',
  },
  {
    id: 'reach',
    label: 'Reach and Engagement',
    title: 'Reach and Engagement',
    copy: 'Multi-channel distribution tactics targeting high-intent decision-makers and target learner demographics without relying on low-value viral noise.',
    slot: 'Distribution chart slot',
  },
  {
    id: 'engagement',
    label: 'Business Development',
    title: 'Business Development',
    copy: 'Strategic commentary frameworks, high-trust story funnels, and DM conversion pathways that turn viewers into active project inquiries.',
    slot: 'Message and interaction slot',
  },
] as const

export const brandNotes: Record<BrandId, Record<(typeof pillars)[number]['id'], string>> = {
  'inspired-analyst': {
    creative: 'Analytical carousels, founder reels, and executive type built for a personal brand.',
    reach:
      'Impressions are how far the work travels. Engagements are how often people stop and respond.',
    engagement:
      'Leads arrive on their own, through organic content, with no paid funnel behind them. The personal brand and the business brand expand side by side, each as its own channel, so demand has two distinct ways in.',
  },
  'hadi-elearning': {
    creative: 'Lesson carousels, course explainers, and instructor reels built for an EdTech brand.',
    reach:
      'These numbers were reached with a total ad spend of Rs. 0. Hadi is a funded NGO that was short on funds, and the growth was scaled organically through LinkedIn, Facebook groups, Facebook creatives, Instagram reels, and Instagram carousels.',
    engagement: 'Story paths and comments that turn interest into a student conversation.',
  },
}
