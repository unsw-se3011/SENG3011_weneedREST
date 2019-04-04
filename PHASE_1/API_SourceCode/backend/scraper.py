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
    f.close()
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

        searchText = event['Description'] + event['TipText']

        # Number affected
        num = re.search(r'(\d+|one|two|three|four|five|six|seven|eight|nine)', searchText, re.MULTILINE|re.DOTALL)
        if num is not None:
            num = num.group(0)
        else:
            num = "undefined"

        event['number-affected'] = num

        # Event type
        searchText = searchText.split()
        eventType = []
        for word in searchText:
            word.lower()
            if word in ["death", "loses", "kill", "killed", "kills", "deaths", "dead"] and "Death" not in eventType:
                eventType.append("Death")
            elif word in ["outbreak", "detected"] and "Presence" not in eventType:
                eventType.append("Presence")
            elif word in ["reported", "spread", "infect"] and "Infected" not in eventType:
                eventType.append("Infected")
            elif word in ["hospitalised"] and "Hospitalised" not in eventType:
                eventType.append("Hospitalised")
            elif word in ["recovered"] and "Recovered" not in eventType:
                eventType.append("Recovered")
        event['event-type']=eventType

        # Syndrome
        event['syndrome'] = []

        # Disease
        event['disease'] = event['eventtypename']

        # Date
        event['date_of_publication'] = event['DateTime'].replace(" ","T")
        event['date'] = event['AddedDateTime'].replace(" ","T")


        # Geocode
        # geocode is not working due to rate limiting
        #r = requests.get("http://api.geonames.org/findNearbyJSON?lat={}&lng={}&username=seng3011".format(event['Latitude'],event['Longitude']))
        #if r:
        #    res = r.json()
        #    event['geonames-id'] = res['geonames'][0]['countryId']
        #else:
        #    event['geonames-id'] = "123456"

        event['latitude'] = event.pop('Latitude')
        event['longitude'] = event.pop('Longitude')
        event['type'] = event.pop('event-type')
        event['id'] = event.pop('ID')
        event['url'] = event.pop('URL')
        event['headline'] = event.pop('TipText')
        event['main_text'] = event.pop('Description')
        event['comment'] = "None"


    with open('raw.json',"w") as f:
        json.dump(rawArticles,f)
    f.closed