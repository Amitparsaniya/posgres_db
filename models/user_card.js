const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
  return sequelize.define("user_cards",{
    uuid:{
      type:Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4
    },
    user_id:{
      type:Sequelize.INTEGER
    },
    card_number:{
      type:Sequelize.STRING
    },
    expire:{
      type:Sequelize.DATE
    },
    cvv:{
      type:Sequelize.INTEGER
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
  },{
    timestamps:true,
    createdAt:"created_at",
    updatedAt:"updated_at"
  })
}