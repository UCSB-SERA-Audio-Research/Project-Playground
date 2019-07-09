window.onload = () => {
    document.getElementById('fileInput').onchange=handleFileSelect;
    document.getElementById('fileInput').onclick=function(){
        this.value=null;
    };
}

function handleFileSelect() {
    console.log(document.getElementById('fileInput').files[0]);
    const reader = new FileReader();
    reader.onload = data => {
        console.log("TOGGLE!");
        // var fileByteArray = new Uint8Array(data.target.result);
        togglePlayback(data.target.result);
        /*
        decode(data.target.result).then(audioBuffer => {
        }, err => {});
        */
    };
    reader.readAsArrayBuffer(document.getElementById('fileInput').files[0]);
}
