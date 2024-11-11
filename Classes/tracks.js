class Tracks {

    songs = [];

    constructor(){
        const n = songData.title.length;
        this.songOrder = new Array(n).fill().map((_, i) => [Math.random(), i]).sort((a, b) => a[0] - b[0]).map(e => e[1]);

//        (async () => {
//            const song = await this.loadNext();
//            song.setRandomClip();
//            song.play();
//        })();
    }

    async loadNext(){
        const songIndex = this.songOrder.splice(0, 1)[0];
        const song = new Song(songIndex);

        this.songs.push(song);

        await song.load();

        return song;
    }

}