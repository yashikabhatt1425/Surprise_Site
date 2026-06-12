let current = 0;
let answers = [];
let selected = null;

let time = 300;
let timerStarted = false;
let timerInterval = null;

/* =========================
   START TEST (CINEMATIC ENTRY)
========================= */
function startTest() {
    const startScreen = document.getElementById("startScreen");
    const testScreen = document.getElementById("testScreen");
    const bgMusic = document.getElementById("bgMusic");

    startScreen.style.opacity = "0";
    startScreen.style.transform = "scale(0.95)";

    setTimeout(() => {
        startScreen.style.display = "none";
        testScreen.style.display = "block";

        testScreen.style.opacity = "0";
        testScreen.style.transform = "scale(1.05)";

        requestAnimationFrame(() => {
            testScreen.style.transition = "all 0.6s ease";
            testScreen.style.opacity = "1";
            testScreen.style.transform = "scale(1)";
        });

        bgMusic.volume = 0.25;
        bgMusic.play().catch(() => {});

        loadQuestion();

        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
    }, 400);
}

/* =========================
   TIMER (SMOOTH + CLEAN)
========================= */
function startTimer() {
    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            showResult();
            return;
        }

        time--;

        const m = Math.floor(time / 60);
        const s = time % 60;

        const timerEl = document.getElementById("timer");
        timerEl.innerText = `${m}:${s < 10 ? "0" + s : s}`;

        if (time < 30) {
            timerEl.style.color = "#ff4d4d";
            timerEl.style.transform = "scale(1.1)";
        } else {
            timerEl.style.color = "#fff";
            timerEl.style.transform = "scale(1)";
        }

    }, 1000);
}

/* =========================
   LOAD QUESTION (SMOOTH FADE)
========================= */
function loadQuestion() {
    selected = null;

    const q = questions[current];

    const qBox = document.getElementById("questionBox");
    const optBox = document.getElementById("options");

    qBox.style.opacity = "0";
    optBox.style.opacity = "0";

    setTimeout(() => {
        document.getElementById("qNum").innerText = current + 1;
        qBox.innerText = q.q;

        optBox.innerHTML = "";

        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.innerText = opt;
            btn.classList.add("option-btn");

            btn.onclick = () => selectOption(btn, opt);

            optBox.appendChild(btn);
        });

        qBox.style.transition = "0.4s";
        optBox.style.transition = "0.4s";

        qBox.style.opacity = "1";
        optBox.style.opacity = "1";

    }, 200);
}

/* =========================
   OPTION SELECT (CLEAN UX)
========================= */
function selectOption(btn, opt) {
    selected = opt;

    document.querySelectorAll("#options button").forEach(b => {
        b.classList.remove("selected");
    });

    btn.classList.add("selected");
}

/* =========================
   NEXT QUESTION (FIXED LOGIC)
========================= */
function nextQuestion() {
    if (!selected) {
        shakeButton();
        return;
    }

    answers.push({
        question: questions[current].q,
        answer: selected
    });

    current++;

    updateProgress();

    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* PROGRESS BAR */
function updateProgress() {
    const progress = document.getElementById("progressBar");
    progress.style.width = `${(current / questions.length) * 100}%`;
}

/* =========================
   ERROR FEEDBACK (SHAKE)
========================= */
function shakeButton() {
    const btn = document.getElementById("nextBtn");
    btn.classList.add("shake");

    setTimeout(() => {
        btn.classList.remove("shake");
    }, 400);
}

/* =========================
   RESULT SCREEN (CINEMATIC)
========================= */
function showResult() {
    clearInterval(timerInterval);

    document.getElementById("testScreen").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("testScreen").style.display = "none";
        document.getElementById("resultScreen").style.display = "block";

        const score = 80 + Math.floor(Math.random() * 10);

        document.getElementById("score").innerHTML =
            `<h2>Overall Score: ${score}/90</h2>`;

        document.getElementById("loading").innerText =
            "Analyzing response patterns...";

        setTimeout(showMessage, 2500);
    }, 400);
}

/* =========================
   FINAL MESSAGE (TYPEWRITER)
========================= */
function showMessage() {
    document.getElementById("loading").style.display = "none";

    const msg = `
Kadhi kadhi vatta ki aapan khup door aahot...

Pan mara dil ma tu roj astos ❤️

Aapan veglya bhashat bolto...

Pan feelings same aahet ❤️

Distance khup ahe...
Pan connection majboot aahe.

He test grammar sathi navhta...

He fakt ek excuse hota...

Tula kahi sangaycha hota...

Tu khup special aahes ❤️
`;

    typeWriter(msg);
}

/* TYPEWRITER (SMOOTH + PROFESSIONAL) */
function typeWriter(text) {
    let i = 0;
    const el = document.getElementById("finalMessage");
    el.innerHTML = "";

    const interval = setInterval(() => {
        el.innerHTML += text.charAt(i);
        i++;

        if (i >= text.length) {
            clearInterval(interval);
        }
    }, 28);
}
