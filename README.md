Mozilla Universe Widget
=======================
Overview
--------
This is a small widget, created with jQuery due to
nessesity, that allows you to embed the Mozilla
universe map on any webpage.

**Note that this is experimental and may not be used
for anything official as of yet!**

Features
--------
* Dropdown Mozilla tab that show/hides the universe.
* Ability to use any link to trigger the universe.
* Ability to use just a link and not display the tab.
* No need for any major change to a page, just two lines
of code and your off!
* can be used in conjunction with any javascript library.
* location indicator (showing where in the universe you currently are)

**WARNING!** If using this with a site that uses and/or requires
the use of jQuery below version 1.4.2 it will replace this with
jQuery 1.4.2. This is required for this widget to work.

If your site becomes garbled while the widget is embed on your site
you have been warned and I am not to be held responsible. **No permanent
damage to the site will be incured due to usage of the widget!**

If you experience problems just remove the widget and all will be
well again. **Unless you broke something else while using the widget!**

### Still To Come
* jQuery plugin version
* a great design (currently a little rough round the edges)
* more options in customisation
* *give me your ideas!*

Usage
-----
## basic usage
append the following to the `<head>` of any page you wish
to use the widget on:

	<link href="http://labs.mozhunt.com/mozilla-universe-widget/assets/css/fuzzyfox.css" rel="stylesheet" type="text/css">
	<script src="http://labs.mozhunt.com/mozilla-universe-widget/assets/js/fuzzyfox.js" type="text/javascript"></script>
	
To enable the tab widget you can either call the `mozilaUniverse({type:'tab'});`
function in `<script>` tags *OR* using `<body onload="mozillaUniverse({type:'tab'})">`
instead of a simple `<body>`.

To enable the widget when a link is clicked just use `onclick="mozillaUniverse()"`
in any link or button you wish to trigger the widget.
## options
there are some extra options available to you to enhance the experience
you get when using this widget. Below are of all the options you
can set and what they do. *These have to be passed into `mozillaUniverse(options)`
as an object like the one below*

	options = {
		type : 'link',
		//sets how the widget displays. can be "link" or "tab"
		youAreHere : ''
		//this can be any valid node id for the map. e.g. "mozilla-europe", "drumbeat", etc...
	}

Credits
-------
* **Lathan Bidwell** - for helping me with the detection
and replacement of jQuery on sites that embed the
widget but either do not alreay use jQuery or have
older versions running.
* **Gijs Kruitbosch** - for lots of help from working with JSONP to
fixing errors in my own code to helping bug hunt.
* This map uses the HTML5 canvas tag, CSS3 attributes,
and is powered by the open-source JavaScript InfoVis
Toolkit.

License
-------
**Attribution-ShareAlike 3.0 (or later) Unported**

http://creativecommons.org/licenses/by-sa/3.0/

ChangeLog
=========
August 15th, 2010
-----------------
* initial commit
* worked out most major bugs that prevented widget
from working
* wrote some documentation
* enabled "you are here"