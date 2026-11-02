export type WorkId = 'inspired-analyst' | 'hadi-elearning' | 'single-solution' | 'talksmith'

export type WorkTone = 'purple' | 'emerald' | 'lime' | 'violet' | 'crimson' | 'sapphire' | 'amber'

export interface WorkPillar {
  id: 'creative' | 'reach' | 'engagement' | 'usp'
  label: string
  title: string
  copy: string
}

export interface WorkProject {
  id: WorkId
  badge: string
  title: string
  tagline: string
  tags: string[]
  tone: WorkTone
  coverImage: string
  coverSide: 'left' | 'right'
  coverPosition?: string
  logo?: string
  proofs?: Array<{ src: string; alt: string }>
  pillars: WorkPillar[]
}

const toneGlow: Record<WorkTone, string> = {
  purple: 'rgba(59, 7, 100, 0.55)',
  emerald: 'rgba(6, 78, 59, 0.55)',
  lime: 'rgba(163, 230, 53, 0.22)',
  violet: 'rgba(46, 16, 101, 0.55)',
  crimson: 'rgba(69, 10, 10, 0.55)',
  sapphire: 'rgba(30, 58, 138, 0.45)',
  amber: 'rgba(69, 26, 3, 0.55)',
}

export function glowFor(tone: WorkTone) {
  return toneGlow[tone]
}

