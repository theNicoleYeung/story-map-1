//(0a) FOR TRANSITION between Sections
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

//SECTION 1
window.addEventListener('load', () => {
    const audio0 = document.getElementById('audio0');

    // Initial volume settings
    audio0.volume = 1; // Full volume

    const playAudio = (audio) => {
        audio.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    };

    // Play audios initially
    playAudio(audio0);


    document.body.addEventListener('click', () => {
        playAudio(audio0);
    }, { once: true });

    const section2 = document.getElementById('section2'); // Replace with actual ID
    if (section2) {
        window.addEventListener('scroll', () => {
            const section2Top = section2.getBoundingClientRect().top;
            const section2Height = section2.clientHeight;
            const scrollPosition = window.scrollY || window.pageYOffset;
            const scrollThreshold = section2Top * section2Height; // 80% of section1

            if (scrollPosition >= scrollThreshold) {
                fadeOutAudio(audio0);
                section2.classList.add('fade-out'); // Add fade-out class to section1
            } 
        });
    }

    function fadeOutAudio(audio) {
        let fadeOutInterval = setInterval(() => {
            // Decrease the volume gradually
            audio.volume -= 0.01;   //-0.01 for 500ms (0.5 sec) fades well!
            if (audio.volume <= 0) {
                audio.pause();
                clearInterval(fadeOutInterval);
            }
        }, 5000); // Adjust the interval duration as needed; 1000 ms = 1 sec
    }
});


