//check that there is a console to log messages to
if('console' in window)
{
	window.console = {};
	console.log = console.info = console.error = console.dir = function(){};
}

//check that the widget is not already loaded
if(typeof mozillaUniverse == 'undefined')
{
	var mozillaUniverse = {};
	mozillaUniverse.exists = false;
}
else
{
	mozillaUniverse.exists = true;
}

//create the mozillaUniverse namespace/function
mozillaUniverse = function(options, callback){
	//check that the needed files to make the magic work do not exist before loading anything else
	if(!mozillaUniverse.exists)
	{
		//detect if jQuery is in existance and if so that it is up-to-date else update it to version 1.4.2
		if((typeof jQuery != 'undefined') && (jQuery().jquery != '1.4.2'))
		{
			//notify any developers wondering why some of their site just got borked
			console.log('jQuery has been found but is not known to work with the Mozilla Universe Widget\r\nNow replacing with jQuery 1.4.2');
			//delete previous instance of jQuery then load jQuery 1.4.2
			delete $, jQuery;
			mozillaUniverse.getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
			options.noConflict = false;
		}
		else if(typeof jQuery == 'undefined')
		{
			//jQuery is not loaded on the page yet, lets do it for the user and put it in no conflict mode
			mozillaUniverse.getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
			options.noConflict = true;
		}
		//jQuery has been sorted, now just to load the remaining universe related files
		mozillaUniverse.getScript('http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/js/jit.min.js');
		mozillaUniverse.getScript('http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/js/universe.js');
		
		//lets setup a check to see if jQuery is ready for use before loading the widget
		mozillaUniverse.tryReady(0, options);
	}
	else
	{
		//ah... someone is trying to call the widget twice... this just wont work... time to inform them of this
		console.log('the mozilla universe widget alreay appears to be loaded... you cannot load this twice, but don\' worry, we just wont let you :D');
	}
	
	if(typeof callback != 'undefined')
	{
		callback();
	}
};

//simple function to get and load scripts
mozillaUniverse.getScript = function(filename){
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', filename);
	document.getElementsByTagName('head')[0].appendChild(script);
};

//recursive function to check if the widget is ready to be loaded
mozillaUniverse.tryReady = function(timeElapsed, options){
	//check if jQuery is ready and hence the widget
	if(typeof jQuery == 'undefined')
	{
		//check that we are not taking too long
		if(timeElapsed <= 5000)
		{
			//wait a little before testing again
			setTimeout('mozillaUniverse.tryReady('+ (timeElapsed + 200) +', '+ JSON.stringify(options) +')', 200);
			//for some reason the options don't pass through the recursion without being converted into a json string each time
		}
		else
		{
			//something went wrong and jQuery wont load, we wont load the widget either... time to break the news
			console.log('Woops! jQuery wont load... this means the widget will not load, and if you had an older verison of jQuery on the page, well it wont be working either... sorry we borked your page :(');
		}
	}
	//okay jQuery is loaded, set it to noConfict if needed, and its time to call the widget into action
	else
	{
		if(options.noConflict)
		{
			jQuery.noConflict();
		}
		
		mozillaUniverse.widget(options);
	}
};

