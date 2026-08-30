/* =====================================================
HOBS SMART QUIZ — QUIZ BRAIN
===================================================== */

/* =====================================================
APP STATE
===================================================== */
let selectedSubject = null;
let selectedChapter = null;
let selectedDifficulty = null;
let questionCount = null;
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];
let selectedAnswer = null;

/* =====================================================
SUBJECTS & CHAPTERS
===================================================== */
const subjects = {
    "Biology": [
        "Chapter 1 — Digestive System of Man",
        "Chapter 2 — Blood Circulatory System of Man",
        "Chapter 3 — Respiratory System of Man",
        "Chapter 4 — Urinary System of Man",
        "Chapter 5 — Nervous System of Man",
        "Chapter 6 — Endocrine System of Man",
        "Chapter 7 — Skeletal System of Man",
        "Chapter 8 — Thermoregulation & Homeostasis",
        "Chapter 9 — Immunity",
        "Chapter 10 — Biotechnology",
        "Chapter 11 — Biostatistics & Data Analysis"
    ],
    "English": [
        "Vocabulary",
        "Grammar",
        "Tenses",
        "Parts of Speech",
        "Idioms",
        "Proverbs",
        "Connotation & Denotation",
        "Gerunds & Participles",
        "Poetic Devices",
        "FBISE Class 12 English — Mixed Practice"
    ],
    "Computer": [
        "Chapter 1 — Computer System",
        "Chapter 2 — Computational Thinking & Algorithms",
        "Chapter 3 — Programming Fundamentals",
        "Chapter 4 — Data & Analysis",
        "Chapter 5 — Applications of Computer Science"
    ],
    "Pak Studies": [
        "Chapter 1 — Ideological Basis of Pakistan",
        "Chapter 2 — Political Development of Pakistan",
        "Chapter 3 — Land of Pakistan & Environmental Hazards",
        "Chapter 4 — Natural Vegetation & Forests of Pakistan",
        "Chapter 5 — Mineral, Power Resources & Telecommunication"
    ]
};

/* =====================================================
QUESTION BANK
===================================================== */
const questionBank = {
    "Biology": {
        "Chapter 1 — Digestive System of Man": [
            {
                question: "Which structure prevents food from entering the trachea during swallowing?",
                options: ["Epiglottis", "Uvula", "Glottis", "Larynx"],
                answer: 0
            },
            {
                question: "Most absorption of digested nutrients occurs in the:",
                options: ["Stomach", "Small intestine", "Large intestine", "Oesophagus"],
                answer: 1
            },
            {
                question: "Which enzyme begins the digestion of starch in the mouth?",
                options: ["Pepsin", "Trypsin", "Salivary amylase", "Lipase"],
                answer: 2
            },
            {
                question: "Bile assists digestion mainly by:",
                options: [
                    "Breaking proteins into amino acids",
                    "Emulsifying fats",
                    "Digesting starch",
                    "Absorbing glucose"
                ],
                answer: 1
            },
            {
                question: "The functional advantage of intestinal villi is that they:",
                options: [
                    "Increase surface area for absorption",
                    "Produce hydrochloric acid",
                    "Store bile",
                    "Prevent peristalsis"
                ],
                answer: 0
            }
        ]
    },
    "Computer": {
        "Chapter 1 — Computer System": [
            {
                question: "Which design consideration focuses on how easily users can learn and operate a system?",
                options: ["Usability", "Encryption", "Authentication", "Compression"],
                answer: 0
            },
            {
                question: "A major trade-off between security and usability is that:",
                options: [
                    "More security can sometimes make a system less convenient",
                    "Security always makes systems faster",
                    "Usability eliminates the need for security",
                    "Security and usability are unrelated"
                ],
                answer: 0
            },
            {
                question: "HCI stands for:",
                options: [
                    "Human Computer Interaction",
                    "Hardware Control Interface",
                    "Human Coding Instruction",
                    "High Computer Integration"
                ],
                answer: 0
            },
            {
                question: "Which feature primarily improves accessibility?",
                options: [
                    "Screen reader support",
                    "Faster processor",
                    "Larger hard disk",
                    "Higher clock speed"
                ],
                answer: 0
            },
            {
                question: "Authentication is mainly concerned with:",
                options: [
                    "Determining who a user is",
                    "Increasing screen resolution",
                    "Compressing files",
                    "Displaying graphics"
                ],
                answer: 0
            }
        ]
    },
    "Pak Studies": {
        "Chapter 1 — Ideological Basis of Pakistan": [
            {
                question: "The Aligarh Movement was primarily associated with the educational and social uplift of:",
                options: [
                    "Muslims of the Indian subcontinent",
                    "British administrators",
                    "European settlers",
                    "Princely rulers only"
                ],
                answer: 0
            },
            {
                question: "The Allahabad Address of 1930 was delivered by:",
                options: [
                    "Sir Syed Ahmad Khan",
                    "Allama Muhammad Iqbal",
                    "Liaquat Ali Khan",
                    "Chaudhry Rahmat Ali"
                ],
                answer: 1
            },
            {
                question: "The Lahore Resolution was passed in:",
                options: ["1930", "1935", "1940", "1947"],
                answer: 2
            },
            {
                question: "The Radcliffe Award was mainly concerned with:",
                options: [
                    "Division of territories at partition",
                    "Formation of the Muslim League",
                    "The 1965 war",
                    "The Constitution of 1973"
                ],
                answer: 0
            },
            {
                question: "The Cabinet Mission Plan was presented in:",
                options: ["1940", "1942", "1946", "1948"],
                answer: 2
            }
        ]
    },
    "English": {
        "Tenses": [
            {
                question: "Choose the correct form: 'By the time we arrived, the lecture ____.'",
                options: ["has started", "had started", "starts", "will start"],
                answer: 1
            },
            {
                question: "Which tense is used for an action that was completed before another past action?",
                options: ["Present perfect", "Past continuous", "Past perfect", "Future perfect"],
                answer: 2
            }
        ],
        "Parts of Speech": [
            {
                question: "In the sentence 'She spoke very softly,' the word 'softly' is a:",
                options: ["Noun", "Adjective", "Adverb", "Preposition"],
                answer: 2
            },
            {
                question: "Which part of speech replaces a noun?",
                options: ["Pronoun", "Adverb", "Conjunction", "Interjection"],
                answer: 0
            }
        ]
    }
};

