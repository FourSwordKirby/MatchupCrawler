var lookback = 5; 

var TECH_WINDOW = 400; //Note this is the tech window timing
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
		var timeSinceKnockdown = latestReadings[1].time - latestReadings[0].time;
		
		var lastFrame = latestReadings.length-1;
		
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

function getSituation (player1, player2, stage)
{
	var stage_width = stage.width;
	var player_status_1 = getReadings(player1, 1)[0];
	var player_status_2 = getReadings(player2, 1)[0];
	
	/*var onPlatform = 
	var inCorner = 
	var centerStage = 
	*/
	
	if(player_status_1 != null && player_status_2 != null)
	{
		;
	}
}


//implement later when we have attack hitboxes
//function isGetUpAttack()