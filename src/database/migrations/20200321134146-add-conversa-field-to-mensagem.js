'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'mensagens',
        'conversa_id',
        {
            type: Sequelize.INTEGER,
            references: {model: 'conversas', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mensagens', 'conversa_id');
  }
};
