export default (sequelize, DataTypes) => {
    const Product = sequelize.define("products", { //it takes the "author" name
        id: { // and it creates the table by tranforming it to plural -> "authors" here 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // gives the id the pervious id+1
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,//text -> for a big text 
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {
                    msg: "give a proper url for the image please"
                }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                isNegative(value) {
                    if (value <= 0) {
                        throw new Error('A price cant be a negative number!');
                    }
                }
            }
        },




    })
    return Product
}

