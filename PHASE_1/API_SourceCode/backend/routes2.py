from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields
import re
from datetime import datetime
from helper import compareDate, searchKeyTerms, findReport, dumpData

app = Flask(__name__)
api = Api(app)

# Create dummy data here
with open('clean.json',"r") as f:
    dummyResponse = eval(f.read())
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

'''
    Creates report with form data
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

'''
    Updates an existing report
'''
parser_update = parser_create.copy()
parser_update.replace_argument('url', required=False)
parser_update.replace_argument('date_of_publication',required=False)
parser_update.replace_argument('headline', required=False)
parser_update.replace_argument('main_text', required=False)
parser_update.replace_argument('disease', required=False)
parser_update.replace_argument('syndrome', required=False)
parser_update.replace_argument('event-type', required=False)
parser_update.replace_argument('longitude', required=False)
parser_update.replace_argument('latitude', required=False)
parser_update.replace_argument('number-affected', required=False)
parser_update.replace_argument('comment', required=False)
parser_update.replace_argument('date', required=False)

#Returns all reports
class ReportList(Resource):
    # filters reports
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
            newResponse = list( filter(lambda x : x['location']['geonames-id'] == args['location'], newResponse))

        if args['start-date'] is not None:
            newResponse = list( filter(compareStartDate, newResponse) )

        if args['end-date'] is not None:
            newResponse = list( filter(compareEndDate, newResponse))

        newResponse = newResponse[:n]

        return newResponse, 200

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
        newReport['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        newReport['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        newReport['event-type'] = args['event-type']
        newReport['date'] = f"{args['start-date']} to {args['end-date']}"
        newReport['location']['geonames-id'] = args['geonames-id'] 
        newReport['number-affected'] = args['number-affected']
        newReport['Comment'] = args['comment'] if args['comment'] else 'Null'

        return newReport, 200


class Report(Resource):
    def delete(self, report_id):
        return f'deleted report {report_id}', 200

    @api.doc(parser=parser_update)
    def put(self, report_id):
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
            newReport['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        if args['syndrome'] is not None:
            newReport['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        if args['type'] is not None:
            newReport['event-type'] = args['type']
        if args['geonames-id'] is not None:
            newReport['location']['geonames-id'] = args['geonames-id'] 
        if args['number-affected'] is not None:
            newReport['number-affected'] = args['number-affected']
        if args['comment'] is not None:
            newReport['Comment'] = args['comment']

        # Replacing start-date and end-date with regex
        temp = newReport['date']
        if args['start-date'] is not None and args['end-date'] is not None:
            newReport['date'] = f"{args['start-date']} to {args['end-date']}"
        elif args['start-date'] is not None and args['end-date'] is None:
            newReport['date'] = re.sub(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2} to', f"{args['start-date']} to", temp)
        else: 
            newReport['date'] = re.sub(r'to \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', f"to {args['end-date']}", temp)

        return newReport, 200


api.add_resource(ReportList, '/report')
api.add_resource(Report, '/report/<report_id>')