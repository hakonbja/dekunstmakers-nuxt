# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for Strapi connection
ARG STRAPI_API_TOKEN
ARG NUXT_PUBLIC_STRAPI_URL

ENV STRAPI_API_TOKEN=${STRAPI_API_TOKEN}
ENV NUXT_PUBLIC_STRAPI_URL=${NUXT_PUBLIC_STRAPI_URL}

# Generate static site
RUN npm run generate

# Production stage with nginx
FROM nginx:alpine

# Copy static files from builder
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
