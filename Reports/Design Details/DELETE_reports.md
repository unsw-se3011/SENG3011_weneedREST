# Deletes a report with the corresponding ID

Usage
```
   DELETE /reports/{id}
```
## Description
Deletes a report with the corresponding ID

## Parameters
- **id (required)** - ID of the Report

## Codes

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 400  | Invalid ID |
| 404  | Report not found |

## Return Format
Returns JSON data which contain the following keys:
- **status**
- **message** 
- **error**

## Example

### Request
```
   curl http://exampleapi.com/reports/31146 -X "DELETE" -H "Content-Type: application/json"
```
### Response
#### Snippet of the response ####
``` json
   {
      "status":200,
      "message":"Successful"
      "error":"null"
   }
```
