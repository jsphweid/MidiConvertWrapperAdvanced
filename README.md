# MidiConvertWrapperAdvanced
The intention in this project is to make a simple file processor that turns midi files into JSON files that can be streamed in real time by python / c++, caressed in real-time to inputs and labels for my model.

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
