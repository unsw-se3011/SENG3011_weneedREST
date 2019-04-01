from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields
import re
from datetime import datetime
from helper import searchKeyTerms, compareEndDate, compareStartDate

app = Flask(__name__)
api = Api(app)

# Create dummy data here
# READ IN JSON DATA HERE
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



# @api.route('/SearchReports')
# @api.doc(params={'n': 'Number of results returned (max is 10)', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'start-date':'Starting date of reports', 'end-date':'Ending date or reports'})
# class filterReports(Resource):
#     @api.response(200, 'Success - All reports')
#     @api.response(300, 'Success - Filtered reports returned')
#     @api.response(400, 'Invalid location, key term or date')
#     @api.doc(parser=parser_report)
#     def get(self):
#         args = parser_report.parse_args()

#         if args['start-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
#             return "Invalid start-date", 400

#         if args['end-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
#             return "Invalid end-date", 400

#         newResponse = dummyResponse

#         n = 10 if args['n'] is None or args['n'] > 10 else args['n'] 

#         if n < 0: 
#             return [], 200

#         if args['key_terms'] is not None:
#             newResponse = list( filter(searchKeyTerms, newResponse) )

#         if args['location'] is not None:
#             newResponse = list( filter(lambda x : x['location']['geonames-id'] == args['location'], newResponse))

#         if args['start-date'] is not None:
#             newResponse = list( filter(compareStartDate, newResponse) )

#         if args['end-date'] is not None:
#             newResponse = list( filter(compareEndDate, newResponse))

#         newResponse = newResponse[:n]

#         return newResponse, 200

# '''
#     Deletes a report
# '''
# parser_delete = parser.copy()
# parser_delete.add_argument('id', type=int, required=True, help='ID of report to be deleted', location='args')

# @api.route('/delete')
# @api.doc(params={'id': 'ID of report to be deleted'})
# class deleteReport(Resource):
#     @api.response(200, 'Success')
#     @api.response(400, 'Invalid ID')
#     @api.response(404, 'Report not found')
#     @api.doc(parser=parser_delete)
#     def delete(self):
#         args = parser_delete.parse_args()
#         id = args['id']
#         return f'deleted report {id}', 200

# '''
#     Updates an existing report with form data
# '''
# parser.add_argument('url', type=str, required=True, help='url of the event', location='form')
# parser.add_argument('date_of_publication', type=str, required=True, help='date of pulication (yyyy-mm-ddThh:mm:ss)', location='form')
parser_create = parser.copy()
parser_create.add_argument('headline', type=str, required=True, help='headline for the report', location='args')
parser_create.add_argument('main_text', type=str, required=True, help='main text of the event', location='args')
parser_create.add_argument('disease', type=str, required=True, help='comma separated list of diseases', location='args')
parser_create.add_argument('syndrome', type=str, required=False, help='comma separated list of syndroms', location='args')
parser_create.add_argument('event-type', type=str, required=True, help='the type of event e.g death, infected', location='args')
parser_create.add_argument('geonames-id', type=int, required=True, help='geonnames id', location='args')
parser_create.add_argument('number-affected', type=int, required=True, help='number of people affected', location='args')
parser_create.add_argument('comment', type=str, required=False, help='comment', location='args')
parser_create.add_argument('start-date', type=str, required=True, help='start date of date range (yyyy-mm-ddThh:mm:ss)', location='args')
parser_create.add_argument('end-date', type=str, required=True, help='end date of date range (yyyy-mm-ddThh:mm:ss)', location='args')

# @api.route('/createReport')
# class createReport(Resource):
#     @api.response(200, 'Success')
#     @api.response(400, 'Invalid ID')
#     @api.response(404, 'Report not found')
#     @api.response(405, 'Invalid data')
#     @api.doc(parser=parser_create)
#     def post(self):
#         args = parser_create.parse_args()

#         if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
#             return "Invalid start-date", 400

