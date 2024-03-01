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

SONG_DATABASE_FILE = 'songDatabase.js'

def add_to_song_database(title, src, image, category, author, num_lines_from_bottom):
    try:
        with open(SONG_DATABASE_FILE, 'r') as file:
            lines = file.readlines()

        # Calculate the index to insert the new song details
        index = len(lines) - num_lines_from_bottom

        # Insert the new song details at the calculated index
        new_song = f'{{ title: "{title}", src: "{src}", image: "{image}", category: "{category}", author: "{author}" }},\n'
        lines.insert(index, new_song)

        with open(SONG_DATABASE_FILE, 'w') as file:
            file.writelines(lines)
    except Exception as e:
        print(f"Error adding to song database: {e}")


@app.route('/')
def index():
    return render_template('fileUpload.html')

@app.route('/upload', methods=['POST'])
def upload_song():
    if request.method == 'POST':
        try:
            print("Received POST request")
            # Check if the fileUpload key exists in the request.files dictionary
            if 'fileUpload' not in request.files:
                print("No file part")
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
                print("No selected file")
                return jsonify({"error": "No selected file"}), 400
            
            file_name = f"{song_name}.mp3"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
            song_file.save(file_path)

            print("Song saved to disk")

            # Upload the song file to GitHub
            upload_to_github(file_path, file_name)

            print("  ")

            # Add song details to songDatabase.js
            add_to_song_database(song_name, f"https://pavansweb.github.io/songs/{file_name}", song_image, song_genre, song_author , 4)

            print("Song details added to songDatabase.js")

            # Return a success response
            return jsonify({"message": "Song uploaded successfully", "file_url": f"/{file_name}"})
        except Exception as e:
            # If any error occurs during the upload process, return an error response
            print(f"Error: {e}")
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
        # After adding songs to songDatabase.js
        with open(SONG_DATABASE_FILE, 'r') as file:
         content = file.read()

        change_file_in_gitjs(content)

        if response.status_code == 201:
            print("Song uploaded to GitHub successfully.")
            # Delete the uploaded song file
            os.remove(file_path)
            print("Song file deleted.")
        else:
            print(f"Failed to upload song to GitHub. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error uploading to GitHub: {e}")

def change_file_in_gitjs(content):
    try:
        # GitHub repository details
        username = "pavansweb"
        access_token = "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"  
        repository = "HorizonTunesApp"
        branch = "main"
        file_path = "webPage/songsDatabase.js"

        # GitHub API endpoint
        url = f"https://api.github.com/repos/{username}/{repository}/contents/{file_path}"

        # GitHub API headers
        headers = {
            "Authorization": f"token {access_token}",
            "Content-Type": "application/json"
        }

        # Prepare the request data
        data = {
            "message": "Update songDatabase.js",
            "content": base64.b64encode(content.encode()).decode('utf-8'),
            "branch": branch
        }

        # Update the file on GitHub
        response = requests.put(url, headers=headers, json=data)

        if response.status_code == 200:
            print("songDatabase.js updated successfully on GitHub.")
        else:
            print(f"Failed to update songDatabase.js on GitHub. Status code: {response.status_code}")

    except requests.RequestException as e:
        print(f"Error updating songDatabase.js on GitHub: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")





if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
