class Song {

//    static lastPercentile = 0;

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
//        console.time(this.title);

//        this.lastPercentile = startPercentile;

        await this.load();

        const range = this.getDuration() - duration;
        this.clipStart = Math.random() * startPercentile * range;
        this.clipDuration = duration;

        this.audio.currentTime = this.clipStart;

        await this.load();

//        console.timeEnd(this.title);
//        this.audio.volume = 0;
//        await this.audio.play();
//        await new Promise(r => setTimeout(r, this.clipDuration * 1_000));
//        this.audio.pause();
//        this.audio.volume = 1;
//        console.log('finihsed ')
    }

    async load(){

        let loaded = false;

        this.audio.onplay = async () => {
            await new Promise(r => setTimeout(r, this.clipDuration * 1_000));

            loaded = true;
        }

        await this.audio.play();

        await wait(
            () => loaded, 500
        );

        this.audio.pause();

//        console.log("finished load")


//        // janky hack to wait for the audio to load
////        this.audio.volume = 0;
//        await this.audio.play();
//
//        this.audio.onplay = () => {
//            this.audio.pause();
//        }
////        this.audio.pause();
////        this.audio.volume = 1;
////
////        this.loaded = true;
    }

    async play(){
        this.playingId++;
        let id = this.playingId;

        this.audio.pause();
//
        this.audio.currentTime = this.clipStart;
//        this.audio.volume = 1;

        let starttime = -1;
//
        this.audio.ontimeupdate = async () => {
//            if(id != this.playingId) return;
//            id = this.playingId;

            if (starttime < 0) {
                starttime = this.audio.currentTime;
                return;
            }

            if(this.audio.currentTime > starttime) {
                const elapsed = this.audio.currentTime - starttime
                console.log("playback started")

                this.audio.ontimeupdate = () => null;

//                console.log(this.audio.currentTime)
                //
//                console.log(this.clipDuration, elapsed)

                await new Promise(r => setTimeout(r, (this.clipDuration - elapsed) * 1_000));
                if(id != this.playingId) return;

                this.audio.pause();


                this.audio.ontimeupdate = () => null
            }



//            console.time("playback")

//            this.audio.ontimeupdate = () => null;



//            console.timeEnd("playback")
        }
//
        this.audio.play();
    }

    stop(){
        this.playingId++;
        this.audio.pause();
    }

    getDuration(){
        return this.audio.duration;
    }

}

async function wait(predicate, pollrate = 1_000, maxTime = 10_000){
    let time = 0;
    while(!predicate() && time > maxTime){
        await new Promise(r => setTimeout(r, pollrate));
        time += pollrate;
    }
    return time > maxTime;
}