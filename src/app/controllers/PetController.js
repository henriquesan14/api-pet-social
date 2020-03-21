import Pet from '../models/Pet';

class PetController {
    async store(req, res){
        const petExists = await Pet.findOne({
            where: {
                email: req.body.email
            }
        });
        if(petExists){
            return res.status(400).json({error: 'Já existe um pet com este e-mail'});
        }
        const {id, firstName, email, raca, tipo} = await Pet.create(req.body);
        return res.json({
            id,
            firstName,
            email,
            raca,
            tipo
        });
    }
}

export default new PetController();
