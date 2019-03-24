# Updates a report with the corresponding ID

Usage
```
   PUT /updateReports
```
## Description
Updates an existing report with the corresponding ID

## Parameters
- **id (required)** - ID of the Report

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
   curl -X PUT "http://104.248.30.17:5000/updateReport?id=8&headline=headline&main_text=main_text&disease=disease&syndrome=syndrome&type=type&geonames-id=1234567&number-affected=55&comment=Bad%20spread&start-date=2019-08-12&end-date=2019-08-19" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
```JSON

   Status: 200 OK
   Content-Type: application/json

   {
      "args": {
        "id": 8,
        "headline": "headline",
        "main_text": "main_text",
        "disease": "disease",
        "syndrome": "syndrome",
        "type": "type",
        "geonames-id": "1234567",
        "number-affected": "55",
        "comment": "Bad spread",
        "start-date": "2019-08-12",
        "end-date": "2019-08-19"
      },
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
