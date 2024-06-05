import {CollegeForm, CollegeFormSection} from "../types/college-form";

const basicInformation: CollegeFormSection = {
  title: "Basic Information",
  fields: [
    {
      type: "text",
      title: "College Name",
      id: "college_name",
      required: true
    },
    {
      type: "text",
      title: "Location (City)",
      id: "location_city"
    },
    {
      type: "text",
      title: "Location (State)",
      id: "location_state"
    },
    {
      type: "text",
      title: "General University Website",
      id: "general_web_addr",
      required: true
    },
    {
      type: "text",
      title: "Admissions Website",
      id: "admissions_web_addr"
    },
    {
      type: "number",
      title: "Acceptance Rate",
      id: "acceptance_rate",
    },
    {
      title: "Admitted GPA",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_gpa",
          title: "25th Percentile",
          type: "number",
        },
        {
          id: "max_gpa",
          title: "75th Percentile",
          type: "number",
        }
      ]
    }, {
      title: "Admitted Cumulative SAT",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_sat",
          title: "25th Percentile",
          type: "number",
          min: 400,
          max: 1600,
          step: 10
        },
        {
          id: "max_sat",
          title: "75th Percentile",
          type: "number",
          min: 400,
          max: 1600,
          step: 10
        }
      ]
    }, {
      title: "Admitted SAT EBRW",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_sat_read_write",
          title: "25th Percentile",
          type: "number",
          min: 200,
          max: 800,
          step: 10
        },
        {
          id: "max_sat_read_write",
          title: "75th Percentile",
          type: "number",
          min: 200,
          max: 800,
          step: 10
        }
      ]
    }, {
      title: "Admitted SAT Math",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_sat_math",
          title: "25th Percentile",
          type: "number",
          min: 200,
          max: 800,
          step: 10
        },
        {
          id: "max_sat_math",
          title: "75th Percentile",
          type: "number",
          min: 200,
          max: 800,
          step: 10
        }
      ]
    }, {
      title: "Admitted Cumulative ACT",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_act",
          title: "25th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        },
        {
          id: "max_act",
          title: "75th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        }
      ]
    }, {
      title: "Admitted ACT English",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_act_english",
          title: "25th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        },
        {
          id: "max_act_english",
          title: "75th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        }
      ]
    }, {
      title: "Admitted ACT Math",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_act_math",
          title: "25th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        },
        {
          id: "max_act_math",
          title: "75th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        }
      ]
    }, {
      title: "Admitted ACT Reading",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_act_reading",
          title: "25th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        },
        {
          id: "max_act_reading",
          title: "75th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        }
      ]
    }, {
      title: "Admitted ACT Science",
      type: "category",
      columns: 2,
      fields: [
        {
          id: "min_act_science",
          title: "25th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        },
        {
          id: "max_act_science",
          title: "75th Percentile",
          type: "number",
          min: 1,
          max: 36,
          step: 1
        }
      ]
    }
  ]
}

const programs: CollegeFormSection = {
  title: "Academic and Athletic Programs",
  fields: [
    {
      title: "Sports Conference",
      type: "text",
      id: "sport_conference"
    },
    {
      title: "Athletic Graduation Rate",
      type: "number",
      id: "grad_rate_athletes"
    },
    {
      title: "Undergraduate Programs Website",
      type: "text",
      id: "majors_web_addr"
    },
    {
      title: "Athletics Website",
      type: "text",
      id: "athletics_web_addr"
    },
    {
      title: "Prospective Student Athlete Questionaire Form Website",
      type: "text",
      id: "questionaire_web_addr"
    }
  ]
}

