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


function build_snippett(snip_title, snip_text, snip_time){
  var snippett = `
  <div class="status-list">
    <div class="post-title">
      ${snip_title}
    </div>
    <p class="post-text">${snip_text}</p>
    <div class="post-time">
      <span class="time">${snip_time}</span>
      <a class="like-post" onclick="LikePost(this)" href="#">Like Post</a>
      +<span class="likes">0</span>
      <a class="delete-post" onclick="DeletePost(this)" href="#">Delete Post</a>
    </div>
  </div>
  `;

    return snippett
}

//functions
function PostStatus(){
    //get text from the snippett
    var snip_text = $('#snippett-text').val();

    //get the title of the snippett
    var snip_title = $('#snippett-title').val();

    //get the createdon
    var snip_time = FormatDate();

    //pull the the current list of statuses for the user
    var statuses = $('.status-list');

    //if the post text length is 0, throw error
    if(snip_text.length == 0){
  	alert('Please ensure that your post contains');
    } 
    //post text length > 0
    else {
	//if no statuses have ever been posted before, generate one
	if( statuses.length == 0 ){
	    //prep the status
	    var new_snippett = build_snippett(snip_title, snip_text, snip_time);

	    $(new_snippett).insertAfter($('#top-nav'));
	} 
	//if statues have been posted before, clone the last one
	else {
	    //insert another status at the top of the list
	    $('.status-list:first').clone(true).insertBefore('.status-list:first');

	    //reset the likes for the new post to 0
	    $('.likes').eq(0).text("0");

	    //set the title
	    $('.post-title').eq(0).text(snip_title);

	    //add text from status update to newly created div
	    $('.status-list:first').find('.post-text').html(snip_text);


	    //add the span and hyperlink to time div
	    $('.status-list:first').find('.time').html(snip_time);

	}
    
	//find the timeout associated to their post (length of time before next story)
	var timeout = 10;
	for ( var i = 0; i < timeout_map.length - 1; i++){
	    //if the post length is inbetween the lengths within timeout_map, assign that as timeout
    	    if (snip_text.length >= timeout_map[i].min & snip_text.length <= timeout_map[i].max){
      		//alert(timeout_map[i].timeout.toString());
		timeout = timeout_map[i].timeout;
	    }
	}
	
	//reset the status text area
	$('#snippett-text').val('');
	
	//reset the counter
	$('#counter').text('0');

	//dropping the popup
	$('#post-popup').remove();
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
    var l = $('#snippett-text').val().length;

    //2. set the span "#counter" to length l
    $('#counter').text(l.toString());
}

//function for post popup
function NewSnip(){
    var popup = `
	<div id="post-popup">
	  <table id="post-snip">
	    <tr>
	      <div id="close-snip"  onclick="CloseSnip()">X</div>
            </tr>
	    <tr>
	      <td colspan="2" class="snip-header">Tell us about your snip:</td>
	    </tr>
	    <tr>
	      <td class="snip-header">
	        Post Name / Anthology
	        <select id="anthology">
	          <option value=0>New post/anthology</option>
	        </select>
	        </td>
	    </tr>
	    <tr>
	      <td class="snip-header">
	        Snip Title: <input type="text" id="snippett-title" />
              </td>
            </tr>
	    <tr>
	      <td colspan=2>
	        <textarea id="snippett-text" onkeyup="FindLength()"></textarea>
	      </td>
	    </tr>
	    <tr>
	      <td><span id="counter">0</span></td>
	      <td><button id="post" onclick="PostStatus()">POST</button></td>
	    </tr>
	  </table>
	</div>
    `;

    if( ! $('#post-popup').length ){
	$('#top-nav').append(popup);
    }
}

//function for closing the snip (clicking X in corner)
function CloseSnip(){
    $('#post-popup').remove();
}

//function to get snips to display
function GetSnips(){
    $.ajax({
	type: 'GET',
	url: 'http://10.0.0.30:8080/snippett/get_snips',
	dataType: 'json',
	success: function(data){
	    SnipList(data);
	},
	error: function(jqHXR, textStatus, errorThrown){
	    alert('error: ' + textStatus + ': ' + errorThrown);
	}
    });
}

//function to fill in the status list
function SnipList(data){
    var l = Object.keys(data).length;
    for(var i = 0; i < l; i++){
	var snip_text = data[i]['snipText'];
	var snip_title = data[i]['snipTitle'];
	var snip_time = data[i]['snipTime'];
	var new_snippett = build_snippett(snip_title, snip_text, snip_time);
	$(new_snippett).insertAfter('#top-nav');
    }
}
