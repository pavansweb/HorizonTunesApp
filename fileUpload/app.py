import os
from flask import Flask, render_template, request, jsonify, send_from_directory
import requests
import re  # Import regular expressions module for filename sanitization
import base64

app = Flask(__name__)

# Create the upload folder if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def sanitize_filename(filename):
    # Remove any characters that are not alphanumeric or underscore
    return re.sub(r'[^\w]', '', filename)

@app.route('/')
def index():
    return render_template('fileUpload.html')

@app.route('/upload', methods=['POST'])
def upload_song():
    if request.method == 'POST':
        try:
            # Check if the fileUpload key exists in the request.files dictionary
            if 'fileUpload' not in request.files:
                return jsonify({"error": "No file part"}), 400

            # Get song details from the form
            song_name = request.form['songName']
            song_genre = request.form['songGenre']
            song_author = request.form['songAuthor']
            song_image = request.form['songImage']

            print(song_name)
            print(song_genre)
            print(song_author)
            print(song_image)

            # Get the uploaded song file
            song_file = request.files['fileUpload']

            # Check if the file is empty
            if song_file.filename == '':
                return jsonify({"error": "No selected file"}), 400

            # Sanitize the filename
            sanitized_filename = sanitize_filename(song_name)

            # Save the song file with the sanitized filename
            file_name = f"{sanitized_filename}.mp3"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            song_file.save(file_path)

            # Upload the song file to GitHub
            upload_to_github(file_path, file_name)

            # Return a success response
            return jsonify({"message": "Song uploaded successfully", "file_url": f"/{file_name}"})
        except Exception as e:
            # If any error occurs during the upload process, return an error response
            return jsonify({"error": f"Error in uploading: {str(e)}"}), 500
    else:
        return jsonify({"error": "Method not allowed"}), 405

@app.route('/fileUpload/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)



def upload_to_github(file_path, filename):
    try:
        # GitHub repository details
        username = "pavansweb"
        access_token = "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"
        repository = "songs"

        # GitHub API endpoint
        url = f"https://api.github.com/repos/{username}/{repository}/contents/{filename}"

        # GitHub API headers
        headers = {
            "Authorization": f"token {access_token}",
            "Content-Type": "application/json"
        }

        # Read the song file content in binary mode
        with open(file_path, "rb") as file:
            content = file.read()

        # Encode the binary content as base64
        content_base64 = base64.b64encode(content).decode('utf-8')

        # Prepare the request data
        data = {
            "message": "Upload song",
            "content": content_base64
        }

        # Upload the song file to GitHub
        response = requests.put(url, headers=headers, json=data)

        if response.status_code == 201:
            print("Song uploaded to GitHub successfully.")
            # Delete the uploaded song file
            os.remove(file_path)
            print("Song file deleted.")
        else:
            print(f"Failed to upload song to GitHub. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error uploading to GitHub: {e}")



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
