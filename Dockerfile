FROM node:lts
RUN mkdir /project
WORKDIR /project

RUN npm i -g @ionic/cli

ENTRYPOINT ["ionic", "serve", "--external", "--port=8080", "--host=0.0.0.0"]
