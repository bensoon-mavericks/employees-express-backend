# Use Node.js LTS image
FROM node:14 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Production image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# move over migration folders
COPY ./config ./config
COPY ./migrations ./migrations
COPY ./models ./models
COPY ./seeders ./seeders

# Copy compiled TypeScript files from build stage
COPY --from=build /usr/src/app/dist ./dist


# Expose port
EXPOSE 3000