/* =====================================================
GET HTML ELEMENTS
===================================================== */
const homePage = document.getElementById("home-page");
const configPage = document.getElementById("config-page");
const quizPage = document.getElementById("quiz-page");
const resultsPage = document.getElementById("results-page");
const subjectsContainer = document.getElementById("subjects-container");

/* =====================================================
SHOW PAGE
===================================================== */
function showPage(page) {
    if (!page) return;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =====================================================
CREATE SUBJECT CARDS
===================================================== */
function renderSubjects() {
    if (!subjectsContainer) return;
    subjectsContainer.innerHTML = "";

    Object.keys(subjects).forEach(subject => {
        const card = document.createElement("div");
        card.className = "subject-card";

        const header = document.createElement("div");
        header.className = "subject-header";

        const name = document.createElement("div");
        name.className = "subject-name";
        name.textContent = subject;

        const doodle = document.createElement("div");
        doodle.className = "subject-doodle";

        const selectButton = document.createElement("button");
        selectButton.className = "select-button";
        selectButton.textContent = "Select";

        header.appendChild(name);
        header.appendChild(doodle);
        header.appendChild(selectButton);

        const chapterContainer = document.createElement("div");
        chapterContainer.className = "chapter-container";

        subjects[subject].forEach(chapter => {
            const chapterButton = document.createElement("button");
            chapterButton.className = "chapter-button";
            chapterButton.textContent = chapter;

            chapterButton.addEventListener("click", () => selectChapter(subject, chapter));

            chapterContainer.appendChild(chapterButton);
        });

        selectButton.addEventListener("click", () => {
            document.querySelectorAll(".subject-card").forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove("open");
                }
            });

            card.classList.toggle("open");
            selectedSubject = subject;
        });

        card.appendChild(header);
        card.appendChild(chapterContainer);
        subjectsContainer.appendChild(card);
    });
}

/* =====================================================
SELECT CHAPTER
===================================================== */
function selectChapter(subject, chapter) {
    selectedSubject = subject;
    selectedChapter = chapter;

    const infoEl = document.getElementById("selected-info");
    if (infoEl) {
        infoEl.textContent = `${subject} • ${chapter}`;
    }

    showPage(configPage);
}

/* =====================================================
DIFFICULTY
===================================================== */
document.querySelectorAll(".difficulty").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".difficulty").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedDifficulty = button.dataset.value;
    });
});

