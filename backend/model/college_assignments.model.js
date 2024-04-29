module.exports = (sequelize, DataTypes, Model) => {

    class CollegeAssignments extends Model {}

    CollegeAssignments.init({
        // Model attributes are defined here
        assignment_id: {
            type: DataTypes.INTEGER
        },
        college_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'college_assignments' // We need to choose the model name
      });
      
      return CollegeAssignments;
}