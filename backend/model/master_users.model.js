module.exports = (sequelize, DataTypes, Model) => {

    class MasterUsers extends Model { }

    MasterUsers.init({
        // Model attributes are defined here
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING
        },
        user_password: {
            type: DataTypes.STRING
        },
        user_firstname: {
            type: DataTypes.STRING
        },
        user_lastname: {
            type: DataTypes.STRING
        },
        user_instagram: {
            type: DataTypes.STRING
        },
        user_facebook: {
            type: DataTypes.STRING
        },
        user_show_socials: {
            type: DataTypes.BOOLEAN
        },
        user_phone: {
            type: DataTypes.STRING
        },
        user_school: {
            type: DataTypes.STRING
        },
        user_grad_year: {
            type: DataTypes.INTEGER
        },
        user_ncaa_registered: {
            type: DataTypes.BOOLEAN
        },
        user_reg_number: {
            type: DataTypes.INTEGER
        },
        user_goal: {
            type: DataTypes.STRING
        },
        user_purpose: {
            type: DataTypes.STRING
        },
        user_gpa: {
            type: DataTypes.FLOAT
        },
        user_sat: {
            type: DataTypes.INTEGER
        },
        user_sat_read_write: {
            type: DataTypes.INTEGER
        },
        user_sat_math: {
            type: DataTypes.INTEGER
        },
        user_act: {
            type: DataTypes.INTEGER
        },
        user_act_english: {
            type: DataTypes.INTEGER
        },
        user_act_math: {
            type: DataTypes.INTEGER
        },
        user_act_reading: {
            type: DataTypes.INTEGER
        },
        user_act_science: {
            type: DataTypes.INTEGER
        },
        user_potential_major: {
            type: DataTypes.STRING
        },
        user_alt_major1: {
            type: DataTypes.STRING
        },
        user_alt_major2: {
            type: DataTypes.STRING
        },
        user_interests: {
            type: DataTypes.STRING
        },
        user_extracurriculars: {
            type: DataTypes.STRING
        },
        user_sport1: {
            type: DataTypes.STRING
        },
        user_sport1_role: {
            type: DataTypes.STRING
        },
        user_sport1_level: {
            type: DataTypes.STRING
        },
        user_sport2: {
            type: DataTypes.STRING
        },
        user_sport2_role: {
            type: DataTypes.STRING
        },
        user_sport2_level: {
            type: DataTypes.STRING
        },
        user_notes: {
            type: DataTypes.STRING
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'master_users' // We need to choose the model name
    });

    return MasterUsers;
}