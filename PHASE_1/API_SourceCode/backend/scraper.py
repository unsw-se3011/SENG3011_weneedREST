import re
import requests
from io import StringIO
from pycurl import Curl
from pprint import pprint
import simplejson as json
import jsonify
from bs4 import BeautifulSoup

# Pycurl scrapes raw HTML and saves to 
with open('GIM-1.html', 'wb') as g:
    c = Curl()
    c.setopt(c.URL, 'http://outbreaks.globalincidentmap.com/')
    c.setopt(c.WRITEDATA, g)
    c.perform()
    c.close()
    g.close()

with open('GIM-1.html',"r",encoding = "ISO-8859-1") as f:
    m2 = re.search(r'var incidents = \[(.*)\]', f.read(), re.MULTILINE|re.DOTALL)
    if m2:
        t = open('rawData.txt', 'w')
        t.write(m2[1])
        t.close()
    f.closed

with open('rawData.txt',"r") as f:
    rawArticles = eval(f.read())
    #print(rawArticles[3]['Description'])
    for event in rawArticles:
        
        #BeautifulSoup initialisation 
        soup = BeautifulSoup(event['Description'], "html.parser")
        text = soup.get_text()

        # Description of event
        m = re.search(r'\“(.*)\”', text, re.MULTILINE|re.DOTALL)
        if m:
            event['Description'] = m[1]
        m2 = re.search(r'\'\'(.*)\'\'', text, re.MULTILINE|re.DOTALL)
        if m2:
            event['Description'] = m2[1]
        m3 = re.search(r'\“(.*)\“', text, re.MULTILINE|re.DOTALL)
        if m3:
            event['Description'] = m2[1]
        if not m and not m2 and not m3:
            event['Description'] = text

        #TipText
        event['TipText'] = event['TipText'].capitalize()

        # Event type

        # Syndrome

        # Disease

        # Date

        # Number affected
        num = re.search(r'\d+', event['TipText'], re.MULTILINE|re.DOTALL)
        if num is not None:
            print(num.group(0))
        else:
            num = "undefined"
            print("Nothing found")

        #print(event)
        print()
        #print(text)
        #pprint(json.dumps(rawArticles))