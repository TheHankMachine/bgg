class Input {

    enabled = false;
    focused = false;

    constructor(){
        this.text = scene.add.text(10, 10, "-").setOrigin(0, 0);

        this.keyListener = scene.input.keyboard.on('keydown', event => {
            this.focused = true;
            if(!this.enabled) return;

            const key = event.key;

            if(key == "Backspace"){
                this.text.text = this.text.text.slice(0, -1);
            }else if(key.length == 1){
                this.text.text += event.key;
            }
        });

//        this.mouseListener = scene.input.on('pointerdown', event => {
//            console.log(event);
//        });
    }

    getMouseLoc(){
        return {
            x: game.input.x,
            y: game.input.y
        };
    }

}

// const keyboardControllScheme = [
//     {
//         rotate: "E", left: "S", down: "D", right: "F", drop: "Z", hold: "A", altRotate: "Q"
//     },
//     {
//         rotate: "UP", left: "LEFT", down: "DOWN", right: "RIGHT", drop: "SPACE", hold: "C", altRotate: "Z"
//     },
//     {
//         rotate: "UP", left: "LEFT", down: "DOWN", right: "RIGHT", drop: 190, hold: 188, altRotate: "M"
//     }
// ];

// var keyboard = new Array(keyboardControllScheme.length).fill().map(e => new Object);
// var keyRefCounter = new Array(Object.keys(keyboardControllScheme[0]).length).fill().map(e => new Object);

// function isDown(port, input){
//     let down = false;
//     down = keyboard[port][input].isDown;
    
//     if(!down) keyRefCounter[port][input] = 0;
//     else keyRefCounter[port][input]++;

//     return down;
// }

// function isHit(port, input){
//     isDown(port, input);
//     return keyRefCounter[port][input] == 1;
// }

// function isPressed(port, input, repeat = 12, delay = 2){
//     return isHit(port, input) || (keyRefCounter[port][input] > repeat && keyRefCounter[port][input] % delay == 0)
// }