/* =====================================================
QUESTION COUNT
===================================================== */
document.querySelectorAll(".count").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".count").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        questionCount = Number(button.dataset.value);
    });
});

/* =====================================================
START QUIZ
===================================================== */
const startBtn = document.getElementById("start-button");
if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
}

function startQuiz() {
    if (!selectedSubject || !selectedChapter || !selectedDifficulty || !questionCount) {
        alert("Please select a chapter, difficulty and number of MCQs.");
        return;
    }

    const subjectQuestions = questionBank[selectedSubject];

    if (!subjectQuestions) {
        alert("Questions for this subject are being added.");
        return;
    }

    const available = subjectQuestions[selectedChapter];

    if (!available || available.length === 0) {
        alert("Questions for this chapter are being added.");
        return;
    }

    quizQuestions = [...available]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(questionCount, available.length));

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    showPage(quizPage);
    renderQuestion();
}

/* =====================================================
RENDER QUESTION
===================================================== */
function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) return;

    const quizSubEl = document.getElementById("quiz-subject");
    if (quizSubEl) quizSubEl.textContent = `${selectedSubject} • ${selectedChapter}`;

    const qNumEl = document.getElementById("question-number");
    if (qNumEl) qNumEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    const qTextEl = document.getElementById("question-text");
    if (qTextEl) qTextEl.textContent = question.question;

    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = `${progress}%`;

    const answersContainer = document.getElementById("answers-container");
    if (!answersContainer) return;

    answersContainer.innerHTML = "";
    selectedAnswer = null;

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "answer-button";
        button.textContent = option;

        button.addEventListener("click", () => selectAnswer(button, index));
        answersContainer.appendChild(button);
    });

    const nextBtn = document.getElementById("next-button");
    if (nextBtn) nextBtn.disabled = true;
}

/* =====================================================
SELECT ANSWER
===================================================== */
function selectAnswer(button, index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const question = quizQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-button");

    if (index === question.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        if (buttons[question.answer]) {
            buttons[question.answer].classList.add("correct");
        }
    }

    const nextBtn = document.getElementById("next-button");
    if (nextBtn) nextBtn.disabled = false;
}

/* =====================================================
NEXT QUESTION
===================================================== */
const nextBtn = document.getElementById("next-button");
if (nextBtn) {
    nextBtn.addEventListener("click", nextQuestion);
}

function nextQuestion() {
    selectedAnswer = null;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

/* =====================================================
RESULTS
===================================================== */
function showResults() {
    showPage(resultsPage);

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);

    let grade;
    if (percentage >= 90) {
        grade = "A*";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else {
        grade = "D — Keep Practicing";
    }

    const pctEl = document.getElementById("percentage");
    if (pctEl) pctEl.textContent = `${percentage}%`;

    const scoreEl = document.getElementById("score-text");
    if (scoreEl) scoreEl.textContent = `Score: ${score} / ${total}`;

    const gradeEl = document.getElementById("grade");
    if (gradeEl) gradeEl.textContent = `Grade: ${grade}`;

    const resultMessage = document.getElementById("result-message");
    if (resultMessage) {
        if (percentage >= 80) {
            resultMessage.textContent = "AWESOME JOB! ✨";
        } else if (percentage >= 60) {
            resultMessage.textContent = "GOOD WORK! 💙";
        } else {
            resultMessage.textContent = "KEEP GOING! 🌱";
        }
    }

    const circle = document.querySelector(".score-circle");
    if (circle) {
        const degrees = percentage * 3.6;
        circle.style.background = `conic-gradient(
            #9188ff 0deg,
            #9188ff ${degrees}deg,
            rgba(255,255,255,0.08) ${degrees}deg
        )`;
    }
}

/* =====================================================
TRY AGAIN
===================================================== */
const retryBtn = document.getElementById("retry-button");
if (retryBtn) {
    retryBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        startQuiz();
    });
}

/* =====================================================
HOME PAGE
===================================================== */
const homeBtn = document.getElementById("home-button");
if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        selectedSubject = null;
        selectedChapter = null;
        selectedDifficulty = null;
        questionCount = null;
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;

        document.querySelectorAll(".difficulty, .count").forEach(button => {
            button.classList.remove("selected");
        });

        showPage(homePage);
    });
}

/* =====================================================
BACK BUTTON
===================================================== */
const backBtn = document.getElementById("back-button");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        showPage(homePage);
    });
}

/* =====================================================
START APP
===================================================== */
renderSubjects();