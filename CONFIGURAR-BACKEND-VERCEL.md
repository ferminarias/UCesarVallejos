# Configurar Backend en Vercel para Voice Widget

## Problema Actual

El voice widget se abre pero queda en blanco porque **el backend no tiene las variables de entorno de ElevenLabs configuradas en Vercel**.

## Arquitectura

Tu proyecto tiene 2 deploys separados en Vercel:

1. **Frontend** (UCesarVallejos): `https://u-cesar-vallejos.vercel.app`
2. **Backend API**: `https://ucv-voice-widget-api.vercel.app`

El frontend redirige todas las llamadas de `/api/*` al backend mediante el `vercel.json`.

## Solución: Configurar Variables de Entorno en el Backend

### Paso 1: Ir al Proyecto del Backend en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Busca el proyecto: **`ucv-voice-widget-api`**
3. Entra al proyecto

### Paso 2: Configurar Variables de Entorno

1. Ve a **Settings** → **Environment Variables**
2. Agrega las siguientes variables:

```bash
# API Key de ElevenLabs
ELEVENLABS_API_KEY=tu_api_key_aqui

# ID del Agente de ElevenLabs
ELEVENLABS_AGENT_ID=tu_agent_id_aqui

# Puerto (opcional)
PORT=3001

# Entorno
NODE_ENV=production
```

### Paso 3: Obtener las Credenciales de ElevenLabs

#### API Key:
1. Ve a [elevenlabs.io](https://elevenlabs.io/app/settings/api-keys)
2. Inicia sesión
3. Copia tu API Key

#### Agent ID:
1. Ve a [elevenlabs.io conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Selecciona tu agente
3. Copia el Agent ID de la URL o configuración

### Paso 4: Redesplegar el Backend

Después de agregar las variables:

1. En Vercel, ve a **Deployments**
2. Click en el botón **⋯** (tres puntos) del último deployment
3. Click en **Redeploy**

O simplemente haz un push al repositorio del backend:

```bash
cd /Users/ferminarias/Documents/GitHub/UCesarVallejos/api
git add .
git commit -m "Update backend configuration"
git push origin main
```

## Verificar que Funciona

### Opción 1: Probar el Endpoint Directamente

```bash
curl https://ucv-voice-widget-api.vercel.app/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T...",
  "elevenLabsConfigured": true
}
```

### Opción 2: Probar en el Sitio

1. Ve a [https://u-cesar-vallejos.vercel.app](https://u-cesar-vallejos.vercel.app)
2. Haz click en el botón flotante del voice widget
3. Debería cargar la interfaz de ElevenLabs

## Alternativa: Backend y Frontend en el Mismo Proyecto

Si prefieres tener todo en un solo proyecto de Vercel, puedes:

1. Mover el archivo `api/server.js` al root del proyecto
2. Actualizar `vercel.json` para usar serverless functions

Déjame saber si necesitas ayuda con esta opción.

## Dominios Permitidos

El backend actual permite requests desde:
- `localhost`
- `127.0.0.1`
- `u-cesar-vallejos.vercel.app`
- `ucesarvallejos.vercel.app`
- `www.ucv.edu.pe`

Si necesitas agregar más dominios, edita la variable de entorno `ALLOWED_EMBED_DOMAINS` en Vercel:

```
ALLOWED_EMBED_DOMAINS=localhost,127.0.0.1,u-cesar-vallejos.vercel.app,otro-dominio.com
```

## Resumen de Cambios Hechos Hoy

1. ✅ Agregado CSP con `cdn.jsdelivr.net` al `index.html`
2. ✅ Agregada configuración de dominios permitidos al `api/server.js`
3. ✅ Agregada función `validateOrigin` al `api/server.js`

## Próximos Pasos

1. Configurar variables de entorno en Vercel (backend)
2. Redesplegar backend
3. Probar voice widget en producción
