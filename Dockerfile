# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source and config files
COPY . .

# Build the SvelteKit app
RUN npm run build

# Verify build directory exists
RUN test -d build && echo "Build successful!" || (echo "Build failed - no build directory" && exit 1)

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built app from builder
COPY --from=builder /app/build ./build

# Copy start script
COPY start.sh ./

# Make start script executable
RUN chmod +x ./start.sh

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["./start.sh"]
