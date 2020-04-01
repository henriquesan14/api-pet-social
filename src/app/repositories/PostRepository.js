import Post from '../models/Post';
import Pet from '../models/Pet';
import Comentario from '../models/Comentario'
import Like from '../models/Like';

class PostRepository {
    async getPostsInclude(size, page, listIdsAmizades){
        const posts = await Post.findAndCountAll({
            distinct: true,
            limit: size || 20,
            offset: page || 0,
            where: {
                pet_id : Array.from(listIdsAmizades)
            },
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
                            attributes: ['id', 'firstName','lastName']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']],
            attributes: ['id', 'legenda', 'urlImagem', 'created_at']
        });
        return posts;
    }

    async getById(id){
        const post = await Post.findByPk(id);
        return post;
    }

    async save(post){
        return await Post.create(post);
    }
}

export default new PostRepository();