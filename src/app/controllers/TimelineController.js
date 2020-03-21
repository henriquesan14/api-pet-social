import Post from '../models/Post';
import Pet from '../models/Pet';
import Comentario from '../models/Comentario';
import Like from '../models/Like';
import * as Yup from 'yup';

class TimelineController {
    async index(req, res){
        const posts = await Post.findAll({
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                },
                {
                    model: Comentario,
                    as: 'comentarios',
                    attributes: ['id', 'mensagem', 'created_at'],
                    include: [
                        {
                            model: Pet,
                            as: 'pet',
                            attributes: ['id', 'firstName', 'lastName', 'avatar']
                        }
                    ]
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id'],
                    include: [
                        {
                            model: Pet,
                            as: 'pet',
                            attributes: ['id', 'firstName','lastName',]
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']],
            attributes: ['id', 'legenda', 'urlImagem', 'created_at']
        });

        return res.json(posts);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            legenda: Yup.string().required(),
            urlImagem: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }

        const {id, legenda, urlImagem, pet_id, created_at } = await Post.create({
            pet_id: req.userId,
            legenda: req.body.legenda,
            urlImagem: req.body.urlImagem
        });

        return res.json({
            id,
            legenda,
            urlImagem,
            pet_id,
            created_at
        });
    }
}

export default new TimelineController();
