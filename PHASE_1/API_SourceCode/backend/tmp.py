import re
import requests
import pycurl

c = pycurl.Curl()



with open('GIM-1.html',encoding = "ISO-8859-1") as f:
	m2 = re.search(r'var incidents = \[.*\]', f.read(), re.MULTILINE|re.DOTALL)
	if m2:
		print(m2[0])


f.closed
