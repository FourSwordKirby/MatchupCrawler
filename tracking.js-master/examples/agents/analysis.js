var lookback = 10; 

function analyzeKnockdown(player) //Note that states is an array of the player's last states
{
	if(isTechInPlace(player))
		return "techinplace"; 
	if(isTechLeft(player))
		return "techleft"; 
	if(isTechRight(player))
		return "techright"; 		
	if(isNoTech(player))
		return "notech"; 		
	if(isRegularGetup(player))
		return "getup"; 
	if(isRollLeft(player))
		return "rollleft"; 
	if(isRollRight(player))
		return "rollright"; 
}

var TECH_WINDOW = 500 //Note this is the tech window timing
var ROLL_WINDOW = 60 //Note this is the distance to register as a roll

function getLastKnockdown(readings)
{
	var latestKnockdown = null;
	for(var i = 0; i < readings.length; i++)
	{
		if(readings[i].state == "knockdown")
			latestKnockdown = readings[i];
	}
	return latestKnockdown;
}

function isTechInPlace(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown < TECH_WINDOW)
		{
			if(Math.abs(readings[readings.length-1].x  - readings[readings.length-2].x) < ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

function isTechLeft(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown < TECH_WINDOW)
		{
			if(readings[readings.length-1].x  < readings[readings.length-2].x - ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

function isTechRight(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown < TECH_WINDOW)
		{
			if(readings[readings.length-1].x  > readings[readings.length-2].x + ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

function isNoTech(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown > TECH_WINDOW)
		{
			return true;
		}
	}
}

function isRegularGetup(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown > TECH_WINDOW)
		{
			if(Math.abs(readings[readings.length-1].x  - readings[readings.length-2].x) < ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

function isRollLeft(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown > TECH_WINDOW)
		{
			if(readings[readings.length-1].x  < readings[readings.length-2].x - ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

function isRollRight(player)
{
	var readings = getReadings(player, lookback)
	var latestKnockdown = getLastKnockdown(readings)
	
	if(latestKnockdown != null)
	{
		var timeSinceKnockdown = latestKnockdown.timestamp - readings[readings.length-1].timestamp;
		
		if(timeSinceKnockdown > TECH_WINDOW)
		{
			if(readings[readings.length-1].x  > readings[readings.length-2].x + ROLL_WINDOW)
			{
				return true;
			}
		}
	}
}

//implement later when we have attack hitboxes
//function isGetUpAttack()