const planStudentName = document.getElementById("planStudentName");
const planCourse = document.getElementById("planCourse");
const planExamDate = document.getElementById("planExamDate");
const planStudyTime = document.getElementById("planStudyTime");
const planGoal = document.getElementById("planGoal");

const startBtn = document.getElementById("startBtn");
const profileForm = document.getElementById("profileForm");
const generateBtn = document.getElementById("generateBtn");
const closeProfileFormBtn = document.getElementById("closeProfileFormBtn");

const studyPlanResult = document.getElementById("studyPlanResult");
// ===============================
// STUDY PLAN CLOSE BUTTON
// ===============================

const closeStudyPlanBtn =
    document.getElementById("closeStudyPlanBtn");
const studyPlanContent = document.getElementById("studyPlanContent");


// ========================================
// START MY STUDY PLAN
// ========================================

startBtn.addEventListener("click", function () {

    profileForm.style.display = "block";

    profileForm.scrollIntoView({
        behavior: "smooth"
    });

});

closeProfileFormBtn.addEventListener("click", function () {

    profileForm.style.display = "none";

});


// ========================================
// GENERATE STUDY PLAN
// ========================================

generateBtn.addEventListener("click", async function () {

    // Get form values
    const name = document.getElementById("studentName").value.trim();
    const course = document.getElementById("course").value.trim();
    const subjects = document.getElementById("subjects").value.trim();
    const examDate = document.getElementById("examDate").value;
    const studyTime = document.getElementById("studyTime").value;
    const goal = document.getElementById("goal").value.trim();


    // ========================================
    // VALIDATION
    // ========================================

    if (!name || !course || !subjects || !examDate || !studyTime || !goal) {

        alert("Please fill all the details.");

        return;
    }


    // ========================================
    // BUTTON LOADING
    // ========================================

    generateBtn.disabled = true;
    generateBtn.innerText = "Generating Study Plan... 🤖";


    try {

        // ========================================
        // SEND DATA TO BACKEND
        // ========================================

        const response = await fetch(
            "http://127.0.0.1:3000/api/generate-plan",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    course: course,
                    subjects: subjects,
                    examDate: examDate,
                    studyTime: studyTime,
                    goal: goal
                })
            }
        );


        // Convert response to JSON
        const data = await response.json();


        // ========================================
        // CHECK BACKEND RESPONSE
        // ========================================

        if (!response.ok) {

            alert(data.error || "Something went wrong.");

            return;
        }


        // ========================================
        // DISPLAY STUDY PLAN
        // ========================================

        studyPlanContent.textContent = data.studyPlan;
        planStudentName.textContent = name;
        planCourse.textContent = course;
        planExamDate.textContent = examDate;
        planStudyTime.textContent = studyTime + " hours";
        planGoal.textContent = goal;

        studyPlanResult.style.display = "block";

        // ========================================
// UPDATE STUDY PLAN PROGRESS
// ========================================

let studyPlansGenerated =
    Number(localStorage.getItem("studyPlansGenerated")) || 0;

studyPlansGenerated++;

localStorage.setItem(
    "studyPlansGenerated",
    studyPlansGenerated
);

const progressStudyPlans =
    document.getElementById("progressStudyPlans");

if (progressStudyPlans) {
    progressStudyPlans.textContent =
        studyPlansGenerated;
}


        // ========================================
        // SCROLL TO STUDY PLAN
        // ========================================

        studyPlanResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    } catch (error) {

        console.error("Error:", error);

        alert(
            "Unable to connect to StudyPilot AI server.\n\n" +
            "Please make sure server.js is running."
        );

    } finally {

        // ========================================
        // RESTORE BUTTON
        // ========================================

        generateBtn.disabled = false;
        generateBtn.innerText = "Generate My Study Plan →";

    }

});

// ===============================
// QUIZ SYSTEM
// ===============================

