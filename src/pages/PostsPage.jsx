import { Heart, MessageCircle, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuth } from '../hooks/useAuth'

const timeAgo = (date) => { const hours = Math.max(1, Math.round((Date.now() - new Date(date)) / 3600000)); return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago` }

export function PostsPage() {
  const { user } = useAuth(); const [posts, setPosts] = useState([]); const [content, setContent] = useState(''); const [loading, setLoading] = useState(true); const [posting, setPosting] = useState(false)
  useEffect(() => { api.getPosts().then((data) => setPosts(data.results)).finally(() => setLoading(false)) }, [])
  const publish = async (event) => { event.preventDefault(); if (!content.trim()) return; setPosting(true); try { const post = await api.createPost({ content }); setPosts([post, ...posts]); setContent('') } finally { setPosting(false) } }
  return <div className="mx-auto max-w-2xl space-y-4"><form onSubmit={publish} className="glass rounded-2xl p-4 sm:p-5"><div className="flex gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">{user?.name?.[0]}</div><textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={500} rows="3" className="w-full resize-none bg-transparent pt-2 text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Share something useful with the community…" /></div><div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-xs text-slate-400">{content.length}/500</span><button disabled={posting || !content.trim()} className="btn-primary py-2"><Send size={15} />{posting ? 'Posting…' : 'Publish'}</button></div></form>
    {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-44 animate-pulse rounded-2xl bg-slate-200/60" />) : posts.map((post) => <article key={post.id} className="glass animate-rise rounded-2xl p-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 font-bold text-white">{post.author.name[0]}</div><div><p className="text-sm font-semibold text-slate-900">{post.author.name}</p><p className="text-xs text-slate-400">{timeAgo(post.createdAt)}</p></div></div><p className="py-5 text-[15px] leading-7 text-slate-700">{post.content}</p><div className="flex gap-5 border-t border-slate-100 pt-3 text-sm text-slate-400"><button className="flex items-center gap-2 hover:text-rose-500"><Heart size={17} />{post.likes}</button><button className="flex items-center gap-2 hover:text-indigo-500"><MessageCircle size={17} />Reply</button></div></article>)}</div>
}
