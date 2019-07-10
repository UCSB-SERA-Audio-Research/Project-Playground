// ffmpeg -i note.wav -filter:a "atempo=0.5" -b:a 320K test.wav
// start processing when the file is uploaded.
window.onload = () => {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}
// use custom error functions.
function handleError(err) {
    throw new Error(err);
}

function handleFileSelect(event) {
    var fileByteArray; // The byte array of the input video.
    var filename;
    try{
        console.log(document.getElementById('fileInput').files[0]); // the source file
        filename=document.getElementById('fileInput').files[0].name;
        filename=filename.replace(/ /gi,"_");
        console.log(filename);
    }catch (err) {
        handleError(err);
    }
    const reader = new FileReader();
    reader.onerror = error => reject(error);
    reader.onload = data => {
        try {
            console.log(data);
            fileByteArray = new Uint8Array(data.target.result); // convert the data to a Uint8Array.
            window.promptBackup = window.prompt; //back up the prompt function.
            window.prompt = () => {}; // disable the prompt function.
            // use ffmpeg to separate audio from video.
            var results = ffmpeg_run({
                arguments: ("-i "+filename+" -filter:a atempo=0.5 -b:a 320K out.wav").split(" "),
                files: [
                    {
                        data: fileByteArray,
                        name: filename
                    }
                ]
            });
            var file = results[0]; // get the output audio file. 
            var bytes = new Uint8Array(file.data); // pass your byte response to this constructor
            var blob = new Blob([bytes], { type: filename.split(".").pop() });// change resultByte to bytes
            // download the file.
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "test-"+filename;
            link.click();
        }catch (err) {   
            handleError(err);
        }
    };
    reader.readAsArrayBuffer(document.getElementById('fileInput').files[0]); // read the file.

}