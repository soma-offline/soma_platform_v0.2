import db from '../db';
import { ExpressResponse } from '../types/ExpressTypes';

export function getSubjects(response: ExpressResponse): void{
db.query('SELECT name FROM subjects').then(res => {
    response.status(201).send(res.rows);
}
).catch(err => {
    console.log(err);
});
}