/**
 * Vercel Function: /api/elevenlabs/token
 * Igual a DEMO-UIC: genera token de conversación para ElevenLabs.
 */

const fetchFn = (...args) => (globalThis.fetch ? globalThis.fetch(...args) : import('node-fetch').then(({ default: fetch }) => fetch(...args)));

export default async function handler(req, res) {
  try {
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID;

    if (!ELEVENLABS_API_KEY || !ELEVENLABS_AGENT_ID) {
      return res.status(200).json({
        error: 'ElevenLabs no está configurado. El asistente de voz estará disponible una vez completada la configuración.',
        configured: false,
      });
    }

    const tokenResponse = await fetchFn(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${ELEVENLABS_AGENT_ID}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('ElevenLabs token generation failed:', errorText);
      return res.status(200).json({
        agentId: ELEVENLABS_AGENT_ID,
        configured: true,
        tokenGenerated: false,
        fallbackMode: true,
        error: `Token generation failed: ${errorText}`,
      });
    }

    const tokenData = await tokenResponse.json();
    return res.status(200).json({
      token: tokenData.token,
      agentId: ELEVENLABS_AGENT_ID,
      configured: true,
      tokenGenerated: true,
    });
  } catch (err) {
    console.error('Token generation error:', err);
    return res.status(200).json({
      configured: true,
      tokenGenerated: false,
      fallbackMode: true,
      error: err?.message || 'Unknown error',
    });
  }
}
