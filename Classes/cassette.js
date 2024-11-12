class Cassette extends FallingObject{

    constructor(x){
        super();

        this.img = scene.add.image(0, 0, 'cassette').setOrigin(0.5, 1);

        this.img.setFrame(Math.floor(Math.random() * 12));

        this.init(scene.width / 2, boomBoxY - 24);
    }

    async remove(){
        this.boomboxGravity = -1;

        await new Promise(r => setTimeout(r, 1_000));

        this.img.destroy();

        UpdateList.remove(this);
    }

}