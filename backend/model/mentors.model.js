module.exports = (sequelize, DataTypes, Model) => {

    class Mentors extends Model { }

    Mentors.init({
        // Model attributes are defined here
        mentor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mentor_firstname: {
            type: DataTypes.STRING
        },
        mentor_lastname: {
            type: DataTypes.STRING
        },
        mentor_email: {
            type: DataTypes.STRING
        },
        mentor_phone: {
            type: DataTypes.STRING
        },
        mentor_colleges: {
            type: DataTypes.STRING
        },
        mentor_major1: {
            type: DataTypes.STRING
        },
        mentor_degree1: {
            type: DataTypes.STRING
        },
        mentor_degree2: {
            type: DataTypes.STRING
        },
        mentor_major3: {
            type: DataTypes.STRING
        },
        mentor_degree3: {
            type: DataTypes.STRING
        },
        mentor_curr_employment: {
            type: DataTypes.STRING
        },
        mentor_highest_sports_level: {
            type: DataTypes.STRING
        },
        mentor_interests: {
            type: DataTypes.STRING
        },
        mentor_extracurriculars: {
            type: DataTypes.STRING
        },
        mentor_sport1: {
            type: DataTypes.STRING
        },
        mentor_sport1_role: {
            type: DataTypes.INTEGER
        },
        mentor_sport2: {
            type: DataTypes.INTEGER
        },
        mentor_sport2_role: {
            type: DataTypes.INTEGER
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'mentors' // We need to choose the model name
    });

    return Mentors;
}