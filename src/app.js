import 'dotenv/config';

/**  Carrega todas as variaveis de ambiente e coloca em uma global do
 *   node chamada process.env
 * */

import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import Youch from 'youch';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uplodas')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Quando um mdw recebe 4 parametros o express entende que ele é
   * */

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server Error' });
    });
  }
}

export default new App().server;
