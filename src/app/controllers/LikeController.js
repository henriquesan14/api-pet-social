import PostRepository from '../repositories/PostRepository';
import LikeRepository from '../repositories/LikeRepository';

class LikeController {
    async store(req, res){
        const post = await PostRepository.getById(req.params.idPost);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.idPost} não encontrado`});
        }
        const like = await LikeRepository.getByUserAndPost(req.userId, post.id);
        if(like){
            return res.status(400).json({error: 'Esse post já possui um like deste usuário'});
        }
        const {pet_id, post_id} = await LikeRepository.save({
            pet_id: req.userId,
            post_id: post.id,
        });

        return res.status(201).json({
            pet_id,
            post_id
        });
    }

    async remove(req, res){
        const like = await LikeRepository.getByIdAndPost(req.params.id, req.params.idPost);
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
