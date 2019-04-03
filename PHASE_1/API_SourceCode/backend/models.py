from flask_restplus import Resource, Api, reqparse, fields, marshal

class ToNumber(fields.Raw):
    def format(self, value):
        number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}
        return number_names[ value ] if value in number_names.keys() else int(value)

location_model = {
    'latitude': fields.Float(), 
    'longitude': fields.Float()
}

event_model = {
    'type': fields.List( fields.String ), 
    'date': fields.String, 
    'location': location_model, 
    'number-affected': ToNumber()
}

report_model = {
    'disease': fields.String, 
    'syndrome': fields.List( fields.String ), 
    'comment': fields.String(default="None"), 
    'reported_events': event_model
}

nested_article_model = {
    'id': fields.Integer,
    'type-id': fields.Integer(attribute='Type_ID'),
    'url': fields.String(), 
    'date_of_publication': fields.String, 
    'headline': fields.String(), 
    'main_text': fields.String(), 
    'reports': report_model
}