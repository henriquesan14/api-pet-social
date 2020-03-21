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

    async update(req, res){
        const { email, oldPassword } = req.body;

        const pet = await Pet.findByPk(req.userId);
        if(email != pet.email){
            const petExists = await Pet.findOne({
                where: {
                    email: email
                }
            });
            if(petExists){
                return res.status(400).json({error: 'Já existe um pet com este e-mail'});
            }
        }

        if(oldPassword && !(await pet.checkPassword(oldPassword))){
            return res.status(401).json({error: 'A senha não confere com sua senha atual'})
        }
        const {id, firstName, raca, tipo} = await pet.update(req.body);

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
