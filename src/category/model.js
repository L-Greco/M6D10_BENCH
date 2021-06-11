export default (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }




    },
        { timestamps: false } // we say here not create "updatedAt" and "createdAt"
    )
    return Category
}