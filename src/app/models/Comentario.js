import Sequelize, { Model } from 'sequelize';

class Comentario extends Model {
    static init(sequelize){
        super.init({
            mensagem: Sequelize.STRING
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

export default Comentario;
