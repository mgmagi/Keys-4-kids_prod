function styleAttendanceEditor()
{
	if (window.location.href.includes("AttendanceEditor") || window.location.href.includes("AttendanceTeacherDashboard"))
	{	
		//set style for attendance editor DOM elements
		var styleBlock = "input[type=\"radio\"], input[type=\"checkbox\"] {opacity:1; appearance:auto; margin-right: auto; }";
		styleBlock += "table td{ padding: 0.5rem; }";
		styleBlock += ".control_panel{ table-layout:auto; }";
		styleBlock += "input[type=\"text\"]{ width: inherit !important; display: inline-block; }";
		styleBlock += "input[type=\"button\"]{ line-height: inherit; height: inherit; }";
		addStyle(styleBlock);
	}
}

function addStyle(styles) 
{
	/* Create style document */
	var css = document.createElement('style');
	css.type = 'text/css';

	if (css.styleSheet)
		css.styleSheet.cssText = styles;
	else
		css.appendChild(document.createTextNode(styles));

	/* Append style to the tag name */
	document.getElementsByTagName("head")[0].appendChild(css);
}

