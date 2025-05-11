document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startQuizBtn");
  const nextBtn = document.getElementById("quiz-game-next");
  const restartBtn = document.getElementById("restart-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
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
      image: "assets/images/pizza.jpg",
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
      options: [
        "National Aeronautics and Space Administration",
        "North American Space Agency",
        "National Association of Space Astronauts",
        "New Aeronautics and Space Association"
      ],
      answer: 0
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      image: "assets/images/jungle.jpg",
      options: ["Cheater", "Snake", "Lion", "Elephant"],
      answer: 2
    },
    {
      question: "What is the longest river in the world?",
      image: "assets/images/river.jpg",
      options: ["River Nile", "River Thames", "Amazon River", "Yangtze River"],
      answer: 0
    },
    {
      question: "How many sides does a hexagon have?",
      image: "assets/images/shapes.jpg",
      options: ["10", "6", "7", "9"],
      answer: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 300; // Updated from 10 to 300 seconds (5 minutes)
  let timerInterval;

  function loadQuestion() {
    const qEl = document.getElementById("question");
    const optsEl = document.getElementById("options");
    const imgEl = document.getElementById("game-image");
    const wrapEl = document.getElementById("image-wrapper");
    const answerEl = document.getElementById("answer");

    if (!qEl || !optsEl || !imgEl || !wrapEl || !answerEl) return;

    qEl.textContent = questions[currentQuestion].question;
    optsEl.innerHTML = "";
    answerEl.textContent = "";

    imgEl.src = questions[currentQuestion].image;
    imgEl.removeAttribute("style");
    imgEl.className = "img-fluid";

    wrapEl.className = "d-flex justify-content-center mb-4";

    questions[currentQuestion].options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.type = "button";
      btn.className = "btn btn-outline-primary m-1 m-sm-3 m-md-4 w-100";
      btn.onclick = () => checkAnswer(idx);
      optsEl.appendChild(btn);
    });

    if (nextBtn) nextBtn.disabled = true;
  }

  function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
      score++;
    }
    if (nextBtn) nextBtn.disabled = false;
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }

  function finishQuiz() {
    const qEl = document.getElementById("question");
    const optsEl = document.getElementById("options");
    const answerEl = document.getElementById("answer");
    const imgEl = document.getElementById("game-image");
    const timerEl = document.getElementById("timer");
  
    // Stop and hide timer
    if (timerEl) {
      timerEl.style.display = "none";
      clearInterval(timerInterval);
    }
  
    // Final quiz message
    if (qEl) {
      qEl.textContent = "Quiz Complete!";
      qEl.classList.add("quiz-complete");
    }
  
    if (optsEl) optsEl.innerHTML = "";
  
    if (answerEl) {
      answerEl.classList.add("quiz-complete-answer");
  
      if (score >= 7) {
        answerEl.style.color = "green";
        answerEl.innerHTML = `
          <img src="assets/images/thumbs-up.jpg" alt="Thumbs Up" style="width: 300px; margin-bottom: 10px;"><br>
          Your score: ${score} / ${questions.length}
        `;
      } else {
        answerEl.style.color = "red";
        answerEl.innerHTML = `
          <img src="assets/images/thumbs-down.jpg" alt="Thumbs Down" style="width: 300px; margin-bottom: 10px;"><br>
          Your score: ${score} / ${questions.length}
        `;
      }
    }
  
    if (nextBtn) nextBtn.style.display = "none";
    if (restartBtn) restartBtn.style.display = "inline-block";
    if (imgEl) imgEl.style.display = "none";
  }
  
  

  function startTimer() {
    const timerDisplay = document.getElementById("timer");
    if (!timerDisplay) return;

    timerInterval = setInterval(() => {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      timerDisplay.textContent =
        (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

      if (timeLeft-- <= 0) {
        clearInterval(timerInterval);
        timerDisplay.style.display = "none";
        endQuizEarly();
      }
    }, 1000);
  }

  function endQuizEarly() {
    ["question", "options", "answer", "game-image", "quiz-game-next"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    const over = document.getElementById("gameOver");
    if (over) {
      over.innerHTML = `
        <h1 class="game-over">GAME OVER!</h1>
        <img src="assets/images/game-over.jpg"
             class="img-fluid d-block mx-auto my-4"
             style="width:50%;"
             alt="Game Over">
        <p>Your score: ${score} / ${questions.length}</p>
      `;
      over.style.display = "block";
    }

    if (restartBtn) restartBtn.style.display = "inline-block";
  }

  // Attach event listeners if elements exist
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
  if (restartBtn) restartBtn.addEventListener("click", () => location.reload());

  // Initialize quiz if quiz page elements are present
  if (document.getElementById("question")) {
    loadQuestion();
    if (restartBtn) restartBtn.style.display = "none";
    startTimer();
  }
});







