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
  "316416": [
    {
      "pianoNoteNum": 61,
      "velocity": 0.48818897637795,
      "sampleStartIndex": 17918,
      "sampleEndIndex": 18656,
      "wavStartIndex": 316416
    },
    {
      "pianoNoteNum": 46,
      "velocity": 0.29133858267717,
      "sampleStartIndex": 17918,
      "sampleEndIndex": 18656,
      "wavStartIndex": 316416
    },
    {
      "pianoNoteNum": 49,
      "velocity": 0.35433070866142,
      "sampleStartIndex": 17918,
      "sampleEndIndex": 18656,
      "wavStartIndex": 316416
    }
  ],
  "334848": [
    {
      "pianoNoteNum": 61,
      "velocity": 0.39370078740157,
      "sampleStartIndex": 0,
      "sampleEndIndex": 62,
      "wavStartIndex": 335810
    }
  ],
  "335872": [
    {
      "pianoNoteNum": 61,
      "velocity": 0.39370078740157,
      "sampleStartIndex": 62,
      "sampleEndIndex": 1086,
      "wavStartIndex": 335872
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
