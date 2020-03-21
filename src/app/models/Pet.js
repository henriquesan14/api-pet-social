import Sequelize, { Model } from 'sequelize';

class Pet extends Model {
    static init(sequelize) {
        super.init({
            firstName: Sequelize.STRING,
            lastName: Sequelize.STRING,
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
    }
}

export default Pet;
