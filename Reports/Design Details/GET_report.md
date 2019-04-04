# Fetch a singular report

Usage
```
   GET /reports/{id}
```
## Description
Searches the data for a report with the corresponding ID. 

## Parameters
- **id** - ID of the report to be found *(path)*


## Errors

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 400  | Report Not found |

## Example

### Request
```
   curl -X GET "http://104.248.30.17:5000/reports/5" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
       "id": 5,
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
               "Comment": null
           }
       ]
   }
```
