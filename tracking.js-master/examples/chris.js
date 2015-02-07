function Player(type){
    this.name = "";
    this.xPositions = [];
    this.yPositions = [];
    
}

function playerUpdatePosition(player, rect){
    player.xPositions[player.xPositions.length] = rect.x;
    player.yPositions[player.yPositions.length] = rect.y;
    if (player.xPositions.length > 100){
        player.xPositions.splice(0, 1);
        player.yPositions.splice(0, 1);
    }
}

function myFoo(rect){
    console.log("Pacman is found at " + rect.x + "," + rect.y);
}

function myBar(rect){
    console.log("Ghost is found at " + rect.x + "," + rect.y);
}