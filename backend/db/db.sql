DROP TABLE IF EXISTS college_assignments;
DROP TABLE IF EXISTS colleges;
DROP TABLE IF EXISTS user_status;
DROP TABLE IF EXISTS master_users;
DROP TABLE IF EXISTS mentors;

CREATE TABLE IF NOT EXISTS colleges
(
    college_id SERIAL PRIMARY KEY,
    college_name VARCHAR,
    location_city VARCHAR,
    location_state VARCHAR,
    general_web_addr VARCHAR,
    admissions_web_addr VARCHAR,
    fin_aid_web_addr VARCHAR,
    min_gpa FLOAT,
    max_gpa FLOAT,
    min_sat INTEGER,
    max_sat INTEGER,
    min_sat_read_write INTEGER,
    max_sat_read_write INTEGER,
    min_sat_math INTEGER,
    max_sat_math INTEGER,
    min_act INTEGER,
    max_act INTEGER,
    min_act_english INTEGER,
    max_act_english INTEGER,
    min_act_math INTEGER,
    max_act_math INTEGER,
    min_act_reading INTEGER,
    max_act_reading INTEGER,
    min_act_science INTEGER,
    max_act_science INTEGER,
    majors_web_addr VARCHAR,
    athletics_web_addr VARCHAR,
    sport_conference VARCHAR,
    grad_rate_athletes FLOAT,
    questionaire_web_addr VARCHAR,
    faculty_student_ratio INTEGER,
    acceptance_rate FLOAT,
    race_ethnicity_stats_web_addr VARCHAR,
    race_white FLOAT,
    race_black FLOAT,
    race_hispanic FLOAT,
    race_asian FLOAT,
    race_pacific_islander FLOAT,
    race_native_american FLOAT,
    race_two_or_more FLOAT,
    race_international FLOAT,
    race_other FLOAT,
    gender_stats_web_addr VARCHAR,
    gender_male FLOAT,
    gender_female FLOAT,
    first_year_retention_rate FLOAT,
    first_year_transfer_rate FLOAT,
    first_year_grad_rate FLOAT,
    net_price_calc_web_addr VARCHAR,
    cost_tuition_in_state FLOAT,
    cost_tuition_out_of_state FLOAT,
    avg_total_cost_est FLOAT,
    fin_aid_athlete_web_addr VARCHAR,
    stu_ath_academic_res_web_addr VARCHAR,
    academic_resources_web_addr VARCHAR,
    diversity_resources_web_addr VARCHAR,
    student_orgs_web_addr VARCHAR,
    study_abroad_web_addr VARCHAR,
    app_web_addr VARCHAR,
    app_regular_deadline DATE,
    app_essay_deadline DATE,
    app_letters_of_rec_deadline DATE,
    app_preferential_deadline DATE,
    app_fin_aid_deadline DATE,
    extra_notes VARCHAR
);

CREATE TABLE IF NOT EXISTS master_users 
(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR,
    user_password VARCHAR,
    user_firstname VARCHAR,
    user_lastname VARCHAR,
    user_instagram VARCHAR,
    user_facebook VARCHAR,
    user_show_socials BOOLEAN,
    user_phone VARCHAR,
    user_school VARCHAR,
    user_grad_year INTEGER,
    user_ncaa_registered BOOLEAN,
    user_reg_number INTEGER,
    user_goal VARCHAR,
    user_purpose VARCHAR,
    user_gpa FLOAT,
    user_sat INTEGER,
    user_sat_read_write INTEGER,
    user_sat_math INTEGER,
    user_act INTEGER,
    user_act_english INTEGER,
    user_act_math INTEGER,
    user_act_reading INTEGER,
    user_act_science INTEGER,
    user_potential_major VARCHAR,
    user_alt_major1 VARCHAR,
    user_alt_major2 VARCHAR,
    user_interests VARCHAR,
    user_extracurriculars VARCHAR,
    user_sport1 VARCHAR,
    user_sport1_role VARCHAR,
    user_sport1_level VARCHAR,
    user_sport2 VARCHAR,
    user_sport2_role VARCHAR,
    user_sport2_level VARCHAR,
    user_notes VARCHAR
);

CREATE TABLE IF NOT EXISTS user_status
(
    user_id INTEGER PRIMARY KEY REFERENCES master_users,
    user_status INTEGER
);

CREATE TABLE IF NOT EXISTS college_assignments
(
    assignment_id SERIAL PRIMARY KEY,
    college_id INTEGER REFERENCES colleges,
    user_id INTEGER REFERENCES master_users
);

