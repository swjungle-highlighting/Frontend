# -*- coding: UTF-8 -*-
'''
@Project ：youtube_highlight_extract 
@File ：HelloApiHandler.py
@IDE  ：PyCharm 
@Author ： Hwang
@Date ：2022-02-07 오후 5:30 
'''

from flask_restful import Api, Resource, reqparse

class HelloApiHandler(Resource):
    def get(self):
        return {
            'resultStatus' : "SUCCESS",
            'message' : "Hello Api Handler"
        }

    def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('message', type=str)

        args = parser.parse_args()

        print(args)

        request_type = args['type']
        requset_json = args['message']

        ret_status = request_type
        ret_msg = requset_json

        if ret_msg:
            message = "Your Message Requested : {}".format(ret_msg)
        else:
            message = "No Msg"

        final_ret = {
            "status" : "Success",
            "message" : message
        }

        return final_ret