# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend package.json and install dependencies
COPY package.json package-lock.json* ./ 
RUN npm install

# Copy backend and frontend files
COPY backend ./backend
COPY frontend ./frontend

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "backend/server.js"]