# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm ci

# Verify Node adapter is installed
RUN npm list @sveltejs/adapter-node

# Build the SvelteKit app
RUN npm run build

# Verify build output exists
RUN ls -la build/ || (echo "Build failed!" && exit 1)

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built app from builder
COPY --from=builder /app/build ./build

# Copy start script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Set Node environment to production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the app
CMD [\"./start.sh\"]
