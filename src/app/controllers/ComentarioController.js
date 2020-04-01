import PostRepository from '../repositories/PostRepository';
import ComentarioRepository from '../repositories/ComentarioRepository';

class ComentarioController {
    async store(req, res){
        if(!req.body.mensagem){
            return res.status(400).json({error: 'O campo mensagem é obrigatório'});
        }
        const post = await PostRepository.getById(req.params.idPost);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.idPost} não encontrado`});
        }
        const {pet_id, post_id, mensagem, created_at} = await ComentarioRepository.save({
            pet_id: req.userId,
            post_id: post.id,
            mensagem: req.body.mensagem
        });

        return res.status(201).json({
            pet_id,
            post_id,
            mensagem,
            created_at
        });
    }

    async remove(req, res){
        const comentario = await ComentarioRepository.getByIdAndPost(req.params.id, req.params.idPost);
        if(!comentario){
            return res.status(404).json({error: `Comentario de id ${req.params.id} no Post de id ${req.params.idPost} não encontrado`});
        }
        if(comentario.pet_id != req.userId && comentario.post.pet.id != req.userId){
            return res.status(400).json({error: 'Comentário só pode ser removido pelo dono do comentário ou do post'});
        }
        await comentario.destroy();
        return res.status(204).json();
    }
}
export default new ComentarioController();
