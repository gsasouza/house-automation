import http from 'http';

const requestListener = (req, res) => {
  res.writeHead(200);
  res.end('Interface Online!');
};

const app = http.createServer(requestListener);

export default app;
