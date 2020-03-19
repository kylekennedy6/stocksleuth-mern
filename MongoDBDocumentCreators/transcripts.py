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

TICKER_PATH = 'Tickers'
TRANSCRIPT_PATH = '/Users/kylekennedy/Desktop/mongoDBAdder/RatedTranscripts/'
FILTER_PATH = '/app/database_builder/filters.csv'


def getTranscripts():
    transcripts = []
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
                        row['eventDate'], '%Y-%m-%d')
                    projectedReportDate = datetime.strptime(
                        row['projectedReportDate'], '%Y-%m-%d')
                    break
            transcript = {
                "ticker": ticker,
                "fiscalQuarter": fiscalQuarter,
                "fiscalYear": fiscalYear,
                "eventDate": eventDate,
                "projectedReportDate": projectedReportDate}
            transcripts.append(transcript)
    return transcripts


transcripts = getTranscripts()
for transcript in transcripts:
    print(transcript)
    ticker = ticker_collection.find_one({"tickerText": transcript["ticker"]})
    if ticker == None:
        new_ticker = {
            "tickerText": transcript["ticker"],
            "company": "No Company Found",
            "transcripts": [],
            "eventReports": []
        }
        ticker_collection.insert_one(new_ticker)
    ticker = ticker_collection.find_one({"tickerText": transcript["ticker"]})
    ticker_id = ticker["_id"]
    t = {
        "ticker": ticker_id,
        "fiscalQuarter": transcript["fiscalQuarter"],
        "fiscalYear": transcript["fiscalYear"],
        "eventDate": transcript["eventDate"],
        "projectedReportDate": transcript["projectedReportDate"],
        "programmaticRating": 0,
        "openingStatements": [],
        "exchanges": [],
        "transcriptRatings": [],
        "guidanceVersusConsensusReports": [],
        "tendenciesReports": [],
        "sentimentReports": [],
        "tradeSubmissions": [],
        "reactionEvaluations": []
    }
    if transcript_collection.find_one({"ticker": ticker_id, "fiscalQuarter": t["fiscalQuarter"], "fiscalYear": t["fiscalYear"]}) == None:
        transcript_collection.insert_one(t)
        addedTranscript = transcript_collection.find_one(
            {"ticker": ticker_id, "fiscalQuarter": t["fiscalQuarter"], "fiscalYear": t["fiscalYear"]})
        addedTranscriptId = addedTranscript["_id"]
        ticker_collection.update_one({"_id": t["ticker"]}, {
                                     "$push": {"transcripts": addedTranscriptId}})
