import { db } from '../database/databaseconnections.js';

import jwt from 'jsonwebtoken';


export async function validateAuth(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    console.log(token)

    if (!token) return res.sendStatus(401)

    const chaveSecreta = process.env.JWT_SECRET


    try {
        const { userId } = jwt.verify(token, chaveSecreta);
        let session = await db.query(`SELECT * FROM users WHERE id=$1`, [userId]);

        if (!session) return res.sendStatus(401);
        const sessionInfo = userId 

        res.locals.session = sessionInfo;
       
        next()
    } catch (err) {
        res.status(401).send(err.message)
    }
}