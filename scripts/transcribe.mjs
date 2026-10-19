import { pipeline } from '@huggingface/transformers';
import { readFileSync } from 'fs';

const audioPath = process.argv[2] || 'C:/Users/ABDULA~1/AppData/Local/Temp/claude/whisper-input.wav';

function readWav(path) {
  const buf = readFileSync(path);
  const dataOffset = buf.indexOf('data') + 8;
  const pcm = new Int16Array(buf.buffer, buf.byteOffset + dataOffset, (buf.length - dataOffset) / 2);
  const float32 = new Float32Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) {
    float32[i] = pcm[i] / 32768;
  }
  return float32;
}

console.log('Reading audio...');
const audioData = readWav(audioPath);
console.log(`Audio: ${audioData.length} samples (${(audioData.length / 16000).toFixed(1)}s)`);

console.log('Loading whisper-tiny model...');
const transcriber = await pipeline(
  'automatic-speech-recognition',
  'onnx-community/whisper-small',
  { dtype: 'q8' }
);

console.log('Transcribing...');
const result = await transcriber(audioData, {
  task: 'transcribe',
  chunk_length_s: 30,
  stride_length_s: 5,
  sampling_rate: 16000,
});

console.log('\n=== TRANSCRIPT ===');
console.log(result.text);
