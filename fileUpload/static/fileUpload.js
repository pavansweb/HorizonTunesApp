document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById("uploadForm");
    
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
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while uploading the file.");
      });
    });
  });
  