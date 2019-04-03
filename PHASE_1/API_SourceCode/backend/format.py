import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
import models
from helper import dumpData
from flask_restplus import Resource, Api, reqparse, fields, marshal
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

articles = []

with open('raw.json','r') as f:
    data = json.load(f)
    f.close()

for article in data:
    loc = marshal(article, models.location_model)

    event = marshal(article, models.event_model)
    event['location'] = loc

    report = marshal(article, models.report_model)
    report['reported_events'] = [ event ]

    article = marshal(article, models.article_model)
    article['reports'] = [ report ]

    article['reports'][0]['comment'] = ""

    articles.append(article)

dumpData(articles)