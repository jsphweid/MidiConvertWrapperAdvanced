import { Note } from 'midiconvert'
import EventProcessor from './event-processor'
import { SingleEventMap } from './types'

describe('event processor with buffer size 1024', () => {

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
            expect(EventProcessor.processNoteIntoEvents(note).length).toBe(1)
        })

        it('should make 1 event with correct data: 1', () => {
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1000 }]])
            ])
        })

        it('should make 1 event with correct data: 2', () => {
            note = {
                midi: 48,
                time: 1024 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 300 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[1024, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 300 }]])
            ])
        })

        it('should make 1 event with correct data: 3', () => {
            note = {
                midi: 48,
                time: 3072 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 1024 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[3072, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 1024 }]])
            ])
        })

        it('should make 1 event with correct data: 4', () => {
            note = {
                midi: 48,
                time: 4095 / 44100,
                name: 'C3',
                velocity: 0.5,
                duration: 1 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[3072, { pianoNoteNum: 28, velocity: 0.5, sampleStartIndex: 0, sampleEndIndex: 1 }]])
            ])
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
            expect(EventProcessor.processNoteIntoEvents(note).length).toBe(2)
        })

        it('should make 2 events with correct data: 1', () => {
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024 }]]),
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 1500 }]])
            ])
        })

        it('should make 2 events with correct data: 2', () => {
            note = {
                midi: 60,
                time: 10 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 1500 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1014 }]]),
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1014, sampleEndIndex: 1500 }]])
            ])
        })

        it('should make 2 events with correct data: 3', () => {
            note = {
                midi: 60,
                time: 0 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 2048 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024 }]]),
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 2048 }]])
            ])
        })

        it('should make 2 events with correct data: 4', () => {
            note = {
                midi: 60,
                time: 1000 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 100 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 24 }]]),
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 24, sampleEndIndex: 100 }]])
            ])
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
            expect(EventProcessor.processNoteIntoEvents(note).length).toBe(3)
        })

        it('should make 3 events with correct data: 1', () => {
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[0, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 1024 }]]),
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1024, sampleEndIndex: 2048 }]]),
                new Map([[2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 2048, sampleEndIndex: 2500 }]])
            ])
        })

        it('should make 3 events with correct data: 2', () => {
            note = {
                midi: 60,
                time: 2000 / 44100,
                name: 'C4',
                velocity: 1,
                duration: 2000 / 44100
            }
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 48 }]]),
                new Map([[2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 48, sampleEndIndex: 1072 }]]),
                new Map([[3072, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1072, sampleEndIndex: 2000 }]])
            ])
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
            const events: SingleEventMap[] = EventProcessor.processNoteIntoEvents(note)
            expect(events).toEqual([
                new Map([[1024, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 0, sampleEndIndex: 4 }]]),
                new Map([[2048, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 4, sampleEndIndex: 1028 }]]),
                new Map([[3072, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 1028, sampleEndIndex: 2052 }]]),
                new Map([[4096, { pianoNoteNum: 40, velocity: 1, sampleStartIndex: 2052, sampleEndIndex: 3000 }]])
            ])
        })

    })


})