// 24 UNIQUE QUESTIONS
const questions = [

    // ===============================
    // HTML QUESTIONS
    // ===============================

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which HTML tag is used to create the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to insert an image?",
        options: [
            "<image>",
            "<img>",
            "<src>",
            "<picture>"
        ],
        answer: 1
    },

    {
        question: "Which attribute specifies the URL of an image?",
        options: [
            "href",
            "link",
            "src",
            "url"
        ],
        answer: 2
    },

    {
        question: "Which HTML element is used to create a paragraph?",
        options: [
            "<para>",
            "<p>",
            "<paragraph>",
            "<text>"
        ],
        answer: 1
    },

    {
        question: "Which tag is used to create an unordered list?",
        options: [
            "<ol>",
            "<list>",
            "<ul>",
            "<li>"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag is used to create a button?",
        options: [
            "<btn>",
            "<button>",
            "<input-button>",
            "<click>"
        ],
        answer: 1
    },


    // ===============================
    // CSS QUESTIONS
    // ===============================

    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "$"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for a class selector in CSS?",
        options: [
            "#",
            ".",
            "*",
            "@"
        ],
        answer: 1
    },

    {
        question: "Which CSS property is used to change text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],
        answer: 2
    },

    {
        question: "Which CSS property is used to change the background color?",
        options: [
            "background-color",
            "bg-color",
            "color-background",
            "background"
        ],
        answer: 0
    },

    {
        question: "Which CSS property is used to change the font size?",
        options: [
            "text-size",
            "font-size",
            "font-style",
            "text-font"
        ],
        answer: 1
    },

    {
        question: "Which CSS property is used to make text bold?",
        options: [
            "font-weight",
            "text-bold",
            "font-bold",
            "bold"
        ],
        answer: 0
    },

    {
        question: "Which CSS property is used to add space inside an element?",
        options: [
            "margin",
            "padding",
            "spacing",
            "border"
        ],
        answer: 1
    },


    // ===============================
    // JAVASCRIPT QUESTIONS
    // ===============================

    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "constant",
            "const"
        ],
        answer: 3
    },

    {
        question: "Which keyword can be used to declare a variable in JavaScript?",
        options: [
            "var",
            "variable",
            "declare",
            "int"
        ],
        answer: 0
    },

    {
        question: "Which keyword is used to create a block-scoped variable?",
        options: [
            "var",
            "let",
            "define",
            "static"
        ],
        answer: 1
    },

    {
        question: "Which keyword is used to define a function in JavaScript?",
        options: [
            "function",
            "def",
            "fun",
            "method"
        ],
        answer: 0
    },

    {
        question: "Which method is used to print something in the browser console?",
        options: [
            "print()",
            "console.log()",
            "log.console()",
            "browser.log()"
        ],
        answer: 1
    },

    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()",
            "JSON.stringify()"
        ],
        answer: 0
    },

    {
        question: "Which method converts a JavaScript object into a JSON string?",
        options: [
            "JSON.parse()",
            "JSON.object()",
            "JSON.stringify()",
            "JSON.convert()"
        ],
        answer: 2
    },

    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: [
            "==",
            "=",
            "===",
            "!="
        ],
        answer: 2
    }
];


// ===============================
// QUIZ VARIABLES
// ===============================

const startQuizBtn =
    document.getElementById("startQuizBtn");

const quizSection =
    document.getElementById("quizSection");
const closeQuizBtn =
    document.getElementById("closeQuizBtn");

// ===============================
// START QUIZ
// ===============================

startQuizBtn.addEventListener("click", function () {

    // Show quiz section
    quizSection.style.display = "block";

    // Show quiz card again
    quizCard.style.display = "block";

    // Hide previous result
    quizResult.style.display = "none";

    // Hide revision section
    if (revisionSection) {
        revisionSection.style.display = "none";
    }

    // Start a fresh quiz
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    wrongTopics = [];

    // Generate new random quiz
    shuffleQuestions();

    // Load first question
    loadQuestion();

    // Scroll to quiz
    quizSection.scrollIntoView({
        behavior: "smooth"
    });

});

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let wrongTopics = [];
let currentRevisionTopic = "";

// ===============================
// PROGRESS DASHBOARD
// ===============================

const progressQuizScore = document.getElementById("progressQuizScore");
const progressQuestions = document.getElementById("progressQuestions");
const progressStudyPlans = document.getElementById("progressStudyPlans");
const progressConsistency = document.getElementById("progressConsistency");


