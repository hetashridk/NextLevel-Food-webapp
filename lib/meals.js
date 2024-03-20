import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import { error } from 'node:console';

const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return db.prepare('SELECT * FROM meals').all();   

    // .run():- will used if we were inserting or changing data
    //.all() :- will used when we are fetching data
    // .get() :- for single row we will use get()
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
 
export async function saveMeal(meal){
    meal.slug = slugify(meal.title, { lower: true });  //lower: true is to convert all formdata to lower case
    meal.instructions = xss(meal.instructions);

    // for images to be come in our local system
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (errir) => {
        if(error){
            throw new Error('Saving image failed')
        }
    });

    meal.image = `/images/${fileName}`

    db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )
    `).run(meal);
}