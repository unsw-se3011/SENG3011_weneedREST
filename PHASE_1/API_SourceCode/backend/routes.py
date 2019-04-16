from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields, marshal
import re
from datetime import datetime
import models
from helper import *
from werkzeug.contrib.fixers import ProxyFix
from flask_cors import CORS


app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app, version='1.0', title='Disease report API',
    description='A simple Disease Report API',
)

article_model = api.model('Article', models.nested_article_model)

ns_rep = api.namespace('reports', description='Report operations')

parser = reqparse.RequestParser()

# PARSER DOCUMENTATION 

'''
    Arguments for filtering reports
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='Max number of results', location='args')
parser_report.add_argument('latitude', type=float, help='Latitude of area affected', location='args')
parser_report.add_argument('longitude', type=float, help='Longitude of area affected', location='args')
parser_report.add_argument('key_terms', type=str, help='List of key terms', location='args')
parser_report.add_argument('start-date', type=str, help='Start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_report.add_argument('end-date', type=str, help='End date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

'''
    Arguments for creating reports
'''
parser_create = parser.copy()
parser_create.add_argument('url', type=str, required=True, help='Url of the event', location='args')
parser_create.add_argument('date_of_publication', type=str, required=True, help='Date of publication (yyyy-mm-ddThh:mm:ss)', location='args')
parser_create.add_argument('headline', type=str, required=True, help='Headline for the report', location='args')
parser_create.add_argument('main_text', type=str, required=True, help='Main text of the event', location='args')
parser_create.add_argument('disease', type=str, required=True, help='Comma separated list of diseases', location='args')
parser_create.add_argument('syndrome', type=str, required=False, help='Comma separated list of syndromes', location='args')
parser_create.add_argument('type', type=str, required=True, help='Type of event e.g death, infected', location='args')
parser_create.add_argument('longitude', type=float, required=True, help='Longitude of location', location='args')
parser_create.add_argument('latitude', type=float, required=True, help='Latitude of location', location='args')
parser_create.add_argument('number-affected', type=int, required=True, help='Number of people affected', location='args')
parser_create.add_argument('comment', type=str, required=False, help='Comment', location='args')
parser_create.add_argument('date', type=str, required=True, help='Date of the event (yyyy-mm-ddThh:mm:ss)', location='args')

'''
    Arguments for updating reports
'''
parser_update = parser.copy()
parser_update.add_argument('url', type=str, help='URL of report', location='args', required=False)
parser_update.add_argument('date_of_publication', type=str, help='Date of report publication', location='args', required=False)
parser_update.add_argument('headline', type=str, help='Headline of report', location='args', required=False)
parser_update.add_argument('main_text', type=str, help='Main text of report', location='args', required=False)
parser_update.add_argument('disease', type=str, help='Disease contained within report', location='args', required=False)
parser_update.add_argument('syndrome', type=str, help='Syndrome within report', location='args', required=False)
parser_update.add_argument('type', type=str, help='Type of report', location='args', required=False)
parser_update.add_argument('longitude', type=str, help='Longitude of location in report', location='args', required=False)
parser_update.add_argument('latitude', type=str, help='Latitude of location in report', location='args', required=False)
parser_update.add_argument('number-affected', type=int, help='Number affected', location='args', required=False)
parser_update.add_argument('comment', type=str, help='Comment', location='args', required=False)
parser_update.add_argument('date', type=str, help='Date of report', location='args', required=False)

'''
    Arguments for log function
'''
parser_log = parser.copy()
parser_log.add_argument('password', type=str, help='Password to obtain log file for API', required=True, location='args')

'''
    Arguments for delete function
