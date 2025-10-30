# Fix Completo del Voice Widget - UCesarVallejos

## Problema Identificado

El voice widget se abría pero quedaba en blanco porque:
1. ❌ **Backend estaba en proyecto separado** (`ucv-voice-widget-api.vercel.app`)
2. ❌ **Rewrite en vercel.json no funcionaba** correctamente
3. ❌ **Faltaba CSP adecuado** para cargar `cdn.jsdelivr.net`
4. ❌ **Backend Express vs Serverless Functions** - incompatibilidad de arquitectura

## Solución Implementada

### 1. Migración a Vercel Serverless Functions ✅

**Antes:**
- Backend Express en proyecto separado
- Rewrite a `https://ucv-voice-widget-api.vercel.app/api/*`

**Después:**
- Serverless Functions en `/api/elevenlabs/`
- Todo en un solo proyecto de Vercel
- Funciones automáticamente expuestas en `/api/*`

### 2. Archivos Creados ✅

```
/api/elevenlabs/
├── token.js          # GET /api/elevenlabs/token
├── check-config.js   # GET /api/elevenlabs/check-config
└── webhook.js        # POST /api/elevenlabs/webhook
```

### 3. CSP Actualizado ✅

Agregado `https://cdn.jsdelivr.net` al Content Security Policy:

```html
<meta http-equiv="Content-Security-Policy" content="...script-src ... https://cdn.jsdelivr.net..." />
```

### 4. Configuración Limpiada ✅

- ✅ Eliminado backend Express (`api/server.js`)
- ✅ Eliminado `package.json` del backend
- ✅ Removido rewrite en `vercel.json`
- ✅ Actualizado `.env.example` con variables necesarias

## Variables de Entorno Requeridas

Configura estas en **Vercel Project Settings → Environment Variables**:

```bash
ELEVENLABS_API_KEY=sk-...
ELEVENLABS_AGENT_ID=...
```

### Cómo Obtener las Credenciales

1. **API Key:**
   - Ve a https://elevenlabs.io/app/settings/api-keys
   - Copia tu API Key

2. **Agent ID:**
   - Ve a https://elevenlabs.io/app/conversational-ai
   - Selecciona tu agente
   - Copia el Agent ID

## Arquitectura Final

```
UCesarVallejos (Vercel Project)
│
├── Frontend (Vite)
│   ├── index.html
│   ├── src/voice-widget/
│   │   ├── main.js
│   │   ├── ui.js
│   │   ├── core.js
│   │   └── config.js
│   └── public/assets/css/voice-widget.css
│
└── Backend (Serverless Functions)
    └── api/elevenlabs/
        ├── token.js          → /api/elevenlabs/token
        ├── check-config.js   → /api/elevenlabs/check-config
        └── webhook.js        → /api/elevenlabs/webhook
```

## Flujo de Funcionamiento

1. **Usuario hace clic en el botón del widget** 
   ↓
2. **Frontend llama a `/api/elevenlabs/token`**
   ↓
3. **Serverless Function en Vercel:**
   - Valida el origen
   - Obtiene token de ElevenLabs API
   - Retorna token al frontend
   ↓
4. **Frontend inicializa ElevenLabs Conversation SDK**
   - Carga SDK desde `cdn.jsdelivr.net`
   - Conecta con ElevenLabs usando el token
   - Renderiza la interfaz de voz
   ↓
5. **¡Voice Widget funcionando! 🎉**

## Verificación

### 1. Verificar que las serverless functions están activas:

```bash
curl https://u-cesar-vallejos.vercel.app/api/elevenlabs/check-config
```

Respuesta esperada:
```json
{
  "configured": true,
  "details": {
    "hasApiKey": true,
    "hasAgentId": true,
    "missing": []
  }
}
```

### 2. Probar el token endpoint:

```bash
curl https://u-cesar-vallejos.vercel.app/api/elevenlabs/token
```

Respuesta esperada:
```json
{
  "token": "...",
  "agentId": "...",
  "configured": true,
  "tokenGenerated": true
}
```

### 3. Probar en el sitio:

1. Ve a https://u-cesar-vallejos.vercel.app
2. Haz clic en el botón flotante del widget (abajo a la derecha)
3. Debería abrirse el panel del voice widget
4. Debería cargar la interfaz de ElevenLabs
5. Deberías poder iniciar conversación

## Dominios Permitidos

El widget está configurado para funcionar desde:
- `localhost` (desarrollo)
- `127.0.0.1` (desarrollo)
- `u-cesar-vallejos.vercel.app` (producción)
- `ucesarvallejos.vercel.app` (producción)
- `www.ucv.edu.pe` (producción)
- `ucv.edu.pe` (producción)

## Próximos Pasos

1. ✅ **Commit y push de los cambios**
2. ✅ **Vercel detectará cambios y redesplegará automáticamente**
3. ✅ **Verificar que las variables de entorno están en Vercel**
4. ✅ **Probar el widget en producción**

## Comandos para Desplegar

```bash
cd /Users/ferminarias/Documents/GitHub/UCesarVallejos

# Agregar todos los cambios
git add .

# Commit
git commit -m "Fix: Migrar a Vercel Serverless Functions y arreglar CSP"

# Push (Vercel desplegará automáticamente)
git push origin main
```

## Comparación con DEMO-UIC

Ahora **UCesarVallejos** tiene la **misma arquitectura** que **DEMO-UIC**:

✅ Vite para el frontend  
✅ Vercel Serverless Functions para el backend  
✅ Todo en un solo proyecto de Vercel  
✅ CSP configurado correctamente  
✅ SDK de ElevenLabs cargando desde CDN  

## ¿Qué Cambió?

| Antes | Después |
|-------|---------|
| Backend Express separado | Serverless Functions en mismo proyecto |
| Rewrite a otro dominio | Funciones locales en `/api/` |
| CSP sin `cdn.jsdelivr.net` | CSP completo |
| 2 proyectos de Vercel | 1 proyecto de Vercel |
| Complejo de mantener | Simple y elegante |

## Troubleshooting

### Si el widget sigue en blanco:

1. **Verificar variables de entorno en Vercel:**
   - Ve a Vercel Dashboard
   - Settings → Environment Variables
   - Verifica que `ELEVENLABS_API_KEY` y `ELEVENLABS_AGENT_ID` estén configuradas

2. **Verificar en la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a la pestaña Console
   - Busca errores relacionados con ElevenLabs o fetch

3. **Verificar CSP:**
   - En DevTools, busca errores de CSP
   - Deberían estar resueltos ahora

4. **Verificar que las funciones están activas:**
   ```bash
   curl https://u-cesar-vallejos.vercel.app/api/elevenlabs/check-config
   ```

### Si hay errores de CORS:

Las serverless functions ya tienen validación de origen configurada para los dominios permitidos.

### Si hay errores 403:

El dominio desde el que estás accediendo no está en la lista de permitidos. Agrega el dominio a `ALLOWED_EMBED_DOMAINS` en Vercel.

---

## Resumen

✅ CSP arreglado  
✅ Backend migrado a Serverless Functions  
✅ Arquitectura simplificada  
✅ Variables de entorno documentadas  
✅ Todo listo para producción  

**El voice widget debería funcionar perfectamente ahora! 🎉**
