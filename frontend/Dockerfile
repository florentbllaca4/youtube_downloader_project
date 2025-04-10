# Përdorim një imazh bazë për Node.js
FROM node:16

# Krijojmë një folder për aplikacionin
WORKDIR /app

# Kopjojmë skedarët e kërkuar në konteiner
COPY package.json /app/
COPY package-lock.json /app/

# Instalojmë varësitë e nevojshme
RUN npm install

# Kopjojmë gjithë skedarët e aplikacionit në konteiner
COPY . /app/

# Ndërtojmë aplikacionin për prodhim
RUN npm run build

# Ekspozimi i portit që React përdor
EXPOSE 3000

# Komanda për të startuar aplikacionin React
CMD ["npm", "start"]
