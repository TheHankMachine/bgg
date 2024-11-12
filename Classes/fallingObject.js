class FallingObject {

    settled = false;
    onSettle = () => null;

    groundPlane;

    init(x, y){
        this.groundPlane = y;

        this.img.x = x;
        const x1 = x - this.img._displayOriginX;
        const x2 = x1 + this.img.width;

        this.points = new Array(2).fill().map((e, i) => {
            return {
                x: [x1, x2][i],
                y: -10 - 30 * Math.random(),
                vy: 0
            }
        });

        UpdateList.add(this);
    }

    bounce(){
        this.points.forEach(e => {
            e.vy = - 3 - Math.random() * 2;
        });
    }

    settle(){
        this.points.forEach(e => {
            e.y = this.groundPlane;
            e.vy = 0;
        });
        this.onSettle();
    }

    update(){
        this.points.forEach(e => {
            e.vy += boomboxGravity;
            e.vy *= boomboxFriction;
            e.y += e.vy;

            if(e.y > this.groundPlane){
                e.y = this.groundPlane;
                e.vy *= -1;
            }
        });

        this.img.angle = Math.atan(
            (this.points[1].y - this.points[0].y) /
            (this.points[1].x - this.points[0].x)
        ) * 180 / Math.PI;

        this.img.y = (this.points[1].y + this.points[0].y) / 2;

        const a = this.points.every(e =>
            Math.abs(e.y - this.groundPlane) < 1 &&
            Math.abs(e.vy) < 1
        );

        if(!this.settled && a){
            this.settle();
        }

        this.settled = a;
    }

}