import Sequelize, { Model } from 'sequelize';

class Like extends Model {
    static init(sequelize){
        super.init({

        },
        {
            sequelize
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Pet, {foreignKey: 'pet_id', as: 'pet'});
        this.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post'});
    }
}

export default Like;
