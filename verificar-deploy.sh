#!/bin/bash

# 🔍 Script de Verificación Pre-Deploy
# Universidad César Vallejo Voice Widget

echo "🔍 Verificando configuración para deploy en Vercel..."
echo "=================================================="
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
ERRORS=0
WARNINGS=0

# 1. Verificar Node.js
echo "1️⃣ Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js no encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 2. Verificar package.json
echo "2️⃣ Verificando package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json existe${NC}"
    
    # Verificar scripts
    if grep -q '"build": "vite build"' package.json; then
        echo -e "${GREEN}✅ Script build configurado${NC}"
    else
        echo -e "${RED}❌ Script build no encontrado${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}❌ package.json no encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 3. Verificar vite.config.js
echo "3️⃣ Verificando vite.config.js..."
if [ -f "vite.config.js" ]; then
    echo -e "${GREEN}✅ vite.config.js existe${NC}"
else
    echo -e "${RED}❌ vite.config.js no encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 4. Verificar vercel.json
echo "4️⃣ Verificando vercel.json..."
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json existe${NC}"
else
    echo -e "${YELLOW}⚠️  vercel.json no encontrado (opcional)${NC}"
    ((WARNINGS++))
fi
echo ""

# 5. Verificar archivos del widget
echo "5️⃣ Verificando archivos del widget..."
if [ -f "src/voice-widget/main.js" ]; then
    echo -e "${GREEN}✅ main.js existe${NC}"
else
    echo -e "${RED}❌ main.js no encontrado${NC}"
    ((ERRORS++))
fi

if [ -f "src/voice-widget/config.js" ]; then
    echo -e "${GREEN}✅ config.js existe${NC}"
else
    echo -e "${RED}❌ config.js no encontrado${NC}"
    ((ERRORS++))
fi

if [ -f "src/voice-widget/core.js" ]; then
    echo -e "${GREEN}✅ core.js existe${NC}"
else
    echo -e "${RED}❌ core.js no encontrado${NC}"
    ((ERRORS++))
fi

if [ -f "src/voice-widget/ui.js" ]; then
    echo -e "${GREEN}✅ ui.js existe${NC}"
else
    echo -e "${RED}❌ ui.js no encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 6. Verificar CSS
echo "6️⃣ Verificando CSS..."
if [ -f "public/assets/css/voice-widget.css" ]; then
    echo -e "${GREEN}✅ voice-widget.css existe${NC}"
    
    # Verificar colores UCV
    if grep -q "#e30512" public/assets/css/voice-widget.css; then
        echo -e "${GREEN}✅ Color rojo UCV configurado${NC}"
    else
        echo -e "${YELLOW}⚠️  Color rojo UCV no encontrado${NC}"
        ((WARNINGS++))
    fi
    
    if grep -q "#243659" public/assets/css/voice-widget.css; then
        echo -e "${GREEN}✅ Color azul UCV configurado${NC}"
    else
        echo -e "${YELLOW}⚠️  Color azul UCV no encontrado${NC}"
        ((WARNINGS++))
    fi
else
    echo -e "${RED}❌ voice-widget.css no encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 7. Verificar Backend API
echo "7️⃣ Verificando Backend API..."
if [ -f "api/server.js" ]; then
    echo -e "${GREEN}✅ server.js existe${NC}"
else
    echo -e "${RED}❌ server.js no encontrado${NC}"
    ((ERRORS++))
fi

if [ -f "api/package.json" ]; then
    echo -e "${GREEN}✅ api/package.json existe${NC}"
else
    echo -e "${RED}❌ api/package.json no encontrado${NC}"
    ((ERRORS++))
fi

if [ -f "api/vercel.json" ]; then
    echo -e "${GREEN}✅ api/vercel.json existe${NC}"
else
    echo -e "${YELLOW}⚠️  api/vercel.json no encontrado${NC}"
    ((WARNINGS++))
fi

if [ -f "api/.env.example" ]; then
    echo -e "${GREEN}✅ api/.env.example existe${NC}"
else
    echo -e "${YELLOW}⚠️  api/.env.example no encontrado${NC}"
    ((WARNINGS++))
fi
echo ""

# 8. Verificar dependencias instaladas
echo "8️⃣ Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe (frontend)${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules no encontrado - ejecuta: npm install${NC}"
    ((WARNINGS++))
fi

if [ -d "api/node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe (backend)${NC}"
else
    echo -e "${YELLOW}⚠️  api/node_modules no encontrado - ejecuta: cd api && npm install${NC}"
    ((WARNINGS++))
fi
echo ""

# 9. Test de build
echo "9️⃣ Verificando si el build funciona..."
if npm run build &> /dev/null; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
    if [ -d "dist" ]; then
        echo -e "${GREEN}✅ Carpeta dist generada${NC}"
    fi
else
    echo -e "${RED}❌ Build falló - ejecuta: npm run build${NC}"
    ((ERRORS++))
fi
echo ""

# RESUMEN
echo "=================================================="
echo "📊 RESUMEN"
echo "=================================================="
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ SIN ERRORES - Listo para deploy!${NC}"
else
    echo -e "${RED}❌ $ERRORS error(es) encontrado(s)${NC}"
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS advertencia(s)${NC}"
fi

echo ""
echo "=================================================="
echo "🚀 PRÓXIMOS PASOS PARA DEPLOY"
echo "=================================================="
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "1️⃣ Deploy Frontend:"
    echo "   vercel --prod"
    echo ""
    echo "2️⃣ Deploy Backend:"
    echo "   cd api && vercel --prod"
    echo ""
    echo "3️⃣ Configurar variables de entorno en Vercel Dashboard:"
    echo "   - ELEVENLABS_API_KEY"
    echo "   - ELEVENLABS_AGENT_ID"
    echo "   - ALLOWED_EMBED_DOMAINS"
    echo "   - PORT=3001"
    echo "   - NODE_ENV=production"
    echo ""
    echo "📖 Ver DEPLOY-VERCEL.md para instrucciones completas"
else
    echo "❌ Corrige los errores antes de deployar"
    echo ""
    echo "Comandos útiles:"
    echo "  npm install              # Instalar dependencias frontend"
    echo "  cd api && npm install    # Instalar dependencias backend"
    echo "  npm run build            # Probar build"
fi

echo ""
