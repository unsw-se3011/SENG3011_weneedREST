
def searchKeyTerms(event):
    args = parser_report.parse_args()

    keyterms = [word.strip() for word in args['key_terms'].split(',')]
    
    tempkeyTerms = []
    tempkeyTerms.append(event['headline'])
    tempkeyTerms.append(event['main_text'])
    tempkeyTerms.append(event['disease'][0:])
    tempkeyTerms.append(event['syndrome'][0:])
    tempkeyTerms.append(event['event-type'])

    # Test keywords
    # for word in keyterms
    for word in keyterms:
        for word2 in tempkeyTerms:
            if word in word2:
                return True
    return False

def compareStartDate(event):
    args = parser_report.parse_args()

    event_date = event['date'].split(' to ')[0]

    date_inputs1, time_inputs1 = event_date.split('T')[0], event_date.split('T')[1]
    date_inputs1, time_inputs1  = list( map(int, date_inputs1.split("-"))), list( map(int, time_inputs1.split(":")))

    date_inputs2, time_inputs2 = args['start-date'].split('T')[0], args['start-date'].split('T')[1]
    date_inputs2, time_inputs2 = list( map(int, date_inputs2.split('-'))), list( map(int, time_inputs2.split(':')))

    dateObj = datetime( *(date_inputs1 + time_inputs1) )
    start_date = datetime( *(date_inputs2 + time_inputs2) )

    if start_date > dateObj:  
        return False

    return True

def compareEndDate(event):
    args = parser_report.parse_args()

    event_date = event['date'].split(' to ')[1]

    date_inputs1, time_inputs1 = event_date.split('T')[0], event_date.split('T')[1]
    date_inputs1, time_inputs1  = list( map(int, date_inputs1.split("-"))), list( map(int, time_inputs1.split(":")))

    date_inputs2, time_inputs2 = args['end-date'].split('T')[0], args['end-date'].split('T')[1]
    date_inputs2, time_inputs2 = list( map(int, date_inputs2.split('-'))), list( map(int, time_inputs2.split(':')))

    dateObj = datetime( *(date_inputs1 + time_inputs1) )
    end_date = datetime( *(date_inputs2 + time_inputs2) )

    if end_date < dateObj:  
        return False

    return True