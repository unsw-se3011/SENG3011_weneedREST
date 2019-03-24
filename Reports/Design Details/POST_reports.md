# Creates a report with the corresponding ID

Usage
```
   POST /createReports
```
## Description
Creates a new report with the corresponding ID

## Parameters
- **id (required)** - ID of the Report <code>- change</code>

## Codes

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 400  | Invalid ID |
| 404  | Report not found |
| 405  | Invalid data |

## Example

### Request
```
   curl -X POST "http://104.248.30.17:5000/createReport?headline=headline&main_text=main_text&disease=disease&type=type&geonames-id=1234567&number-affected=55&start-date=2019-08-12&end-date=2019-08-19" -H  "accept: application/json"
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
