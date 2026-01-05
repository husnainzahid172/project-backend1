# Use Node.js LTS version
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY ./package.json ./package-lock.json ./

RUN npm install

# Copy the rest of the files
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
