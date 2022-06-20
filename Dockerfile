FROM node:12.17.0-alpine
WORKDIR /var/www/nfsdatawarehouse
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run tsc
## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /var/www/nfsdatawarehouse
COPY package.json ./
RUN npm install
COPY --from=0 /var/www/nfsdatawarehouse/build .
RUN npm install pm2 -g
COPY .env.docker ./.env
EXPOSE 1228
CMD ["pm2-runtime","index.js"]