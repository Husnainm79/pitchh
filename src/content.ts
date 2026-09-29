import {
  BarChart3,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import type { Approach, DistributionBranch, Pillar } from './types.ts'

export const approaches: Record<Approach['id'], Approach> = {
  trap: {
    id: 'trap',
    label: 'The Traditional Agency Trap',
    diagnosis: 'Visible activity. No reason for a buyer to call.',
    summary:
      'Generic tech posts and a follower count do not tell a founder or CTO why this agency should be hired.',
    points: [
      {
        title: 'Posting generic tech news',
        detail: 'Industry headlines anyone could repost. No point of view, and no buyer in the frame.',
        icon: Cpu,
      },
      {
        title: 'Vanity follower count',
        detail: 'Audience size with no filter for budget, title, or authority to hire.',
        icon: Users,
      },
      {
        title: 'Shouting "We build apps!"',
        detail: 'A brochure in public. Capability claims with no problem attached.',
        icon: Code2,
      },
      {
        title: 'Zero lead attribution',
        detail: 'Nothing connects a post to a qualified project inquiry.',
        icon: BarChart3,
      },
      {
        title: 'Competing purely on price',
        detail: 'When the content does not prove judgment, the only lever left is the fee.',
        icon: Zap,
      },
    ],
  },
  inbound: {
    id: 'inbound',
    label: 'The Inbound Demand Engine (Our Model)',
    diagnosis: 'Technical proof, published clearly, becomes the pipeline.',
    summary:
      'Founders and CTOs recognize their own system in the work, then start the project conversation themselves.',
    points: [
      {
        title: 'Solving client pain points publicly',
        detail: 'The post names the bottleneck a founder or product owner already feels.',
        icon: Target,
      },
      {
        title: 'Demonstrating real architectural wins',
        detail: 'The delivery work is the evidence, explained in language a buyer can follow.',
        icon: Layers,
      },
      {
        title: 'Attracting high-intent founders/CTOs',
        detail: 'The right people see their own platform in the story and lean in.',
        icon: Users,
      },
      {
        title: 'Positioning as high-ticket consultants',
        detail: 'Judgment is visible before a proposal is sent, so the fee is no longer the argument.',
        icon: CheckCircle2,
      },
    ],
  },
}

export const approachList: Approach[] = [approaches.trap, approaches.inbound]

export const pillars: Pillar[] = [
  {
    id: 'problem',
    index: '01',
    title: 'Problem-Diagnosing Content',
    headline: 'We understand your technical and operational friction.',
    accent: 'navy',
    application:
      'Posts that articulate specific client bottlenecks, such as why offshore dev teams stall out, or the hidden cost of legacy code in scaling platforms.',
    outcome: 'Immediate resonance with CEOs and Product Owners.',
    examples: [
      'Why offshore dev teams stall out.',
      'The hidden cost of legacy code in scaling platforms.',
      'The sprint board is full. The release is still late.',
    ],
    icon: Target,
  },
  {
    id: 'authority',
    index: '02',
    title: 'Technical & Domain Authority',
    headline: 'We build superior technical solutions.',
    accent: 'purple',
    application:
      'Breaking down proprietary engineering frameworks, system architectures, and UI/UX audit methodologies.',
    outcome: 'Moves the agency out of price wars and into high-ticket advisory positioning.',
    examples: [
      'The architecture review we run before a line of code is written.',
      'A UI audit that starts with the workflow, not the screens.',
      'Why another framework will not fix a broken handoff.',
    ],
    icon: Cpu,
  },
  {
    id: 'proof',
    index: '03',
    title: 'Deconstructed Case Studies (Proof Engine)',
    headline: 'Here is exactly how we solved it for others.',
    accent: 'green',
    application:
      'Step-by-step visual breakdowns of real projects, such as how we cut page load speeds by 60% for an e-commerce platform.',
    outcome: 'De-risks the client decision before they ever jump on a discovery call.',
    examples: [
      'How we cut page load speeds by 60% for an e-commerce platform.',
      'The three changes that took a client portal from fragile to shippable.',
      'What we removed from the stack, and what shipped the next month.',
    ],
    icon: BarChart3,
  },
  {
    id: 'conversion',
    index: '04',
    title: 'Low-Friction Inbound Conversion',
    headline: 'Turn reader trust into high-intent project inquiries.',
    accent: 'purple',
    application:
      'Strategic calls to action that direct decision-makers to request a system audit, or to send a direct message on LinkedIn or Instagram.',
    outcome: 'A predictable stream of qualified project opportunities.',
    examples: [
      'Comment AUDIT for a 20-minute system review.',
      'DM ARCHITECTURE and we will map one bottleneck.',
      'Request the audit. No deck. No pitch theater.',
    ],
    icon: Zap,
  },
]

export const coreAsset = {
  kicker: 'Core input',
  title: '1 In-Depth Case Study / Technical Architecture Breakdown',
  detail:
    'One technical insight, researched once. LinkedIn and Instagram are native formats of that asset, not a second content program.',
}

export const branches: DistributionBranch[] = [
  {
    id: 'linkedin',
    branch: 'LinkedIn branch',
    title: 'LinkedIn',
    audience: 'CTOs, VPs of Engineering, Founders, Product Directors.',
    formats: [
      'Case studies',
      'Documentary style building series',
      'Proof of work',
      'Client testimonials',
    ],
    icon: Users,
  },
  {
    id: 'instagram',
    branch: 'Instagram branch',
    title: 'Instagram',
    audience: 'Visual-first founders, agency partners, design-led startups.',
    formats: [
      '30–40 second reels',
      '2-minute explainers',
      "CEO's personal branding reels",
      'Carousels',
    ],
    icon: Layers,
  },
]
