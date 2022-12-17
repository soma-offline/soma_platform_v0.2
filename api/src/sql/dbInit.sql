CREATE TABLE IF NOT EXISTS subjects (
    sid char(4) PRIMARY KEY,
    name char(100) UNIQUE NOT NULL
);

INSERT INTO subjects (sid, name) VALUES ('MATH','Mathematics') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('ENGL','English') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('KISW','Kiswahili') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('SCIE','Science') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('SS','Social Studies') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('CRE','Christian Religious Education') ON CONFLICT DO NOTHING;
INSERT INTO subjects (sid, name) VALUES ('IRE','Islamic Religious Education') ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS papers (
    title VARCHAR(255),
    paper_year VARCHAR(4),
    grade VARCHAR(2) NOT NULL,
    PRIMARY KEY (title, paper_year)
);

ALTER TABLE papers ADD COLUMN IF NOT EXISTS subject char(4) NOT NULL;
ALTER TABLE papers ADD CONSTRAINT subject_fk FOREIGN KEY (subject) REFERENCES subjects(sid);

CREATE TABLE IF NOT EXISTS short_questions (
    qid  SERIAL PRIMARY KEY,
    qno NUMERIC NOT NULL,
    description TEXT NOT NULL,
    topic char(100)
);

CREATE TABLE IF NOT EXISTS paper_short_questions(
    qid INT,
    title VARCHAR(255),
    paper_year VARCHAR(4),
    PRIMARY KEY(qid, title, paper_year),
    FOREIGN KEY (title, paper_year) REFERENCES papers(title, paper_year)
        ON UPDATE CASCADE,
    FOREIGN KEY (qid) REFERENCES short_questions(qid)
    );

CREATE TABLE IF NOT EXISTS paper_section_questions(
    sid INT,
    title VARCHAR(255),
    paper_year VARCHAR(4),
    PRIMARY KEY(sid, title, paper_year),
    FOREIGN KEY (title, paper_year) REFERENCES papers(title, paper_year)
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES section_questions(sid)
    );

CREATE TABLE IF NOT EXISTS section_questions (
    sid SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    figure TEXT,
    first_short_qno INT NOT NULL
    );

ALTER TABLE short_questions ADD COLUMN IF NOT EXISTS section_id INT;
ALTER TABLE short_questions ADD CONSTRAINT section_question_fk FOREIGN KEY (section_id) REFERENCES section_questions (sid);

CREATE TABLE IF NOT EXISTS choices (
    cid  SERIAL PRIMARY KEY,
    letter char(1) NOT NULL,
    description TEXT NOT NULL,
    correct_answer BOOLEAN
);

CREATE TABLE IF NOT EXISTS short_question_choices (
    qid INT,
    cid INT,
    PRIMARY KEY (qid, cid),
    FOREIGN KEY (qid) REFERENCES short_questions(qid),
    FOREIGN KEY (cid) REFERENCES choices(cid)
    );
