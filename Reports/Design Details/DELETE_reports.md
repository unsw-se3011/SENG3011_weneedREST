# Deletes a report with the corresponding ID

Usage
```
   DELETE /report/{id}
```
## Description
Deletes a report with the corresponding ID

## Parameters
- **id (required)** - ID of the Report

## Codes

| Code | Description |
| ---- | ---------- |
| 200  | Successful |
| 400  | Report Not Found |

## Return Format
Returns JSON data which contain the following keys:
- **message****

## Example

### Request
```
   curl -X DELETE "http://104.248.30.17:5000/reports/5" -H  "accept: application/json"
```
### Response
#### Snippet of the response ####
``` json
   {
      "deleted report 5"
   }
```