#         if re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
#             return "Invalid end-date", 400

#         n = -1
#         for article in dummyResponse:
#             if article['id'] > n:
#                 n = article['id']
#         n = n+1

#         newReport = dummyResponse[0]
#         newReport['id'] = n
#         newReport['headline'] = args['headline']
#         newReport['main_text'] = args['main_text']
#         newReport['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
#         newReport['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
#         newReport['event-type'] = args['type']
#         newReport['date'] = f"{args['start-date']} to {args['end-date']}"
#         newReport['location']['geonames-id'] = args['geonames-id'] 
#         newReport['number-affected'] = args['number-affected']
#         newReport['Comment'] = args['comment'] if args['comment'] else 'Null'

#         return newReport, 200

'''
    Updates an existing report
'''
parser_update = parser_create.copy()
parser_update.add_argument('id', type=int, required=True, help="ID of report to update", location='args')
parser_update.add_argument('headline', type=str, required=False, help="Headline of report", location='args')
parser_update.add_argument('main_text', type=str, required=False, help="Main text of report", location='args')
parser_update.add_argument('disease', type=str, required=False, help="Disease of report", location='args')
parser_update.add_argument('syndrome', type=str, required=False, help="ID of report to update", location='args')
parser_update.add_argument('event-type', type=str, required=False, help="Type of report. Possible types include: 'Death', 'Presence', 'Infected', 'Hospitalised', 'Recovered'", location='args')
parser_update.add_argument('geonames-id', type=int, required=False, help="Geoname of report", location='args')
parser_update.add_argument('number-affected', type=int, required=False, help="Number of people affected", location='args')
parser_update.add_argument('comment', type=str, required=False, help="Comment to add to report", location='args')
parser_update.add_argument('start-date', type=str, required=False, help="Start date of report", location='args')
parser_update.add_argument('end-date', type=str, required=False, help="End date of report", location='args')

# @api.route('/updateReport')
# class updateReport(Resource):
# # PUT is for updating
# # Post is for creating
#     @api.response(200, 'Success')
#     @api.response(400, 'Invalid ID')
#     @api.response(404, 'Report not found')
#     @api.response(405, 'Invalid data')
#     @api.doc(parser=parser_update)
#     def put(self):
#         args = parser_update.parse_args()

#         if args['start-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['start-date']) is None:
#             return "Invalid start-date", 400

#         if args['end-date'] is not None and re.search(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', args['end-date']) is None:
#             return "Invalid end-date", 400

#         newReport = dummyResponse[0]
#         newReport['id'] = args['id']
        
#         # Updating all report details
#         if args['headline'] is not None:
#             newReport['headline'] = args['headline']
#         if args['main_text'] is not None:
#             newReport['main_text'] = args['main_text']
#         if args['disease'] is not None:
#             newReport['disease'] = list( map(lambda x : x.strip(), args['disease'].split(',')) )
#         if args['syndrome'] is not None:
#             newReport['syndrome'] = list( map(lambda x : x.strip(), args['syndrome'].split(',')) ) if args['syndrome'] is not None else [] 
#         if args['type'] is not None:
#             newReport['event-type'] = args['type']
#         if args['geonames-id'] is not None:
#             newReport['location']['geonames-id'] = args['geonames-id'] 
#         if args['number-affected'] is not None:
#             newReport['number-affected'] = args['number-affected']
#         if args['comment'] is not None:
#             newReport['Comment'] = args['comment']

#         # Replacing start-date and end-date with regex
#         temp = newReport['date']
#         if args['start-date'] is not None and args['end-date'] is not None:
#             newReport['date'] = f"{args['start-date']} to {args['end-date']}"
#         elif args['start-date'] is not None and args['end-date'] is None:
#             newReport['date'] = re.sub(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2} to', f"{args['start-date']} to", temp)
#         else: 
#             newReport['date'] = re.sub(r'to \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}', f"to {args['end-date']}", temp)

#         return newReport, 200



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