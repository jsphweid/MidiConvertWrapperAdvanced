import { MIDI, Note, parse as parseMidi, Track } from 'midiconvert'
import { ParsedPath, parse, join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { EventType, SingleEventsMap } from './types'
import EventProcessor from './event-processor'

if (process.argv.length !== 6) {
    console.error(`
        This requires 4 args:
            1: input to real .mid file
            2: output to desired .json file
            3: buffer size
            4: sampling rate
    `)
    process.exit(1)
}

const inputMidiFilePathArg: string = process.argv[2]
const outputJsonFilePathArg: string = process.argv[3]
const bufferSizeArg: string = process.argv[4]
const samplingRateArg: string = process.argv[5]

const sourcePathObj: ParsedPath = parse(inputMidiFilePathArg)
const destinationPathObj: ParsedPath = parse(outputJsonFilePathArg || inputMidiFilePathArg)

if (sourcePathObj.ext !== '.mid' || !existsSync(inputMidiFilePathArg)) {
    console.error('First argument must be a .mid file that really exists.')
    process.exit(1)
}

if (outputJsonFilePathArg && (destinationPathObj.ext !== '.json' || !existsSync(destinationPathObj.dir))) {
    console.error('Second argument must be a .json file in a folder that really exists.')
    process.exit(1)
}

const finalDestination: string = outputJsonFilePathArg || `${join(sourcePathObj.dir, sourcePathObj.name)}.json`

const midiFile: any = readFileSync(inputMidiFilePathArg, 'binary')
const parsedMidi: MIDI = parseMidi(midiFile)
const finalJson: any = {}

const eventProcessor: EventProcessor = new EventProcessor(parseInt(bufferSizeArg), parseInt(samplingRateArg))

parsedMidi.tracks.forEach((track: Track) => {
    track.notes.forEach((note: Note) => {

        const eventMaps: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)

        eventMaps.forEach((value: EventType, key: number) => {
            const existingContents: EventType[] = finalJson[key]
            const newContents: EventType[] = existingContents || []
            newContents.push(value)
            finalJson[key] = newContents
        })
    })
})

const serializedJson: string = JSON.stringify(finalJson)
writeFileSync(finalDestination, serializedJson, 'utf8')

