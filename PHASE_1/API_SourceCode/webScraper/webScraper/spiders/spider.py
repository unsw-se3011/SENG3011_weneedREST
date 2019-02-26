# Web scraper built using Python Scrapy library. Code used and adapted from Scrapy tutorial provided code.
# Written by Bailey Ivancic, February 2018

import scrapy

class Spider(scrapy.Spider):
    name="spider"

    def start_requests(self):
        urls = ['http://outbreaks.globalincidentmap.com/']
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = 1
        filename = 'GIM-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)