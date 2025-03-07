from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import re
from PIL import Image
import base64
from io import BytesIO
import time
import requests
from PyPDF2 import PdfReader
import io
import os
import getpass
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from markitdown import MarkItDown
from langchain.schema import Document
from werkzeug.utils import secure_filename
# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Sec

genai.configure(api_key="AIzaSyBaNZzLDXuLpIY6r5XhKbp-qFZ53QZUf14")
model = genai.GenerativeModel("gemini-1.5-flash")

# File Upload Settings
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"pdf", "txt"}  # Allow only PDFs and TXT files

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route("/LearnBot", methods=["POST"])
# def learnBot():
#     input_data = request.get_json()

#     # Debugging log
#     print("Received request data:", input_data)

#     question = input_data.get("text", "").strip()
#     filename = input_data.get("filename", "").strip()

#     if not question or not filename:
#         return jsonify({"message": "Both question and filename are required"}), 400

#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
#     if not os.path.exists(file_path):
#         return jsonify({"message": "File not found"}), 404

#     file_content = ""

#     try:
#         # Handle PDF or Text file
#         if filename.lower().endswith(".pdf"):
#             loader = PyPDFLoader(file_path)
#             pages = loader.load()
#             file_content = "\n".join([page.page_content for page in pages])
#         else:
#             with open(file_path, "r", encoding="utf-8") as file:
#                 file_content = file.read()
#     except Exception as e:
#         return jsonify({"message": f"Error reading file: {str(e)}"}), 500

#     # Debugging log
#     print(f"Processing file: {filename}, Question: {question}")

#     # Send content + question to Gemini
#     try:
#         response = model.generate_content(f"Analyze the following file and answer the question:\n\n{file_content}\n\nQuestion: {question}")
#         return jsonify({"response": response.text})
#     except Exception as e:
#         return jsonify({"message": f"Error processing AI response: {str(e)}"}), 500


@app.route("/LearnBot", methods=["POST"])
def learnBot():
    input_data = request.get_json()
    input_text = input_data.get("text", "")

    response = model.generate_content(input_text)

    file_name = "uploads/file.pdf"

    if os.path.exists(file_name):
        answer = PdfAnswer(input_text)
        return jsonify({"response": answer})
    else:
        return jsonify({"response": response.text})


def PdfAnswer(user_input):
    file_name = "uploads/file.pdf"
    pdf_url = os.path.abspath(file_name)
    print(pdf_url)

    try:
        with open(pdf_url, 'rb') as file:
            pdf_reader = PdfReader(file)
            text = "\n".join([page.extract_text() for page in pdf_reader.pages if page.extract_text()])

        # Ask questions based on PDF content
        while True:
            user_question = user_input
            if user_question.lower() == "exit":
                break
            query = f"Based on this document: {text}\nAnswer this question: {user_question}"
            response = model.generate_content(query)
            print("Gemini's Response:")
            return response.text

    except FileNotFoundError:
        print(f"Error: File not found at {pdf_url}")
    except Exception as e:  # Fix PdfReadError issue
        print(f"An unexpected error occurred: {e}")


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = "file.pdf"  # Always save as file.pdf
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Save the new file, overwriting the old one
        file.save(file_path)

        return jsonify({'message': 'File uploaded successfully', 'filename': filename})
    
    return jsonify({'message': 'Invalid file type. Only PDF allowed.'}), 400

if __name__ == "__main__":
    app.run(debug=True)
