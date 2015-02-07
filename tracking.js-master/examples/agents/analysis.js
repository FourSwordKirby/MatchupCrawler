var lookback = 5; 

var TECH_WINDOW = 800; //Note this is the tech window timing
var ROLL_WINDOW = 30; //Note this is the distance to register as a roll

var inAnalysis = false;

function getReadingsUpToLastKnockdown(player)
{
	var readings = getReadings(player, lookback)
	for(var i = readings.length - 2; i >= 0; i--)//want at least 2 readings
	{
		if(readings[i].state == "knockdown")
			return readings.slice(i, lookback);
	}
	return;
}

function getRecoverType(player)
{
	var latestReadings = getReadingsUpToLastKnockdown(player);
	if(latestReadings)
	{
		var lastFrame = latestReadings.length-1;

		var timeSinceKnockdown = latestReadings[lastFrame].time - latestReadings[0].time;
		
        var tech = (timeSinceKnockdown < TECH_WINDOW);
        var inplace = (Math.abs(latestReadings[lastFrame-1].x - latestReadings[lastFrame].x) < ROLL_WINDOW);
        var left = ((latestReadings[lastFrame-1].x - latestReadings[lastFrame].x) > ROLL_WINDOW);

        if (tech){
            if (inplace){
                return "techinplace";
            }else if(left){
                return "techleft";
            }else{
                return "techright";
            }
        }else{
            if (inplace){
                return "regulargetup";
            }else if(left){
                return "rollleft";
            }else{
                return "rollright";
            }
        }
    }
	
	if(timeSinceKnockdown > 2*TECH_WINDOW)
	{
		return "finished"
	}
    return "nothing";
}

function getSituation (player1, player2, stage_rects)
{
	var main_stage = stage_rects[0];
	
	var player_status_1 = getReadings(player1, 1)[0];
	var player_status_2 = getReadings(player2, 1)[0];
	
	function onPlatform(player_status)
	{
		player_status.y < (main_stage.y + 2*player_status.height);
	}
	
	function inCorner(player_status) 
	{
		var leftCorner = ((player_status.x - main_stage.x)  < (main_stage.width/5) 
						&& (player_status.x - main_stage.x)  > 0);
		var rightCorner = ((main_stage.x + main_stage.width -player_status.x)  < (main_stage.width/6) 
						&& (main_stage.x + main_stage.width  - player_status.x)  > 0);
						
		return leftCorner || rightCorner;
	}
	
	function centerStage(player_status) 
	{
		var onStage = ((player_status.x - main_stage.x)  > (main_stage.width/3) &&
						(main_stage.x - player_status.x)  < (main_stage.width/3))
						
		return console.log("on stage")
	}
	
	if(player_status_1 != null)
	{
		/*
		if(inCorner(player_status_1))
			return "cornered";
		if(centerStage(player_status_1))
			return "onStage";
		*/
		if(player_status_1.x < 350)
			return "left";
		else
			return "right";
	}
}


//implement later when we have attack hitboxes
//function isGetUpAttack()