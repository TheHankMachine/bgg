const numStrikes = 3;

class Cross extends FallingObject {

    constructor(index){
        super();

        this.img = scene.add.image(0, 0, 'cross');
        this.img.setFrame(Math.floor(Math.random() * 3));

        this.init(
            scene.width * 0.5 + 30 * (index - (numStrikes - 1) / 2),
            77
        );
    }


}