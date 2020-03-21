import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';

const routes = new Router();

routes.post('/pets', PetController.store);
routes.post('/login', AuthController.store)

export default routes;
