import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/pets', authMiddleware, PetController.store);
routes.post('/login', AuthController.store)

export default routes;
