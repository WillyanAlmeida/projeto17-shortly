import { db } from '../database/databaseconnections.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';


export async function validateAuth(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")


    if (!token) return res.sendStatus(401)

    const chaveSecreta = process.env.JWT_SECRET


    try {
        const { userId } = jwt.verify(token, chaveSecreta);
        let session = await db.collection('users').findOne(new ObjectId(userId));

        if (!session) return res.sendStatus(401);
        const sessionInfo = { user: { token, name: session.name, email: session.email, id: userId } }

        res.locals.session = sessionInfo;
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}