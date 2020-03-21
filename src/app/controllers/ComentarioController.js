import Comentario from '../models/Comentario';
import * as Yup from 'yup';
import Post from '../models/Post';
import Pet from '../models/Pet';

class ComentarioController {
    async store(req, res){
        const schema = Yup.object().shape({
            mensagem: Yup.string().required(),
            post_id: Yup.number().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Alguns campos são obrigatórios'});
        }
        const {pet_id, post_id, mensagem, created_at} = await Comentario.create({
            pet_id: req.userId,
            post_id: req.body.post_id,
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
        const comentario = await Comentario.findByPk(req.params.id, {
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
            return res.status(404).json({error: `Comentario de id ${req.params.id} não encontrado`});
        }
        if(comentario.pet_id != req.userId && comentario.post.pet.id != req.userId){
            return res.status(400).json({error: 'Comentário só pode ser removido pelo dono do comentário ou do post'});
        }
        await comentario.destroy();
        return res.status(204).json();
    }
}
export default new ComentarioController();
