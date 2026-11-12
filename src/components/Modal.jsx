import { X } from 'lucide-react'

export function Modal({ title, description, open, onClose, children, size = 'max-w-lg' }) {
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className={`glass animate-rise w-full ${size} rounded-2xl bg-white p-5 sm:p-6`} role="dialog" aria-modal="true">
      <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      {children}
    </div>
  </div>
}
