# Etapa de construção das dependências
FROM node:18 As dependencies

COPY --chown=node:node package*.json ./
COPY . .

RUN yarn  && \
    yarn build

# Etapa final para o  remote-server-dev
FROM dependencies AS remote-server-dev
CMD [ "yarn", "dev"]
# Etapa final para o  remote-server-prod
FROM dependencies AS remote-server-prod
RUN yarn build
CMD [ "yarn", "start"]
