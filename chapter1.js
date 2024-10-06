const questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Function to load the current question into the UI
function loadQuestion() {
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answers');
    const titleContainer = document.getElementById('chapter-title');
    const scenarioContainer = document.getElementById('scenario');
    const nextButton = document.getElementById('next-button');

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        titleContainer.textContent = currentQuestion.title;
        scenarioContainer.textContent = currentQuestion.scenario;
        questionContainer.textContent = currentQuestion[`question-${currentQuestionIndex + 1}`];
        
        // Clear previous answers
        answerContainer.innerHTML = '';

        // Populate answers
        currentQuestion.options.forEach((option) => {
            const answerButton = document.createElement('button');
            answerButton.textContent = option.text;
            answerButton.onclick = () => handleAnswer(option.option, currentQuestion.correct);
            answerContainer.appendChild(answerButton);
        });

        nextButton.style.display = 'none'; // Hide next button initially
    } else {
        showResult(); // Show result if there are no more questions
    }
}

// Function to handle answer selection
function handleAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++; // Increment score for correct answer
        console.log('Correct answer!');
    } else {
        console.log('Wrong answer!');
    }

    // Show the next button after answering
    document.getElementById('next-button').style.display = 'block';
}

// Function to show results after the quiz
function showResult() {
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answers');
    questionContainer.textContent = `Quiz completed! Your score: ${score} out of ${questions.length}`;
    answerContainer.innerHTML = '';
    document.getElementById('next-button').style.display = 'none'; // Hide next button
}

// Fetch the questions from the JSON file
fetch('chapter1.json') // Ensure the path is correct
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        questions.push(...data.chapters); // Load chapters
        loadQuestion(); // Load the first question
    })
    .catch(error => console.error('Error loading JSON:', error));
