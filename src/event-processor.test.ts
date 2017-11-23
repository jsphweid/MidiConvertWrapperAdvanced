import { Note } from 'midiconvert'
import EventProcessor from './event-processor'
import { SingleEventsMap } from './types'

describe('event processor with buffer size 1024 and sampling rate 44100', () => {

    const eventProcessor: EventProcessor = new EventProcessor(1024, 44100)
    let note: Note

    describe('when a note makes 1 event', () => {

        beforeEach(() => {
            note = {
                midi: 60,
                time: 0,
                name: 'C4',
                velocity: 1,
                duration: 1000 / 44100
            }
        })

        afterEach(() => {
            note = null
        })


        it('should make 1 event', () => {
            expect(eventProcessor.processNoteIntoEvents(note).size).toBe(1)
        })

        it('should make 1 event with correct data: 1', () => {
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1000, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 1 event with correct data: 2', () => {
            note = {
                midi: 48,
                time: 1024 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 300 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [1024, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 300, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 1 event with correct data: 3', () => {
            note = {
                midi: 48,
                time: 3072 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 1024 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [3072, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 1024, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 1 event with correct data: 4', () => {
            note = {
                midi: 48,
                time: 4095 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 1 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [3072, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 1, offsetStartIndex: 1023 }]
            ]))
        })


    })


    describe('when a note makes 2 events', () => {

        beforeEach(() => {
            note = {
                midi: 60,
                time: 0,
                name: 'C4',
                velocity: 1,
                duration: 1500 / 44100
            }
        })

        afterEach(() => {
            note = null
        })

        it('should make 2 events', () => {
            expect(eventProcessor.processNoteIntoEvents(note).size).toBe(2)
        })

        it('should make 2 events with correct data: 1', () => {
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024, offsetStartIndex: 0 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 1500, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 2 events with correct data: 2', () => {
            note = {
                midi: 60,
                time: 10 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 1500 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1014, offsetStartIndex: 10 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1014, sampleEndIndex: 1500, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 2 events with correct data: 3', () => {
            note = {
                midi: 60,
                time: 0 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 2048 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024, offsetStartIndex: 0 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 2048, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 2 events with correct data: 4', () => {
            note = {
                midi: 60,
                time: 1000 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 100 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 24, offsetStartIndex: 1000 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 24, sampleEndIndex: 100, offsetStartIndex: 0 }]
            ]))
        })

    })

    describe('when a note makes 3 events', () => {

        beforeEach(() => {
            note = {
                midi: 60,
                time: 0,
                name: 'C4',
                velocity: 1,
                duration: 2500 / 44100
            }
        })

        afterEach(() => {
            note = null
        })

        it('should make 3 events', () => {
            expect(eventProcessor.processNoteIntoEvents(note).size).toBe(3)
        })

        it('should make 3 events with correct data: 1', () => {
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024, offsetStartIndex: 0 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 2048, offsetStartIndex: 0 }],
                [2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 2048, sampleEndIndex: 2500, offsetStartIndex: 0 }]
            ]))
        })

        it('should make 3 events with correct data: 2', () => {
            note = {
                midi: 60,
                time: 2000 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 2000 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 48, offsetStartIndex: 976 }],
                [2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 48, sampleEndIndex: 1072, offsetStartIndex: 0 }],
                [3072, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1072, sampleEndIndex: 2000, offsetStartIndex: 0 }]
            ]))
        })

    })

    describe('when a note makes 4 events', () => {

        it('should make 4 events with correct data', () => {
            note = {
                midi: 60,
                time: 2044 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 3000 / 44100
            }
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 4, offsetStartIndex: 1020 }],
                [2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 4, sampleEndIndex: 1028, offsetStartIndex: 0 }],
                [3072, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1028, sampleEndIndex: 2052, offsetStartIndex: 0 }],
                [4096, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 2052, sampleEndIndex: 3000, offsetStartIndex: 0 }]
            ]))
        })

    })


})

describe('event processor with buffer size 512 and sampling rate 44100', () => {

    const eventProcessor: EventProcessor = new EventProcessor(512, 44100)
    let note: Note

    describe('when a note makes 3 events', () => {

        beforeEach(() => {
            note = {
                midi: 60,
                time: 500 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 800 / 44100
            }
        })

        afterEach(() => {
            note = null
        })

        it('should make 3 events', () => {
            expect(eventProcessor.processNoteIntoEvents(note).size).toBe(3)
        })

        it('should make 3 events with correct data', () => {
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 12, offsetStartIndex: 500 }],
                [512, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 12, sampleEndIndex: 524, offsetStartIndex: 0 }],
                [1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 524, sampleEndIndex: 800, offsetStartIndex: 0 }]
            ]))
        })

    })
})

describe('event processor with buffer size 20 and sampling rate 40', () => {

    const eventProcessor: EventProcessor = new EventProcessor(20, 40)
    let note: Note

    describe('when a note makes 4 events', () => {

        beforeEach(() => {
            note = {
                midi: 60,
                time: 30 / 40,
                name: 'C4',
                velocity: 1,
                duration: 55 / 40
            }
        })

        afterEach(() => {
            note = null
        })

        it('should make 4 events', () => {
            expect(eventProcessor.processNoteIntoEvents(note).size).toBe(4)
        })

        it('should make 4 events with correct data', () => {
            const events: SingleEventsMap = eventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual(new Map([
                [20, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 10, offsetStartIndex: 10 }],
                [40, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 10, sampleEndIndex: 30, offsetStartIndex: 0 }],
                [60, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 30, sampleEndIndex: 50, offsetStartIndex: 0 }],
                [80, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 50, sampleEndIndex: 55, offsetStartIndex: 0 }]
            ]))
        })

    })
})
