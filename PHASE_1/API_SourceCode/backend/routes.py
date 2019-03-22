from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields

app = Flask(__name__)
api = Api(app)

# Create dummy data here
response ={
        "url": "www.outbreaks.globalincidentmap.com/eventdetail.php?ID=31146",
        "date_of_publication": "2019-02-27T23:20:00 ",
        "headline": "TANZANIA - Anthrax kills two people in northern Tanzania",
        "main_text": "2 people died and 8 others were hospitalized following an anthrax outbreak...",
        "reports": [
            {
                "disease": [
                    "anthrax",
                ],
                "syndrome": [],
                "reported_events": [
                    {
                        "type": "death",
                        "date": "2018-12-01T23:20:00 to 2018-12-10T23:50:00",
                        "location": {
                            "geonames-id": 1566083
                        },
                        "number-affected": 2
                    },
                ],
                "Comment": 'null'
            }
        ]
    }

parser = reqparse.RequestParser()

'''
    Testing
'''
@api.route('/hello')
class hello(Resource):
    def get(self):
        return {'hello': 'world'}

'''
    Returns all reports 
'''
@api.route('/allReports')
class allReports(Resource):
    def get(self):
        return response, 200
api.add_resource(allReports, '/allReports', endpoint='allReports')

'''
    Returns reports specifying selected criteria
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='number of results', location='args')
parser_report.add_argument('location', type=str, required=True, help='location of reports', location='args')
parser_report.add_argument('key_terms', type=str, required=True, help='list of key terms', location='args')
parser_report.add_argument('start-date', type=str, required=True, help='start date of date range', location='args')
parser_report.add_argument('end-date', type=str, required=True, help='end date of date range', location='args')

@api.route('/reports')
@api.doc(params={'n': 'Number of results returned', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'start-date': 'start or date range (yyyy-mm-ddThh:mm:ss)',  'end-date': 'end of date range (yyyy-mm-ddThh:mm:ss)'})
class specificReports(Resource):
    @api.doc(responses={'200':'Successful', '400':'Invalid Location, Key Term or Date'})
    @api.doc(parser=parser_report)
    def get(self):
        args = parser_report.parse_args()
        if args['n'] == None:
            args['n'] = 10

        return {'args': args, 'response': response}, 200
api.add_resource(specificReports, '/reports', endpoint='reports')

'''
    Deletes a report
'''
parser_delete = parser.copy()
parser_delete.add_argument('id', type=int, required=True, help='ID of report to be deleted', location='args')

@api.route('/delete')
@api.doc(params={'id': 'ID of report to be deleted'})
class deleteReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found'})
    @api.doc(parser=parser_delete)
    def delete(self):
        args = parser_delete.parse_args()

        return {'args': args, 'response': response}, 200
api.add_resource(deleteReport, '/delete', endpoint='delete')

'''
    Updates an existing report with form data
'''
# parser.add_argument('url', type=str, required=True, help='url of the event', location='form')
# parser.add_argument('date_of_publication', type=str, required=True, help='date of pulication (yyyy-mm-ddThh:mm:ss)', location='form')
# parser.add_argument('headline', type=str, required=True, help='headline for the report', location='form')
# parser.add_argument('main_text', type=str, required=True, help='main text of the event', location='form')
parser_create = parser.copy()
parser_create.add_argument('disease', type=str, required=True, help='comma separated list of diseases', location='form')
parser_create.add_argument('syndrome', type=str, required=True, help='comma separated list of syndroms', location='form')
parser_create.add_argument('type', type=str, required=True, help='the type of event e.g death, infected', location='form')
parser_create.add_argument('location', type=int, required=True, help='geonnames id', location='form')
parser_create.add_argument('number-affected', type=int, required=True, help='number of people affected', location='form')
parser_create.add_argument('comment', type=str, required=True, help='comment', location='form')
parser_create.add_argument('start-date', type=str, required=True, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='form')
parser_create.add_argument('end-date', type=str, required=True, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='form')

@api.route('/createReport')
class createReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    @api.doc(parser=parser_create)
    def post(self):
        args = parser_create.parse_args()

        return {'args': args, 'response': response}, 200
api.add_resource(createReport, '/createReport', endpoint='createReport')

'''
    Updates an existing report
'''
parser_update = parser_create.copy()
parser_update.replace_argument('disease',  required=False)
parser_update.replace_argument('syndrome',  required=False)
parser_update.replace_argument('type',  required=False)
parser_update.replace_argument('location',  required=False)
parser_update.replace_argument('number-affected',  required=False)
parser_update.replace_argument('comment',  required=False)
parser_update.replace_argument('start-date',  required=False)
parser_update.replace_argument('end-date',  required=False)

@api.route('/updateReport')
class updateReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    @api.doc(parser=parser_update)
    def put(self):
        args = parser_update.parse_args()

        return {'args': args, 'response': response}, 200
api.add_resource(updateReport, '/updateReport', endpoint='updateReport')