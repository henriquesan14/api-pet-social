'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'conversas',
        'pet1_id',
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
    return queryInterface.removeColumn('conversas', 'pet1_id');
  }
};
