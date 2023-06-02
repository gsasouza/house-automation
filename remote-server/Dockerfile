# Etapa de construção das dependências
FROM  node:16.15.0-alpine3.15 As dependencies

RUN apk add --no-cache bash g++ make py3-pip chromium yarn


COPY --chown=node:node package*.json ./
COPY . .
 
RUN yarn 


# Etapa final para o  remote-server-dev
FROM dependencies AS remote-server-dev
CMD [ "yarn", "dev"]
# Etapa final para o  remote-server-prod
FROM dependencies AS remote-server-prod
RUN yarn build
CMD [ "yarn", "start"]
