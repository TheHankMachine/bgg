const boomboxFriction = 0.90;
const boomboxGravity = 1;
const boomboxGroundPlane = 150;

class Boombox {

    constructor(){
        const x = scene.width * 0.5;

        this.c = new Array(2).fill().map((e, i) => {
            const a = scene.add.circle(x + (i - 0.5) * 125, -10 -Math.random() * 70, 5, 0xffffff);
            a.vy = 0;
            return a;
        });


        this.img = scene.add.image(x, 0, 'boombox').setOrigin(0.5, 1);
//
//        this.img.angle = 10;

        UpdateList.add(this);
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

//        this.c1.vy += 0.5;
//        this.c2.vy += 0.5;
//
//        this.c1.vy *= 0.98;
//        this.c2.vy *= 0.98;
//
//        this.c1.y += this.c1.vy;
//        this.c2.y += this.c2.vy;
    }

}