// ===============================
// GET HTML ELEMENTS
// ===============================

const questionNumber =
    document.getElementById("questionNumber");

const quizScore =
    document.getElementById("quizScore");

const quizProgress =
    document.getElementById("quizProgress");

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const nextQuestionBtn =
    document.getElementById("nextQuestionBtn");

const quizCard =
    document.querySelector(".quiz-card");

const quizResult =
    document.getElementById("quizResult");

const finalScore =
    document.getElementById("finalScore");

const performanceMessage =
    document.getElementById("performanceMessage");

const restartQuizBtn =
    document.getElementById("restartQuizBtn");

const quizHistoryList =
    document.getElementById("quizHistoryList"); 
    
const quizHistorySubtitle =
    document.getElementById("quizHistorySubtitle");    

    // ===============================
    // REVISION ELEMENTS
    // ===============================

    const revisionSection =
        document.getElementById("revisionSection");

    const revisionTitle =
        document.getElementById("revisionTitle");

    const revisionDescription =
        document.getElementById("revisionDescription");

    const revisionContent =
        document.getElementById("revisionContent");

    const backToQuizBtn =
        document.getElementById("backToQuizBtn");
    const completeRevisionBtn =
        document.getElementById("completeRevisionBtn");    


// ===============================
// SHUFFLE ARRAY
// ===============================

