import { Router } from 'express';
import Pet from './app/models/Pet';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await Pet.create({
        firstName: 'Garfield',
        email: 'garfield@gmail.com',
        password_hash: '123456'
    });
    return res.json(user);
});

export default routes;
