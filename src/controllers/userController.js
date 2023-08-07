import bcrypt from 'bcrypt';
import { db } from "../database/databaseconnections.js";
import jwt from 'jsonwebtoken';


export async function signup(req, res) {
    const { name, email } = req.body
    console.log(req.body)
if(req.body.password != req.body.confirmPassword) return res.status(409).send("senha não confere");
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rows.length > 0) return res.status(409).send("E-mail de usuário ja cadastrado!");

        const passwordHashed = bcrypt.hashSync(req.body.password, 10);
        delete req.body.password;
        const cad = await db.query(`INSERT INTO users ( name, email, password ) VALUES
        ($1, $2, $3) RETURNING * `, [name, email, passwordHashed]);
        
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    

    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        
        if (user.rows.length === 0) return res.status(401).send("Usuário e/ou senha incorretos!");
        

        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!correctPassword) return res.status(401).send("Usuário e/ou senha incorretos!");


        const dados = { userId: user.rows[0].id };
        const chaveSecreta = process.env.JWT_SECRET || "RAJuIUEUG8O7uPUNc0XKfjUjg8kSF3HkLwn";

        const token = jwt.sign(dados, chaveSecreta, { expiresIn: "1h" });
        console.log(token)

        res.status(200).send( { token});
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

export async function ranking(req, res) {
    
    try {
        const user = await db.query(`SELECT users.id AS id, users.name AS name,
        COUNT(shortly.id) AS "linksCount",
        COALESCE(SUM(shortly."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN shortly ON users.id = shortly."createdBy" 
        GROUP BY users.id
        ORDER BY "visitCount" DESC LIMIT 10;`);
        
        res.status(200).send(user.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

