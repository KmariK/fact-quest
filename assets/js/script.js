

const startBtn = document.getElementById("startQuizBtn");
if (startBtn) {
  startBtn.addEventListener("click", function() {
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
    //image: "assets/images/planets.jpg",
    options: ["Earth", "Jupiter", "Mercury", "Venus"],
    answer: 1
  },
  {
    question: "Who wrote Romeo and Juliet?",
    options: ["William Shakespeare", "F.Scott Fitzgearld", "J.K Rowling", "Maya Angelou"],
    answer: 0
  }, 
  {
    question: "What is the chemical symbol for water?", 
    options: ["AU", "Li", "H2O", "Mg"], 
    answer: 2
  },
  {
    question: "Which country is famous for inventing pizza?", 
    options: ["France", "England", "Mexico", "Italy"], 
    answer: 3
  },
  {
    question: "What is the square root of 64?", 
    options: ["8", "16", "-23", "5"], 
    answer: 0
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?", 
    options: ["Cheater", "Snake", "Lion", "Elephant"], 
    answer: 2
  },
  {
    question: "What is the longest river in the world", 
    options: ["River Nile", "River Thames", "Amazon River", "Yangtze River"], 
    answer: 0
  },
  {
    question: "How many sides does a hexagon have?", 
    options: ["10", "6", "7", "9"], 
    answer: 1
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const answerEl = document.getElementById("answer");

  // Clear previous options and answers
  optionsEl.innerHTML = "";
  answerEl.textContent = "";

  const current = questions[currentQuestion];

  questionEl.textContent = current.question;

  // Create option buttons
  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "btn btn-outline-primary m-1"; // Optional: Bootstrap style
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });

  // Disable "Next" button until an answer is selected
  document.getElementById("quiz-game-next").disabled = true;
}

// Check the selected answer
function checkAnswer(selectedIndex) {
  const answerEl = document.getElementById("answer");
  if (selectedIndex === questions[currentQuestion].answer) {
    score++;
    answerEl.textContent = "";
  } else {
    answerEl.textContent = "";
  }

  // Enable the "Next" button after answering
  document.getElementById("quiz-game-next").disabled = false;
}

function nextQuestion() {
  currentQuestion++;

  // If there are more questions, load the next one
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // End the quiz and show the result
    document.getElementById("question").textContent = "Quiz complete!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("answer").textContent = `Your score: ${score} / ${questions.length}`;
    
    // Hide the Next button
    document.getElementById("quiz-game-next").style.display = "none";
  
    // Show the Restart button
    document.getElementById("restart-btn").style.display = "inline-block";
  }  
}

document.getElementById("restart-btn").addEventListener("click", function () {
  // Reload the page to reset everything
  location.reload();
});



  

window.onload = () => {
  loadQuestion();
  document.getElementById("restart-btn").style.display = "none"; // Hide restart button initially
};



//function showResult()

