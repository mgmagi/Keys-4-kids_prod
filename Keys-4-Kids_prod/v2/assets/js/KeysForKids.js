function processDatePickerEvent(element)
{
	setFormEnabled(element.form, false);
	
	if(ignoreChangeElement.indexOf(element.id) < 0)
		ignoreChangeElement.push(element.id);
		
	var sDateValidated = dateValid(element.value);
	var date = null;
	if(isNaN(sDateValidated))	
	{
		alert(sDateValidated 
		+ "\n\nThe date will be reset to today's date.");
		date = new Date();
	}
	else
		date = new Date(Number(sDateValidated.trim()));

	element.value = date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", year:"numeric" });
	var elements = document.getElementsByClassName("DatePickerControlPanel");
	for (var i = 0, len = elements.length; i < len; i++) 
	{
		elements[i].value = element.value;
	}
	
	var queryNew = "";
	var queryOld = window.location.search.substring(1);
	var vars = queryOld.split("&");
	var dateFound = false;
	for (var i = 0; i < vars.length; i++) 
	{
		if(vars[i].startsWith("Date="))
		{
			var date = new Date(element.value);
			queryNew += "Date=" + date.getFullYear() + "-" + prependWithZeros(date.getMonth() + 1, 1) + "-" + prependWithZeros(date.getDate(), 1) + "&";
			dateFound = true;
		}
		else if(vars[i].length > 0)
			queryNew += vars[i] + "&";
	} 
	
	if(!dateFound)
	{
		var date = new Date(element.value);
		queryNew += "Date=" + date.getFullYear() + "-" + prependWithZeros(date.getMonth() + 1, 1) + "-" + prependWithZeros(date.getDate(), 1) + "&";
	}
	
	queryNew += "Mode=" + document.getElementById("Mode").value + "&";
	queryNew += "TeacherID=" + document.getElementById("TeacherID").value;

	var port = window.location.port
	if(port.length > 0)
		port = ":" + port;
	var refNew = window.location.protocol + "//" + window.location.hostname + port + window.location.pathname + "?" + queryNew		
	window.location.href = refNew;
}

function processWeekIncrement(element)
{
	var elements = document.getElementsByClassName("DatePickerControlPanel");
	if(element.value.indexOf("Today") > -1)
		d = new Date();
	else		
	{
		var direction;
		if(element.value.indexOf(">") > -1)
			direction = 1;
		if(element.value.indexOf("<") > -1)
			direction = -1;
			
		var increment;		
		if(element.value.indexOf("Day") > -1)
			increment = 1;
		else if(element.value.indexOf("Week") > -1)
			increment = 7;
			
		var d = new Date(elements[0].value);
		d = new Date(d.setMilliseconds(d.getMilliseconds()+ direction * increment * 24 * 3600000));
	}

	var newDate = formatDayUS(d);		
	for (var i = 0, len = elements.length; i < len; i++) 
	{
		elements[i].value = newDate;
	}
	processDatePickerEvent(elements[0]);
}

function onLoad() 
{
	styleAttendanceEditor();
	document.addEventListener('scroll', onScroll);
	move();
	
	var fixed = document.getElementById('control_panel');
	if(fixed != null)
		fixed.addEventListener('touchmove', function(e) {e.preventDefault();}, false);
}

function move() 
{
	var scrollPosition = document.getElementById('scrollPosition');
	if(scrollPosition != null && scrollPosition.value > 0)
	{
		document.documentElement.scrollTop = 0;
		document.documentElement.scrollTop += scrollPosition.value;
	}
}

function onScroll() 
{
	var element = document.getElementById('scrollPosition');
	if(element != null)
		element.value = document.documentElement.scrollTop;
}




