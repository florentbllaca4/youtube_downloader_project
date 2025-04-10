# Përdorim një imazh të Node.js
FROM node:14

# Vendosim folderin e punës
WORKDIR /app

# Kopjojmë skedarët e paketës
COPY package.json .

# Instalojmë varësitë
RUN npm install

# Kopjojmë kodin
COPY . .

# Build-i i aplikacionit
RUN npm run build

# Startimi i aplikacionit
CMD ["npm", "start"]
