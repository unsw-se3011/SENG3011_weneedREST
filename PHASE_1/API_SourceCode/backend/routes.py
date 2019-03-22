from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse

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

# Testing
@api.route('/hello')
class hello(Resource):
    def get(self):
        return {'hello': 'world'}

# Returns all reports 
@api.route('/allReports')
class allReports(Resource):
    def get(self):
        return response, 200

parser = reqparse.RequestParser()

parser.add_argument('n', type=int, required=True, help='n - number of results', location='headers')
parser.add_argument('location', type=str, required=True, help='location of reports', location='headers')
parser.add_argument('key_terms', required=True, help='list of key terms', location='headers')
parser.add_argument('date', required=True, help='date range of reports', location='headers')
# Returns reports specifying selected criteria
@api.route('/reports')
@api.doc(params={'n': 'Number of results returned', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'date':'Date in either date_exact or date_range format', 'date_exact':'yyyy-mm-ddThh:mm:ss. Year field mandatory, every other segment optional', 'date_range':'d1 to d2 with d1 being an exact date before d2'})
class specificReports(Resource):
    @api.doc(responses={'200':'Successful', '400':'Invalid Location, Key Term or Date'})
    def get(self):
        args = parser.parse_args()
        print(args)
        return response, 200

# Deletes a report
@api.route('/delete')
@api.doc(params={'id': 'ID of report to be deleted'})
class delete(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found'})
    def delete(self, id):
        return response


# Updates an existing report with form data
# TODO - create arguments to fill in the response
@api.route('/postReport')
@api.doc(params={'id': 'ID number of report'})
class postReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    def post(self):
        return response

# Updates an existing report
# TODO - create arguments to fill in the response
@api.route('/updateReport<string:id>')
class updateReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    def post(self, id):
        return response

# PUT is for updating
# Post is for creating