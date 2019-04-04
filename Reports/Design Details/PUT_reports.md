# Updates a report with the corresponding ID

Usage
```
   PUT /reports/{id}
```
## Description
Updates an existing report with the corresponding ID

## Parameters
- **id (required)** - ID of the report to update _(path)_
- **headline** - headline for the report
- **main_text** - main text of the event
- **disease** - comma separated list of diseases
- **syndrome** - comma separated list of syndromes
- **type** - the type of event e.g death, infected
- **geonames-id** - location as a geonname ID
- **number-affected** - number of people affected
- **comment** - extra comment
- **start-date** - start date of date range (yyyy-mm-ddThh:mm:ss)
- **end-date** - end date of date range (yyyy-mm-ddThh:mm:ss)

## Codes

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 400  | Report not found |
| 404  | Invalid data |

## Example

### Request
```
   curl -X PUT "http://104.248.30.17:5000/reports/3?id=8&headline=headline&main_text=main_text&disease=disease&syndrome=syndrome&type=type&geonames-id=1234567&number-affected=55&comment=Bad%20spread&start-date=2019-08-12&end-date=2019-08-19" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
      "response": [
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
      ]
    }
```
