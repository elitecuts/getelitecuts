/* ==========================================================================
   Avoid `console` errors in browsers that lack a console.
   ========================================================================== */

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* ==========================================================================
   Window On Load
   ========================================================================== */

$(window).load(function() {

	// Main variables
	var windowHeight, windowWidth, welcomeTop;
	var $videoHero, $imageHero, $welcome, $scrollDownArrow;

	// Mute video background
	var $videoBackground 	  = document.getElementById('video_background');
	if($videoBackground != undefined) {
		$videoBackground.muted	= "muted";
	}

})

/* ==========================================================================
   Document Ready
   ========================================================================== */

$(document).ready(function() {

	// Main variables
	windowHeight 		      = $(window).height();
    windowWidth 		      = $(window).width();

    // Video hero height
	$videoHero = $('#video-hero');
   	$videoHero.height(windowHeight);

    // Image hero height
	$imageHero = $('#image-hero');
   	$imageHero.height(windowHeight);

	// Welcome text for hero section
	repositionWelcome();

	priceWidget();

	sliderWidget();

	// Scroll down arrow for hero
	repositionScrollDownArrow();

	// Widgets config
	widgetsConfig();

});

/* ==========================================================================
   Window Resize
   ========================================================================== */

$(window).resize(function() {

	// Window size variables update
	windowHeight	= $(window).height();
	windowWidth 	= $(window).width();

	// Video and Image hero height update
	$videoHero.height(windowHeight);
	$imageHero.height(windowHeight);

	// Welcome text for hero section
	repositionWelcome();

	// Scroll down arrow for hero
	repositionScrollDownArrow();

})
/* ==========================================================================
   Widgets Config
   ========================================================================== */

var widgetsConfig = function() {

	// Hide header on scroll
	navbar = $('.navbar');
	navbar.hideNavbarOnScroll({
		'deltaBeforeHide' : 5,
		'hideSpeed'       : 0.4,
	});

	// Skrollr init
	if (matchMedia('(min-width: 1140px)').matches) { 
		skrollr.init( { 
			forceHeight: false 
		});
	}

	// Tooltips
	var $allTooltips = $('[rel=tooltip]');
	$allTooltips.tooltip({placement: 'top'}).css('z-index', 2080);	

}

var repositionWelcome = function() {

	// Welcome text for hero
	$welcome 	= $('.welcome');
	welcomeTop  = ((windowHeight/2) - ($welcome.height()/2)) + "px";
	// $welcome.css({ position : 'absolute', top : welcomeTop });

}

var repositionScrollDownArrow = function() {

	// Scroll down arrow for hero
	$scrollDownArrow 	= $('.hero-scroll-down-arrow');
	scrollDownArrowTop  = windowHeight - ($scrollDownArrow.height()*2) + "px";
	$scrollDownArrow.css({ position : 'relative', top : scrollDownArrowTop });
}

var priceWidget = function() {
	
	/*toogle*/
	jQuery(".toggle_container").hide();
	jQuery('h4.trigger .fa-chevron-up').hide();
	jQuery('h4.trigger .fa-chevron-down').show();
	jQuery("h4.trigger").click(function(){
		jQuery('h4.trigger.active').not(this).each(function() {
			jQuery(this).toggleClass("active").next().slideToggle("slow");
			if(jQuery('h4.trigger').hasClass('active')){
				jQuery(this).find('.fa-chevron-down').hide();
				jQuery(this).find('.fa-chevron-up').show();
			} else {
				jQuery(this).find('.fa-chevron-up').hide();
				jQuery(this).find('.fa-chevron-down').show();
			}			
			
		});

		jQuery(this).toggleClass("active").next().slideToggle("slow");		
		if(jQuery('h4.trigger').hasClass('active')){
			jQuery(this).find('.fa-chevron-down').hide();
			jQuery(this).find('.fa-chevron-up').show();
		} else {
			jQuery(this).find('.fa-chevron-up').hide();
			jQuery(this).find('.fa-chevron-down').show();
		}
	});
}


var sliderWidget = function() {
/*-----------------------------------------------------------------------------------*/
	/*	Studio
	/*-----------------------------------------------------------------------------------*/
	
	/* Initialize Slider */	
	var swiper = jQuery('#swiper').swiper({
		loop:true,
		grabCursor: true,
		autoPlay: 4000
	});
	
	/* On Load swiper height should adjust to img size */
	jQuery('.swiper-slide img').load(function() {
		jQuery('#swiper').height(jQuery('.swiper-slide img').height());
		jQuery('.swiper-wrapper').height(jQuery('.swiper-slide img').height());
	});
	
	/* On Resize swiper height should adjust to img size */
	jQuery(window).resize(function() {
		jQuery('#swiper').height(jQuery ('.swiper-slide img').height());
		jQuery('.swiper-wrapper').height(jQuery('.swiper-slide img').height());
	});

}

/* ==========================================================================
   Open Layers Maps API Configuration.
   ========================================================================== */

var latLng;
var domMap;
var marker;

function initialize() {

    var map = new ol.Map({
        target: 'map-canvas',
        controls: ol.control.defaults({
            attribution: false
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-77.159248, 38.821742 ]),
            zoom: 18
        })
    });

    var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([parseFloat(-77.159243), parseFloat(38.821554)], 'EPSG:4326', 'EPSG:3857')),
            })]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                src: "media/img/marker.svg"
            })
        })
    });
    map.addLayer(vectorLayer);
}

initialize();
