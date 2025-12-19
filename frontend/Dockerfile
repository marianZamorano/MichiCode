FROM node:20-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
RUN npm run build

FROM nginx:stable-alpine

RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]