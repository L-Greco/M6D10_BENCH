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
        },
        rate: {
            type: DataTypes.INTEGER, // .TEXT can gather more chars than STRING
            allowNull: false,
            validate: {
                rangesOfValues(value) {
                    if (value > 5 || value < 1) {
                        throw new Error('A rate must be a number between 1 and 5 !');
                    }
                }
            }
        }


    })
    return Comment
}



