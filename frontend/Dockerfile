# Välj en bas-image
FROM node:20-alpine

# Sätt arbetskatalogen INNE i containern till /app
WORKDIR /app

# Kopiera package.json och installera dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Kopiera resten av filerna (används mest för produktion, 
# i utveckling skrivs detta över av din "volume" i docker-compose)
COPY . .

#  Ta emot argumentet från GitHub Actions och gör om till miljövariabel innan build!
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL


CMD ["npm", "run", "dev"]