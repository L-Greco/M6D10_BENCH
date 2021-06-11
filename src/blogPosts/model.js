

export default (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false
        },
        read_time_value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        read_time_unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }


    })
    return Blog
}