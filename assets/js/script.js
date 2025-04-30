const startBtn = document.getElementById("startQuizBtn");
if (startBtn) {
  startBtn.addEventListener("click", function () {
    window.location.href = "quiz-page.html";
  });
}

const questions = [
  {
    question: "What is the capital of France?",
    image: "assets/images/france-flag.jpg",
    options: ["London", "Paris", "Rome", "Berlin"],
    answer: 1
  },
  {
    question: "What is the largest planet?",
    image: "assets/images/planets.jpg",
    options: ["Earth", "Jupiter", "Mercury", "Venus"],
    answer: 1
  },
  {
    question: "Who wrote Romeo and Juliet?",
    image: "assets/images/stage-play.jpg",
    options: ["William Shakespeare", "F.Scott Fitzgearld", "J.K Rowling", "Maya Angelou"],
    answer: 0
  },
  {
    question: "What is the chemical symbol for water?",
    image: "assets/images/chemicals.jpg",
    options: ["AU", "Li", "H2O", "Mg"],
    answer: 2
  },
  {
    question: "Which country is famous for inventing pizza?",
    image: "assets/images/chemicals.jpg",
    options: ["France", "England", "Mexico", "Italy"],
    answer: 3
  },
  {
    question: "What is the square root of 64?",
    image: "assets/images/maths.jpg",
    options: ["8", "16", "-23", "5"],
    answer: 0
  },
  {
    question: "What does NASA stand for?",
    image: "assets/images/nasa.jpg",
    options: ["National Aeronautics and Space Administration", "North American Space Agency", "National Association of Space Astronauts", "New Aeronautics and Space Association"],
    answer: 0
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    image: "assets/images/jungle.jpg",
    options: ["Cheater", "Snake", "Lion", "Elephant"],
    answer: 2
  },
  {
    question: "What is the longest river in the world",
    image: "assets/images/river.jpg",
    options: ["River Nile", "River Thames", "Amazon River", "Yangtze River"],
    answer: 0
  },
  {
    question: "How many sides does a hexagon have?",
    image: "assets/images/shapes.jpg",
    options: ["10", "6", "7", "9"],
    answer: 1
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10; // Set to 10 seconds instead of 300 (5 minutes)
let timerInterval;

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const imageTargetEl = document.getElementById("game-image");
  const answerEl = document.getElementById("answer");

  optionsEl.innerHTML = "";
  answerEl.textContent = "";

  const current = questions[currentQuestion];
  questionEl.textContent = current.question;

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    imageTargetEl.setAttribute("src",questions[currentQuestion].image)
    btn.textContent = option;
    btn.className = "btn btn-outline-primary m-1";
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  document.getElementById("quiz-game-next").disabled = true;
}

function checkAnswer(selectedIndex) {
  const answerEl = document.getElementById("answer");
  if (selectedIndex === questions[currentQuestion].answer) {
    score++;
    answerEl.textContent = "";
  } else {
    answerEl.textContent = "";
  }

  document.getElementById("quiz-game-next").disabled = false;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval); // Stop the timer if quiz ends early
    document.getElementById("question").textContent = "Quiz Complete!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("answer").textContent = `Your score: ${score} / ${questions.length}`;
    document.getElementById("quiz-game-next").style.display = "none";
    document.getElementById("restart-btn").style.display = "inline-block";
  }
}

document.getElementById("restart-btn").addEventListener("click", function () {
  location.reload();
});

function startTimer() {
  const timerDisplay = document.getElementById("timer");
  const gameOverDisplay = document.getElementById("gameOver");

  function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent =
      (minutes < 10 ? "0" : "") + minutes + ":" +
      (seconds < 10 ? "0" : "") + seconds;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.style.display = "none";
      gameOverDisplay.style.display = "block";
      endQuizEarly();
    }

    timeLeft--;
  }

  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function endQuizEarly() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  questionEl.textContent = "Game Over!";
  questionEl.classList.add("games-over");
  document.getElementById("answer").textContent = `Your score: ${score} / ${questions.length}`;
  document.getElementById("quiz-game-next").style.display = "none";
  document.getElementById("restart-btn").style.display = "inline-block";
}

window.onload = () => {
  loadQuestion();
  document.getElementById("restart-btn").style.display = "none";
  startTimer(); // Start countdown
};









