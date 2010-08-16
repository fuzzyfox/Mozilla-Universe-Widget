//create the mozillaUniverse variable
var mozillaUniverse = {};

$.fn.mozillaUniverse = function(options, callback){
	//ensure that all options are set
	var defaults = {
		type : 'link',
		youAreHere : ''
	};
	options = $.extend(defaults, options);
	
	//ensure we are using a jquery version known to work with the plugin
	if($().jquery != '1.4.2')
	{
		$('body').append('<p>Failed to load Mozilla Universe. jQuery 1.4.2 is required for it to work. Please update your jQuery.</p>');
		return false;
	}
	
	//time to create the widget
	return this.each(function(){
		
		//set bool to tell if the universe has already been loaded
		if($('#mozillaUniverseWidget').length == 0)
		{
			mozillaUniverse.loaded = false;
		}
		else
		{
			mozillaUniverse.loaded = true;
		}
		
		//function to load the needed external scripts
		mozillaUniverse.getScript = function(filename){
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', filename);
			if(typeof script != 'undefined')
			{
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		};
		
		//function to test if we can load the map yet
		mozillaUniverse.tryUniverseReady = function(timeElapsed){
			if(typeof mozillaUniverse.universe == 'undefined')
			{
				if(timeElapsed <= 5000)
				{
					setTimeout('mozillaUniverse.tryUniverseReady('+(timeElapsed+200)+')', 200);
				}
				else
				{
					if('console' in window)console.log('failed to load the map. "mozillaUniverse.universe()" could not be detected');
				}
			}
			else if(mozillaUniverse.loaded == false)
			{
				mozillaUniverse.universe(function(){
					location.href = '#' + options.youAreHere;
					mozillaUniverse.loaded = true;
				});
			}
		};
		
		//create/load things that only need to be done once
		if(!mozillaUniverse.loaded)
		{
			//load external files
			mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/jit.min.js');
			mozillaUniverse.getScript('http://labs.mozhunt.com/mozilla-universe-widget/assets/js/universe.js');
			$('head').append('<link rel="stylesheet" href="http://labs.mozhunt.com/mozilla-universe-widget/assets/css/universe.css" type="text/css">');
			
			//create the widget container if it is not yet in existance
			var $mozillaUniverse_container = $('<div id="mozillaUniverseWidget"></div>').addClass(options.type);
			var $mozillaUniverse_map = ('<div class="mozillaUniverse-map"><div id="universe-graph"><div id="universe-panel"></div></div><p class="mozillaUniverse-footnote">This map uses the HTML5 <a href="https://developer.mozilla.org/en/HTML/Canvas">canvas</a> tag, CSS3 attributes, and is powered by the open-source <a href="http://thejit.org/">JavaScript InfoVis Toolkit</a>.</p></div>');
			$mozillaUniverse_container.append($mozillaUniverse_map);
			$('body').append($mozillaUniverse_container);
			$($mozillaUniverse_container).show();
		}
		
		//set behaviour for the widget dependent on type
		if(options.type == 'tab')
		{
			$('#mozillaUniverseWidget').append('<div class="mozillaUniverse-toggle"><div class="mozillaUniverse-toggle-tab"></div></div>');
			$('#mozillaUniverseWidget .mozillaUniverse-toggle-tab').click(function(){
				$('#mozillaUniverseWidget .mozillaUniverse-map').slideToggle('slow');
			});
		}
		if(options.type == 'link')
		{
			if($('#mozillaUniverseWidget.tab').length == 0)
			{
				$('#mozillaUniverseWidget').hide();
				$('#mozillaUniverseWidget .mozillaUniverse-map').append('<img class="close" src="http://labs.mozhunt.com/mozilla-universe-widget/assets/img/mozillaUniverseWidget-close.png" alt="close">');
			}
			
			//create the toggle function for the link widget so it works with the tab widget
			function toggleWidget(){
				if($('#mozillaUniverseWidget.tab').length == 0)
				{
					$('#mozillaUniverseWidget').slideToggle('slow');
				}
				else
				{
					$('#mozillaUniverseWidget .mozillaUniverse-map').slideToggle('slow');
				}
			}
			
			$(this).click(function(){
				toggleWidget();
				$('#mozillaUniverseWidget .close').click(function(){
					toggleWidget();
					$('#mozillaUniverseWidget .close').remove();
				});
			});
		}
		
		//attempt to load the widget
		mozillaUniverse.tryUniverseReady(0);
	});
};