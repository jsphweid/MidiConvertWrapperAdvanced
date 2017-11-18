import { MIDI, Note, parse as parseMidi, Track } from 'midiconvert'
import { ParsedPath, parse, join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { EventType, MultipleEventMap, SingleEventMap } from './types'
import EventProcessor from './event-processor'

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

const midiFile: any = readFileSync(firstArg, 'binary')
const parsedMidi: MIDI = parseMidi(midiFile)
const grandMap: MultipleEventMap = new Map<number, EventType[]>()

parsedMidi.tracks.forEach((track: Track) => {
    track.notes.forEach((note: Note) => {
        const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
        // take events and append each to the grandMap of things
        // reconsider if this is the best way to handle the events after they have been processed...
    })
})
console.log(JSON.stringify(grandMap))




const serializedJson: string = JSON.stringify(grandMap)
writeFileSync(finalDestination, serializedJson, 'utf8')

