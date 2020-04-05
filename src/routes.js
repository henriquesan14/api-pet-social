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
import AvatarController from './app/controllers/AvatarController';

import { validateCreatePet, validateUpdatePet } from './app/validators/PetValidator';
import validateCreatePost from './app/validators/PostValidator';
import validateAuth from './app/validators/AuthValidator';
import validateMessage from './app/validators/MensagemValidator';

import authMiddleware from './app/middlewares/auth';

import multer from 'multer';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

//routas públicas
routes.post('/login', validateAuth, AuthController.store)
routes.post('/pets', validateCreatePet, PetController.store);


routes.use(authMiddleware);
routes.get('/pets', PetController.index);
routes.get('/pets/:id', PetController.getById);
routes.put('/pets', validateUpdatePet, PetController.update);
routes.get('/amizades', AmizadeController.index);
routes.delete('/amizades/:id', AmizadeController.remove);
routes.get('/solicitacoes', SolicitacaoAmizadeController.index);
routes.post('/solicitacoes', SolicitacaoAmizadeController.store);
routes.put('/solicitacoes/:id', SolicitacaoAmizadeController.update);
routes.delete('/solicitacoes/:id', SolicitacaoAmizadeController.remove);
routes.get('/posts', TimelineController.index);
routes.post('/posts', validateCreatePost, TimelineController.store);
routes.delete('/posts/:id', TimelineController.remove);
routes.post('/posts/:idPost/comentarios', ComentarioController.store);
routes.delete('/posts/:idPost/comentarios/:id', authMiddleware, ComentarioController.remove);
routes.post('/posts/:idPost/likes', LikeController.store);
routes.delete('/posts/:idPost/likes/:id', LikeController.remove);
routes.get('/conversas', ConversaController.index);
routes.delete('/conversas/:id', ConversaController.remove);
routes.get('/conversas/:id/mensagens', MensagemController.index);
routes.post('/mensagens', validateMessage,  MensagemController.store);
routes.post('/avatars', upload.single('file') , AvatarController.store)


export default routes;
