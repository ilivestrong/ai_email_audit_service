FROM node:alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm audit fix --force

# Copy source code
COPY . .

# Optional: ensure ts-node and dotenv are installed globally (if needed)
# RUN npm install -g ts-node dotenv

# Run your start script defined in package.json
CMD ["npm", "start"]
