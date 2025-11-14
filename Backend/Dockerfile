# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine AS production
WORKDIR /usr/src/app

# Copy built files from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]