var players = [];
var positionMaxLength = 50;

function Player(type){
    this.name = "";
    this.states = [];
    this.xPositions = [];
    this.yPositions = [];
    this.timeStamps = []
}

function playerUpdatePosition(player, rect, state){
    player.xPositions[player.xPositions.length] = rect.x;
    player.yPositions[player.yPositions.length] = rect.y;
    var d = new Date();
    var time = d.getTime();
    player.timeStamps[player.timeStamps.length] = time;
    player.states[player.states.length] = state
    if (player.xPositions.length > positionMaxLength){
        player.xPositions.splice(0, 1);
        player.yPositions.splice(0, 1);
        player.timeStamps.splice(0, 1);
        player.states.splice(0, 1);
    }
    
    
}

function checkColorInBounds(r1, g1, b1, r2, g2, b2, leniency){
    return (Math.abs(r1 - r2) < leniency && Math.abs(g1 - g2) < leniency && Math.abs(b1 - b2) < leniency);
}

function determinePlayer(rect){//if needed
    for (var i = 0; i < players.length; i++){
        return;
    }
}