function shuffleArray(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// ===============================
// SELECT RANDOM 5 QUESTIONS
// ===============================

function shuffleQuestions() {

    // Shuffle all 24 questions
    const shuffledQuestions =
        shuffleArray(questions);

    // Select only 5 unique questions
    quizQuestions =
        shuffledQuestions.slice(0, 5);

    // Also shuffle options
    quizQuestions.forEach(question => {

        const correctAnswer =
            question.options[question.answer];

        const shuffledOptions =
            shuffleArray(question.options);

        question.options =
            shuffledOptions;

        question.answer =
            shuffledOptions.indexOf(correctAnswer);
    });
}

// ===============================
// GET QUESTION TOPIC
// ===============================

function getQuestionTopic(question) {

    const index = questions.indexOf(question);

    if (index < 8) {
        return "HTML";
    }

    if (index < 16) {
        return "CSS";
    }

    return "JavaScript";
}

// ===============================
// TOPIC RECOMMENDATIONS
// ===============================

function getTopicRecommendation(topic) {

    const recommendations = {

        HTML: `
            <strong>💡 Recommendation:</strong>
            <br><br>
            Revise HTML structure, forms, tables,
            semantic tags and basic HTML elements.

            <br><br>

            <button class="revision-btn"
                onclick="startRevision('HTML')">
                📖 Start HTML Revision →
            </button>
        `,

        CSS: `
            <strong>💡 Recommendation:</strong>
            <br><br>
            Revise CSS selectors, colors, fonts,
            padding, margin and basic styling.

            <br><br>

            <button class="revision-btn"
                onclick="startRevision('CSS')">
                📖 Start CSS Revision →
            </button>
        `,

        JavaScript: `
            <strong>💡 Recommendation:</strong>
            <br><br>
            Revise variables, functions, JSON,
            operators and basic JavaScript methods.

            <br><br>

            <button class="revision-btn"
                onclick="startRevision('JavaScript')">
                📖 Start JavaScript Revision →
            </button>
        `
    };

    return recommendations[topic] || "";
}

// ===============================
// START REVISION
// ===============================

// ===============================
// START REVISION
// ===============================

function startRevision(topic) {

    currentRevisionTopic = topic;

    // Reset completion button for new revision session
    completeRevisionBtn.disabled = false;

    completeRevisionBtn.textContent =
        "✅ Mark Revision as Completed";

    // Hide quiz result
    quizResult.style.display = "none";

    // Show revision section
    revisionSection.style.display = "block";

    // Set title
    revisionTitle.textContent =
        `📖 ${topic} Revision`;

    // Set description
    revisionDescription.textContent =
        `Revise the important concepts of ${topic}.`;

    // Generate revision content
    revisionContent.innerHTML =
        getRevisionContent(topic);

    // Scroll to revision
    revisionSection.scrollIntoView({
        behavior: "smooth"
    });

    
}

// ===============================
// REVISION CONTENT
// ===============================

function getRevisionContent(topic) {

    const revisionData = {

        HTML: `

            <div class="revision-topic">
                <h3>1️⃣ HTML Structure</h3>

                <p>
                    HTML is used to create the structure
                    of a web page.
                </p>

                <pre class="revision-code">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My Page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
&lt;/body&gt;

&lt;/html&gt;
                </pre>
            </div>


            <div class="revision-topic">
                <h3>2️⃣ Headings</h3>

                <p>
                    HTML provides six heading levels:
                    h1 to h6.
                </p>

                <pre class="revision-code">
&lt;h1&gt;Main Heading&lt;/h1&gt;
&lt;h2&gt;Sub Heading&lt;/h2&gt;
&lt;h3&gt;Small Heading&lt;/h3&gt;
                </pre>
            </div>


            <div class="revision-topic">
                <h3>3️⃣ Links</h3>

                <p>
                    The &lt;a&gt; tag is used to create links.
                </p>

                <pre class="revision-code">
&lt;a href="https://example.com"&gt;
    Visit Website
&lt;/a&gt;
                </pre>
            </div>


            <div class="revision-topic">
                <h3>4️⃣ Lists</h3>

                <p>
                    HTML supports ordered and unordered lists.
                </p>

                <pre class="revision-code">
&lt;ul&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;CSS&lt;/li&gt;
    &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;
                </pre>
            </div>


            <div class="revision-topic">
                <h3>5️⃣ Forms</h3>

                <p>
                    Forms are used to collect user input.
                </p>

                <pre class="revision-code">
&lt;form&gt;

    &lt;input type="text"&gt;

    &lt;input type="email"&gt;

    &lt;button&gt;Submit&lt;/button&gt;

&lt;/form&gt;
                </pre>
            </div>

        `,


        CSS: `

            <div class="revision-topic">
                <h3>1️⃣ CSS Selectors</h3>

                <p>
                    Selectors are used to select HTML elements.
                </p>

                <pre class="revision-code">
/* Element */
p {
    color: blue;
}

/* Class */
.box {
    padding: 20px;
}

/* ID */
#title {
    font-size: 30px;
}
                </pre>
            </div>


            <div class="revision-topic">
                <h3>2️⃣ Colors</h3>

                <p>
                    The color property changes text color.
                    background-color changes background color.
                </p>

                <pre class="revision-code">
p {
    color: red;
    background-color: yellow;
}
                </pre>
            </div>


            <div class="revision-topic">
                <h3>3️⃣ Font Size</h3>

                <pre class="revision-code">
h1 {
    font-size: 32px;
}
                </pre>
            </div>


            <div class="revision-topic">
                <h3>4️⃣ Margin & Padding</h3>

                <p>
                    Margin creates space outside an element.
                    Padding creates space inside an element.
                </p>

                <pre class="revision-code">
.box {
    margin: 20px;
    padding: 15px;
}
                </pre>
            </div>


            <div class="revision-topic">
                <h3>5️⃣ Font Weight</h3>

                <p>
                    font-weight is used to make text bold.
                </p>

                <pre class="revision-code">
p {
    font-weight: bold;
}
                </pre>
            </div>

        `,


        JavaScript: `

            <div class="revision-topic">
                <h3>1️⃣ Variables</h3>

                <p>
                    JavaScript provides var, let and const
                    for declaring variables.
                </p>

                <pre class="revision-code">
let name = "Mohan";

const age = 20;

var course = "B.Tech";
                </pre>
            </div>


            <div class="revision-topic">
                <h3>2️⃣ Functions</h3>

                <p>
                    Functions are reusable blocks of code.
                </p>

                <pre class="revision-code">
function greet() {

    console.log("Hello Mohan");

}

greet();
                </pre>
            </div>


            <div class="revision-topic">
                <h3>3️⃣ Strict Equality</h3>

                <p>
                    The === operator checks both value
                    and data type.
                </p>

                <pre class="revision-code">
5 === 5
// true

5 === "5"
// false
                </pre>
            </div>


            <div class="revision-topic">
                <h3>4️⃣ JSON.parse()</h3>

                <p>
                    JSON.parse() converts a JSON string
                    into a JavaScript object.
                </p>

                <pre class="revision-code">
const data =
    JSON.parse('{"name":"Mohan"}');

console.log(data.name);
                </pre>
            </div>


            <div class="revision-topic">
                <h3>5️⃣ JSON.stringify()</h3>

                <p>
                    JSON.stringify() converts a JavaScript
                    object into a JSON string.
                </p>

                <pre class="revision-code">
const user = {
    name: "Mohan"
};

const json =
    JSON.stringify(user);
                </pre>
            </div>

        `
    };

    return revisionData[topic] ||
        "<p>Revision content not available.</p>";
}


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    selectedAnswer = null;

    const current =
        quizQuestions[currentQuestion];


    // Question number

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    // Score

    quizScore.textContent =
        `Score: ${score}`;


    // Question

    questionText.textContent =
        current.question;


    // Clear previous options

    optionsContainer.innerHTML = "";


    // Create options

    current.options.forEach((option, index) => {

        const optionButton =
            document.createElement("button");

        optionButton.className =
            "quiz-option";

        optionButton.textContent =
            option;

        optionButton.addEventListener(
            "click",
            function () {

                selectAnswer(
                    index,
                    optionButton
                );

            }
        );

        optionsContainer.appendChild(
            optionButton
        );

    });


    // Progress bar

    const progress =
        ((currentQuestion + 1) /
            quizQuestions.length) * 100;

    quizProgress.style.width =
        `${progress}%`;


    // Disable next button

    nextQuestionBtn.disabled = true;


    // Button text

    if (
        currentQuestion ===
        quizQuestions.length - 1
    ) {

        nextQuestionBtn.textContent =
            "Finish Quiz →";

    } else {

        nextQuestionBtn.textContent =
            "Next Question →";
    }
}


