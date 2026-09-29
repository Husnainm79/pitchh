import { ArrowRight, Layers } from 'lucide-react'
import { branches, coreAsset } from '../content.ts'
import { cx } from '../lib/cx.ts'
import type { DistributionBranch } from '../types.ts'

function BranchCard({ branch }: { branch: DistributionBranch }) {
  const linkedin = branch.id === 'linkedin'
  const Icon = branch.icon

  return (
    <article
      className={cx(
        'flex h-full flex-col rounded-3xl border bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        linkedin ? 'border-slate-900/20' : 'border-emerald-900/25',
      )}
    >
      <div
        className={cx(
          'mb-5 h-1 w-16 rounded-full',
          linkedin ? 'bg-gradient-to-r from-slate-900 to-purple-900' : 'bg-gradient-to-r from-purple-900 to-emerald-900',
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <span
          className={cx(
            'grid h-10 w-10 place-items-center rounded-xl text-white shadow-sm',
            linkedin ? 'bg-slate-900' : 'bg-purple-900',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p
          className={cx(
            'font-mono text-xs uppercase tracking-[0.18em]',
            linkedin ? 'text-purple-900' : 'text-emerald-900',
          )}
        >
          {branch.branch}
        </p>
      </div>
      <h4 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">{branch.title}</h4>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Target</p>
      <p className="mt-2 text-lg leading-relaxed text-slate-800">{branch.audience}</p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-base font-medium text-slate-500">
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        Adapted from the core insight
      </p>
      <ol className="mt-4 space-y-3">
        {branch.formats.map((format, index) => (
          <li key={format} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
              Format {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-1.5 text-lg font-medium tracking-tight text-slate-900">{format}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}

function Fork() {
  return (
    <div className="relative mx-auto hidden w-full lg:block" aria-hidden="true">
      <div className="mx-auto h-7 w-px bg-gradient-to-b from-purple-900 to-slate-300" />
      <div className="relative">
        <span className="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900 ring-4 ring-white" />
        <div className="grid grid-cols-2 gap-8">
          <div className="relative flex justify-center">
            <span className="h-8 w-px bg-slate-300" />
            <span className="absolute left-1/2 top-0 h-px w-[calc(50%+1rem)] bg-slate-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="h-8 w-px bg-slate-300" />
            <span className="absolute right-1/2 top-0 h-px w-[calc(50%+1rem)] bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Distribution() {
  return (
    <div id="distribution">
      <div className="max-w-2xl">
        <h3 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Channel Distribution Strategy: LinkedIn vs. Instagram
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-slate-700 sm:text-xl">
          One core technical insight is adapted for two agency channels. The research happens once.
          The format changes for the room it enters.
        </p>
      </div>

      <div className="mt-8">
        <article className="relative mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm sm:p-10">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
            <Layers className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-purple-900">
            {coreAsset.kicker}
          </p>
          <h4 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {coreAsset.title}
          </h4>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
            {coreAsset.detail}
          </p>
        </article>

        <div className="flex justify-center py-3 lg:hidden" aria-hidden="true">
          <ArrowRight className="h-4 w-4 rotate-90 text-slate-400" />
        </div>
        <Fork />

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-900/20 bg-emerald-50 px-5 py-4">
        <Layers className="mt-0.5 h-4 w-4 shrink-0 text-emerald-900" aria-hidden="true" />
        <p className="text-lg leading-relaxed text-emerald-900">
          <span className="font-semibold">One production cycle.</span> The case study is built once,
          then cut into a LinkedIn narrative and an Instagram visual system.
        </p>
      </div>
    </div>
  )
}
