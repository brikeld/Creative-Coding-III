document.addEventListener('DOMContentLoaded', () => {
    const elts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2"),
        canvas: document.getElementById('canvas'),
    };
    const ctx = elts.canvas.getContext('2d');

    // Set canvas width based on screen width
    elts.canvas.width = window.innerWidth;

    // Image paths
    const imagePaths = [
        'HANDWRITTING_01.png',
        'HANDWRITTING_02.png',
        'HANDWRITTING_03.png',
        'HANDWRITTING_04.png',
        'HANDWRITTING_05.png',
        'HANDWRITTING_06.png',
        'HANDWRITTING_07.png',
        'HANDWRITTING_08.png',
        'HANDWRITTING_09.png',
        'HANDWRITTING_10.png',
        'HANDWRITTING_11.png',
        'HANDWRITTING_12.png',
        'HANDWRITTING_13.png',
        'HANDWRITTING_14.png',
        'HANDWRITTING_15.png',
        'HANDWRITTING_16.png',
        'HANDWRITTING_17.png',
        'HANDWRITTING_18.png',
        'HANDWRITTING_19.png',
        'HANDWRITTING_20.png',
        'HANDWRITTING_21.png',
        'HANDWRITTING_22.png',
        'HANDWRITTING_23.png',
        'HANDWRITTING_24.png',
        'HANDWRITTING_25.png',
        'HANDWRITTING_26.png',
        'HANDWRITTING_27.png',
        'HANDWRITTING_28.png',
        'HANDWRITTING_29.png',
        
    ];

    let loadedImages = 0;
    const images = [];

    // Load images and adjust the canvas height based on the aspect ratio of the image
    imagePaths.forEach((path, index) => {
        const img = new Image();
        img.src = `images/${path}`;
        img.onload = () => {
            images[index] = img;
            loadedImages++;
            if (loadedImages === imagePaths.length) {
                adjustCanvasHeight(images[0]); // Adjust canvas height to fit the first image's aspect ratio
                startAnimation();
            }
        };
    });

    // Adjust the canvas height to maintain the aspect ratio of the image
    function adjustCanvasHeight(image) {
        const aspectRatio = image.height / image.width;
        const numberOfSets = 6; // Number of sets of images you want to display
        elts.canvas.height = elts.canvas.width * aspectRatio * numberOfSets; // Set canvas height based on width, aspect ratio, and number of sets
    }

    function animateImages() {
        ctx.clearRect(0, 0, elts.canvas.width, elts.canvas.height);

        const numberOfSets = 6; 
        const drawWidth = elts.canvas.width;
        const drawHeight = (images[0].height / images[0].width) * drawWidth;

        for (let setIndex = 0; setIndex < numberOfSets; setIndex++) {
            images.forEach((img, index) => {
                setTimeout(() => {
                    ctx.save(); 

                    ctx.globalCompositeOperation = index === 0 ? 'source-over' : 'multiply'; // Set the blend mode to darken for all images except the first one

                    const yOffset = setIndex * drawHeight;

                    ctx.drawImage(img, 0, yOffset, drawWidth, drawHeight); 

                    ctx.restore(); 
                }, index * 500);
            });
        }
    }

    function startAnimation() {
        animateImages();
        setInterval(animateImages, images.length * 500);
    }

    // Scroll morphing text 
    function calculateScrollFraction() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return scrollTop / scrollHeight;
    }

    function doMorph(scrollFraction) {
        let fraction = Math.min(scrollFraction, 1);
        setMorph(fraction);
    }

    function setMorph(fraction) {
        // Apply blur and opacity as before
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px) url(#gooey)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 1000}%`;
    
        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px) url(#gooey)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    }
    

    window.addEventListener('scroll', () => {
        const scrollFraction = calculateScrollFraction();
        doMorph(scrollFraction);
    });

    const initialScrollFraction = calculateScrollFraction();
    doMorph(initialScrollFraction);
});