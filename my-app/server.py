from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from PIL import Image
import base64
from io import BytesIO
import time
import requests
import io
import os
import getpass
from werkzeug.utils import secure_filename
# Initialize Flask App
app = Flask(__name__)
CORS(app)


def get_downloads_folder():
    """Get the path to the Downloads folder."""
    home = os.path.expanduser("~")
    downloads_folder = os.path.join(home, "Downloads")
    return downloads_folder

@app.route('/PathMp4', methods=['GET'])
def PathMp4():
    downloads_path = get_downloads_folder()
    video_file_name = os.path.join(downloads_path)
    return jsonify({'message': video_file_name})

if __name__ == "__main__":
    app.run(debug=True)