# ✅ Replicación Completa de DEMO-UIC a UCesarVallejos

## 📋 Resumen de Cambios

Se han replicado **TODOS** los archivos y configuraciones faltantes del proyecto DEMO-UIC al proyecto UCesarVallejos para asegurar que el voice widget funcione exactamente igual.

---

## 🆕 Archivos Creados

### 1. Backend API - `/api/`
- ✅ **`package.json`** - Configuración de dependencias para el backend
- ✅ **`.env.example`** - Plantilla de variables de entorno para ElevenLabs

### 2. Scripts de Build - `/scripts/`
- ✅ **`copy-build.js`** - Script para copiar archivos de dist/ a public/ en deployment

---

## 📝 Archivos Modificados

### 1. **`package.json`** (raíz)
**Cambios realizados:**
- ✅ Agregado script `build:vercel` para deployment
- ✅ Agregado script `vercel-dev` para desarrollo local con Vercel CLI
- ✅ Agregado script `deploy` para deployment manual
- ✅ Agregado `vercel` como devDependency
- ✅ Actualizado versiones de `vite` y `terser` para coincidir con DEMO-UIC

**Scripts antes:**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "vercel-build": "vite build"
}
```

**Scripts después:**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:vercel": "vite build && node scripts/copy-build.js",
  "preview": "vite preview",
  "vercel-dev": "vercel dev",
  "deploy": "npm run build && vercel --prod",
  "vercel-build": "npm run build"
}
```

### 2. **`vite.config.js`**
**Cambio crítico:**
- ✅ Cambiado `base: '/'` a `base: './'` para compatibilidad con deployment en Vercel

```javascript
// ANTES
base: '/',

// DESPUÉS  
base: './',
```

### 3. **`vercel.json`**
**Cambios realizados:**
- ✅ Cambiado `buildCommand` de `npm run build` a `npm run build:vercel`
- ✅ Cambiado `outputDirectory` de `dist` a `public`
- ✅ Agregado `installCommand: "npm install"`
- ✅ Removido `version: 2` (no necesario)

