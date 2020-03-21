import Sequelize, { Model } from 'sequelize';

class Mensagen extends Model {
    static init(sequelize){
        super.init({
            lida: Sequelize.BOOLEAN,
            message: Sequelize.STRING
        },
        {
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Pet, {foreignKey: 'pet_id', as: 'pet'});
        this.belongsTo(models.Conversa, {foreignKey: 'conversa_id', as: 'conversa'});
    }
}

export default Mensagen;
