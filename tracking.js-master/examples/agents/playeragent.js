var players = [];
var positionMaxLength = 50;

function Player(type){
    this.name = "";
    this.states = [];
    this.xPositions = [];
    this.yPositions = [];
    this.timeStamps = [];
    this.techsinplace = 0;
    this.techsleft = 0;
    this.techsright = 0;
    this.regulars = 0;
    this.rollsright = 0;
    this.rollsleft = 0;
    
	this.righttime = 0;
	this.lefttime = 0;
}

function Reading(type){
    this.state;
    this.x;
    this.y;
    this.time;
}

        
function updateInfo(){
    document.getElementById("stat1").innerHTML = "Player 1 Techs: " + (players[0].techsinplace);
	document.getElementById("stat2").innerHTML = "Player 1 LeftTime: " + (players[0].lefttime);
	document.getElementById("stat3").innerHTML = "Player 1 RightTime: " + (players[0].righttime);
	document.getElementById("stat4").innerHTML = "Player 1 Regular Get Ups: " + (players[0].regulars);
    document.getElementById("stat5").innerHTML = "Player 1 Left Techs: " + (players[0].techsleft);
    document.getElementById("stat6").innerHTML = "Player 1 Right Techs: " + (players[0].techsright);
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
    updateInfo();
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
        var newReading = new Reading();
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
    context.fillStyle = color;
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 11 + font);
    
    font = 25
    if (state == "default"){
        return;
    }else if(state == "knockdown"){
        context.font = "bold " + font + "px Helvetica";
        context.fillStyle = " red";
        context.fillText("Knockdown!", rect.x, rect.y - font);
    }else if(state == "invincible"){
        context.font = "italic " + font + "px Helvetica";
        context.fillStyle = "blue";
        context.fillText("Invincible", rect.x, rect.y - font);    
    }
}

function shouldAnalyze(inAnalysis){
	
	if (players[0].xPositions.length < 2){
        return;
    }
	
	var readings1 = getReadings(players[0], 1);
    var readings2 = getReadings(players[1], 1);
	
	if (readings1[0].state == "knockdown" || inAnalysis){
        return players[0];
    }
		

/*    if (players[0].xPositions.length < n){
        return;
    }
	var readings1 = getReadings(players[0], n);
    var readings2 = getReadings(players[1], n);
    if (readings1[0].state == "knockdown"){
        return players[0];
    }
    if (readings2[0].state == "knockdown"){
        return players[1];
    }
	*/
}