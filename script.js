/* ==========================================
   BIRTHDAY SURPRISE
   ========================================== */


/* ================= SETTINGS ================= */

/*
   Password:
   Partner
*/

const SECRET_PASSWORD = "partner";


/*
   Birthday:
   October 12, 2026

   Change the year later if necessary.
*/

const BIRTHDAY =
    new Date("October 12, 2026 00:00:00");


/* ================= WISH STORAGE ================= */

/* Paste your Google Apps Script Web App URL here.
   It must end with /exec */
const WISH_API_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";



/* ================= SCREEN CONTROL ================= */

function showScreen(screenID) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(screenID);

    if (target) {

        target.classList.add("active");

        if (screenID === "cakeScreen") {
            initBirthdayCake();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* ================= PASSWORD ================= */

function checkPassword() {

    const input =
        document
        .getElementById("passwordInput")
        .value
        .trim()
        .toLowerCase();

    const error =
        document.getElementById("passwordError");


    if (input === SECRET_PASSWORD) {

        error.innerText = "";

        showScreen("countdownScreen");

        createHeartBurst();

    } else {

        error.innerText =
            "Hmm... think about what I always call you. 😏";

        shakePassword();

    }
}


function shakePassword() {

    const input =
        document.getElementById("passwordInput");

    input.animate(
        [
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 400
        }
    );
}


/* ================= COUNTDOWN ================= */

function updateCountdown() {

    const now =
        new Date().getTime();

    const target =
        BIRTHDAY.getTime();

    let difference =
        target - now;


    if (difference <= 0) {

        difference = 0;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .innerText =
        String(seconds).padStart(2, "0");
}


setInterval(updateCountdown, 1000);

updateCountdown();


/* ================= MUSIC ================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");


function startMusic() {

    music.volume = 0.45;

    music.play()
        .then(() => {

            musicButton.innerText =
                "🔊 Music On";

        })
        .catch(() => {

            musicButton.innerText =
                "🎵 Tap Music";

        });
}


function toggleMusic() {

    if (music.paused) {

        music.play();

        musicButton.innerText =
            "🔊 Music On";

    } else {

        music.pause();

        musicButton.innerText =
            "🔇 Music Off";
    }
}


/* ================= HEARTS ================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "🌸",
        "✨"
    ];

    heart.innerText =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    document.body.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 8000);
}


setInterval(createHeart, 700);


/* Add floating-heart CSS dynamically */

const floatingCSS = document.createElement("style");

floatingCSS.innerHTML = `

.floating-heart {

    position: fixed;

    bottom: -40px;

    z-index: 999;

    pointer-events: none;

    animation:
        floatingUp linear forwards;

}

@keyframes floatingUp {

    from {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;
    }

    to {

        transform:
            translateY(-110vh)
            rotate(360deg);

        opacity: 0;
    }
}

`;

document.head.appendChild(floatingCSS);


/* ================= HEART BURST ================= */

function createHeartBurst() {

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 100);
    }
}


/* ================= MEMORY SLIDESHOW ================= */

const memoryPhotos = [
    "photos/photo01.jpg",
    "photos/photo02.jpg",
    "photos/photo03.jpg",
    "photos/photo04.jpg",
    "photos/photo05.jpg",
    "photos/photo06.jpg",
    "photos/photo07.jpg",
    "photos/photo08.jpg",
    "photos/photo09.jpg",
    "photos/photo10.jpg"
];

const memoryQuotes = [
    "Some smiles are impossible to forget. ❤️",
    "Some moments become beautiful memories without even trying.",
    "Years may pass, but certain memories never really grow old.",
    "Some people make ordinary moments feel a little more special.",
    "Your smile has a way of making simple moments memorable.",
    "The smallest moments can become the ones we remember most.",
    "Some memories need no words; they simply stay in the heart.",
    "Life keeps moving, but beautiful moments stay with us.",
    "Keep smiling. Some smiles are worth remembering forever.",
    "And after all these little moments, one thing remains — you are special. ❤️"
];

let currentMemory = 0;
const memoryImage = document.getElementById("memoryImage");
const memoryQuote = document.getElementById("memoryQuote");
const memoryNumber = document.getElementById("memoryNumber");
const memoryProgress = document.getElementById("memoryProgress");
const nextMemoryButton = document.getElementById("nextMemoryButton");

function updateMemory(index, animate = true) {

    if (!memoryImage || !memoryQuote) return;

    const change = () => {
        memoryImage.src = memoryPhotos[index];
        memoryImage.alt = `Prasanna memory ${index + 1}`;
        memoryQuote.textContent = memoryQuotes[index];
        memoryNumber.textContent = String(index + 1).padStart(2, "0");
        memoryProgress.style.width = `${((index + 1) / memoryPhotos.length) * 100}%`;
    };

    if (!animate) {
        change();
        return;
    }

    memoryImage.classList.add("memory-fade-out");
    memoryQuote.classList.add("memory-quote-out");

    setTimeout(() => {
        change();
        memoryImage.classList.remove("memory-fade-out");
        memoryQuote.classList.remove("memory-quote-out");
    }, 450);
}

if (nextMemoryButton) {
    nextMemoryButton.addEventListener("click", () => {
        if (currentMemory < memoryPhotos.length - 1) {
            currentMemory++;
            updateMemory(currentMemory);
        } else {
            showScreen("cakeScreen");
        }
    });
}

updateMemory(0, false);




/* ================= BIRTHDAY CAKE — 22 CANDLES ================= */

let cakeInitialized = false;
let cakeBlown = false;
let cakeCut = false;

function initBirthdayCake() {
    const holder = document.getElementById("candleHolder");
    if (!holder) return;

    if (!cakeInitialized) {
        holder.innerHTML = "";

        const count = 22;
        const cols = 11;

        for (let i = 0; i < count; i++) {
            const candle = document.createElement("div");
            candle.className = "birthday-candle";

            const row = Math.floor(i / cols);
            const col = i % cols;
            const rowCount = row === 0 ? cols : count - cols;
            const spacing = 21;
            const start = (260 - ((rowCount - 1) * spacing)) / 2;

            candle.style.left = `${start + col * spacing}px`;
            candle.style.bottom = row === 0 ? "32px" : "0px";
            candle.style.height = row === 0 ? "58px" : "62px";
            candle.style.animationDelay = `${i * 0.035}s`;

            const flame = document.createElement("div");
            flame.className = "birthday-flame";
            candle.appendChild(flame);
            holder.appendChild(candle);
        }

        cakeInitialized = true;
    }

    resetCakeState();
}

function resetCakeState() {
    cakeBlown = false;
    cakeCut = false;

    document.querySelectorAll(".birthday-candle").forEach(c => c.classList.remove("off"));

    const blow = document.getElementById("wishBlowButton");
    const cut = document.getElementById("cutCakeButton");
    const cont = document.getElementById("cakeContinueButton");
    const status = document.getElementById("cakeStatus");

    if (blow) { blow.style.display = "inline-block"; blow.disabled = false; }
    if (cut) { cut.classList.remove("show"); }
    if (cont) { cont.classList.remove("show"); }
    if (status) status.textContent = "Make a wish, then blow out all 22 candles. ✨";
}

function blowCandles() {
    if (cakeBlown) return;
    cakeBlown = true;

    const button = document.getElementById("wishBlowButton");
    const status = document.getElementById("cakeStatus");
    if (button) { button.disabled = true; button.textContent = "Blowing... 💨"; }
    if (status) status.textContent = "Make your wish... 💫";

    const candles = [...document.querySelectorAll(".birthday-candle")];
    candles.forEach((candle, index) => {
        setTimeout(() => candle.classList.add("off"), index * 45);
    });

    setTimeout(() => {
        createCakeSparkles();
        if (button) { button.style.display = "none"; }
        const cut = document.getElementById("cutCakeButton");
        if (cut) cut.classList.add("show");
        if (status) status.textContent = "Wish made. ❤️ Now let's cut the cake!";
    }, candles.length * 45 + 500);
}

function cutCake() {
    if (cakeCut || !cakeBlown) return;
    cakeCut = true;

    const stage = document.getElementById("cakeStage");
    const status = document.getElementById("cakeStatus");
    const cutButton = document.getElementById("cutCakeButton");

    if (cutButton) cutButton.classList.remove("show");
    if (stage) {
        stage.classList.add("cake-cutting");
        const line = document.createElement("div");
        line.className = "cake-cut-line";
        stage.appendChild(line);
    }

    if (status) status.textContent = "Cake cutting... 🎂✨";
    createCakeSparkles();

    setTimeout(() => {
        const cont = document.getElementById("cakeContinueButton");
        if (cont) cont.classList.add("show");
        if (status) status.textContent = "Cake cut! ❤️ Your final surprise is waiting...";
    }, 1100);
}

function createCakeSparkles() {
    const stage = document.getElementById("cakeStage");
    if (!stage) return;

    for (let i = 0; i < 22; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "cake-sparkle";
        sparkle.textContent = i % 2 ? "✨" : "♥";
        sparkle.style.left = `${45 + Math.random() * 10}%`;
        sparkle.style.top = `${42 + Math.random() * 18}%`;
        sparkle.style.setProperty("--sx", `${(Math.random() - .5) * 260}px`);
        sparkle.style.setProperty("--sy", `${-40 - Math.random() * 190}px`);
        stage.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1300);
    }
}

