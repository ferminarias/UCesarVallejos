# 🚀 INICIO RÁPIDO - UCV Voice Widget

## ⚡ 3 Comandos Para Ejecutar

```bash
# 1. Instalar dependencias
npm install
cd api && npm install && cd ..

# 2. Terminal 1 - Backend
cd api && node server.js

# 3. Terminal 2 - Frontend (en otra terminal)
npm run dev
```

**Abrir:** http://localhost:3000

---

## 📦 Si da error de módulos

```bash
rm -rf node_modules api/node_modules
npm install
cd api && npm install
```

---

## 🎨 Widget Colores UCV

- **Rojo**: `#e30512`
- **Azul**: `#243659`

---

## 🌐 Deploy Vercel

```bash
npm run build
vercel --prod
```

Variables en Vercel Dashboard:
- `ELEVENLABS_API_KEY` (opcional)
- `ELEVENLABS_AGENT_ID` (opcional)
- `ALLOWED_EMBED_DOMAINS`

---

## ✅ El widget funciona SIN ElevenLabs en modo texto
