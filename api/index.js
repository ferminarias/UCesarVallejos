/**
 * Voice Widget API Server (formato DEMO-UIC - CommonJS)
 * Backend para manejar conexiones con ElevenLabs
 * Igualado a DEMO-UIC en estructura, rutas y formato de módulo
 */

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fetchFn = (...args) => (global.fetch ? global.fetch(...args) : import('node-fetch').then(({ default: fetch }) => fetch(...args)));
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.text());

// Configuración de ElevenLabs
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID;
const ELEVENLABS_WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET;

// Dominios permitidos (igual DEMO-UIC, sobreescribibles por env)
const ALLOWED_DOMAINS = process.env.ALLOWED_EMBED_DOMAINS?.split(',') || [
  'localhost',
  '127.0.0.1',
  'demo-uic.vercel.app',
  'bot.dominiodepruebas.online',
  'bot.ddev.site',
];

function validateOrigin(req, res, next) {
  const origin = req.headers.origin || req.headers.referer || '';
  const isAuthorized = ALLOWED_DOMAINS.some(domain => origin.includes(domain) || origin.includes('localhost') || !origin);
  if (!isAuthorized && origin) {
    console.warn(`[DEMO-UIC] Token request from unauthorized origin: ${origin}`);
    console.warn(`[DEMO-UIC] Allowed domains: ${ALLOWED_DOMAINS.join(', ')}`);
    console.warn(`[DEMO-UIC] Current origin: ${origin}`);
    return res.status(403).json({ error: 'Acceso denegado desde este dominio', configured: false });
  }
  next();
}

// Rutas equivalentes DEMO-UIC
app.get('/api/elevenlabs/check-config', (req, res) => {
  const hasApiKey = !!ELEVENLABS_API_KEY;
  const hasAgentId = !!ELEVENLABS_AGENT_ID;
  res.json({ configured: hasApiKey && hasAgentId, details: { hasApiKey, hasAgentId, missing: [ ...(!hasApiKey ? ['ELEVENLABS_API_KEY'] : []), ...(!hasAgentId ? ['ELEVENLABS_AGENT_ID'] : []) ] } });
});

app.get('/api/elevenlabs/token', validateOrigin, async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.ip || 'unknown';
    if (!ELEVENLABS_API_KEY || !ELEVENLABS_AGENT_ID) {
      return res.status(200).json({ error: 'ElevenLabs no está configurado. El asistente de voz estará disponible una vez completada la configuración.', configured: false });
    }
    try {
      const tokenResponse = await fetchFn(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${ELEVENLABS_AGENT_ID}`, { method: 'GET', headers: { 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' } });
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('ElevenLabs token generation failed:', errorText);
        return res.json({ agentId: ELEVENLABS_AGENT_ID, configured: true, tokenGenerated: false, fallbackMode: true, error: `Token generation failed: ${errorText}` });
      }
      const tokenData = await tokenResponse.json();
      return res.json({ token: tokenData.token, agentId: ELEVENLABS_AGENT_ID, configured: true, tokenGenerated: true, clientIp });
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return res.json({ agentId: ELEVENLABS_AGENT_ID, configured: true, tokenGenerated: false, fallbackMode: true, error: tokenError.message || 'Unknown error' });
    }
  } catch (error) {
    console.error('ElevenLabs token error:', error);
    res.status(500).json({ error: 'Error interno del servidor', configured: false });
  }
});

app.post('/api/chat/send', validateOrigin, async (req, res) => {
  try {
    const { message, sessionId, userId, source } = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El campo "message" es obligatorio.' });
    }
    console.log('[DEMO-UIC Chat Fallback] Received message:', message, 'from:', source);
    const response = 'Gracias por tu mensaje. Un asesor te contactará pronto.';
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('[DEMO-UIC Chat Fallback] Sending response:', response);
    return res.json({ response, message: response, sessionId: sessionId || `web-session-${Date.now()}`, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('[DEMO-UIC Chat Fallback] Error processing message:', error);
    return res.status(500).json({ error: 'Error interno del servidor. Por favor, intenta nuevamente o contacta a un asesor.', response: 'Gracias por tu mensaje. Un asesor te contactará pronto.' });
  }
});

app.post('/api/elevenlabs/webhook', async (req, res) => {
  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const signature = req.headers['elevenlabs-signature'];
    if (ELEVENLABS_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto.createHmac('sha256', ELEVENLABS_WEBHOOK_SECRET).update(body).digest('hex');
      if (signature !== expectedSignature) {
        console.error('[DEMO-UIC] Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }
    const event = typeof req.body === 'string' ? JSON.parse(body) : req.body;
    console.log('[DEMO-UIC] ElevenLabs webhook event:', event.type, event.data);
    return res.json({ received: true });
  } catch (error) {
    console.error('[DEMO-UIC] Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), elevenLabsConfigured: !!(ELEVENLABS_API_KEY && ELEVENLABS_AGENT_ID) });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
