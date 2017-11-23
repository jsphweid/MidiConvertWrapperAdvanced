export interface EventType {
    pianoNoteNum: number
    velocity: number
    sampleStartIndex: number
    sampleEndIndex: number
    offsetStartIndex: number
}

export type SingleEventsMap = Map<number, EventType>

