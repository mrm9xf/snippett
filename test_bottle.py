from bottle import route, run, template, static_file

@route('/hello')
def index():
    return 'Hello, World!'

@route('/home')
def home():
    return """
<html><head> 

  <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.js"></script>
 

  <style type="text/css">
    #status {
  width: 100%;
  height: 134px;
  border-bottom: 2px solid;
}

#post {
  float: right;
  border: 1px solid;
  width: 50px;
  height: 20px;
  background-color: blue;
  color: cyan;
}

#input-text {
  height: 100px;
  width: inherit;
  resize: none;
}

.status-list {
  display: block;
  width: 100%;
  border-bottom: 2px solid; 
  padding-bottom: 9px;
}

.post-text {
  width: 100%;
  height: 90px;
  margin: 0;
}

.post-time {
  text-align: right;
  width: 100%;
  height: 10px;
  border-top: 0.5px solid; 
}
  </style>

  <title></title>

  
    




<script type="text/javascript">//<![CDATA[
window.onload=function(){
//actions
$('#post').click(function(){
	PostStatus();
});

$(document).on('click', '.delete-post', function(){
			$(this).closest('.status-list').remove()
});

$(document).on('click', '.like-post', function(){
			var l = $(this).closest('.post-time').find('.likes');
  var num = parseInt(l.text()) + 1;
  l.text(num.toString());
});

//variables
var timeout_map = [
    {
    'min': 1,
    'max': 100,
    'timeout': 10
  },
  {
	'min': 101,
    'max': 500,
    'timeout': 30
  },
  {
	'min': 501,
    'max': 1000,
    'timeout': 60
  },
  {
	'min': 1001,
    'max': 2000,
    'timeout': 120
  },
  {
	'min': 2001,
    'max': 3000,
    'timeout': 180
  },
  {
	'min': 3001,
    'max':4000,
    'timeout': 240
  },
  {
	'min': 4001,
    'max': 5000,
    'timeout': 300
  },
  {
	'min': 5001,
    'max': 6000,
    'timeout': 360
  },
  {
	'min': 6001,
    'max': 7000,
    'timeout': 420
  },
  {
	'min': 7001,
    'max': 8000,
    'timeout': 480
  },
  {
	'min': 8001,
    'max': 9000,
    'timeout': 540
  },
  {
	'min': 9001,
    'max': 10000,
    'timeout': 600
  },
  {
	'min': 10001,
    'max': 20000,
    'timeout': 1200
  }
];

//functions
function PostStatus(){
	 //get text from textarea
  var text = $('#input-text').val();
  var statuses = $('.status-list');
  if(text.length == 0){
  		 alert('Please ensure that your post contains');
  } else {
    if( statuses.length == 0 ){
      $(`<div class="status-list">
               <p class="post-text"></p>
	                <div class="post-time">
             <span class="time"></span>
             <a class="like-post" href="#">Like Post</a>
             +<span class="likes">1</span>
             <a class="delete-post" href="#">Delete Post</a>
	              </div>
		               </div>`).insertAfter($('#status'));
    } else {
      $('.status-list:first').clone(true).insertBefore('.status-list:first');
    }
    
    //find the timeout associated to their post
    for ( var i = 0; i < timeout_map.length - 1; i++){
    	if (text.length >= timeout_map[i].min & text.length <= timeout_map[i].max){
      	alert(timeout_map[i].timeout.toString());
      }
    }
    
    //add text from status update to newly created div
    $('.status-list:first').find('.post-text').html(text);
    
    //add the span and hyperlink to time div
    $('.status-list:first').find('.time').html(FormatDate());
    
    //reset the status text area
    $('#input-text').val('');
  }
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
}//]]> 

</script>

  
</head>

<body>
  <div id="status">
<textarea type="text" id="input-text"></textarea>
<button id="post">POST</button>
</div>

  </body>

</html>

    """

run(host='10.0.0.30', port=8080)
