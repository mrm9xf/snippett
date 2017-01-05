//actions

//variables
var timeout_map = [
    {'min': 1, 'max': 1000, 'timeout': 1},
    {'min': 1001, 'max': 5000, 'timeout': 2},
    {'min': 5001, 'max': 10000, 'timeout': 3},
    {'min': 10001, 'max': 20000, 'timeout': 4},
    {'min': 20001, 'max': 30000, 'timeout': 5},
    {'min': 30001, 'max':40000, 'timeout': 6},
    {'min': 40001, 'max': 50000, 'timeout': 7},
    {'min': 50001, 'max': 60000, 'timeout': 8},
    {'min': 60001, 'max': 70000, 'timeout': 9},
    {'min': 70001, 'max': 80000, 'timeout': 10},
    {'min': 80001, 'max': 90000, 'timeout': 11},
    {'min': 90001, 'max': 100000, 'timeout': 12},
    {'min': 100001, 'max': 200000, 'timeout': 13},
    {'min': 200001, 'max': 999999999999999, 'timeout': 14}
];

//functions
function PostStatus(){
    //get text from textarea
    var text = $('#input-text').val();

    //pull the the current list of statuses for the user
    var statuses = $('.status-list');

    //if the post text length is 0, throw error
    if(text.length == 0){
  	alert('Please ensure that your post contains');
    } 
    //post text length > 0
    else {
	//if no statuses have ever been posted before, generate one
	if( statuses.length == 0 ){
	    $(`<div class="status-list">
                 <p class="post-text"></p>
	         <div class="post-time">
                   <span class="time"></span>
                   <a class="like-post" onclick="LikePost(this)" href="#">Like Post</a>
                   +<span class="likes">1</span>
                   <a class="delete-post" onclick="DeletePost(this)" href="#">Delete Post</a>
	         </div>
	       </div>`).insertAfter($('#status'));
	} 
	//if statues have been posted before, clone the last one
	else {
	    $('.status-list:first').clone(true).insertBefore('.status-list:first');
	}
    
	//find the timeout associated to their post (length of time before next story)
	var timeout = 10;
	for ( var i = 0; i < timeout_map.length - 1; i++){
	    //if the post length is inbetween the lengths within timeout_map, assign that as timeout
    	    if (text.length >= timeout_map[i].min & text.length <= timeout_map[i].max){
      		//alert(timeout_map[i].timeout.toString());
		timeout = timeout_map[i].timeout;
	    }
	}
	
	//add text from status update to newly created div
	$('.status-list:first').find('.post-text').html(text);
	
	//add the span and hyperlink to time div
	$('.status-list:first').find('.time').html(FormatDate());
	
	//reset the status text area
	$('#input-text').val('');
	
	//reset the counter
	$('#counter').text('0');

    }
}

//function to delete a post
function DeletePost(element){
    // 1. find the closest element of the status list and drop it
    $(element).closest('.status-list').remove();
}

//function to like a post
function LikePost(element){
    // 1. find the closest timestamp and then drill down to the likes
    var l = $(element).closest('.post-time').find('.likes');

    // 2. parse the # of likes from the <span> and add 1
    var num = parseInt(l.text()) + 1;

    // 3. update the # of likes
    l.text(num.toString());
}

function FormatDate(){
    // 1. get the current date
    var d = new Date();
  
    // 2. pull out the day, month, year
    var d_day = d.getDate();
    var d_month = d.getMonth() + 1;
    var d_year = d.getFullYear();
  
    // 3. pull out the hours and minutes
    var d_hour = d.getHours();
    var d_minute = d.getMinutes();
  
    // 4. analyze hours for AM/PM
    var d_am_pm = 'AM';
    if ( d_hour > 12 ){
	d_hour -= 12;
	d_am_pm = 'PM';
    }
  
    // 5. format date
    var d = d_month 
          + '/' 
          + d_day 
          + '/' 
          + d_year 
          + ' ' 
          + d_hour 
          + ':' 
          + 
          d_minute 
          + ' ' 
          + d_am_pm;
    
    // 6. return date
    return d;
}

//function to power the character counter
function FindLength(){
    //1. grab the length of the current textbox
    var l = $('#input-text').val().length;

    //2. set the span "#counter" to length l
    $('#counter').text(l.toString());
}
