document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startQuizBtn");
  const nextBtn = document.getElementById("quiz-game-next");
  const restartBtn = document.getElementById("restart-btn");

  // Start quiz: Redirect to quiz page
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      window.location.href = "quiz-page.html";
    });
  }

  // List of quiz questions, options, correct answer index, and image
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
      options: ["William Shakespeare", "F.Scott Fitzgearld", "J.K Rowling", "Maya Angelou"],
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

  // Quiz state variables
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 300; // in seconds (5 minutes)
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
    optsEl.classList.remove("answered");
    answerEl.textContent = "";

    imgEl.src = questions[currentQuestion].image;
    imgEl.className = "img-fluid";
    wrapEl.className = "d-flex justify-content-center mb-4";

    // Dynamically create answer buttons
    questions[currentQuestion].options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.type = "button";
      btn.className = "btn btn-outline-primary m-1 m-sm-3 m-md-4 w-100";
      btn.onclick = () => checkAnswer(idx); // Attach click handler
      optsEl.appendChild(btn);
    });

    // Disable 'Next' until an answer is selected
    if (nextBtn) nextBtn.disabled = true;
  }

  /**
   * Evaluates the selected answer and provides visual feedback.
   * Prevents further clicks and highlights the correct answer.
   */
  function checkAnswer(selected) {
    const optsEl = document.getElementById("options");
    if (optsEl.classList.contains("answered")) return; // Prevent double-click scoring

    const correctIndex = questions[currentQuestion].answer;
    const buttons = optsEl.querySelectorAll("button");

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.classList.remove("btn-outline-primary");

      // Visual feedback for correct/incorrect options
      if (idx === correctIndex) {
        btn.classList.add("btn-success"); // correct
      } else if (idx === selected) {
        btn.classList.add("btn-danger"); // incorrect
      }
    });

    // Update score if correct
    if (selected === correctIndex) {
      score++;
    }

    optsEl.classList.add("answered");
    if (nextBtn) nextBtn.disabled = false;
  }

  /**
   * Loads the next question or ends the quiz if finished.
   */
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }

  /**
   * Displays final score and feedback message.
   */
  function finishQuiz() {
    const qEl = document.getElementById("question");
    const optsEl = document.getElementById("options");
    const answerEl = document.getElementById("answer");
    const imgEl = document.getElementById("game-image");
    const timerEl = document.getElementById("timer");

    if (timerEl) {
      timerEl.style.display = "none";
      clearInterval(timerInterval);
    }

    if (qEl) {
      qEl.textContent = "QUIZ COMPLETE";
      qEl.classList.add("quiz-complete");
    }

    if (optsEl) optsEl.innerHTML = "";

    // Final message based on score
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

  /**
   * Starts the countdown timer and updates the display.
   * Ends the quiz automatically when time runs out.
   */
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

  /**
   * Displays a Game Over screen if time runs out.
   */
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

  // Attach click events
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
  if (restartBtn) restartBtn.addEventListener("click", () => location.reload());

  // Initialize quiz only if quiz page is loaded
  if (document.getElementById("question")) {
    loadQuestion();
    if (restartBtn) restartBtn.style.display = "none";
    startTimer();
  }
});

/**
 * Sends contact form data using EmailJS
 */
function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_fx2jpja", "template_a85tgbd", parms)
    .then(() => alert("Email Sent!"))
    .catch(error => console.error("EmailJS error:", error));
}









