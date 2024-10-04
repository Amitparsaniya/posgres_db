'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false,
        unique:true
      },
      user_id:{
        type:Sequelize.DataTypes.INTEGER
      },
      card_number: {
        type: Sequelize.STRING
      },
      expire: {
        type: Sequelize.DataTypes.DATE
      },
      cvv:{
        type: Sequelize.DataTypes.INTEGER
      },
      created_at:{
        type:Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at:{
        type:Sequelize.DATE
      },
      created_by:{
        type:Sequelize.INTEGER
      },
      updated_by:{
        type:Sequelize.INTEGER
      },
      deleted_by:{
        type:Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_cards');
  }
};