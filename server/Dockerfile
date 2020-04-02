FROM node:12.13.0

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm i

EXPOSE 5005

ENTRYPOINT ["npm", "run", "server"]