
CREATE TABLE hepatitis_enrollment
(
    id BIGINT PRIMARY KEY,
    person_id BIGINT NOT NULL REFERENCES person(id),
    uuid VARCHAR(255) NOT NULL UNIQUE,
    care_entry_point VARCHAR(255),
    weight VARCHAR(255),
    height VARCHAR(255),
    bmi VARCHAR(255),
    pregnancy VARCHAR(255),
    breast_feeding VARCHAR(255),
    history_of_using_abused_substance VARCHAR(255)
);

-- Creating the Screening table
CREATE TABLE screening_table
(
    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    date_of_hepatitis_b_positive_screening DATE NOT NULL,
    hepatitis_c_hcvAb VARCHAR(255) NOT NULL,
    hepatitis_enrollment_id BIGINT NOT NULL REFERENCES hepatitis_enrollment(id)
);

-- Creating the HepatitisDiagnosis table
CREATE TABLE hepatitis_diagnosis (
    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    hepatitis_enrollment_id BIGINT NOT NULL REFERENCES hepatitis_enrollment(id)
);

-- Creating the Diagnosis table
CREATE TABLE diagnosis (
    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    hepatitis_b_id BIGINT NOT NULL REFERENCES hepatitis_b(id),
    hepatitis_c_id BIGINT NOT NULL REFERENCES hepatitis_c(id)
);

-- Creating the ClinicalParameters table
CREATE TABLE clinical_parameters (
    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    hepatitis_diagnosis_id BIGINT NOT NULL REFERENCES hepatitis_diagnosis(id),
    hcv_rna VARCHAR(255),
    hepatitis_coinfection VARCHAR(255),
    commobidities TEXT,
    ast VARCHAR(255),
    alt VARCHAR(255),
    pst VARCHAR(255),
    total_bilirubin VARCHAR(255),
    direct_bilirubin VARCHAR(255),
    apri_score VARCHAR(255),
    fib_4 VARCHAR(255),
    prothrombin_time VARCHAR(255),
    urea VARCHAR(255),
    creatinine VARCHAR(255),
    afp VARCHAR(255),
    fibroscan VARCHAR(255),
    ultrasound_scan VARCHAR(255),
    ascites BOOLEAN,
    grade_of_encephalopathy INTEGER,
    child_pugh_score VARCHAR(255),
    liver_biopsy_stage VARCHAR(255),
    diagnosis VARCHAR(255)
);

-- Creating the HepatitisC table
CREATE TABLE hepatitis_c (

    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    hcv_rna VARCHAR(255),
    hepatitis_coinfection VARCHAR(255),
    commobidities TEXT,
    ast VARCHAR(255),
    alt VARCHAR(255),
    pst VARCHAR(255),
    total_bilirubin VARCHAR(255),
    direct_bilirubin VARCHAR(255),
    apri_score VARCHAR(255),
    fib_4 VARCHAR(255),
    prothrombin_time VARCHAR(255),
    urea VARCHAR(255),
    creatinine VARCHAR(255),
    afp VARCHAR(255),
    fibroscan VARCHAR(255),
    ultrasound_scan VARCHAR(255),
    ascites BOOLEAN,
    grade_of_encephalopathy INTEGER,
    child_pugh_score VARCHAR(255),
    liver_biopsy_stage VARCHAR(255),
    diagnosis VARCHAR(255)
);

-- Creating the HepatitisB table
CREATE TABLE hepatitis_b (
    id BIGINT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    date_hbv_test_requested DATE,
    date_hbv_sample_requested DATE,
    date_hbv_dna_result_reported DATE,
    hbv_dna VARCHAR(255),
    hbsag_qualification VARCHAR(255),
    hbe_ag VARCHAR(255),
    anti_hdv VARCHAR(255),
    treatment_eligible VARCHAR(255),
    pmtct_eligible VARCHAR(255),
    comment TEXT
);

-- Adding FOREIGN KEY constraints

-- Foreign key for screening_table referencing hepatitis_enrollment
ALTER TABLE screening_table
    ADD FOREIGN KEY (hepatitis_enrollment_id) REFERENCES hepatitis_enrollment(id);

-- Foreign key for hepatitis_diagnosis referencing hepatitis_enrollment
ALTER TABLE hepatitis_diagnosis
    ADD FOREIGN KEY (hepatitis_enrollment_id) REFERENCES hepatitis_enrollment(id);

-- Foreign keys for diagnosis referencing hepatitis_b and hepatitis_c
ALTER TABLE diagnosis
    ADD FOREIGN KEY (hepatitis_b_id) REFERENCES hepatitis_b(id);

ALTER TABLE diagnosis
    ADD FOREIGN KEY (hepatitis_c_id) REFERENCES hepatitis_c(id);

-- Foreign key for clinical_parameters referencing hepatitis_diagnosis
ALTER TABLE clinical_parameters
    ADD FOREIGN KEY (hepatitis_diagnosis_id) REFERENCES hepatitis_diagnosis(id);
