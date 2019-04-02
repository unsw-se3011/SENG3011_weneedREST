import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
from flask_restplus import Resource, Api, reqparse, fields, marshal
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

articles = []

number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}

# with open('raw.json','r') as f:
#     data = json.load(f)
#     f.close()
#     i = 1
#     for article in data:
#         reports = []
#         disease = []
#         syndrome = []
#         reportedEvents = []
#         reportedEventsDict = {}
#         articleDict = {}
#         reportDict = {}
#         geonames = {'latitude': article['Latitude'], 'longitude': article['Longitude']}

#         articleDict['id'] = i
#         articleDict['url'] = article['URL']
#         articleDict['date_of_publication'] = article['date_of_publication']
#         articleDict['headline'] = article['TipText']
#         articleDict['main_text'] = article['Description']

#         reportDict['disease'] = article['disease']
#         reportDict['syndrome'] = article['syndrome']
#         reportDict['comment'] = 'null'

#         reportedEventsDict['type'] = article['event-type']
#         reportedEventsDict['date'] = article['date']
#         reportedEventsDict['location'] = geonames
#         reportedEventsDict['number-affected'] = number_names[ article['number-affected'] ] if article['number-affected'] in number_names.keys() else int(article['number-affected'])

#         reportedEvents.append(reportedEventsDict)
#         reportDict['reported_events'] = reportedEvents
#         reports.append(reportDict)
#         articleDict['reports'] = reports
#         articles.append(articleDict)
#         i += 1

location_model = {
    'latitude': fields.Float(attribute='Latitude'), 
    'longitude': fields.Float(attribute='Longitude')
}

event_model = {
    'type': fields.List( fields.String, attribute='event-type'), 
    'date': fields.String, 
    'location': fields.Nested( location_model ), 
    'number-affected': fields.String
}

report_model = {
    'disease': fields.String, 
    'syndrome': fields.List( fields.String ), 
    'comment': fields.String, 
    'reported_events': fields.Nested( event_model )
}

article_model = {
    'id': fields.String(attribute='ID'),
    'type-id': fields.Integer(attribute='Type_ID'),
    'url': fields.String(attribute='URL'), 
    'date_of_publication': fields.String, 
    'headline': fields.String(attribute='TipText'), 
    'main_text': fields.String(attribute='Description'), 
    'reports': fields.Nested( report_model )
}



with open('raw.json','r') as f:
    data = json.load(f)
    f.close()

for article in data:
    loc = marshal(article, location_model)

    event = marshal(article, event_model)
    event['location'] = loc

    report = marshal(article, report_model)
    report['reported_events'] = [ event ]

    article = marshal(article, article_model)
    article['reports'] = [ report ]

    articles.append(article)



with open('clean.json',"w") as f:
    f.write(str(articles))
    f.close()