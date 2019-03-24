from server import app
from flask import Flask
from flask_restplus import Resource, Api, reqparse, fields

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
parser_report.add_argument('start-date', type=str, help='start date of date range', location='args')
parser_report.add_argument('end-date', type=str, help='end date of date range', location='args')

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

@api.route('/SearchReports')
@api.doc(params={'n': 'Number of results returned (max is 10)', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'start-date':'Starting date of reports', 'end-date':'Ending date or reports'})
class filterReports(Resource):
    @api.response(200, 'Success - All reports')
    @api.response(300, 'Success - Filtered reports returned')
    @api.response(400, 'Invalid location, key term or date')
    @api.doc(parser=parser_report)
    def get(self):
        args = parser_report.parse_args()

        newResponse = dummyResponse

        n = 10 if args['n'] is None or args['n'] > 10 else args['n'] 

        if n < 0: 
            return [], 200

        if args['key_terms'] is not None:
            newResponse = list( filter(searchKeyTerms, newResponse) )

        if args['location'] is not None:
            newResponse = list( filter(lambda x : x['reports'][0]['reported_events'][0]['location']['geonames-id'] == args['location'], newResponse))

        newResponse = newResponse[:n]

        return newResponse, 200

api.add_resource(filterReports, '/SearchReports')

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
api.add_resource(deleteReport, '/delete', endpoint='delete')

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
api.add_resource(createReport, '/createReport', endpoint='createReport')

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

        inputId = args['id']
        inputHeadline = args['headline']
        inputMainText = args['main_text']
        inputDisease = args['disease']
        inputSyndrome = args['syndrome']
        inputType = args['type']
        inputGeonames = args['geonames-id']
        inputNumberAffected = args['number-affected']
        inputComment = args['comment']
        inputStartDate = args['start-date']
        inputEnddate = args['end-date']

        # Search for report
        for event in dummyResponse:
            if event['id'] ==inputId:
                if inputHeadline is not None:
                    print("WOOOOOOO")
                    event['headline'] = inputHeadline
                if inputMainText is not None:
                    event['main-text'] = inputMainText
                if inputDisease is not None:
                    event['reports'][0]['disease'].append(inputDisease)
                if inputSyndrome is not None:
                    event['reports'][0]['syndrome'].append(inputSyndrome)
                if inputType is not None:
                    event['reports'][0]['reported-events'][0]['type'] = inputType
                if inputGeonames is not None:
                    event['reports'][0]['reported-events'][0]['location']['geonames-id'] = inputGeonames
                if inputNumberAffected is not None:
                    event['reports'][0]['reported-events'][0]['number-affected'] = inputNumberAffected
                if inputComment is not None:
                    event['reports'][0]['comment'] = inputComment
                if inputStartDate is not None and inputEnddate is not None:
                    event['reports'][0]['reported_events'][0]['date'] = f"{args['start-date']} to {args['end-date']}"


        return {'args': args, 'response': dummyResponse}, 200
api.add_resource(updateReport, '/updateReport', endpoint='updateReport')
