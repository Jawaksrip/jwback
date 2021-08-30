FROM node:16-alpine3.14

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]