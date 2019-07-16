// ffmpeg -i note.wav -filter:a atempo=0.5 -b:a 320K test.wav
// ffmpeg -i note.wav -af asetrate=44100*1/2,atempo=1/2 test.wav
//https://superuser.com/questions/292833/how-to-change-audio-frequency
// start processing when the file is uploaded.
window.onload = () => {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

var offlineAudioContext = new (window.OfflineAudioContext)(2, 44100 * 180, 44100);
var audioContext = new AudioContext();
var sources = [];
function handleFileSelect(event) {
    var fileByteArray;
    Array.from(document.getElementById('fileInput').files).forEach(item => {
        var reader = new FileReader();
        reader.onerror = error => reject(error);
        reader.onload = data => {
            audioContext.decodeAudioData(data.target.result).then(audioBuffer => {
                var source = offlineAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(offlineAudioContext.destination);
                sources.push(source);
            });
        };
        reader.readAsArrayBuffer(item); // read the file.
    });
}

function process() {
    sources.forEach(item=>{
        console.log(item);
        item.start(10);
    });
    offlineAudioContext.startRendering().then(function (renderedBuffer) {
        var blob = new Blob([new Uint8Array(audioBufferToWav(renderedBuffer))], { type: "wav" });
        console.log(blob);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "rendered.wav";
        link.click();
    });
}