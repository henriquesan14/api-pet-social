import Like from '../models/Like';

class LikeRepository {
    async getByUserAndPost(idUser, idPost){
        const like = await Like.findOne({
            where: {
                pet_id: idUser,
                post_id: idPost
            }
        });
        return like;
    }

    async save(comentario){
        return await Like.create(comentario);
    }

    async getByIdAndPost(id, idPost){
        const like = await Like.findOne({
            where: {
                id: id,
                post_id: idPost
            }
        });
        return like;
    }
}

export default new LikeRepository();