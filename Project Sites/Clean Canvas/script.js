// WGenjEY4sdwBHfhXiD2jCM3c



const imageUpload = document.getElementById('imageUpload');
const removeBackgroundBtn = document.getElementById('removeBackgroundBtn');
const saveImageBtn = document.getElementById('saveImageBtn');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const REMOVE_BG_API_KEY = 'WGenjEY4sdwBHfhXiD2jCM3c';
let uploadedImage;

imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = new Image();
        uploadedImage.src = e.target.result;
        uploadedImage.onload = function() {
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 600;
            const scaleFactor = Math.min(MAX_WIDTH / uploadedImage.width, MAX_HEIGHT / uploadedImage.height);
            const newWidth = uploadedImage.width * scaleFactor;
            const newHeight = uploadedImage.height * scaleFactor;

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(uploadedImage, 0, 0, newWidth, newHeight);

            // Display the image in the upload box
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
    };
    reader.readAsDataURL(file);
});

removeBackgroundBtn.addEventListener('click', function() {
    if (!uploadedImage) {
        alert('Please upload an image first!');
        return;
    }

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image_file', blob);
        formData.append('size', 'auto');

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': REMOVE_BG_API_KEY
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.blob();
                const url = URL.createObjectURL(result);
                const img = new Image();
                img.src = url;
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);

                    // Display the image in the upload box after background removal
                    const imagePreview = document.getElementById('imagePreview');
                    imagePreview.innerHTML = `<img src="${url}" alt="Processed Image">`;
                };
            } else {
                alert('Error removing background. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    });
});

saveImageBtn.addEventListener('click', function() {
    if (!canvas.toDataURL()) {
        alert('No image to save. Please upload and process an image first.');
        return;
    }

    const link = document.createElement('a');
    link.download = 'Clean Canvas No-bg.png';
    link.href = canvas.toDataURL();
    link.click();
});
