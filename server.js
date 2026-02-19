'use strict';

import cluster from 'cluster';
import os from 'os';
import express from 'express';
import cors from 'cors';
import http from 'http';

import { limiter } from "./middlewares/rateLimit.middleware.js";
import indexRoutes from './routes/index.js';

const PORT = 5003;
const CPU_COUNT = os.cpus().length;


if (cluster.isPrimary) {

  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking ${CPU_COUNT} workers...\n`);

  for (let i = 0; i < CPU_COUNT; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(limiter);

  app.use('/api/v1/', indexRoutes);

  app.get('/', (req, res) => {
    res.json({
      status: 'gRPC Gateway running',
      worker: process.pid
    });
  });


  const server = http.createServer(app);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });

}
