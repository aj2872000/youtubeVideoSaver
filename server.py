from flask import Flask, jsonify, send_file, request,json
from flask_cors import CORS
from pytube import YouTube



app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "https://cheerful-fox-734579.netlify.app"}})


@app.route('/download', methods=['POST'])
def download():
    url = request.json['url']
    YouTube_1=YouTube(url)
    videos= YouTube_1.streams
    vid = [{'itag': stream.itag, 'mime_type': stream.mime_type, 'res': stream.resolution} for stream in videos]
    return jsonify(vid)

@app.route('/process', methods=['POST'])
def process():
    url = request.json['url']
    id= request.json['id']
    print(id)
    YouTube_1=YouTube(url)
    videos= YouTube_1.streams
    videos[int(id)].download()
    return 'downloaded successfully'

if __name__ == '__main__':
    app.run(debug=True)



# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/members',methods=['GET'])
# def members():
#     return {'members':['ajay','amit']}

# if __name__ == '__main__':
#     app.run(debug=True)
