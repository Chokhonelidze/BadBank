FROM node:slim

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

COPY . .

EXPOSE 5001

CMD ["npm","start"]