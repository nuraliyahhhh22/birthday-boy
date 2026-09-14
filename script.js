
/* =========================================
   VARIABLES
========================================= */

const pages = document.querySelectorAll(".card-page");
const nextButtons = document.querySelectorAll(".next-btn");

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

const envelope = document.getElementById("envelope");
const clickText = document.getElementById("clickText");
const restartBtn = document.getElementById("restartBtn");

let currentPage = 0;
let musicStarted = false;
let wishMade = false;


/* =========================================
   BIRTHDAY WISH
========================================= */

const wishMessage =
`happyybrithhdayy umairzakiiqayyeem 🤍

may your day be filled with happiness,
laughterr, andd unforgettablee momentss.

keepp beingg thee amazingg personn youu aree.

wishingg youu all thee bestt
todayy andd alwayss 🫠🤍`;


/* =========================================
   PAGE SWITCH
========================================= */

function showPage(index) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    pages[index].classList.add("active");

    currentPage = index;

    /* Start music when card is opened */
    if (!musicStarted && index > 0) {

        music.play()
            .then(() => {
                musicStarted = true;
                musicBtn.textContent = "♫";
            })
            .catch(() => {
                /*
                    Browser may block autoplay.
                    Music will start when music button is clicked.
                */
            });
    }


    /* Start typing effect on wish page */

    if (index === 3) {
        startTyping();
    }
}


/* =========================================
   NEXT BUTTON
========================================= */

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (currentPage < pages.length - 1) {
            showPage(currentPage + 1);
        }

    });

});

/* =========================================
   TYPING EFFECT
========================================= */

let typingStarted = false;

function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const textElement = document.getElementById("wishText");

    textElement.innerHTML = "";

    let index = 0;

    function type() {

        if (index < wishMessage.length) {

            if (wishMessage[index] === "\n") {
                textElement.innerHTML += "<br>";
            } else {
                textElement.innerHTML += wishMessage[index];
            }

            index++;

            setTimeout(type, 25);
        }
    }

    type();
}


/* =========================================
   MUSIC
========================================= */

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicStarted = true;

        musicBtn.textContent = "♫";

    } else {

        music.pause();

        musicBtn.textContent = "♪";

    }

});


/* =========================================
   FINAL LETTER
========================================= */

const letterMessage =
    "whateverr happenss afterr thiss,\n" +
    "thankk youu forr oncee beingg a partt off myy storyy 🤍";


let letterOpened = false;


/* Open envelope */

envelope.addEventListener("click", () => {

    if (letterOpened) return;

    letterOpened = true;

    envelope.classList.add("open");

    document
        .getElementById("page5")
        .classList.add("letter-opened");

    clickText.textContent = "a little message for you 🤍";


    /* Wait for envelope animation */

    setTimeout(() => {

        typeLetter();

    }, 900);

});


/* =========================================
   TYPE LETTER
========================================= */

function typeLetter() {

    const message =
        document.getElementById("letterMessage");

    const signature =
        document.getElementById("letterSignature");

    message.innerHTML = "";

    let index = 0;


    function type() {

        if (index < letterMessage.length) {

            if (letterMessage[index] === "\n") {

                message.innerHTML += "<br><br>";

            } else {

                message.innerHTML +=
                    letterMessage[index];

            }

            index++;

            setTimeout(type, 45);

        } else {

            /* Signature appears after typing */

            setTimeout(() => {

                signature.textContent =
                    "— maisarakiutt 🕷️";

                signature.style.opacity = "1";

                restartBtn.style.display =
                    "block";

            }, 700);

        }

    }

    type();
}


/* =========================================
   READ AGAIN
========================================= */

restartBtn.addEventListener("click", () => {

    letterOpened = false;

    envelope.classList.remove("open");

    document
        .getElementById("page5")
        .classList.remove("letter-opened");


    document
        .getElementById("letterMessage")
        .innerHTML = "";


    document
        .getElementById("letterSignature")
        .innerHTML = "";


    document
        .getElementById("letterSignature")
        .style.opacity = "0";


    clickText.textContent =
        "click the envelope";


    restartBtn.style.display =
        "none";


    /* Go back to first page */

    showPage(0);

});


/* =========================================
   READ AGAIN
========================================= */

restartBtn.addEventListener("click", () => {

    envelope.classList.remove("open");

    restartBtn.style.display = "none";

    clickText.textContent = "click the letter";

    typingStarted = false;

    showPage(0);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================================
   MAKE A WISH
========================================= */

const wishButton = document.getElementById("wishButton");
const flame = document.querySelector(".flame");

if (wishButton) {

    wishButton.addEventListener("click", () => {

        if (wishMade) return;

        wishMade = true;

        // Padam candle
        if (flame) {
            flame.classList.add("flame-out");
        }

        // Tukar text button
        wishButton.textContent = "WISH SENT ✦";

        // Disable button
        wishButton.disabled = true;

        // Confetti
        createConfetti();

    });

}

/* =========================================
   ENABLE NEXT AFTER WISH
========================================= */

const wishNextBtn =
    document.getElementById("wishNextBtn");

if (wishNextBtn) {

    wishNextBtn.addEventListener("click", () => {

        if (!wishMade) return;

        showPage(currentPage + 1);

    });

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    for (let i = 0; i < 35; i++) {

        const confetti = document.createElement("span");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2500);

    }

}


/* =========================================
   LITTLE SPIDER WEB EFFECT — NAVY
========================================= */

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;
    const y = event.clientY;

    const glow = document.querySelector(".background");

    if (!glow) return;

    glow.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(28, 91, 150, 0.18),
            transparent 32%
        ),
        radial-gradient(
            circle at 50% 45%,
            rgba(15, 55, 105, 0.32),
            transparent 42%
        ),
        radial-gradient(
            circle at 15% 20%,
            rgba(120, 0, 20, 0.16),
            transparent 32%
        ),
        linear-gradient(
            135deg,
            #020713 0%,
            #061329 45%,
            #02050d 100%
        )
    `;

});
