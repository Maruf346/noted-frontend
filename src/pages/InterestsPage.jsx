import { Tags, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../api/client'

const shades = ['bg-indigo-50 text-indigo-600', 'bg-violet-50 text-violet-600', 'bg-sky-50 text-sky-600', 'bg-emerald-50 text-emerald-600', 'bg-amber-50 text-amber-600']

export function InterestsPage() {
  const [groups, setGroups] = useState([]); const [loading, setLoading] = useState(true)
  useEffect(() => { api.getInterestGroups().then(setGroups).finally(() => setLoading(false)) }, [])
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{loading ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-slate-200/60" />) : groups.map((group, index) => <article key={group.interest} className="glass animate-rise rounded-2xl p-5"><div className={`mb-5 flex size-10 items-center justify-center rounded-xl ${shades[index % shades.length]}`}><Tags size={19} /></div><div className="flex items-end justify-between"><div><h2 className="font-display text-lg font-bold text-slate-900">{group.interest}</h2><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400"><Users size={13} />{group.count} {group.count === 1 ? 'member' : 'members'}</p></div><div className="flex -space-x-2">{group.users.slice(0, 4).map((user) => <span title={user.name} key={user.id} className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-xs font-bold text-white">{user.name[0]}</span>)}</div></div><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs leading-5 text-slate-500">{group.users.map((user) => user.name).join(', ')}</p></div></article>)}</div>
}
