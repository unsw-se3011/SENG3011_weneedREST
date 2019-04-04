import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
import models
from helper import dumpData, format_raw_article
from flask_restplus import Resource, Api, reqparse, fields, marshal
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

articles = []

with open('raw.json','r') as f:
    data = json.load(f)
    f.close()

i = 1
for article in data:
    article = marshal(article, models.nested_article_model)
    article['id'] = i
    articles.append( format_raw_article( article ) )
    i = i + 1

dumpData(articles)