/**
 * Legacy Vercel Serverless Function (disabled)
 * Mantained only to signal migration to Express API.
 */

export default function handler(_req, res) {
  return res.status(410).json({
    error: 'Deprecated endpoint',
    message: 'Usa /api/elevenlabs/webhook atendido por la API Express principal.',
    maintained: false
  });
}
