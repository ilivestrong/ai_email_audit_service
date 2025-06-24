FROM node:alpine
WORKDIR /app

COPY package*.json ./
RUN npm install && npm audit fix --force

COPY . .

CMD ["npm", "start"]
