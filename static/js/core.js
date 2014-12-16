$(document).ready(function() {
	$(function(){
				$("#logoimg").toggle(function(){
					$('body').css("background-image","url('/static/img/bg3.jpg')");
				},function(){
					$('body').css("background-image","url('/static/img/bg.jpg')");
				})
			}) 
 	$('body').snowflakes({
		flakeCount : 12,
		flakeIndex: 99999,
		minSize : 30,
		maxSize : 110,
		minSpeed : 2,
		maxSpeed : 4,
		iterations : 30
	 });
	//Tooltips
        var tip = null;
	$(".tip_trigger").hover(function(){
          	//Caching the tooltip and removing it from container; then appending it to the body
        	tip = $(this).find('.tip').remove();
                $('body').append(tip);
		
		tip.show(); //Show tooltip
	}, function() {
                tip.hide().remove(); //Hide and remove tooltip appended to the body
                $(this).append(tip); //Return the tooltip to its original position
				  
		}).mousemove(function(e) {
		if ( tip == null ) return;
		var mousex = e.pageX + 20; //Get X coodrinates
		var mousey = e.pageY + 20; //Get Y coordinates
		var tipWidth = tip.width(); //Find width of tooltip
		var tipHeight = tip.height(); //Find height of tooltip
		
		//Distance of element from the right edge of viewport
		var tipVisX = $(window).width() - (mousex + tipWidth);
		//Distance of element from the bottom of viewport
		var tipVisY = $(window).height() - (mousey + tipHeight);
		  
		if ( tipVisX < 20 ) { //If tooltip exceeds the X coordinate of viewport
			mousex = e.pageX - tipWidth - 20;
		} if ( tipVisY < 20 ) { //If tooltip exceeds the Y coordinate of viewport
			mousey = e.pageY - tipHeight - 20;
		} 
		tip.css({  top: mousey, left: mousex });
	});
$(".column_title img").rotate({ 
   bind: 
     { 
        mouseover : function() { 
            $(this).rotate({animateTo:360})
        },
        mouseout : function() { 
            $(this).rotate({animateTo:0})
        }
     } 
   
});
	
});
// DOM Ready
$(function() {

    var $el, leftPos, newWidth;
        $mainNav2 = $("#example-two");
    
    /*
        EXAMPLE ONE
    */
    
    /* Add Magic Line markup via JavaScript, because it ain't gonna work without */
    $("#example-one").append("<li id='magic-line'></li>");
    
    /* Cache it */
    var $magicLine = $("#magic-line");
    
    $magicLine
        .width($(".current_page_item").width())
        .css("left", $(".current_page_item a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $("#example-one li").find("a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    }); 
});

$(function() {

 $('#navigation a').stop().animate({'marginLeft':'-85px'},1000);

 $('#navigation > li').hover(
  function () {
   $('a',$(this)).stop().animate({'marginLeft':'-2px'},200);
  },
  function () {
   $('a',$(this)).stop().animate({'marginLeft':'-85px'},200);
  }
 );
});

(function($){
	$.fn.snowflakes = function(options){
		
		var element = this;
		
		// random fuction for generating random vals
		random = function random(min, max){
			return Math.round(min + Math.random()*(max-min)); 
		}
		
		// snow flake class
		function Flake(_x, _y, _size, _speed)
		{
			// Flake properties
			this.id = flakeId; 
			this.x  = _x;
			this.y  = _y;
			this.size = _size;
			this.speed = _speed;
			this.step = 0;
			this.stepSize = random(1,10) / 100;
			this.resetting = false;
			this.repeat = options.iterations;
			this.counter = 0;
			
			var flakeMarkup = "<div id='flake-" + this.id + "' style='width: " + this.size + "px; height: " + this.size + "px; position: absolute; top: " + this.y + "px; left:" + this.x + "px; font-size: 0px; z-index: " + options.flakeIndex + ";pointer-events:none;-webkit-transform-style:preserve-3d;'><img src=\"/static/img/sf_" + this.id + ".png\" alt='snowflake' style='width:100%;'/></div>";
			
			if($(element).get(0).tagName === $(document).get(0).tagName){
				$('body').append(flakeMarkup);
				//Make snowfall area 20% body width
			}else{
				$(element).append(flakeMarkup);
			}
			
			this.element = document.getElementById('flake-' + this.id);
			// Update function, used to update the snow flakes, and checks current snowflake against bounds
			this.update = function(){
				//Check if snowflake is still fading and how many descents it has made
				if (this.resetting && this.counter < this.repeat) {
					if (this.element.style.opacity == 0) {
						this.reset();
					}
					return;
				};
				
				//Display none for elements that have completed all iterations.
				if (this.counter == this.repeat) {
					this.element.style.display = 'none';
				};
				
				this.y += this.speed;
				
				if(this.y > (elHeight) - this.size){
					//Keep track of snowflake descent iteration
					this.counter++;
					//Prevent a snowflake from being updated until it is fully faded out.
					this.resetting = true;
					//Fade out the snowflake
					if ( $.browser.msie ) {
						this.element.style.opacity= 0;
				 	} else {
				    	$('#flake-'+ this.id).fadeOut(500);
				 	}
				}
				
				this.element.style.top = this.y + 'px';
				this.element.style.left = this.x + 'px';
				
				this.step += this.stepSize;
				this.x += Math.cos(this.step);
				//CSS3 Progressive enhancement for rotation
				$('#flake-'+ this.id).css("-moz-transform" , "rotate("+this.x+"deg)");
				$('#flake-'+ this.id).css("-webkit-transform" , "rotate("+this.x+"deg)");
				$('#flake-'+ this.id).css("-ms-transform" , "rotate("+this.x+"deg)");
				$('#flake-'+ this.id).css("-o-transform" , "rotate("+this.x+"deg)");
				$('#flake-'+ this.id).css("transform" , "rotate("+this.x+"deg)");
			}
			
			// Resets the snowflake once it reaches one of the bounds set
			this.reset = function(){
				if ( $.browser.msie ) {
					this.element.style.opacity = 1;
			 	} else {
			    	$('#flake-'+ this.id).fadeIn(500);
			 	}
				this.y = -options.maxSize;
				this.x = random(0, elWidth);
				this.stepSize = random(1,10) / 100;
				this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
				this.speed = random(options.minSpeed, options.maxSpeed);
				this.resetting = false;
			}
		}
	
		//Make width 20% and height 90% if body tag is selected. Fixes Rockport specific z-index issues in IE.
		if ($(element).get(0).tagName == 'BODY') {
			elHeight = $(element).height() * .9;
			elWidth = $(element).width() * .2;
		} else {
			elHieght = $(element).height();
			elWidth = $(element).width();
		}
		// plugin vars
		var flakes = [],
			flakeId = 0,
			i = 0,
			elHeight = elHeight,
			elWidth = elWidth,
			defaults = {
				flakeCount : 35,
				flakeIndex: 999999,
				minSize : 1,
				maxSize : 3,
				minSpeed : 2,
				maxSpeed : 3,
				iterations : 3
				},
			options = $.extend(defaults, options);		
		
		// Bind the window resize event so we can get the innerHeight again
		$(window).bind("resize", function(){  
			if ($(element).get(0).tagName == 'BODY') {
				elHeight = $(element).height() * .9;
				elWidth = $(element).width() * .2;
			} else {
				elHieght = $(element).height();
				elWidth = $(element).width();
			}
		}); 
		

		// initialize the flakes
		for(i = 0; i < options.flakeCount; i++){
			flakeId = i;
			flakes[i] = new Flake(random(0,elWidth), random(0, -500), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed));
		}
	
		// this controls flow of the updating snow
		function snow(){
			for( i = 0; i < options.flakeCount; i++){
				flakes[i].update();
			}
		}
		setInterval(function(){snow()}, 30);
		
	};
})(jQuery);
