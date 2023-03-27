# this Dockerfile is just for development
FROM node:alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]
# docker build -t ugulzar4512/basic-testing .
# docker run -p 3000:3000 --name basic-testing --rm -v $(pwd):/app -v /app/node_modules ugulzar4512/basic-testing
# docker run -it --rm -v $(pwd):/app -v /app/node_modules ugulzar4512/basic-testing yarn test
# docker exec -it <container_name> yarn test
