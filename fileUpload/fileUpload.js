document.addEventListener("DOMContentLoaded", function() {
  const uploadForm = document.getElementById("uploadForm");
  const audioPlayer = document.getElementById("audioPlayer");
  const fileUpload = document.getElementById("fileUpload");

  // Listen for changes in the file input field
  fileUpload.addEventListener("change", function(event) {
      const file = event.target.files[0]; // Get the selected file

      // Check if a file is selected
      if (file) {
          const fileURL = URL.createObjectURL(file); // Create a URL for the selected file
          audioPlayer.src = fileURL; // Set the source of the audio player to the file URL
          audioPlayer.play(); // Start playing the audio
      }
  });

  uploadForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(uploadForm);

      // Send the form data including the file to the server
      fetch("/upload", {
          method: "POST",
          body: formData
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log(data.message);
              alert(data.message);
              // Set the source of the audio player to the uploaded file URL
              audioPlayer.src = data.file_url;
          })
          .catch(error => {
              console.error("Error:", error);
              alert("An error occurred while uploading the file.");
          });
  });
});
