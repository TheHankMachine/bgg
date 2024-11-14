const trackBuffer = 2;

class Tracks {

    current = null;
    buffer = [];

    randomCrop = {

    }

    constructor(){
        const n = songData.title.length;
        this.songOrder = new Array(n).fill().map((_, i) => [Math.random(), i]).sort((a, b) => a[0] - b[0]).map(e => e[1]);
    }

    async next(loc = 0){
        if(this.buffer.length == 0){
            await this.loadNext(loc);
        }else if(this.buffer.length < trackBuffer){
            this.loadNext(loc);
        }
        this.current = this.buffer.splice(0, 1)[0];
    }

    async loadNext(loc = 0){
        if(this.buffer.length >= trackBuffer) return;

        const songIndex = this.songOrder.splice(0, 1)[0];
        const song = new Song(songIndex);

        await song.setRandomClip(1, loc);
//        await song.load();
        this.buffer.push(song);

        // recursive async call scares me
        this.loadNext();
    }

}