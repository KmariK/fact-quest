document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startQuizBtn");
  const nextBtn = document.getElementById("quiz-game-next");
  const restartBtn = document.getElementById("restart-btn");

  if (startBtn) {
    startBtn.addEventListener("click", function() {
      window.location.href = "quiz-page.html";
    });
  }

  const questions = [
    {
      answer: 1,
      image: "assets/images/france-flag.jpg",
      options: ["London", "Paris", "Rome", "Berlin"],
      question: "What is the capital of France?"
    },
    {
      answer: 1,
      image: "assets/images/planets.jpg",
      options: ["Earth", "Jupiter", "Mercury", "Venus"],
      question: "What is the largest planet?"
    },
    {
      answer: 0,
      image: "assets/images/stage-play.jpg",
      options: ["William Shakespeare", 
        "F.Scott Fitzgearld",
        "J.K Rowling",
        "Maya Angelou"],
      question: "Who wrote Romeo and Juliet?"
    },
    {
      answer: 2,
      image: "assets/images/chemicals.jpg",
      options: ["AU", "Li", "H2O", "Mg"],
      question: "What is the chemical symbol for water?"
    },
    {
      answer: 3,
      image: "assets/images/pizza.jpg",
      options: ["France", "England", "Mexico", "Italy"],
      question: "Which country is famous for inventing pizza?"
    },
    {
      answer: 0,
      image: "assets/images/maths.jpg",
      options: ["8", "16", "-23", "5"],
      question: "What is the square root of 64?"
    },
    {
      answer: 0,
      image: "assets/images/nasa.jpg",
      options: [
        "National Aeronautics and Space Administration",
        "North American Space Agency",
        "National Association of Space Astronauts",
        "New Aeronautics and Space Association"
      ],
      question: "What does NASA stand for?"
    },
    {
      answer: 2,
      image: "assets/images/jungle.jpg",
      options: ["Cheater", "Snake", "Lion", "Elephant"],
      question: "Which animal is known as the 'King of the Jungle'?"
    },
    {
      answer: 0,
      image: "assets/images/river.jpg",
      options: ["River Nile", "River Thames", "Amazon River", "Yangtze River"],
      question: "What is the longest river in the world?"
    },
    {
      answer: 1,
      image: "assets/images/shapes.jpg",
      options: ["10", "6", "7", "9"],
      question: "How many sides does a hexagon have?"
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

    if (!qEl || !optsEl || !imgEl || !wrapEl || !answerEl) {
      return;
    }
    

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
      qEl.textContent = "";
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

// Sends form data via EmailJS and triggers an automatic reply to the user after form submission
function sendMail() {
  let parms = {
    name: document.getElementById("name").value, 
    name: document.getElementById("email").value, 
    name: document.getElementById("message").value, 
  } 
  emailjs.send("service_fx2jpja","template_a85tgbd",parms).then(alert("Email Sent!"))
}







