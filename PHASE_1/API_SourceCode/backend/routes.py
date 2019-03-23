from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields

app = Flask(__name__)
api = Api(app)

# Create dummy data here
dummyResponse =[{
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
                            "geonames-id": "1566083"
                        },
                        "number-affected": "2"
                    },
                ],
                "Comment": 'null'
            }
        ]
    }]

parser = reqparse.RequestParser()
# print("TESTING")
# print(dummyResponse[0]['reports'][0]['reported_events'][0]['location']['geonames-id'])


'''
    Returns all reports 
'''
# @api.route('/reports')
# class allReports(Resource):
#     @api.response(200, 'Success')
#     def get(self):
#         return response, 200
# api.add_resource(allReports, '/allReports', endpoint='allReports')

'''
    Returns reports specifying selected criteria
'''
parser_report = parser.copy()
parser_report.add_argument('n', type=int, help='number of results', location='args')
parser_report.add_argument('location', type=str, help='location of reports', location='args')
parser_report.add_argument('key_terms', type=str, help='list of key terms', location='args')
parser_report.add_argument('start-date', type=str, help='start date of date range', location='args')
parser_report.add_argument('end-date', type=str, help='end date of date range', location='args')

@api.route('/reports')
@api.doc(params={'n': 'Number of results returned', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'start-date':'Starting date of reports', 'end-date':'Ending date or reports'})
class reports(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Invalid location, key term or date')
    @api.doc(parser=parser_report)
    def get(self):
        args = parser_report.parse_args()
        
        # No arguments supplied, return all records
        if all(argument == None for argument in args.values()):
            print(args)
            return dummyResponse, 200

        # Arguments supplied, return reports based on search criteria
        else:
            # Arguments supplied by user
            num = args['n']
            location = args['location']
            keyterms = [word.strip() for word in args['key_terms'].split(',')]
            start_date = args['start-date']
            end_date = args['end-date']

            # looping through each 
            newResponse = []
            tempkeyTerms = []
            reportCounter = 0
            for event in dummyResponse:
                if reportCounter >= num:
                    break

                # Location of incidents
                tempLocation = event['reports'][0]['reported_events'][0]['location']['geonames-id'] 
                
                # Add all searchable terms to list
                tempkeyTerms.append(event['headline'])
                tempkeyTerms.append(event['main_text'])
                tempkeyTerms.append(event['reports'][0]['disease'][0:])
                tempkeyTerms.append(event['reports'][0]['syndrome'][0:])
                tempkeyTerms.append(event['reports'][0]['reported_events'][0]['type'])

                # Test keywords
                # for word in keyterms
                wordMatch = False
                for word in keyterms:
                    for word2 in tempkeyTerms:
                        if word in word2:
                            wordMatch = True

                print(wordMatch)
                print(tempkeyTerms)
                print(keyterms)

                # Put in start and end date TODO
                if location == tempLocation and wordMatch==True:
                    newResponse.append(event)
                    reportCounter+=1


            return {'args': args, 'response': newResponse}, 300
#api.add_resource(reports, '/reports', endpoint='reports')

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
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.response(405, 'Invalid data')
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
# PUT is for updating
# Post is for creating
    @api.response(200, 'Success')
    @api.response(400, 'Invalid ID')
    @api.response(404, 'Report not found')
    @api.response(405, 'Invalid data')
    @api.doc(parser=parser_update)
    def put(self):
        args = parser_update.parse_args()

        return {'args': args, 'response': response}, 200
api.add_resource(updateReport, '/updateReport', endpoint='updateReport')
