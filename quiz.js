let currentSubject = "";
let currentQuestion = null;
let currentDifficulty = "easy";
let questionCount = 0;
let correctCount = 0;
let usedQuestions = [];
let quizTopicStats = {};
let questionAnswered = false;
let quizQuestionOrder = [];

const MAX_QUESTIONS = 5;


function startQuiz() {

    currentSubject = document.getElementById("subject-select").value;
    currentDifficulty = "easy";
    questionCount = 0;
    correctCount = 0;
    usedQuestions = [];
    quizTopicStats = {};
    quizQuestionOrder = getRandomQuizQuestions(currentSubject, MAX_QUESTIONS);

    document.getElementById("quiz-start").classList.add("hidden");
    document.getElementById("quiz-result").classList.add("hidden");
    document.getElementById("quiz-area").classList.remove("hidden");

    displayQuestion();
}


function displayQuestion() {

    questionAnswered = false;

    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("answer-feedback").textContent = "";
    document.getElementById("next-btn").textContent = "Next Question";

    currentQuestion = quizQuestionOrder[questionCount];

    if (!currentQuestion) {
        finishQuiz();
        return;
    }

    usedQuestions.push(currentQuestion);
    questionCount++;

    document.getElementById("question-number").textContent =
        `Question ${questionCount}/${MAX_QUESTIONS}`;

    document.getElementById("difficulty-level").textContent =
        `Difficulty: ${currentQuestion.difficulty.toUpperCase()}`;

    document.getElementById("quiz-score").textContent =
        `Score: ${correctCount}`;

    document.getElementById("question-text").textContent =
        currentQuestion.question;

    const progress = ((questionCount - 1) / MAX_QUESTIONS) * 100;

    document.getElementById("quiz-progress").style.width =
        `${progress}%`;

    const container = document.getElementById("options-container");

    container.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option-btn";

        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        container.appendChild(button);

    });
}


function checkAnswer(selectedIndex) {

    if (questionAnswered) {
        return;
    }

    questionAnswered = true;

    const isCorrect = selectedIndex === currentQuestion.answer;

    const topic = currentQuestion.topic;

    if (!quizTopicStats[topic]) {
        quizTopicStats[topic] = {
            correct: 0,
            total: 0
        };
    }

    quizTopicStats[topic].total++;

    if (isCorrect) {

        correctCount++;

        quizTopicStats[topic].correct++;

    }

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === currentQuestion.answer) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && !isCorrect) {
            button.classList.add("wrong");
        }

    });

    const feedback = document.getElementById("answer-feedback");

    if (isCorrect) {
        feedback.textContent = "Correct answer!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Incorrect answer. Review this topic.";
        feedback.style.color = "red";
    }

    currentDifficulty = adjustDifficulty(
        currentQuestion.difficulty,
        isCorrect
    );

    document.getElementById("quiz-score").textContent =
        `Score: ${correctCount}`;

    document.getElementById("next-btn").classList.remove("hidden");

    if (questionCount >= MAX_QUESTIONS) {
        document.getElementById("next-btn").textContent = "Finish Quiz";
    } else {
        document.getElementById("next-btn").textContent = "Next Question";
    }
}


function nextQuestion() {

    if (!questionAnswered) {
        return;
    }

    if (questionCount >= MAX_QUESTIONS) {
        finishQuiz();
    } else {
        displayQuestion();
    }
}


function finishQuiz() {

    document.getElementById("quiz-area").classList.add("hidden");
    document.getElementById("quiz-result").classList.remove("hidden");

    document.getElementById("quiz-progress").style.width = "100%";

    const percentage = questionCount > 0
        ? Math.round((correctCount / questionCount) * 100)
        : 0;

    document.getElementById("final-score").textContent =
        `${percentage}%`;

    let message = "";

    if (percentage >= 80) {
        message = "Excellent! You have strong knowledge of this subject.";
    } else if (percentage >= 50) {
        message = "Good effort! Keep practicing to improve.";
    } else {
        message = "You need more practice. Follow your learning roadmap.";
    }

    document.getElementById("result-message").textContent = message;

    // Update application data.

    appData.totalQuizzes++;

    appData.totalQuestions += questionCount;

    appData.totalCorrect += correctCount;

    appData.points += correctCount * 10;

    appData.subjectResults[currentSubject] = {
        score: percentage,
        correct: correctCount,
        total: questionCount,
        topics: structuredClone(quizTopicStats)
    };

    updateDashboard();
    updateRoadmap();
    updateAchievements();
}


function restartQuiz() {

    document.getElementById("quiz-result").classList.add("hidden");
    document.getElementById("quiz-start").classList.remove("hidden");

}