export const workProjects: WorkProject[] = [
  {
    id: 'inspired-analyst',
    badge: '[ PERSONAL BRAND / CONSULTING ]',
    title: 'Inspired Analyst',
    tagline: 'Positioning Domain Expertise into Inbound B2B Deals.',
    tags: ['LinkedIn Strategy', 'Instagram Funnels', 'Inbound Pipelines'],
    tone: 'purple',
    coverImage: '/inspired/poster.png',
    coverSide: 'right',
    coverPosition: '62% center',
    logo: '/inspired-analyst-logo.jpg',
    proofs: [
      { src: '/inspired/linkedin-profile.png', alt: 'Inspired Analyst LinkedIn profile' },
      { src: '/inspired/partnership.jpg', alt: 'Partnership visual' },
      { src: '/inspired/impressions-period.jpg', alt: 'Impressions analytics' },
      { src: '/inspired/inquiry.png', alt: 'Inbound inquiry' },
    ],
    pillars: [
      {
        id: 'creative',
        label: 'Creative',
        title: 'Visual & Content Production',
        copy: 'Analytical carousels, founder reels, and executive type systems that make domain expertise readable in the first three seconds.',
      },
      {
        id: 'reach',
        label: 'Reach',
        title: 'Impression Velocity',
        copy: 'Multi-channel distribution aimed at decision-makers. Impressions measure travel distance; engagements measure who stops and responds.',
      },
      {
        id: 'engagement',
        label: 'Engagement',
        title: 'Inbound Business Development',
        copy: 'Organic leads arrive without a paid funnel. Personal brand and company brand run as dual channels, each opening a distinct path into project conversations.',
      },
      {
        id: 'usp',
        label: 'USP & Takeaway',
        title: 'Authority → Pipeline',
        copy: 'The differentiating move is pairing analytical authority with a dual-brand distribution system, so expertise compounds into inbound B2B deals instead of vanity reach.',
      },
    ],
  },
  {
    id: 'hadi-elearning',
    badge: '[ CORPORATE BRAND / EDTECH ]',
    title: 'Hadi E-learning',
    tagline: 'Scaling Educational Reach & High-Intent Student Conversions.',
    tags: ['Student Acquisition', 'Visual Content', 'Course Launches'],
    tone: 'emerald',
    coverImage: '/hadi/video-hassan.jpg',
    coverSide: 'left',
    coverPosition: 'center top',
    logo: '/hadi-elearning-logo.jpg',
    proofs: [
      { src: '/hadi/success.jpg', alt: 'Student success story' },
      { src: '/hadi/eid.jpg', alt: 'Eid campaign creative' },
      { src: '/hadi/outcomes.png', alt: 'Enrollment outcomes' },
      { src: '/hadi/search.png', alt: 'Organic search performance' },
    ],
    pillars: [
      {
        id: 'creative',
        label: 'Creative',
        title: 'Course & Campaign Visuals',
        copy: 'Lesson carousels, instructor reels, testimonials, and seasonal campaigns built for an EdTech brand that needs clarity and trust at first glance.',
      },
      {
        id: 'reach',
        label: 'Reach',
        title: 'Organic Distribution at Scale',
        copy: 'Growth with Rs. 0 ad spend through LinkedIn, Facebook groups, Facebook creatives, Instagram reels, and carousels — funded NGO constraints, organic execution.',
      },
      {
        id: 'engagement',
        label: 'Engagement',
        title: 'High-Intent Student Paths',
        copy: 'Story funnels, success narratives, and comment frameworks that turn interest into enrollment conversations for tech aspirants and professionals.',
      },
      {
        id: 'usp',
        label: 'USP & Takeaway',
        title: 'Proof Over Paid Media',
        copy: 'The brand wins by making student outcomes and instructor presence the media — converting social proof into high-intent acquisition without paid amplification.',
      },
    ],
  },
  {
    id: 'single-solution',
    badge: '[ TECH COMPANY / BRAND IDENTITY ]',
    title: 'Single Solution',
    tagline: 'Building Scalable Digital Systems with AI-Driven Engineering & Marketing.',
    tags: ['Brand Identity', 'LinkedIn Presence', 'Instagram System'],
    tone: 'lime',
    coverImage: '/single-solution/systems-banner.jpg',
    coverSide: 'right',
    coverPosition: 'right center',
    logo: '/single-solution/logo.jpg',
    proofs: [
      { src: '/single-solution/logo.jpg', alt: 'Single Solution logo mark' },
      { src: '/single-solution/systems-banner.jpg', alt: 'Digital systems brand banner' },
      { src: '/single-solution/developer-banner.jpg', alt: 'Full stack developer brand banner' },
      { src: '/single-solution/linkedin-banner.png', alt: 'Single Solution LinkedIn company page' },
      { src: '/single-solution/instagram-profile.jpg', alt: 'Single Solution Instagram profile' },
    ],
    pillars: [
      {
        id: 'creative',
        label: 'Creative',
        title: 'Neon Tech Brand System',
        copy: 'A black-and-lime visual language built around a geometric S mark, high-contrast banners, and tech iconography that signals AI-driven engineering without looking generic.',
      },
      {
        id: 'reach',
        label: 'Reach',
        title: 'LinkedIn & Instagram Presence',
        copy: 'Company page and Instagram identity designed so the brand reads instantly in feed — digital systems, AI engineering, and marketing as one coherent tech signal.',
      },
      {
        id: 'engagement',
        label: 'Engagement',
        title: 'Image People Remember',
        copy: 'Positioning as the problem-solving partner for web, mobile, AI, SEO, and marketing — content surfaces that turn a services company into a recognizable tech brand.',
      },
      {
        id: 'usp',
        label: 'USP & Takeaway',
        title: 'Identity Before Inbound',
        copy: 'Single Solution needed branding that could carry a serious tech image. The system gives them a sharp mark, a repeatable visual language, and social assets that portray the company they want to be seen as.',
      },
    ],
  },
  {
    id: 'talksmith',
    badge: '[ AI PRODUCT / BRAND & SOCIAL ]',
    title: 'TalkSmith',
    tagline: 'Voice AI for SMBs — branding and social that make calling agents feel inevitable.',
    tags: ['Brand Identity', 'LinkedIn Presence', 'Instagram System'],
    tone: 'sapphire',
    coverImage: '/talksmith/voice-banner.png',
    coverSide: 'left',
    coverPosition: 'right center',
    logo: '/talksmith/logo.jpg',
    proofs: [
      { src: '/talksmith/logo.jpg', alt: 'TalkSmith logo' },
      { src: '/talksmith/voice-banner.png', alt: 'Voice AI for SMBs brand banner' },
      { src: '/talksmith/linkedin.png', alt: 'TalkSmith LinkedIn company page' },
      { src: '/talksmith/instagram.jpg', alt: 'TalkSmith Instagram profile' },
    ],
    pillars: [
      {
        id: 'creative',
        label: 'Creative',
        title: 'Voice AI Visual Language',
        copy: 'A friendly stacked wordmark, frosted glass UI motifs, waveforms, and a signature blue orb — branding that makes automated calling feel human, modern, and trustworthy.',
      },
      {
        id: 'reach',
        label: 'Reach',
        title: 'LinkedIn & Instagram Presence',
        copy: 'Company page and Instagram identity built around “Voice AI for SMBs,” so SMBs instantly understand automated calls, real-time handling, and 24/7 availability.',
      },
      {
        id: 'engagement',
        label: 'Engagement',
        title: 'Demo-Led Social Engine',
        copy: 'Content framed to pull people into demos — “we talk so you don’t have to” — turning product proof and behind-the-scenes into conversations with buyers.',
      },
      {
        id: 'usp',
        label: 'USP & Takeaway',
        title: 'Product Brand that Sells Calls',
        copy: 'TalkSmith sells AI calling agents. The branding and social system give the product a clear face, a memorable promise, and channels that convert curiosity into booked demos.',
      },
    ],
  },
]
