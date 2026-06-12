let current = 0;
let answers = [];
let time = 300;

function startTest() {
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("testScreen").classList.remove("hidden");
document.getElementById("bgMusic").play();

loadQuestion();
timer();
}

function timer() {
let t = setInterval(() => {
let m = Math.floor(time / 60);
let s = time % 60;
document.getElementById("timer").innerText = `${m}:${s}`;
time--;

if(time < 0) {
clearInterval(t);
showResult();
}
},1000);
}

function loadQuestion() {
let q = questions[current];
document.getElementById("qNum").innerText = current + 1;

document.getElementById("questionBox").innerText = q.q;

let optBox = document.getElementById("options");
optBox.innerHTML = "";

q.options.forEach(opt => {
let btn = document.createElement("button");
btn.innerText = opt;
btn.onclick = () => selectAnswer(opt);
optBox.appendChild(btn);
});
}

function selectAnswer(opt) {
answers.push(questions[current].map[opt]);
}

function nextQuestion() {
current++;

document.getElementById("progressBar").style.width =
((current)/questions.length)*100 + "%";

if(current < questions.length) {
loadQuestion();
} else {
showResult();
}
}

function showResult() {
document.getElementById("testScreen").classList.add("hidden");
document.getElementById("resultScreen").classList.remove("hidden");

let score = Math.floor(80 + Math.random()*10);

document.getElementById("score").innerText =
`Overall Score: ${score}/90`;

document.getElementById("loading").innerText =
"Analyzing language patterns...";

setTimeout(showMessage, 3000);
}

function showMessage() {

let msg = `
Kadhi kadhi vatta ki aapan khup door aahot...

Pan mara dil ma tu roj astos.

Aapan veglya bhashat bolto...
Gujarati + Marathi mix aahe,

Pan feelings same aahet.

Distance khup ahe...

Pan connection strong aahe ❤️

Ha test grammar sathi navhta...

Ha bas ek excuse hoto...

Tula sangaycha hota...

Tu khup special aahes ❤️
`;

typeWriter(msg);
}

function typeWriter(text) {
let i = 0;
let el = document.getElementById("finalMessage");

let interval = setInterval(() => {
el.innerHTML += text[i];
i++;
if(i >= text.length) clearInterval(interval);
},50);
}