/* ================= WISH ================= */

async function makeWish() {

    const input = document.getElementById("wishInput");
    const button = document.querySelector('#wishScreen button');
    const wish = input.value.trim();

    if (!wish) {
        alert("Make your wish first... ✨");
        return;
    }

    if (wish.length > 500) {
        alert("Your wish is too long. Please keep it under 500 characters.");
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
    }

    let saved = false;

    if (!WISH_API_URL.includes("PASTE_YOUR")) {
        try {
            await fetch(WISH_API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({ wish })
            });
            saved = true;
        } catch (error) {
            console.error("Wish save error:", error);
        }
    }

    document.getElementById("wishText").innerText =
        saved
            ? "Your wish has been made. ✨"
            : "Your wish has been made. ✨";

    input.value = "";

    if (button) {
        button.disabled = false;
        button.textContent = "Make My Wish ✨";
    }

    showScreen("fireworksScreen");
    launchFireworks();
}


/* ================= DOWNLOAD GREETING ================= */

function downloadGreetingFile() {

    const greeting = `Dear Partner,

Happy Birthday, Prasanna. ❤️🎂

I honestly don't know how to put everything I feel into words, but on your special day, I still wanted to try and write something from my heart.

We've known each other since our school days, and somehow, even after all these years, you're still someone very special to me.

Life changed, time passed, and we ended up far away from those school days… but some connections don't disappear just because time passes.

We've shared so many conversations, memories, laughs, and little moments over the years. Even though we still haven't been able to meet after all this time, I'm genuinely grateful that you're still a part of my life.

I've always wanted to hear your voice, have a real conversation with you, and finally meet you after all these years. I really hope that day comes soon. ❤️

I don't know what the future holds, but I hope we continue to create more beautiful memories, have more conversations, and finally get that chance to meet someday.

I hope this new year of your life brings you countless reasons to smile, beautiful memories, good health, success, and everything you've been wishing for.

Stay the same wonderful person you are.

Happy Birthday once again, Partner. ❤️🎂

— From your Partner ❤️`;

    try {
        const blob = new Blob(["\uFEFF", greeting], {
            type: "text/plain;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "Birthday_Greeting_Prasanna.txt";
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            link.remove();
            URL.revokeObjectURL(url);
        }, 1000);

        const status = document.getElementById("downloadStatus");

        if (status) {
            status.textContent = "Greeting downloaded ❤️";
        }

    } catch (error) {
        console.error("Greeting download error:", error);

        const status = document.getElementById("downloadStatus");

        if (status) {
            status.textContent = "Download failed. Please try again.";
        }
    }
}

