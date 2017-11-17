# MidiConvertWrapper
Simple wrapper over MidiConvert project to use simply via command line

## To use

The build artifacts are committed in the build/ to make it easy to copy and use if that's all you want.

All the dependencies are bundled so all you need is node.

To use, run `node MidiConvertWrapper.js [file] [destination]`

The [destination] argument is optional. If it is not provided, a file will be created alongside the location of [file].

## To Develop

It's pretty simple -> clone project and get to work.

Develop: `npm run start`

Build: `npm run build`

## TODO

Write tests to make sure it throws the right errors?
