function generateMeme(img, topText, bottomText, topTextSize, bottomTextSize) {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');

    // Size canvas to image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Text styles
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    
    let fontSize = canvas.width * topTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;

    
    ctx.textBaseline = 'top';
    topText.split('\n').forEach((t, i) => {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    
    fontSize = canvas.width * bottomTextSize;
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20;

    
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    // Initialize variables
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const topTextSizeInput = document.getElementById('top-text-size-input');
    const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    const imageInput = document.getElementById('image-input');
    const generateBtn = document.getElementById('generate-btn');
    // Default/Demo text
    topTextInput.value = 'First Text';
    bottomTextInput.value = 'Second Text';

    // Generate button click listener
    generateBtn.addEventListener('click', () => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image;
            img.src = reader.result;
            img.onload = () => {
                generateMeme(img, topTextInput.value, bottomTextInput.value,topTextSizeInput.value, bottomTextSizeInput.value);
            };
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
});