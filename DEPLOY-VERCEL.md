# 🚀 DEPLOY EN VERCEL - Universidad César Vallejo Voice Widget

## 📋 VARIABLES DE ENTORNO NECESARIAS

Estas son las **MISMAS variables que usa DEMO-UIC**:

### Backend API

```bash
ELEVENLABS_API_KEY=tu_api_key_aqui
ELEVENLABS_AGENT_ID=tu_agent_id_aqui
ELEVENLABS_WEBHOOK_SECRET=tu_webhook_secret_opcional
ALLOWED_EMBED_DOMAINS=ucv.edu.pe,www.ucv.edu.pe,tu-frontend.vercel.app
PORT=3001
NODE_ENV=production
```

---

## 🎯 PASOS PARA DEPLOY

### 1️⃣ FRONTEND (Este proyecto)

```bash
# 1. Build local para verificar
npm run build

# 2. Deploy a Vercel
vercel --prod

# O desde el dashboard:
# - Conecta el repo en vercel.com
# - Build Command: npm run build
# - Output Directory: dist
# - Framework Preset: Vite
```

**NO necesita variables de entorno en el frontend**

---

### 2️⃣ BACKEND API (Carpeta /api)

```bash
# 1. Navegar a carpeta api
cd api

# 2. Deploy separado
vercel --prod

# 3. Copiar la URL que te da (ej: https://ucv-api-xxx.vercel.app)
```

**Configurar Variables en Vercel Dashboard:**

1. Ve a tu proyecto API en vercel.com
2. Settings → Environment Variables
3. Agrega cada una:

| Variable | Valor | Necesaria |
|---|---|---|
| `ELEVENLABS_API_KEY` | Tu API Key de ElevenLabs | Opcional* |
| `ELEVENLABS_AGENT_ID` | Tu Agent ID de ElevenLabs | Opcional* |
| `ELEVENLABS_WEBHOOK_SECRET` | Secret para webhooks | Opcional |
| `ALLOWED_EMBED_DOMAINS` | ucv.edu.pe,tu-frontend.vercel.app | ✅ SÍ |
| `PORT` | 3001 | ✅ SÍ |
| `NODE_ENV` | production | ✅ SÍ |

*Si no tienes ElevenLabs, el widget funciona en modo texto

---

### 3️⃣ CONECTAR FRONTEND CON BACKEND

Después de deployar el backend, actualiza en el frontend:

**Opción A: Actualizar `vercel.json` (línea 9):**

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://TU-URL-API.vercel.app/api/:path*"
    }
  ]
}
```

**Opción B: O actualizar `src/voice-widget/config.js`:**

```javascript
export const VoiceWidgetConfig = {
  apiBaseUrl: 'https://TU-URL-API.vercel.app/api',
  // ...
};
```

Luego re-deploy del frontend:
```bash
vercel --prod
```

---

## ✅ VERIFICAR QUE FUNCIONA

### Test Backend API

```bash
# Reemplaza con tu URL de API
curl https://tu-api.vercel.app/health
```

Debería responder:
```json
{
  "status": "ok",
  "timestamp": "2025-10-30...",
  "elevenLabsConfigured": true
}
```

### Test Frontend

1. Abre tu URL de Vercel
2. Debe aparecer el botón rojo flotante
3. Click en el botón
4. Se abre el panel del widget
5. Si hay ElevenLabs: botón "Iniciar llamada" funciona
6. Si NO hay ElevenLabs: aparece mensaje y funciona modo texto

---

## 📂 ESTRUCTURA DE DEPLOY

```
UCesarVallejos (Frontend)
├── Deploy en Vercel
├── URL: https://ucv-voice-widget.vercel.app
└── NO necesita variables de entorno

api/ (Backend)
├── Deploy SEPARADO en Vercel
├── URL: https://ucv-api-xxx.vercel.app
└── ✅ NECESITA variables de entorno
```

---

## 🔧 COMANDOS RÁPIDOS

```bash
# Frontend
vercel --prod

# Backend
cd api
vercel --prod

# Ver logs
vercel logs

# Ver deployments
vercel list
```

---

## 📝 EJEMPLO COMPLETO

### 1. Deploy Backend

```bash
cd api
vercel --prod
# URL: https://ucv-api-abc123.vercel.app
```

### 2. Agregar Variables en Vercel Dashboard

En vercel.com → tu-proyecto-api → Settings → Environment Variables:

```
ELEVENLABS_API_KEY = sk-abc123...
ELEVENLABS_AGENT_ID = agent_xyz789...
ALLOWED_EMBED_DOMAINS = ucv.edu.pe,ucv-widget.vercel.app
PORT = 3001
NODE_ENV = production
```

### 3. Actualizar Frontend

Edita `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://ucv-api-abc123.vercel.app/api/:path*"
    }
  ]
}
```

### 4. Deploy Frontend

```bash
cd ..  # volver a raíz
vercel --prod
# URL: https://ucv-widget-xyz.vercel.app
```

### 5. ✅ LISTO!

Abre https://ucv-widget-xyz.vercel.app y prueba el widget

---

## 🆘 TROUBLESHOOTING

### Error: "API not responding"

1. Verifica que backend esté deployed
2. Verifica URL en vercel.json
3. Verifica variables de entorno en Vercel Dashboard
4. Chequea logs: `vercel logs --follow`

### Error: "CORS blocked"

Agrega tu dominio frontend a `ALLOWED_EMBED_DOMAINS`:

```
ALLOWED_EMBED_DOMAINS=localhost,ucv.edu.pe,tu-frontend.vercel.app
```

### Error: "ElevenLabs not configured"

**Esto es normal** si no tienes credenciales. El widget funciona en modo texto.

Para agregar voz:
1. Crea cuenta en https://elevenlabs.io
2. Obtén API Key en Settings
3. Crea Agent en Conversational AI
4. Agrega variables en Vercel

---

## 🎯 VARIABLES EXACTAS DE DEMO-UIC

Estas son las **MISMAS** que usa el proyecto original:

```bash
# Backend API
ELEVENLABS_API_KEY=          # Key de ElevenLabs
ELEVENLABS_AGENT_ID=         # ID del agente
ELEVENLABS_WEBHOOK_SECRET=   # Secret (opcional)
ALLOWED_EMBED_DOMAINS=       # Dominios permitidos (separados por comas)
PORT=3001                    # Puerto del servidor
NODE_ENV=production          # Entorno

# Frontend
# NO NECESITA VARIABLES - Todo está en config.js
```

---

## ✅ CHECKLIST FINAL

Antes de deployar:

- [ ] `npm run build` funciona sin errores
- [ ] Backend API tiene todas las variables
- [ ] `vercel.json` tiene la URL correcta del API
- [ ] Dominios agregados a `ALLOWED_EMBED_DOMAINS`
- [ ] WhatsApp configurado en `config.js`
- [ ] Colores UCV aplicados en CSS

---

## 🌐 URLs DE REFERENCIA

- **Vercel Dashboard**: https://vercel.com/dashboard
- **ElevenLabs**: https://elevenlabs.io
- **Documentación Vercel**: https://vercel.com/docs

---

**¡Listo para deploy!** 🚀