// ===============================
// SELECT ANSWER
// ===============================

function selectAnswer(
    index,
    selectedButton
) {

    // Prevent selecting again

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = index;

    const current =
        quizQuestions[currentQuestion];


    const allOptions =
        document.querySelectorAll(
            ".quiz-option"
        );


    // Disable all options

    allOptions.forEach(
        (button, i) => {

            button.disabled = true;

            // Show correct answer

            if (
                i === current.answer
            ) {

                button.classList.add(
                    "correct"
                );
            }

        }
    );


    // Check answer

    if (
        index === current.answer
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        // Save weak topic
        const topic = getQuestionTopic(current);

        wrongTopics.push(topic);

    }


    // Update score

    quizScore.textContent =
        `Score: ${score}`;


    // Enable next button

    nextQuestionBtn.disabled =
        false;
}


// ===============================
// NEXT QUESTION
// ===============================

nextQuestionBtn.addEventListener(
    "click",
    function () {

        // Don't continue without answer

        if (selectedAnswer === null) {
            return;
        }


        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuestion();

        } else {

            showQuizResult();

        }

    }
);


// ===============================
// SHOW QUIZ RESULT
// ===============================

function showQuizResult() {

    quizCard.style.display = "none";
    quizResult.style.display = "block";

    // Total questions
    const totalQuestions = quizQuestions.length;

    // Wrong answers
    const wrongAnswers = totalQuestions - score;

    // Accuracy
    const accuracy =
        Math.round((score / totalQuestions) * 100);


    // ========================================
    // GET UNIQUE WEAK TOPICS
    // ========================================

    const uniqueWeakTopics =
        [...new Set(wrongTopics)];


    // ========================================
    // FOCUS AREA MESSAGE
    // ========================================

    let focusAreaHTML = "";


    if (uniqueWeakTopics.length === 0) {

        focusAreaHTML = `
            <br><br>
            <strong>🎯 Focus Areas</strong>
            <br><br>
            🎉 No weak areas detected!
            <br>
            You answered all questions correctly.
        `;

    } else {

        focusAreaHTML = `
            <br><br>
            <strong>⚠️ Focus Areas</strong>
            <br><br>
            You should focus more on:
            <br><br>
            📚 ${uniqueWeakTopics.join(" &nbsp; • &nbsp; 📚 ")}

            <br><br>

            ${uniqueWeakTopics.map(topic =>
                getTopicRecommendation(topic)
            ).join("<br><br>")}
        `;

    }


    // ========================================
    // PERFORMANCE MESSAGE
    // ========================================

    if (score === totalQuestions) {

        performanceMessage.innerHTML = `
            Excellent! 🎉 You have mastered these topics.

            <br><br>

            <strong>${accuracy}% Accuracy</strong>

            <br>

            ${score} Correct

            <br>

            ${wrongAnswers} Wrong

            ${focusAreaHTML}
        `;

    }

    else if (score >= 3) {

        performanceMessage.innerHTML = `
            You are doing well! 👍 Keep practicing.

            <br><br>

            <strong>${accuracy}% Accuracy</strong>

            <br>

            ${score} Correct

            <br>

            ${wrongAnswers} Wrong

            ${focusAreaHTML}
        `;

    }

    else {

        performanceMessage.innerHTML = `
            You are improving! 📚 Focus on your weak topics.

            <br><br>

            <strong>${accuracy}% Accuracy</strong>

            <br>

            ${score} Correct

            <br>

            ${wrongAnswers} Wrong

            ${focusAreaHTML}
        `;

    }


    // ========================================
    // UPDATE QUIZ SCORE
    // ========================================

    localStorage.setItem(
        "latestQuizScore",
        accuracy
    );

    if (progressQuizScore) {

        progressQuizScore.textContent =
            accuracy + "%";

    }


    // ========================================
    // UPDATE QUESTIONS ATTEMPTED
    // ========================================

    let questionsAttempted =
        Number(localStorage.getItem("questionsAttempted")) || 0;

    questionsAttempted += totalQuestions;

    localStorage.setItem(
        "questionsAttempted",
        questionsAttempted
    );

    if (progressQuestions) {

        progressQuestions.textContent =
            questionsAttempted;

    }


    // ========================================
    // SAVE LAST QUIZ DETAILS
    // ========================================

    localStorage.setItem(
        "lastQuizCorrect",
        score
    );

    localStorage.setItem(
        "lastQuizWrong",
        wrongAnswers
    );

    saveQuizHistory(
    score,
    totalQuestions,
    uniqueWeakTopics
);

}

