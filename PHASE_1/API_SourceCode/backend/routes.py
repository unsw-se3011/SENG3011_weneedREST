from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields
import re
from datetime import datetime

app = Flask(__name__)
api = Api(app)

# Create dummy data here
dummyResponse =[{
        "id": 1,
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
                        "number-affected": "2"
                    },
                ],
                "Comment": 'null'
            }
        ]
    }]

parser = reqparse.RequestParser()

'''
    Returns reports specifying selected criteria
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='Max number of results', location='args')
parser_report.add_argument('location', type=int, help='Geocode of area affected', location='args')
parser_report.add_argument('key_terms', type=str, help='list of key terms', location='args')
parser_report.add_argument('start-date', type=str, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_report.add_argument('end-date', type=str, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

def searchKeyTerms(event):
    args = parser_report.parse_args()

    keyterms = [word.strip() for word in args['key_terms'].split(',')]
    
    tempkeyTerms = []
    tempkeyTerms.append(event['headline'])
    tempkeyTerms.append(event['main_text'])
    tempkeyTerms.append(event['reports'][0]['disease'][0:])
    tempkeyTerms.append(event['reports'][0]['syndrome'][0:])
    tempkeyTerms.append(event['reports'][0]['reported_events'][0]['type'])

    # Test keywords
    # for word in keyterms
    for word in keyterms:
        for word2 in tempkeyTerms:
            if word in word2:
                return True
    return False

def compareStartDate(event):
    args = parser_report.parse_args()

    event_date = event['reports'][0]['reported_events'][0]['date'].split(' to ')[0]

    date_inputs1, time_inputs1 = event_date.split('T')[0], event_date.split('T')[1]
    date_inputs1, time_inputs1  = list( map(int, date_inputs1.split("-"))), list( map(int, time_inputs1.split(":")))

    date_inputs2, time_inputs2 = args['start-date'].split('T')[0], args['start-date'].split('T')[1]
    date_inputs2, time_inputs2 = list( map(int, date_inputs2.split('-'))), list( map(int, time_inputs2.split(':')))

    dateObj = datetime( *(date_inputs1 + time_inputs1) )
    start_date = datetime( *(date_inputs2 + time_inputs2) )

    if start_date > dateObj:  
        return False

    return True

def compareEndDate(event):
    args = parser_report.parse_args()

    event_date = event['reports'][0]['reported_events'][0]['date'].split(' to ')[1]

    date_inputs1, time_inputs1 = event_date.split('T')[0], event_date.split('T')[1]
    date_inputs1, time_inputs1  = list( map(int, date_inputs1.split("-"))), list( map(int, time_inputs1.split(":")))

    date_inputs2, time_inputs2 = args['end-date'].split('T')[0], args['end-date'].split('T')[1]
    date_inputs2, time_inputs2 = list( map(int, date_inputs2.split('-'))), list( map(int, time_inputs2.split(':')))

    dateObj = datetime( *(date_inputs1 + time_inputs1) )
    end_date = datetime( *(date_inputs2 + time_inputs2) )

    if end_date < dateObj:  
        return False

    return True

@api.route('/SearchReports')
@api.doc(params={'n': 'Number of results returned (max is 10)', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'start-date':'Starting date of reports', 'end-date':'Ending date or reports'})
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
            newResponse = list( filter(searchKeyTerms, newResponse) )

        if args['location'] is not None:
            newResponse = list( filter(lambda x : x['reports'][0]['reported_events'][0]['location']['geonames-id'] == args['location'], newResponse))

        if args['start-date'] is not None:
            newResponse = list( filter(compareStartDate, newResponse) )

        if args['end-date'] is not None:
            newResponse = list( filter(compareEndDate, newResponse))

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
        id = args['id']
        return f'deleted report {id}', 200

'''
    Updates an existing report with form data
'''
# parser.add_argument('url', type=str, required=True, help='url of the event', location='form')
# parser.add_argument('date_of_publication', type=str, required=True, help='date of pulication (yyyy-mm-ddThh:mm:ss)', location='form')
parser_create = parser.copy()
parser_create.add_argument('headline', type=str, required=True, help='headline for the report', location='args')
parser_create.add_argument('main_text', type=str, required=True, help='main text of the event', location='args')
parser_create.add_argument('disease', type=str, required=True, help='comma separated list of diseases', location='args')
parser_create.add_argument('syndrome', type=str, required=False, help='comma separated list of syndroms', location='args')
parser_create.add_argument('type', type=str, required=True, help='the type of event e.g death, infected', location='args')
parser_create.add_argument('geonames-id', type=int, required=True, help='geonnames id', location='args')
parser_create.add_argument('number-affected', type=int, required=True, help='number of people affected', location='args')
parser_create.add_argument('comment', type=str, required=False, help='comment', location='args')
parser_create.add_argument('start-date', type=str, required=True, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_create.add_argument('end-date', type=str, required=True, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

@api.route('/createReport')
class createReport(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.response(405, 'Invalid data')
    @api.doc(parser=parser_create)
    def post(self):
        args = parser_create.parse_args()

        if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
            return "Invalid start-date", 400

        if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
            return "Invalid end-date", 400

        n = -1
        for article in dummyResponse:
            if article['id'] > n:
                n = article['id']
        n = n+1

        newReport = dummyResponse[0]
        newReport['id'] = n
        newReport['headline'] = args['headline']
        newReport['main_text'] = args['main_text']
        newReport['reports'][0]['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        newReport['reports'][0]['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        newReport['reports'][0]['reported_events'][0]['type'] = args['type']
        newReport['reports'][0]['reported_events'][0]['date'] = f"{args['start-date']} to {args['end-date']}"
        newReport['reports'][0]['reported_events'][0]['location']['geonames-id'] = args['geonames-id'] 
        newReport['reports'][0]['reported_events'][0]['number-affected'] = args['number-affected']
        newReport['reports'][0]['Comment'] = args['comment'] if args['comment'] else 'Null'

        return newReport, 200

'''
    Updates an existing report
'''
parser_update = parser_create.copy()
parser_update.add_argument('id', type=int, required=True, help="ID of report to update", location='args')
parser_update.replace_argument('headline', required=False)
parser_update.replace_argument('main_text', required=False)
parser_update.replace_argument('disease',  required=False)
parser_update.replace_argument('syndrome',  required=False)
parser_update.replace_argument('type',  required=False)
parser_update.replace_argument('geonames-id',  required=False)
parser_update.replace_argument('number-affected',  required=False)
parser_update.replace_argument('comment',  required=False)
parser_update.replace_argument('start-date',  required=False)
parser_update.replace_argument('end-date',  required=False)

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

        newReport = dummyResponse[0]
        newReport['id'] = args['id']
        
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