import base64
import sys
import responder 
import os 
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import colour

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST']) 
def post_index(): 
    if request.is_json:

        req = request.get_json()
        img = base64.b64decode(req.get('img64').split('data:image/png;base64,')[1])
        path = "image.png"
        with open(path, "wb") as fh:
            fh.write(img)

        res = responder.test_image(path)
        return make_response(jsonify({'res': res}), 200)
    else:
        return make_response("Request must be in JSON format", 400)

@app.route("/", methods=['GET']) 
def get_index(): 
    return make_response(jsonify({'res': 'index'}), 200)
    
if __name__ == "__main__": 
    app.run(host='127.0.0.1', port=2080, debug=True) 

