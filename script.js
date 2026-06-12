let current = 0;
let answers = [];
let selected = null;

function startTest() {
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("testScreen").classList.remove("hidden");

document.getElementById("bgMusic").volume = 0.4;
document.getElementById("bgMusic").play();

loadQuestion();
startTimer();
}

let time = 300;

function startTimer() {
let t = setInterval(() => {
if (time <= 0) {
clearInterval(t);
showResult();
return;
}

let m = Math.floor(time / 60);
let s = time % 60;
document.getElementById("timer").innerText =
`${m}:${s < 10 ? "0" + s : s}`;

time--;
}, 1000);
}

function loadQuestion() {
selected = null;

let q = questions[current];
document.getElementById("qNum").innerText = current + 1;

document.getElementById("questionBox").innerText = q.q;

let optBox = document.getElementById("options");
optBox.innerHTML = "";

q.options.forEach(opt => {
let btn = document.createElement("button");
btn.innerText = opt;

btn.onclick = () => {
selected = opt;

// highlight selection
document.querySelectorAll("#options button")
.forEach(b => b.style.background = "");

btn.style.background = "#4CAF50";
};

optBox.appendChild(btn);
});
}

function nextQuestion() {
if (!selected) {
alert("Please select an answer");
return;
}

answers.push(questions[current].map[selected]);

current++;

let progress = (current / questions.length) * 100;
document.getElementById("progressBar").style.width = progress + "%";

if (current < questions.length) {
loadQuestion();
} else {
showResult();
}
}

function showResult() {
document.getElementById("testScreen").classList.add("hidden");
document.getElementById("resultScreen").classList.remove("hidden");

let score = 82 + Math.floor(Math.random() * 8);

document.getElementById("score").innerHTML =
`<h3>Overall Score: ${score}/90</h3>`;

setTimeout(() => {
document.getElementById("loading").style.display = "none";
showMessage();
}, 2500);
}

/* ✨ CINEMATIC MESSAGE SYSTEM */
function showMessage() {
let msg = `
Kadhi kadhi vatta ki aapan khup door aahot...

Pan mara dil ma tu roj astos.

Aapan veglya bhashat bolto...

Pan feelings same aahet ❤️

Distance khup ahe...
Pan connection strong aahe.

He test grammar sathi navhta...

He fakt ek excuse hota...

Tula sangaycha hota...

Tu khup special aahes ❤️
`;

typeWriter(msg);
}

function typeWriter(text) {
let i = 0;
let el = document.getElementById("finalMessage");

el.innerHTML = "";

let interval = setInterval(() => {
el.innerHTML += text.charAt(i);
i++;

if (i >= text.length) {
clearInterval(interval);

// fade-in glow effect
el.style.textShadow = "0 0 15px #ff4d6d";
}
}, 35);
}
