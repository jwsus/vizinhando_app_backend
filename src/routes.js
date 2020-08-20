import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/login', SessionController.store);

//a partir daqui todas as rotas precisam de autenticação
routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.get('/me', UserController.show);

routes.delete('/user/delete', UserController.delete);

export default routes;
