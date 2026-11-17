const subjectStudyHours = {
    html: 12,
    css: 30,
    javascript: 50
};

const studyTopics = {
    html: [
        "HTML structure and semantic elements",
        "Headings, paragraphs, and links",
        "Images, lists, and tables",
        "Forms and input types",
        "Accessibility and attributes"
    ],
    css: [
        "Selectors and the cascade",
        "Colors, typography, and units",
        "The box model and spacing",
        "Flexbox and grid layouts",
        "Responsive design"
    ],
    javascript: [
        "Variables and data types",
        "Conditions and comparisons",
        "Loops and iteration",
        "Functions and scope",
        "Arrays and common methods"
    ]
};

const STUDY_PLANS_STORAGE_KEY = "shikshak-study-plans";
const MAX_SAVED_STUDY_PLANS = 10;

document.addEventListener("DOMContentLoaded", initializeStudyPlanner);

function initializeStudyPlanner() {
    const savedPlans = document.getElementById("saved-study-plans");
    const result = document.getElementById("study-plan-result");

    if (!savedPlans || !result) {
        return;
    }

    savedPlans.addEventListener("click", handleSavedPlanAction);
    result.addEventListener("change", handleStudyProgressChange);

    try {
        const plans = readSavedStudyPlans();
        renderSavedStudyPlans(plans);
        if (plans.length > 0) {
            renderStudyPlan(plans[0], result);
        }
    } catch (error) {
        showPlannerMessage(result, "Saved plans could not be loaded from this browser.");
        console.error("Unable to load saved study plans.", error);
    }
}

function generateStudyPlan() {
    const subjectSelect = document.getElementById("study-subject");
    const daysLeftInput = document.getElementById("study-days-left");
    const hoursInput = document.getElementById("study-hours");
    const result = document.getElementById("study-plan-result");
    const savedPlansContainer = document.getElementById("saved-study-plans");

    if (!subjectSelect || !daysLeftInput || !hoursInput || !result || !savedPlansContainer) {
        throw new Error("Study planner form is missing a required element.");
    }

    result.replaceChildren();

    const daysLeft = Number(daysLeftInput.value);
    const hours = Number(hoursInput.value);

    if (!Number.isInteger(daysLeft) || daysLeft < 1 || daysLeft > 365) {
        showPlannerMessage(result, "Enter a whole number of days left before the exam (1 to 365).");
        daysLeftInput.focus();
        return;
    }

    if (!Number.isFinite(hours) || hours < 1 || hours > 12) {
        showPlannerMessage(result, "Enter study time between 1 and 12 hours per day.");
        hoursInput.focus();
        return;
    }

    const subject = subjectSelect.value;
    const subjectKey = subject.toLowerCase();
    const totalSubjectHours = subjectStudyHours[subjectKey] ?? 0;
    const requiredDays = totalSubjectHours > 0 ? Math.ceil(totalSubjectHours / hours) : 0;
    const topics = getStudyTopics(subjectKey);

    if (requiredDays === 0) {
        showPlannerMessage(result, "No study hours are configured for this subject yet.");
        return;
    }

    const planDays = Math.max(1, requiredDays);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(today);
    examDate.setDate(today.getDate() + daysLeft);

    const plan = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        subject,
        hours,
        daysLeft,
        examDate: toLocalDateString(examDate),
        requiredHours: totalSubjectHours,
        requiredDays,
        createdAt: new Date().toISOString(),
        days: createStudyDays(today, planDays, topics, hours)
    };

    try {
        const savedPlans = readSavedStudyPlans();
        const updatedPlans = [plan, ...savedPlans.filter(savedPlan => savedPlan.id !== plan.id)]
            .slice(0, MAX_SAVED_STUDY_PLANS);
        writeSavedStudyPlans(updatedPlans);
        renderSavedStudyPlans(updatedPlans);
        renderStudyPlan(plan, result);
    } catch (error) {
        showPlannerMessage(result, "The plan could not be saved in this browser. Check browser storage settings and try again.");
        console.error("Unable to save study plan.", error);
    }
}

