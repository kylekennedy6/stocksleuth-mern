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
transcript_collection = db.transcripts
exchanges_collection = db.exchanges

i = 0

for transcript in transcript_collection.find():
    max_rating = 0
    for exchange in transcript["exchanges"]:
        current_exchange = exchanges_collection.find_one({"_id": exchange})
        current_rating = current_exchange["programmaticRating"]
        if current_rating > max_rating:
            max_rating = current_rating
            transcript_query = {"_id":  transcript["_id"]}
            newProgrammaticRating = {
                "$set": {"programmaticRating": max_rating}}
            transcript_collection.update_one(
                transcript_query, newProgrammaticRating)
