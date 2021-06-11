export default (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT, // .TEXT can gather more chars than STRING
            allowNull: false
        }


    })
    return Comment
}



