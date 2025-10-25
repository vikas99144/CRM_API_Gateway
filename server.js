'use strict';

const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');

const init = async () => {
  const server = Hapi.server({
    port: 5003,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  await server.register(H2o2);

  server.route({
    method: '*',
    path: '/api/v1/admin/{path*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: 5004,
        protocol: 'http',
        passThrough: true
      }
    }
  });

  server.route({
    method: '*',
    path: '/api/v1/company/{path*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: 5005,
        protocol: 'http',
        passThrough: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ status: 'Gateway running' })
  });

  await server.start();
  console.log(`API Gateway running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
