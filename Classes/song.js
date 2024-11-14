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

        this.audio = new Audio(this.url);
    }

    setClip(start, duration){
        this.clipStart = start;
        this.clipDuration = duration;
    }

    async setRandomClip(duration = 1, startPercentile = 0){
        await this.load();

        const range = this.getDuration() - duration;
        this.clipStart = Math.random() * startPercentile * range;
        this.clipDuration = duration;

        this.audio.currentTime = this.clipStart;
        this.audio.volume = 0;
        await this.audio.play();
        await new Promise(r => setTimeout(r, this.clipDuration * 1_000));
        this.audio.pause();
        this.audio.volume = 1;
        console.log('finihsed ')
    }

    async load(){
        // janky hack to wait for the audio to load
        await this.audio.play();
        this.audio.pause();

        this.loaded = true;
    }

    async play(){
        this.playingId++;
        let id = this.playingId;

        this.audio.pause();
//        this.audio.fastSeek(this.clipStart);
        this.audio.currentTime = this.clipStart;

        this.audio.onplay = async () => {
//            if(id != this.playingId) return;
//            id = this.playingId;

            await new Promise(r => setTimeout(r, this.clipDuration * 1_000));
            if(id != this.playingId) return;

            this.audio.pause();
        }

        await this.audio.play();
//        console.log(this.audio.readyState);
//
//
//        if(id != this.playingId) return;
//
//        this.playingId++;
//        id = this.playingId;
//
//        await new Promise(r => setTimeout(r, this.clipDuration * 1_000));
//
//        if(id != this.playingId) return;
//
//        this.audio.pause();
    }

    stop(){
        this.playingId++;
        this.audio.pause();
    }

    getDuration(){
        return this.audio.duration;
    }

}