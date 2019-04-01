from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields
import re
from helper import compareDate, searchKeyTerms, findReport
import simplejson as json
from datetime import datetime

app = Flask(__name__)
api = Api(app)

# Create dummy data here
with open('clean.json',"r") as f:
    dummyResponse = eval(f.read())
    f.close()

def dumpData(articles):
    with open('clean.json',"w") as f:
        f.write(str(articles))
        f.close()

parser = reqparse.RequestParser()

'''
    Returns reports specifying selected criteria
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='Max number of results', location='args')
parser_report.add_argument('latitude', type=float, help='latitude of area affected', location='args')
parser_report.add_argument('longitude', type=float, help='longitude of area affected', location='args')
parser_report.add_argument('key_terms', type=str, help='list of key terms', location='args')
parser_report.add_argument('start-date', type=str, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_report.add_argument('end-date', type=str, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

@api.route('/SearchReports')
@api.doc(params={
    'n': 'Number of results returned (max is 10)', 
    'longitude':'longitude of area affected', 
    'latitude':'latitude of area affected', 
    'key_terms':'Comma separated list of of all key items requested by user', 
    'start-date':'Starting date of reports', 
    'end-date':'Ending date or reports'
    }
)
class filterReports(Resource):
    @api.response(200, 'Success - All reports')
    @api.response(300, 'Success - Filtered reports returned')
    @api.response(400, 'Invalid location, key term or date')
    @api.doc(parser=parser_report)
    def get(self):
        args = parser_report.parse_args()

        if args['start-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
            return "Invalid start-date", 400

        if args['end-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
            return "Invalid end-date", 400

        newResponse = dummyResponse

        n = 10 if args['n'] is None or args['n'] > 10 else args['n'] 

        if n < 0: 
            return [], 200

        if args['key_terms'] is not None:
            newResponse = list( filter(lambda x: searchKeyTerms(args['key_terms'], x), newResponse) )

        if args['longitude'] is not None:
            newResponse = list( filter(
                lambda x : x['reports'][0]['reported_events'][0]['location']['longitude'] == args['longitude'], newResponse))

        if args['latitude'] is not None:
            newResponse = list( filter(
                lambda x: x['reports'][0]['reported_events'][0]['location']['latitude'] == args['latitude'], newResponse))

        if args['start-date'] is not None:
            newResponse = list( filter(lambda x: compareDate(args['start-date'], "greater",x), newResponse) )

        if args['end-date'] is not None:
            newResponse = list( filter(lambda x: compareDate(args['end-date'], "less", x), newResponse))

        newResponse = newResponse[:n]

        return newResponse, 200

'''
    Deletes a report
'''
parser_delete = parser.copy()
parser_delete.add_argument('id', type=int, required=True, help='ID of report to be deleted', location='args')

@api.route('/delete')
@api.doc(params={'id': 'ID of report to be deleted'})
class deleteReport(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.doc(parser=parser_delete)
    def delete(self):
        args = parser_delete.parse_args()
        n = args['id']
        
        article = findReport(n, dummyResponse)
        if article:
            dummyResponse.remove( article )
            return f'deleted report \n{article}\n', 200
        
        return "No report to be found", 400

'''
    Updates an existing report with form data
