const clickListeners = [];

class Input {

    enabled = false;
    focused = false;

    enterFunc = (text) => null;

    constructor(){
        this.text = scene.add.text(scene.width * 0.5, scene.height * 0.85, "", textConfig).setOrigin(0.5, 0.5);

        let lastTimeStamp = 0;

        this.keyListener = scene.input.keyboard.on('keydown', event => {
            this.focused = true;
            if(!this.enabled) return;
            if(lastTimeStamp == event.timeStamp) return;
            lastTimeStamp = event.timeStamp;

            const key = event.key;

            if(key == "Enter"){
                this.enterFunc(this.text.text);
                this.text.text = "";
            }else if(key == "Backspace"){
                this.text.text = this.text.text.slice(0, -1);
            }else if(key.length == 1){
                this.text.text += event.key;
            }
        });

        this.mouseListener = scene.input.on('pointerdown', event => {
            for(const clickListener of clickListeners){
                const e = clickListener.obj;

                const x1 = e.x - e._displayOriginX;
                const y1 = e.y - e._displayOriginY;
                const x2 = x1 + e.width;
                const y2 = y1 + e.height;

                if(
                    event.downX > x1 && event.downX < x2 &&
                    event.downY > y1 && event.downY < y2
                ){
                    clickListener.onClick();
                }
            }
        });
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