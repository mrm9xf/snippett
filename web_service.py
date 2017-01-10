import utilities
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
    return static_file('home.html', root="html")

@route('/test')
def test():
    return 'Hello, World'

run(host='10.0.0.30', port=8080)
