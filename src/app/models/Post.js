import Sequelize, { Model } from 'sequelize';

class Post extends Model {
    static init(sequelize){
        super.init({
            legenda: Sequelize.STRING,
            urlImagem: Sequelize.STRING
        },
        {
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Pet, {foreignKey: 'pet_id', as: 'pet'});
    }
}

export default Post;
