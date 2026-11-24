import { createSchema } from 'genson-js';
import fs from 'fs';

export function generateSchema(dirFolder: string, dirFile: string, response: JSON) {
    const schema = createSchema(response);

    const folderPath = `response-schemas/${dirFolder}`;

    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    } catch (err) {
        console.error(err);
    }

    fs.writeFile(`${folderPath}/${dirFile}_schema.json`, JSON.stringify(schema, null, 4), () => {
        console.log(`Data written to ${folderPath} as JSON.`);
    });
    

}