const { Model, DataTypes } = require('sequelize')
class Patient extends Model {

}
Patient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

})

