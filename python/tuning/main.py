import os
import pydub
from pydub import AudioSegment
from pydub.playback import play


cwd = os.getcwd()

wavepath = "../note.wav"

sound = AudioSegment.from_file(wavepath, format="wav")

play(sound)
print(sound.frame_rate)

# shift the pitch down by half an octave (speed will decrease proportionally)
octaves = float(2)

new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))

lowpitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})

#Play pitch changed sound
play(lowpitch_sound)
lowpitch_sound.export("test.wav", format="wav")