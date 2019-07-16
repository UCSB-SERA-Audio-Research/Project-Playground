//https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications

function readMIDI(raw){
    console.log(raw);
    var midi={
        meta:{
            signature: (raw.track[0].event.find(item=>{
                return item.metaType==88;
            })||{data:undefined}).data,
            bpm: 60000000/(raw.track[0].event.find(item=>{
                return item.metaType==81;
            })||{data:500000}).data,
            division: raw.timeDivision
        },
        notes:(()=>{
            var timeline=raw.track[1].event;
            var sequence=[];
            timeline.filter(item=>{
                return item.type<=0x9;
            }).forEach(item=>{
                sequence.push({
                    time: item.deltaTime,
                    type: item.type,
                    data: item.data
                });
            });
            return sequence;
        })()
    };
    console.log(midi);
    var tickLength;
    if(midi.meta.division&0x8000==0){
        var ticksPerBeat=midi.meta.division&0x7FFF;
        tickLength=1/((midi.meta.bpm*ticksPerBeat)/60);
    }else{
        var framesPerSecond=midi.meta.division&0x7FFF;
        var SMPTE=midi.meta.division&0x7F00;
        SMPTE=(SMPTE==29?29.97:SMPTE);
        var ticksPerFrame=midi.meta.division&0x00FF;
        tickLength=1/ticksPerFrame*SMPTE;
    }
    var total=0;
    midi.notes.forEach(note=>{
        total+=tickLength*note.time;
        setTimeout(()=>{
            console.log(notes[note.data[0]-21], (note.type==9?"on":"off"));
        },total);
    });
}

