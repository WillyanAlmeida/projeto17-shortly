import { nanoid } from 'nanoid'
import { db } from "../database/databaseconnections.js";



export async function postUri(req, res) {
    const { url } = req.body
    const createdBy = Number(res.locals.session)

    try {
        const shortUrl = nanoid()
        const newshortly = await db.query(`INSERT INTO shortly ( url, "shortUrl", "createdBy"  ) VALUES
         ($1, $2, $3) RETURNING id, "shortUrl"`, [url, shortUrl, createdBy]);

        res.status(201).send(newshortly.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUribyid(req, res) {
    const { id } = req.params
    console.log(req.params)


    try {

        const shortlybyid = await db.query(`SELECT id, "shortUrl", url FROM shortly WHERE id=$1  `, [id]);

        if (shortlybyid.rows.length === 0) return res.sendStatus(404)

        res.status(200).send(shortlybyid.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const url = await db.query(`SELECT url, id, "visitCount" FROM shortly WHERE "shortUrl"=$1  `, [shortUrl]);

        if (url.rows.length === 0) return res.sendStatus(404)
        const views = url.rows[0].visitCount + 1

        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2;`, [views, url.rows[0].id]);
        res.redirect(url.rows[0].url);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function delUrl(req, res) {
    const {id} = req.params;  
    const createdBy = Number(res.locals.session)  
    try {
        const checkId = await db.query(`SELECT "createdBy" FROM shortly WHERE id= $1 `, [id]);
        if(checkId.rows.length === 0)return res.sendStatus(404)
        if(checkId.rows[0].createdBy !== createdBy)return res.sendStatus(401)
        
        await db.query(`DELETE FROM shortly WHERE id= $1;`, [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