'''
parser_create = parser.copy()
parser_create.add_argument('url', type=str, required=True, help='url of the event', location='args')
parser_create.add_argument('date_of_publication', type=str, required=True, help='date of pulication (yyyy-mm-ddThh:mm:ss)', location='args')
parser_create.add_argument('headline', type=str, required=True, help='headline for the report', location='args')
parser_create.add_argument('main_text', type=str, required=True, help='main text of the event', location='args')
parser_create.add_argument('disease', type=str, required=True, help='comma separated list of diseases', location='args')
parser_create.add_argument('syndrome', type=str, required=False, help='comma separated list of syndroms', location='args')
parser_create.add_argument('event-type', type=str, required=True, help='the type of event e.g death, infected', location='args')
parser_create.add_argument('longitude', type=float, required=True, help='longitude of location', location='args')
parser_create.add_argument('latitude', type=float, required=True, help='latitude of location', location='args')
parser_create.add_argument('number-affected', type=int, required=True, help='number of people affected', location='args')
parser_create.add_argument('comment', type=str, required=False, help='comment', location='args')
parser_create.add_argument('date', type=str, required=True, help='date of the event (yyyy-mm-ddThh:mm:ss)', location='args')

@api.route('/createReport')
class createReport(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.response(405, 'Invalid data')
    @api.doc(parser=parser_create)
    def post(self):
        args = parser_create.parse_args()

        if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['date']) is None:
            return "Invalid end-date", 400

        n = len(dummyResponse)+1

        newReport = dummyResponse[0]
        newReport['id'] = n
        newReport['url'] = args['url']
        newReport['date_of_publication'] = args['date_of_publication']
        newReport['headline'] = args['headline']
        newReport['main_text'] = args['main_text']
        newReport['reports'][0]['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        newReport['reports'][0]['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        newReport['reports'][0]['reported_events'][0]['type'] = args['event-type']
        newReport['reports'][0]['reported_events'][0]['date'] = args['date']
        newReport['reports'][0]['reported_events'][0]['location']['longitude'] = args['longitude'] 
        newReport['reports'][0]['reported_events'][0]['location']['latitude'] = args['latitude']
        newReport['reports'][0]['reported_events'][0]['number-affected'] = args['number-affected']
        newReport['reports'][0]['Comment'] = args['comment'] if args['comment'] else 'Null'

        return newReport, 200

'''
    Updates an existing report
'''
parser_update = parser_create.copy()
parser_update.add_argument('id', type=int, required=True, help="ID of report to update", location='args')
parser_update.replace_argument('url', required=False)
parser_update.replace_argument('date_of_publication',required=False)
parser_update.replace_argument('headline', required=False)
parser_update.replace_argument('main_text', required=False)
parser_update.replace_argument('disease', required=False)
parser_update.replace_argument('syndrome', required=False)
parser_update.replace_argument('type', required=False)
parser_update.replace_argument('geonames-id', required=False)
parser_update.replace_argument('number-affected', required=False)
parser_update.replace_argument('comment', required=False)
parser_update.replace_argument('start-date', required=False)
parser_update.replace_argument('end-date', required=False)

@api.route('/updateReport')
class updateReport(Resource):
# PUT is for updating
# Post is for creating
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.response(405, 'Invalid data')
    @api.doc(parser=parser_update)
    def put(self):
        args = parser_update.parse_args()

        if args['start-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
            return "Invalid start-date", 400

        if args['end-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
            return "Invalid end-date", 400

        newReport = findReport(args['id'], dummyResponse)
        
        # Updating all report details
        if args['headline'] is not None:
            newReport['headline'] = args['headline']
        if args['main_text'] is not None:
            newReport['main_text'] = args['main_text']
        if args['disease'] is not None:
            newReport['reports'][0]['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        if args['syndrome'] is not None:
            newReport['reports'][0]['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        if args['type'] is not None:
            newReport['reports'][0]['reported_events'][0]['type'] = args['type']
        if args['geonames-id'] is not None:
            newReport['reports'][0]['reported_events'][0]['location']['geonames-id'] = args['geonames-id'] 
        if args['number-affected'] is not None:
            newReport['reports'][0]['reported_events'][0]['number-affected'] = args['number-affected']
        if args['comment'] is not None:
            newReport['reports'][0]['Comment'] = args['comment']

        # Replacing start-date and end-date with regex
        temp = newReport['reports'][0]['reported_events'][0]['date']
        if args['start-date'] is not None and args['end-date'] is not None:
            newReport['reports'][0]['reported_events'][0]['date'] = f"{args['start-date']} to {args['end-date']}"
        elif args['start-date'] is not None and args['end-date'] is None:
            newReport['reports'][0]['reported_events'][0]['date'] = re.sub(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2} to', f"{args['start-date']} to", temp)
        else: 
            newReport['reports'][0]['reported_events'][0]['date'] = re.sub(r'to \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', f"to {args['end-date']}", temp)

        return newReport, 200
