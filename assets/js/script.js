document.getElementById("startQuizBtn").addEventListener("click", function() {
window.location.href = "quiz-page.html";
});


const questions = [ 
{
    question: "What is the capital of France?", 
    options: ["London", "Paris", "Rome", "Berlin"],
    answer: 1
}, 
{
    question: "What is the largest planet?", 
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

    answerEl.textContent = ""; // Clear previous result
  const current = questions[currentQuestion];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((options, index) => {
    const btn = document.createElement("button");
    btn.textContent = options;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}
  
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = "Quiz complete!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("quizForm").style.display = "none";
        document.getElementById("result").textContent = "";
    }
}

function showResult()

window.onload = () => {
    loadQuestion();
};
