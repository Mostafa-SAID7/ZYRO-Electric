# ⚡ ZYRO - Tech Accessories Platform
# Docker Production Build (Multi-stage: Node v22.22.3 → Nginx)
# Build: docker build -t msaid356/zyro-electric:latest .
# Run:   docker run -p 3030:80 msaid356/zyro-electric:latest
# Push:  docker push msaid356/zyro-electric:latest

# ── Stage 1: Build Angular App with Node 22.22.3 ───────────────────────────────
FROM node:22.22.3-alpine AS builder

LABEL maintainer="ZYRO Dev Team <dev@zyro.tech>"
LABEL description="ZYRO - Premium Tech Accessories E-Commerce Platform (Production Build)"
LABEL version="1.0.0"
LABEL brand="ZYRO - Tech. Organized. Elevated."

WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install dependencies with proper native module handling
# Use --omit=optional (correct npm v7+ syntax) instead of deprecated --no-optional
# This skips optional native dependencies that don't have Alpine prebuilts
RUN npm install --legacy-peer-deps --omit=optional 2>&1 | grep -v "npm warn" || true

# Copy source code
COPY . .

# Build the production bundle (optimized)
RUN npm run build

# ── Stage 2: Serve with Nginx 1.27-alpine ──────────────────────────────────────
FROM nginx:1.27-alpine AS production

LABEL maintainer="ZYRO Dev Team <dev@zyro.tech>"
LABEL description="ZYRO - Tech Accessories E-Commerce Platform"
LABEL version="1.0.0"

WORKDIR /etc/nginx

# Remove default Nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom Nginx config (optimized for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist/market /usr/share/nginx/html

# Set permissions (nginx user already exists in nginx base image)
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Expose port 80 (Nginx listens on 80, docker-compose maps to 3030)
EXPOSE 80

# Health check - verify Nginx is responding
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
