import express from 'express';
import crypto from 'crypto';
import fs from 'fs';
import { createEscrow, fundEscrow, submitMeta, releaseEscrow, refundEscrow, viewEscrow } from '../aptos.js';

const meta = new Map();

export default function escrowRoutes(upload) {
  const router = express.Router();

  router.post('/create', async (req, res) => {
    try {
      const { client, freelancer, amountAPT } = req.body;
      const amount = Math.round(Number(amountAPT) * 1e8);
      const tx = await createEscrow({ client, freelancer, amount });
      res.json({ ok: true, tx });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  router.post('/fund', async (req, res) => {
    try {
      const { id, amountAPT } = req.body;
      const amount = Math.round(Number(amountAPT) * 1e8);
      const tx = await fundEscrow({ id, amount });
      res.json({ ok: true, tx });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  router.post('/submit', upload.single('bundle'), async (req, res) => {
    try {
      const { id, githubLink } = req.body;
      let fileHash = '';
      if (req.file) {
        fileHash = crypto.createHash('sha256').update(fs.readFileSync(req.file.path)).digest('hex');
        meta.set(Number(id), { githubLink, fileName: req.file.filename, fileHash });
      }
      const tx = await submitMeta({ id, github_link: githubLink || '', file_hash: fileHash });
      res.json({ ok: true, tx, fileHash });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  router.post('/release', async (req, res) => {
    try {
      const { id } = req.body;
      const tx = await releaseEscrow({ id });
      res.json({ ok: true, tx });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  router.post('/refund', async (req, res) => {
    try {
      const { id } = req.body;
      const tx = await refundEscrow({ id });
      res.json({ ok: true, tx });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  router.get('/status/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const onchain = await viewEscrow({ id });
      const local = meta.get(id) || null;
      res.json({ ok: true, onchain, local });
    } catch (e) {
      console.error(e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  return router;
}