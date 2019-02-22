# Web scraper built using Python Scrapy library. Code used and adapted from Scrapy tutorial provided code.
# Written by Bailey Ivancic, February 2018

import scrapy

class Spider(scrapy.Spider):
    name="spider"

    def start_requests(self):
        urls=['https://www.who.int/emergencies/diseases/en/']
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = 'WHO-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)