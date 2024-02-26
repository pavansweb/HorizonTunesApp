const fileUpload = document.getElementById('fileUpload');
const uploadFilename = document.querySelector('.upload-filename');
const uploadPreview = document.querySelector('.upload-preview');

fileUpload.addEventListener('change', function() {
  const file = this.files[0];
  uploadFilename.textContent = file.name;
  uploadPreview.style.display = 'inline-block';
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadPreview.src = e.target.result;
  }
  reader.readAsDataURL(file);
});
