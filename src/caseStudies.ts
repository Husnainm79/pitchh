export type CaseStudyId = 'zilbil' | 'bloodline-motors' | 'devsinc' | 'hamza-bhatti'

export type CaseTone = 'purple' | 'green' | 'navy' | 'split'

export interface CaseStudy {
  id: CaseStudyId
  badge: string
  title: string
  subtext: string
  showcaseTitle: string
  tone: CaseTone
  hook: {
    title: string
    copy: string
  }
  visual: {
    title: string
    caption: string
  }
  platforms: {
    instagram: string
    linkedin: string
  }
  takeaway: string
  proofs?: Array<{ src: string; alt: string }>
  story?: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'zilbil',
    badge: '[ E-COMMERCE / BRAND ]',
    title: 'ZILBIL',
    subtext: 'Short, Hooky & High Retention Content',
    showcaseTitle: 'ZILBIL Showcase',
    tone: 'purple',
    hook: {
      title: 'The Content Hook & Strategy',
      copy: 'Short, raw, non-flashy editing with zero fluff. Every frame opens on a problem the shopper already feels, then lands the product as the obvious next step. Retention comes from speed and clarity, not production gloss.',
    },
    visual: {
      title: 'Visual Proof Assets',
      caption: 'Post screenshot / engagement layout slot',
    },
    platforms: {
      instagram: 'Short-form product hooks, direct-to-camera demos, and high-retention reels built for scroll interruption.',
      linkedin: 'Written context around the product story, carousel breakdowns, and proof of creative systems that convert.',
    },
    takeaway:
      'We apply the same hook-first formula to founder and brand feeds: diagnose the friction in the first seconds, prove the offer visually, and route attention into a low-friction DM.',
    proofs: [
      { src: '/cases/zilbil-store.jpg', alt: 'Zilbil store Instagram profile' },
      { src: '/cases/zilbil-founder.jpg', alt: 'Shazil Ahmed founder Instagram profile' },
    ],
    story:
      'All marketing ran through documentary-style videos from the founder. People bought from the brand on the base he built: he was the face of the product, and sales came through that generic founder-led content.',
  },
  {
    id: 'bloodline-motors',
    badge: '[ AUTOMOTIVE / VISUAL ]',
    title: 'BLOODLINE MOTORS',
    subtext: 'Documentary Style & Product Visuals',
    showcaseTitle: 'BLOODLINE MOTORS Showcase',
    tone: 'green',
    hook: {
      title: 'The Content Hook & Strategy',
      copy: 'Documentary pacing turns metal, craft, and motion into a story people stay with. Product shots earn their place inside narrative beats, so the vehicle feels earned rather than advertised.',
    },
    visual: {
      title: 'Visual Proof Assets',
      caption: 'Documentary frame / product visual slot',
    },
    platforms: {
      instagram: 'Documentary-style reels, product close-ups, and atmospheric cuts that hold attention past the first three seconds.',
      linkedin: 'Build narratives, process carousels, and visual system diagrams that show how the brand is constructed in public.',
    },
    takeaway:
      'For clients with a physical product or craft story, we borrow this documentary spine: show the build, name the standard, and let the visuals carry authority into inbound conversations.',
    proofs: [
      { src: '/cases/bloodline-profile.jpg', alt: 'Bloodline Motors Instagram profile' },
      { src: '/cases/bloodline-grid.jpg', alt: 'Bloodline Motors Instagram content grid' },
    ],
    story:
      'There is no physical dealership. Sales come entirely through content, with zero paid ads: daily vlogs from the founder and car-focused vlogs that turn trust into transactions.',
  },
  {
    id: 'devsinc',
    badge: '[ TECH LEADERSHIP / B2B ]',
    title: 'DEVSINC / USMAN ASIF',
    subtext: 'Founder Face Value & Enterprise Authority',
    showcaseTitle: 'DEVSINC / USMAN ASIF Showcase',
    tone: 'navy',
    hook: {
      title: 'The Content Hook & Strategy',
      copy: 'The founder is the product surface. Face-to-camera takes, operational clarity, and enterprise language turn leadership into a distribution channel. Authority compounds because the person and the company move as one signal.',
    },
    visual: {
      title: 'Visual Proof Assets',
      caption: 'Founder post / leadership screenshot slot',
    },
    platforms: {
      instagram: 'Founder reels and reality-check clips that humanize enterprise work without diluting the brand.',
      linkedin: 'Deep written posts, PDF carousels, and frameworks that position Usman and Devsinc for decision-maker attention.',
    },
    takeaway:
      'We mirror this founder-as-channel model for CEOs: publish domain judgment in their voice, pair it with company proof, and convert recognition into inbound project DMs.',
    proofs: [
      { src: '/cases/devsinc-usman-grid.jpg', alt: 'Usman Asif Instagram content grid' },
      { src: '/cases/devsinc-roundtable.jpg', alt: 'Round Table founder content still' },
      { src: '/cases/devsinc-official-grid.jpg', alt: 'Devsinc official Instagram grid' },
    ],
    story:
      'Devsinc is a tech company whose CEO builds trust through face value, not ad gloss. Round-table reality checks and founder-led reels carry the judgment; the corporate feed carries the proof behind him.',
  },
  {
    id: 'hamza-bhatti',
    badge: '[ PERSONAL BRAND / INFLUENCE ]',
    title: 'HAMZA BHATTI',
    subtext: 'Segregated Channels · Instagram Reels · LinkedIn Visual Authority',
    showcaseTitle: 'HAMZA BHATTI Showcase',
    tone: 'split',
    hook: {
      title: 'The Content Hook & Strategy',
      copy: 'Raw storytelling beats polished fluff. The reel opens on a lived tension, holds with honest pacing, and closes on a line people remember. Retention is earned by feeling true, then useful.',
    },
    visual: {
      title: 'Visual Proof Assets',
      caption: 'Reel still / storytelling screenshot slot',
    },
    platforms: {
      instagram: 'High-retention storytelling reels, direct-to-camera reality checks, and cuts that keep the founder in frame.',
      linkedin: 'Longer written context around the same stories, plus carousels that turn a reel insight into a shareable framework.',
    },
    takeaway:
      'For personal brands, we use this raw-story engine: one sharp narrative, two channel treatments, and a profile funnel that turns viewers into conversations.',
    proofs: [
      { src: '/cases/hamza-linkedin-profile.jpg', alt: 'Hamza Bhatti LinkedIn profile' },
      { src: '/cases/hamza-linkedin-post.png', alt: 'Hamza Bhatti LinkedIn visual post' },
      { src: '/cases/hamza-instagram-grid.jpg', alt: 'Hamza Bhatti Instagram content grid' },
    ],
    story:
      'Content is segregated on purpose. Instagram is short-form video and a showcase of the work, with pillars defined and kept distinct. LinkedIn carries the business and professional side through visual posts that build trust without blurring the two feeds.',
  },
]

export const corePillars = [
  {
    id: 'problem',
    title: 'Problem-Diagnosing Content',
    copy: 'Addressing exact client and customer friction.',
  },
  {
    id: 'authority',
    title: 'Domain Authority',
    copy: 'Demonstrating proprietary technical and creative capabilities.',
  },
  {
    id: 'case-studies',
    title: 'Deconstructed Case Studies',
    copy: 'Live visual proof of execution and product builds.',
  },
  {
    id: 'conversion',
    title: 'Frictionless Conversion',
    copy: 'Low-friction DM entry points and profile funnels.',
  },
] as const
