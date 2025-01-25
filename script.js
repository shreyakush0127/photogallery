document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const photos = document.getElementsByClassName('photo');
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
  
    // Filter photos based on search input
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      Array.from(photos).forEach(photo => {
        const tags = photo.dataset.tags.toLowerCase();
        if (tags.includes(query)) {
          photo.style.display = 'block';
        } else {
          photo.style.display = 'none';
        }
      });
    });
  
    // Open lightbox on photo click
    gallery.addEventListener('click', (event) => {
      if (event.target.tagName === 'IMG') {
        lightboxImage.src = event.target.src;
        lightbox.style.display = 'flex';
      }
    });
  
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  
    // Handle image upload
    uploadBtn.addEventListener('click', () => {
      imageUpload.click(); // Trigger the hidden file input
    });
  
    imageUpload.addEventListener('change', (event) => {
      const files = Array.from(event.target.files);
  
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const newPhoto = document.createElement('div');
            newPhoto.classList.add('photo');
            newPhoto.dataset.tags = "user-upload"; // Default tags for now
            newPhoto.innerHTML = `
              <img src="${e.target.result}" alt="User Upload">
              <p class="tags">Tags: user-upload</p>
            `;
            gallery.appendChild(newPhoto);
          };
          reader.readAsDataURL(file); // Convert file to data URL
        } else {
          alert('Only image files are allowed.');
        }
      });
  
      // Reset the file input so users can re-upload the same file if needed
      imageUpload.value = '';
    });
  });
  