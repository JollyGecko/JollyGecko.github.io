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
      playbtn: '<img class="playpauseicon" src="../imgs/icons/playbtn.png" />',
      pausebtn: '<img class="playpauseicon" src="../imgs/icons/pausebtn.png" />',
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
    this.loadtrack(this.index);
    this.fullstop();
  }

  loadlisttracks(arg) {
    this.tracklist = [
      {
        name: "Long Long Man",
        artist: "Mitsuaki Imura",
        image: "../music/longman.jpeg",
        details: "Hakuhodo",
        path: "../music/ringtone.mp3",
      },
      {
        name: "Valdys' Abnegation",
        artist: "The Classical C Experience",
        image: "",
        details: "",
        path: "../music/Valdys' Abnegation.mp3",
      },
    ];

    return this.tracklist[arg];
  }

  trackdetsload() {
    this.vars.details.trackName.textContent = this.tracklist[this.index].name;
    this.vars.details.trackArtist.textContent = this.tracklist[
      this.index
    ].artist;
    this.vars.details.trackDets.textContent = this.tracklist[
      this.index
    ].details;
    this.vars.details.trackArt.style.backgroundImage =
      this.tracklist[this.index].image == ""
        ? "URL(https://upload.wikimedia.org/wikipedia/en/4/44/Treble_Clef_Barnstar.png)"
        : "url(" + this.tracklist[this.index].image + ")";

    this.vars.playing.textContent =
      "Playing " + (this.index + 1) + " OF " + this.numtracks;
  }

  resetvals() {
    this.vars.seekSlider.value = 0;
    this.vars.seekSlider.textContent = "00:00";
    this.vars.currTime.textContent = "00:00";
    this.vars.totalDur.textContent = this.track.duration.toString();
    this.vars.totalDur = this.track.duration;
  }

  loadtrack() {
    clearInterval(this.updatetimer);
    this.track.src = this.tracklist[this.index].path;
    this.track.load();
    this.trackdetsload();
    this.track.addEventListener(
      "ended",
      () => {
        this.ntrack();
      },
      false
    );
    this.updatetimer = setInterval(this.seekupdate(), 1000);
    //this.resetvals();
  }

  seekupdate() {
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
    //this.resetvals();
    this.track.state = this.pause();
  }

  ptrack() {
    this.track.state =
      this.index == 0
        ? this.fullstop()
        : (this.index--,
          this.loadtrack(),
          this.track.state ? this.play() : this.fullstop());
  }

  ntrack() {
    this.track.state =
      this.index == this.numtracks
        ? this.fullstop()
        : (this.index++,
          this.loadtrack(),
          this.track.state ? this.play() : this.fullstop());
  }

  setvolume() {
    this.track.volume = this.vars.volumeSlider.value / 100;
  }

  seekto() {
    this.track.currentTime =
      this.track.duration * (this.vars.seekSlider.value / 100);
    this.vars.currTime = this.track.currentTime;
    this.vars.totalDur = this.track.duration;
  }
}

const mplayer = new musicPlayer("wtv");
