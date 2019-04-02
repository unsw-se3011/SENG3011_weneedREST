from flask_restplus import Resource, Api, reqparse, fields, marshal

# {
#     "url": "www.who.int/lalala",
#     "date_of_publication": "2018-12-12Txx:xx:xx",
#     "headline": "Outbreaks in Southern Vietnam",
#     "main_text": "Three people infected by what is thought...",
#     "reports": [
#         {
#             "disease": [
#                 "influenza a/h5n1",
#                 "influenza a/h7n9" 
#             ],
#             "syndrome": [],
#             "reported_events": [
#                 {
#                     "type": "recovered",
#                     "date": "2018-12-01Txx:xx:xx to 2018-12-10Txx:xx:xx", 
#                     "location": {
#                         "geonames-id": 1566083 
#                     },
#                     "number-affected": 1 
#                 },
#                 {
#                     "type": "hospitalised",
#                     "date": "2018-12-01Txx:xx:xx to 2018-12-10Txx:xx:xx", 
#                     "location": {
#                         "geonames-id":1566083 
#                     },
#                     "number-affected":2 
#                 }
#             ],
#             "Comment": None
#         },
#         {
#             "disease": [
#                 "unknown" 
#             ],
#             "syndrome": [
#                 "Acute fever and rash" 
#             ],
#             "reported_events": [
#                 {
#                     "type": "infected",
#                     "date": "2018-12-01Txx:xx:xx to 2018-12-10Txx:xx:xx", 
#                     "location": {
#                         "geonames-id": 1566083 
#                     },
#                     "number-affected": 2 
#                 }
#             ],
#             "comment": None
#         }
#     ]
# }


class ToNumber(fields.Raw):
    def format(self, value):
        number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}
        return number_names[ value ] if value in number_names.keys() else int(value)

location_model = {
    'latitude': fields.Float, 
    'longitude': fields.Float
}

event_model = {
    'type': fields.List( fields.String ), 
    'date': fields.String, 
    'location': fields.Nested( location_model ), 
    'number-affected': fields.String
}

report_model = {
    'disease': fields.List( fields.String ), 
    'syndrome': fields.List( fields.String ), 
    'comment': fields.String, 
    'reported_events': fields.List( fields.Nested( event_model ) )
}

article_model = {
    'id': fields.String(attribute='ID'),
    'url': fields.String(attribute='URL'), 
    'date_of_publication': fields.String, 
    'headline': fields.String(attribute='TipText'), 
    'main_text': fields.String(attribute='Description'), 
    'reports': fields.List( fields.Nested( report_model ) )
}

article_list_model = fields.List( fields.Nested( article_model ) )