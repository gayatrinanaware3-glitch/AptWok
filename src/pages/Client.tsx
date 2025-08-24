import React, { useState } from 'react'
const API = 'http://localhost:5000/api/escrow'
export default function Client(){
  const [client, setClient] = useState<string>('0xCLIENTADDR...')
  const [freelancer, setFreelancer] = useState<string>('0xFREELANCER...')
  const [amountAPT, setAmountAPT] = useState<string>('0.1')
  const [escrowId, setEscrowId] = useState<string>('1')
  const [status, setStatus] = useState<any>(null)

  const create = async () => {
    const res = await fetch(API + '/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client, freelancer, amountAPT })
    })
    const data = await res.json()
    alert('Create TX: ' + (data.tx || data.error))
  }

  const fund = async () => {
    const res = await fetch(API + '/fund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(escrowId), amountAPT })
    })
    const data = await res.json()
    alert('Fund TX: ' + (data.tx || data.error))
  }

  const release = async () => {
    const res = await fetch(API + '/release', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(escrowId) })
    })
    const data = await res.json()
    alert('Release TX: ' + (data.tx || data.error))
  }

  const check = async () => {
    const res = await fetch(API + '/status/' + escrowId)
    const data = await res.json()
    setStatus(data)
  }

  return (
    <div>
      <h2>Client Dashboard</h2>
      <div style={{ display:'grid', gap:8, maxWidth:520 }}>
        <input placeholder='Client Address' value={client} onChange={e=>setClient(e.target.value)} />
        <input placeholder='Freelancer Address' value={freelancer} onChange={e=>setFreelancer(e.target.value)} />
        <input placeholder='Amount (APT)' value={amountAPT} onChange={e=>setAmountAPT(e.target.value)} />
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={create}>Create Escrow</button>
          <button onClick={fund}>Fund</button>
          <button onClick={release}>Release</button>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input placeholder='Escrow ID' value={escrowId} onChange={e=>setEscrowId(e.target.value)} />
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