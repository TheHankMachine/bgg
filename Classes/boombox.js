const boomboxFriction = 0.90;
const boomBoxY = 170;

class Boombox extends FallingObject{

    constructor(){
        super();

        this.img = scene.add.image(0, 0, 'boombox').setOrigin(0.5, 1).setDepth(0);
        this.cover = scene.add.image(0, 0, 'cassettecover').setOrigin(0.5, 1).setDepth(1);

        this.init(scene.width / 2, boomBoxY);
    }

    bounce(){
        super.bounce();
        this.cassette?.bounce();
    }

    update(){
        super.update();

        this.cover.x = this.img.x;
        this.cover.y = this.img.y;
        this.cover.angle = this.img.angle;
    }

}