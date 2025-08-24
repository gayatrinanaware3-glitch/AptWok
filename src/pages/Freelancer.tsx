import React, { useState } from 'react'
const API = 'http://localhost:5000/api/escrow'
export default function Freelancer(){
  const [escrowId, setEscrowId] = useState<string>('1')
  const [githubLink, setGithubLink] = useState<string>('https://github.com/your/repo')
  const [bundle, setBundle] = useState<File|null>(null)
  const [status, setStatus] = useState<any>(null)

  const submit = async () => {
    if (!escrowId) return alert('Enter escrow id');
    const fd = new FormData()
    fd.append('id', escrowId)
    fd.append('githubLink', githubLink)
    if (bundle) fd.append('bundle', bundle)
    const res = await fetch(API + '/submit', { method:'POST', body: fd })
    const data = await res.json()
    alert('Submit TX: ' + (data.tx || data.error))
  }

  const refund = async () => {
    const res = await fetch(API + '/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(escrowId) })
    })
    const data = await res.json()
    alert('Refund TX: ' + (data.tx || data.error))
  }

  const check = async () => {
    const res = await fetch(API + '/status/' + escrowId)
    const data = await res.json()
    setStatus(data)
  }

  return (
    <div>
      <h2>Freelancer Dashboard</h2>
      <div style={{ display:'grid', gap:8, maxWidth:520 }}>
        <input placeholder='Escrow ID' value={escrowId} onChange={e=>setEscrowId(e.target.value)} />
        <input placeholder='GitHub Link' value={githubLink} onChange={e=>setGithubLink(e.target.value)} />
        <input type='file' accept='.zip' onChange={e=>setBundle(e.target.files?.[0]||null)} />
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={submit}>Submit Work</button>
          <button onClick={refund}>Request Refund</button>
          <button onClick={check}>Check Status</button>
        </div>
      </div>
      {status && (
        <pre style={{ background:'#f5f5f5', padding:12, marginTop:12, overflow:'auto' }}>
{JSON.stringify(status, null, 2)}
        </pre>
      )}
    </div>
  )
}