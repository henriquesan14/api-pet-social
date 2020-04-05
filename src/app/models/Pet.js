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
            sexo: Sequelize.STRING(1),
            tipo: Sequelize.STRING,
            raca: Sequelize.STRING,
            dataNascimento: Sequelize.DATEONLY,
            cidade: Sequelize.STRING,
            estado: Sequelize.STRING,
            telefone: Sequelize.STRING,
            perfil: Sequelize.STRING,
            ativo: Sequelize.BOOLEAN,
            isFriend: {
                type: Sequelize.VIRTUAL,
                defaultValue: false
            },
            isSolicited: {
                type: Sequelize.VIRTUAL,
                defaultValue: false
            },
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
        this.hasMany(models.Post, {foreignKey: 'pet_id', as: 'posts'});
        this.belongsTo(models.Avatar, {foreignKey: 'avatar_id', as: 'avatar'});
    }

    checkPassword(password){
        return bcrypt.compare(password,this.password_hash);
    }
}

export default Pet;
