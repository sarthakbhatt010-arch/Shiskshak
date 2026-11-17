function getLearningLevel(points) {

    if (points >= 300) {
        return "Expert";
    }

    if (points >= 150) {
        return "Advanced";
    }

    if (points >= 50) {
        return "Intermediate";
    }

    return "Beginner";
}


function updateDashboard() {

    document.getElementById("total-quizzes").textContent =
        appData.totalQuizzes;

    const accuracy = appData.totalQuestions > 0
        ? Math.round(
            (appData.totalCorrect / appData.totalQuestions) * 100
        )
        : 0;

    document.getElementById("average-score").textContent =
        `${accuracy}%`;

    document.getElementById("total-points").textContent =
        appData.points;

    document.getElementById("learning-level").textContent =
        getLearningLevel(appData.points);

    const performanceContainer =
        document.getElementById("subject-performance");

    performanceContainer.innerHTML = "";

    const recommendationsContainer =
        document.getElementById("dashboard-recommendations");

    recommendationsContainer.innerHTML = "";

    const subjects = Object.keys(appData.subjectResults);

    if (subjects.length === 0) {

        performanceContainer.textContent =
            "Complete a quiz to view your performance.";

        recommendationsContainer.textContent =
            "Your recommendations will appear after your first quiz.";

        return;
    }

    subjects.forEach(subject => {

        const result = appData.subjectResults[subject];

        const card = document.createElement("div");

        card.className = "performance-item";

        const title = document.createElement("h3");

        title.textContent =
            `${subject.toUpperCase()} — ${result.score}%`;

        const track = document.createElement("div");

        track.className = "performance-track";

        const fill = document.createElement("div");

        fill.className = "performance-fill";

        fill.style.width = `${result.score}%`;

        track.appendChild(fill);

        card.appendChild(title);
        card.appendChild(track);

        performanceContainer.appendChild(card);

        const recommendation = document.createElement("p");

        if (result.score < 40) {

            recommendation.textContent =
                `${subject.toUpperCase()}: Revise fundamental concepts.`;

        } else if (result.score < 70) {

            recommendation.textContent =
                `${subject.toUpperCase()}: Practice intermediate questions.`;

        } else {

            recommendation.textContent =
                `${subject.toUpperCase()}: Attempt advanced topics.`;

        }

        recommendationsContainer.appendChild(recommendation);

    });
}


function updateRoadmap() {

    const container = document.getElementById("roadmap-container");

    container.innerHTML = "";

    const subjects = Object.keys(appData.subjectResults);

    if (subjects.length === 0) {

        container.textContent =
            "Complete a quiz to generate your personalized roadmap.";

        return;
    }

    subjects.forEach(subject => {

        const result = appData.subjectResults[subject];

        const card = document.createElement("div");

        card.className = "roadmap-card";

        const title = document.createElement("h3");

        title.textContent = subject.toUpperCase();

        card.appendChild(title);

        const topics = Object.entries(result.topics);

        topics.forEach(([topic, stats]) => {

            const accuracy = Math.round(
                (stats.correct / stats.total) * 100
            );

            const item = document.createElement("p");

            if (accuracy < 50) {

                item.textContent =
                    `${topic}: Revise this topic (${accuracy}%).`;

            } else if (accuracy < 80) {

                item.textContent =
                    `${topic}: Practice more questions (${accuracy}%).`;

            } else {

                item.textContent =
                    `${topic}: Good progress (${accuracy}%).`;

            }

            card.appendChild(item);

        });

        container.appendChild(card);

    });
}