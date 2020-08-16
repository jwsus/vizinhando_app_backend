import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

export default routes;