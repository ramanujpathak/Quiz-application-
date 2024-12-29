
const quizData = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correct: 0 },
    { question: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django"], correct: 0 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"], correct: 0 },
    { question: "What is the correct HTML element for inserting a line break?", options: ["<br>", "<lb>", "<break>"], correct: 0 },
    { question: "Which language is used for web apps?", options: ["JavaScript", "Python", "PHP"], correct: 0 },
    { question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<css>", "<script>"], correct: 0 },
    { question: "Which is used to connect to a database in PHP?", options: ["MySQLi", "Flask", "Node.js"], correct: 0 },
    { question: "Which is not a programming language?", options: ["HTML", "Python", "Java"], correct: 0 },
    { question: "Which symbol is used to target an ID in CSS?", options: ["#", ".", "*"], correct: 0 },
    { question: "What does JS stand for?", options: ["JavaScript", "Java Standard", "JustScript"], correct: 0 },
  ];
  
  // State variables
  let currentQuestion = 0;
  let score = 0;
  const skippedQuestions = [];
  
  const quizContainer = document.getElementById("quiz-container");
  const prevButton = document.getElementById("prev");
  const skipButton = document.getElementById("skip");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById("submit");
  const progressBar = document.getElementById("progress-bar");
  
  // Load Question
  function loadQuestion() {
    const questionData = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <h2>${questionData.question}</h2>
      <div class="options">
        ${questionData.options
          .map(
            (option, index) => `
            <div>
              <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
              </label>
            </div>
          `
          )
          .join("")}
      </div>
    `;
    updateProgress();
    updateButtons();
  }
  
  // Get Selected Answer
  function getSelectedAnswer() {
    const answers = document.querySelectorAll("input[name='answer']");
    for (let answer of answers) {
      if (answer.checked) {
        return parseInt(answer.value);
      }
    }
    return null;
  }
  
  // Update Progress Bar
  function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  // Update Buttons Visibility
  function updateButtons() {
    prevButton.disabled = currentQuestion === 0;
    nextButton.style.display = currentQuestion < quizData.length - 1 ? "inline-block" : "none";
    submitButton.style.display = skippedQuestions.length > 0 || currentQuestion === quizData.length - 1 ? "inline-block" : "none";
  }
  
  // Skip Question
  skipButton.addEventListener("click", () => {
    if (!skippedQuestions.includes(currentQuestion)) {
      skippedQuestions.push(currentQuestion);
    }
    navigateToNextQuestion();
  });
  
  // Navigate to Next Question
  function navigateToNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
    } else if (skippedQuestions.length > 0) {
      currentQuestion = skippedQuestions.shift();
    } else {
      showResults();
      return;
    }
    loadQuestion();
  }
  
  // Show Results
  function showResults() {
    quizContainer.innerHTML = `
      <h2>Your Score: ${score}/${quizData.length}</h2>
      <p>${score >= 7 ? "Excellent job! 🎉" : score >= 5 ? "Good effort! 👍" : "Keep practicing! 💪"}</p>
    `;
    document.getElementById("button-container").style.display = "none";
    progressBar.style.background = score >= 7 ? "#4caf50" : score >= 5 ? "#ffc107" : "#f44336";
  }
  
  // Button Events
  prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });
  
  nextButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === null) {
      alert("Please select an answer!");
      return;
    }
    if (selectedAnswer === quizData[currentQuestion].correct) {
      score++;
    }
    navigateToNextQuestion();
  });
  
  submitButton.addEventListener("click", showResults);
  
  // Initialize
  loadQuestion();
  
