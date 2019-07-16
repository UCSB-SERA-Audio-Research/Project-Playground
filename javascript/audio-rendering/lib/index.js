// ffmpeg -i note.wav -filter:a atempo=0.5 -b:a 320K test.wav
// ffmpeg -i note.wav -af asetrate=44100*1/2,atempo=1/2 test.wav
//https://superuser.com/questions/292833/how-to-change-audio-frequency
// start processing when the file is uploaded.
window.onload = () => {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

var audioContext = new (window.OfflineAudioContext)(2, 44100 * 40, 44100);
var sources = [];
function handleFileSelect(event) {
    var fileByteArray;
    var filename;
    filename = document.getElementById('fileInput').files[0].name;
    filename = filename.replace(/ /gi, "_");
    reader = new FileReader();
    reader.onerror = error => reject(error);
    reader.onload = data => {
        decode(data.target.result).then(audioBuffer => {
            var source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            sources.push(source);
            if (sources.length == 2) {
                audioContext.startRendering().then(function (renderedBuffer) {
                    var blob = new Blob([new Uint8Array(audioBufferToWav(renderedBuffer))], { type: "wav"});// change resultByte to bytes
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "rendered.wav";
                    link.click();
                });
            } else {
                alert("Select one more file!");
            }
        });
    };
    reader.readAsArrayBuffer(document.getElementById('fileInput').files[0]); // read the file.
}