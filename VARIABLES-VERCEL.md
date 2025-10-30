# 🔑 VARIABLES DE ENTORNO PARA VERCEL - UCV Voice Widget

## ✅ VARIABLES NECESARIAS (Backend API)

### Mínimas para que funcione en modo TEXTO:

```bash
PORT=3001
NODE_ENV=production
```

**¡Eso es todo!** El widget funcionará perfectamente en modo texto sin voz.

---

### Opcionales para activar VOZ (ElevenLabs):

```bash
ELEVENLABS_API_KEY=tu_api_key_aqui
ELEVENLABS_AGENT_ID=tu_agent_id_aqui
```

---

## ❌ NO NECESITAS

- ~~`ALLOWED_EMBED_DOMAINS`~~ → Solo si embebierass en otra página
- ~~`ELEVENLABS_WEBHOOK_SECRET`~~ → Opcional avanzado

---

## 📝 RESUMEN

### Frontend
**NO necesita variables** ✅

### Backend API

**Mínimo:**
```bash
PORT=3001
NODE_ENV=production
```

**Con voz (opcional):**
```bash
PORT=3001
NODE_ENV=production
ELEVENLABS_API_KEY=sk-...
ELEVENLABS_AGENT_ID=agent_...
```

---

## 🚀 CONFIGURAR EN VERCEL

1. Ve a vercel.com → tu proyecto API
2. Settings → Environment Variables
3. Agregar solo 2 variables:

| Variable | Valor |
|---|---|
| `PORT` | `3001` |
| `NODE_ENV` | `production` |

**Si quieres voz, agregar también:**

| Variable | Valor |
|---|---|
| `ELEVENLABS_API_KEY` | Tu key de elevenlabs.io |
| `ELEVENLABS_AGENT_ID` | Tu agent ID |

---

## ✅ DEPLOY SIMPLIFICADO

```bash
# 1. Frontend
vercel --prod

# 2. Backend
cd api
vercel --prod

# 3. Actualizar vercel.json con URL del backend
# vercel.json línea 9: "destination": "https://TU-API.vercel.app/api/:path*"

# 4. Re-deploy frontend
vercel --prod
```

**¡Listo!** 🎉
