class sysVars {
  constructor() {
    this.playing = document.querySelector(".playing"); // playing is a class in the html file
    this.details = {
      trackArt: document.querySelector(".trackArt"),
      trackName: document.querySelector(".trackName"),
      trackArtist: document.querySelector(".trackArtist"),
      trackDets: document.querySelector(".trackDets"),
    };
    this.playpause_btn = {
      query: document.querySelector(".playpause_btn"),
      playbtn: '<img class="playpauseicon" src="./icons/playbtn.png" />',
      pausebtn: '<img class="playpauseicon" src="./icons/pausebtn.png" />',
    };
    this.ntrack_btn = {
      query: document.querySelector(".ntrack_btn"),
      ntrackbtn: 1,
    };
    this.ptrack_btn = document.querySelector(".ptrack_btn");
    this.fullstop_btn = document.querySelector(".fullstop_btn");
    this.seekSlider = document.querySelector(".seekSlider");
    this.volumeSlider = document.querySelector(".volumeSlider");
    this.currTime = document.querySelector(".currTime");
    this.totalDur = document.querySelector(".totalDur");
  }
}

class musicPlayer {
  constructor(flocal) {
    this.track = document.createElement("audio");
    this.track.src = this.loadlisttracks(flocal);
    this.track.state = false;
    this.track.volume = 1;
    this.index = 0;
    this.updatetimer = 0;
    this.vars = new sysVars();
    this.numtracks = this.tracklist.length;
    //this.setvolume();
    this.loadtrack(this.index);
    this.fullstop();
  }

  loadlisttracks(arg) {
    this.tracklist = [
      {
        name: "Long Long Man",
        artist: "Mitsuaki Imura",
        image: "./song/longman.jpeg",
        details: "Hakuhodo",
        path: "./song/ringtone.mp3",
      },
      {
        name: "Mantee 5 (sample)",
        artist: "The Classical C Experience",
        image: "",
        details: "",
        path: "./song/Mantee 5 sample.mp3",
      },
    ];

    return this.tracklist[arg];
  }

  trackdetsload(num) {
    this.vars.details.trackName.textContent = this.tracklist[num].name;
    this.vars.details.trackArtist.textContent = this.tracklist[num].artist;
    this.vars.details.trackDets.textContent = this.tracklist[num].details;
    this.vars.details.trackArt.style.backgroundImage =
      this.tracklist[num].image == ""
        ? "URL(https://upload.wikimedia.org/wikipedia/en/4/44/Treble_Clef_Barnstar.png)"
        : "url(" + this.tracklist[num].image + ")";

    this.vars.playing.textContent =
      "PLAYING " + (num + 1) + " OF " + this.numtracks;
  }

  /* seekupdate() {
    if (!isNaN(this.track.duration)) {
      //NaN is not-a-number
      this.vars.seekSlider.value =
        this.track.currentTime * (100 / this.track.duration);

      let cm = Math.floor(this.track.currentTime / 60);
      let cs = Math.floor(this.track.currentTime - cm * 60);
      let dm = Math.floor(this.track.duration / 60);
      let ds = Math.floor(this.track.duration - dm * 60);

      cs = cs < 10 ? "0" + cs : cs;
      ds = ds < 10 ? "0" + ds : ds;
      cm = cm < 10 ? "0" + cm : cm;
      dm = dm < 10 ? "0" + dm : dm;

      this.track.currentTime.textContent = cm + ":" + cs;
      this.vars.totalDur = dm + ":" + ds;
    }
  } */

  loadtrack(num) {
    clearInterval(this.updatetimer);
    this.track.src = this.tracklist[num].path;
    this.track.load();
    this.trackdetsload(num);
    this.track.addEventListener("ended", this);
    this.updatetimer = setInterval(this.seekupdate, 1000);
    //this.vars.seekSlider.value = 0;
  }

  pause() {
    this.track.pause();
    this.vars.playpause_btn.query.innerHTML = this.vars.playpause_btn.playbtn;
    return false;
  }

  play() {
    this.track.play();
    this.vars.playpause_btn.query.innerHTML = this.vars.playpause_btn.pausebtn;
    return true;
  }

  playpause() {
    this.track.state = this.track.state ? this.pause() : this.play();
  }

  fullstop() {
    this.track.currentTime = 0;
    this.track.state = false;
    this.vars.playpause_btn.query.innerHTML = this.vars.playpause_btn.playbtn;
    return this.track.pause();
  }

  ptrack() {
    this.state =
      this.index == 0
        ? this.fullstop()
        : (this.index--, this.loadtrack(this.index), this.play());
  }

  ntrack() {
    this.index == this.numtracks
      ? this.fullstop()
      : (this.index++, this.loadtrack(this.index), this.play());
  }

  setvolume() {
    this.track.volume = this.vars.volumeSlider.value / 100;
  }

  seekto() {
    this.track.currentTime =
      this.track.duration * (this.vars.seekSlider.value / 100);
  }
}

const mplayer = new musicPlayer("wtv");
