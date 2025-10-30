# 🎓 Universidad César Vallejo - Voice Widget

Voice Widget integrado con los colores corporativos de la Universidad César Vallejo.

## 🎨 Colores Corporativos

- **Rojo**: `#e30512`
- **Azul**: `#243659`

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
# Frontend
npm install

# Backend
cd api
npm install
```

### 2. Configurar Variables de Entorno

```bash
# Backend
cd api
cp .env.example .env
# Editar api/.env con tus credenciales de ElevenLabs (opcional)
```

### 3. Ejecutar en Desarrollo

**Terminal 1 - Backend:**
```bash
cd api
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Abre: http://localhost:3000

## 📦 Estructura del Proyecto

```
UCesarVallejos/
├── index.html                    # Página de demostración
├── package.json                  # Dependencias frontend
├── vite.config.js               # Configuración Vite
│
├── src/
│   └── voice-widget/
│       ├── main.js              # Punto de entrada
│       ├── config.js            # Configuración UCV
│       ├── core.js              # Lógica del widget
│       └── ui.js                # Interfaz del widget
│
├── public/
│   └── assets/
│       └── css/
│           └── voice-widget.css # Estilos UCV
│
└── api/
    ├── server.js                # Backend Express
    ├── package.json             # Dependencias backend
    └── .env                     # Variables de entorno
```

## ⚙️ Configuración

### Personalizar Textos

Edita `src/voice-widget/config.js`:

```javascript
export const VoiceWidgetConfig = {
  whatsappNumber: 'TU_NUMERO',
  whatsappMessage: 'Tu mensaje personalizado',
  // ...
};
```

### Cambiar Colores

Edita `public/assets/css/voice-widget.css` (líneas 7-35):

```css
:root {
  --voice-widget-primary: #e30512;  /* Rojo UCV */
  --voice-widget-dark: #243659;     /* Azul UCV */
  /* ... */
}
```

## 🔧 Variables de Entorno

### Backend (`api/.env`)

```bash
# ElevenLabs (opcional - funciona sin estas credenciales en modo texto)
ELEVENLABS_API_KEY=tu_api_key
ELEVENLABS_AGENT_ID=tu_agent_id

# Seguridad
ALLOWED_EMBED_DOMAINS=localhost,ucv.edu.pe,www.ucv.edu.pe

# Servidor
PORT=3001
```

**Nota:** Si no tienes credenciales de ElevenLabs, el widget funcionará en modo texto.

## 🌐 Deploy en Producción

### Frontend (Vercel)

```bash
npm run build
vercel --prod
```

### Backend (Vercel)

```bash
cd api
vercel env add ELEVENLABS_API_KEY
vercel env add ELEVENLABS_AGENT_ID
vercel env add ALLOWED_EMBED_DOMAINS
vercel --prod
```

## ✨ Características

- ✅ Botón flotante con colores UCV
- ✅ Panel lateral animado
- ✅ Chat de texto con input de teclado
- ✅ Conversación por voz (ElevenLabs)
- ✅ Modo fallback sin ElevenLabs
- ✅ Responsive (móvil y escritorio)
- ✅ Colores corporativos UCV
- ✅ Backend seguro con CORS

## 🐛 Troubleshooting

### El widget no aparece
1. Verifica que el backend esté corriendo
2. Abre consola del navegador (F12)
3. Limpia caché (Ctrl + Shift + R)

### No hay voz (solo texto)
- **Esto es normal** si no tienes credenciales de ElevenLabs
- El modo texto funciona perfectamente sin ElevenLabs
- Para habilitar voz, obtén credenciales en https://elevenlabs.io

### Backend no conecta
1. Verifica que puerto 3001 esté libre
2. Verifica `apiBaseUrl` en config.js
3. Revisa logs del servidor

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev                  # Frontend dev server
cd api && node server.js     # Backend server

# Build
npm run build               # Build para producción
npm run preview             # Preview del build

# Limpieza
rm -rf node_modules dist    # Limpiar dependencias y build
```

## 📚 Documentación

Para más información sobre cómo personalizar el widget, consulta:
- Configuración: `src/voice-widget/config.js`
- Estilos: `public/assets/css/voice-widget.css`
- Backend: `api/server.js`

## 🆘 Soporte

Para reportar problemas o solicitar ayuda, revisa:
1. Consola del navegador (F12)
2. Logs del servidor backend
3. Archivo `.env` configurado correctamente

---

**Universidad César Vallejo** - Voice Widget © 2025
