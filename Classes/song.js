class Song {

    playingId = 0;

    loaded = false;
    audio = null;
    clipDuration = 10;

    clipStart = 0;
    clipDuration = 0;

    constructor(index){
        this.title = songData.title[index];
        this.album = songData.album_values[songData.album[index]];
        this.lead_vocal = songData.lead_vocal_values[songData.lead_vocal[index]];
        this.songwriter = songData.songwriter_values[songData.songwriter[index]];
        this.url = `https://ia${songData.url_id_values[songData.url_id[index]]}.us.archive.org/${songData.url_index_values[songData.url_index[index]]}/items/${songData.url_album_values[songData.url_album[index]]}/${songData.url_track[index]}.mp3`;
    }

    setClip(start, duration){
        this.clipStart = start;
        this.clipDuration = duration;
    }

    setRandomClip(duration = 1, startPercentile = 0){
        const range = this.getDuration() - duration;
        this.clipStart = Math.random() * startPercentile * range;
        this.clipDuration = duration;
    }

    async load(){
        this.audio = new Audio(this.url);
        // janky hack to wait for the audio to load
        await this.audio.play();
        this.audio.pause();

        this.loaded = true;
    }

    async play(){
        this.playingId++;
        const id = this.playingId;

        this.audio.pause();
        this.audio.currentTime = this.clipStart;

        await this.audio.play();
        await new Promise(r => setTimeout(r, this.clipDuration * 1_000));

        if(id != this.playingId) return;

        this.audio.pause();
    }

    getDuration(){
        return this.audio?.duration ?? null;
    }

}