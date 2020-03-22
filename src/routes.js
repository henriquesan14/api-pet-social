import { Router } from 'express';

import PetController from './app/controllers/PetController';
import AuthController from './app/controllers/AuthController';
import AmizadeController from './app/controllers/AmizadeController';
import SolicitacaoAmizadeController from './app/controllers/SolicitacaoAmizadeController';
import TimelineController from './app/controllers/TimelineController';
import ComentarioController from './app/controllers/ComentarioController';
import LikeController from './app/controllers/LikeController';
import ConversaController from './app/controllers/ConversaController';
import MensagemController from './app/controllers/MensagemController';

import authMiddleware from './app/middlewares/auth';


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
routes.delete('/solicitacoes/:id', authMiddleware, SolicitacaoAmizadeController.remove);
routes.get('/timeline', authMiddleware, TimelineController.index);
routes.post('/timeline', authMiddleware, TimelineController.store);
routes.delete('/timeline/:id', authMiddleware, TimelineController.remove);
routes.post('/comentarios', authMiddleware, ComentarioController.store);
routes.delete('/comentarios/:id', authMiddleware, ComentarioController.remove);
routes.post('/likes', authMiddleware, LikeController.store);
routes.delete('/likes/:id', authMiddleware, LikeController.remove);
routes.get('/conversas', authMiddleware, ConversaController.index);
routes.delete('/conversas/:id', authMiddleware, ConversaController.remove);
routes.get('/conversas/:id/mensagens', authMiddleware, MensagemController.index);
routes.post('/mensagens', authMiddleware, MensagemController.store);
routes.post('/login', AuthController.store)

export default routes;
