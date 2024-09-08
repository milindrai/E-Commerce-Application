# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the port
EXPOSE 5002

# Start the application
CMD ["node", "app.js"]