//(3) FOR BUTTON PANEL
function handleButtonClick(buttonId, audioId, backgroundImage) {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio.id === audioId) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    const rightColumn = document.getElementById('right-column-container');
    rightColumn.style.backgroundImage = `url(${backgroundImage})`;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    const contentPanels = document.querySelectorAll('.tabs_text_panels > div');
    contentPanels.forEach(panel => {
        if (panel.id === `${buttonId}-text`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

//(3) FOR Volume fade of Section3 (Tab Panel)
//(3a) Function to calculate volume based on scroll position
function adjustVolume() {
    const gridContainer = document.querySelector('.grid-container');
    const rect = gridContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Calculate the scroll percentage relative to the grid-container
    let scrollPercentage = 0;
    if (rect.bottom < 0) {
        scrollPercentage = 0; // Above the grid-container
    } else if (rect.top > windowHeight) {
        scrollPercentage = 1; // Below the grid-container
    } else {

    // Calculate the percentage of scroll position relative to the grid-container
    const height = rect.bottom - rect.top;
    const offset = rect.top < 0 ? Math.abs(rect.top) : 0;
    scrollPercentage = Math.min(1, (windowHeight - offset) / height);
    }

     // Custom initial volume settings for each audio element
            const initialVolume1 = 0.3; // Initial volume for audio1
            const initialVolume2 = 0.3; // Initial volume for audio2
            const initialVolume3 = 0.3; // Initial volume for audio3

    // Adjust volume based on scroll percentage (e.g., linear fade)
            const volume1 = Math.max(0, initialVolume1 * scrollPercentage);
            const volume2 = Math.max(0, initialVolume2 * scrollPercentage);
            const volume3 = Math.max(0, initialVolume3 * scrollPercentage);

     // Set volume for specific audio elements (audio1, audio2, audio3)
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    const audio3 = document.getElementById('audio3');

    if (audio1) {
        audio1.volume = volume1;
    }
    if (audio2) {
        audio2.volume = volume2;
    }
    if (audio3) {
        audio3.volume = volume3;
    }
}

//(3b) Add scroll event listener to adjust volume based on scroll position  - MUST STAY IN THIS POSITION?
window.addEventListener('scroll', adjustVolume);

//(4) FOR Play All Audios in Harmony Div
//(4b) To PLAY ALL AUDIOS - when harmony div is in view
function playAllAudios() {
    const harmonyDiv = document.getElementById('harmony');
    if (isInViewport(harmonyDiv)) {
        //document.getElementById('audio4').play();
        // Set different volumes for each audio element
        const audio1 = document.getElementById('audio1');
        if (audio1) {
            audio1.volume = 0.1; // Example volume for audio1
            audio1.play();
        }

        const audio2 = document.getElementById('audio2');
        if (audio2) {
            audio2.volume = 0.1; // Example volume for audio2
            audio2.play();
        }

        const audio3 = document.getElementById('audio3');
        if (audio3) {
            audio3.volume = 0.1; // Example volume for audio3
            audio3.play();
        }

        const audio4 = document.getElementById('audio4');
        if (audio4) {
            audio4.volume = 0.8; // Example volume for audio4
            audio4.play();
        }
    }
}

//(5) TO PAUSE all audios when scroll past section 3
//(5a)
function AudioPastGrid() {
    const section3 = document.getElementById('section3');
    const rect = section3.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if scrolled past section 3
    if (rect.bottom < 0 || rect.top > windowHeight) {
       const audio1 = document.getElementById('audio1');
        if (audio1) {
            audio1.pause();
            audio1.currentTime = 0
        }

        const audio2 = document.getElementById('audio2');
        if (audio2) {
            audio2.pause();
            audio2.currentTime = 0
        }

        const audio3 = document.getElementById('audio3');
        if (audio3) {
            audio3.pause();
            audio3.currentTime = 0
        }

        const audio4 = document.getElementById('audio4');
        if (audio4) {
            audio4.pause();
            audio4.currentTime = 0
        }

        const audio5 = document.getElementById('audio5');
        if (audio5) {
            audio5.pause();
            audio5.currentTime = 0
        }
    }
}

//(5b) Add scroll event listener (for both Harmony and Section 3)
window.addEventListener('scroll', () => {
    playAllAudios();
    AudioPastGrid();
});

////// SECTION 6-8

//(6) LAYER SOUND 6
    function Sound6() {
        const risk6 = document.getElementById('risk6');
        const audio6 = document.getElementById('audio6');

        if (isInViewport(risk6)) {
            audio6.play();
            audio6.volume = 0.1;
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', Sound6);

//(7) LAYER SOUND 7
    function Sound7() {
        const risk7 = document.getElementById('risk7');
        const audio7 = document.getElementById('audio7');

        if (isInViewport(risk7)) {
            audio7.play();
            audio7.volume = 1;
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', Sound7);


//(8) LAYER SOUND 8
    function Sound8() {
        const risk8 = document.getElementById('risk8');
        const audio8 = document.getElementById('audio8');

        if (isInViewport(risk8)) {
            audio8.play();
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', Sound8);


//////////////////////////
//(9) FADE OUT ALL RISK SOUNDS

    function fadeOutAudio(audio, duration) {
        let step = audio.volume / (duration / 100); // Calculate the step based on 50ms interval
        let fadeAudio = setInterval(function() {
            if (audio.volume > step) {
                audio.volume -= step;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeAudio);
            }
        }, 100);
    }

    document.addEventListener('scroll', function() {
        var textContainer = document.querySelector('.text-next');
        var containerRect = textContainer.getBoundingClientRect();
        var midpoint = containerRect.top + (containerRect.height /2);
        var viewportHeight = window.innerHeight;

        if (midpoint < viewportHeight / 2) {
            var audios = document.querySelectorAll('audio');
            audios.forEach(function(audio) {
                fadeOutAudio(audio, 4000); // Fade out over 4 second
            });
        }
    });


////////// FINAL PEACE

// //(10a) from previous InViewport command!
// //(10b) To PLAY Peace - when end div is in view
// function playPeace() {
//     const end = document.getElementById('section10');
//     if (isInViewport(end)) {
//         document.getElementById('audio10').play();
//         // // Set different volumes for each audio element
//         // const audio10 = document.getElementById('audio10');
//         // if (audio10) {
//         //     audio10.volume = 0.1; // Example volume for audio1
//         //     audio10.play();
//         // }
//     }
// }

// window.addEventListener('scroll', () => {
//     playPeace();
// });