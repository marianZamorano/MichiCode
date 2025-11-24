#!/bin/bash

DB_USER="postgres"
DB_PASS="123456"
DB_NAME="michicode"
BACKUP_DIR="$(pwd)/backups"
DATE=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$BACKUP_DIR"

export PGPASSWORD="$DB_PASS"
pg_dump -h localhost -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_DIR/backup_${DATE}.sql"

echo "Backup creado: backup_${DATE}.sql"