/* ================= FIREWORKS ================= */


const canvas =
    document.getElementById(
        "fireworksCanvas"
    );

const ctx =
    canvas.getContext("2d");

let fireworks = [];

let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* ================= FIREWORK CLASS ================= */

class Firework {

    constructor(
        startX,
        startY,
        targetX,
        targetY
    ) {

        this.x = startX;

        this.y = startY;

        this.targetX = targetX;

        this.targetY = targetY;

        this.speed = 7;

        this.angle =
            Math.atan2(
                targetY - startY,
                targetX - startX
            );

        this.distance =
            Math.hypot(
                targetX - startX,
                targetY - startY
            );

        this.travelled = 0;

        this.trail = [];
    }


    update() {

        this.trail.push({
            x: this.x,
            y: this.y
        });


        if (this.trail.length > 8) {

            this.trail.shift();
        }


        this.x +=
            Math.cos(this.angle) *
            this.speed;

        this.y +=
            Math.sin(this.angle) *
            this.speed;


        this.travelled +=
            this.speed;


        if (
            this.travelled >=
            this.distance
        ) {

            explode(
                this.targetX,
                this.targetY
            );

            return false;
        }


        return true;
    }


    draw() {

        ctx.beginPath();

        ctx.moveTo(
            this.x,
            this.y
        );

        ctx.lineTo(
            this.x -
            Math.cos(this.angle) * 15,
            this.y -
            Math.sin(this.angle) * 15
        );

        ctx.strokeStyle =
            "rgba(255,220,180,.9)";

        ctx.lineWidth = 2;

        ctx.stroke();
    }
}


