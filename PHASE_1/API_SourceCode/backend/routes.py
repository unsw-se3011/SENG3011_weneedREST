from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields
import re
from datetime import datetime
import models
from helper import compareDate, searchKeyTerms, dumpData, readData
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
api = Api(app, version='1.0', title='Disease report API',
    description='A simple Disease Report API',
)

article_model = api.model('Article', models.article_model)

ns_rep = api.namespace('reports', description='Report operations')

parser = reqparse.RequestParser()

'''
    parse the arguments for filtering reports
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='Max number of results', location='args')
parser_report.add_argument('latitude', type=float, help='latitude of area affected', location='args')
parser_report.add_argument('longitude', type=float, help='longitude of area affected', location='args')
parser_report.add_argument('key_terms', type=str, help='list of key terms', location='args')
parser_report.add_argument('start-date', type=str, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_report.add_argument('end-date', type=str, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

'''
    parse the arguments for creating a report
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

class ReportManager(object):
    def __init__(self, data):
        self.reports = data
        self.n = len(data)
    
    def create(self, args):
        n = self.n + 1

        newReport = self.reports[0].copy()
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

        self.reports.append(newReport)
        dumpData(reportDAO)

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
            Search/filter for reports
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

    @api.doc(parser=parser_create)
    def post(self):
        '''
            Create a report
        '''
        args = parser_create.parse_args()

        if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['date']) is None:
            return "Invalid end-date", 400

        newReport = reportDAO.create(args)

        return newReport, 200


'''
    parse the arguments for updating
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

@ns_rep.route('/<int:report_id>')
class Report(Resource):
    '''
        Shows an individual report and lets you DELETE a report or PUT to update a reports
    '''
    @api.response(200, 'Success')
    @api.response(400, 'Report not found')
    def get(self, report_id):
        '''
            Fetches a singular report
        '''
        report = reportDAO.findReport(report_id)
        if report:
            return report, 200
        
        return None, 400

    @api.response(200, 'Success')
    @api.response(400, 'Report not found')
    def delete(self, report_id):   
        '''
            Deletes a report
        '''
        article = reportDAO.findReport(report_id)

        if article:
            reportDAO.delete( article )
            return f'deleted report \n{article}\n', 200
        
        return "No report to be found", 400

    @api.response(200, 'Success')
    @api.response(400, 'Invalid date param')
    @api.doc(parser=parser_update)
    def put(self, report_id):
        '''
            Updates a given report
        '''
        args = parser_update.parse_args()

        if args['date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
            return "Invalid start-date", 400

        newReport = reportDAO.findReport(report_id)
        
        # Updating all report details
        if args['url'] is not None:
            newReport['url'] = args['url']
        if args['date_of_publication'] is not None:
            newReport['date_of_publication'] = args['date_of_publication']
        if args['headline'] is not None:
            newReport['headline'] = args['headline']
        if args['main_text'] is not None:
            newReport['main_text'] = args['main_text']
        if args['disease'] is not None:
            newReport['reports'][0]['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
        if args['syndrome'] is not None:
            newReport['reports'][0]['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
        if args['event-type'] is not None:
            newReport['reports'][0]['reported_events'][0]['event-type'] = args['event-type']
        if args['longitude'] is not None:
            newReport['reports'][0]['reported_events'][0]['location']['longitude'] = args['longitude'] 
        if args['latitude'] is not None:
            newReport['reports'][0]['reported_events'][0]['location']['latitude'] = args['latitude']
        if args['number-affected'] is not None:
            newReport['reports'][0]['reported_events'][0]['number-affected'] = args['number-affected']
        if args['comment'] is not None:
            newReport['reports'][0]['Comment'] = args['comment']

        dumpData(reportDAO)

        return newReport, 200