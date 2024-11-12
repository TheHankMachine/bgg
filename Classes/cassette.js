class Cassette extends FallingObject{

    constructor(x){
        super();

        this.img = scene.add.image(0, 0, 'cassette').setOrigin(0.5, 1);

        this.img.setFrame(Math.floor(Math.random() * 12));

        this.init(scene.width / 2, 129);
    }

}