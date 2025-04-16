
function toggleCard(card) {
  card.classList.toggle('expanded');
}

const quizData = [
  {
    question: "What is a strong password?",
    options: [
      { text: "12345678", correct: false },
      { text: "Your name", correct: false },
      { text: "A mix of letters, numbers & symbols", correct: true },
    ]
  },
  {
    question: "How often should you update your password?",
    options: [
      { text: "Once a decade", correct: false },
      { text: "Every few months", correct: true },
      { text: "Never", correct: false },
    ]
  },
  {
    question: "What should you do if you receive a suspicious email?",
    options: [
      { text: "Reply and ask who it is", correct: false },
      { text: "Click the link to see more", correct: false },
      { text: "Report and delete it", correct: true },
    ]
  },
  {
    question: "Which is a safe way to connect to public Wi-Fi?",
    options: [
      { text: "Without VPN", correct: false },
      { text: "With VPN", correct: true },
      { text: "With Bluetooth on", correct: false },
    ]
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, opt.correct);
    optionsContainer.appendChild(btn);
  });

  nextBtn.style.display = "none";
  retryBtn.style.display = "none";
}

function selectAnswer(button, isCorrect) {
  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
    btn.style.borderColor = "#ccc";
  });

  button.style.backgroundColor = isCorrect ? "#4CAF50" : "#f44336";
  button.style.color = "#fff";

  if (isCorrect) score++;

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionEl.textContent = `🎉 Perfect! You got ${score} out of ${quizData.length} correct!`;
questionEl.classList.add("perfect-score");

  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  retryBtn.style.display = "inline-block";

  if (score === quizData.length) {
    triggerConfetti();
  }
}


function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}


const confettiCanvas = document.createElement("canvas");
confettiCanvas.id = "confetti-canvas";
confettiCanvas.style.position = "fixed";
confettiCanvas.style.top = "0";
confettiCanvas.style.left = "0";
confettiCanvas.style.width = "100%";
confettiCanvas.style.height = "100%";
confettiCanvas.style.pointerEvents = "none";
confettiCanvas.style.zIndex = "9999";
confettiCanvas.style.background = "transparent";
document.body.appendChild(confettiCanvas);

const myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

function triggerConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    myConfetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  }, 200);
}


window.addEventListener("DOMContentLoaded", loadQuestion);


const ctx = document.getElementById('threatChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Phishing', 'Malware', 'Ransomware', 'Data Breach', 'Spyware'],
    datasets: [{
      label: 'Threat Frequency',
      data: [70, 55, 45, 30, 20],
      backgroundColor: '#2a5298'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});
