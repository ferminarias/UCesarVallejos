/**
 * Vercel Function: /api/elevenlabs/check-config
 * Igual a DEMO-UIC: devuelve si ElevenLabs está correctamente configurado.
 */

export default function handler(_req, res) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID;

  const hasApiKey = !!ELEVENLABS_API_KEY;
  const hasAgentId = !!ELEVENLABS_AGENT_ID;
  const isConfigured = hasApiKey && hasAgentId;

  return res.status(200).json({
    configured: isConfigured,
    details: {
      hasApiKey,
      hasAgentId,
      missing: [
        ...(!hasApiKey ? ['ELEVENLABS_API_KEY'] : []),
        ...(!hasAgentId ? ['ELEVENLABS_AGENT_ID'] : []),
      ],
    },
  });
}
