function loadXMLDoc(elemID, sServlet, sMethod, sParameters)
{
	if (window.XMLHttpRequest)
  	xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
	
	xmlhttp.onreadystatechange = function ()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
			document.getElementById(elemID).innerHTML=xmlhttp.responseText;
	}
	xmlhttp.open("POST", sServlet, false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var allParamaters = "method=" + sMethod;
	if(sParameters.length > 0)
		allParamaters += "&" + sParameters;
	xmlhttp.send(allParamaters);
}

function callAjax(sMethod, sUrl, bAsync, functionCallback, functionOnError)
{
	try
	{
		var ret = null;
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() 
		{
		  functionOnError(xhr, sUrl);
		};

		xhr.onreadystatechange = function () 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				ret = functionCallback(xhr);
			}
			else if(!(this.readyState == 1 && this.status == 0))
				functionOnError(xhr, sUrl);
		}

		xhr.open(sMethod, sUrl, bAsync);
		xhr.send();
		return ret;
	}
	catch(error)
	{
		alert("Error in function \'" + arguments.callee.name + "\':"
		+ "\n" + error.message
		+ "\n" + new Error().stack);
	}
}

function validateDateOnServer(xhr)
{
	return xhr.responseText;
}

function myOnErrorFunction(xhr, sUrl)
{
	var sError = "While trying to make AJAX call to URL:"
	+ "\n" + sUrl;
	var response = xhr.responseText;
	if(response.trim().length == 0)
		response = "Of unknown nature";
		
	sError += "\n" + "Abnormal condition occured:" 
		+ "\n\n" + response;	
	alert("Error in function \'" + arguments.callee.name + "\':"
	+ "\n\n" + sError
	+ "\n\nTracing the " + new Error().stack);
}

function formatDayUS(d)
{
	var dd = d.getDate();
	if(dd < 10) 
		dd = '0' + dd;
		
	var mm = d.getMonth() + 1;
	if(mm < 10)
		mm = '0' + mm;
	
	var yyyy = d.getFullYear();

	return mm + '/' + dd + '/' + yyyy;
}

function formatDayISO(d)
{
	var dd = d.getDate();
	if(dd < 10) 
		dd = '0' + dd;
		
	var mm = d.getMonth() + 1;
	if(mm < 10)
		mm = '0' + mm;
	
	var yyyy = d.getFullYear();

	return yyyy + '-' + mm + '-' + dd;
}

function submitAndDisable(element)
{
	var submiButtons = document.getElementsByName("Submit");
	var i;
	for (i = 0; i < submiButtons.length; i++) 
	{
    submiButtons[i].disabled = true;
		submiButtons[i].value = "Submitted";
	}
	element.form.submit();
}

function getParameterByName(name, url) 
{
    if (!url) 
		url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) 
		return null;
    if (!results[2]) 
		return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function viewableWidth()
{
   return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
}

function viewableHeight()
{
   return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
}

function prependWithZeros(value, numberOfZeros)
{
	var sPrefix = "";
	if (value >= Math.pow(10, numberOfZeros))
		return value;
	for(var i = 0; i < numberOfZeros; i++)
	{
		sPrefix += '0'; 
	}
	return sPrefix + value;
}

function newPopup(url)
{
	popupWindow = window.open(
	url,'popUpWindow',
	'width=500, height=300, left=100, top=100, resizable=no, scrollbars=yes, toolbar=no, menubar=no, location=no, directories=no, status=no')
}

function blinker() 
{
	$('.blinking').fadeOut(5000);
	$('.blinking').fadeIn(500);
}
setInterval(blinker, 7000);

function setFormEnabled(form, flag)
{
	form.style.opacity = 0.8;

	var elementsToDisable, index;

	elementsToDisable = form.elements;
	for (index = 0; index < elementsToDisable.length; ++index) 
	{
    	elementsToDisable[index].disabled = !flag;
	}
}

function onClickAction(element, sAlertText)
{
	event.preventDefault();

	if(ignoreChangeElement.indexOf(element.id) < 0)
		ignoreChangeElement.push(element.id);
		
	var bSubmit = false;		
	if(sAlertText != null && sAlertText.trim().length > 0)
	{
		if(sAlertText.indexOf("?") >= 0)
			bSubmit = confirm(sAlertText);
		else
			alert(sAlertText);			
	}
	else
		bSubmit = true;
	
	if(bSubmit)
	{
		var input = document.createElement('input');
	    input.type = 'hidden';
    	input.name = element.value + "_TimeStamp";
	    input.value = new Date().getTime();
	    element.form.appendChild(input);
		element.form.submit();
		setFormEnabled(element.form, false);
	}
}
