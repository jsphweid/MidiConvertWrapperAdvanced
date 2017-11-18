import { Note } from 'midiconvert'
import { SingleEventMap } from './types'
import { BUFFER_SIZE, SAMPLING_RATE } from './constants'

export default class EventProcessor {

    static processNoteIntoEvents(note: Note): SingleEventMap[] {
        const pianoNoteNum: number = note.midi - 20
        const velocity: number = note.velocity
        const noteStartIndex: number = Math.floor(note.time * SAMPLING_RATE)
        const durationInSamples: number = Math.floor(note.duration * SAMPLING_RATE)

        const nearestBufferOnLeft: number = Math.floor(noteStartIndex / BUFFER_SIZE) * BUFFER_SIZE
        const offsetFromBufferOnLeft: number = noteStartIndex - nearestBufferOnLeft
        const noteEndIndex: number = noteStartIndex + durationInSamples
        const numOfBufferLinesToPassThrough: number = Math.floor((offsetFromBufferOnLeft + durationInSamples) / BUFFER_SIZE)

        const ret: SingleEventMap[] = []

        for (let i = 0; i <= numOfBufferLinesToPassThrough; i++) {
            const isFirstOne: boolean = i === 0
            const isLastOne: boolean = (i + 1) <= numOfBufferLinesToPassThrough

            const belongsToBuffer: number = nearestBufferOnLeft + (i * BUFFER_SIZE)
            const offset: number = isFirstOne ? offsetFromBufferOnLeft : 0
            const wavStartIndex: number = belongsToBuffer + offset
            const wavEndIndex: number = isLastOne ? (belongsToBuffer + BUFFER_SIZE) : noteEndIndex
            const sampleStartIndex: number = isFirstOne ? 0 : (belongsToBuffer - nearestBufferOnLeft - offsetFromBufferOnLeft)
            const sampleEndIndex: number = sampleStartIndex + wavEndIndex - wavStartIndex

            if (sampleStartIndex !== sampleEndIndex) {
                ret.push(new Map([[belongsToBuffer, { pianoNoteNum, velocity, sampleStartIndex, sampleEndIndex }]]))
            }
        }


        return ret
    }

}