**Configuración antes:**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Configuración después:**
```json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "public",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## ✅ Archivos Ya Existentes (Sin Cambios)

Estos archivos ya estaban correctamente configurados en UCesarVallejos:

### Frontend
- ✅ `/src/voice-widget/config.js` - Configuración del widget (con datos de UCV)
- ✅ `/src/voice-widget/core.js` - Lógica principal del widget
- ✅ `/src/voice-widget/main.js` - Punto de entrada del widget
- ✅ `/src/voice-widget/ui.js` - Interfaz de usuario del widget
- ✅ `/public/assets/css/voice-widget.css` - Estilos del widget (con colores UCV)
- ✅ `/index.html` - HTML principal con voice widget integrado

### Backend
- ✅ `/api/elevenlabs/token.js` - Endpoint para generar tokens (con dominios UCV)
- ✅ `/api/elevenlabs/webhook.js` - Webhook para eventos de ElevenLabs (logs UCV)
- ✅ `/api/elevenlabs/check-config.js` - Verificación de configuración

---

## 🎯 Diferencias Clave entre DEMO-UIC y UCesarVallejos

### Colores Corporativos

**DEMO-UIC (Verde):**
```css
--voice-widget-primary: #36945f;
--voice-widget-primary-strong: #0a6342;
```

**UCesarVallejos (Rojo):**
```css
--voice-widget-primary: #e30512;
--voice-widget-primary-strong: #b30410;
```

### Dominios Permitidos

**DEMO-UIC:**
```javascript
allowedDomains: [
  'localhost',
  '127.0.0.1',
  'demo-uic.vercel.app',
  'bot.dominiodepruebas.online',
  'bot.ddev.site'
]
```

**UCesarVallejos:**
```javascript
allowedDomains: [
  'localhost',
  '127.0.0.1',
  'u-cesar-vallejos.vercel.app',
  'ucesarvallejos.vercel.app',
  'www.ucv.edu.pe',
  'ucv.edu.pe'
]
```

### Mensajes de WhatsApp

**DEMO-UIC:**
```javascript
whatsappMessage: 'Hola! Me interesa conocer mas sobre los programas de UIC.'
```

**UCesarVallejos:**
```javascript
whatsappMessage: 'Hola! Me interesa conocer más sobre los programas de Universidad César Vallejo.'
```

---

## 📦 Estructura Final del Proyecto

```
UCesarVallejos/
├── api/
│   ├── elevenlabs/
│   │   ├── check-config.js ✅
│   │   ├── token.js ✅
│   │   └── webhook.js ✅
│   ├── .env.example ✨ NUEVO
│   └── package.json ✨ NUEVO
├── scripts/
│   └── copy-build.js ✨ NUEVO
├── src/
│   └── voice-widget/
│       ├── config.js ✅
│       ├── core.js ✅
│       ├── main.js ✅
│       └── ui.js ✅
├── public/
│   └── assets/
│       └── css/
│           └── voice-widget.css ✅
├── index.html ✅
├── package.json 🔧 MODIFICADO
├── vite.config.js 🔧 MODIFICADO
├── vercel.json 🔧 MODIFICADO
└── .env.example ✅
```

---

## 🚀 Próximos Pasos

### 1. Instalar Dependencias Actualizadas
```bash
cd /Users/ferminarias/Documents/GitHub/UCesarVallejos
npm install
```

### 2. Instalar Dependencias del Backend (si usas servidor local)
```bash
cd api
npm install express cors dotenv node-fetch
```

### 3. Configurar Variables de Entorno en Vercel

#### Frontend (u-cesar-vallejos.vercel.app)
No requiere variables de entorno, todo viene del backend.

#### Backend (ucv-voice-widget-api.vercel.app)
Ve a: **Settings → Environment Variables** y configura:

```
ELEVENLABS_API_KEY=tu_api_key_aqui
ELEVENLABS_AGENT_ID=tu_agent_id_aqui
ELEVENLABS_WEBHOOK_SECRET=tu_secret_aqui (opcional)
ALLOWED_EMBED_DOMAINS=localhost,127.0.0.1,u-cesar-vallejos.vercel.app,ucv.edu.pe
```

### 4. Redesplegar Ambos Proyectos en Vercel

```bash
# Frontend
cd /Users/ferminarias/Documents/GitHub/UCesarVallejos
vercel --prod

# Backend (si tienes el proyecto separado)
cd /ruta/a/tu/backend
vercel --prod
```

---

## ✅ Checklist de Verificación

- [x] Archivos del backend API creados
- [x] Script copy-build.js creado
- [x] package.json actualizado con scripts de Vercel
- [x] vite.config.js con base path correcto
- [x] vercel.json configurado para usar public/ como output
- [x] Todos los archivos del voice widget presentes
- [x] CSS del widget con colores UCV
- [x] Dominios permitidos configurados para UCV
- [ ] Variables de entorno configuradas en Vercel backend
- [ ] Ambos proyectos redesplegados en Vercel
- [ ] Voice widget probado en producción

---

## 🎉 Resultado Final

El proyecto **UCesarVallejos** ahora tiene **EXACTAMENTE** la misma estructura y configuración que **DEMO-UIC**, con las siguientes personalizaciones:

1. ✅ Colores corporativos de UCV (rojo #e30512 en lugar de verde)
2. ✅ Dominios permitidos específicos de UCV
3. ✅ Mensajes de WhatsApp personalizados para UCV
4. ✅ Logs con prefijo [UCV] en lugar de [UIC]

El voice widget debería funcionar **idénticamente** en ambos proyectos una vez que configures las variables de entorno en Vercel.

---

**Fecha de replicación:** 30 de octubre de 2025
**Estado:** ✅ COMPLETO
