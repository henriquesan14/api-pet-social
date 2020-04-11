import AmizadeRepository from '../repositories/AmizadeRepository';
import PostRepository from '../repositories/PostRepository';

class TimelineController {
    async index(req, res){
        const amizades = await AmizadeRepository.getAmizadesByPet(req.userId);
        let listSetAmizades = new Set;
        amizades.forEach(a => {
            listSetAmizades.add(a.pet2_id);
            listSetAmizades.add(a.pet_id);
        });
        listSetAmizades.add(req.userId);
        const posts = await PostRepository.getPostsInclude(req.query.size, req.query.page, listSetAmizades);
        return res.json(posts);
    }

    async store(req, res){
        const {id, legenda, image_id, pet_id, created_at } = await PostRepository.save({
            pet_id: req.userId,
            legenda: req.body.legenda,
            image_id: req.body.image_id
        });

        return res.status(201).json({
            id,
            legenda,
            image_id,
            pet_id,
            created_at
        });
    }

    async remove(req, res){
        const post = await PostRepository.getById(req.params.id);
        if(!post){
            return res.status(404).json({error: `Post de id ${req.params.id} não encontrado`});
        }
        if(req.userId != post.pet_id){
            return res.status(400).json({error: 'Post só pode ser removido pelo dono'});
        }
        await post.destroy();
        return res.status(204).json();
    }

    async getPostsByPet(req, res){
        const posts = await PostRepository.getPostsByPet(req.query.size, req.query.page,req.params.id);
        return res.status(200).json(posts);
    }
}

export default new TimelineController();
