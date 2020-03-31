import Sequelize, { Model } from 'sequelize';

class Amizade extends Model {
    static init(sequelize){
        super.init({
            aceite: Sequelize.BOOLEAN,
            amizade: Sequelize.VIRTUAL
        },
        {
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Pet, {foreignKey: 'pet_id', as: 'pet'});
        this.belongsTo(models.Pet, {foreignKey: 'pet2_id', as: 'pet2'});
    }

}

export default Amizade;
