'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.DataTypes.UUID,
        unique:true,
        allowNull:false
      },
      user_id:{
        type:Sequelize.DataTypes.INTEGER
      },
      url:{
        type:Sequelize.DataTypes.STRING
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      created_at: {
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE
      },
      deleted_at:{
        type:Sequelize.DataTypes.DATE
      },
      created_by:{
        type:Sequelize.DataTypes.INTEGER
      },
      updated_by:{
        type:Sequelize.DataTypes.INTEGER
      },
      deleted_by:{
        type:Sequelize.DataTypes.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_Posts');
  }
};