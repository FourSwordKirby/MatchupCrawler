var players = [];
var positionMaxLength = 50;
var inAnalysis = false;

function Player(type){
    this.name = "";
    this.states = [];
    this.xPositions = [];
    this.yPositions = [];
    this.timeStamps = []
}

function Reading(type){
    this.states = [];
    this.x = [];
    this.y = [];
    this.time = [];
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

function checkColorInBounds(RGB, r2, g2, b2, leniency){
    var r1 = RGB[0];
    var g1 = RGB[1];
    var b1 = RGB[2]
    return (Math.abs(r1 - r2) < leniency && Math.abs(g1 - g2) < leniency && Math.abs(b1 - b2) < leniency);
}

function getReadings(player, n){
    var arrayLength = player.states.length
    if (arrayLength < n){
        n = arrayLength;
    }
    var readings = [];
    for (var i = 0; i < n; i++){
        var newReading = new Reading;
        newReading.state = player.states[arrayLength - n + i]
        newReading.x = player.xPositions[arrayLength - n + i]
        newReading.y = player.yPositions[arrayLength - n + i]
        newReading.time = player.timeStamps[arrayLength - n + i]
        readings[i] = newReading;
    }
    return readings;
}

function makeRectangle(context, rect, p, state, RGB){
    var color = "#" + RGB[0].toString(16) + RGB[1].toString(16) + RGB[2].toString(16);
    context.strokeStyle = color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    var font = 14;
    context.font = font + 'px Helvetica';
    context.lineWidth = 5;
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 11 + font);
    context.fillText(p + " is " + state, rect.x + rect.width + 5, rect.y + 11 + 2 * font);
}

function shouldAnalyze(n){
	var readings1 = getReadings(players[0], n);
    var readings2 = getReadings(players[1], n);
    if (readings1[0].state == "knockdown"){
        return players[0];
    }
    if (readings2[0].state == "knockdown"){
        return players[1];
    }
}