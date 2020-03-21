import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Pet extends Model {
    static init(sequelize) {
        super.init({
            firstName: Sequelize.STRING,
            lastName: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            email: Sequelize.STRING,
            avatar: Sequelize.STRING,
            tipo: Sequelize.STRING,
            raca: Sequelize.STRING,
            dataNascimento: Sequelize.DATEONLY,
            cidade: Sequelize.STRING,
            estado: Sequelize.STRING,
            telefone: Sequelize.STRING,
            perfil: Sequelize.STRING,
            ativo: Sequelize.BOOLEAN
        },
        {
            sequelize
        });

        this.addHook('beforeSave', async (pet) => {
            if(pet.password){
                pet.password_hash = await bcrypt.hash(pet.password, 8);
            }
        });

        return this;
    }

    static associate(models){
        this.hasMany(models.Post, {foreignKey: 'id', as: 'posts'});
    }

    checkPassword(password){
        return bcrypt.compare(password,this.password_hash);
    }
}

export default Pet;
