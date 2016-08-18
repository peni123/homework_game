

var top_positions = [0, 100,  200, 300, 400];
var top_pos;
var left_positions = [0, 200, 400,  600];
var left_pos;
var lives = 5;
var hits =15;
var fly = $('#fly');
var is_hit = false;
var fly_initial_position = parseInt($('#fly').css('right'));
var container_width = parseInt($('#container').width());
var container_hight = parseInt($('#container').height());
var game;

function randPos_Top( jQuery ) {
	var top_pos = top_positions[Math.floor(Math.random() * top_positions.length)];
	return top_pos;	
}
function randPos_Left( jQuery ) {
	var left_pos = left_positions[Math.floor(Math.random() * left_positions.length)];
	return left_pos;	
}	
$(document).ready(function(){
	 $("#btn").click(function(){ 
		 game =	setInterval(function(){
			$('#swat').animate({ top: randPos_Top(), left: randPos_Left() },750);
			if (collision() && is_hit){
				lives--;
				$('#lives').html(lives);
				if (lives == 0) {
					game_over();
				}
				
			}
			hits--;
			$('#hits').text(hits);
			if (hits == 0) {
				game_over();
			}
			
	    },500);
	});
});
$(function (){
	var fly = '<div id="fly"></div>';
	$('#candy').append(fly);
});	


$(function (){
	$(document).keydown(function(e){
		var position = $('#fly').position();
			switch(e.keyCode) {
			case 37:  //left
				$('#fly').css('left', position.left - 75 +'px');
				break;
			case 38 : //up
				$('#fly').css('top', position.top - 75 + 'px');
				break;
			case 39:  //right
				$('#fly').css('left', position.left + 75 + 'px');
				break;
			case 40:  //down
				$('#fly').css('top', position.top + 75 + 'px');
				break;
			}
			if (position.left > container_width || position.top > container_hight ) {
				position = fly_initial_position;	
			}	
	});
})

    
function collision() {
	var fly_left = parseInt($('#fly').offset().left);
    var fly_top = parseInt($('#fly').offset().top);
    var fly_height = parseInt($('#fly').outerHeight(true));
    var fly_width = parseInt($('#fly').outerWidth(true));    
    var fly_bottom = fly_top + fly_height;
    var fly_right = fly_left + fly_width;
    
    var swatter_left = $('#swat').offset().left;
    var swatter_top = $('#swat').offset().top;
    var swatter_height =$('#swat').outerHeight(true);
    var swatter_width = $('#swat').outerWidth(true);
    var sawtter_bottom = parseInt(swatter_top + swatter_height);
    var swatter_right = parseInt(swatter_left + swatter_width);

    if (((fly_bottom > swatter_top && fly_bottom < sawtter_bottom) && 
    		((fly_left < swatter_right && fly_left > swatter_left ) ||	
    		(fly_right > swatter_left && fly_right < swatter_right))) ||
    		(( fly_top > sawtter_bottom && fly_top < swatter_top) &&
    		((fly_left < swatter_right && fly_left > swatter_left ) ||
    		(fly_right > swatter_left && fly_right < swatter_right)))){
    		
    	is_hit = true;
    	return is_hit;
    }
    return false;
}

function game_over (){
	clearInterval(game);
	if(lives==0 && hits >0){
		alert('Fly Lost');
	}
	if(hits==0 && lives > 0){
		alert('Fly Wins');
	}		
}