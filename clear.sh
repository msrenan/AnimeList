#!/bin/bash

echo ""
echo "🛑 Encerrando aplicação..."

# 1. Faz o backup do banco de dados ANTES de derrubar o Docker
echo "💾 Gerando backup do banco de dados..."
if sudo docker ps | grep -q "anime_db"; then
    sudo docker exec anime_db pg_dump -U api -d animelist-db -f /backups/dump.sql 2>/dev/null
    echo "✅ Backup salvo com sucesso em ./backups/dump.sql!"
else
    echo "⚠️ Container anime_db não encontrado rodando. Pulando backup."
fi

# 2. Derruba os contêineres do Docker
if [ -d "./backend" ]; then
    echo "🐳 Derrubando contêineres Docker..."
    (cd ./backend && sudo docker compose down)
fi

# 3. Encerra os processos do Spring Boot e Frontend
if [ -f "PIDs.txt" ]; then
    echo "🔪 Matando processos da aplicação..."
    while IFS='=' read -r NAME PID; do
        if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
            echo "Encerrando $NAME (PID: $PID) e processos filhos..."
            # Elimina os processos filhos (ex: o processo Java criado pelo mvnw ou o Node criado pelo npm)
            pkill -P "$PID" 2>/dev/null
            kill -9 "$PID" 2>/dev/null
        fi
    done < PIDs.txt
    
    rm -f PIDs.txt
fi

echo "✨ Tudo limpo e encerrado com sucesso!"