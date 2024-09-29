Office.onReady(function (info) {
    if (info.host === Office.HostType.PowerPoint) {
        document.getElementById("createSlidesButton").onclick = createSlides;
    }
});

function createSlides() {
    const slideText = document.getElementById("slideText").value;
    const slides = slideText.split('#'); // Each slide separated by '#'
    const imagePlacement = document.getElementById("imagePlacement").value;
    const titleSize = document.getElementById("titleSize").value;
    const contentSize = document.getElementById("contentSize").value;

    slides.forEach(async (slideContent, index) => {
        let [title, content] = slideContent.split('|');
        
        // Create PowerPoint slide
        Office.context.document.createSlide({
            title: title.trim(),
            content: content.trim(),
            titleSize: titleSize,
            contentSize: contentSize,
            imagePlacement: imagePlacement
        });

        // Fetch image using AI API (e.g., OpenAI or Unsplash)
        const imageUrl = await fetchImageForSlide(content.trim());
        
        // Insert image into the slide
        insertImageIntoSlide(index + 1, imageUrl, imagePlacement);
    });
}

// Function to interact with AI API for image generation
async function fetchImageForSlide(slideContent) {
    const response = await fetch('https://api.unsplash.com/photos/random?query=' + encodeURIComponent(slideContent) + '&client_id=YOUR_UNSPLASH_API_KEY');
    const data = await response.json();
    return data.urls.regular;
}

// Function to insert image into a slide
function insertImageIntoSlide(slideIndex, imageUrl, placement) {
    Office.context.document.getSlide(slideIndex).insertImage(imageUrl, placement);
}
