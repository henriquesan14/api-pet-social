import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';
import AmizadeController from './app/controllers/AmizadeController';
import SolicitacaoAmizadeController from './app/controllers/SolicitacaoAmizadeController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.get('/pets', authMiddleware, PetController.index);
routes.get('/pets/:id', authMiddleware, PetController.getById);
routes.post('/pets', PetController.store);
routes.put('/pets', authMiddleware, PetController.update);
routes.get('/amizades', authMiddleware, AmizadeController.index);
routes.delete('/amizades/:id', authMiddleware, AmizadeController.remove);
routes.get('/solicitacoes', authMiddleware, SolicitacaoAmizadeController.index);
routes.post('/solicitacoes', authMiddleware, SolicitacaoAmizadeController.store);
routes.put('/solicitacoes/:id', authMiddleware, SolicitacaoAmizadeController.update);
routes.post('/login', AuthController.store)

export default routes;
