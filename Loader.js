const files = [
    {
        Data: ["json"],
        Util: ["phaser.min", "UpdateList"],//, "Text", "BlurBuffer"],
        Classes: ["boombox", "tracks", "song"],
        Game: ["Scene", "Input", "Game"]
    },
    "Start"
];

let fileQueue = [];
function recursiveFileLoader(p, path = ""){p.forEach(e => {if(typeof e == "object"){Object.keys(e).forEach(a => recursiveFileLoader(e[a], path + a + "/"));}else{fileQueue.push(path + e);}});}

recursiveFileLoader(files);

fileQueue.forEach(name => {
    let e = document.createElement('script');

    e.src = name + ".js";
    e.async = false; 

    document.body.appendChild(e);
});