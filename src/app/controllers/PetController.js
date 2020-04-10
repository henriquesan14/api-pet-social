import PetRepository from '../repositories/PetRepository';

class PetController {
    async index(req, res){
        const nome = req.query.nome || "";
        const pets = await PetRepository.getPets(req.userId, req.query.size, req.query.page, nome);
        return res.json(pets);
    }

    async getById(req, res){
        const pet = await PetRepository.getPetBydIdInclude(req.params.id, req.userId);
        if(!pet){
            return res.status(404).json({error: `Pet de id ${req.params.id} não encontrado`});
        }
        return res.json(pet);
    }


    async store(req, res){
        const petExists = await PetRepository.getPetByEmail(req.body.email);
        if(petExists){
            return res.status(400).json({error: 'Já existe um pet com este e-mail'});
        }
        const {id, firstName, email, raca, tipo} = await PetRepository.savePet(req.body);
        return res.status(201).json({
            id,
            firstName,
            email,
            raca,
            tipo
        });
    }

    async update(req, res){
        const { email, oldPassword } = req.body;
        const pet = await PetRepository.getPetBydId(req.userId);
        if(email && email != pet.email){
            const petExists = await PetRepository.getPetByEmail(email);
            if(petExists){
                return res.status(400).json({error: 'Já existe um pet com este e-mail'});
            }
        }

        if(oldPassword && !(await pet.checkPassword(oldPassword))){
            return res.status(401).json({error: 'A senha não confere com sua senha atual'})
        }
        await pet.update(req.body);
        const petUpdated = await PetRepository.getPetByEmail(email);
        return res.json(petUpdated);
    }
}

export default new PetController();
