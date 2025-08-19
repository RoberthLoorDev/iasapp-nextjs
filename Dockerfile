# --- Etapa 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .   # <-- ya aquí entra tu package.json actualizado
RUN npm run build