'''
parser_delete = parser.copy()
parser_delete.add_argument('password', type=str, help='Password to delete report', required=True, location='args')


# API ENDPOINT FUNCTIONS

class ReportManager(object):
    def __init__(self, data):
        self.reports = data
        self.n = len(data)
    
    def create(self, args):
        # set up the args 
        args['id'] = self.n +1

        # marshal/format the args
        newReport = marshal(args, models.nested_article_model)
        newReport = format_raw_article( newReport )

        # update reportDAO
        self.reports.append(newReport)
        self.n = self.n + 1

        # update clean.json
        dumpData(self.reports)

        return newReport

    def filter(self, args):
        newResponse = self.reports

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

        return newResponse[:args['n']]
        
    def delete(self, article):
        self.reports.remove( article )
    
    def update(self, args):
        args_events = args_reports = None 

        newReport = self.findReport( args['id'] )

        if newReport == None:
            return None

        if 'reports' in args.keys():
            args_reports = args.pop('reports')
            if 'reported_events' in args_reports.keys():
                args_events = args_reports.pop('reported_events')
                if 'location' in args_events.keys():
                    args_loc = args_events.pop('location')
                    
                    newReport['reports'][0]['reported_events'][0]['location'].update( args_loc )
                newReport['reports'][0]['reported_events'][0].update( args_events )
            newReport['reports'][0].update( args_reports )
        newReport.update( args )

        dumpData(self.reports)

        return newReport
    
    def findReport(self, n):
        '''
            Finds and returns report\n
                n: id of the report
            returns report or None if not found
        '''
        for article in self.reports:
            if article['id'] == n:
                return article
        return None

reportDAO = ReportManager(readData())

@ns_rep.route('/')
class ReportList(Resource):
    '''
        Shows a list of all reports and lets you POST to create a report and GET to search for reports
    '''
    @api.response(200, "Sucess")
    @api.response(400, "Invalid search")
    @api.response(404, "Invalid date param")
    @api.doc(parser=parser_report)
    def get(self):
        '''
            Filter all reports
        '''
        args = parser_report.parse_args()

        if args['start-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
            return "Invalid start-date", 404

        if args['end-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
            return "Invalid end-date", 404

        args['n'] = 100 if args['n'] is None or args['n'] > 100 else args['n'] 

        if args['n'] < 0: 
            return [], 200

        newResponse = reportDAO.filter(args)

        return newResponse, 200

    @api.response(200, "Sucess")
    @api.response(404, "Invalid date param")
    @api.doc(parser=parser_create)
    def post(self):
        '''
            Create a report
        '''
        args = parser_create.parse_args()

        if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['date']) is None:
            return "Invalid end-date", 404

        newReport = reportDAO.create(args)

        return newReport, 200


@ns_rep.route('/<int:id>')
class Report(Resource):
    '''
        Shows an individual report and lets you DELETE a report or PUT to update a reports
    '''
    @api.response(200, 'Success')
    @api.response(400, 'Report not found')
    def get(self, id):
        '''
            Fetches a singular report
        '''
        report = reportDAO.findReport(id)
        if report:
            return report, 200
        
        return None, 400

    @api.response(200, 'Success')
    @api.response(400, 'Report not found')
    @api.response(499, 'Invalid password provided')
    @api.doc(params={'id':'ID of report to delete'})
    @api.doc(parser=parser_delete)
    def delete(self, id):   
        '''
            Deletes a report
        '''
        args = parser_delete.parse_args()
        article = reportDAO.findReport(id)

        if args['password'] != 'sl33py':
            return "Invalid password", 499

        if article:
            reportDAO.delete( article )
            return f'deleted report \n{article}\n', 200
        
        return "No report to be found", 400

    @api.response(200, 'Success')
    @api.response(400, 'Report not found')
    @api.response(404, 'Invalid date param')
    @api.response(499, 'Invalid password provided')
    @api.doc(parser=parser_update)
    def put(self):
        '''
            Updates a given report
        '''
        args = parser_update.parse_args()

        if args['password'] != 'sl33py':
            return "Invalid password", 499

        if args['date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['date']) is None:
            return "Invalid date", 404

        #set up the args
        args['id'] = id

        args = marshal(args, models.nested_article_model, skip_none=True)

        newReport = reportDAO.update(args)

        if newReport == None:
            return "Report not found, invalid ID", 400

        return newReport, 200

@ns_rep.route('/apiLog')
class apiLog(Resource):
    @api.response(200, 'Success')
    @api.response(404, 'Log file not found')
    @api.response(499, 'Invalid password provided')
    @api.doc(parser=parser_log)
    def post(self):
        '''
            Allows user to read log produced by Flask
        '''
        args = parser_log.parse_args()

        if args['password'] != 'sl33py':
            return "Invalid password", 499

        with open('activity.log') as log:
            return log.read()