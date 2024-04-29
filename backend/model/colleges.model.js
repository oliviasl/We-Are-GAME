module.exports = (sequelize, DataTypes, Model) => {

    class Colleges extends Model { }

    Colleges.init({
        // Model attributes are defined here
        college_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        college_name: {
            type: DataTypes.STRING
        },
        location_city: {
            type: DataTypes.STRING
        },
        location_state: {
            type: DataTypes.STRING
        },
        general_web_addr: {
            type: DataTypes.STRING
        },
        admissions_web_addr: {
            type: DataTypes.STRING
        },
        fin_aid_web_addr: {
            type: DataTypes.STRING
        },
        min_gpa: {
            type: DataTypes.FLOAT
        },
        max_gpa: {
            type: DataTypes.FLOAT
        },
        min_sat: {
            type: DataTypes.INTEGER
        },
        max_sat: {
            type: DataTypes.INTEGER
        },
        min_sat_read_write: {
            type: DataTypes.INTEGER
        },
        max_sat_read_write: {
            type: DataTypes.INTEGER
        },
        min_sat_math: {
            type: DataTypes.INTEGER
        },
        max_sat_math: {
            type: DataTypes.INTEGER
        },
        min_act: {
            type: DataTypes.INTEGER
        },
        max_act: {
            type: DataTypes.INTEGER
        },
        min_act_english: {
            type: DataTypes.INTEGER
        },
        max_act_english: {
            type: DataTypes.INTEGER
        },
        min_act_math: {
            type: DataTypes.INTEGER
        },
        max_act_math: {
            type: DataTypes.INTEGER
        },
        min_act_reading: {
            type: DataTypes.INTEGER
        },
        max_act_reading: {
            type: DataTypes.INTEGER
        },
        min_act_science: {
            type: DataTypes.INTEGER
        },
        max_act_science: {
            type: DataTypes.INTEGER
        },
        majors_web_addr: {
            type: DataTypes.STRING
        },
        athletics_web_addr: {
            type: DataTypes.STRING
        },
        sport_conference: {
            type: DataTypes.STRING
        },
        grad_rate_athletes: {
            type: DataTypes.FLOAT
        },
        questionaire_web_addr: {
            type: DataTypes.STRING
        },
        faculty_student_ratio: {
            type: DataTypes.INTEGER
        },
        acceptance_rate: {
            type: DataTypes.FLOAT
        },
        race_ethnicity_stats_web_addr: {
            type: DataTypes.STRING
        },
        race_white: {
            type: DataTypes.FLOAT
        },
        race_black: {
            type: DataTypes.FLOAT
        },
        race_hispanic: {
            type: DataTypes.FLOAT
        },
        race_asian: {
            type: DataTypes.FLOAT
        },
        race_pacific_islander: {
            type: DataTypes.FLOAT
        },
        race_native_american: {
            type: DataTypes.FLOAT
        },
        race_two_or_more: {
            type: DataTypes.FLOAT
        },
        race_international: {
            type: DataTypes.FLOAT
        },
        race_other: {
            type: DataTypes.FLOAT
        },
        gender_stats_web_addr: {
            type: DataTypes.STRING
        },
        gender_male: {
            type: DataTypes.FLOAT
        },
        gender_female: {
            type: DataTypes.FLOAT
        },
        first_year_retention_rate: {
            type: DataTypes.FLOAT
        },
        first_year_transfer_rate: {
            type: DataTypes.FLOAT
        },
        first_year_grad_rate: {
            type: DataTypes.STRING
        },
        net_price_calc_web_addr: {
            type: DataTypes.STRING
        },
        cost_tuition_in_state: {
            type: DataTypes.FLOAT
        },
        cost_tuition_out_of_state: {
            type: DataTypes.FLOAT
        },
        avg_total_cost_est: {
            type: DataTypes.FLOAT
        },
        fin_aid_athlete_web_addr: {
            type: DataTypes.STRING
        },
        stu_ath_academic_res_web_addr: {
            type: DataTypes.STRING
        },
        academic_resources_web_addr: {
            type: DataTypes.STRING
        },
        diversity_resources_web_addr: {
            type: DataTypes.STRING
        },
        student_orgs_web_addr: {
            type: DataTypes.STRING
        },
        study_abroad_web_addr: {
            type: DataTypes.STRING
        },
        app_web_addr: {
            type: DataTypes.STRING
        },
        app_regular_deadline: {
            type: DataTypes.DATE
        },
        app_essay_deadline: {
            type: DataTypes.DATE
        },
        app_letters_of_rec_deadline: {
            type: DataTypes.DATE
        },
        app_preferential_deadline: {
            type: DataTypes.DATE
        },
        app_fin_aid_deadline: {
            type: DataTypes.DATE
        },
        extra_notes: {
            type: DataTypes.STRING
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'colleges' // We need to choose the model name
    });

    return Colleges;
}