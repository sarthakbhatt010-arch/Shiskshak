function renderQuestionBank() {
    const select = document.getElementById("question-bank-subject");
    const listContainer = document.getElementById("question-bank-list");

    if (!select || !listContainer) {
        return;
    }

    const subject = select.value;
    const questions = questionBank[subject] || [];

    listContainer.innerHTML = "";

    if (questions.length === 0) {
        listContainer.innerHTML = "<p>No questions available for this subject yet.</p>";
        return;
    }

    questions.forEach((questionItem, index) => {
        const card = document.createElement("article");
        card.className = "question-bank-item";

        const header = document.createElement("div");
        header.className = "question-bank-header";

        const number = document.createElement("span");
        number.className = "question-bank-number";
        number.textContent = `Question ${index + 1}`;

        const meta = document.createElement("div");
        meta.className = "question-bank-meta";

        const topic = document.createElement("span");
        topic.className = "question-bank-topic";
        topic.textContent = questionItem.topic;

        const difficulty = document.createElement("span");
        difficulty.className = "question-bank-difficulty";
        difficulty.textContent = questionItem.difficulty.toUpperCase();

        meta.appendChild(topic);
        meta.appendChild(difficulty);

        header.appendChild(number);
        header.appendChild(meta);

        const question = document.createElement("p");
        question.className = "question-bank-question";
        question.textContent = `${index + 1}. ${questionItem.question}`;

        const options = document.createElement("ol");
        options.className = "question-bank-options";

        questionItem.options.forEach((option, optionIndex) => {
            const listItem = document.createElement("li");
            const isCorrect = optionIndex === questionItem.answer;
            listItem.textContent = option;
            listItem.style.color = isCorrect ? "var(--primary)" : "var(--muted)";
            options.appendChild(listItem);
        });

        const answer = document.createElement("p");
        answer.className = "question-bank-answer";
        answer.textContent = `Correct answer: ${questionItem.options[questionItem.answer]}`;

        card.appendChild(header);
        card.appendChild(question);
        card.appendChild(options);
        card.appendChild(answer);

        listContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const subjectSelector = document.getElementById("question-bank-subject");

    if (subjectSelector) {
        subjectSelector.addEventListener("change", renderQuestionBank);
    }

    renderQuestionBank();
});
