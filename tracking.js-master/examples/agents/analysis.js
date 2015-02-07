var lookback = 5; 

var TECH_WINDOW = 400; //Note this is the tech window timing
var ROLL_WINDOW = 30; //Note this is the distance to register as a roll

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
		
        var tech = (timeSinceKnockdown < TECH_WINDOW);
        var left = ((latestReadings[0].x  - latestReadings[1].x) > ROLL_WINDOW);
        var inplace = (Math.abs(latestReadings[1].x  - latestReadings[0].x) < ROLL_WINDOW);

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
    return;
}
//implement later when we have attack hitboxes
//function isGetUpAttack()