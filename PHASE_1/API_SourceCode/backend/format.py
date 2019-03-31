import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

with open('raw.json','r') as f:
    data = json.load(f)
    articles = []

    for article in data:
        reports = []
        disease = []
        syndrome = []
        reportedEvents = []
        reportedEventsDict = {}
        articleDict = {}
        reportDict = {}
        geonames = {'geonames-id':'123456'}

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

        reportedEvents.append(reportedEventsDict)
        reportDict['reported_events'] = reportedEvents
        reports.append(reportDict)
        articleDict['reports'] = reports
        articles.append(articleDict)

    pprint(articles[0])