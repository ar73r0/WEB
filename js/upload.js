document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tentForm').addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent the form from submitting the default way
  
      const formData = new FormData(this);
  
      try {
        // Upload the image first
        const imageData = await uploadImage(formData);
  
        if (imageData && imageData.filename) {
          // After the image is uploaded, add the tent details
          const tentData = {
            name: formData.get('name'),
            price: formData.get('price'),
            image: imageData.filename
          };
  
          const result = await postTent(tentData);
  
          if (result) {
            document.getElementById('message').textContent = 'Tent uploaded successfully!';
            document.getElementById('tentForm').reset();
          } else {
            document.getElementById('message').textContent = 'Failed to upload tent.';
          }
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Failed to upload tent';
      }
    });
  });
  
  async function uploadImage(formData) {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
  
  async function postTent(tentData) {
    try {
      const response = await fetch('/api/tents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tentData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting tent data:', error);
    }
  }