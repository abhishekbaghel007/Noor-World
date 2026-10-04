'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useWorldShell } from './WorldShell'
import { useToast } from '@/ui/Toast'

type Gift = { icon:string; type:string; title:string; copy:string }
type Contribution = { id:string; type:string; sender_name:string; content:string; created_at:string }

const gifts: Gift[] = [
  {icon:'🌷',type:'flower',title:'A flower',copy:'Something pretty for no particular reason.'},
  {icon:'🫂',type:'hug',title:'A hug',copy:'No speech. Just a very good hug.'},
  {icon:'💌',type:'note',title:'A tiny note',copy:'Write something she can keep.'},
  {icon:'😂',type:'joke',title:'Make her laugh',copy:'Terrible jokes are completely acceptable.'},
  {icon:'☕',type:'coffee',title:'Coffee',copy:'Emotionally responsible caffeine.'},
  {icon:'🍫',type:'chocolate',title:'Chocolate',copy:'A scientifically reasonable solution.'},
  {icon:'🧸',type:'teddy',title:'A teddy',copy:'Tiny comfort, zero explanation required.'},
  {icon:'✨',type:'sparkle',title:'A sparkle',copy:'Just because. The best reason.'},
]

const featureCards = [
  ['🧠','Know Noor','A tiny quiz for people who claim they know her.'],
  ['😂','Make Me Laugh','Friends compete to make her laugh.'],
  ['🏆','Noor Awards','Give her an unnecessarily specific award.'],
  ['🎵','Shared Songs','Leave a song beside a memory.'],
  ['📸','Meanwhile','A tiny snapshot from somebody\'s day.'],
  ['🔒','Open When','Little envelopes for future Noor.'],
]

