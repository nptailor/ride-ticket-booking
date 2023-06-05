import express, { Express } from 'express';
import cluster from 'cluster';
import * as http from 'http';
import { cpus } from 'os';
import process from 'process';


const app: Express = express();
const port = 3000;

//getting the number of cores
const numCPUs = cpus().length;

// creating clusters
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // workers can share any TCP connection
  // in this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(port);

  console.log(`Worker ${process.pid} started`);
}
