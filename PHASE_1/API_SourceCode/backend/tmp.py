import re

with open('GIM-1.html',encoding = "ISO-8859-1") as f:
	m = re.search(r'addMarker\(\{.*\);', f.read(), re.MULTILINE|re.DOTALL)
	if m:
		print(m[0])

with open('GIM-1.html',encoding = "ISO-8859-1") as f:
	m2 = re.search(r'var incidents = \[.*\]', f.read(), re.MULTILINE|re.DOTALL)
	if m2:
		print(m2[0])


f.closed
