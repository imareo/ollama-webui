const Fastify = require('fastify');
const proxy = require('@fastify/http-proxy');
const fastifyStatic = require('@fastify/static');
const path = require('node:path');
const os = require('node:os');

const server = Fastify({
  logger: {
    level: 'warn',
  },
});

const UPSTREAM_URL = 'http://your ollama server ip:port/api';
const STATIC_ROOT = path.join(__dirname, '../dist');

const getHostAddress = () => {
  const netInterfaces = os.networkInterfaces();

  for (const key in netInterfaces) {
    for (const netInterface of netInterfaces[key]) {
      if (netInterface.family === 'IPv4' && !netInterface.internal) {
        return netInterface.address;
      }
    }
  }
  console.error('Failed to get network address');
  process.exit(1);
};

server.register(proxy, {
  upstream: UPSTREAM_URL,
  prefix: '/api',
});

server.register(fastifyStatic, {
  root: STATIC_ROOT,
});

server.listen({ port: 3000, host: getHostAddress() }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server start at http://${getHostAddress()}:${3000}`);
});