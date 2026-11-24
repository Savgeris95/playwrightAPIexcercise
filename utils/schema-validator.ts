import fs from 'fs/promises'
import path from 'path'
import Ajv from "ajv"
const ajv = new Ajv()

const SCHEMA_BASE_FOLDER = './response-schemas'

export async function validateSchema(dirFolder: string, dirFile: string, response: JSON) {
    const schemaPath = path.join(SCHEMA_BASE_FOLDER, dirFolder, `${dirFile}_schema.json`)
    const schema = await readSchema(schemaPath)
    
    const validate = ajv.compile(schema)
    const valid = validate(response)

    if (!valid) {
        throw new Error(
            `Schema validation of ${dirFile}_schema.json file failed:\n` +
            `${JSON.stringify(validate.errors,null,4)}\n\n`+
            `Actual Response Body: \n\n`+
            `${JSON.stringify(response,null,4)}\n\n`
        )
    }

}

async function readSchema(schemaPath: string) {

    try {
        const schema = await fs.readFile(schemaPath, 'utf-8')
        return JSON.parse(schema)
    } catch (error: unknown) {

        if (error instanceof Error) {
            throw new Error(`Failed to load schema with error message: ${error.message}`)
        } else {
            throw new Error(`Failed to load schema with unknown error: ` + error)
        }

    }

}
