# ✅ LISTO PARA VERCEL - UCV Voice Widget

## 🎯 ESTÁ TODO CONFIGURADO

### ✅ Archivos listos:
- `package.json` ✅ Con scripts build
- `vite.config.js` ✅ Configuración Vite
- `vercel.json` ✅ Config para Vercel
- `api/vercel.json` ✅ Config backend
- `api/server.js` ✅ Sin validación de dominios (no es embed)

---

## 🚀 DEPLOY EN 3 PASOS

### 1️⃣ Frontend
```bash
vercel --prod
```

Guarda la URL que te da (ej: https://ucv-widget-xyz.vercel.app)

### 2️⃣ Backend
```bash
cd api
vercel --prod
```

Guarda la URL del backend (ej: https://ucv-api-abc.vercel.app)

### 3️⃣ Conectar

Edita `vercel.json` línea 9 con tu URL de backend:
```json
"destination": "https://ucv-api-abc.vercel.app/api/:path*"
```

Re-deploy frontend:
```bash
vercel --prod
```

---

## 🔑 VARIABLES DE ENTORNO

### Frontend
**NO NECESITA VARIABLES** ✅

### Backend (Vercel Dashboard)

**Mínimas (modo texto):**
```
PORT = 3001
NODE_ENV = production
```

**Para activar voz (opcional):**
```
ELEVENLABS_API_KEY = tu_key_de_elevenlabs
ELEVENLABS_AGENT_ID = tu_agent_id
```

---

## ✅ VERIFICAR QUE FUNCIONA

1. Abre tu URL de Vercel
2. Debe aparecer el **botón rojo** flotante
3. Click → se abre el panel
4. **Sin ElevenLabs**: Funciona modo texto ✅
5. **Con ElevenLabs**: Funciona voz + texto ✅

---

## 🎨 COLORES UCV APLICADOS

- Rojo: `#e30512` ✅
- Azul: `#243659` ✅

---

## 📦 LISTO!

El proyecto está **100% preparado** para Vercel. Solo ejecuta `vercel --prod` y funciona.

**NO necesitas:**
- ❌ ALLOWED_EMBED_DOMAINS (no es embed)
- ❌ Configuración extra
- ❌ Build scripts adicionales

**TODO está listo** 🎉
