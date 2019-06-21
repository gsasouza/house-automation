require('@babel/polyfill');
const express = require('express')
const path = require('path')

const server = express()
const PORT = process.env.PORT || 5000

server.use(express.static(path.join(__dirname, 'build')))

server.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(PORT, () => console.log(`Listening on :${PORT}`))
