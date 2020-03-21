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
        this.hasMany(models.Comentario, {foreignKey: 'id', as: 'comentarios'});
        this.hasMany(models.Like, {foreignKey: 'id', as: 'likes'});
    }
}

export default Post;
