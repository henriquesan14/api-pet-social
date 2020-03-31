import AmizadeRepository from '../repositories/AmizadeRepository';

class AmizadeController {
    async index(req, res){
        const amizades = await AmizadeRepository.getAmizades(req.userId);
        return res.json(amizades);
    }

    async remove(req, res){
        const amizade = await AmizadeRepository.findAmizadeById(req.params.id);
        if(!amizade){
            return res.status(404).json({error: `Amizade de id ${req.params.id} não encontrada`});
        }
        if(req.userId != amizade.pet_id && req.userId != amizade.pet2_id){
            return res.status(400).json({error: 'Você não pode desfazer amizade que não pertencem a você'});
        }
        await amizade.destroy();
        return res.status(204).json();
    }

}

export default new AmizadeController();
