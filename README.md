# MidiConvertWrapperAdvanced
The intention in this project is to make a simple file processor that turns midi files into JSON files that can be streamed in real time by python / c++, caressed in real-time to inputs and labels for my model.

Some useful commands:
 - `npm run start` - webpacks the money file to build/ and watches for changes in src/
 - `npm run build` - basically the same as above but doesn't watch for changes
 - `npm run test` - runs all linting and tests once
 - `npm run test:dev` - runs only the tests but in watch mode

To use, cd into build/ directory and call like this:
```
node MidiConvertWrapperAdvanced.js /path/to/midi/file.mid /path/to/desired/json/output.json 1024 44100
```

The 4 required arguments are:
 1. midi input file path
 2. json output file path
 3. buffer size
 4. sampling rate

The json generated looks like this:
```
{
  "104448": [
    {
      "pianoNoteNum": 27,
      "velocity": 0.77952755905512,
      "sampleStartIndex": 9949,
      "sampleEndIndex": 10973,
      "offsetStartIndex": 0
    }
  ],
  "105472": [
    {
      "pianoNoteNum": 27,
      "velocity": 0.77952755905512,
      "sampleStartIndex": 10973,
      "sampleEndIndex": 11997,
      "offsetStartIndex": 0
    }
  ],
  "106496": [
    {
      "pianoNoteNum": 27,
      "velocity": 0.77952755905512,
      "sampleStartIndex": 11997,
      "sampleEndIndex": 13021,
      "offsetStartIndex": 0
    },
    {
      "pianoNoteNum": 31,
      "velocity": 0.47244094488189,
      "sampleStartIndex": 0,
      "sampleEndIndex": 106,
      "offsetStartIndex": 918
    },
    {
      "pianoNoteNum": 18,
      "velocity": 0.78740157480315,
      "sampleStartIndex": 0,
      "sampleEndIndex": 106,
      "offsetStartIndex": 918
    }
  ],
  "107520": [
    {
      "pianoNoteNum": 27,
      "velocity": 0.77952755905512,
      "sampleStartIndex": 13021,
      "sampleEndIndex": 14045,
      "offsetStartIndex": 0
    },
    {
      "pianoNoteNum": 31,
      "velocity": 0.47244094488189,
      "sampleStartIndex": 106,
      "sampleEndIndex": 1130,
      "offsetStartIndex": 0
    },
    {
      "pianoNoteNum": 18,
      "velocity": 0.78740157480315,
      "sampleStartIndex": 106,
      "sampleEndIndex": 1130,
      "offsetStartIndex": 0
    }
  ]
}
```
The key is the buffer and the value is the array of events.

Eventually delete:
```
"jsmidgen": "^0.1.5",
"midi-file-parser": "^1.0.0",
```
on resolution of this issue:
https://github.com/Tonejs/MidiConvert/issues/44


#TODO
 - handle files with spaces in them (change to dashes or something)
