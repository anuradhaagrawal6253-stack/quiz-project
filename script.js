// Sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// Fashion questions
let questions = [
    {
        question: "Which fabric is best for summer wear?",
        options: ["Wool", "Cotton", "Leather", "Velvet"],
        answer: 1,
        image: "images/cotton.jpg"
    },
    {
        question: "What does 'OOTD' stand for?",
        options: [
            "Out Of The Day",
            "Outfit Of The Day",
            "Original Outfit Design",
            "Order Of The Dress"
        ],
        answer: 1,
        image: "images/ootd.jpg"
    },
    {
        question: "Which is a classic color combination?",
        options: ["Pink & Orange", "Red & Green", "Black & White", "Purple & Yellow"],
        answer: 2,
        image: "images/blackwhite.jpg"
    },
    {
        question: "Which accessory completes a formal outfit?",
        options: ["Sneakers", "Cap", "Tie", "Backpack"],
        answer: 2,
        image: "images/tie.jpg"
    },
    {
        question: "Denim is mainly used to make?",
        options: ["Sarees", "Jeans", "Scarves", "Curtains"],
        answer: 1,
        image: "images/jeans.jpg"
    }
];

// Randomize questions
questions.sort(() => Math.random() - 0.5);

// Display questions
const quizDiv = document.getElementById("quiz");

questions.forEach((q, index) => {
    let html = `
        <p>${index + 1}. ${q.question}</p>
        <img src="${q.image}">
    `;

    q.options.forEach((option, i) => {
        html += `
            <input type="radio" name="q${index}" value="${i}">
            ${option}<br>
        `;
    });

    quizDiv.innerHTML += html;
});

// Timer logic
let timeLeft = 30;

let timer = setInterval(() => {
    document.getElementById("timer").innerText =
        "Time Left: " + timeLeft + "s";

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        submitQuiz();
    }
}, 1000);

// Submit quiz
function submitQuiz() {
    clearInterval(timer);

    let score = 0;

    questions.forEach((q, index) => {
        let selected = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (selected && parseInt(selected.value) === q.answer) {
            score++;
            correctSound.play();
        } else {
            wrongSound.play();
        }
    });

    let percentage = (score / questions.length) * 100;

    let title = "";
    if (percentage >= 80) {
        title = "Fashion Icon 👑";
    } else if (percentage >= 50) {
        title = "Style Savvy 😎";
    } else {
        title = "Fashion Beginner 👟";
    }

    document.getElementById("result").innerHTML =
        `Score: ${score}/${questions.length}<br>
         Percentage: ${percentage}%<br>
         Result: ${title}`;
}

// Share score
function shareScore() {
    const resultText = document.getElementById("result").innerText;
    const shareText = `I just took the Fashion Quiz 👗✨\n${resultText}`;

    if (navigator.share) {
        navigator.share({ text: shareText });
    } else {
        alert("Copy and share your score:\n\n" + shareText);
    }
}