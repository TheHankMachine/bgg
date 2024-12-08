var scene;
var debug;

const palette = {
    dark:       0x543344,
    blue1:      0x515262,
//    white2:     0xf8ddad,
//    tone1:      0xf1bd60,
//    tone2:      0x903e30,
//    black1:     0x221e22,
//    black2:     0x4b3a36,
//    black3:     0x735649
}

const depths = {
    background: -1,
    hitbox: 1,
    player: 2,
    UI: 3
}

var textConfig;

class Scene extends Phaser.Scene{

    gameInstance = null;

    constructor(){
        super();
    }

    preload(){
        scene = this;

        this.width = config.width;
        this.height = config.height;

        const url = "https://raw.githubusercontent.com/TheHankMachine/bgg/refs/heads/main/Assets/"

        this.load.image('boombox', url + 'boombox.png');
        this.load.image('cassettecover', url + 'cassettecover.png');
        this.load.image('gameover', url + 'gameover.png');

        this.load.spritesheet('cassette', url + 'cassette.png', {frameWidth: 27, frameHeight: 18});
        this.load.spritesheet('cross', url +'cross.png', {frameWidth: 18, frameHeight: 18});

        textConfig = {
            align: "center",

//            font: '"Press Start 2P"',
//            fontSize: "32px",
            fontFamily: 'Courier',
            fontSize: 12,

            wordWrap: { width: scene.width * 0.85 },
//            strokeThickness: 1,
//            color: "#c9cca1"
            color: "#cca",
//            stroke: '#cca'
        }

//        initInput();
    }

    create(){
        this.inputInstance = new Input();
//        BlurBuffer.init();

        scene.add.rectangle(1, 151, 254, 93, palette.dark).setOrigin(0, 0).setDepth(-1);

        this.text = scene.add.text(this.width * 0.5, this.height * 0.5, "press any key to start").setOrigin(0.5, 0.5);
        debug = scene.add.text(0, 0, "", {
//            fontSize: 32,
//            font: 'Arial',
            align: "left",
            ...textConfig
        }).setOrigin(0, 0);
    }

    update(){
        if(this.gameInstance == null){
            if(this.inputInstance.focused){
                this.gameInstance = new Game();
                this.text.destroy();
            }
            return;
        }

//        if (!this.input.mouse.locked) {
//            this.text.setVisible(true);
//            return;
//        }
        UpdateList.update();
//        this.text.setVisible(false);
    }

}

const config = {
    width: 256,
    height: 224,
    type: Phaser.WEBGL,
    
    backgroundColor: palette.blue1,

    scene: Scene,

    antialias: false,

};