//this is where the widget is made
mozillaUniverse.widget = function(options){
	//this bit is essensial, we need to check that all options are set to defaults if not user set
	var defaultOptions = {
		widget : {
			theme : 'default', //this could be [tab, embed, defaut]. "default" is an overlay, lightbox style,
			footnote : 'This map uses the HTML5 <a href="https://developer.mozilla.org/en/HTML/Canvas">canvas</a> tag, CSS3 attributes, and is powered by the open-source <a href="http://thejit.org/">JavaScript InfoVis Toolkit</a>.' //this is an option so that it can be localised where needed
		},
		map : {
			maxWidth : 400, //this is the max width the actual may is allowed to be
			maxHeight : 400, //this is the max height the actual may is allowed to be
			defaultNode : 'mozilla', //this is the "You are here" option and it highlights the node that is set
			dataUrl : 'http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/js/data.json' //this will allow users to set a custom map, allowing the widget to be easily modified for other communities
		}
	};
	options.widget = jQuery.extend(defaultOptions.widget, options.widget);
	options.map = jQuery.extend(defaultOptions.map, options.map);
	
	/*
	 Create/load the widget html/css
	*/
	//okay, so we have some esensials to cover first. Such as the css for the map needs to be loaded
	jQuery('head').append('<link rel="stylesheet" href="http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/css/universe.css" type="text/css">');
	//and the html container for the widget
	var $mozillaUniverse_container = jQuery('<div class="mozilla-universe-widget"></div>').addClass(options.widget.theme);
	//the container for the map [we call this the overlay]
	var $mozillaUniverse_overlay = jQuery('<div class="mozilla-universe-overlay"><div class="mozilla-universe-map"><div id="universe-graph"><div id="universe-panel"></div></div></div></div>');
	//add the footnote to the widget
	var $mozillaUniverse_footnote = jQuery('<p id="mozilla-universe-footnote">'+ options.widget.footnote +'</p>');
	//append footnote to overlay
	$mozillaUniverse_overlay.append($mozillaUniverse_footnote);
	//add the map overlay to the widget
	$mozillaUniverse_container.append($mozillaUniverse_overlay);
	
	
	//add all this widgety goodness to the page at long last
	jQuery('body').append($mozillaUniverse_container);
	
	/*
	 create the event listeners for the widget depending on the theme chosen.
		also load any additional html/css that this theme may require
	*/
	switch(options.widget.theme)
	{
		case 'tab':
			
			/*
			 time for a dropdown? then lets get going!
			*/
			
			//add the toggle tab html to the widget
			$mozillaUniverse_container.append('<div id="mozilla-universe-toggle"><div id="mozilla-universe-tab"><img src="http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/img/mozilla-universe-tab.png" alt="mozilla"></div></div>');
			
			/*
			 add event handlers to toggle the widget
			*/
			
			$mozillaUniverse_container.show();
			
			//click on the toggle tab
			jQuery('#mozilla-universe-tab').click(function(){
				jQuery('.mozilla-universe-overlay').slideToggle('slow');
			});
			
			//click on a custom trigger
			jQuery('[rel=mozilla-universe]').click(function(){
				jQuery('.mozilla-universe-overlay').slideToggle('slow');
				return false;
			});
			
			
		break;
		case 'embed':
			
			/*
			 this is the one which needs some work, but lets just give it a go...
			*/
			
			//remove the widget from its current location
			jQuery('.mozilla-universe-widget').remove();
			//write it out to where the function was called
			jQuery('div#mozilla-universe-embed').append($mozillaUniverse_container);
			jQuery('.mozilla-universe-overlay').width((options.map.maxWidth + 200));
			//show the widget
			$mozillaUniverse_container.show();
			
		break;
		default:
			
			/*
			 time to do some overlay magic
			*/
			
			//add a close button to the widget
			jQuery('.mozilla-universe-overlay').append('<img id="mozilla-universe-close" src="http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/img/mozillaUniverseWidget-close.png" alt="close">');
			
			//add event listeners to triggers and to the close button
			jQuery('[rel=mozilla-universe]').click(function(){
				$mozillaUniverse_container.fadeIn('slow', function(){
					//okay, we want to put the overlay in the center of the screen, lets work out how BIG it is
					var overlayHeight = jQuery('.mozilla-universe-overlay').height() + 20;
					//and then how much margin-top to give it
					var overlayMarginTop = (document.all)? ((document.body.offsetHeight - overlayHeight) / 2) : ((window.innerHeight - overlayHeight) / 2);
					//and then set this margin
					jQuery('.mozilla-universe-overlay').css('margin-top', overlayMarginTop + 'px');
					
					//lets add some more event listeners
					jQuery('#mozilla-universe-close').click(function(){
						$mozillaUniverse_container.fadeOut('slow');
					});
					
					$mozillaUniverse_container.click(function(){
						$mozillaUniverse_container.fadeOut('slow');
					});
					
					jQuery('.mozilla-universe-overlay').click(function(event){
						event.stopPropagation();
					});
				});
				return false;
			});
			
		break;
	}
	
	/*
	 Time to launch the map.
		lets use a recursive function to check that it exists and display an error if it does not
	*/
	
	//load the recursive function and send it only the options for the map
	mozillaUniverse.tryMap(0, options.map);
};

//this function is almost identical to tryReady, except it looks for the map and displays an error to the page if not found
mozillaUniverse.tryMap = function(timeElapsed, options)
{
	//check if the map is ready
	if(typeof mozillaUniverse.map == 'undefined')
	{
		//check that we are not taking too long
		if(timeElapsed <= 5000)
		{
			//wait a little before testing again
			setTimeout('mozillaUniverse.tryMap('+ (timeElapsed + 200) +', '+ JSON.stringify(options) +')', 200);
			//for some reason the options don't pass through the recursion without being converted into a json string each time
		}
		else
		{
			//something went wrong and the map wont load, time to break the news to the developer and the people viewing the page
			console.log('Woops! It seems that we failed to load the map for you... sorry about this :\'(');
			jQuery('#mozilla-universe-overlay').append('<p>We regret to announce that the map you are supposed to see here will not be loading right now... instead pleace visit <a href="http://www.mozilla.org/community">www.mozilla.org/community</a> to view it.</p>');
		}
	}
	else
	{
		//yay, it seems that everything is working in regard to this file full of code! Lets load the map!
		mozillaUniverse.map(options, function(){
			var baseLocation = location.href.split('#')[0];
			location.href = baseLocation + '#' + options.defaultNode;
		});
	}
}