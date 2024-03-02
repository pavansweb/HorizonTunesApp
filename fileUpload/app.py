import os
from flask import Flask, render_template, request, jsonify, send_from_directory
import requests
import re  # Import regular expressions module for filename sanitization
import base64


def create_app():
    app = Flask(__name__)

    # Create the upload folder if it doesn't exist
    UPLOAD_FOLDER = 'uploads'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    SONG_DATABASE_FILE = 'songDatabase.js'
    GITHUB_USERNAME = "pavansweb"
    GITHUB_ACCESS_TOKEN = "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"
    GITHUB_REPOSITORY = "HorizonTunesApp"
    GITHUB_FILE_PATH = "webPage/songsDatabase.js"

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

    def change_file_in_gitjs(content):
        try:
            # GitHub repository details
            url = f"https://api.github.com/repos/{GITHUB_USERNAME}/{GITHUB_REPOSITORY}/contents/{GITHUB_FILE_PATH}"

            # GitHub API headers
            headers = {
                "Authorization": f"token {GITHUB_ACCESS_TOKEN}",
                "Content-Type": "application/json"
            }

            # Encode the content as base64
            content_base64 = base64.b64encode(content.encode()).decode('utf-8')

            # Prepare the request data
            data = {
                "message": "Update song database",
                "content": content_base64,
                "sha": get_file_sha(url)  # Get the current SHA of the file
            }

            # Update the songDatabase.js file in GitHub
            response = requests.put(url, headers=headers, json=data)

            if response.status_code == 200:
                print("Song database updated on GitHub successfully.")
            else:
                print(f"Failed to update song database on GitHub. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error updating song database on GitHub: {e}")

    def get_file_sha(url):
        response = requests.get(url)
        if response.status_code == 200:
            return response.json().get("sha")
        else:
            raise Exception(f"Failed to get file SHA from GitHub. Status code: {response.status_code}")

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

                print("  ")

                # Add song details to songDatabase.js
                add_to_song_database(song_name, f"https://pavansweb.github.io/songs/{file_name}", song_image, song_genre, song_author , 4)

                print("Song details added to songDatabase.js")

                # Upload song to GitHub
                upload_to_github(file_path, SONG_DATABASE_FILE)

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

    return app
