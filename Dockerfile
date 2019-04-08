FROM node:10-alpine as frontend
RUN npm install -g typescript

WORKDIR /app
COPY frontend .
RUN npm install && npm run build

FROM node:10-alpine
WORKDIR /app
COPY app .

COPY --from=frontend /app/build public
RUN npm install && npm test && \
    rm -rf coverage node_modules tests && \
    npm install --production

EXPOSE 3001
CMD ["npm", "start"]