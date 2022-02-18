# -*- coding: UTF-8 -*-
'''
@Project ：youtube_highlight_extract 
@File ：app.py.py
@IDE  ：PyCharm 
@Author ： Hwang
@Date ：2022-02-07 오후 5:28 
'''

from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
api = Api(app)

@app.route("/", defaults={'path' : ''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')