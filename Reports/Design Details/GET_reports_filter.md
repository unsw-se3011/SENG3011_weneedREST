# List all reports that match the query

Usage
```
   GET /reports/?{parms}
```
## Description
Returns a list of the reports that match the following filters. 

## Parameters
- **n** - The number of results that are returned. This number is defaulted to 10 and can only return up to 100 results.
- **location** - Geocode of the area affected
- **key_terms** - This input contains a comma separated list of all the key terms you want to get news about.
This input can be empty or omitted in the case where the user doesn’t want to restrict his search. This is not case sensitive.
- **start-date** - Starting date of range *
- **end-date** - Ending date of range *

\* All dates must be in the format `^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$`. If only one date is specified the API will assume that you want all reports after or before the given date. 

## Errors

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 404 | Invalid Location or Key Term or Date |

## Example

### Request
```
   curl -X GET "http://104.248.30.17:5000/reports/?key_terms=anthrax" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
       "id": 1,
       "url": "www.outbreaks.globalincidentmap.com/eventdetail.php?ID=31146",
       "date_of_publication": "2019-02-27T23:20:00 ",
       "headline": "TANZANIA - Anthrax kills two people in northern Tanzania",
       "main_text": "2 people died and 8 others were hospitalized following an anthrax outbreak...",
       "reports": [
           {
               "disease": [
                   "anthrax",
               ],
               "syndrome": [],
               "reported_events": [
                   {
                       "type": "death",
                       "date": "2018-12-01T23:20:00 to 2018-12-10T23:50:00",
                       "location": {
                           "geonames-id": 1566083
                       },
                       "number-affected": 2
                   },
               ],
               "Comment": ""
           }
       ]
   }
```
