from flask import Flask, json, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
stores = []
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

@app.route('/stores', methods=['GET']) #eturn "Hello World!"
def get_tasks():
    response = jsonify(stores)
    return response;

@app.route('/add-store', methods = ['POST'])
def addStore():
    data = json.loads(request.data);
    data['id'] = len(stores);
    data['date'] = datetime.datetime.now();
    stores.append(data);
    response = jsonify(stores)
    return response

@app.route('/update-store/<store_Id>', methods = ['POST'])
def updateStore(store_Id):
    data = json.loads(request.data)
    print("stores        \n\n",stores,'\n')
    for item in stores:
        if(item.get('id') == int(store_Id)):
            item['uName'] = data.get('uName');
            item['shopName'] = data.get('shopName');
            item['status'] = data.get('status');
            item['date'] = datetime.datetime.now();
    response = jsonify(stores)
    return response

@app.route('/delete-store', methods = ['POST'])
def deleteStore():
    global stores;
    data = json.loads(request.data);
    print("Stores       ",stores)
    for item in stores:
        print("Item ", item)
    print("data ",data, stores)
    stores = [ i for i in stores if not (i['id'] == data.get('storeId'))]
    response = jsonify(stores)
    return response


@app.route('/api/create-task', methods=['GET'])
def create_task():
    stores.append({"id": len(stores), "title": "Learn Python", "description": "Start with Flask first", "done": False})
    return jsonify({'stores': stores})

# @app.route('/stores/<int:task_id>', methods=['GET'])
# def get_task(task_id):
#     task = [task for task in stores if task['id'] == task_id]
#     if len(task) == 0:
#         abort(404)
#     return jsonify({'task': task[0]})

if __name__ == '__main__':
    stores.append({
        'id': 1,
        'uName': 'Selva KD',
        'shopName': "Store 1",
        'status': 'Closed', 
        'date': datetime.datetime.now()
    });

    stores.append({
        'id': 2,
        'uName': 'Gowtham',
        'shopName': "Store 2",
        'status': 'Opened', 
        'date': datetime.datetime.now()
    });

    stores.append(
    {
        'id': 3,
        'uName': 'Arun',
        'shopName': "Store 3",
        'status': 'Closed', 
        'date': datetime.datetime.now()
    });
    stores.append(
    {
        'id': 4,
        'uName': 'Ramesh',
        'shopName': "Store 4",
        'status': 'Closed', 
        'date': datetime.datetime.now()
    });

    stores.append(
    {
        'id': 5,
        'uName': 'Ji Dhanapal',
        'shopName': "Store 5",
        'status': 'Closed', 
        'date': datetime.datetime.now()
    });
    stores.append(
    {
        'id': 6,
        'uName': 'Saravanan',
        'shopName': "Store 6",
        'status': 'Closed', 
        'date': datetime.datetime.now()
    })

    app.run(debug=True)