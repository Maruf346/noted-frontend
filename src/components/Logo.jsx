import { Feather } from 'lucide-react'

export function Logo({ light = false }) {
  return <div className="flex items-center gap-2.5"><span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><Feather size={18} /></span><span className={`font-display text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>noted<span className="text-indigo-500">.</span></span></div>
}
