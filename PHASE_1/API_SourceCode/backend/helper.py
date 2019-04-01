def searchKeyTerms(args, event):
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