function createStudyDays(today, count, topics, hours) {
    return Array.from({ length: count }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        const isReviewDay = index === count - 1;
        const topic = topics[index % topics.length];
        const task = isReviewDay
            ? `Review key ideas and finish with a short practice session (${hours} ${hours === 1 ? "hour" : "hours"} total).`
            : `Study for ${hours} ${hours === 1 ? "hour" : "hours"}: learn the topic, take short breaks, then practice recalling it without notes.`;

        return {
            date: toLocalDateString(date),
            topic,
            task,
            completed: false
        };
    });
}

function getStudyTopics(subject) {
    const defaults = studyTopics[subject];
    if (!defaults) {
        throw new Error(`No study topics are configured for "${subject}".`);
    }

    const result = appData.subjectResults[subject];
    if (!result || !result.topics || Object.keys(result.topics).length === 0) {
        return defaults;
    }

    const topicsByAccuracy = Object.entries(result.topics)
        .filter(([, stats]) => stats.total > 0)
        .sort(([, first], [, second]) =>
            (first.correct / first.total) - (second.correct / second.total)
        )
        .map(([topic]) => topic);

    return topicsByAccuracy.length > 0 ? topicsByAccuracy : defaults;
}

function readSavedStudyPlans() {
    const storedPlans = localStorage.getItem(STUDY_PLANS_STORAGE_KEY);
    if (!storedPlans) {
        return [];
    }

    const plans = JSON.parse(storedPlans);
    if (!Array.isArray(plans) || !plans.every(isValidStudyPlan)) {
        throw new Error("Saved study plan data is invalid.");
    }
    return plans;
}

function writeSavedStudyPlans(plans) {
    localStorage.setItem(STUDY_PLANS_STORAGE_KEY, JSON.stringify(plans));
}

function isValidStudyPlan(plan) {
    return Boolean(
        plan &&
        typeof plan.id === "string" &&
        typeof plan.subject === "string" &&
        Number.isFinite(plan.hours) &&
        (plan.examDate === undefined || typeof plan.examDate === "string") &&
        Array.isArray(plan.days) &&
        plan.days.every(day =>
            day &&
            typeof day.date === "string" &&
            typeof day.topic === "string" &&
            typeof day.task === "string" &&
            typeof day.completed === "boolean"
        )
    );
}

