import { nanoid } from 'nanoid'
import { db } from "../database/databaseconnections.js";



export async function postUri(req, res) {
    const { url } = req.body
    const createdBy = Number(res.locals.session)

    
    try {
        const shortUrl = nanoid()
        
       
        const newshortly = await db.query(`INSERT INTO shortly ( url, "shortUrl", "createdBy"  ) VALUES
         ($1, $2, $3) RETURNING id, "shortUrl"`, [url, shortUrl, createdBy]);
         console.log(newshortly)
      
         res.status(200).send( newshortly.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

