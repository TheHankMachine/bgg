const boomboxFriction = 0.90;
const boomboxGravity = 1;
const boomboxGroundPlane = 153;

class Boombox extends FallingObject{

    constructor(){
        super();

        this.img = scene.add.image(0, 0, 'boombox').setOrigin(0.5, 1);

        this.init(scene.width / 2, 153);


//                new Cassette();

//        UpdateList.add(this);
    }

//    bounce(){
//        this.c.forEach(e => {
//            e.vy = - 3 - Math.random() * 2;
//        });
//    }

//    update(){
//        this.c.forEach(e => {
//            e.vy += boomboxGravity;
//            e.vy *= boomboxFriction;
//            e.y += e.vy;
//
//            if(e.y > boomboxGroundPlane){
//                e.y = boomboxGroundPlane;
//                e.vy *= -1;
//            }
//        });
//
//        this.img.angle = Math.atan(
//            (this.c[1].y - this.c[0].y) /
//            (this.c[1].x - this.c[0].x)
//        ) * 180 / Math.PI;
//
//        this.img.y = (this.c[1].y + this.c[0].y) / 2;
//    }

}