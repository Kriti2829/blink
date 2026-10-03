const gameArea = document.getElementById("gameArea");
if(gameArea){
const reactionLogo = document.getElementById("reactionLogo");
const gameTitle = document.getElementById("gameTitle");
const instruction = document.getElementById("instruction");
const message = document.getElementById("message");
let gameStarted = false;
let waiting = false;
let startTime;
let timeout;
gameArea.addEventListener("click", function() {
    // START THE GAME
    if (!gameStarted) {
        gameStarted = true;
        waiting = true;
        gameArea.style.backgroundColor = "red";
        reactionLogo.style.display = "none";
        gameTitle.style.display = "none";
        instruction.style.display = "none";
        message.innerText = "... wait for green";
        let randomTime = Math.random() * 3000 + 1000;
        timeout = setTimeout(function() {
            gameArea.style.backgroundColor = "green";
            message.innerText = "CLICK!";
            startTime = Date.now();
            waiting = false;
        }, randomTime);
    }
    // CLICKED TOO EARLY
    else if (waiting) {
        clearTimeout(timeout);
        gameArea.style.backgroundColor = "white";
        message.innerText = "Too early!";
        gameStarted = false;
        waiting = false;
    }
    // CLICKED AFTER GREEN
    else {
        let endTime = Date.now();
        let reactionTime = endTime - startTime;
        gameArea.style.backgroundColor = "white";
        reactionLogo.style.display = "block";
        gameTitle.style.display = "block";
        instruction.style.display = "block";
        message.innerText =
            "Your reaction time: " + reactionTime + " ms";
        instruction.innerText = "Click to start again";
        gameStarted = false;
    }
});
}
// NUMBER MEMORY GAME
const numberGameArea = document.getElementById("numberGameArea");
if (numberGameArea) {
    const numberMemoryLogo = document.getElementById("numberMemoryLogo");
    const numberGameTitle = document.getElementById("numberGameTitle");
    const numberInstruction = document.getElementById("numberInstruction");
    const startButton = document.getElementById("startButton");
    const levelText = document.getElementById("level");
    const numberDisplay = document.getElementById("numberDisplay");
    const timerLine = document.getElementById("timerLine");
    const question = document.getElementById("question");
    const numberInput = document.getElementById("numberInput");
    const result = document.getElementById("result");
    const tryAgainButton = document.getElementById("tryAgainButton");
    let currentLevel = 1;
    let correctNumber = "";
    // START BUTTON
    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        numberMemoryLogo.style.display = "none";
        numberGameTitle.style.display = "none";
        numberInstruction.style.display = "none";
        levelText.innerText = "Level " + currentLevel;
        showNumber();
    });
    // SHOW RANDOM NUMBER
    function showNumber() {
        correctNumber = "";
        for (let i = 0; i < currentLevel; i++) {
            correctNumber += Math.floor(Math.random() * 10);
        }
        numberDisplay.innerText = correctNumber;
        startTimer();
    }
    // TIMER
    function startTimer() {
        timerLine.style.display = "block";
        timerLine.style.width = "300px";
        timerLine.style.backgroundColor = "black";
        let timer = 2000 + (currentLevel * 300);
        timerLine.style.transition =
            "width " + timer + "ms linear";
        setTimeout(function() {
            timerLine.style.width = "0px";
        }, 10);
        setTimeout(function() {
            numberDisplay.innerText = "";
            timerLine.style.display = "none";
            askForNumber();
        }, timer);
    }
    // ASK FOR NUMBER
    function askForNumber() {
        question.innerText = "What was the number?";
        numberInput.style.display = "block";
        numberInput.value = "";
        numberInput.focus();
    }
    // PRESS ENTER
    numberInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    // CHECK ANSWER
    function checkAnswer() {
        let userNumber = numberInput.value;
        numberInput.style.display = "none";
        question.innerText = "";
        // CORRECT
        if (userNumber === correctNumber) {
            result.innerText =
                "Your number: " + userNumber +
                "\nCorrect number: " + correctNumber +
                "\n\nLevel " + currentLevel;
            currentLevel++;
            setTimeout(function() {
                result.innerText = "";
                levelText.innerText =
                    "Level " + currentLevel;
                timerLine.style.display = "block";
                showNumber();
            }, 1500);
        }
        // WRONG
        else {
            result.innerText =
                "Your number: " + userNumber +
                "\nCorrect number: " + correctNumber +
                "\n\nLevel " + currentLevel;
            tryAgainButton.style.display = "block";
        }
    }
    // TRY AGAIN
    tryAgainButton.addEventListener("click", function() {
        currentLevel = 1;
        result.innerText = "";
        tryAgainButton.style.display = "none";
        levelText.innerText = "";
        timerLine.style.display = "block";
        showNumber();
    });
}
// TYPING TEST
const typingGameArea = document.getElementById("typingGameArea");
if (typingGameArea) {
    const typingLogo = document.getElementById("typingLogo");
    const typingGameTitle = document.getElementById("typingGameTitle");
    const typingInstruction = document.getElementById("typingInstruction");
    const typingMessage = document.getElementById("typingMessage");
    const typingTimer = document.getElementById("typingTimer");
    const typingText = document.getElementById("typingText");
    const typingResult = document.getElementById("typingResult");
    const typingWpm = document.getElementById("typingWpm");
    const typingAccuracy = document.getElementById("typingAccuracy");
    const typingTime = document.getElementById("typingTime");
    // PARAGRAPHS
    const paragraphs = [
        "Morning routines often begin quietly, with sunlight entering through the window and the sound of birds outside. A few minutes of planning can make the entire day feel more organized. Small habits may seem unimportant at first, but repeating them regularly can make difficult tasks much easier.",
        "Learning something new takes patience, practice, and a willingness to make mistakes. At first, a difficult skill may seem confusing, but regular effort slowly makes it easier. The most important thing is to keep practicing instead of expecting perfect results from the very beginning.",
        "A peaceful walk through a busy city can reveal many interesting details. People hurry toward their destinations, shops open their doors, and vehicles move through crowded streets. Taking a moment to observe everything around you can make an ordinary journey feel surprisingly interesting.",
        "Technology has changed the way people learn, communicate, and work. Information that once required hours of research can now be found within seconds. However, having access to information is only the beginning. Understanding how to use that information wisely is an equally important skill.",
        "Rainy evenings have a special atmosphere that can make everything feel slower and calmer. The sound of water against windows creates a peaceful background while people stay indoors. A warm drink, a comfortable chair, and a good book can turn an ordinary evening into a relaxing experience.",
        "Good communication is not only about speaking clearly but also about listening carefully. People often understand each other better when they take time to hear different opinions. Asking questions, paying attention, and responding respectfully can make conversations more meaningful and productive.",
        "The night sky can make the world feel much larger than it usually does. Thousands of stars appear above us, even though most are incredibly far away. Looking at them can remind us that there is always something new to discover beyond what we already understand.",
        "A successful project usually begins with a simple idea and develops through many small improvements. Mistakes are a normal part of the process, and fixing them teaches valuable lessons. Instead of trying to create everything perfectly at once, it is often better to build something and improve it step by step.",
        "Books can take readers to places they have never visited and introduce them to people they have never met. A good story can change the way someone thinks about an idea or situation. Reading regularly also improves vocabulary, imagination, and the ability to understand different perspectives.",
        "Every day gives us another opportunity to learn something useful. It could be a new word, a programming concept, a practical skill, or simply a lesson from an experience. Progress does not always happen quickly, but consistent effort can create impressive results."
    ];
    // VARIABLES
    let currentParagraph = "";
    let currentIndex = 0;
    let startTime = 0;
    let timerStarted = false;
    let timerInterval = null;
    let correctCharacters = 0;
    let typingStarted = false;
    let typingFinished = false;
    // CHOOSE RANDOM PARAGRAPH
    function chooseParagraph() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * paragraphs.length);
        } while (paragraphs[randomIndex] === currentParagraph);
        currentParagraph = paragraphs[randomIndex];
    }
    // DISPLAY PARAGRAPH
    function displayParagraph() {
        typingText.innerHTML = "";
        for (let i = 0; i < currentParagraph.length; i++) {
            const span = document.createElement("span");
            span.innerText = currentParagraph[i];
            typingText.appendChild(span);
        }
        currentIndex = 0;
        typingText.children[0].classList.add("typing-current");
    }
    // START TIMER
    function startTimer() {
        typingTimer.style.display = "block";
        typingTimer.innerText ="Time: 0.0 s";
        timerInterval =setInterval(function () {
                const currentTime =Date.now();
                const elapsedTime =(currentTime - startTime) / 1000;
                typingTimer.innerText ="Time: " + elapsedTime.toFixed(1) + " s";
            }, 100);
    }
    // START TYPING TEST
    function startTypingTest() {
        chooseParagraph();
        displayParagraph();
        typingLogo.style.display = "none";
        typingGameTitle.style.display = "none";
        typingInstruction.style.display ="none";
        typingMessage.style.display ="none";
        typingTimer.style.display ="none";
        typingText.style.display ="block";
        typingResult.style.display ="none";
        currentIndex = 0;
        startTime = 0;
        timerStarted = false;
        correctCharacters = 0;
        typingStarted = true;
        typingFinished = false;
    }
    // FINISH TEST
    function finishTypingTest() {
        clearInterval(timerInterval);
        const endTime =Date.now();
        const totalTime = (endTime - startTime) / 1000;
        /*Accuracy is based on the characters that are correct in the complete paragraph.*/
        const accuracy =(correctCharacters /currentParagraph.length) * 100;
        /* 5 characters = 1 word*/
        const words =currentParagraph.length / 5;
        const minutes =totalTime / 60;
        const wpm =words / minutes;
        typingText.style.display ="none";
        typingTimer.style.display ="none";
        typingResult.style.display ="block";
        typingWpm.innerText ="WPM: " +Math.round(wpm);
        typingAccuracy.innerText ="Accuracy: " +accuracy.toFixed(1) +"%";
        typingTime.innerText ="Time: " +totalTime.toFixed(1) +" seconds";
        typingFinished = true;
    }
    // RESET TEST
    function resetTypingTest() {
        clearInterval(timerInterval);
        typingText.style.display ="none";
        typingTimer.style.display ="none";
        typingResult.style.display ="none";
        typingLogo.style.display ="block";
        typingGameTitle.style.display ="block";
        typingInstruction.style.display ="block";
        typingMessage.style.display ="block";
        typingMessage.innerText ="Click anywhere to start";
        currentIndex = 0;
        startTime = 0;
        timerStarted = false;
        correctCharacters = 0;
        typingStarted = false;
        typingFinished = false;
    }
    // CLICK TO START / RESTART
    typingGameArea.addEventListener("click", function () {
            // START SCREEN
            if (!typingStarted && !typingFinished) {
                startTypingTest();
            }
            // RESULT SCREEN
            else if (typingFinished) {
                resetTypingTest();
            }
        }
    );
    // KEYBOARD
    document.addEventListener("keydown",function (event) {
            // TEST NOT STARTED
            if (!typingStarted) {
                return;
            }
            // TEST FINISHED
            if (typingFinished) {
                return;
            }
            // BACKSPACE
            if (event.key === "Backspace") {
                event.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    const previousSpan =typingText.children[currentIndex];
                    // Check whether previous character was correct
                    const wasCorrect = previousSpan.classList.contains("typing-correct");
                    // Remove old result
                    previousSpan.classList.remove("typing-correct");
                    previousSpan.classList.remove("typing-wrong");
                    // Remove cursor from the character ahead
                    if (typingText.children[currentIndex + 1]) {
                        typingText.children[currentIndex + 1].classList.remove("typing-current");
                    }
                    // Put cursor back
                    previousSpan.classList.add("typing-current");
                    // If it was correct,remove it from correct count
                    if (wasCorrect && correctCharacters > 0) {
                        correctCharacters--;
                    }
                }
                return;
            }
            // IGNORE SPECIAL KEYS
            if (event.key.length !== 1) {
                return;
            }
            // START TIMER ON FIRST CHARACTER
            if (!timerStarted) {
                startTime =Date.now();
                timerStarted = true;
                startTimer();
            }
            // CHARACTER FROM PARAGRAPH
            const currentCharacter = currentParagraph[currentIndex];
            // CHARACTER USER TYPED
            const typedCharacter = event.key;
            // CURRENT SPAN
            const currentSpan = typingText.children[currentIndex];
            // CORRECT CHARACTER
            if (typedCharacter ===currentCharacter) {
                currentSpan.classList.add("typing-correct");
                currentSpan.classList.remove("typing-wrong");
                correctCharacters++;
            }
            // WRONG CHARACTER
            else {
                currentSpan.classList.add( "typing-wrong");
                currentSpan.classList.remove("typing-correct");
            }
            // REMOVE CURRENT CURSOR
            currentSpan.classList.remove("typing-current");
            // MOVE FORWARD
            currentIndex++;
            // NEXT CHARACTER
            if (currentIndex <currentParagraph.length) {
                typingText.children[currentIndex].classList.add("typing-current");
            }
            // PARAGRAPH COMPLETE
            else {
                finishTypingTest();
            }
        }
    );
}
// VISUAL MEMORY TEST
const visualMemoryGameArea =document.getElementById("visualMemoryGameArea");
if (visualMemoryGameArea) {
    // GET HTML ELEMENTS
    const visualMemoryIntro = document.getElementById("visualMemoryIntro");
    const visualMemoryStartButton = document.getElementById("visualMemoryStartButton");
    const visualMemoryGame = document.getElementById("visualMemoryGame");
    const visualMemoryLevel = document.getElementById("visualMemoryLevel");
    const memoryBoxes = document.querySelectorAll(".memoryBox");
    const visualMemoryResult = document.getElementById("visualMemoryResult");
    const visualMemoryScore = document.getElementById("visualMemoryScore");
    const visualMemoryTryAgain = document.getElementById("visualMemoryTryAgain");
    // VARIABLES
    let currentLevel = 1;
    let currentPattern = [];
    let playerIndex = 0;
    let showingPattern = false;
    let gameOver = false;
    // START BUTTON
    visualMemoryStartButton.addEventListener("click",function () {
            visualMemoryIntro.style.display ="none";
            visualMemoryResult.style.display ="none";
            visualMemoryGame.style.display ="flex";
            currentLevel = 1;
            gameOver = false;
            startLevel();
        }
    );
    // START LEVEL
    function startLevel() {
        // Show current level
        visualMemoryLevel.innerText ="Level: " + currentLevel;
        // Start from first box
        playerIndex = 0;
        // We are showing the pattern
        showingPattern = true;
        // Remove any old highlights
        memoryBoxes.forEach(function (box) {
                box.classList.remove("memory-highlight");
            }
        );
        // Create random pattern
        currentPattern = createPattern(currentLevel);
        // Show pattern
        showPattern(0);
    }
    // CREATE RANDOM PATTERN
    function createPattern(numberOfBoxes) {
        let pattern = [];
        while (pattern.length < numberOfBoxes) {
            const randomBox = Math.floor( Math.random() * 9);
            // Make sure the same box is not selected twice in the same level
            if (!pattern.includes( randomBox)) {
                pattern.push( randomBox );
            }
        }
        return pattern;
    }
    // SHOW PATTERN
    function showPattern(index) {
        // If all pattern boxes have been shown
        if (index >= currentPattern.length) {
            showingPattern = false;
            playerIndex = 0;
            return;
        }
        // Get the box number
        const boxIndex = currentPattern[index];
        const box = memoryBoxes[boxIndex];
        // Highlight the box
        box.classList.add("memory-highlight");
        // Keep it highlighted for 700 milliseconds
        setTimeout(function () {
                // Remove highlight
                box.classList.remove("memory-highlight");
                // Small gap before next box appears
                setTimeout(function () {
                        showPattern(index + 1);
                    },300);
            },700);
    }
    // USER CLICKS A BOX
    memoryBoxes.forEach(function (box, index) {
            box.addEventListener("click",function () {
                    // Don't allow clicks while pattern is showing
                    if (showingPattern) {
                        return;
                    }
                    // Don't allow clicks after game over
                    if (gameOver) {
                        return;
                    }
                    // CHECK CLICK
                    if (index ===currentPattern[playerIndex]) {
                         box.classList.add("memory-highlight");
                        // Correct box
                        playerIndex++;
                        // PATTERN COMPLETE
                        if (playerIndex ===currentPattern.length) {
                            // Level 9 is maximum
                            if ( currentLevel === 9) {
                                finishGame();
                                return;
                            }
                            // Go to next level
                            currentLevel++;
                            // Small delay before next pattern
                            setTimeout(function () {
                                    startLevel();
                                }, 500);
                        }
                    }
            // WRONG BOX
                    else {
                        finishGame();
                    }
                }
            );
        }
    );
// GAME OVER
    function finishGame() {
        gameOver = true;
        showingPattern = false;
        visualMemoryGame.style.display ="none";
        visualMemoryResult.style.display = "flex";
        visualMemoryScore.innerText ="You reached Level " +currentLevel;
    }
// TRY AGAIN
    visualMemoryTryAgain.addEventListener("click",function () {
            visualMemoryResult.style.display ="none";
            visualMemoryGame.style.display ="flex";
            currentLevel = 1;
            gameOver = false;
            startLevel();
        }
    );
}
// SIGN UP

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("signupConfirmPassword").value;
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
    document.getElementById("signupMessage").innerText =
        "Please fill in all fields.";
    return;
}
if (password !== confirmPassword) {
    document.getElementById("signupMessage").innerText =
        "Passwords do not match.";
    return;
}
if (password.length < 6) {
    document.getElementById("signupMessage").innerText =
        "Password must be at least 6 characters.";
    return;
}
if (!email.includes("@")) {
    document.getElementById("signupMessage").innerText =
        "Please enter a valid email.";
    return;
}
const user = {
    name: name,
    email: email,
    password: password
};
localStorage.setItem("user", JSON.stringify(user));
document.getElementById("signupMessage").innerText =
    "Account created successfully!";
    setTimeout(function() {
    window.location.href = "login.html";
}, 1000);

    });

}
// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            document.getElementById("loginMessage").innerText =
                "No account found. Please sign up first.";
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            localStorage.setItem("isLoggedIn", "true");

            document.getElementById("loginMessage").innerText =
                "Login successful!";

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            document.getElementById("loginMessage").innerText =
                "Invalid email or password.";

        }

    });

}
