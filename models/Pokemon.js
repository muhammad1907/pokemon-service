module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type : DataTypes.INTEGER,
        allowNull : false
      },
      
      pokemon_id: {
        type : DataTypes.INTEGER,
        allowNull : false
      },

      pokemon_name: {
        type : DataTypes.STRING,
        allowNull : false
      },

      changes: {
        type : DataTypes.INTEGER,
        allowNull : false
      },
     
    }, {
      tableName: 'pokemons',
      timestamps: false
    });
  
    return Pokemon;
  }