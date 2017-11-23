import { Note } from 'midiconvert'
import { SingleEventsMap } from './types'

export default class EventProcessor {

    bufferSize: number
    samplingRate: number

    constructor(iBufferSize: number, iSamplingRate: number) {
        this.bufferSize = iBufferSize
        this.samplingRate = iSamplingRate
    }

    processNoteIntoEvents(note: Note): SingleEventsMap {
        const pianoNoteNum: number = note.midi - 20
        const velocity: number = note.velocity
        const noteStartIndex: number = Math.floor(note.time * this.samplingRate)
        const durationInSamples: number = Math.floor(note.duration * this.samplingRate)

        const nearestBufferOnLeft: number = Math.floor(noteStartIndex / this.bufferSize) * this.bufferSize
        const offsetFromBufferOnLeft: number = noteStartIndex - nearestBufferOnLeft
        const noteEndIndex: number = noteStartIndex + durationInSamples
        const numOfBufferLinesToPassThrough: number = Math.floor((offsetFromBufferOnLeft + durationInSamples) / this.bufferSize)

        const ret: SingleEventsMap = new Map()

        for (let i = 0; i <= numOfBufferLinesToPassThrough; i++) {
            const isFirstOne: boolean = i === 0
            const isLastOne: boolean = (i + 1) <= numOfBufferLinesToPassThrough

            const belongsToBuffer: number = nearestBufferOnLeft + (i * this.bufferSize)
            const offset: number = isFirstOne ? offsetFromBufferOnLeft : 0
            const wavStartIndex: number = belongsToBuffer + offset
            const wavEndIndex: number = isLastOne ? (belongsToBuffer + this.bufferSize) : noteEndIndex
            const sampleStartIndex: number = isFirstOne ? 0 : (belongsToBuffer - nearestBufferOnLeft - offsetFromBufferOnLeft)
            const sampleEndIndex: number = sampleStartIndex + wavEndIndex - wavStartIndex
            const offsetStartIndex: number = wavStartIndex - belongsToBuffer

            if (sampleStartIndex !== sampleEndIndex) {
                ret.set(belongsToBuffer, { pianoNoteNum, velocity, sampleStartIndex, sampleEndIndex, offsetStartIndex })
            }
        }

        return ret
    }

}
