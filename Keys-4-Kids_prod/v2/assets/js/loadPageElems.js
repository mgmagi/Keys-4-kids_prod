// JavaScript Document

/*this function allows for the growup animation for the dropdown content to play without it playing on page load or resize
Don't need to worry about menu because it is invisible in these situations
let header= document.getElementById("header")
header.addEventListener("mouseout", function( event ) {
  // highlight the mouseout target
	if( event.target.className === 'dropdown' && event.target.querySelector('.dropdown-content')){
		let content = event.target.querySelector('.dropdown-content');
		content.classList.add("wasHovered");
		// reset the color after a short dela
		setTimeout(function() {
		event.target.style.color = "";
		content.classList.remove("wasHovered");
		}, 500);
	}

}, false);*/

$(document).ready(function() {
	


	const menu = 'dynamPageElems/menu.html';
	const header = 'dynamPageElems/header.html';
	const footer = 'dynamPageElems/footer.html';
	const regist = 'dynamPageElems/regist.html';
	
	//find which directory we're in
	var location1 = window.location.pathname;
	var path = location1.substring(0, location1.lastIndexOf('/'));
	var directoryName = path.substring(path.lastIndexOf('/')+1);
	
	//If there is a registration blurb section, populate it
	//Don't have to worry about prepending their hrefs like the other generated html sections (yet)
	if(jQuery("#RegistrationBlurb").length){
		$('#RegistrationBlurb').load(regist);
	}


	if (directoryName === 'v2'){
		/*current page within the v2 dir*/
		$('#menu').load(menu);
		$('#header').load(header);
		$('#Footer').load(footer);
	}
	
	else{
		/*current page outside the v2 dir*/
		const prep = 'v2/';
		
		//load menu + prepend links
		$('#menu').load(prep + menu, function() {
			$("#menu a").each(function(){ 
				if($(this).attr('href')) {
					if ($(this).attr('href').indexOf('http') === -1 && $(this).attr('href').indexOf('#') === -1) {
						var newLink = prep + $(this).attr('href');
						$(this).attr('href', newLink);
					}
				}
			});
		});
		
		//load header + prepend links
		$('#header').load(prep + header, function() {
			$("#header a").each(function(){ 
				if($(this).attr('href')) {
					if ($(this).attr('href').indexOf('http') === -1 && $(this).attr('href').indexOf('#') === -1) {
						var newLink = prep + $(this).attr('href');
						$(this).attr('href', newLink);
						
						if($(this).children('img').length > 0){
							//change link for header logo image
							var newImageLink = prep + $(this).children('img').attr('src');
							$(this).children('img').attr('src', newImageLink);
						}
					}
				}

			});
		});
		
		//load footer + prepend links
		$('#Footer').load(prep + footer, function() {
			$("#Footer a").each(function(){ 
				if($(this).attr('href')) {
					if ($(this).attr('href').indexOf('http') === -1 && $(this).attr('href').indexOf('#') === -1) {
						var newLink = prep + $(this).attr('href');
						$(this).attr('href', newLink);
					}
				}
			});
		});
	}
});