import Like from '../models/Like';
import Post from '../models/Post';

class LikeController {
    async store(req, res){
        const post = await Post.findByPk(req.params.idPost);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.idPost} não encontrado`});
        }
        const like = await Like.findOne({
            where: {
                pet_id: req.userId,
                post_id: post.id
            }
        });
        if(like){
            return res.status(400).json({error: 'Esse post já possui um like deste usuário'});
        }
        const {pet_id, post_id} = await Like.create({
            pet_id: req.userId,
            post_id: post.id,
        });

        return res.status(201).json({
            pet_id,
            post_id
        });
    }

    async remove(req, res){
        const like = await Like.findOne({
            where: {
                id: req.params.id,
                post_id: req.params.idPost
            }
        });
        if(!like){
            return res.status(404).json({error: `Like de id ${req.params.id} no Post de id ${req.params.idPost} não encontrado`});
        }
        if(like.pet_id != req.userId){
            return res.status(400).json({error: 'Like só pode ser removido pelo dono'});
        }
        await like.destroy();
        return res.status(204).json();
    }
}
export default new LikeController();
