document.getElementById('createSlidesButton').addEventListener('click', createPowerPoint);

function createPowerPoint() {
    const slideText = document.getElementById("slideText").value;
    const slides = slideText.split('#'); // Each slide separated by '#'
    const imagePlacement = document.getElementById("imagePlacement").value;
    const titleSize = document.getElementById("titleSize").value;
    const contentSize = document.getElementById("contentSize").value;

    let pptx = new PptxGenJS();

    slides.forEach((slideContent, index) => {
        let [title, content] = slideContent.split('|');
        let slide = pptx.addSlide();
        
        // Add Title
        slide.addText(title.trim(), { x: 0.5, y: 0.5, fontSize: parseInt(titleSize), bold: true });
        
        // Add Content
        slide.addText(content.trim(), { x: 0.5, y: 1.5, fontSize: parseInt(contentSize) });
        
        // Optional: Add an image to the slide
        // Example placeholder image URL; replace with actual image URL logic
        let imageUrl = "https://via.placeholder.com/350";
        
        if (imagePlacement === "top") {
            slide.addImage({ data: imageUrl, x: 0.5, y: 0, w: 5, h: 3 });
        } else if (imagePlacement === "bottom") {
            slide.addImage({ data: imageUrl, x: 0.5, y: 3, w: 5, h: 3 });
        } else if (imagePlacement === "background") {
            slide.addImage({ data: imageUrl, x: 0, y: 0, w: '100%', h: '100%' });
        }
    });

    // Save the PowerPoint file
    pptx.writeFile({ fileName: "Generated_Presentation.pptx" });
}
