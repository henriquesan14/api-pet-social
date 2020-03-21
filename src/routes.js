import { Router } from 'express';

import PetController from './app/controllers/PetController';

const routes = new Router();

routes.post('/pets', PetController.store);

export default routes;
