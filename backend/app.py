from flask import Flask, jsonify, request, send_file
from flask_cors import CORS  # Importo Flask-CORS
from yt_dlp import YoutubeDL
import os

app = Flask(__name__)
CORS(app)  # Aktivizo CORS për të gjitha rruget

DOWNLOAD_DIR = 'downloads'
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

def download_video(url, format_type):
    ydl_opts = {
        'outtmpl': os.path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s'),
        'quiet': True,
        'noplaylist': True,
    }

    if format_type == 'mp3':
        ydl_opts['format'] = 'bestaudio/best'
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }]
    elif format_type == 'mp4 (h264)':
        ydl_opts['format'] = 'bestvideo[ext=mp4][vcodec=h264]+bestaudio[ext=m4a]/best[ext=mp4]'
        ydl_opts['merge_output_format'] = 'mp4'
    elif format_type == 'mp4':
        ydl_opts['format'] = 'best[ext=mp4]'

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        if format_type == "mp3":
            filename = os.path.splitext(filename)[0] + ".mp3"
        return filename

@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    format_type = data.get('format')
    if not url or not format_type:
        return jsonify({"error": "URL dhe formati janë të nevojshëm."}), 400
    try:
        file_path = download_video(url, format_type)
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
