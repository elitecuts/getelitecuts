(function($) {

	$.fn.hideNavbarOnScroll = function(options) {
		var flag = true;
		var offset = function(el) {
		    var rect = el.getBoundingClientRect(),
		    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}

		var div = document.querySelector('#features');
		var divOffset = offset(div);
		var hide = divOffset.top -80

		// Plugin defaults
		var defaults = {
			deltaBeforeHide: 5,
			actualHide: hide,
			hideSpeed: 0.2,
			isActive : true
		}

		// Main variables
		var $window = $(window);

		var $document, $body;

		var plugin 	  		= {};
			plugin.settings = {};
			plugin.el 		= this.selector;
			plugin.$el 		= $(this.selector);

		var didUserScroll, navbarHeight, lastScrollTop;

		// Plugin init
		var init = function() {

			plugin.settings = $.extend({}, defaults, options);

			$document = $(document);
			$body 	= $('body');

			lastScrollTop = 0
			
			setNavbar();

		}

		// Setting the header function
		var setNavbar = function () {

			// Setting the header height
			navbarHeight = plugin.$el.outerHeight();

			// Creating a new css classes on the fly and appending them to the head of the page
			$('<style>').prop('type', 'text/css').html('\.header-up {\ top: -' + navbarHeight + 'px;\ } ' + plugin.el + ' {\ transition: top ' + plugin.settings.hideSpeed + 's ease-in-out; \ }').appendTo('head');

			// Adding the class to the header
			plugin.$el.addClass('header-down');
		}

		// Checking if the window has scrollbar
		var windowHasScrollBar = function() {

			return $body.height() > $window.height();

		}

		// User has scrolled
		var userHasScrolled = function () {

			var currentScrollTop = $(this).scrollTop();
			var $navbarCollapse 	 = plugin.$el.find('.navbar-collapse');

			// User has not scrolled past activation point
		    if(currentScrollTop <= plugin.settings.actualHide) {
		    	// Adding the 'header-up' class to the header to hide it
				plugin.$el.removeClass('header-down').addClass('header-up');
		        return;
		    }
		    else {

				// Adding the 'header-down' class to the header to show it
				if(currentScrollTop + $window.height() < $document.height()) {

					plugin.$el.removeClass('header-up').addClass('header-down');

				}

			}
			if(flag) {
		    		plugin.$el.css("display", "block");
		    }


		}		

		// Window scroll event
		$window.scroll(function(event){

    		didUserScroll = true;

		});

		// Checking if the window has scrollbar and the user has scrolled
		setInterval(function() {

			if( windowHasScrollBar() ) {

				if ( didUserScroll && plugin.settings.isActive) {

					userHasScrolled();
					didUserScroll = false;

				}

			} else {

				plugin.$el.removeClass('header-up').addClass('header-down');

			}

		}, 250);

		// Starting the plugin
		init();
	}

})(jQuery);