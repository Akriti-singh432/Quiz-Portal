const questions = [
    {
        q: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        ans: 0
    },
    {
        q: "Which tag is used for a paragraph?",
        options: ["<p>", "<para>", "<paragraph>", "<pg>"],
        ans: 0
    },
    {
        q: "CSS stands for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        ans: 2
    }
];

let currentQ = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 30;

const qNum = document.getElementById('q-num');
const qTotal = document.getElementById('q-total');
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.options');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const timerEl = document.getElementById('timer');

qTotal.innerText = questions.length;

function loadQuestion() {
    clearInterval(timer);

    timeLeft = 30;
    timerEl.innerText = `⏱️ Time: ${timeLeft}s`;

    startTimer();

    const q = questions[currentQ];

    qNum.innerText = currentQ + 1;
    questionEl.innerText = q.q;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');

        btn.innerText = opt;
        btn.classList.add('option-btn');

        btn.onclick = () => selectOption(btn, index);

        optionsEl.appendChild(btn);
    });

    prevBtn.disabled = currentQ === 0;

    nextBtn.innerText =
        currentQ === questions.length - 1
            ? "Submit"
            : "Next →";
}

function selectOption(btn, index) {
    document.querySelectorAll('.option-btn')
        .forEach(b => b.classList.remove('selected'));

    btn.classList.add('selected');

    selectedOption = index;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;

        timerEl.innerText = `⏱️ Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {

    if (selectedOption === questions[currentQ].ans) {
        score++;
    }

    selectedOption = null;
    currentQ++;

    if (currentQ < questions.length) {
        loadQuestion();
    } else {

        clearInterval(timer);

        alert(
            `Quiz Finished! Your Score: ${score}/${questions.length}`
        );

        window.location.href = "Dashboard.html";
    }
}

nextBtn.onclick = nextQuestion;

prevBtn.onclick = () => {
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
};

loadQuestion();
