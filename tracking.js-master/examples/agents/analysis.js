function Analysis(states, xPositions, yPositions) //Note that states is an array of the player's last states
{
	
}

var TECH_WINDOW = 50 //Note this is the tech window timing
var ROLL_WINDOW = 0.2 //Note this is the tech window timing

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

function isTechInPlace()
{
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
	var readings = player.getReadings(n)
	var latestKnockdown = getLastKockdown(readings)
	
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
function isGetUpAttack()