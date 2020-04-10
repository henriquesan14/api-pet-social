import Post from '../models/Post';
import Pet from '../models/Pet';
import Comentario from '../models/Comentario'
import Like from '../models/Like';
import File from '../models/File';

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
                    model: File,
                    as: 'image',
                    attributes: ['id', 'path']
                },
                {
                    model: Pet,
                    as: 'pet',
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path']
                        }
                    ],
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Comentario,
                    as: 'comentarios',
                    attributes: ['id', 'mensagem', 'created_at'],
                    include: [
                        {
                            model: Pet,
                            as: 'pet',
                            include: [
                                {
                                    model: File,
                                    as: 'avatar',
                                    attributes: ['id', 'path']
                                }
                            ],
                            attributes: ['id', 'firstName', 'lastName']
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
                            include: [
                                {
                                    model: File,
                                    as: 'avatar',
                                    attributes: ['id', 'path']
                                }
                            ],
                            attributes: ['id', 'firstName','lastName']
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']],
            attributes: ['id', 'legenda', 'created_at']
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