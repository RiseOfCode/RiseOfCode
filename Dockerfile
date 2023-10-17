FROM node:16.14-alpine
    
WORKDIR /app

COPY . .

RUN yarn && yarn build

ENTRYPOINT ["sh", "-c", "rc-status; rc-service sshd start; yarn start"]
