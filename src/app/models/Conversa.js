import Sequelize, { Model } from 'sequelize';

class Conversa extends Model {
    static init(sequelize){
        super.init({
            lastMessage: Sequelize.STRING
        },
        {
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.Pet, {foreignKey: 'pet1_id', as: 'pet1'});
        this.belongsTo(models.Pet, {foreignKey: 'pet2_id', as: 'pet2'});
        this.hasMany(models.Mensagen, {foreignKey: 'conversa_id', as: 'mensagens', onDelete: 'CASCADE'})
    }
}

export default Conversa;
