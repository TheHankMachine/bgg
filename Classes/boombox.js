class Boombox {

    constructor(){
        const x = scene.width * 0.5;
        const y = scene.height * 0.5;

        const w = 340;
        const h = 140;

        scene.add.rectangle(
            x, y, w, h, 0x0ff0ff0
        );

        scene.add.rectangle(
            x - w / 2, y,
            117, h, 0xff0000
        ).setOrigin(0, 0.5);

        scene.add.rectangle(
            x + w / 2, y,
            117, h, 0xff0000
        ).setOrigin(1, 0.5);

        scene.add.rectangle(
            x, y + h / 2,
            100, 60, 0xf0f0f0
        ).setOrigin(0.5, 1);


    }


}