import Post from '../models/Post';
import Pet from '../models/Pet';
import Comentario from '../models/Comentario';
import Like from '../models/Like';

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
}

export default new TimelineController();