// ===============================
// SAVE QUIZ HISTORY
// ===============================

function saveQuizHistory(score, total, weakTopics) {

    const history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    history.unshift({

        date: new Date().toLocaleString(),

        score: score,

        total: total,

        accuracy: Math.round((score / total) * 100),

        topics: [...new Set(weakTopics)]

    });

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history.slice(0, 10))
    );

    loadQuizHistory();

}

// ===============================
// SMART ANALYTICS
// ===============================

function loadSmartAnalytics() {

    const history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

    console.log("Analytics History:", history);

    // No quiz history
    if (history.length === 0) {

        document.getElementById("averageQuizScore").textContent = "0%";
        document.getElementById("bestQuizScore").textContent = "0%";
        document.getElementById("weakestTopic").textContent = "None";
        document.getElementById("strongestTopic").textContent = "None";

        return;
    }


    // ===============================
    // AVERAGE SCORE
    // ===============================

    const totalAccuracy = history.reduce(
        (sum, quiz) => sum + Number(quiz.accuracy || 0),
        0
    );

    const averageScore =
        Math.round(totalAccuracy / history.length);

    document.getElementById("averageQuizScore").textContent =
        averageScore + "%";


    // ===============================
    // BEST SCORE
    // ===============================

    const bestScore = Math.max(
        ...history.map(quiz => Number(quiz.accuracy || 0))
    );

    document.getElementById("bestQuizScore").textContent =
        bestScore + "%";


    // ===============================
    // TOPIC DATA
    // ===============================

    const topicCount = {};

    history.forEach(quiz => {

        if (!Array.isArray(quiz.topics)) {
            return;
        }

        quiz.topics.forEach(topic => {

            if (!topic) {
                return;
            }

            topicCount[topic] =
                (topicCount[topic] || 0) + 1;

        });

    });


    const topics = Object.keys(topicCount);


    // ===============================
    // NO TOPIC DATA
    // ===============================

    if (topics.length === 0) {

        document.getElementById("weakestTopic").textContent =
            "None";

        document.getElementById("strongestTopic").textContent =
            "None";

        return;
    }


    // ===============================
    // WEAKEST TOPIC
    // ===============================

    const weakestTopic = topics.reduce((a, b) =>
        topicCount[a] > topicCount[b] ? a : b
    );

    document.getElementById("weakestTopic").textContent =
        weakestTopic;


    // ===============================
    // STRONGEST TOPIC
    // ===============================

    const strongestTopic = topics.reduce((a, b) =>
        topicCount[a] < topicCount[b] ? a : b
    );

    document.getElementById("strongestTopic").textContent =
        strongestTopic;

}

