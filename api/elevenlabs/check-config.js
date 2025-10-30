/**
 * Legacy Vercel Serverless Function (disabled)
 * Mantained only to avoid 404s after migrating to Express API.
 */

export default function handler(_req, res) {
  return res.status(410).json({
    error: 'Deprecated endpoint',
    message: 'Usa /api/elevenlabs/check-config atendido por la API Express principal.',
    maintained: false
  });
}
