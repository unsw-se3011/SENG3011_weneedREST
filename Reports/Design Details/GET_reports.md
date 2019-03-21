# List all reports

Usage
```
   GET /reports
```
## Description
Returns the entire list of reports

## Parameters
- **n** - The number of results that are returned. This number is defaulted to 10 and can only return up to 100 results.

## Errors
| Code | Description |
| ---- | ---------- |
| 200  | Successful |

## Example

### Request
```
   curl http://exampleapi.com/reports -X "GET" -H "Content-Type: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
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
