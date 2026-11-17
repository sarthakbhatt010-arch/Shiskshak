const questionBank = {
    html: [
        { question: "Which HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, topic: "Links", difficulty: "easy" },
        { question: "What does the <img> tag require to display an image?", options: ["src attribute", "href attribute", "class attribute", "id attribute"], answer: 0, topic: "Images", difficulty: "easy" },
        { question: "Which tag defines the largest heading in HTML?", options: ["<h3>", "<h1>", "<header>", "<heading>"], answer: 1, topic: "Headings", difficulty: "easy" },
        { question: "Which HTML element is used for a numbered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: 1, topic: "Lists", difficulty: "medium" },
        { question: "Which attribute is used to specify alternative text for an image?", options: ["alt", "title", "src", "description"], answer: 0, topic: "Accessibility", difficulty: "medium" },
        { question: "Which tag is used to define a paragraph in HTML?", options: ["<para>", "<p>", "<paragraph>", "<text>"], answer: 1, topic: "Text", difficulty: "easy" },
        { question: "Which HTML element is used for the main page content?", options: ["<main>", "<section>", "<body>", "<content>"], answer: 2, topic: "Structure", difficulty: "medium" },
        { question: "What does the DOCTYPE declaration do in HTML?", options: ["Defines CSS", "Specifies HTML version", "Creates a heading", "Links JavaScript"], answer: 1, topic: "Document Structure", difficulty: "medium" },
        { question: "Which element is used to include JavaScript in an HTML file?", options: ["<style>", "<script>", "<js>", "<code>"], answer: 1, topic: "Scripts", difficulty: "easy" },
        { question: "Which attribute is used to set a unique identifier on an element?", options: ["class", "name", "id", "value"], answer: 2, topic: "Attributes", difficulty: "easy" },
        { question: "What does the <br> tag do?", options: ["Creates a horizontal rule", "Adds a line break", "Creates a button", "Defines a table"], answer: 1, topic: "Spacing", difficulty: "easy" },
        { question: "Which HTML tag is used to create a table row?", options: ["<tr>", "<td>", "<th>", "<table>"], answer: 0, topic: "Tables", difficulty: "medium" },
        { question: "Which tag creates a form input field?", options: ["<input>", "<field>", "<textbox>", "<formfield>"], answer: 0, topic: "Forms", difficulty: "medium" },
        { question: "Which attribute makes input required?", options: ["mandatory", "required", "validate", "must"], answer: 1, topic: "Forms", difficulty: "medium" },
        { question: "Which HTML tag is used to embed external CSS?", options: ["<stylesheet>", "<link>", "<css>", "<style>"], answer: 1, topic: "Styling", difficulty: "hard" }
    ],
    css: [
        { question: "Which CSS property changes the text color?", options: ["background-color", "font-size", "color", "border"], answer: 2, topic: "Color", difficulty: "easy" },
        { question: "Which CSS selector targets an element with a specific id?", options: [".className", "#idName", "elementName", "*idName"], answer: 1, topic: "Selectors", difficulty: "easy" },
        { question: "Which property controls spacing between elements on the outside?", options: ["padding", "margin", "border", "outline"], answer: 1, topic: "Spacing", difficulty: "medium" },
        { question: "Which CSS value makes an element flexible in a flex container?", options: ["display: grid", "position: relative", "display: flex", "float: left"], answer: 2, topic: "Layout", difficulty: "medium" },
        { question: "Which property is used to make text bold?", options: ["font-style", "font-weight", "text-align", "letter-spacing"], answer: 1, topic: "Typography", difficulty: "easy" },
        { question: "Which CSS property changes the background color of an element?", options: ["color", "background-color", "font-family", "padding"], answer: 1, topic: "Color", difficulty: "easy" },
        { question: "Which property controls the space inside an element?", options: ["margin", "padding", "border", "outline"], answer: 1, topic: "Spacing", difficulty: "easy" },
        { question: "Which CSS property rounds the corners of an element?", options: ["border-radius", "border-collapse", "box-shadow", "transform"], answer: 0, topic: "Styling", difficulty: "medium" },
        { question: "Which selector targets all paragraph elements?", options: ["#p", ".p", "p", "*p"], answer: 2, topic: "Selectors", difficulty: "easy" },
        { question: "Which CSS property is used to create a grid layout?", options: ["display: flex", "display: grid", "position: fixed", "float: left"], answer: 1, topic: "Layout", difficulty: "medium" },
        { question: "Which property controls the stack order of positioned elements?", options: ["z-index", "index", "order", "position"], answer: 0, topic: "Positioning", difficulty: "medium" },
        { question: "Which property makes an element invisible but still takes space?", options: ["display: none", "visibility: hidden", "opacity: 0", "overflow: hidden"], answer: 1, topic: "Visibility", difficulty: "hard" },
        { question: "Which value makes an element positioned relative to the viewport?", options: ["position: static", "position: relative", "position: absolute", "position: fixed"], answer: 3, topic: "Positioning", difficulty: "hard" },
        { question: "Which CSS property controls the size of text?", options: ["font-style", "font-weight", "font-size", "letter-spacing"], answer: 2, topic: "Typography", difficulty: "easy" },
        { question: "Which CSS property is used to add shadow behind an element?", options: ["box-shadow", "text-shadow", "border-shadow", "shadow"], answer: 0, topic: "Effects", difficulty: "hard" }
    ],
    javascript: [
        { question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "let", "const", "All of the above"], answer: 3, topic: "Variables", difficulty: "easy" },
        { question: "Which method is used to print output to the console?", options: ["console.log()", "print()", "document.write()", "alert()"], answer: 0, topic: "Console", difficulty: "easy" },
        { question: "Which symbol is used for strict equality comparison in JavaScript?", options: ["==", "=", "===", "!=="], answer: 2, topic: "Comparison", difficulty: "medium" },
        { question: "Which built-in function converts a string to a number?", options: ["parseInt()", "toUpperCase()", "slice()", "trim()"], answer: 0, topic: "Type Conversion", difficulty: "medium" },
        { question: "Which loop repeats until a condition becomes false?", options: ["for", "while", "if", "switch"], answer: 1, topic: "Loops", difficulty: "medium" },
        { question: "Which method converts an array into a string?", options: ["join()", "split()", "concat()", "slice()"], answer: 0, topic: "Arrays", difficulty: "medium" },
        { question: "Which keyword creates a block-scoped variable?", options: ["var", "let", "const", "function"], answer: 1, topic: "Variables", difficulty: "easy" },
        { question: "Which operator is used for logical AND?", options: ["&&", "||", "!", "&"], answer: 0, topic: "Operators", difficulty: "easy" },
        { question: "Which JavaScript function is called when an event occurs?", options: ["callback", "listener", "handler", "event"], answer: 2, topic: "Events", difficulty: "medium" },
        { question: "Which built-in method removes the last element from an array?", options: ["shift()", "pop()", "unshift()", "push()"], answer: 1, topic: "Arrays", difficulty: "easy" },
        { question: "Which method is used to add an element at the end of an array?", options: ["push()", "pop()", "shift()", "splice()"], answer: 0, topic: "Arrays", difficulty: "easy" },
        { question: "Which property stores the length of a string?", options: ["size", "length", "count", "index"], answer: 1, topic: "Strings", difficulty: "easy" },
        { question: "Which JavaScript keyword defines a reusable block of code?", options: ["class", "function", "const", "return"], answer: 1, topic: "Functions", difficulty: "medium" },
        { question: "Which statement stops execution of a loop?", options: ["continue", "break", "return", "switch"], answer: 1, topic: "Loops", difficulty: "medium" },
        { question: "Which method creates a new array by applying a function to each item?", options: ["map()", "filter()", "reduce()", "forEach()"], answer: 0, topic: "Arrays", difficulty: "hard" }
    ]
};

function shuffleArray(items) {
    const cloned = [...items];

    for (let i = cloned.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[randomIndex]] = [cloned[randomIndex], cloned[i]];
    }

    return cloned;
}

function getRandomQuizQuestions(subject, count = 5) {
    const subjectQuestions = questionBank[subject] || [];
    return shuffleArray(subjectQuestions).slice(0, Math.min(count, subjectQuestions.length));
}

function getAdaptiveQuestion(subject, difficulty, usedQuestions) {
    const available = (questionBank[subject] || []).filter(question => {
        const matchesDifficulty = !difficulty || question.difficulty === difficulty;
        const notUsed = !usedQuestions.some(used => used.question === question.question);
        return matchesDifficulty && notUsed;
    });

    if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
    }

    const fallback = (questionBank[subject] || []).filter(question =>
        !usedQuestions.some(used => used.question === question.question)
    );

    if (fallback.length > 0) {
        return fallback[Math.floor(Math.random() * fallback.length)];
    }

    return null;
}

function adjustDifficulty(currentDifficulty, wasCorrect) {
    const order = ["easy", "medium", "hard"];
    const currentIndex = order.indexOf(currentDifficulty);

    if (currentIndex === -1) {
        return "easy";
    }

    if (wasCorrect) {
        return order[Math.min(currentIndex + 1, order.length - 1)];
    }

    return order[Math.max(currentIndex - 1, 0)];
}
