var players = [];
var positionMaxLength = 100;

function Player(type){
    this.name = "";
    this.states = [];
    this.xPositions = [];
    this.yPositions = [];
}

function playerUpdatePosition(player, rect){
    player.xPositions[player.xPositions.length] = rect.x;
    player.yPositions[player.yPositions.length] = rect.y;
    if (player.xPositions.length > positionMaxLength){
        player.xPositions.splice(0, 1);
        player.yPositions.splice(0, 1);
    }
}

function checkColorInBounds(r1, g1, b1, r2, g2, b2, leniency){
    return (Math.abs(r1 - r2) < leniency && math.abs(g1 - g2) < leniency && Math.abs(b1 - b2) < leniency);
}

function determinePlayer(rect){
    for (var i = 0; i < players.length; i++){
        
    }
}