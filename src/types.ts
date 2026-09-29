import type { LucideIcon } from 'lucide-react'

export type ApproachMode = 'trap' | 'inbound'

export interface ApproachPoint {
  title: string
  detail: string
  icon: LucideIcon
}

export interface Approach {
  id: ApproachMode
  label: string
  diagnosis: string
  summary: string
  points: ApproachPoint[]
}

export type PillarAccent = 'navy' | 'purple' | 'green'

export interface Pillar {
  id: string
  index: string
  title: string
  headline: string
  accent: PillarAccent
  application: string
  outcome: string
  examples: string[]
  icon: LucideIcon
}

export interface DistributionBranch {
  id: 'linkedin' | 'instagram'
  branch: string
  title: string
  audience: string
  formats: string[]
  icon: LucideIcon
}
