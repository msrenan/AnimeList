# --- VARIÁVEIS DE CONFIGURAÇÃO ---
DB_CONTAINER = anime_db
DB_USER      = api
DB_NAME      = animelist-db
BACKUP_FILE  = /backups/dump.sql
COMPOSE      = docker compose -f ./backend/compose.yaml

# --- REGISTRO DE COMANDOS (Evita conflito com arquivos de mesmo nome) ---
.PHONY: help up down backup logs restart

# Target padrão executado ao digitar apenas 'make'
help:
	@echo "Comandos disponíveis:"
	@echo "  make up      - Sobe os contêineres em background"
	@echo "  make backup  - Gera um dump do banco de dados"
	@echo "  make down    - Gera backup e derruba os contêineres"
	@echo "  make logs    - Acompanha os logs em tempo real"

up:
	sudo $(COMPOSE) up -d

backup:
	sudo docker exec $(DB_CONTAINER) pg_dump -U $(DB_USER) -d $(DB_NAME) -f $(BACKUP_FILE)

# Fix

# Executa 'backup' automaticamente ANTES do 'docker compose down'
down: backup
	sudo $(COMPOSE) down

logs:
	sudo $(COMPOSE) logs -f

restart: down up

run:
	./run.sh

clear:
	./clear.sh