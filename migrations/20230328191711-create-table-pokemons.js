'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pokemons', { 
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
     
      user_id: {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      
      pokemon_id: {
        type : Sequelize.INTEGER,
        allowNull : false
      },

      pokemon_name: {
        type : Sequelize.STRING,
        allowNull : false
      },

      changes: {
        type : Sequelize.INTEGER,
        allowNull : false
      }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pokemons');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
