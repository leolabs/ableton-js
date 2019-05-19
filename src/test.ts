import { Ableton } from ".";

const ab = new Ableton();

const test = async () => {
  console.log(await ab.sendCommand("song", "get_cue_points"));
  console.log("Cue:", await ab.song.jumpToCue(156));
  ab.song.addListener("is_playing", data => console.log("Playing:", data));
  ab.song.addListener("metronome", data => console.log("Metronome:", data));
};

test();
