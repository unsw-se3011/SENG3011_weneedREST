from flask_restplus import Resource, Api, reqparse, fields, marshal
import re

class ToNumber(fields.Raw):
    def format(self, value):
        number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}
        return number_names[ value ] if value in number_names.keys() else int(value)

class ToList(fields.Raw):
    def format(self, value):
        if type(value) == list:
            return value

        return list( map( lambda x : x.strip(), value.split(',') ) )

class ReplacePlus(fields.Raw):
    def format(self, value):
        return re.sub(r'%20', ' ', re.sub(r'[\+]', ' ', value) )

location_model = {
    'latitude': fields.Float(), 
    'longitude': fields.Float()
}

event_model = {
    'type': ToList(), 
    'date': fields.String, 
    'location': location_model, 
    'number-affected': ToNumber()
}

report_model = {
    'disease': ToList(), 
    'syndrome': ToList(), 
    'comment': ReplacePlus, 
    'reported_events': event_model
}

nested_article_model = {
    'id': fields.Integer,
    'url': fields.String(), 
    'date_of_publication': fields.String, 
    'headline': ReplacePlus, 
    'main_text': ReplacePlus, 
    'reports': report_model
}