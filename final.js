
const appData = {

    totalQuizzes: 0,

    totalQuestions: 0,

    totalCorrect: 0,

    points: 0,

    subjectResults: {}

};



function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        return;
    }

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "dashboard") {
        updateDashboard();
    }

    if (pageId === "roadmap") {
        updateRoadmap();
    }

    if (pageId === "achievements") {
        updateAchievements();
    }

}



document.addEventListener("DOMContentLoaded", function () {

    showPage("home");

    updateDashboard();

    updateRoadmap();

    updateAchievements();

    console.log("EduMind initialized successfully.");

});