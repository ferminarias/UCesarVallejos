# 🚨 INSTRUCCIONES IMPORTANTES - ACTUALIZACIÓN REQUERIDA

## ❌ PROBLEMA ACTUAL

Tu sistema tiene **Node.js v8.9.4** instalado, pero el proyecto requiere **Node.js >= v18.0.0**

```bash
# Versión actual (ANTIGUA)
$ node --version
v8.9.4

# Versión requerida
>= v18.0.0
```

## ✅ SOLUCIÓN: Actualizar Node.js

### Opción 1: Usando nvm (Recomendado)

```bash
# 1. Instalar nvm si no lo tienes
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Cerrar y reabrir la terminal

# 3. Instalar Node.js v20 (LTS)
nvm install 20

# 4. Usar Node.js v20
nvm use 20

# 5. Verificar versión
node --version  # Debe mostrar v20.x.x
```

### Opción 2: Instalador oficial

1. Ve a https://nodejs.org/
2. Descarga el instalador LTS (v20.x)
3. Instala y reinicia la terminal
4. Verifica: `node --version`

## 🚀 DESPUÉS DE ACTUALIZAR NODE.JS

Una vez que tengas Node.js >= v18, ejecuta:

```bash
# 1. Ir al directorio del proyecto
cd /Users/ferminarias/Documents/GitHub/UCesarVallejos

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El servidor se iniciará en http://localhost:3000

## 📋 ¿QUÉ INCLUYE EL PROYECTO?

### ✅ Voice Widget
- Botón flotante en la esquina inferior derecha
- Panel deslizante con chat de voz
- Integración con ElevenLabs
- Colores corporativos UCV (#e30512 rojo, #243659 azul)

### ✅ Efectos Visuales
- **AOS (Animate On Scroll)**: Animaciones al hacer scroll
- **Parallax**: Fondo que responde al movimiento del mouse
- **Hover Effects**: Elevación y sombras en elementos interactivos
- **Ripple Effect**: Efecto de onda en botones
- **Scroll Progress Bar**: Barra de progreso en la parte superior
- **Text Shine**: Efecto de brillo en títulos
- **Smooth Scroll**: Desplazamiento suave

## 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Backend API
ELEVENLABS_API_KEY=tu_api_key_aqui
ELEVENLABS_AGENT_ID=tu_agent_id_aqui
PORT=3001
NODE_ENV=development
```

## 📦 DEPLOY A VERCEL

Una vez que todo funcione localmente:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables de entorno en Vercel Dashboard
```

## 🆘 PROBLEMAS COMUNES

### El voice widget no se abre
- ✅ Verifica que el servidor dev esté corriendo (`npm run dev`)
- ✅ Abre la consola del navegador (F12) y busca errores
- ✅ Verifica que las variables de entorno estén configuradas

### Los efectos no se ven
- ✅ Asegúrate de que la librería AOS se cargue (revisa la consola)
- ✅ Haz scroll en la página para ver las animaciones
- ✅ Mueve el mouse para ver el efecto parallax

### Error de CORS
- ✅ El backend debe estar corriendo en puerto 3001
- ✅ El frontend en puerto 3000
- ✅ Ambos deben estar en localhost

## 📞 NECESITAS AYUDA?

Si después de actualizar Node.js sigues teniendo problemas, revisa:
1. La consola del navegador (F12)
2. Los logs del servidor (`npm run dev`)
3. Las variables de entorno

---

**NOTA**: El proyecto NO FUNCIONARÁ con Node.js v8.9.4. Debes actualizar primero.
