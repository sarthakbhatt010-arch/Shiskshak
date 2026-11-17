const badges = [

    {
        name: "First Step",
        description: "Complete your first quiz",
        condition: () => appData.totalQuizzes >= 1
    },

    {
        name: "Quiz Explorer",
        description: "Complete 3 quizzes",
        condition: () => appData.totalQuizzes >= 3
    },

    {
        name: "Knowledge Seeker",
        description: "Earn 100 points",
        condition: () => appData.points >= 100
    },

    {
        name: "Learning Champion",
        description: "Earn 250 points",
        condition: () => appData.points >= 250
    },

    {
        name: "EduMind Master",
        description: "Earn 500 points",
        condition: () => appData.points >= 500
    }

];


function updateAchievements() {

    document.getElementById("achievement-points").textContent =
        appData.points;

    document.getElementById("achievement-level").textContent =
        getLearningLevel(appData.points);

    const container = document.getElementById("badges-container");

    container.innerHTML = "";

    badges.forEach(badge => {

        const unlocked = badge.condition();

        const card = document.createElement("div");

        card.className =
            `card ${unlocked ? "badge-unlocked" : "badge-locked"}`;

        const title = document.createElement("h3");

        title.textContent = badge.name;

        const description = document.createElement("p");

        description.textContent = badge.description;

        const status = document.createElement("p");

        status.textContent = unlocked
            ? "Unlocked"
            : "Locked";

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(status);

        container.appendChild(card);

    });
}