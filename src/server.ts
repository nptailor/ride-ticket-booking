import express, { Express, Request, Response, NextFunction, json } from 'express';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import * as dbConnection from './database-connection';
import rideRoutes from './Routes/ride.route';   // Route connected
import ticketRoutes from './Routes/tickets.route';
import userRoutes from './Routes/user.route';



const app: Express = express();
const port = 3000;

//getting the number of cores
const numCPUs = cpus().length;
console.log({ numCPUs })

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
  app.listen(port, () => {
    return console.log(`Worker is listening at http://localhost:${port}`);
  })

  console.log(`Worker ${process.pid} started`);
}
app.use(json());  // registering this middleware for accepting json requests
app.use(express.urlencoded({ limit: '3000mb', extended: false }));


// Routes
app.use('/ride', rideRoutes);// This means all route path precede ride path
app.use('/ticket', ticketRoutes);// This means all route path precede ticket path
app.use('/user', userRoutes);// This means all route path precede user path



// Below route is triggered when any error is thrown
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// connect to database
try {
  dbConnection.connect()
} catch (error) {
  console.error(error);
}