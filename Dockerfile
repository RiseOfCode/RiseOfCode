FROM node:16.3-alpine
    
WORKDIR /app

COPY . .

RUN yarn && yarn build

ENTRYPOINT ["sh", "-c", "rc-status; rc-service sshd start; yarn start"]
