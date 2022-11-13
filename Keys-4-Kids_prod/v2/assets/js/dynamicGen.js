/*
from gitKeyMan\KeyMan\src\java\com\keysforkids\KeyMan\Schedule\JspKeysScheduleToPing.java
String []  saInstructionKeywrd = new String[]
{
null,
"composition",
"dance",
"drum",
"keys",
"guitar",
"rock",
"sing",
"ssn",
"string",
"theater",
"tots"
};
*/

function updateGroup(){
	
	hideStuff();
	
	var groupSelect = document.getElementById('groupSelect');

	var localPath = "dynamicGenerators/"
	var baseText = localPath;

	var im = "?InstructionKeyword="
	var title = "ScheduleTitle.jsp";
	var semesters = "SemesterWithDates.jsp";
	var teachers = "GetTeachers.jsp";
	var currSem = "currSem.jsp";
	var nextSem = "nextSem.jsp";
	var nextNextSem = "nextNextSem.jsp";

	var selectedGroup = groupSelect.options[groupSelect.selectedIndex].value;
	//title
	document.getElementById("titleGet").src = baseText + title + im + selectedGroup;
	//semesters
	document.getElementById("semesters").src = baseText + semesters + im + selectedGroup;
	//teachers
	document.getElementById("teachers").src = baseText + teachers + im + selectedGroup;
	//currSem
	document.getElementById("currSem").src = baseText + currSem + im + selectedGroup;
	//nextSem
	document.getElementById("nextSem").src = baseText + nextSem + im + selectedGroup;
	//nextNextSem
	document.getElementById("nextNextSem").src = baseText + nextNextSem + im + selectedGroup;
}

//retrieve the title text from the dynamically loaded html
function titleAccess(){
	var iframeTest = document.getElementById("titleGet");
	var element = iframeTest.contentWindow.document.getElementsByTagName("body")[0];
	document.getElementById("title").innerHTML = element.outerHTML;
}

//retrieve the semester links text from the dynamically loaded html
function semestersAccess(){
	var iframeTest = document.getElementById("semesters");
	var elementList = iframeTest.contentWindow.document.getElementsByTagName("a");

	var i;
	for (i=0; i < elementList.length; i++){
		var currElem = iframeTest.contentWindow.document.getElementsByTagName("a")[i];
		
		//clean imported text
		currElem.innerHTML = currElem.innerHTML.replace(/&nbsp;/g,'');
		
		//put title on checkboxes accordingly
		var currDest;

		if (i == 0)
			currDest = "checkbox-alpha-text";
		else if (i == 1)
			currDest = "checkbox-beta-text";
		else
			currDest = "checkbox-gamma-text";
		document.getElementById(currDest).innerHTML = currElem.innerHTML;
		
		//adjust value of checkbox input accordingly
		var input = document.getElementById(currDest).parentNode.firstElementChild;
		var val = currElem.href.split("#")[1];
		input.value = val;
	}
	var numSemestersAvail = i; //should be 3 but just delete other checkboxes if less
	if (numSemestersAvail === 2){
		var toDelete = document.getElementById("checkbox-gamma-text");
		if(toDelete)
			toDelete.parentNode.remove();
	}
	else if (numSemestersAvail === 1){
		var toDelete = document.getElementById("checkbox-gamma-text");
		if(toDelete)
			toDelete.parentNode.remove();

		toDelete = document.getElementById("checkbox-beta-text");
		if(toDelete)
			toDelete.parentNode.remove();

		document.getElementById("checkbox-alpha-text").style.pointerEvents = "none";
	}
}

//retrieve the teacher names text from the dynamically loaded html
function teachersAccess(){
	var iframeTest = document.getElementById("teachers");
	var element = iframeTest.contentWindow.document.getElementsByTagName("body")[0];
	element.innerHTML = element.innerHTML.replace("<br>", "");
	element.innerHTML = element.innerHTML.replace(/, /g,'<br>');
	document.getElementById("teachersReadout").innerHTML = element.outerHTML;
}

//retrieve the currSem table from the dynamically loaded html
function currSemAccess(){
	var whichTable = "currSem";
	var displayTable = "table0Readout";
	loadTable(whichTable, displayTable);
}

//retrieve the nextSem table from the dynamically loaded html
function nextSemAccess(){
	var whichTable = "nextSem";
	var displayTable = "table1Readout";
	loadTable(whichTable, displayTable);
}

//retrieve the nextNextSem table from the dynamically loaded html
function nextNextSemAccess(){
	var whichTable = "nextNextSem";
	var displayTable = "table2Readout";
	loadTable(whichTable, displayTable);
}

function loadTable(origTable, displayTable){
	var iframeTest = document.getElementById(origTable);
	var element = iframeTest.contentWindow.document.getElementsByTagName("table")[0];
	//check if table exists
	if (!element)
		document.getElementById(displayTable).innerHTML = "Schedule not yet available.";
	else 
		document.getElementById(displayTable).innerHTML = element.outerHTML;

	return ;
}

//show/hide tables based on radio selection
//https://www.tutorialrepublic.com/faq/show-hide-divs-based-on-radio-button-selection-in-jquery.php
$(document).ready(function(){
	$('input[type="radio"]').click(function(){
		var inputValue = $(this).attr("value");
		var targetBox = $("." + inputValue);
		$(".tableHolder").not(targetBox).hide();
		$(targetBox).show();
	});
});

//hide the loading screen and display content - called after last table has been populated (see HTML DOM)
var showStuff = function(){
	document.getElementById("loader").style.display = "none";
	document.getElementById("content").style.visibility = "visible";
}

var hideStuff = function(){
	document.getElementById("loader").style.display = "block";
	document.getElementById("content").style.visibility = "hidden";
}