# -*- coding: utf-8 -*-

# Contains items that will be used to collect data from two datasources
# Preliminary - will need to change once datasources are finalised
# Written by Bailey Ivancic, February 2019


import scrapy


class WHOScraper(scrapy.Item):
    outbreakDate = scrapy.Field()
    outbreakDay = scrapy.Field()
    location = scrapy.Field()
    outbreakSource = scrapy.Field()
    reportDate = scrapy.Field()
    numCases = scrapy.Field()
    numDeats = scrapy.Field()
    controlMeasures = scrapy.Field()

class globalMapScraper(scrapy.Item):
    eventType = scrapy.Field()
    outbreakCountry = scrapy.Field()
    outbreakCity = scrapy.Field()
    outbreakDate = scrapy.Field()
    url = scrapy.Field()

