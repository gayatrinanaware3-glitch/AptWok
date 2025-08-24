# AptWok
This project is a Web3-powered decentralized job board that connects freelancers and clients without middlemen. Unlike centralized platforms (Upwork, Fiverr)
# APTWORK
This project is a Web3-powered decentralized job board that connects freelancers and clients without middlemen. Unlike centralized platforms (Upwork, Fiverr) that charge high fees and create trust issues, our solution leverages Aptos Move smart contracts to ensure transparency, trust, and secure payments.  
Got it. You don’t want a half-baked README — you need a *GitHub-ready, judge-friendly README* that:

* Explains the problem + solution clearly.
* Shows how to run the project (contracts + frontend).
* Has a clean structure (badges, demo gifs, screenshots).
* Preempts hackathon judge questions.


# 💼 Aptwork – Decentralized Job Bounty Board with Escrow Contracts

> *One-liner: A Web3-powered freelance job board on **Aptos, with **escrow smart contracts, auto-split payouts, and reputation NFTs* — no middlemen, no scams.

---

## 🔍 Problem

Freelancers and clients face broken trust in centralized platforms:

*  High fees on Upwork/Fiverr (20–30%)
*  Clients risk paying for low-quality work
*  Freelancers risk not being paid at all
*  Black-box arbitration, no transparency

---

## 💡 Our Solution

Aptwork is a *decentralized job marketplace* powered by *Move smart contracts on Aptos*.

Clients post jobs as *on-chain bounties* with locked escrow.
 Freelancers claim jobs and submit work via *IPFS/GitHub links*.
 Funds are released *automatically* on approval or after a deadline.
 *Reputation NFTs* act as verifiable proof of work history.
 Optional: team jobs with *auto-split payments*.

---
⚡ Features We Added

Job Posting (Bounty Creation)

Clients can create jobs with details (title, description, budget).

Payment is locked into the smart contract escrow.

Freelancer Application

Freelancers can apply/submit work against a job ID.

Keeps track of multiple applicants.

Escrow & Payment Release.

Client’s funds are locked until job completion.

Funds are automatically released to the freelancer upon approval.

Transparency & Trust

All transactions are recorded on-chain.

No middleman fees, everything is trustless.

Dispute Handling (Basic version)

If the client rejects the work, escrow holds funds.

Manual/DAO-based arbitration could be added later.

🔑 Prerequisites 

Basic knowledge of blockchain + smart contracts
Familiar with JavaScript/TypeScript + React
Environment Setup
Node.js (>=18) + npm/yarn
Git + VS Code
Rust (for Move compiler)
Blockchain (Aptos)
Aptos CLI installed
Testnet account & wallet 
Faucet APT for testing
Frontend
React + TypeScript
Wallet adapters (Petra/Martian)

Database (MongoDB/Postgres) if needed
## 🔐 How Escrow Works

1. *Post Job* – Client funds escrow via post_job().
2. *Claim Job* – Freelancer calls claim_job(job_id).
3. *Submit Work* – Upload deliverable to IPFS/GitHub, submit CID.
4. *Approve or Dispute* –

   * Approve → Auto payout (with team-splits if defined).
   * No response → Auto-release after deadline.
   * Dispute → Escrow freezes, DAO/admin resolves.
5. *Reputation* – Successful freelancers mint *Soulbound NFT badges*.


## ⚖ Dispute Resolution (MVP)

* Auto-release if client doesn’t respond by deadline.
* Admin/DAO override for disputes.
* Future: AI-assisted review + DAO arbitration.

* ![WhatsApp Image 2025-08-24 at 12 58 07_4a0ae5ae](https://github.com/user-attachments/assets/ff7d38b6-ac50-4636-b0ba-99075c5df2fe)

![WhatsApp Image 2025-08-24 at 12 58 08_09d7b0cf](https://github.com/user-attachments/assets/7a5206bc-6851-4871-949c-ba909904b1a8)


* ![WhatsApp Image 2025-08-24 at 12 58 07_e6ed21fb](https://github.com/user-attachments/assets/7e9f7a8e-6761-4567-933f-092629cac923)
* 
