import React, { useState } from 'react'
import Client from './pages/Client'
import Freelancer from './pages/Freelancer'
export default function App(){
  const [role, setRole] = useState<'client'|'freelancer'>('client')
  return (
    <div style={{ fontFamily:'system-ui, sans-serif', padding: 24 }}>
      <h1>Freelance Escrow dApp (Aptos) — MVP</h1>
      <p style={{ color:'#555' }}>Backend signs the transactions. No database.</p>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setRole('client')}>Client UI</button>
        <button onClick={() => setRole('freelancer')} style={{ marginLeft: 8 }}>Freelancer UI</button>
      </div>
      {role === 'client' ? <Client/> : <Freelancer/>}
    </div>
  )
}