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
opening_statements_collection = db.openingstatements

FILTER_PATH = 'filters.csv'


def getFilters():
  with open(FILTER_PATH, 'rt') as csvfile:
    metrics = []
    results = []
    guide = []
    weak_guide = []
    strong_question = []
    strong_answer = []
    show = []
    reader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in reader:
      if row[0] != '':
        metrics.append(row[0])
      if row[1] != '':
        results.append(row[1])
      if row[2] != '':
        guide.append(row[2])
      if row[3] != '':
        weak_guide.append(row[3])
      if row[4] != '':
        strong_question.append(row[4])
      if row[5] != '':
        strong_answer.append(row[5])
      if row[6] != '':
        show.append(row[6])
    metrics.pop(0)
    results.pop(0)
    guide.pop(0)
    weak_guide.pop(0)
    strong_question.pop(0)
    strong_answer.pop(0)
    show.pop(0)
  return (metrics, results, guide, weak_guide, strong_question, strong_answer, show)


filters = getFilters()

filters = getFilters()
metrics = filters[0]
results = filters[1]
guides = filters[2]
weak_guides = filters[3]
strong_questions = filters[4]
strong_answers = filters[5]
shows = filters[6]


def setNewRating(givenOpeningStatement, rating):
  opening_statement_query = {"_id":  givenOpeningStatement["_id"]}
  newProgrammaticRating = {"$set": {"programmaticRating": rating}}
  opening_statements_collection.update_one(
      opening_statement_query, newProgrammaticRating)


def assignRatingForAnyGuide():
  for opening_statement in opening_statements_collection.find():
    if opening_statement["programmaticRating"] < 2:
      text = opening_statement["text"]
      for guide in guides:
        if guide in text:
          setNewRating(opening_statement, 2)
          break
      for weak_guide in weak_guides:
        if weak_guide in text:
          for metric in metrics:
            if metric in text:
              setNewRating(opening_statement, 2)
              break


def assignRatingForGuideWithStrong():
  for opening_statement in opening_statements_collection.find({"programmaticRating": 2}):
    text = opening_statement["text"]
    for guide in guides:
      if guide in text:
        for strong_answer in strong_answers:
          if strong_answer in text:
            setNewRating(opening_statement, 3)
            break


def assignRatingForMetricAndResult():
  for opening_statement in opening_statements_collection.find({"programmaticRating": 0}):
    text = opening_statement["text"]
    for metric in metrics:
      if metric in text:
        for result in results:
          if result in text:
            setNewRating(opening_statement, 1)
            break


assignRatingForAnyGuide()
assignRatingForGuideWithStrong()
assignRatingForMetricAndResult()