// ===============================
// LOAD QUIZ HISTORY
// ===============================

function loadQuizHistory() {

    const history =
        JSON.parse(localStorage.getItem("quizHistory")) || [];

        if (quizHistorySubtitle) {

            quizHistorySubtitle.textContent =
                history.length === 0
                    ? "No quiz attempts yet"
                    : `${history.length} quiz attempt${history.length > 1 ? "s" : ""}`;

        }

    quizHistoryList.innerHTML = "";

    if (history.length === 0) {

        quizHistoryList.innerHTML =
            "<p style='text-align:center'>No quiz attempts yet.</p>";

        return;

        loadSmartAnalytics();
    }

    history.forEach(item => {

        quizHistoryList.innerHTML += `

            <div class="history-card">

                <div class="history-top">

                    <div class="history-score">
                        ${item.accuracy}%
                    </div>

                    <div class="history-date">
                        ${item.date}
                    </div>

                </div>

                <strong>
                    ${item.score}/${item.total} Correct
                </strong>

                <div class="history-focus">
                    📚 Focus:
                    ${item.topics.length
                        ? item.topics.join(", ")
                        : "None"}
                </div>

            </div>

        `;
    });

}

// ===============================
// RESTART QUIZ
// ===============================

restartQuizBtn.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        selectedAnswer = null;

        wrongTopics = [];

        quizCard.style.display = "block";

        quizResult.style.display = "none";

        // Generate NEW random quiz
        shuffleQuestions();

        loadQuestion();

    }
);


// ===============================
// START QUIZ
// ===============================

shuffleQuestions();

loadQuestion();


// ========================================
// LOAD PROGRESS DATA
// ========================================

function loadProgressData() {

    const latestQuizScore =
        Number(localStorage.getItem("latestQuizScore")) || 0;

    if (progressQuizScore) {

        progressQuizScore.textContent =
            latestQuizScore + "%";
    }


    // Questions attempted

    const questionsAttempted =
        Number(localStorage.getItem("questionsAttempted")) || 0;

    if (progressQuestions) {

        progressQuestions.textContent =
            questionsAttempted;
    }


    // Study plans

    const studyPlansGenerated =
        Number(localStorage.getItem("studyPlansGenerated")) || 0;

    if (progressStudyPlans) {

        progressStudyPlans.textContent =
            studyPlansGenerated;
    }


    // Consistency

    const studyStreak =
        Number(localStorage.getItem("studyStreak")) || 1;

    if (progressConsistency) {

        progressConsistency.textContent =
            studyStreak + " Day";
    }
}


// ========================================
// LOAD PROGRESS WHEN PAGE OPENS
// ========================================

loadProgressData();

// ===============================
// BACK TO QUIZ
// ===============================

backToQuizBtn.addEventListener(
    "click",
    function () {

        revisionSection.style.display = "none";

        quizResult.style.display = "block";

        quizResult.scrollIntoView({
            behavior: "smooth"
        });

    }
);

// ===============================
// CLOSE QUIZ
// ===============================

