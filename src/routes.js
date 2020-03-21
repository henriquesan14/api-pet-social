import { Router } from 'express';
import Pet from './app/models/Pet';
import Amizade from './app/models/Amizade';
import Post from './app/models/Post';
import Comentario from './app/models/Comentario';
import Like from './app/models/Like';
import Conversa from './app/models/Conversa';
import Mensagen from './app/models/Mensagen';

const routes = new Router();

routes.get('/', async (req, res) => {
        //  await Pet.create({
        //     firstName: 'Garfield',
        //     email: 'garfield@gmail.com',
        //     password_hash: '123456'
        // });
        // await Pet.create({
        //     firstName: 'Betoven',
        //     email: 'betoven@gmail.com',
        //     password_hash: '123456'
        // });
        // await Amizade.create({
        //     aceite: false,
        //     pet_id: 1,
        //     pet2_id: 2
        // })
        // const amz = await Post.create({
        //     legenda: 'Boa tarde',
        //     urlImagem: 'wwww.google.com.br',
        //     pet_id: 1,
        // })

        // const c = await Comentario.create({
        //     mensagem: 'Bora cumpadi',
        //     pet_id: 2,
        //     post_id: 1
        // })

        // const l = await Like.create({
        //     pet_id: 2,
        //     post_id: 1
        // })

        // const con = await Conversa.create({
        //     pet1_id: 1,
        //     pet2_id: 2
        // })

        const msg = await Mensagen.create({
            message: 'Olá',
            conversa_id: 1,
            pet_id: 1
        })
    return res.json(msg);
});

export default routes;
