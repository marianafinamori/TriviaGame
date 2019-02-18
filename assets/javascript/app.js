var time = 25;
var minutes;
var seconds;
var intervalId;
var btn;
var btn2;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

 var questions = [
     {question: "Name Andy Warhol's New York City studio",
    options: ["Brillo", "Factory", "Superstar", "Eddie", "Chelsea"],
    answer: "Factory"},

    {question: "In which city is Alexander Platz located?",
    options: ["Amsterdam", "Zurich", "Leipzig", "Salzberg", "Berlin"],
    answer: "Berlin"},

    {question: "In which city was Pablo Picasso born?",
    options: ["Barcelona", "Madrid", "Málaga", "Bilbao", "Valencia"],
    answer: "Málaga"},

    {question: 'What is LEGO origin?',
    options: ["Sweden", "Norway", "England", "Denmark", "Netherlands"],
    answer: "Denmark"}
];

    window.onload = function() {
        //Create a button START
        btn = document.createElement('button');
        //Show button on screen
        btn.innerHTML = "Start";
        $("#button-container").append(btn);
        //Add event listener "CLICK" to the button and run a function
        btn.addEventListener ('click', function start() {
            //Start the timer
            intervalId = setInterval(countDown, 1000);
            //Through the array, for each object
            for (var i=0; i <questions.length; i++) {
                //Create <p> tag to hold the questions
                var question = document.createElement('p');
                //Place the question from the array in its <p> tag
                question.innerHTML = questions[i].question;
                //Append the <p> tag with the question held in the tag
                 $("#quizz").append(question);
                    //Iterating the options array
                    for (var j=0; j < 5; j++) {
                        //Create an input radio to choose one single option and append to "quizz" div
                        var input = document.createElement('input');
                        $("#quizz").append('<input type="radio" name="trivia'+[i]+'" value='+questions[i].options[j]+'>'+questions[i].options[j]);
                    }
            }
            //Change buttons    
            $('button').hide();
            btn2 = document.createElement('button');
            btn2.setAttribute('id', 'done');
            btn2.innerHTML = "Done";
            $('#button2-container').append(btn2);
});

}

//Click button "done" to compare guest choice and correct answerand show the results (correct, incorrect and unanswered)
var x = $('#button2-container').on('click', function() {
    for (var i = 0; i < questions.length; i++) {

        if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == questions[i].answer) {
            correct++;
        
        } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() != questions[i].answer && $('input:radio[name="trivia' + [i]+ '"]:checked').val() != null ) {
            incorrect++;

        } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == null) {
            unanswered++;
        }
       console.log(correct);
       console.log(incorrect);
       console.log(unanswered);
    }
    results();
  
});
console.log(correct);

//This function is called every second and reduces time
function countDown() {
    time--;
    var converted = timeConverter(time);
    $('#clock').text(converted);

    if (time === 0) {
        stopClock();
        guest();
        results();
  
}
}
//Convert time in minutes, seconds and determine how time will be displayed
function timeConverter(time) {

var minutes = Math.floor(time/60);
var seconds = time - (minutes*60);

if (seconds < 10) {
    seconds = "0" + seconds;
}

if (minutes === 0) {
    minutes = "00";
}

else if (minutes < 10) {
    minutes = "0" + minutes;
}
return minutes + ":" + seconds;
}

//function called when button "done" is clicked, compare user choices and correct answers and scores guest
function guest() {
    for (var i = 0; i < questions.length; i++) {

        if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == questions[i].answer) {
            correct++;
        
        } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() != questions[i].answer && $('input:radio[name="trivia' + [i]+ '"]:checked').val() != null ) {
            incorrect++;
            
        } else if ($('input:radio[name="trivia' + [i]+ '"]:checked').val() == null) {
            unanswered++;
        }
    }
}

//Stops setInterval method
function stopClock() {
        clearInterval(intervalId);
}
//Display results
function results() {
    stopClock();
    $('#clock').empty();
    $('form').empty();
    $('#button2-container').empty();
    $('#results').append('<h4>All Done!</h4><p>correct answers:<span id="correct"> '+correct+'</span></p><p>incorrect answers:<span id="incorrect"> '+incorrect+'</span></p><p>unanswered:<span id="unanswered"> '+unanswered+'</span></p>');

}