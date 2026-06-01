# Välj en bas-image
FROM node:20-slim

# Sätt arbetskatalogen INNE i containern till /app
WORKDIR /app

# Kopiera package.json och installera dependencies
COPY package*.json ./
RUN npm ci

# Kopiera resten av filerna
COPY . .

# Kompilera TypeScript till JavaScript
RUN npm run build

CMD ["npm", "run", "start"]