const enrollmentStats: CollegeFormSection = {
  title: "Enrollment Statistics",
  fields: [
    {
      type: "category",
      title: "Enrollment by Ethnicity/Race (%)",
      columns: 1,
      fields: [
        {
          type: "number",
          title: "White",
          id: "race_white",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Black",
          id: "race_black",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Hispanic",
          id: "race_hispanic",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Asian",
          id: "race_asian",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Pacific Islander",
          id: "race_pacific_islander",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Native American",
          id: "race_native_american",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Two or More",
          id: "race_two_or_more",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "International",
          id: "race_international",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Other",
          id: "race_other",
          percentage: true,
          min: 0,
          max: 100
        },
      ]
    }, {
      type: "text",
      title: "Enrollment by Ethnicity/Race Website",
      id: "gender_stats_web_addr"
    }, {
      type: "category",
      title: "Enrollment by Gender (%)",
      columns: 2,
      fields: [
        {
          type: "number",
          title: "Male",
          id: "gender_male",
          percentage: true,
          min: 0,
          max: 100
        }, {
          type: "number",
          title: "Female",
          id: "gender_female",
          percentage: true,
          min: 0,
          max: 100
        },
      ]
    }, {
      type: "text",
      title: "Enrollment by Gender Website",
      id: "gender_stats_web_addr"
    }, {
      type: "number",
      title: "First Year Retention (%)",
      id: "first_year_retention_rate",
      half_width: true,
      percentage: true,
      min: 0,
      max: 100
    }, {
      type: "number",
      title: "First Year Transfer (%)",
      id: "first_year_transfer_rate",
      half_width: true,
      percentage: true,
      min: 0,
      max: 100
    }, {
      type: "number",
      title: "First Year Graduation (%)",
      id: "first_year_grad_rate",
      half_width: true,
      percentage: true,
      min: 0,
      max: 100
    }
  ]
}

const costsAndFinAid: CollegeFormSection = {
  title: "Costs and Financial Aid",
  fields: [
    {
      type: "text",
      title: "Net Price Calculator Website",
      id: "net_price_calc_web_addr"
    },
    {
      type: "category",
      title: "Tuition Cost",
      columns: 2,
      fields: [
        {
          type: "number",
          title: "In-State",
          id: "cost_tuition_in_state"
        }, {
          type: "number",
          title: "Out-of-State",
          id: "cost_tuition_out_of_state"
        }
      ]
    }, {
      type: "number",
      title: "Average Cost of Attendance After Aid",
      id: "avg_total_cost_est"
    }, {
      type: "text",
      title: "Financial Aid and Scholarships Website",
      id: "fin_aid_athlete_web_addr"
    }
  ]
}

const resources: CollegeFormSection = {
  title: "College Resources",
  fields: [
    {
      type: "text",
      title: "Student Academic Resources Website",
      id: "stu_ath_academic_res_web_addr"
    }, {
      type: "text",
      title: "Student Diversity Resources Website",
      id: "diversity_resources_web_addr"
    }, {
      type: "text",
      title: "Student Athlete Academic Resources Website",
      id: "academic_resources_web_addr"
    }, {
      type: "text",
      title: "Organizations Website",
      id: "student_orgs_web_addr"
    }, {
      type: "text",
      title: "Study Abroad Website",
      id: "study_abroad_web_addr"
    }
  ]
}

const deadlines: CollegeFormSection = {
  title: "Regular Application Website",
  fields: [
    {
      type: "text",
      title: "Regular Application Website",
      id: "app_web_addr"
    }, {
      type: "category",
      title: "Regular Application Deadlines",
      columns: 1,
      fields: [
        {
          type: "date",
          title: "Application",
          id: "app_regular_deadline"
        }, {
          type: "date",
          title: "Essays",
          id: "app_essay_deadline"
        }, {
          type: "date",
          title: "Letters of Recommendation",
          id: "app_letters_of_rec_deadline"
        }
      ]
    }, {
      type: "date",
      title: "Preferential Application Deadline",
      id: "app_preferential_deadline"
    }, {
      type: "date",
      title: "Financial Aid Application Deadline",
      id: "app_fin_aid_deadline"
    }
  ]
}

const addlNotes: CollegeFormSection = {
  title: "Additional Notes",
  fields: [
    {
      type: "longform",
      title: "Additional Notes",
      id: "extra_notes"
    }
  ]
}

export const collegeForm: CollegeForm = [
  basicInformation, programs, enrollmentStats, costsAndFinAid, resources, deadlines, addlNotes
]