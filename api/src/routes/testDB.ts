import db from '../db';
import { ExpressResponse } from '../types/ExpressTypes';

export default function testDB(response: ExpressResponse): void{
db.query('SELECT * FROM subjects').then(res => {
    response.status(201).send(res.rows);
}
).catch(err => {
    console.log(err);
});
}