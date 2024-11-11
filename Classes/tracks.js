const trackBuffer = 3;

class Tracks {

    current = null;
    buffer = [];

    constructor(){
        const n = songData.title.length;
        this.songOrder = new Array(n).fill().map((_, i) => [Math.random(), i]).sort((a, b) => a[0] - b[0]).map(e => e[1]);

        this.next();
    }

    async next(){
        if(this.buffer.length == 0){
            await this.loadNext();
        }else if(this.buffer.length < trackBuffer){
            this.loadNext();
        }
        this.current = this.buffer.splice(0, 1)[0];
    }

    async loadNext(){
        if(this.buffer.length >= trackBuffer) return;

        const songIndex = this.songOrder.splice(0, 1)[0];
        const song = new Song(songIndex);
        await song.load();
        this.buffer.push(song);

        // recursive async call scares me
        this.loadNext();
    }

}