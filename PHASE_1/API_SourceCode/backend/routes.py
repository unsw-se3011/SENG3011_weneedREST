from server import app
from flask import Flask
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(app)

# Add later on to fetch data from JSON
reports= {'Zimbabwe': 'Ebola', 'Sydney': 'Cold'}

# Testing
@api.route('/hello')
class hello(Resource):
    def get(self):
        return {'hello': 'world'}

# Returns all reports 
@api.route('/allReports')
class allReports(Resource):
    def get(self):
        return reports

# Returns reports specifying selected criteria
@api.route('/reports')
@api.doc(params={'n': 'Number of results returned', 'location':'Geocode of area affected', 'key_terms':'Comma separated list of of all key items requested by user', 'date':'Date in either date_exact or date_range format', 'date_exact':'yyyy-mm-ddThh:mm:ss. Year field mandatory, every other segment optional', 'date_range':'d1 to d2 with d1 being an exact date before d2'})
class specificReports(Resource):
    @api.doc(responses={'200':'Successful', '400':'Invalid Location, Key Term or Date'})
    def get(self):
        return reports

# Deletes a report
@api.route('/delete')
@api.doc(params={'id': 'ID of report to be deleted'})
class delete(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found'})
    def delete(self, id):
        return "deleted"

# Updates an existing report with form data
@api.route('/postReport')
@api.doc(params={'id': 'ID of report to be posted'})
class postReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    def post(self):
        return "posted"

# Updates an existing report
@api.route('/updateReport')
@api.doc(params={'id': 'ID of report'})
class updateReport(Resource):
    @api.doc(responses={'200': 'Successful', '400':'Invalid ID', '404': 'Report not found', '405': 'Invalid data'})
    def updateReport(self, id):
        return "updated"