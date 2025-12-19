# 🐈 MichiCode: Acortador de URLs y Generador de Códigos QR

## 🚀 Resumen del Proyecto

**MichiCode** es una aplicación web completa (Full Stack) diseñada para acortar URLs al instante y generar códigos QR profesionales. La solución está construida con una arquitectura de microservicios contenerizada utilizando Docker y desplegada en una instancia EC2 de AWS, con automatización completa de integración y despliegue continuo (CI/CD) a través de GitHub Actions.

Este proyecto cumple con los requisitos del Segundo Parcial, demostrando el uso de contenedores, orquestación, infraestructura en la nube y pipelines de CI/CD.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend (SPA)** | React, TypeScript, Material UI (MUI) | Interfaz de usuario para acortar URLs y generar QRs, y visualizar el historial. |
| **Backend (API REST)** | Node.js, Express, TypeScript | Implementa la lógica de negocio, manejo de endpoints API REST (`/api/*`) y redireccionamiento (`/*`). |
| **Base de Datos** | MongoDB (NoSQL) | Persistencia de datos para las URLs cortas, códigos QR y estadísticas de clicks. |
| **Contenerización** | Docker, Docker Compose | Cada componente se ejecuta en un contenedor independiente. |
| **Infraestructura** | Amazon EC2 (AWS) | Host de ejecución para los contenedores en producción. |
| **CI/CD** | GitHub Actions | Pipeline automatizado de construcción, testeo y despliegue. |

---

## Arquitectura de la Solución

La aplicación sigue una arquitectura de tres capas completamente contenerizadas.

### Componentes

1.  **`michicode-mongo` (DB):** Contenedor de MongoDB (v6) que maneja la persistencia de datos. No se expone públicamente.
2.  **`michicode-backend` (API):** Contenedor de Node.js/Express (puerto 5000). Se conecta a `michicode-mongo` y expone las rutas de la API y el servicio de redireccionamiento.
3.  **`michicode-frontend` (SPA):** Contenedor de React servido por Nginx (puerto 80). Se comunica con el backend a través de `http://52.33.205.250:5000` (o la IP pública de la EC2).

## ⚙️ Configuración y Despliegue Local (Docker Compose)

El proyecto incluye un archivo `docker-compose.yml` para levantar todo el stack en un entorno de desarrollo local.

### Prerrequisitos
* Docker y Docker Compose instalados.

### Comandos de Ejecución

1.  **Levantar el Stack:**
    ```bash
    docker-compose up --build -d
    ```

2.  **Acceso:**
    * **Frontend (App):** Acceder en `http://localhost:80`
    * **Backend (API):** Acceder en `http://localhost:5000`

3.  **Detener y Limpiar:**
    ```bash
    docker-compose down -v
    ```

---

## ☁️ Despliegue en Producción (AWS EC2)

El despliegue en la instancia EC2 se realiza manualmente (o vía GitHub Actions) utilizando comandos `docker run` para una orquestación simple.

### Variables de Entorno Clave

| Servicio | Variable | Valor en Producción | Descripción |
| :--- | :--- | :--- | :--- |
| **Backend** | `MONGODB_URI` | `mongodb://root:rootpassword@michicode-mongo:27017/michicode?authSource=admin` | Conexión a la base de datos dentro de la red Docker. |
| **Backend** | `BASE_URL` | `http://52.33.205.250:5000` | URL base utilizada para generar las URLs cortas y los QRs. |
| **Frontend** | `REACT_APP_API_BASE_URL` | `http://52.33.205.250:5000` | URL para que el frontend acceda al backend (configurada durante el build). |
| **MongoDB** | `MONGO_INITDB_ROOT_PASSWORD` | `rootpassword` | Credencial de acceso a la DB. |

### Comandos de Despliegue Manual en EC2

Se utiliza una red Docker (`michicode-net`) para permitir la comunicación interna.

1.  **Limpieza y Creación de la Red (Si es necesario):**
    ```bash
    docker stop frontend backend michicode-mongo
    docker rm frontend backend michicode-mongo
    docker container prune -f
    docker network create michicode-net 
    ```

2.  **Iniciar MongoDB (DB):**
    ```bash
    docker run -d \
      --name michicode-mongo \
      --network michicode-net \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=root \
      -e MONGO_INITDB_ROOT_PASSWORD=rootpassword \
      -e MONGO_INITDB_DATABASE=michicode \
      mongo:6
    ```

3.  **Iniciar Backend (API):**
    ```bash
    docker run -d \
      --name backend \
      --network michicode-net \
      -p 5000:5000 \
      -e PORT=5000 \
      -e MONGODB_URI="mongodb://root:rootpassword@michicode-mongo:27017/michicode?authSource=admin" \
      -e BASE_URL="[http://52.33.205.250:5000](http://52.33.205.250:5000)" \
      marianz16/michicode-backend:latest
    ```

4.  **Iniciar Frontend (Web):**
    ```bash
    docker run -d \
      --name frontend \
      --network michicode-net \
      -p 80:80 \
      marianz16/michicode-frontend:latest
    ```

### Acceso Público

El proyecto está accesible públicamente a través de la IP de la instancia EC2 en el puerto 80 (HTTP estándar):

**URL Pública:** `http://52.33.205.250/`

---

## 🔄 CI/CD con GitHub Actions

El pipeline de CI/CD (definido en `.github/workflows/deploy.yml`) se encarga de automatizar la construcción, el testeo y el despliegue a la instancia EC2.

### Flujo de Trabajo

1.  **`on: push`** en la rama `main` y `workflow_dispatch` (ejecución manual).
2.  **Jobs:**
    * **`build-and-test`**: Ejecuta las pruebas unitarias y de integración. (No se detalla en el YAML subido, pero es una sugerencia de buena práctica).
    * **`build-images`**: Construye las imágenes de Docker para el frontend y el backend y las etiqueta con el SHA del commit. Luego, realiza el push a Docker Hub (o un registry configurado).
    * **`deploy`**: Se conecta por SSH a la instancia EC2 y ejecuta los comandos de `docker pull` y `docker run` para actualizar y levantar los contenedores.