from utilities import utilities
from bottle import get, route, run, request, response, template, static_file

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

@get("/html/<filepath:re:.*\.html")
def html(filepath):
    return static_file(filepath, root="html")

@route('/home')
def home():
    return html('home.html', method='GET')

@route('/create_collection', method='POST')
def create_collection():
    #build connection
    connection = utilities.build_connection()

    #get passed args
    response.content_type = 'application/json'
    collection_name       = str(request.json.get('collectionName', ''))
    author                = str(request.json.get('author', ''))

    #dummy logic, will progress with utilities to check stuff
    if len(collection_name) and len(author):
        collection_id = utilities.create_collection(collection_name, author, connection)
        msg = "collection created"
    else:
        msg = 'uh oh, no collection'

    #close connection
    connection.close()

    return "<html><body><p>{0}</p></body></html>".format(msg)

@route('/create_snip', method='POST')
def create_collection():
    #build connection
    connection = utilities.build_connection()

    #get passed args
    response.content_type = 'application/json'
    snip_text             = str(request.json.get('snipText', ''))
    collection_id         = int(request.json.get('collectionId', 0))

    #dummy logic, will progress with utilities to check stuff
    if len(snip_text) and collection_id:
        snip_id = utilities.write_snip(snip_text, collection_id, connection)
        msg = "snip written"
    else:
        msg = 'uh oh, no snip'

    #close connection
    connection.close()

    return "<html><body><p>{0}</p></body></html>".format(msg)

@route('/test')
def test():
    return 'Hello, World'

run(host='10.0.0.30', port=8080)
