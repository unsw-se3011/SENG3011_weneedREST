import re
import requests
from io import StringIO
from pycurl import Curl

# Pycurl scrapes raw HTML and saves to 
with open('GIM-1.html', 'wb') as g:
    c = Curl()
    c.setopt(c.URL, 'http://outbreaks.globalincidentmap.com/')
    c.setopt(c.WRITEDATA, g)
    c.perform()
    c.close()
    g.close()

with open('GIM-1.html',encoding = "ISO-8859-1") as f:
    m2 = re.search(r'var incidents = \[.*\]', f.read(), re.MULTILINE|re.DOTALL)
    if m2:
        print(m2[0])
        t = open('temp.txt', 'w')
        t.write(m2[0])
        t.close()


f.closed
