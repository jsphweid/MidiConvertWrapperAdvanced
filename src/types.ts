export interface EventType {
    pianoNoteNum: number
    velocity: number
    sampleStartIndex: number
    sampleEndIndex: number
}

export type SingleEventMap = Map<number, EventType>
export type MultipleEventMap = Map<number, EventType[]>
