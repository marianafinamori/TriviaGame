let time = 20;
let minutes;
let seconds;
let intervalId;
let btnStart;
let btnDone;
let btnStartOver;
let choiceVariable;
let pack;
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let answered = 0;


 const options = [
     {question: "What was the name of Andy Warhol's studio?",
    choices: ["Brillo", "Factory", "Superstar", "Eddie", "Chelsea"],
    answer: "Factory"},

    {question: "In which city is Alexander Platz located?",
    choices: ["Amsterdam", "Zurich", "Leipzig", "Salzberg", "Berlin"],
    answer: "Berlin"},

    {question: "In which city was Pablo Picasso born?",
    choices: ["Barcelona", "Madrid", "Málaga", "Bilbao", "Valencia"],
    answer: "Málaga"},

    {question: 'What is LEGO origin?',
    choices: ["Sweden", "Norway", "England", "Denmark", "Netherlands"],
    answer: "Denmark"},

    {question: "Which architect designed the Guggeinheim Museum in New York?",
    choices: ["Frank Gehry", "Frank Lloyd Wright", "Renzo Piano", "Phillip Johnson", "Le Corbusier"],
    answer: "Frank Lloyd Wright"}

];

const createStart = () => {
    //Create a button START
    btnStart = document.createElement('button')
    btnStart.setAttribute("id", 'start-btn');
    //Show button on screen
    btnStart.innerHTML = "START";
    $("#btn-start-container").append(btnStart);
    //Add event listener "CLICK" to the button and run a function
    btnStart.addEventListener ('click', start)    
}

let start = () => {
    // $('#start-over-btn').hide();
    $('#results').empty();
    $('#btn-startover-container').empty();
    $('#your-score', "#correct", "#incorrect", "unanswered").remove();
    console.log("REMOVE")
    time = 20;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    answered = 0;
    //Start the timer
    // intervalId = setInterval(countDown, 1000);
    //Through the array, for each object
    options.forEach((option, index) => {
        const pack = document.createElement('div')
        pack.setAttribute("id", "pack" + options.indexOf(option))
        pack.setAttribute("class", "pack")
        console.log("option index = " + options.indexOf(option))
        const questionVariable = document.createElement('h5')
        questionVariable.setAttribute("class", "each-question")
        questionVariable.innerHTML = option.question;
        console.log(questionVariable)
        pack.append(questionVariable)
        console.log(pack)
        console.log(option.choices)
        option.choices.forEach((choice) => {
            choiceVariable = document.createElement('button')
            choiceVariable.setAttribute("value", choice)
            choiceVariable.setAttribute('id', choice.replace(/\s/g,'').toLowerCase())
            choiceVariable.setAttribute("class", "btn btn-dark btn-choices")
            choiceVariable.setAttribute("name", choice)
            console.log(choice)
            choiceVariable.setAttribute("display", "inline-block")
            choiceVariable.innerHTML = choice;
            console.log(choiceVariable);
            pack.append(choiceVariable)
            document.querySelector("#quizz").append(pack)
            choiceVariable.addEventListener("click", choosingAnswer)
        })

        function choosingAnswer() {
                if (this.value === option.answer) {
                    correct++
                    this.classList.add("btn-right")
                    console.log("option.answer = " + option.answer)
                    console.log("this.value = " + this.value)
                    console.log(correct)
                    console.log("correct worked")
                    answered++;
                    console.log("OPTIONS LENGTH = " + options.length)
                    console.log("ANSWERED = " + answered)
                    unanswered = options.length - answered;   
        
                } else if (this.value !== option.answer) {
                    incorrect++
                    setTimeout(()=> this.classList.add("btn-wrong"), 500)
                    option.choices.forEach(choice => { setTimeout(function() {
                            document.querySelector('#' + option.answer.replace(/\s/g,'').toLowerCase()).classList.add("btn-right")
                            console.log("HERE" + option.answer.replace(/\s/g,'').toLowerCase())
                    }, 1000)})
                    console.log("option.answer = " + option.answer)
                    console.log("this.value = " + this.value)
                    console.log(incorrect)
                    console.log("incorrect worked")
                    answered++;
                    console.log("OPTIONS LENGTH = " + options.length)
                    console.log("ANSWERED = " + answered)
                    unanswered = options.length - answered;   
                }       
        }
    })

    //Change buttons    
    $('#start-btn').hide();
    btnDone = document.createElement('button');
    btnDone.setAttribute('id', 'done-btn');
    btnDone.innerHTML = "DONE";
    $('#btn-done-container').append(btnDone);
    btnDone.addEventListener("click", done)
}; 

//FUNCTION CALLED WHEN BUTTON DONE IS CLICKED
const done = () => {
stopClock();
console.log(time)
results();
}

//FUNCTION CALLED EVERY SECOND DESCREASING TIME 
const countDown = () => {
    time--;
    let timeConverted = timeConverter(time);
    $("#clock").text(timeConverted);
    if (time <= 0) {
        stopClock();
        results();
    }
}

//DISPLAY TIME
const timeConverter =  time => {

    let minutes = Math.floor(time/60);
    let seconds = time - (minutes*60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
    minutes = "0";
    } else if (minutes < 0) {
        minutes = "0" + minutes
    }
    return minutes + ":" + seconds
}

//STOPS SETINVERVAL METHOD
const stopClock = () => {
    clearInterval(intervalId);
}

//DISPLAY RESULTS
const results = () => {
    stopClock();
    $('#clock').empty();
    $("#quizz").empty();
    $('#btn-done-container').empty();
    $('#results').append(
        `<h4 id="your-score">YOUR SCORE</h4>
        <div class="scores container">
        <div id="correct">
        <div>Correct answers</div> <h4>${correct}</h4>
        </div>
        <div id="incorrect">
        <div>Wrong answers</div> <h4>${incorrect}</h4>
        </div>
        <div id="unanswered">
        <div>Unanswered</div> <h4>${unanswered}</h4>
        </div>
        </div>`);
    createStartOver();
}

const createStartOver = () => {
    //Create a button START
    btnStartOver = document.createElement('button')
    btnStartOver.setAttribute("id", 'start-over-btn');
    //Show button on screen
    btnStartOver.innerHTML = "START OVER";
    $("#btn-startover-container").append(btnStartOver);
    //Add event listener "CLICK" to the button and run a function
    btnStartOver.addEventListener ('click', start)    
}


//function called when button "done" is clicked, compare user choices and correct answers and scores guest
// function guest() {
//     for (var i = 0; i < questions.length; i++) {

//         if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == questions[i].answer) {
//             correct++;
        
//         } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() != questions[i].answer && $('input:radio[name="trivia' + [i]+ '"]:checked').val() != null ) {
//             incorrect++;
            
//         } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == null) {
//             unanswered++;
//         }
//     }
// }