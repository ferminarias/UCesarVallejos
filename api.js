/**
 * Vercel Serverless Function Entry Point
 * Re-exports the Express app from api/server.js
 */

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
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

// Dominios permitidos para seguridad (UCV)
const ALLOWED_DOMAINS = process.env.ALLOWED_EMBED_DOMAINS?.split(',') || [
  'localhost',
  '127.0.0.1',
  'u-cesar-vallejos.vercel.app',
  'ucesarvallejos.vercel.app',
  'www.ucv.edu.pe',
  'ucv.edu.pe',
];

// Validar origen de las peticiones
function validateOrigin(req, res, next) {
  const origin = req.headers.origin || req.headers.referer || '';
  const userAgent = req.headers['user-agent'] || '';
  
  const isAuthorized = ALLOWED_DOMAINS.some(domain => 
    origin.includes(domain) || 
    origin.includes('localhost') ||
    !origin // Permitir requests directos para compatibilidad
  );
  
  if (!isAuthorized && origin) {
    console.warn(`[SECURITY] Token request from unauthorized origin: ${origin}`);
    console.warn(`[DEBUG] Allowed domains: ${ALLOWED_DOMAINS.join(', ')}`);
    console.warn(`[DEBUG] Current origin: ${origin}`);
  }
  
  next();
}

app.use(validateOrigin);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Check ElevenLabs configuration
app.get('/elevenlabs/check-config', (req, res) => {
  const configured = !!(ELEVENLABS_API_KEY && ELEVENLABS_AGENT_ID);
  console.log(`[API] ElevenLabs configured: ${configured}`);
  res.json({
    configured,
    hasApiKey: !!ELEVENLABS_API_KEY,
    hasAgentId: !!ELEVENLABS_AGENT_ID,
  });
});

// Get ElevenLabs token
app.post('/elevenlabs/token', async (req, res) => {
  try {
    if (!ELEVENLABS_API_KEY || !ELEVENLABS_AGENT_ID) {
      return res.status(400).json({
        configured: false,
        tokenGenerated: false,
        message: 'ElevenLabs not configured',
      });
    }

    const response = await fetch('https://api.elevenlabs.io/convai/conversation/get_signed_url', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: ELEVENLABS_AGENT_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[API] ElevenLabs error: ${response.status} - ${error}`);
      return res.status(response.status).json({
        configured: true,
        tokenGenerated: false,
        message: `ElevenLabs API error: ${response.status}`,
      });
    }

    const data = await response.json();
    console.log(`[API] Token generated successfully`);
    res.json({
      configured: true,
      tokenGenerated: true,
      token: data.signed_url,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('[API] Token generation error:', error);
    res.status(500).json({
      configured: true,
      tokenGenerated: false,
      message: 'Failed to generate token',
      error: error.message,
    });
  }
});

// Chat endpoint
app.post('/chat/send', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`[API] Chat message received: ${message}`);
    
    // Simular respuesta de chat
    res.json({
      success: true,
      message: 'Mensaje recibido. Por favor, usa el asistente de voz para una mejor experiencia.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Chat error:', error);
    res.status(500).json({ error: 'Chat processing failed' });
  }
});

// Webhook para ElevenLabs
app.post('/elevenlabs/webhook', (req, res) => {
  try {
    const signature = req.headers['x-elevenlabs-signature'];
    const body = req.body;

    if (ELEVENLABS_WEBHOOK_SECRET && signature) {
      const hash = crypto
        .createHmac('sha256', ELEVENLABS_WEBHOOK_SECRET)
        .update(JSON.stringify(body))
        .digest('hex');

      if (hash !== signature) {
        console.warn('[API] Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    console.log('[API] Webhook received:', body.event_type || 'unknown');
    res.json({ success: true });
  } catch (error) {
    console.error('[API] Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
