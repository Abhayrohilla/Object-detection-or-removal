{/* <script> */}
document.getElementById('uploadForm').onsubmit = async (event) => {
    event.preventDefault();

    const loadingIcon = document.getElementById('loadingIcon');
    const imageFile = document.getElementById('imageFile').files[0];
    const knownWidth = document.getElementById('knownWidth').value;
    const unit = document.getElementById('unit').value;
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("known_width", knownWidth);
    formData.append("unit", unit);

    const processedImage = document.getElementById('processedImage');
    const downloadBtn = document.getElementById('downloadBtn');

    // Show loading icon
    loadingIcon.style.display = 'block';

    const response = await fetch('http://127.0.0.1:8000/process-image/', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        processedImage.src = imageUrl;
        processedImage.classList.add('loaded'); // Trigger fade-in
        downloadBtn.style.display = 'inline-block'; // Show download button

        // Enable image download
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = 'processed_image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    } else {
        alert('Failed to process image');
    }

    // Hide loading icon
    loadingIcon.style.display = 'none';
};
// </script>