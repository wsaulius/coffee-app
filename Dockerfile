FROM node:lts
RUN mkdir /project
WORKDIR /project

RUN npm i -g @ionic/cli

ENTRYPOINT [ "bash", "./entrypoint.sh" ]
