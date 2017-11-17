import { ParsedPath, parse} from 'path'
import { writeFileSync, existsSync } from 'fs'

if (process.argv.length !== 3) {
    console.error(`
        You must have exactly one argument: the json file you want to minimize.
    `)
    process.exit(1)
}

const firstArg: string = process.argv[2]

const sourcePathObj: ParsedPath = parse(firstArg)

if (sourcePathObj.ext !== '.json' || !existsSync(firstArg)) {
    console.error('First argument must be a .json file that really exists.')
    process.exit(1)
}


try {

    const json = JSON.parse(require('fs').readFileSync(firstArg, 'utf8'));
    writeFileSync(firstArg, JSON.stringify(json), 'utf8')

} catch (error) {

    console.error('There was an minifying this json file. Error immediately follows...')
    console.error(error)
    process.exit(1)

}
