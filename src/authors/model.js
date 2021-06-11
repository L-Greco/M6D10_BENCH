export default (sequelize, DataTypes) => {
    const Author = sequelize.define("author", { //it takes the "author" name
        id: { // and it creates the table by tranforming it to plural -> "authors" here 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // gives the id the pervious id+1
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }


    })
    return Author
}
