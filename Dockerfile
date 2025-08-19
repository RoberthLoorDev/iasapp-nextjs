# --- Etapa 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar dependencias y hacer instalación
COPY package*.json ./
RUN npm ci

# Copiar el resto del código y construir la app
COPY . .
RUN npm run build

# --- Etapa 2: Runner ---
FROM node:20-alpine
WORKDIR /app

# Copiar dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar los artefactos de build desde el builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Puerto donde correrá Next.js
EXPOSE 4000

# Arrancar Next.js en producción
CMD ["npx", "next", "start", "-p", "4000"]
