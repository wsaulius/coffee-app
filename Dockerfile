FROM node:lts
WORKDIR /project

RUN npm i -g @ionic/cli

ENTRYPOINT ["ionic", "serve", "--external"]
