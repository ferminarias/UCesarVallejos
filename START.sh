#!/bin/bash

# 🚀 Script de Inicio Rápido - Universidad César Vallejo Voice Widget
# Este script instala y ejecuta todo automáticamente

echo "🎓 Universidad César Vallejo - Voice Widget"
echo "=========================================="
echo ""

# Verificar que node esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "👉 Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependencias frontend
echo "📦 Instalando dependencias del frontend..."
npm install

# Instalar dependencias backend
echo "📦 Instalando dependencias del backend..."
cd api
npm install
cd ..

echo ""
echo "✅ ¡Instalación completa!"
echo ""
echo "🚀 Iniciando servidores..."
echo ""

# Crear script para ejecutar ambos
echo "📊 Abriendo 2 terminales..."
echo ""

# macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Terminal 1 - Backend
    osascript <<EOF
tell application "Terminal"
    do script "cd $(pwd)/api && node server.js"
    activate
end tell
EOF
    
    sleep 2
    
    # Terminal 2 - Frontend
    osascript <<EOF
tell application "Terminal"
    do script "cd $(pwd) && npm run dev"
    activate
end tell
EOF

    echo "✅ Servidores iniciados en 2 terminales"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:3001"
    echo ""
    echo "👉 Abre tu navegador en: http://localhost:3000"
else
    echo "⚠️  Auto-inicio solo disponible en macOS"
    echo ""
    echo "👉 Ejecuta manualmente:"
    echo ""
    echo "Terminal 1:"
    echo "  cd api && node server.js"
    echo ""
    echo "Terminal 2:"
    echo "  npm run dev"
fi
