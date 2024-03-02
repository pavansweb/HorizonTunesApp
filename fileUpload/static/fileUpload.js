document.addEventListener("DOMContentLoaded", function() {
  const uploadForm = document.getElementById("uploadForm");
  const songImageInput = document.getElementById("songImage");
  const previewImage = document.getElementById("previewImage");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioControl = document.getElementById("audioControl");
  const fileUploadInput = document.getElementById("fileUpload");
  const loader = document.getElementById("loader");
    
  songImageInput.addEventListener("input", function() {
    const imageUrl = songImageInput.value.trim();
    if (imageUrl !== "") {
        // Create a new image element
        const image = new Image();
        image.crossOrigin = "anonymous"; // To handle CORS
        image.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const size = Math.min(image.width, image.height);
            canvas.width = size;
            canvas.height = size;
            // Crop the image into a square
            context.drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, size, size);
            previewImage.src = canvas.toDataURL();
        };
        // Set the image source to the provided URL
        image.src = imageUrl;
    } else {
        previewImage.src = "";
    }
});

  fileUploadInput.addEventListener("change", function() {
      const file = fileUploadInput.files[0];
      if (file) {
          
          const reader = new FileReader();
          reader.onload = function(event) {
              const image = new Image();
              image.onload = function() {
                  const canvas = document.createElement('canvas');
                  const context = canvas.getContext('2d');
                  const size = Math.min(image.width, image.height);
                  canvas.width = size;
                  canvas.height = size;
                  context.drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, size, size);
                  previewImage.src = canvas.toDataURL();
              };
              image.src = event.target.result;
          };
          reader.readAsDataURL(file);
      }
  });

  // Update image preview on input field change
  songImageInput.addEventListener("input", function() {
      const imageUrl = songImageInput.value.trim();
      if (imageUrl !== "") {
          previewImage.src = imageUrl;
          previewImage.style.display = "block";
      } else {
          previewImage.src = "";
          previewImage.style.display = "none";
      }
  });

  // Update image preview when file is selected
 
  fileUploadInput.addEventListener("change", function() {
      const file = fileUploadInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
              previewImage.src = event.target.result;
              previewImage.style.display = "block";
          };
          reader.readAsDataURL(file);
      } else {
          previewImage.src = "";
          previewImage.style.display = "none";
      }
  });

     uploadForm.addEventListener("submit", function(event) {
          event.preventDefault();

          // Show loader
          loader.style.display = "block";

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
              // Optionally, reset the form after successful upload
              uploadForm.reset();
              // Hide loader
              loader.style.display = "none";
          })
          .catch(error => {
              console.error("Error:", error);
              alert("An error occurred while uploading the file. Please try again.");
              // Hide loader
              loader.style.display = "none";
          });
      });

  
 // Function to update audio player source and show it
 function updateAudioPlayer(audioSource) {
  audioControl.src = audioSource;
  audioPlayer.style.display = "block";
}

// Update audio player when file is selected
fileUploadInput.addEventListener("change", function() {
  const file = fileUploadInput.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const audioSource = event.target.result;
          updateAudioPlayer(audioSource);
      };
      reader.readAsDataURL(file);
  } else {
      audioPlayer.style.display = "none";
      audioControl.src = "";
  }
});

});
