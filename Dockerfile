# Multi-stage build for React + TypeScript frontend application

# Stage 1: Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for better layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build argument for API base URL (required at build time for Vite)
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE

# Build the application
RUN npm run build

# Stage 2: Serve stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set proper permissions for nginx user (nginx user already exists in nginx:alpine)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user (nginx user already exists in nginx:alpine)
USER nginx

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
