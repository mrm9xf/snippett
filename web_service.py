from bottle import get, route, run, template, static_file

# Static Routes
@get("/css/<filepath:re:.*\.css>")
def css(filepath):
    return static_file(filepath, root="css")

@get("/img/<filepath:re:.*\.(jpg|png|gif|ico|svg)>")
def img(filepath):
    return static_file(filepath, root="img")

@get("/js/<filepath:re:.*\.js>")
def js(filepath):
    return static_file(filepath, root="js")

@route('/home')
def home():
    return """
    <html>
      <head>
        <link type="text/css" href="/css/wp.css" rel="stylesheet">
        <script type="text/javascript" src="/js/wp-1.0.0.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.js"></script>
      </head>
      <body>
        <div id="status">
          <textarea id="input-text" onkeyup="FindLength()"></textarea>
          <span id="counter">0</span>
          <button id="post" onclick="PostStatus()">POST</button>
        </div>
      </body>
    </html> 
    """

run(host='10.0.0.30', port=8080)
