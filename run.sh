#!/bin/bash

# Garante que o PIDs.txt comece limpo
> PIDs.txt

# Captura o Ctrl+C (SIGINT) e chama o clear.sh automaticamente
trap './clear.sh; exit 0' SIGINT

echo "🚀 Iniciando ambiente de desenvolvimento..."

# 1. Subir o Docker
echo "📦 Subindo banco de dados (Docker)..."
cd ./backend || exit
sudo docker compose up -d
cd ..

# 2. Subir o Backend em segundo plano
echo "☕ Iniciando Spring Boot..."
cd ./backend || exit
./mvnw spring-boot:run &
SPRING_PID=$!
echo "SPRING_PID=$SPRING_PID" >> ../PIDs.txt
cd ..

# 3. Subir o Frontend em segundo plano
echo "⚡ Iniciando Frontend (Vite/React)..."
cd ./frontend || exit
npm run dev &
FRONT_PID=$!
echo "FRONT_PID=$FRONT_PID" >> ../PIDs.txt
cd ..

echo ""
echo "✅ Aplicação rodando em segundo plano!"
echo "📌 PIDs salvos em PIDs.txt"
echo "💡 Pressione Ctrl+C a qualquer momento para fazer backup e encerrar tudo."
echo ""

# Mantém o script vivo para aguardar o Ctrl+C
wait