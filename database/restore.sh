#!/bin/bash

echo "Lista de backups disponibles:"
ls -1 backups/*.sql

read -p "Nombre del backup a restaurar (ej: backup_20251124_1030.sql): " FILE

if [ -f "backups/$FILE" ]; then
    export PGPASSWORD="123456"
    psql -h localhost -U postgres -d michicode -f "backups/$FILE"
    echo "Restauración completada desde $FILE"
else
    echo "Archivo no encontrado"
fi