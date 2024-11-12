const boomboxFriction = 0.90;
const boomboxGravity = 1;
const boomboxGroundPlane = 153;

class Boombox {

    constructor(){
        this.c = new Array(2).fill().map((e, i) => {
            return {
                x: scene.width * 0.5 + (i - 0.5) * 125,
                y: -10 - 30 * Math.random(),
                vy: 0,
            };
        });

        this.img = scene.add.image(scene.width * 0.5, 0, 'cassette').setOrigin(0.5, 1);

        UpdateList.add(this);
    }

    bounce(){
        this.c.forEach(e => {
            e.vy = - 3 - Math.random() * 2;
        });
    }

    update(){
        this.c.forEach(e => {
            e.vy += boomboxGravity;
            e.vy *= boomboxFriction;
            e.y += e.vy;

            if(e.y > boomboxGroundPlane){
                e.y = boomboxGroundPlane;
                e.vy *= -1;
            }
        });

        this.img.angle = Math.atan(
            (this.c[1].y - this.c[0].y) /
            (this.c[1].x - this.c[0].x)
        ) * 180 / Math.PI;

        this.img.y = (this.c[1].y + this.c[0].y) / 2;
    }

}