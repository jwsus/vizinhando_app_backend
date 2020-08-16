import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = new Router();

routes.post('/user', UserController.store);

export default routes;