# Etapa de construção das dependências
FROM  node:16.15.0-alpine3.15 As dependencies

RUN apk add --no-cache bash g++ make py3-pip chromium yarn

COPY --chown=node:node package*.json ./
COPY . .
 
RUN yarn && yarn relay

RUN yarn build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=dependencies /build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
