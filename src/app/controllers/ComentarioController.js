import Comentario from '../models/Comentario';
import * as Yup from 'yup';
import Post from '../models/Post';
import Pet from '../models/Pet';

class ComentarioController {
    async store(req, res){
        const schema = Yup.object().shape({
            mensagem: Yup.string().required()
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }
        const post = await Post.findByPk(req.params.idPost);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.idPost} não encontrado`});
        }
        const {pet_id, post_id, mensagem, created_at} = await Comentario.create({
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
        const comentario = await Comentario.findOne({
            where: {
                id: req.params.id,
                post_id: req.params.idPost
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
