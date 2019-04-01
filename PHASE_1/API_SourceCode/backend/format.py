import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

articles = []

number_names = {'one': 1, 'two': 2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'undefined': -1}

with open('raw.json','r') as f:
    data = json.load(f)
    f.close()
    i = 1
    for article in data:
        reports = []
        disease = []
        syndrome = []
        reportedEvents = []
        reportedEventsDict = {}
        articleDict = {}
        reportDict = {}
        geonames = {'latitude': article['Latitude'], 'longitude': article['Longitude']}

        articleDict['id'] = i
        articleDict['url'] = article['URL']
        articleDict['date_of_publication'] = article['date_of_publication']
        articleDict['headline'] = article['TipText']
        articleDict['main_text'] = article['Description']

        reportDict['disease'] = article['disease']
        reportDict['syndrome'] = article['syndrome']
        reportDict['comment'] = 'null'

        reportedEventsDict['type'] = article['event-type']
        reportedEventsDict['date'] = article['date']
        reportedEventsDict['location'] = geonames
        reportedEventsDict['number-affected'] = number_names[ article['number-affected'] ] if article['number-affected'] in number_names.keys() else int(article['number-affected'])

        reportedEvents.append(reportedEventsDict)
        reportDict['reported_events'] = reportedEvents
        reports.append(reportDict)
        articleDict['reports'] = reports
        articles.append(articleDict)
        i += 1

with open('clean.json',"w") as f:
    f.write(str(articles))
    f.close()