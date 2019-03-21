import re
import requests
import pycurl
import io
from io import StringIO


with open('GIM-1.html', 'wb') as f:
    c = pycurl.Curl()
    c.setopt(c.URL, 'http://outbreaks.globalincidentmap.com/')
    c.setopt(c.WRITEDATA, f)
    c.perform()
    c.close()

# Commented out for testing, sorry Harry - Bailey
# with open('GIM-1.html',encoding = "ISO-8859-1") as f:
# 	m2 = re.search(r'var incidents = \[.*\]', f.read(), re.MULTILINE|re.DOTALL)
# 	if m2:
# 		print(m2[0])


f.closed
