
# TypeScript House Automation

# How it works
<h1 align="center">
<br>
  <img src="https://i.imgur.com/1B7yst3.jpg" alt="Architecture" width=600">
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


# How to run (development)

## Infrastructure (Kafka, Zookeeper, MongoDB)
- Run `docker-compose up -d` to start the infrastructure

## Local Server
- Run `cd local-server` to enter the local server folder
- Run `yarn` to install dependencies
- Run `yarn dev` to start the server
- 
## Remote Server
- Run `cd remote-server` to enter the local server folder
- Run `yarn` to install dependencies
- Run `yarn dev` to start the server

## Client
- Run `cd client` to enter the local server folder
- Run `yarn` to install dependencies
- Run `yarn dev` to start the server
