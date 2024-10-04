
module.exports  =(sequelize,Sequelize)=>{
  return sequelize.define("user_posts",{
    uuid:{
      type:Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4
    },
    user_id:{
      type:Sequelize.INTEGER
    },
    url:{
      type:Sequelize.STRING
    },
    description:{
      type:Sequelize.STRING
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