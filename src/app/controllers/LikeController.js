import Like from '../models/Like';
import * as Yup from 'yup';

class LikeController {
    async store(req, res){
        const schema = Yup.object().shape({
            post_id: Yup.number().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'O id do Post é obrigatório'});
        }
        const {pet_id, post_id} = await Like.create({
            pet_id: req.userId,
            post_id: req.body.post_id,
        });

        return res.status(201).json({
            pet_id,
            post_id
        });
    }

    async remove(req, res){
        const like = await Like.findByPk(req.params.id);
        if(!like){
            return res.status(404).json({error: `Like de id ${req.params.id} não encontrado`});
        }
        if(like.pet_id != req.userId){
            return res.status(400).json({error: 'Like só pode ser removido pelo dono'});
        }
        await like.destroy();
        return res.status(204).json();
    }
}
export default new LikeController();
