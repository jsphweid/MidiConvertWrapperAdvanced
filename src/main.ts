import { MIDI, parse as parseMidi } from 'midiconvert'
import { ParsedPath, parse, join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

if (process.argv.length !== 3 && process.argv.length !== 4) {
    console.error(`
        You must pass in one argument that is the midi file you wish to process.
        Optionally, you may pass in a second argument that is the json file you
        wish to save the output as.
    `)
    process.exit(1)
}

const firstArg: string = process.argv[2]
const secondArg: string = process.argv[3]

const sourcePathObj: ParsedPath = parse(firstArg)
const destinationPathObj: ParsedPath = parse(secondArg || firstArg)

if (sourcePathObj.ext !== '.mid' || !existsSync(firstArg)) {
    console.error('First argument must be a .mid file that really exists.')
    process.exit(1)
}

if (secondArg && (destinationPathObj.ext !== '.json' || !existsSync(destinationPathObj.dir))) {
    console.error('Second argument must be a .json file in a folder that really exists.')
    process.exit(1)
}

const finalDestination: string = secondArg || `${join(sourcePathObj.dir, sourcePathObj.name)}.json`

// create a map / object with keys that represent the buffer, exclude partial buffers
// iterate through each track
// // iterate through each event
// // // for each even
// // //
// // //


try {

    const midiFile: any = readFileSync(firstArg, 'binary')
    const parsedMidi: MIDI = parseMidi(midiFile)
    const serializedJson: string = JSON.stringify(parsedMidi)

    writeFileSync(finalDestination, serializedJson, 'utf8')


} catch (error) {

    console.error('There was an error transforming this midi file to JSON. Error immediately follows...')
    console.error(error)
    process.exit(1)

}