closeQuizBtn.addEventListener("click", function () {

    // Hide quiz
    quizSection.style.display = "none";

    // Hide quiz result
    quizResult.style.display = "none";

    // Hide revision
    revisionSection.style.display = "none";

    // Reset quiz
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    wrongTopics = [];

    // Scroll back to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// CLOSE STUDY PLAN
// ===============================

closeStudyPlanBtn.addEventListener("click", function () {

    // Hide generated study plan
    studyPlanResult.style.display = "none";

    // Scroll back to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ===============================
// COMPLETE REVISION
// ===============================

completeRevisionBtn.addEventListener(
    "click",
    function () {

        if (!currentRevisionTopic) {
            return;
        }

        let revisionsCompleted =
            Number(
                localStorage.getItem("revisionsCompleted")
            ) || 0;

        revisionsCompleted++;

        localStorage.setItem(
            "revisionsCompleted",
            revisionsCompleted
        );

        alert(
            `🎉 ${currentRevisionTopic} Revision Completed!`
        );

        completeRevisionBtn.disabled = true;

        completeRevisionBtn.textContent =
            "✅ Revision Completed";
    }
);

loadQuizHistory();

document.addEventListener("DOMContentLoaded", function () {

    loadQuizHistory();
    loadSmartAnalytics();

});








// // ===============================
// // TODAY'S PROGRESS
// // ===============================

// function loadTodayProgress() {

//     const history =
//         JSON.parse(localStorage.getItem("quizHistory")) || [];

//     // No quiz history
//     if (history.length === 0) {

//         document.getElementById("progressCompleted").textContent = "0%";
//         document.getElementById("progressTopics").textContent = "0";
//         document.getElementById("progressQuestions").textContent = "0";
//         document.getElementById("progressAccuracy").textContent = "0%";

//         return;
//     }

//     // ===============================
//     // TOTAL QUESTIONS
//     // ===============================

//     const totalQuestions = history.reduce(
//         (sum, quiz) => sum + Number(quiz.total || 0),
//         0
//     );

//     // ===============================
//     // AVERAGE ACCURACY
//     // ===============================

//     const totalAccuracy = history.reduce(
//         (sum, quiz) => sum + Number(quiz.accuracy || 0),
//         0
//     );

//     const averageAccuracy =
//         Math.round(totalAccuracy / history.length);

//     // ===============================
//     // UNIQUE TOPICS
//     // ===============================

//     const topicSet = new Set();

//     history.forEach(quiz => {

//         if (Array.isArray(quiz.topics)) {

//             quiz.topics.forEach(topic => {

//                 if (topic) {
//                     topicSet.add(topic);
//                 }

//             });

//         }

//     });

//     const totalTopics = topicSet.size;

//     // ===============================
//     // UPDATE UI
//     // ===============================

//     document.getElementById("progressCompleted").textContent =
//         averageAccuracy + "%";

//     document.getElementById("progressTopics").textContent =
//         totalTopics;

//     document.getElementById("progressQuestions").textContent =
//         totalQuestions;

//     document.getElementById("progressAccuracy").textContent =
//         averageAccuracy + "%";
// }

// loadTodayProgress();


// // ===============================
// // NAVBAR - STUDY PLAN
// // ===============================

// const navStudyPlan = document.getElementById("navStudyPlan");

// if (navStudyPlan) {

//     navStudyPlan.addEventListener("click", function (event) {

//         event.preventDefault();

//         const profileForm =
//             document.getElementById("profileForm");

//         const studyPlanResult =
//             document.getElementById("studyPlanResult");

//         // Open profile form
//         if (profileForm) {
//             profileForm.style.display = "block";
//         }

//         // If study plan already exists
//         if (
//             studyPlanResult &&
//             studyPlanResult.style.display !== "none"
//         ) {

//             studyPlanResult.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start"
//             });

//         } else if (profileForm) {

//             profileForm.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start"
//             });

//         }

//     });

// }



// // ===============================
// // NAVBAR - QUIZ
// // ===============================

// const navQuiz = document.getElementById("navQuiz");

// if (navQuiz) {

//     navQuiz.addEventListener("click", function (event) {

//         event.preventDefault();

//         const quizSection =
//             document.getElementById("quizSection");

//         if (quizSection) {

//             quizSection.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start"
//             });

//         } else {

//             console.warn("Quiz section not found!");

//         }

//     });

// }