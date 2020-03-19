import pymongo
import ssl
import glob
import os.path
import csv
from datetime import datetime
from pymongo import MongoClient
client = pymongo.MongoClient(
    "*** YOUR MONGO CONNECT URL HERE ***", ssl=True, ssl_cert_reqs=ssl.CERT_NONE)
db = client.stocksleuth
ticker_collection = db.tickers
transcript_collection = db.transcripts
exchanges_collection = db.exchanges

TICKER_PATH = 'Tickers'
TRANSCRIPT_PATH = '/Users/kylekennedy/Desktop/mongoDBAdder/RatedTranscripts/'


def getExchanges():
    exchanges = []
    path = TRANSCRIPT_PATH
    os.chdir(path)
    for filename in os.listdir(path):
        if filename != '.DS_Store':
            os.chdir(path + filename)
            with open('transcript_info.csv', 'r') as csvfile:
                fieldnames = ['ticker', 'fiscalQuarter', 'fiscalYear',
                              'eventDate', 'projectedReportDate']
                reader = csv.DictReader(
                    csvfile, fieldnames=fieldnames, delimiter='\t')
                for row in reader:
                    ticker = row['ticker']
                    fiscalQuarter = row['fiscalQuarter']
                    try:
                        fiscalYear = int(row['fiscalYear'])
                    except:
                        fiscalYear = datetime.now().year
                    eventDate = datetime.strptime(
                        row['eventDate'], '%Y-%m-%d').date()
                    break
                transcript = (ticker, fiscalQuarter, fiscalYear, eventDate)
            try:
                os.chdir(path + filename + '/exchanges')

                for filename in os.listdir():
                    number = filename.split('_')[1].split('.')[0]
                    with open(filename, 'r') as csvfile:
                        fieldnames = ['speaker', 'text']
                        reader = csv.DictReader(
                            csvfile, fieldnames=fieldnames, delimiter='\t')

                        i = 0
                        answers = []
                        for row in reader:
                            if i == 0:
                                analyst = row['speaker']
                                questionText = row['text']
                            else:
                                executive = row['speaker']
                                answer_paras = row['text']
                                executive_answer = {
                                    "executive": executive, "answer": answer_paras}
                                answers.append(executive_answer)

                            i += 1
                        exchange = (number, analyst, questionText,
                                    answers, transcript)
                        exchanges.append(exchange)
            except:
                print("No exchanges for ", filename)
    return exchanges


exchanges = getExchanges()
for exchange in exchanges:
    ticker = ticker_collection.find_one({"tickerText": exchange[4][0]})
    transcript = transcript_collection.find_one(
        {"ticker": ticker["_id"], "fiscalQuarter": exchange[4][1], "fiscalYear": exchange[4][2]})
    transcriptId = transcript["_id"]
    e = {
        "number": int(exchange[0]),
        "analyst": exchange[1],
        "questionText": exchange[2],
        "answers": exchange[3],
        "transcript": transcriptId,
        "programmaticRating": 0,
        "exchangeRatings": []
    }
    if exchanges_collection.find_one({"transcript": transcriptId, "number": e["number"]}) == None:
        exchanges_collection.insert_one(e)
        addedExchange = exchanges_collection.find_one(
            {"transcript": transcriptId, "number": e["number"]})
        addedExchangeId = addedExchange["_id"]
        transcript_collection.update_one({"ticker": ticker["_id"], "fiscalQuarter": exchange[4][1], "fiscalYear": exchange[4][2]}, {
                                         "$push": {"exchanges": addedExchangeId}})
