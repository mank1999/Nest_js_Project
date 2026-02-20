# Use multi-stage build to avoid installing dev deps in final image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package*.json ./

# If you hit ERESOLVE: we enable legacy-peer-deps to bypass strict peer deps resolution
RUN npm config set legacy-peer-deps true \
 && npm install

# Copy source and build
COPY . .
RUN npm run build

# Final image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built files and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]