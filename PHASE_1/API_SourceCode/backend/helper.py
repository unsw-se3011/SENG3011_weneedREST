from datetime import datetime
import json

def searchKeyTerms(args, event):
    '''
        Searches through the report object event for all key terms in args \n
            returns true or false
    '''
    keyterms = [word.strip() for word in args.split(',')]
    
    tempkeyTerms = []
    tempkeyTerms.append(event['headline'])
    tempkeyTerms.append(event['main_text'])
    tempkeyTerms.append(event['reports'][0]['disease'][0:])
    tempkeyTerms.append(event['reports'][0]['syndrome'][0:])
    tempkeyTerms.append(event['reports'][0]['reported_events'][0]['type'])

    # Test keywords
    # for word in keyterms
    for word in keyterms:
        for word2 in tempkeyTerms:
            if word in word2:
                return True
    return False

def compareDate(compareDate, compare, event):
    '''
        Compares if \n
            1. compareDate is "less" than event or 
            2. compareDate is "greater" than event
        based on compare={"less", "greater"}
        returns true or false 
    '''
    event_date = event['reports'][0]['reported_events'][0]['date']

    date_inputs1, time_inputs1 = event_date.split('T')[0], event_date.split('T')[1]
    date_inputs1, time_inputs1  = list( map(int, date_inputs1.split("-"))), list( map(int, time_inputs1.split(":")))

    date_inputs2, time_inputs2 = compareDate.split('T')[0], compareDate.split('T')[1]
    date_inputs2, time_inputs2 = list( map(int, date_inputs2.split('-'))), list( map(int, time_inputs2.split(':')))

    dateObj = datetime( *(date_inputs1 + time_inputs1) )
    compare_date = datetime( *(date_inputs2 + time_inputs2) )

    if compare == "greater" and compare_date > dateObj:  
        return False

    if compare == "less" and compare_date < dateObj:  
        return False

    return True

def dumpData(data):
    '''
        Dumps data into clean.json 
    '''
    with open('clean.json',"w") as f:
        json.dump(data, f)
        f.close()

def readData():
    '''
        reads from clean.json and returns data
    '''
    with open('clean.json',"r") as f:
        dummyResponse = eval(f.read())
        f.close()
    
    return dummyResponse
    
def format_raw_article(article):
    article['reports']['reported_events'] = [ article['reports']['reported_events'] ]
    article['reports'] = [ article['reports'] ]
    return article