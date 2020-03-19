import pymongo
import ssl
import glob
import os.path
import csv
from datetime import datetime
from pymongo import MongoClient
client = pymongo.MongoClient("*** YOUR MONGO CONNECT URL HERE ***", ssl=True, ssl_cert_reqs=ssl.CERT_NONE)
db = client.stocksleuth
ticker_collection = db.tickers
transcript_collection = db.transcripts
opening_statements_collection = db.openingstatements

TICKER_PATH = 'Tickers'
TRANSCRIPT_PATH = '/Users/kylekennedy/Desktop/mongoDBAdder/RatedTranscripts/'
FILTER_PATH = '/app/database_builder/filters.csv'

def getOpeningStatements():
    opening_statements = []
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
            with open('opening_statements.csv', 'r') as csvfile:
                fieldnames = ['number', 'executive', 'text']
                reader = csv.DictReader(
                    csvfile, fieldnames=fieldnames, delimiter='\t')
                for row in reader:
                    number = int(row['number'])
                    executive = row['executive']
                    text = row['text']
                    opening_statement = (
                        number, executive, text, transcript)
                    opening_statements.append(opening_statement)

    return opening_statements

opening_statements = getOpeningStatements()
for os in opening_statements:
  ticker = ticker_collection.find_one({"tickerText": os[3][0]})
  transcript = transcript_collection.find_one({"ticker": ticker["_id"], "fiscalQuarter": os[3][1], "fiscalYear": os[3][2]})
  transcriptId = transcript["_id"]

  o = {
    "number": int(os[0]),
    "executive": os[1],
    "text": os[2],
    "transcript": transcriptId,
    "programmaticRating": 0,
    "openingStatementRatings": []
  }
  if opening_statements_collection.find_one({"transcript": transcriptId, "number": o["number"]}) == None:
    opening_statements_collection.insert_one(o)
    addedOS = opening_statements_collection.find_one({"transcript": transcriptId, "number": o["number"]})
    addedOSId = addedOS["_id"]
    transcript_collection.update_one({"ticker": ticker["_id"], "fiscalQuarter": os[3][1], "fiscalYear": os[3][2]}, {"$push": {"openingStatements": addedOSId}})
