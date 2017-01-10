import os
import sys
import pyodbc

QUERIES_DIR = '/home/mrm9xf/Documents/snippett/queries/'

def build_connection():
    connection = pyodbc.connect('DSN=MYSQL')
    return connection

def read_query(query_name, params={}):
    if len(params):
        sql = open(os.path.join(QUERIES_DIR, query_name + '.sql'), 'r').read().format(**params)
    else:
        sql = open(os.path.join(QUERIES_DIR, query_name + '.sql'), 'r').read()

    return sql

def execute_query(sql, connection):
    results = connection.cursor().execute(sql).fetchall()
    return results


def write_query(sql, connection):
    connection.cursor().execute(sql)
    connection.commit()

def create_collection(collection_name, author, connection):
    # prepare parameters for queries
    params = {
        'collection_name': collection_name,
        'author': author
    }

    # read in the create_collection.sql query
    sql = read_query('create_collection', params)

    # write the row in collection
    write_query(sql, connection)
    
    # read in the last_insert_id.sql query
    sql = read_query('last_insert_id')

    # pull the identity insert
    collection_id = execute_query(sql, connection)[0][0]

    return collection_id

def write_snip(snip_text, collection_id, connection):
    # prepare parameters for queries
    params = {
        'snip_text': snip_text,
        'collection_id': collection_id
    }

    # read in the create_snip.sql query
    sql = read_query('create_snip', params)

    # write the row in snip_info
    write_query(sql, connection)

    # read in the last_insert_id.sql query
    sql = read_query('last_insert_id')

    # pull the identity insert
    snip_id = execute_query(sql, connection)[0][0]

    return snip_id
