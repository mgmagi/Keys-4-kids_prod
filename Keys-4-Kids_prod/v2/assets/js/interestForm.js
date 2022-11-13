var deleteEmptyCell = function(cell){
	//iterate through the children of cell to delete whole cell if empty child
	for (var l = cell.childNodes.length - 1; l >= 0; l--){ 
		var child = cell.childNodes[l];
		if(child.innerHTML === "&nbsp;")
			child.parentNode.remove();
	}

	//delete all cell if itself empty
	if (cell.innerHTML === "&nbsp;" || cell.innerHTML === "")
		cell.remove();
	
	if (cell.innerHTML.includes("&nbsp;")){
		if (cell.children.length === 0 || cell.firstChild.tagName !== "TABLE"){
			cell.remove();
		}
	}
}

var changeToMobile = function(){
	const tablesOnPage = document.querySelectorAll("table"); 	//Iterate through all tables on page
	for (var i = 0, currTable; currTable = tablesOnPage[i]; i++){

		//add class to table for formatting
		currTable.classList.add("signuptable");

		for (var j = 0, row; row = currTable.rows[j]; j++) {        // Iterate through all it's rows
			for (var k = row.cells.length - 1; k >= 0; k--)			// Iterate through the row's cells
			{
				var cell = row.cells[k];
				deleteEmptyCell(cell);
			} 
			if (cell.innerHTML === "Student:" || cell.innerHTML === "Parent:"
			   || cell.innerHTML === "Classes Interested:"){
				cell.style.fontWeight = 600;
				cell.style.fontSize = "large";
				if(cell.innerHTML === "Classes Interested:")
					cell.id = "Classes Interested";
			}
		}
	}
	
	//remove the soon-to-be unnecesary textbox titles placed in the wrong spots
	var boldList = document.querySelectorAll("td strong");
	for(i = 0; i < boldList.length; i++) {
		boldList[i].parentNode.remove();
	}
	

	
	//remove soon-to-be unnecesary checkbox title placed in the wrong spots
	var emList = document.querySelectorAll("td em");
	for(i = 0; i < emList.length; i++) {
		if (emList[i].childElementCount === 0 && emList[i].parentNode.tagName.toLowerCase() !== "font")
			emList[i].parentNode.remove();
	}
	
	//make new input box titles
	var inputs = document.getElementsByTagName("input");
	var num = "";
	var groupClasses = [];
	
	for(i = 0; i < inputs.length; i++) {
		if(inputs[i].type === "text") { 
			if (inputs[i].id.includes("Student First Name ")){
				num = inputs[i].id.charAt(inputs[i].id.length -1);
				var text = document.createTextNode("Student".concat(" ", num));
				inputs[i].parentNode.insertBefore(text, inputs[i]);
			}
				inputs[i].placeholder = num.length === 0 ? inputs[i].id: inputs[i].id.slice(0, -2);
		} 
		else if (inputs[i].type === "checkbox"){
			//remove group classes
			if (inputs[i].id.includes("(")){
				groupClasses.push(inputs[i]);

			}
			var ind = inputs[i].id.indexOf("_");
			inputs[i].nextElementSibling.innerHTML = ind === -1 ? inputs[i].id : inputs[i].id.slice(ind+1);
		}
	}
	//move all group classes into their own section
	var comments = document.getElementById("Classes Interested");
	var header = document.createElement("H3");
	text = document.createTextNode("Group Classes (age)");
	header.append(text);
	header.style.fontWeight = 600;

	
	comments.parentNode.appendChild(header)

	for (i = 0; i< groupClasses.length; i++){
		comments.parentNode.appendChild(groupClasses[i].parentNode.parentNode)
	}
	header = document.createElement("H3");
	text = document.createTextNode("Private Classes");
	header.append(text);
	header.style.fontWeight = 600;
	comments.parentNode.appendChild(header);

}

var changeToDesktop = function(){
	//only need to reload page to get rid of all CSS changes from changeToMobile
	location.reload();
}

var adjustFormat = function (event){
	// clear the timeout
	clearTimeout(timeout);
	// start timing for event "completion"
	timeout = setTimeout(function() {
		var pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if(pageWidth <= 980){
			//mobile view
			if(!isMobileVersion){
				//change to mobile version
				changeToMobile();
			}
			isMobileVersion = true;
		}
		else {
			if(isMobileVersion){
				//change to desktop version
				changeToDesktop();

			}
			isMobileVersion = false;
		}
	}, delay);
}

var prepareForm = function(event){
	//clean up empty p elements
	var pElems = document.querySelectorAll("p");
	for (var i = pElems.length - 1; i >= 0; i--){
		if(pElems[i].innerHTML === "&nbsp;"){
			pElems[i].remove();
		}
	}

	//make submit button pretty
	var sub = document.getElementById("Submit");
	sub.classList.add('primary');

	//add a label to all checkboxes to display in style
	var inputs = document.getElementsByTagName("input");
	for(i = 0; i < inputs.length; i++) {
		if(inputs[i].type == "checkbox") { 
			var newlabel = document.createElement("Label");
			newlabel.setAttribute("for",inputs[i].id);
			inputs[i].parentNode.insertBefore(newlabel, inputs[i].nextSibling);
		}  
	}
	//remove the dummy item :/
	if (document.getElementById("dummy"))
		document.getElementById("dummy").remove();
	

}

//-----------------------------------------------------------------------------

if (window.location.href.includes("OpenHouse")){
	
	window.addEventListener('load', prepareForm, false);

	//get width of page on load and on every resize
	var isMobileVersion = false, 		//which state the page is currently in
		timeout, 						// holder for timeout id
		delay = 400; 					// delay after event is "complete" to run callback
	window.addEventListener('load', adjustFormat, false);
	window.addEventListener('resize', adjustFormat, false);
	
}


