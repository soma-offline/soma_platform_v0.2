
import db from '../db';
import {ExpressRequest, ExpressResponse} from '../types/ExpressTypes';

export function addKCPEPaper(request: ExpressRequest, response: ExpressResponse): void{
    const {paperInfo, shortQuestions, sectionQuestions }= request.body;
    const {title, paper_year, grade, subject } = paperInfo;
    let query = `BEGIN;
                 INSERT INTO papers (title, paper_year, grade, subject) VALUES ('${title}','${paper_year}','${grade}','${subject}');`;
    shortQuestions.forEach(shortQuestion => {
    const {number, shortQuestionDescription, choices, correct_answer} = shortQuestion;
        query += `INSERT INTO short_questions (qno, description) VALUES (${number}, '${shortQuestionDescription}');
                  INSERT INTO choices (letter, description, correct_answer) VALUES('A', '${choices.A}', ${correct_answer === 'A'});
                  INSERT INTO choices (letter, description, correct_answer) VALUES('B', '${choices.B}', ${correct_answer === 'B'});
                  INSERT INTO choices (letter, description, correct_answer) VALUES('C', '${choices.C}', ${correct_answer === 'C'});
                  INSERT INTO choices (letter, description, correct_answer) VALUES('D', '${choices.D}', ${correct_answer === 'D'});
                  INSERT INTO paper_short_questions (qid, title, paper_year) VALUES ((SELECT qid FROM short_questions WHERE qno = ${number} AND description = '${shortQuestionDescription}'),'${title}', '${paper_year}');
                  INSERT INTO short_question_choices (qid, cid) VALUES
                     ((SELECT qid FROM short_questions WHERE qno = ${number} AND description = '${shortQuestionDescription}'),
                      (SELECT cid FROM choices WHERE letter = 'A' AND description = '${choices.A}' AND correct_answer = ${correct_answer === 'A'}));
                  INSERT INTO short_question_choices (qid, cid) VALUES
                     ((SELECT qid FROM short_questions WHERE qno = ${number} AND description = '${shortQuestionDescription}'),
                      (SELECT cid FROM choices WHERE letter = 'B' AND description = '${choices.B}' AND correct_answer = ${correct_answer === 'B'}));
                  INSERT INTO short_question_choices (qid, cid) VALUES
                     ((SELECT qid FROM short_questions WHERE qno = ${number} AND description = '${shortQuestionDescription}'),
                      (SELECT cid FROM choices WHERE letter = 'C' AND description = '${choices.C}' AND correct_answer = ${correct_answer === 'C'}));
                  INSERT INTO short_question_choices (qid, cid) VALUES
                     ((SELECT qid FROM short_questions WHERE qno = ${number} AND description = '${shortQuestionDescription}'),
                      (SELECT cid FROM choices WHERE letter = 'D' AND description = '${choices.D}' AND correct_answer = ${correct_answer === 'D'}));
                  `;
    });
    sectionQuestions.forEach(sectionQuestion => {
        const {sectionQuestionDescription, noOfFirstQuestion, imageURL} = sectionQuestion;
        query += `INSERT INTO section_questions (description, figure, first_short_qno) VALUES ('${sectionQuestionDescription}', '${imageURL}', ${noOfFirstQuestion});
                  INSERT INTO paper_section_questions (sid, title, paper_year) VALUES 
                    ((SELECT sid FROM section_questions WHERE description = '${sectionQuestionDescription}' 
                        AND figure = '${imageURL}' AND first_short_qno = ${noOfFirstQuestion}),'${title}', '${paper_year}');`;
                 });
        query += 'COMMIT;';
    console.log("Executing query ...: ", query);
    
    db.query(query).then(res => {
        response.status(201).send("Insert paper successful");
    }).catch(err => {
        console.error(err);
        response.status(500).send("Internal error. Please try again");
    });
}