import Comentario from '../models/Comentario';
import Pet from '../models/Pet';
import Post from '../models/Post';

class ComentarioRepository {
    async save(comentario){
        return await Comentario.create(comentario);
    }

    async getByIdAndPost(id, idPost){
        const comentario = await Comentario.findOne({
            where: {
                id: id,
                post_id: idPost
            },
            include: [
                {
                    model: Post,
                    as: 'post',
                    attributes: ['id'],
                    include: [
                        {
                            model: Pet,
                            as: 'pet',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        return comentario;
    }
}

export default new ComentarioRepository();