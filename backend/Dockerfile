# ----------------------------------------------------
# 1. BUILD STAGE (Compilación de TypeScript)
# ----------------------------------------------------
# USANDO EL NOMBRE 'builder' EXPLÍCITAMENTE
FROM node:20-alpine AS builder

WORKDIR /app/backend

# Copiamos solo los archivos de dependencias
COPY package*.json ./
# Instalamos dependencias de desarrollo y producción (necesarias para la compilación)
RUN npm install --unsafe-perm

# Copiamos el código fuente
COPY . .
# Compilamos el TypeScript. Esto crea la carpeta 'dist/'
RUN npm run build

# ----------------------------------------------------
# 2. PRODUCTION STAGE (Solo ejecución)
# ----------------------------------------------------
# Usamos una imagen base ligera y limpia para el runtime
FROM node:20-alpine

# Definimos el puerto
ENV PORT=5000 
WORKDIR /app

# Copiamos solo las dependencias de producción
COPY package*.json ./
# Solo instalamos dependencias de producción
RUN npm install --only=production --unsafe-perm

# Limpiamos el caché de npm (Buena práctica para reducir la imagen)
RUN npm cache clean --force

# Copiamos el código compilado desde la etapa 'builder'
COPY --from=builder /app/backend/dist ./dist

# Comando para iniciar la aplicación
CMD [ "node", "dist/server.js" ]