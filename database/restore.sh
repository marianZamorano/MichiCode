#!/bin/bash

DB_NAME="michicode"
BACKUP_DIR="$(pwd)/backups"

echo "Lista de backups disponibles:"
ls -1 "$BACKUP_DIR"

read -p "Nombre del backup a restaurar (ej: backup_20251124_1030): " FOLDER

if [ -d "$BACKUP_DIR/$FOLDER" ]; then
    mongorestore --host localhost --port 27017 \
      --username root --password rootpassword \
      --authenticationDatabase admin \
      --db "$DB_NAME" \
      --drop "$BACKUP_DIR/$FOLDER/$DB_NAME"
    echo "✅ Restauración completada desde $FOLDER"
else
    echo "❌ Carpeta de backup no encontrada"
fi