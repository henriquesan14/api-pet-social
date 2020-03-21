'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'mensagens',
        'pet_id',
        {
            type: Sequelize.INTEGER,
            references: {model: 'pets', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mensagens', 'pet_id');
  }
};