function renderSavedStudyPlans(plans) {
    const container = document.getElementById("saved-study-plans");
    container.replaceChildren();

    if (plans.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "saved-plans-empty";
        emptyState.textContent = "Plans you generate will be saved here on this device.";
        container.appendChild(emptyState);
        return;
    }

    plans.forEach(plan => {
        const card = document.createElement("article");
        card.className = "saved-plan-card";

        const title = document.createElement("h3");
        title.textContent = plan.examDate
            ? `${plan.subject} · ${formatDate(plan.examDate)} exam`
            : `${plan.subject} · ${getPlanDaysLeft(plan)} days left`;

        const progress = document.createElement("p");
        const completedCount = plan.days.filter(day => day.completed).length;
        progress.textContent =
            `${completedCount} of ${plan.days.length} study days complete · ${plan.hours} ${plan.hours === 1 ? "hour" : "hours"} per day`;

        const actions = document.createElement("div");
        actions.className = "saved-plan-actions";

        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.dataset.action = "view";
        viewButton.dataset.planId = plan.id;
        viewButton.textContent = "View plan";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.planId = plan.id;
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${plan.subject} study plan`);

        actions.append(viewButton, deleteButton);
        card.append(title, progress, actions);
        container.appendChild(card);
    });
}

function renderStudyPlan(plan, container) {
    container.replaceChildren();
    const planElement = document.createElement("div");
    planElement.className = "study-plan";

    const heading = document.createElement("h2");
    heading.textContent = `${plan.subject} study plan`;

    const summary = document.createElement("p");
    summary.className = "study-plan-summary";

    const totalHours = plan.requiredHours ?? subjectStudyHours[(plan.subject || "").toLowerCase()] ?? 0;
    const completionDays = plan.requiredDays ?? Math.max(1, Math.ceil(totalHours / (plan.hours || 1)));
    const daysLeft = getPlanDaysLeft(plan);

    const completionMessage = completionDays <= daysLeft
        ? `You need ${completionDays} day${completionDays === 1 ? "" : "s"} to finish this syllabus at ${plan.hours} hour${plan.hours === 1 ? "" : "s"} per day. You have ${daysLeft} day${daysLeft === 1 ? "" : "s"} left.`
        : `You need ${completionDays} day${completionDays === 1 ? "" : "s"} to finish this syllabus, but you have only ${daysLeft} day${daysLeft === 1 ? "" : "s"} left. Increase your study hours or revise priority topics first.`;

    summary.textContent = `${completionMessage}`;

    planElement.append(heading, summary);

    plan.days.forEach((day, index) => {
        const card = document.createElement("article");
        card.className = `study-day${day.completed ? " study-day-complete" : ""}`;

        const dayHeading = document.createElement("h3");
        dayHeading.textContent =
            `Day ${index + 1} · ${formatDate(day.date)}`;

        const topic = document.createElement("p");
        topic.className = "study-day-topic";
        topic.textContent = day.topic;

        const task = document.createElement("p");
        task.textContent = day.task;

        const label = document.createElement("label");
        label.className = "study-day-check";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = day.completed;
        checkbox.dataset.planId = plan.id;
        checkbox.dataset.dayIndex = String(index);
        label.append(checkbox, document.createTextNode(" Mark this study day complete"));

        card.append(dayHeading, topic, task, label);
        planElement.appendChild(card);
    });

    container.appendChild(planElement);
}

function getPlanDaysLeft(plan) {
    if (Number.isInteger(plan.daysLeft)) {
        return plan.daysLeft;
    }

    const examDate = parseLocalDate(plan.examDate);
    if (!examDate) {
        return plan.days.length;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.max(0, Math.round(
        (Date.UTC(examDate.getFullYear(), examDate.getMonth(), examDate.getDate()) -
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000
    ));
}

function handleSavedPlanAction(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }

    try {
        const plans = readSavedStudyPlans();
        const plan = plans.find(savedPlan => savedPlan.id === button.dataset.planId);
        if (!plan) {
            throw new Error("The selected saved study plan was not found.");
        }

        if (button.dataset.action === "view") {
            renderStudyPlan(plan, document.getElementById("study-plan-result"));
            return;
        }

        if (button.dataset.action === "delete") {
            const remainingPlans = plans.filter(savedPlan => savedPlan.id !== plan.id);
            writeSavedStudyPlans(remainingPlans);
            renderSavedStudyPlans(remainingPlans);
            const result = document.getElementById("study-plan-result");
            if (remainingPlans.length > 0) {
                renderStudyPlan(remainingPlans[0], result);
            } else {
                showPlannerMessage(result, "The saved plan was deleted.");
            }
        }
    } catch (error) {
        showPlannerMessage(
            document.getElementById("study-plan-result"),
            "That saved plan could not be updated. Check browser storage settings and try again."
        );
        console.error("Unable to update saved study plan.", error);
    }
}

function handleStudyProgressChange(event) {
    const checkbox = event.target;
    if (!checkbox.matches("input[type='checkbox'][data-plan-id][data-day-index]")) {
        return;
    }

    try {
        const plans = readSavedStudyPlans();
        const plan = plans.find(savedPlan => savedPlan.id === checkbox.dataset.planId);
        const dayIndex = Number(checkbox.dataset.dayIndex);
        if (!plan || !Number.isInteger(dayIndex) || !plan.days[dayIndex]) {
            throw new Error("The selected study day was not found.");
        }

        plan.days[dayIndex].completed = checkbox.checked;
        writeSavedStudyPlans(plans);
        renderSavedStudyPlans(plans);
        renderStudyPlan(plan, document.getElementById("study-plan-result"));
    } catch (error) {
        checkbox.checked = !checkbox.checked;
        showPlannerMessage(
            document.getElementById("study-plan-result"),
            "Study progress could not be saved. Check browser storage settings and try again."
        );
        console.error("Unable to save study progress.", error);
    }
}

function showPlannerMessage(container, message) {
    container.replaceChildren();
    const notice = document.createElement("p");
    notice.className = "study-plan-message";
    notice.textContent = message;
    container.appendChild(notice);
}

function parseLocalDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return null;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    date.setHours(0, 0, 0, 0);
    return date;
}

function toLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatDate(value) {
    const date = parseLocalDate(value);
    return date
        ? date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
        : value;
}
