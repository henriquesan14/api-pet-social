import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';
import AmizadeController from './app/controllers/AmizadeController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.get('/pets', authMiddleware, PetController.index);
routes.get('/pets/:id', authMiddleware, PetController.getById);
routes.post('/pets', PetController.store);
routes.put('/pets', authMiddleware, PetController.update);
routes.get('/amizades', authMiddleware, AmizadeController.index);
routes.post('/amizades', authMiddleware, AmizadeController.store);
routes.put('/amizades/:id', authMiddleware, AmizadeController.update);
routes.post('/login', AuthController.store)

export default routes;
