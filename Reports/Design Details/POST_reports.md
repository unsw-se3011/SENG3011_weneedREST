# Creates a report with the corresponding ID

Usage
```
   POST /reports/?{parms}
```
## Description
Creates a new report with the corresponding ID

## Parameters
- **id (required)** - ID of the Report
- **headline(required)** - headline for the report
- **main_text (required)** - main text of the event
- **disease (required)** - comma separated list of diseases
- **syndrome** - comma separated list of syndromes
- **type (required)** - the type of event e.g death, infected
- **geonames-id (required)** - location as a geonname ID
- **number-affected (required)** - number of people affected
- **comment** - extra comment
- **start-date (required)** - start date of date range (yyyy-mm-ddThh:mm:ss)
- **end-date (required)** - end date of date range (yyyy-mm-ddThh:mm:ss)

## Codes

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 404  | Invalid data |

## Example

### Request
```
   curl -X POST "http://104.248.30.17:5000/reports/?headline=headline&main_text=main_text&disease=disease&type=type&geonames-id=1234567&number-affected=55&start-date=2019-08-12&end-date=2019-08-19" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
      "id": 3,
      "url": "www.outbreaks.globalincidentmap.com/eventdetail.php?ID=31146",
      "date_of_publication": "2019-02-27T23:20:00 ",
      "headline": "headline",
      "main_text": "main_text",
      "reports": [
        {
          "disease": [
            "disease"
          ],
          "syndrome": [],
          "reported_events": [
            {
              "type": "type",
              "date": "2019-08-12 to 2019-08-19",
              "location": {
                "geonames-id": 1234567
              },
              "number-affected": 55
            }
          ],
          "Comment": "Null"
        }
      ]
   }
```
