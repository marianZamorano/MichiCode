#!/bin/bash

DB_NAME="michicode"
BACKUP_DIR="$(pwd)/backups"
DATE=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$BACKUP_DIR"

mongodump --host localhost --port 27017 \
  --username root --password rootpassword \
  --authenticationDatabase admin \
  --db "$DB_NAME" \
  --out "$BACKUP_DIR/backup_$DATE"

echo "✅ Backup creado en $BACKUP_DIR/backup_$DATE"