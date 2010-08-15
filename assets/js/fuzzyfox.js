
if (!('console' in window)) {
        window.console = {};
        console.log = console.info = console.error = console.dir = function() {};
}

var mozillaUniverse = function(options){
	if(typeof jQuery == 'undefined')
	{
		console.log('jquery does not exist, load it up with the rest of the widgets needed files')
		mozillaUniverse.getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
		mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/jit.min.js');
		mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/universe.js');
		options.jqueryNoConflict = true;
	}
	else
	{
		if($().jquery != '1.4.2')
		{
			console.log('removing older version of jquery in favour of new version, then loading needed files');
			delete $;
			delete jQuery;
			mozillaUniverse.getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
		}
		mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/jit.min.js');
		mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/universe.js');
		options.jqueryNoConflict = false;
	}
	mozillaUniverse.tryReady(0, options);
};

mozillaUniverse.getScript = function(filename){
	console.log('loading file: '+filename);
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', filename);
	if(typeof script != 'undefined')
	{
		document.getElementsByTagName('head')[0].appendChild(script);
	}
};

mozillaUniverse.tryReady = function(timeElapsed, options){
	if(typeof jQuery == 'undefined')
	{
		if(timeElapsed <= 5000)
		{
			console.log('jquery not loaded yet @ '+timeElapsed+' miliseconds');
			setTimeout('mozillaUniverse.tryReady('+(timeElapsed + 200)+', '+JSON.stringify(options)+')', 200);
		}
		else
		{
			console.log('failed to load jquery');
		}
	}
	else
	{
		console.log('jquery loaded and ready');
		//set jQuery to no coflict mode
		if(options.jqueryNoConflict)
		{
			console.log('setting jquery to no conflict mode');
			jQuery.noConflict();
		}
		
		//ensure that some default options exist if not already set
		if(typeof options == 'undefined')
		{
			options = {
				type : 'link'
			};
		}
		
		//check if there is an istance of the map already
		if(jQuery('#mozillaUniverseWidget').length == 0)
		{
			//load the jit library
			//jQuery.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/jit.min.js');
			//load the universe
			//jQuery.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/universe.js');
			//load the css
			jQuery('head').append('<link rel="stylesheet" href="http://labs.mozhunt.com/mozilla-universe-widget/assets/css/universe.css" type="text/css">');
			//create the html for the map
			var $mozillaUniverse_container = jQuery('<div id="mozillaUniverseWidget"></div>').addClass(options.type);
			var $mozillaUniverse_map = jQuery('<div class="mozillaUniverse-map"><div id="universe-graph"><div id="universe-panel"></div></div><p class="mozillaUniverse-footnote">This map uses the HTML5 <a href="https://developer.mozilla.org/en/HTML/Canvas">canvas</a> tag, CSS3 attributes, and is powered by the open-source <a href="http://thejit.org/">JavaScript InfoVis Toolkit</a>.</p></div>');
			$mozillaUniverse_container.append($mozillaUniverse_map);
			jQuery('body').append($mozillaUniverse_container);
			jQuery('#mozillaUniverseWidget').show();
		}
		//tab widget
		
		if(options.type == 'tab')
		{
			jQuery('#mozillaUniverseWidget').append('<div class="mozillaUniverse-toggle"><div class="mozillaUniverse-toggle-tab"></div></div>');
			jQuery('#mozillaUniverseWidget .mozillaUniverse-toggle-tab').click(function(){
				jQuery('#mozillaUniverseWidget .mozillaUniverse-map').slideToggle('slow');
			});
		}
		
		if(options.type == 'link')
		{
			if(jQuery('#mozillaUniverseWidget.tab').length == 0)
			{
				jQuery('#mozillaUniverseWidget').hide();
				jQuery('#mozillaUniverseWidget .mozillaUniverse-map').append('<img class="close" src="http://labs.mozhunt.com/mozilla-universe-widget/assets/img/mozillaUniverseWidget-close.png" alt="close">');
			}
			function toggleWidget()
			{
				if(jQuery('#mozillaUniverseWidget.tab').length == 0)
				{
					jQuery('#mozillaUniverseWidget').slideToggle('slow');
				}
				else
				{				
					jQuery('#mozillaUniverseWidget .mozillaUniverse-map').slideToggle('slow');
				}
			}
			
			toggleWidget();
			jQuery('#mozillaUniverseWidget .close').click(function(){
				toggleWidget();
				jQuery('#mozillaUniverseWidget .close').remove();
			});
		}
		
		//call the universe into existance
		mozillaUniverse.tryUniverseReady = function(timeElapsed){
			if(typeof mozillaUniverse.universe == 'undefined')
			{
				if(timeElapsed <= 5000)
				{
					console.log('not ready yet @ '+timeElapsed+' miliseconds')
					setTimeout('mozillaUniverse.tryUniverseReady('+(timeElapsed + 200)+')', 200);
				}
				else
				{
					console.log('failed to load the map');
				}
			}
			else
			{
				console.log('map exists, attempting to load');
				mozillaUniverse.universe();
			}
		}
		mozillaUniverse.tryUniverseReady(0);
	}
};
