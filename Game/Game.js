class Game {
    constructor(){
        scene.inputInstance.enterFunc = (text) => this.onSubmit(text);

        this.tracks = new Tracks();
        this.boombox = new Boombox();

        clickListeners.push({
            obj: this.boombox.img,
            onClick: () => this.onClick()
        });

        this.text = scene.add.text(scene.width * 0.5, scene.height * 0.9, "").setOrigin(0.5, 0.5);

        UpdateList.add(this);
    }

    onClick(){
        const song = this.tracks.current;
        if(song == null) return;

        song.setClip(0, 5);
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
        const raw = scene.inputInstance.text.text.trim();
        if(raw.length == 0){
            this.text.text = "";
            return;
        }

//        const sorted = songData.title.map(e => [textSimilarity(raw, e), e]).sort((a, b) => b[0] - a[0]).map(e => e[1])

        const guess = this.matchGuess(raw);
        this.text.text = guess;

    }

    onSubmit(text){
        this.tracks.current?.stop();

        const raw = scene.inputInstance.text.text.trim();
        if(raw.length == 0) return;

        const correct = this.matchGuess(raw) == this.tracks.current.title;

        if(correct){
            this.tracks.next();
        }else{
            this.boombox.bounce();
        }
    }
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