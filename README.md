
# Grupo 9


# How it works
<h1 align="center">
<br>
  <img src="https://i.imgur.com/J69MhL2.jpeg" alt="Architecture" width=600">
<br>
</h1>

# How to run (development)

## Docker setup
- Install docker and docker-compose
- run `docker-compose up -d` to start the project

## Infrastructure (Kafka, Zookeeper, MongoDB)
- Run `docker-compose up -d` to start the infrastructure

## Remote Server (for managing users and boards, in nodejs)
- Run `cd remote-server` to enter the local server folder
- Run `yarn` to install dependencies
- Run `cp .env.sample .env` to create the environment file, and fill any missing values
- Run `yarn dev` to start the server

### Create first user
- Run `yarn build & yarn repl` to start the repl
- Inside repl, run `User.create({ username: "USERNAME", password: "PASSWORD", isAdmin: true, name: "NAME"})`

### Create kafka topic for this user
- Check container name for kafka using `docker ps`
- Run `docker exec CONTAINER_NAME kafka-topics --create --bootstrap-server localhost:29092 --partitions 1 --replication-factor 1 --topic USERNAME`

## Local Server (ESP)
## Client
- Run `cd client` to enter the local server folder
- Run `yarn` to install dependencies
- Run `cp .env.sample .env` to create the environment file, and fill any missing values
- Run `yarn relay` to compile graphql queries
- Run `yarn dev` to start the server

## Local Server
- Run `cd local-server` to enter the local server folder
- Run `yarn` to install dependencies
- Run `cp .env.sample .env` to create the environment file, and fill any missing values
- Run `yarn dev` to start the server

### Prepare board with firmata
- https://dev.to/salted-bytes/wireless-javascript-robotics-with-johnny-five-and-the-esp8266-al3 (follow until "Our first robot script")

## Remote Server (for managing users and boards, in nodejs)
- Run `cd remote-server` to enter the local server folder
- Run `yarn` to install dependencies
- Run `cp .env.sample .env` to create the environment file, and fill any missing values
- Run `yarn dev` to start the server

## Client (React)
- Run `cd client` to enter the local server folder
- Run `yarn` to install dependencies
- Run `cp .env.sample .env` to create the environment file, and fill any missing values
- Run `yarn relay` to start the server

# How to run (production)
- Replace all `yarn dev` scrips by `yarn build & yarn start`
- Replace env in remote to use designated .env file 

# How it works
<h1 align="center">
<br>
  <img src="https://i.imgur.com/J69MhL2.jpeg" alt="Architecture" width=600">
<br>
</h1>


# Demo

<h2 align="center">
<br>
  <img src="https://i.imgur.com/Z3Z073Y.gif" alt="Real Time" width=350">
<br>
</h2>


# It uses graphql subscriptions to keep IO state synced between all clients
<h2 align="center">
<br>
  <img src="https://i.imgur.com/4w0u41i.gif" alt="Real Time" width=800">
<br>
</h2>
