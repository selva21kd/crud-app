from flask import Flask, json, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import datetime
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
stores = []
app.config['CORS_HEADERS'] = 'Content-Type';
#Local DB
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/MarketStore";
mongo = PyMongo(app)

CORS(app)

@app.route('/stores', methods=['GET']) #eturn "Hello World!"
def get_tasks():
    stores = mongo.db.MarketStore.find()
    resp = dumps(stores)
    return resp

@app.route('/add-store', methods = ['POST'])
def addStore():
    data = json.loads(request.data);
    # data['id'] = len(stores);
    stores = mongo.db.MarketStore.find()
    resp = dumps(stores)
    data['date'] = datetime.datetime.now();
    id = mongo.db.MarketStore.insert({'id': len(resp), 'uName': data.get('uName'), 'shopName': data.get('shopName'), 'status': data.get('status'), 'date': datetime.datetime.now()})
    stores = mongo.db.MarketStore.find()
    resp = dumps(stores)
    return resp


@app.route('/update-store/<store_Id>', methods = ['POST'])
def updateStore(store_Id):
    data = json.loads(request.data)
    id = mongo.db.MarketStore.find_one_and_update({"id": data.get('storeId')}, 
                                 {"$set": {"uName": data.get('uName'),
                                            "shopName": data.get('shopName'),
                                            "status": data.get('status'),
                                            "date": datetime.datetime.now(),                                            
                                    }})
    stores = mongo.db.MarketStore.find()
    resp = dumps(stores)
    return resp

@app.route('/delete-store', methods = ['POST'])
def deleteStore():
    data = json.loads(request.data);
    id = mongo.db.MarketStore.delete_one({'id': data.get('storeId')})
    stores = mongo.db.MarketStore.find()
    resp = dumps(stores)
    return resp



if __name__ == '__main__':
    app.run(debug=True)