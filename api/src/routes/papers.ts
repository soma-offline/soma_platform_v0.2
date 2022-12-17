import db from '../db';
import {ExpressRequest, ExpressResponse} from '../types/ExpressTypes';

export function getPapers(request: ExpressRequest, response: ExpressResponse): void {
   const subject = request.params.subject;
   const query = `SELECT title, paper_year FROM papers WHERE subject = (SELECT sid FROM subjects WHERE name = '${subject}')`;
   db.query(query).then(res => {
        response.status(201).send(res.rows);
   }).catch(err => {
        console.error(err);
        response.status(500).send('Internal Server Error');
   });
}

export function getPaper(request: ExpressRequest, response: ExpressResponse): void {
     const title_year:string = (request.params.title_year);
     const title = title_year.substr(0, title_year.length - 5);
     const paper_year = title_year.substr(-4);
     const questions = {
          shortQuestions: {},
          sectionQuestions: {}
     };
     const shortQuestions = {};
     const shortQuestionsQuery = `SELECT qid, qno, description, topic FROM short_questions WHERE qid IN (SELECT qid FROM paper_short_questions WHERE title = '${title}' AND paper_year = '${paper_year}')`;

     db.query(shortQuestionsQuery).then(resShortQuestions => {
          const shortQuestionIds: number[] = [];
          resShortQuestions.rows.forEach(sq => {
               shortQuestionIds.push(sq.qid);
               shortQuestions[sq.qid] = {
                    qno: sq.qno,
                    description: sq.description,
                    topic: sq.topic,
                    choices:{
                         'A':{},
                         'B':{},
                         'C':{},
                         'D':{},
                    }
               };
          });
          
          const shortQuestionChoicesQuery = `SELECT choices.cid, letter, description, correct_answer, qid FROM choices, short_question_choices WHERE choices.cid = short_question_choices.cid AND choices.cid IN (SELECT short_question_choices.cid FROM short_question_choices WHERE qid IN (${shortQuestionIds}))`;
          
          db.query(shortQuestionChoicesQuery).then(resQuestionChoices => {
               resQuestionChoices.rows.forEach(choice => {
                    shortQuestions[choice.qid]['choices'][choice.letter] = {
                         'letter': choice.letter,
                         'description': choice.description,
                         'correct_answer': choice.correct_answer
                    };
               });
               questions.shortQuestions = shortQuestions;

               const sectionQuestionsQuery = `SELECT description, figure, first_short_qno FROM section_questions WHERE sid IN (SELECT sid FROM paper_section_questions WHERE title = '${title}' AND paper_year = '${paper_year}')`;
               db.query(sectionQuestionsQuery).then(resSectionQuestions => {
                    questions.sectionQuestions = resSectionQuestions.rows;
                    response.status(201).send(questions);
               }).catch (err => {
                    console.error(err);
                    response.status(500).send('Internal Server Error');     
               });
          
          }).catch(err => {
               console.error(err);
               response.status(500).send('Internal Server Error');     
          });
          
          
     }).catch(err => {
          console.error(err);
          response.status(500).send('Internal Server Error');
     });
  }