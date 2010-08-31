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
* dropdown widget theme
* embeded widget theme
* overlay (lightbox) theme

**WARNING!** If using this with a site that uses and/or requires
the use of jQuery below version 1.4.2 it will replace this with
jQuery 1.4.2. This is required for this widget to work.

If your site becomes garbled while the widget is embed on your site
you have been warned and I am not to be held responsible. **No permanent
damage to the site will be incured due to usage of the widget!**

If you experience problems just remove the widget and all will be
well again. **Unless you broke something else while using the widget!**

### Still To Come
* jQuery plugin version (almost there)
* a great design (currently a little rough round the edges)
* more options in customisation
* *give me your ideas!*

Usage
-----
## basic usage
append the following to the `<head>` of any page you wish
to use the widget on:

	<link href="http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/css/fuzzyfox.css" rel="stylesheet" type="text/css">
	<script src="http://github.com/fuzzyfox/Mozilla-Universe-Widget/raw/master/assets/js/fuzzyfox.js" type="text/javascript"></script>
	
To enable the tab widget you can either call the `mozilaUniverse();`
function in `<script>` tags *OR* using `<body onload="mozillaUniverse()">`
instead of a simple `<body>`.

To enable the widget in a link just add `rel="mozilla-universe"`
in any link or button you wish to trigger the widget.

## options
there are some extra options available to you to enhance the experience
you get when using this widget. Below are of all the options you
can set and what they do. *These have to be passed into `mozillaUniverse(options)`
as an object like the one below*

	options = {
		widget : {
			theme : 'default', //can be [default, tab, embed]
		},
		map : {
			maxWidth : 400, //set the max width of the acutal map
			maxHeight : 400, //set the max height of the actual map
			defaultNode : 'mozilla' //set the default location on the map "You are here" feature
		}
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
This is for all images, designs and textual content of the widget.

http://creativecommons.org/licenses/by-sa/3.0/

**MPL 1.1/LGPL 2.1/GPL 2.0**
This is for all code unless otherwise stated.

ChangeLog
=========
August 15th, 2010
-----------------
* initial commit
* worked out most major bugs that prevented widget
from working
* wrote some documentation
* enabled "you are here"

August 16th, 2010
-----------------
* added initial work on jQuery plugin version
* discovered unknown bug in link trigger that can prevent widget toggle

August 27th, 2010
-----------------
* rewrote mozilla-universe.js to allow for more customisation and better options format
* added an embedable version of the widget
* themed an overlay version of the widget
* broke the jQuery plugin version... [needs a rewrite to catch up with standard version]


***** BEGIN LICENSE BLOCK *****
Version: MPL 1.1/LGPL 2.1/GPL 2.0

The contents of this file are subject to the Mozilla Public License Version 
1.1 (the "License"); you may not use this file except in compliance with
...
for the specific language governing rights and limitations under the
License.

The Original Code is to take the Mozilla Community Map from www.mozilla.org/community and make it into an easy to implement widget that can be used on multiple domains.

The Initial Developer of the Original Code is
William Duyck (aka FuzzyFox)
Portions created by the Initial Developer are Copyright (C) 2007
the Initial Developer. All Rights Reserved.

Contributor(s):
  David w Boswell
  Lathan Bidwell
  Gijs Kruitbosch

Alternatively, the contents of this file may be used under the terms of
either of the GNU General Public License Version 2 or later (the "GPL"),
...
the terms of any one of the MPL, the GPL or the LGPL.

***** END LICENSE BLOCK *****