export default function HomeScene() {
  const { tab, setTab } = useWorldShell()
  const toast = useToast()
  const [feed, setFeed] = useState<Contribution[]>([])
  const [selected, setSelected] = useState<Gift | null>(null)
  const [sender, setSender] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    try {
      const response = await fetch('/api/send', { cache:'no-store' })
      if (response.ok) setFeed((await response.json()).data || [])
    } catch { /* The world still works without the inbox. */ }
  }

  useEffect(() => { load(); const id = window.setInterval(load, 15000); return () => window.clearInterval(id) }, [])

  const counts = useMemo(() => feed.reduce<Record<string,number>>((all,item) => { all[item.type] = (all[item.type] || 0) + 1; return all }, {}), [feed])

  const submit = async () => {
    if (!selected || busy) return
    if (['note','joke'].includes(selected.type) && !content.trim()) { toast.show('Give it a little something first 💌'); return }
    setBusy(true)
    try {
      const response = await fetch('/api/send', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ type:selected.type, sender:sender || 'Anonymous', content:content || selected.copy, mood:'just-because' }) })
      if (!response.ok) throw new Error('send failed')
      setSelected(null); setSender(''); setContent(''); await load(); toast.show('Left a little something in Noor\'s world 🌻')
    } catch { toast.show('The little mailbox tripped over itself. Try again.') }
    finally { setBusy(false) }
  }

  return <div className='nw-page'>
    <section className='nw-hero'>
      <div className='nw-hero-copy'>
        <span className='nw-eyebrow'>A tiny internet made of people</span>
        <h1>Welcome to<br/><em>Noor&apos;s world.</em></h1>
        <p>Flowers grow here. Friends leave little things. Some days are silly, some are quiet. Nothing here asks her to be anything.</p>
        <div className='nw-actions'>
          <button className='nw-primary' onClick={() => setTab('send')}>Leave something 🌷</button>
          <button className='nw-secondary' onClick={() => setTab('play')}>Explore ✨</button>
        </div>
      </div>
      <div className='nw-landscape' aria-hidden='true'>
        <span className='nw-sun'>☀️</span><span className='nw-cloud nw-cloud-a'>☁️</span><span className='nw-cloud nw-cloud-b'>☁️</span>
        <span className='nw-butterfly'>🦋</span><div className='nw-hill nw-hill-back'/><div className='nw-hill nw-hill-front'/>
        <span className='nw-field-flower nw-f1'>🌻</span><span className='nw-field-flower nw-f2'>🌷</span><span className='nw-field-flower nw-f3'>🌼</span><span className='nw-bee'>🐝</span>
      </div>
    </section>

    <section className='nw-note'>
      <div><span className='nw-eyebrow'>People who thought of her</span><h2>{feed.length} little things have been left here.</h2><p>This number grows whenever somebody stops by and leaves a little piece of kindness.</p></div>
      <div className='nw-stats'><span>🌷 {counts.flower || 0}</span><span>🫂 {counts.hug || 0}</span><span>💌 {counts.note || 0}</span><span>😂 {counts.joke || 0}</span></div>
    </section>

    {tab === 'home' && <>
      <section className='nw-section'><div className='nw-section-head'><div><span className='nw-eyebrow'>The little inbox</span><h2>People left something.</h2></div><button onClick={() => setTab('send')} className='nw-link'>leave yours →</button></div>
        <div className='nw-feed'>{feed.length === 0 ? <div className='nw-empty'>The garden is waiting for its first little thing. 🌻</div> : feed.slice(0,8).map(item => { const gift = gifts.find(g => g.type === item.type); return <article className='nw-feed-card' key={item.id}><span>{gift?.icon || '🌻'}</span><div><b>{item.sender_name}</b><small>{gift?.title || 'left something'}</small><p>{item.content || 'No words needed. 🤍'}</p></div><time>{new Date(item.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</time></article> })}</div>
      </section>
      <section className='nw-section'><div className='nw-section-head'><div><span className='nw-eyebrow'>Made for friends</span><h2>Do something silly.</h2></div></div><div className='nw-grid'>{featureCards.map(([icon,title,copy]) => <button key={title} className='nw-feature' onClick={() => toast.show('✨ '+title+' is joining the world.')}><span>{icon}</span><div><b>{title}</b><p>{copy}</p></div><i>›</i></button>)}</div></section>
    </>}

    {tab === 'play' && <section className='nw-section'><div className='nw-section-head'><div><span className='nw-eyebrow'>The playground</span><h2>Important nonsense.</h2><p>Games, quizzes, polls and friend challenges belong here.</p></div></div><div className='nw-grid'>{[['👆','Tap 20 Times','Tap until dignity leaves the room.'],['⚡','Reaction Test','Let us measure human reflexes.'],['🔢','Guess My Number','A perfectly serious investigation.'],['🧠','Remember This','Your brain has been summoned.'],['😈','Annoy Me Back','An important scientific experiment.'],['🗳️','Daily Poll','Finally, a place for crucial questions.']].map(([icon,title,copy]) => <button key={title} className='nw-feature' onClick={() => toast.show('🎮 '+title+' is being prepared.')}><span>{icon}</span><div><b>{title}</b><p>{copy}</p></div><i>›</i></button>)}</div></section>}

    {tab === 'send' && <section className='nw-section'><div className='nw-section-head'><div><span className='nw-eyebrow'>Leave something for Noor</span><h2>Pick a little thing.</h2><p>No reply required. Just leave it here.</p></div></div><div className='nw-send-grid'>{gifts.map(gift => <button className='nw-send-card' key={gift.type} onClick={() => setSelected(gift)}><span>{gift.icon}</span><b>{gift.title}</b><p>{gift.copy}</p><strong>leave it →</strong></button>)}</div></section>}

    <section className='nw-garden'><div><span className='nw-eyebrow'>Noor&apos;s garden</span><h2>It grows when people care.</h2><p>Every flower, hug, note and ridiculous little gift becomes part of this world.</p></div><div className='nw-garden-art'>🌻 🌷 🌼 🪻 🌻<br/>🦋 🌸 🫂 🌷 🐝</div></section>

    {selected && <div className='nw-modal-backdrop' onClick={() => setSelected(null)}><div className='nw-modal' onClick={event => event.stopPropagation()}><button className='nw-close' onClick={() => setSelected(null)}>×</button><div className='nw-modal-icon'>{selected.icon}</div><span className='nw-eyebrow'>{selected.title}</span><h2>Leave it in the world.</h2><input value={sender} onChange={e => setSender(e.target.value)} placeholder='Your name (or leave blank)'/><textarea value={content} onChange={e => setContent(e.target.value)} placeholder='Write something small and real...' maxLength={1000}/><button className='nw-primary nw-full' disabled={busy} onClick={submit}>{busy ? 'leaving it...' : 'Leave it in the garden 🌷'}</button></div></div>}
  </div>
}
