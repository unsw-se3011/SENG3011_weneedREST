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
        t = open('temp.txt', 'w')
        t.write(m2[1])
        t.close()
    f.closed

with open('temp.txt',"r") as f:
    a = eval(f.read())
    #print(a[3]['Description'])
    for i in a:
        soup = BeautifulSoup(i['Description'], "html.parser")
        text = soup.get_text()

        m = re.search(r'\“(.*)\”', text, re.MULTILINE|re.DOTALL)
        if m:
            i['Description'] = m[1]

        m2 = re.search(r'\'\'(.*)\'\'', text, re.MULTILINE|re.DOTALL)
        if m2:
            i['Description'] = m2[1]

        m3 = re.search(r'\“(.*)\“', text, re.MULTILINE|re.DOTALL)
        if m3:
            i['Description'] = m2[1]

        if not m and not m2 and not m3:
            i['Description'] = text

        i['TipText'] = i['TipText'].capitalize()
        print(i['Description'])
        print()
        #print(text)
        #pprint(json.dumps(a))