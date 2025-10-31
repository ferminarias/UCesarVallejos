/**
 * Vercel Function: /api/elevenlabs/webhook
 * Igual a DEMO-UIC: valida firma (si hay secret) y responde 200.
 */

import crypto from 'crypto';

export default async function handler(req, res) {
  try {
    const ELEVENLABS_WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET;
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const signature = req.headers['elevenlabs-signature'];

    if (ELEVENLABS_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto.createHmac('sha256', ELEVENLABS_WEBHOOK_SECRET).update(body).digest('hex');
      if (signature !== expectedSignature) {
        console.error('[Webhook] Invalid signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const event = typeof req.body === 'string' ? JSON.parse(body) : req.body;
    console.log('[Webhook] ElevenLabs event:', event?.type);

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[Webhook] Error:', err);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
