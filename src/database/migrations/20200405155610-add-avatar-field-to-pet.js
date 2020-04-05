'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'pets',
        'avatar_id',
        {
            type: Sequelize.INTEGER,
            references: {model: 'avatars', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('pets', 'avatar_id');
  }
};
