import { nanoid } from 'nanoid'
import { db } from "../database/databaseconnections.js";



export async function postUri(req, res) {
    const { url } = req.body
    const createdBy = Number(res.locals.session)

    try {
        const shortUrl = nanoid()
        const newshortly = await db.query(`INSERT INTO shortly ( url, "shortUrl", "createdBy"  ) VALUES
         ($1, $2, $3) RETURNING id, "shortUrl"`, [url, shortUrl, createdBy]);
            
         res.status(201).send( newshortly.rows[0]);
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

         if( shortlybyid.rows.length===0) return  res.sendStatus(404)
            
          res.status(200).send( shortlybyid.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