/* ================= PARTICLES ================= */

class Particle {

    constructor(
        x,
        y,
        angle,
        speed
    ) {

        this.x = x;

        this.y = y;

        this.angle = angle;

        this.speed = speed;

        this.life = 1;

        this.gravity = 0.035;

        this.friction = 0.985;

        this.size =
            Math.random() * 2.5 + 1;
    }


    update() {

        this.speed *=
            this.friction;


        this.x +=
            Math.cos(this.angle) *
            this.speed;


        this.y +=
            Math.sin(this.angle) *
            this.speed;


        this.speed *=
            this.friction;


        this.y +=
            this.gravity;


        this.life -= 0.012;


        return this.life > 0;
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,${150 + Math.random()*80},${190 + Math.random()*60},${this.life})`;

        ctx.fill();
    }
}


/* ================= EXPLOSION ================= */

function explode(x, y) {

    const particleCount = 90;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() * 6 + 2;


        particles.push(
            new Particle(
                x,
                y,
                angle,
                speed
            )
        );
    }
}


/* ================= FIREWORK LOOP ================= */

function fireworkLoop() {

    ctx.fillStyle =
        "rgba(2,0,8,.18)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    fireworks =
        fireworks.filter(
            firework => {

                const alive =
                    firework.update();

                firework.draw();

                return alive;
            }
        );


    particles =
        particles.filter(
            particle => {

                const alive =
                    particle.update();

                particle.draw();

                return alive;
            }
        );


    requestAnimationFrame(
        fireworkLoop
    );
}


fireworkLoop();


/* ================= LAUNCH ================= */

function launchFireworks() {

    /*
       First burst
    */

    createFirework();


    /*
       Multiple realistic-looking
       bursts at different positions.
    */

    const interval =
        setInterval(
            createFirework,
            750
        );


    setTimeout(
        () => clearInterval(interval),
        12000
    );
}


function createFirework() {

    const startX =
        Math.random() *
        canvas.width;


    const targetX =
        80 +
        Math.random() *
        (canvas.width - 160);


    const targetY =
        100 +
        Math.random() *
        (canvas.height * .45);


    fireworks.push(
        new Firework(
            startX,
            canvas.height + 10,
            targetX,
            targetY
        )
    );
}


/* ================= BIRTHDAY EFFECT ================= */

document.addEventListener(
    "click",
    function(event) {

        /*
           Small sparkle burst around
           buttons.
        */

        if (
            event.target.tagName ===
            "BUTTON"
        ) {

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                createHeart();
            }
        }

    }
);
/* =====================================================
   BIRTHDAY CAKE CONTROLS
   ===================================================== */

let candlesBlown = false;
let cakeHasBeenCut = false;


/* ================= CREATE 22 CANDLES ================= */

function createBirthdayCandles() {

    const holder = document.getElementById("candleHolder");

    if (!holder) return;

    /* Prevent duplicate candles */
    holder.innerHTML = "";

    const candleCount = 22;

    for (let i = 0; i < candleCount; i++) {

        const candle =
            document.createElement("div");

        candle.className =
            "birthday-candle";

        /*
           Spread candles naturally across
           the top of the cake.
        */

        const angle =
            (i / (candleCount - 1) - 0.5) * 70;

        const x =
            50 + Math.sin(angle * Math.PI / 180) * 42;

        const y =
            8 + Math.abs(angle) * 0.08;

        candle.style.left =
            `${x}%`;

        candle.style.bottom =
            `${y}px`;

        candle.style.transform =
            `translateX(-50%) rotate(${angle * .08}deg)`;


        /* Flame */

        const flame =
            document.createElement("div");

        flame.className =
            "birthday-flame";


        candle.appendChild(flame);

        holder.appendChild(candle);
    }
}


/* ================= BLOW CANDLES ================= */

function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    const candles =
        document.querySelectorAll(
            ".birthday-candle"
        );


    /* Turn off every flame */

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("off");

        }, index * 35);

    });


    const status =
        document.getElementById("cakeStatus");

    if (status) {

        setTimeout(() => {

            status.textContent =
                "Your wish has been made... ✨";

        }, 700);

    }


    const blowButton =
        document.getElementById(
            "wishBlowButton"
        );

    const cutButton =
        document.getElementById(
            "cutCakeButton"
        );


    if (blowButton) {

        blowButton.disabled = true;

        blowButton.style.opacity = "0.6";

        blowButton.textContent =
            "Wish Made ✨";

    }


    /* Show Cut Cake button */

    setTimeout(() => {

        if (cutButton) {

            cutButton.classList.add("show");

        }

        if (status) {

            status.textContent =
                "Now let's cut the birthday cake! 🔪🎂";

        }

    }, 1200);
}


/* ================= CUT CAKE ================= */

function cutCake() {

    if (!candlesBlown) {

        return;

    }

    if (cakeHasBeenCut) {

        return;

    }

    cakeHasBeenCut = true;


    const cakeStage =
        document.getElementById(
            "cakeStage"
        );

    const cutButton =
        document.getElementById(
            "cutCakeButton"
        );

    const continueButton =
        document.getElementById(
            "cakeContinueButton"
        );

    const status =
        document.getElementById(
            "cakeStatus"
        );


    /* Start cutting animation */

    if (cakeStage) {

        cakeStage.classList.add(
            "cake-cutting"
        );

    }


    if (cutButton) {

        cutButton.disabled = true;

        cutButton.style.opacity = "0.6";

        cutButton.textContent =
            "Cutting... 🔪";

    }


    if (status) {

        status.textContent =
            "Cutting the cake... 🎂🔪";

    }


    /* After the cake separates */

    setTimeout(() => {

        if (status) {

            status.textContent =
                "Cake cut! 🎂❤️";

        }

    }, 1400);


    /* Show Continue button */

    setTimeout(() => {

        if (continueButton) {

            continueButton.classList.add(
                "show"
            );

        }

    }, 1700);
}


/* ================= INITIALIZE CAKE ================= */

function initializeBirthdayCake() {

    createBirthdayCandles();

}


/* Create candles when page loads */

document.addEventListener(
    "DOMContentLoaded",
    initializeBirthdayCake
);