export interface EventType {
    pianoNoteNum: number
    velocity: number
    sampleStartIndex: number
    sampleEndIndex: number
    wavStartIndex: number
}

export type SingleEventsMap = Map<number, EventType>

