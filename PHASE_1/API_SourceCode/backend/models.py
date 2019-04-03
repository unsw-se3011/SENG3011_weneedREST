from flask_restplus import Resource, Api, reqparse, fields, marshal

class ToNumber(fields.Raw):
    def format(self, value):
        number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}
        return number_names[ value ] if value in number_names.keys() else int(value)

location_model = {
    'latitude': fields.Float(attribute='Latitude'), 
    'longitude': fields.Float(attribute='Longitude')
}

event_model = {
    'type': fields.List( fields.String, attribute='event-type'), 
    'date': fields.String, 
    'location': fields.Nested( location_model ), 
    'number-affected': ToNumber()
}

report_model = {
    'disease': fields.String, 
    'syndrome': fields.List( fields.String ), 
    'comment': fields.String, 
    'reported_events': fields.Nested( event_model )
}

article_model = {
    'id': fields.String(attribute='ID'),
    'type-id': fields.Integer(attribute='Type_ID'),
    'url': fields.String(attribute='URL'), 
    'date_of_publication': fields.String, 
    'headline': fields.String(attribute='TipText'), 
    'main_text': fields.String(attribute='Description'), 
    'reports': fields.Nested( report_model )
}

article_list_model = fields.List( fields.Nested( article_model ) )