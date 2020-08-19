import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const cors = require('cors');


class App{
  constructor() {
    this.server = express();


    mongoose.connect('mongodb+srv://kleber:kleber@cluster0.moq2t.mongodb.net/VIZINHANDOBD?retryWrites=true&w=majority',{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.setcors();
    this.middlewares();
    this.routes();
  }

  setcors(){
    this.server.use(cors());
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server; 
