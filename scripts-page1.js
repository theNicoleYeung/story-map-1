//SECTION 1
window.addEventListener('load', () => {
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    const audio3 = document.getElementById('audio3');

    // Initial volume settings
    audio1.volume = 1; // River Full volume
    audio2.volume = 0.6; // Heartbeat 60% volume
    audio3.volume = 1.0;

    // Set playback speed for audio2
    audio2.playbackRate = 0.75; // Play at 80% of the normal speed

    const playAudio = (audio) => {
        audio.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    };

    // Play both audios initially
    playAudio(audio1);
    playAudio(audio2);

    document.body.addEventListener('click', () => {
        playAudio(audio1);
        playAudio(audio2);
    }, { once: true });

    const section1 = document.getElementById('section1'); // Replace with actual ID
    if (section1) {
        window.addEventListener('scroll', () => {
            const section1Top = section1.getBoundingClientRect().top;
            const section1Height = section1.clientHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;
            const scrollThreshold = section1Top + 0.5 * section1Height; // 50% of section1

            if (scrollPosition >= scrollThreshold) {
                fadeOutAudio(audio1);
                fadeOutAudio(audio2);
                section1.classList.add('fade-out'); // Add fade-out class to section1
                playAudio(audio3);
            } else {
                fadeInAudio(audio1);
                fadeInAudio(audio2);
                section1.classList.remove('fade-out'); // Remove fade-out class from section1
            }
        });
    } else {
        console.error('Element with ID "section1" not found.');
    }

    function fadeOutAudio(audio) {
        let fadeOutInterval = setInterval(() => {
            // Decrease the volume gradually
            audio.volume -= 0.01;   //-0.01 for 500ms (0.5 sec) fades well!
            if (audio.volume <= 0) {
                audio.pause();
                clearInterval(fadeOutInterval);
            }
        }, 500); // Adjust the interval duration as needed; 1000 ms = 1 sec
    }

    function fadeInAudio(audio) {
        // Reset volume and play audio
        audio.volume = 1.0; // Reset to full volume
        if (audio.paused) {
            playAudio();
        }
    }
});


//for TRANSITION
document.addEventListener('DOMContentLoaded', function() {   
    const sections = document.querySelectorAll('.scroll-section');

    function revealSection() {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealSection);
    revealSection(); // Initial call to reveal sections on load
});

function toggleArrow() {
    var arrow = document.getElementById('scrollArrow');
    // arrow.style.display = 'block'; // Show the arrow
    arrow.classList.add('show'); // Add 'show' class to fade in the arrow
}

////////////////// CLICK TO TEST SOUND!
// document.querySelector('.loading-wave').addEventListener('click', function() {
//     window.open('https://devicetests.com/sound-test', '_blank');
// });


/////////////// CLICK SVG - NEED TO FIX!!!!!////////

const svgFiles = [
{
    file: 'Green_Heart_Boundary.svg',
    positionX: 163,  //190  '16.52%'
    positionY: -35,   //-120   '-12%'
    width: 988,    //1150
    height: 879,   //1000
    animation: 'fade-in' // Example animation class
},
{
    file: 'Green_Heart_Regions.svg',
    positionX: 180,   //208
    positionY: -28,   //-110
    width: 956,       //1118
    height: 855,        //980
    animation: 'fade-in' // Example animation class
},

];

// Initialize SVG counter
let svgCounter = 0;

// Event listener for button click to add next SVG
document.getElementById('next-svg-button').addEventListener('click', function() {
    // Add the next SVG with predefined properties
    addSVG(
        svgFiles[svgCounter].file,
        svgFiles[svgCounter].positionX,
        svgFiles[svgCounter].positionY,
        svgFiles[svgCounter].width,
        svgFiles[svgCounter].height,
        svgFiles[svgCounter].animation,
    );

    // Increment counter for next SVG
    svgCounter++;

    // Check if all SVGs have been added
    if (svgCounter >= svgFiles.length) {
        // Disable or hide the button when all SVGs are added
        this.disabled = true;
    }
});

// Function to add SVG to the container
function addSVG(file, positionX, positionY, width, height, animation) {
    const svgContainer = document.getElementById('add-svg');
    const svg = document.createElement('object');
    svg.type = 'image/svg+xml';
    svg.data = file;
    svg.style.position = 'absolute';
    svg.style.left = positionX + 'px';
    svg.style.top = positionY + 'px';
    svg.style.width = width + 'px';
    svg.style.height = height + 'px';

     // Add animation class
     svg.classList.add(animation);

    svgContainer.appendChild(svg);
}


// Button click behavior
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('next-svg-button');
    const img = document.getElementById('img');
    const labels = document.querySelectorAll('.label');
    const audio3 = document.getElementById('audio3');

    let clickCount = 0;

    button.addEventListener('click', () => {
        clickCount++;

        if (clickCount === 1) {
            // firstPopUp.style.display = 'none';
            // secondPopUp.style.display = 'block';
        } 

        if (clickCount === 2) {
            // secondPopUp.style.display = 'none';
            // thirdPopUp.style.display = 'block';
            labels.forEach(label => {
                label.style.display = 'block';
            });
            // button.classList.remove('pulse-glow');
            img.classList.add('rotate'); 
            button.classList.add('greyed-out');
            button.classList.remove('hover');
            // Stop and fade out audio3
            fadeOutAudio(audio3);
        }
    });

    function fadeOutAudio(audio) {
        let fadeOutInterval = setInterval(() => {
            if (audio.volume > 0) {
                audio.volume -= 0.01;
            } else {
                audio.pause();
                clearInterval(fadeOutInterval);
            }
        }, 50); // Adjust interval duration as needed
    }
});


/////////////////////////////////////////////


//(0b) To check if an element is IN VIEWPORT
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// // LAYER SOUND 4 - DOESN"T WORK YET
// function Sound4() {
//     const risk = document.getElementById('text-container-2');
//     const audio4 = document.getElementById('audio4');

//     if (isInViewport(risk)) {
//         audio4.play();
//         audio4.volume = 1;
//     }
// }

// // Add scroll event listener
// window.addEventListener('scroll', Sound4);




/////////////////////TRIGGER SECTION AUDIO WORKS!
// // Select the audio element
// const audio5 = document.getElementById('audio5');

// Options for the intersection observer
const options = {
    root: null, // use the viewport as the root
    threshold: 0.1 // trigger when 10% of the element is in view
};

// Callback function to handle intersection changes
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // // Play the audio when the div is in view
            // audio5.play();
            // Once it plays, you may want to disconnect the observer to prevent it from playing again
            observer.disconnect();
        }
    });
};

// Create the intersection observer
const observer = new IntersectionObserver(callback, options);

// Start observing the target div
const target = document.querySelector('.text-container-3');
if (target) {
    observer.observe(target);
}

document.addEventListener('DOMContentLoaded', function() {     //for Trigger Next Page
    const triggerSection = document.getElementById('trigger-section');
    const targetScrollPosition = triggerSection.offsetTop + triggerSection.offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY + window.innerHeight >= targetScrollPosition) {
            document.body.classList.add('fade-out');
            setTimeout(function() {
                window.location.href = '2-RiverPage.html'; // Change to your target page URL
            }, 1000); // Match the duration of the CSS transition
        }    
    });
});