import os
import youtube_dl
from flask import Flask, jsonify, send_file, request

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download_video():
    url = request.json['url']
    video_info = youtube_dl.YoutubeDL().extract_info(url, download=False)
    video_id = video_info['id']
    output_path = f'{video_id}.mp4'
    ydl_opts = {
        'outtmpl': output_path,
        'format': 'mp4'
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return jsonify({'video_id': video_id})

@app.route('/download/<video_id>')
def serve_video(video_id):
    file_path = f'{video_id}.mp4'
    if os.path.isfile(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({'message': 'Video not found'})

if __name__ == '__main__':
    app.run(debug=True)
