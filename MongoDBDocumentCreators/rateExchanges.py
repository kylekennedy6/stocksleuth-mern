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


def getExchangeString(givenExchange):
  exchange_list = [givenExchange["questionText"]]
  for answer_dict in givenExchange["answers"]:
    exchange_list.append(answer_dict["answer"])
  exchange_string = ('/n').join(exchange_list)
  return exchange_string


def getAnswerString(givenExchange):
  answer_list = []
  for answer_dict in givenExchange["answers"]:
    answer_list.append(answer_dict["answer"])
  answer_string = ('/n').join(answer_list)
  return answer_string


def setNewRating(givenExchange, rating):
  exchange_query = {"_id":  givenExchange["_id"]}
  newProgrammaticRating = {"$set": {"programmaticRating": rating}}
  exchanges_collection.update_one(exchange_query, newProgrammaticRating)


def assignRatingForAltGuide():
  for exchange in exchanges_collection.find():
    exchange_string = getExchangeString(exchange)
    for weak_guide in weak_guides:
      if weak_guide in exchange_string:
        for metric in metrics:
          if metric in exchange_string:
            setNewRating(exchange, 1)
            break


def assignRatingForGuide():
  for exchange in exchanges_collection.find():
    exchange_string = getExchangeString(exchange)
    for guide in guides:
      if guide in exchange_string:
        setNewRating(exchange, 3)
        break


def assignRatingForAltGuideAndStrongAnswer():
  for exchange in exchanges_collection.find({"programmaticRating": 1}):
    exchange_string = getExchangeString(exchange)
    for strong_answer in strong_answers:
      if strong_answer in exchange_string:
        setNewRating(exchange, 2)
        break


def assignRatingForGuideAndStrongAnswer():
  for exchange in exchanges_collection.find({"programmaticRating": 3}):
    exchange_string = getExchangeString(exchange)
    for strong_answer in strong_answers:
      if strong_answer in exchange_string:
        setNewRating(exchange, 4)
        break


def assignRatingForGuideInQuestionAndStrongQuestion():
  for exchange in exchanges_collection.find({"programmaticRating": 4}):
    question = exchange["questionText"]
    for guide in guides:
      if guide in question:
        for strong_question in strong_questions:
          if strong_question in question:
            setNewRating(exchange, 5)
            break
  for exchange in exchanges_collection.find({"programmaticRating": 3}):
    question = exchange["questionText"]
    for guide in guides:
      if guide in question:
        for strong_question in strong_questions:
          if strong_question in question:
            setNewRating(exchange, 5)
            break


def assignRatingForStrongQuestionAndStrongAnswer():
  for exchange in exchanges_collection.find({"programmaticRating": 5}):
    answer_string = getAnswerString(exchange)
    for strong_answer in strong_answers:
      if strong_answer in answer_string:
        setNewRating(exchange, 6)
        break
  for exchange in exchanges_collection.find({"programmaticRating": 5}):
    answer_string = getAnswerString(exchange)
    for guide in guides:
      if guide in answer_string:
        setNewRating(exchange, 6)
        break


def assignMaxRating():
  for exchange in exchanges_collection.find({"programmaticRating": 6}):
    answer_string = getAnswerString(exchange)
    for guide in guides:
      if guide in answer_string:
        for strong_answer in strong_answers:
          if strong_answer in answer_string:
            setNewRating(exchange, 7)
            break

# assignRatingForAltGuide()
# assignRatingForGuide()
# assignRatingForAltGuideAndStrongAnswer()
# assignRatingForGuideAndStrongAnswer()
# assignRatingForGuideInQuestionAndStrongQuestion()
# assignRatingForStrongQuestionAndStrongAnswer()
# assignMaxRating()
