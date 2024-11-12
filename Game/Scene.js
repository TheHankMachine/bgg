var scene;

const palette = {
    white1:     0xfaf6e9,
    white2:     0xf8ddad,
    tone1:      0xf1bd60,
    tone2:      0x903e30,
    black1:     0x221e22,
    black2:     0x4b3a36,
    black3:     0x735649
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

        textConfig = {
            align: "center",
            wordWrap: { width: scene.width }
        }

        this.width = config.width;
        this.height = config.height;

        this.load.image('boombox', 'https://raw.githubusercontent.com/TheHankMachine/bgg/refs/heads/main/Assets/boombox.png');
        this.load.image('cassettecover', 'https://raw.githubusercontent.com/TheHankMachine/bgg/refs/heads/main/Assets/cassettecover.png');

        this.load.spritesheet(
            'cassette',
            'https://raw.githubusercontent.com/TheHankMachine/bgg/refs/heads/main/Assets/cassette.png',
            {
                frameWidth: 27,
                frameHeight: 18
            }
        );

//      "https://raw.githubusercontent.com/TheHankMachine/bgg/refs/heads/main/Assets/boombox8colours.png"

//        initInput();
    }

    create(){
        this.inputInstance = new Input();
//        BlurBuffer.init();

        this.text = scene.add.text(this.width * 0.5, this.height * 0.5, "press any key to start").setOrigin(0.5, 0.5);
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
    // parent: 'phaser-example',
    
    backgroundColor: palette.black1,

    scene: Scene,

    antialias: false,

};