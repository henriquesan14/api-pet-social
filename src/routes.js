import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.get('/pets', authMiddleware, PetController.index);
routes.get('/pets/:id', authMiddleware, PetController.getById);
routes.post('/pets', PetController.store);
routes.put('/pets', authMiddleware, PetController.update);
routes.post('/login', AuthController.store)

export default routes;
