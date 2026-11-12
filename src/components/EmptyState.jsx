export function EmptyState({ icon: Icon, title, copy, action }) {
  return <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center"><span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><Icon size={22} /></span><h3 className="font-display font-bold text-slate-900">{title}</h3><p className="mt-1 max-w-sm text-sm text-slate-500">{copy}</p>{action && <div className="mt-5">{action}</div>}</div>
}