CREATE TABLE IF NOT EXISTS mentors
(
    mentor_id SERIAL PRIMARY KEY,
    mentor_firstname VARCHAR,
    mentor_lastname VARCHAR,
    mentor_email VARCHAR,
    mentor_phone VARCHAR,
    mentor_colleges VARCHAR,
    mentor_major1 VARCHAR,
    mentor_degree1 VARCHAR,
    mentor_major2 VARCHAR,
	mentor_degree2 VARCHAR,
    mentor_major3 VARCHAR,
	mentor_degree3 VARCHAR,
    mentor_curr_employment VARCHAR,
    mentor_highest_sports_level VARCHAR,
    mentor_interests VARCHAR,
    mentor_extracurriculars VARCHAR,
    mentor_sport1 VARCHAR,
    mentor_sport1_role VARCHAR,
    mentor_sport2 VARCHAR,
    mentor_sport2_role VARCHAR
);

INSERT INTO colleges (
    college_name,
    location_city,
    location_state,
    general_web_addr,
    admissions_web_addr,
    fin_aid_web_addr,
    min_gpa,
    max_gpa,
    min_sat,
    max_sat,
    min_sat_read_write,
    max_sat_read_write,
    min_sat_math,
    max_sat_math,
    min_act,
    max_act,
    min_act_english,
    max_act_english,
    min_act_math,
    max_act_math,
    min_act_reading,
    max_act_reading,
    min_act_science,
    max_act_science,
    majors_web_addr,
    athletics_web_addr,
    sport_conference,
    grad_rate_athletes,
    questionaire_web_addr,
    faculty_student_ratio,
    acceptance_rate,
    race_ethnicity_stats_web_addr,
    race_white,
    race_black,
    race_hispanic,
    race_asian,
    race_pacific_islander,
    race_native_american,
    race_two_or_more,
    race_international,
    race_other,
    gender_stats_web_addr,
    gender_male,
    gender_female,
    first_year_retention_rate,
    first_year_transfer_rate,
    first_year_grad_rate,
    net_price_calc_web_addr,
    cost_tuition_in_state,
    cost_tuition_out_of_state,
    avg_total_cost_est,
    fin_aid_athlete_web_addr,
    stu_ath_academic_res_web_addr,
    academic_resources_web_addr,
    diversity_resources_web_addr,
    student_orgs_web_addr,
    study_abroad_web_addr,
    app_web_addr,
    app_regular_deadline,
    app_essay_deadline,
    app_letters_of_rec_deadline,
    app_preferential_deadline,
    app_fin_aid_deadline,
    extra_notes
)
VALUES 
    ('Ohio State University', 'Columbus', 'OH', 'www.osu.edu', 'admissions.com', 'finaid.com', 2.0, 4.0, 1100, 1400, 400, 800, 400, 800, 26, 32, 26, 32, 26, 32, 26, 32, 26, 32, 'majors.com', 'athletics.com', 'Big Ten', .7, 'questionaire.com', 4, .1, 'racestats.com', .1, .1, .1, .1, .1, .1, .1, .1, .1, 'genderstats.com', .55, .45, .75, .25, .75, 'netpricecalc.com', 25000, 55000, 75000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'OSU is awesome'),

    ('UC Irvine', 'Irvine', 'CA', 'www.uci.edu', 'admissions.com', 'finaid.com', 2.5, 3.8, 1200, 1600, 400, 800, 400, 800, 27, 34, 27, 34, 27, 34, 27, 34, 27, 34, 'majors.com', 'athletics.com', 'Big West', .8, 'questionaire.com', 4, .15, 'racestats.com', .12, .12, .12, .12, .12, .12, .12, .12, .13, 'genderstats.com', .48, .52, .7, .3, .7, 'netpricecalc.com', 28000, 60000, 85000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'UCI is fantastic'),

    ('University of Southern California', 'Los Angeles', 'CA', 'https://www.usc.edu', 'https://admissions.com', 'https://finaid.com', 2.0, 4.0, 1200, 1500, 400, 800, 400, 800, 28, 35, 28, 35, 28, 35, 28, 35, 28, 35, 'https://majors.com', 'https://athletics.com', 'PAC12', 75, 'https://questionaire.com', 4, 12, 'https://racestats.com', 11, 11, 11, 11, 11, 11, 11, 11, 12, 'https://genderstats.com', 5, 5, 8, 2, 8, 'https://netpricecalc.com', 30000, 60000, 80000, 'https://finaidathlete.com', 'https://stuathacademicres.com', 'https://academicresources.com', 'https://diversityresources.com', 'https://studentorgs.com', 'https://studyabroad.com', 'https://application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'USC is cool ig'),

    ('UC Los Angeles', 'Los Angeles', 'CA', 'www.ucla.edu', 'admissions.com', 'finaid.com', 2.0, 4.0, 800, 1000, 400, 800, 400, 800, 25, 33, 25, 33, 25, 33, 25, 34, 25, 33, 'majors.com', 'athletics.com', 'PAC12', .75, 'questionaire.com', 4, .12, 'racestats.com', .11, .11, .11, .11, .11, .11, .11, .11, .12, 'genderstats.com', .5, .5, .8, .2, .8, 'netpricecalc.com', 30000, 60000, 80000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'UCLA is great'),

    ('UC Berkeley', 'Berkeley', 'CA', 'www.ucberkeley.edu', 'admissions.com', 'finaid.com', 2.0, 4.0, 1100, 1300, 400, 800, 400, 800, 26, 32, 26, 32, 26, 32, 27, 32, 26, 32, 'majors.com', 'athletics.com', 'Big Ten', .7, 'questionaire.com', 4, .1, 'racestats.com', .1, .1, .1, .1, .1, .1, .1, .1, .1, 'genderstats.com', .55, .45, .75, .25, .75, 'netpricecalc.com', 25000, 55000, 75000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'UCB is awesome'),

    ('Stanford University', 'Palo Alto', 'CA', 'www.stanford.edu', 'admissions.com', 'finaid.com', 2.5, 3.8, 1000, 1600, 400, 800, 400, 800, 27, 34, 27, 34, 24, 34, 27, 34, 27, 34, 'majors.com', 'athletics.com', 'Big West', .8, 'questionaire.com', 4, .15, 'racestats.com', .12, .12, .12, .12, .12, .12, .12, .12, .13, 'genderstats.com', .48, .52, .7, .3, .7, 'netpricecalc.com', 28000, 60000, 85000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'Stanford is fantastic'),

    ('San Diego State University', 'San Diega', 'CA', 'www.sdsu.edu', 'admissions.com', 'finaid.com', 2.0, 4.0, 900, 1500, 400, 800, 400, 800, 28, 35, 28, 35, 28, 35, 28, 35, 28, 35, 'majors.com', 'athletics.com', 'PAC12', .75, 'questionaire.com', 4, .12, 'racestats.com', .11, .11, .11, .11, .11, .11, .11, .11, .12, 'genderstats.com', .5, .5, .8, .2, .8, 'netpricecalc.com', 30000, 60000, 80000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'SDSU is cool'),

    ('Harvard University', 'Cambridge', 'Massachusetts', 'www.harvard.edu', 'admissions.com', 'finaid.com', 2.0, 4.0, 1100, 1450, 400, 800, 400, 800, 25, 33, 26, 34, 25, 33, 20, 33, 25, 33, 'majors.com', 'athletics.com', 'PAC12', .75, 'questionaire.com', 4, .12, 'racestats.com', .11, .11, .11, .11, .11, .11, .11, .11, .12, 'genderstats.com', .5, .5, .8, .2, .8, 'netpricecalc.com', 30000, 60000, 80000, 'finaidathlete.com', 'stuathacademicres.com', 'academicresources.com', 'diversityresources.com', 'studentorgs.com', 'studyabroad.com', 'application.com', '2023-12-31', '2023-12-31', '2024-01-15', '2023-11-10', '2023-12-31', 'Harvard is great');


INSERT INTO master_users (
    user_email,
    user_password,
    user_firstname,
    user_lastname,
    user_phone,
    user_instagram,
    user_facebook,
    user_show_socials,
    user_school,
    user_grad_year,
    user_ncaa_registered,
    user_reg_number,
    user_goal,
    user_purpose,
    user_gpa,
    user_sat,
    user_sat_read_write,
    user_sat_math,
    user_act,
    user_act_english,
    user_act_math,
    user_act_reading,
    user_act_science,
    user_potential_major,
    user_alt_major1,
    user_alt_major2,
    user_interests,
    user_extracurriculars,
    user_sport1,
    user_sport1_role,
    user_sport1_level,
    user_sport2,
    user_sport2_role,
    user_sport2_level,
    user_notes
)
VALUES 
    ('janedoe@example.com', '', 'Jane', 'Doe', '000-000-0000', 'instagram', 'facebook', true, 'Mountain View HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'computer science', 'biology', 'chemistry', 'coding', 'coding more', 'soccer', 'defense', 'National', 'basketball', 'center', 'State', 'notes'),
    ('admin@example.com', '', 'Admin', 'Admin', '000-000-0000', 'instagram', 'facebook', true, 'Mountain View HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'computer science', 'biology', 'chemistry', 'coding', 'coding more', 'soccer', 'defense', 'National', 'basketball', 'center', 'State', 'notes'),
    ('billybob@example.com', '', 'Billy', 'Bob', '000-000-0000', 'instagram', 'facebook', true, 'Los Altos HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'computer science', 'math', 'english', 'coding', 'coding more', 'tennis', 'doubles', 'National', 'basketball', 'center', 'State', 'notes'),
    ('sarahjane@example.com', '', 'Sarah', 'Jane', '000-000-0000', 'instagram', 'facebook', true, 'Ohio HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'design', 'biology', 'computer science', 'coding', 'coding more', 'soccer', 'defense', 'National', 'tennis', 'singles', 'State', 'notes'),
    ('gracekuo@example.com', '', 'Grace', 'Kuo', '000-000-0000', 'instagram', 'facebook', true, 'Homestead', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'english', 'politcal science', 'design', 'coding', 'coding more', 'football', 'defense', 'National', 'hockey', 'center', 'State', 'notes'),
    ('maryjane@example.com', '', 'Olivia', 'Lai', '000-000-0000', 'instagram', 'facebook', true, 'Mountain View HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'computer science', 'biology', 'chemistry', 'coding', 'coding more', 'soccer', 'defense', 'National', 'basketball', 'center', 'State', 'notes'),
    ('joeybuddy@example.com', '', 'Joey', 'Buddy', '000-000-0000', 'instagram', 'facebook', true, 'Los Altos HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'computer science', 'math', 'english', 'coding', 'coding more', 'tennis', 'doubles', 'National', 'basketball', 'center', 'State', 'notes'),
    ('sarahdoe@example.com', '', 'Mary', 'Jane', '000-000-0000', 'instagram', 'facebook', true, 'Ohio HS', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'design', 'biology', 'computer science', 'coding', 'coding more', 'soccer', 'defense', 'National', 'tennis', 'singles', 'State', 'notes'),
    ('bobbyjunior@example.com', '', 'Bobby', 'Junior', '000-000-0000', 'instagram', 'facebook', true, 'Homestead', 2025, true, 1, 'goal', 'purpose', 3.0, 1000, 500, 500, 28, 27, 27, 29, 29, 'english', 'politcal science', 'design', 'coding', 'coding more', 'football', 'defense', 'National', 'hockey', 'center', 'State', 'notes');



INSERT INTO user_status (user_id, user_status)
VALUES 
    (1, 0),
    (2, 3),
    (3, 0),
    (4, 0),
    (5, 0),
    (6, 0),
    (7, 0),
    (8, 0),
    (9, 0);


INSERT INTO college_assignments (
    user_id,
    college_id
)
VALUES 
    (1, 1), (1, 2),
    (2, 3), (2, 4),
    (3, 5), (3, 6),
    (4, 7), (4, 8),
    (5, 1), (5, 8),
    (6, 2), (6, 7),
    (7, 3), (7, 6),
    (8, 4), (8, 5);


INSERT INTO mentors (
    mentor_firstname,
    mentor_lastname,
    mentor_email,
    mentor_phone,
    mentor_colleges,
    mentor_major1,
    mentor_degree1,
    mentor_major2,
    mentor_degree2,
    mentor_major3,
    mentor_degree3,
    mentor_curr_employment,
    mentor_highest_sports_level,
    mentor_interests,
    mentor_extracurriculars,
    mentor_sport1,
    mentor_sport1_role,
    mentor_sport2,
    mentor_sport2_role
)
VALUES 
    ('Bob', 'Smith', 'bobsmith@example.com', '111-111-1111', 'USC', 'Computer Science', 'Bachelors', 'Design', 'Bachelors', 'Biology', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'football', 'quarterback', 'volleyball', 'setter'),
    ('Bobby', 'Smith', 'bobbysmith@example.com', '111-111-1111', 'USC', 'Computer Science', 'Bachelors', 'Design', 'Bachelors', 'Biology', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'tennis', 'quarterback', 'soccer', 'setter'),
    ('Heather', 'Liu', 'heatherliu@example.com', '111-111-1111', 'USC', 'Math', 'Bachelors', 'Design', 'Bachelors', 'Biology', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'badminton', 'quarterback', 'basketball', 'setter'),
    ('Icesha', 'Sanders', 'iceshasanders@example.com', '111-111-1111', 'USC', 'Computer Science', 'Bachelors', 'Math', 'Bachelors', 'Biology', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'soccer', 'quarterback', 'volleyball', 'setter'),
    ('Vincent', 'Hang', 'vincenthang@example.com', '111-111-1111', 'USC', 'Chemistry', 'Bachelors', 'Design', 'Bachelors', 'Math', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'football', 'quarterback', 'volleyball', 'setter'),
    ('Angel', 'Liu', 'angelliu@example.com', '111-111-1111', 'USC', 'Computer Science', 'Bachelors', 'Design', 'Bachelors', 'Biology', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'tennis', 'quarterback', 'soccer', 'setter'),
    ('Vincent', 'Jung', 'vincentjung@example.com', '111-111-1111', 'USC', 'English', 'Bachelors', 'Design', 'Bachelors', 'Chemistry', 'Bachelors', 'Google', 'D1', 'Hiking', 'CTC', 'football', 'quarterback', 'basketball', 'setter');


