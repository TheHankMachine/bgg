const numBuffers = 5;

class BlurBuffer{
    static buffers = null;
    static init(){
        // this.buffer = scene.add.renderTexture(0, 0, config.width, config.height).setOrigin(0, 0);
        this.buffers = new Array(numBuffers).fill().map(e => scene.add.renderTexture(0, 0, config.width, config.height).setOrigin(0, 0).setAlpha(Math.random()));
        UpdateList.add(this);
    }
    static update(){
        let r = this.buffers.splice(this.buffers.length - 1, 1);
        r[0].clear();
        this.buffers.splice(0, 0, ...r);

        console.log("buffer")

        this.buffers.forEach((e, i) => e.setAlpha(1 - i / numBuffers))
    }
    static draw(img){
        this.buffers[0].draw(img);
    }
}