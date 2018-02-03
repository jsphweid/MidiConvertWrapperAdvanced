fileName="MidiConvertWrapperAdvanced.js"
bucketName="piano-learning-stream"
aws s3 rm s3://${bucketName}/scripts/${fileName}
aws s3 cp ./build/${fileName} s3://${bucketName}/scripts/${fileName}