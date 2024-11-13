class Game {

    stage = 0;

    constructor(){
        scene.inputInstance.enterFunc = (text) => this.onSubmit(text);

        this.tracks = new Tracks();
        this.boombox = new Boombox();

        clickListeners.push({
            obj: this.boombox.img,
            onClick: () => this.onClick()
        });

        this.next();

        this.text = scene.add.text(scene.width * 0.5, scene.height * 0.225, "", textConfig).setOrigin(0.5, 0.5);

        UpdateList.add(this);
    }

    onClick(){
        const song = this.tracks.current;
        if(song == null || this.boombox.cassette == null) return;

//        song.setClip(0, 10);

        song.play();

        this.boombox.bounce();

        scene.inputInstance.enabled = true;
    }

    matchGuess(raw){
        let maxSim = 0;
        let bestGuess = "";
        for(const candidate of songData.title){
            const sim = textSimilarity(candidate, raw);
            if(sim > maxSim){
                maxSim = sim;
                bestGuess = candidate;
            }
        }
        return bestGuess;
    }

    update(){
        debug.text =`queue buffer: ${this.tracks.buffer.length}\nclip duration: ${f(this.stage).toFixed(2)}`
//        debug.text += `\nqueue status: ${["awaiting load", "loading in background", "dormant"][Math.min(this.tracks.buffer.length, trackBuffer)]}`

        const raw = scene.inputInstance.text.text.trim();
        if(raw.length == 0){
            this.text.text = "";
            return;
        }

        const guess = this.matchGuess(raw);
        this.text.text = guess;
    }

    async next(){
        this.strikes.forEach(e => e.remove());
        this.strikes = [];

        this.boombox.cassette?.remove();
        this.boombox.cassette = null;

        this.stage++;

        const p = (1/20) * (this.stage - 1);
        console.log(p);
        await this.tracks.next(p);

//        this.duration -= 0.5;
        this.tracks.current.clipDuration = f(this.stage);

        this.boombox.cassette = new Cassette();
    }

    strikes = [];

    onSubmit(text){
        this.tracks.current?.stop();

        const raw = scene.inputInstance.text.text.trim();
        if(raw.length == 0) return;

        const correct = this.matchGuess(raw) == this.tracks.current.title;

        if(correct){
            this.next();
        }else{
            this.strikes.push(new Cross(this.strikes.length));
            this.boombox.bounce();
        }
    }
}

function f(n){
    const a = 5;
    const b = 10;

    return a * Math.exp(((1 - n) / (b - 1)) * Math.log(a));

//    const a = 5;
//    const b = 17.5;
//    return b / (n + b / a - 1);
}

function textSimilarity(a, b){
    a = a.toLowerCase().replaceAll(/\W+/g, "");
    b = b.toLowerCase().replaceAll(/\W+/g, "");

    return 1 - levenshteinDistance(a, b) / (Math.max(a.length, b.length));
}

//stolen code from the internet
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 1; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const indicator = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + indicator // substitution
            );
        }
    }
    return matrix[b.length][a.length];
}

function reveal(){
    return scene.gameInstance?.tracks.current.title;
}