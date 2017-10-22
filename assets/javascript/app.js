//Here the variables are set and some are initialized.
        var pos = 0;        //position of array element
        var quiz;           //quiz items
        var question;       //quiz question
        var choice;         //quiz taker's response
        var chA;            //response option one
        var chB;            //response option two
        var chC;            //response option three
        var chD;            //response option four
        var correct = 0;    //count of correct responses
        var incorrect = 0;  //count of incorrect responses
        
        
        //Here is an array of arrays. Each array contains a quiz question, four possible responses to the question, and the placement of the 
        //correct response.
        var questions = [
            ["How many counties are there in New Hampshire?", "Five", "Ten", "Eight", "Eleven", "b"],
            ["What number state was New Hampshire when ratifying the constitution?", "Fifth", "Eleventh", "Ninth", "Seventh", "c"],
            ["What is New Hampshire's state rock?", "Quartz", "Granite", "Mica", "Limestone", "b"],
            ["Where is New Hampshire's highest point?", "Mount Katahdin", "Cannon Mountain", "Mount Washington", "Mount Adams", "c"],
            ["What is the background color on New Hampshire's state flag?", "Black", "Gray", "Blue", "Red", "c"],
            ["How many state parks are in New Hampshire?", "25", "42", "50", "36", "b"]
        ];

        var n=60;
        var timerFunc;
        var started = false;

        function time(){
            $("#time-left").html(n);
            n--;
            timerFunc = setTimeout(time, 1000);
            if (n===0) {
                stopCount();
            }
        }

        function startCount() {
            time();
        }

        function stopCount() {
            clearTimeout(timerFunc);
            n=60;
            $("#time-left").html(n); 
        }

        $("#stop").on("click", stopCount);


        
        function _(x) {
            return document.getElementById(x);
        } 

        $("#start").on("click", startCount);
        $("#start").on("click", renderQuestion);


        //This function evaluates the correctness of the responses, tallies the quiz results and displays the number correct and number incorrect.
        function renderQuestion() {
            quiz = _("quiz");
            incorrect = questions.length - correct;

            //This condition outputs the results and reinitializes the array position variable and the score variables, once all questions are completed.
            if (pos >= questions.length) {
                quiz.innerHTML = "<h2>Of " + questions.length + " questions, you got " + correct + " correct and " + incorrect + " incorrect.</h2>";
                pos = 0;
                correct = 0;
                incorrect = 0;
                stopCount();
                return false;
            }

            question = questions[pos][0];
            chA = questions[pos][1];
            chB = questions[pos][2];
            chC = questions[pos][3];
            chD = questions[pos][4];
            quiz.innerHTML = "<h5>" + question + "</h5>";
            quiz.innerHTML += "<input type='radio' name='choices' value='a' class='resp'> " + chA + "";
            quiz.innerHTML += "<input type='radio' name='choices' value='b' class='resp'> " + chB + "";
            quiz.innerHTML += "<input type='radio' name='choices' value='c' class='resp'> " + chC + "";
            quiz.innerHTML += "<input type='radio' name='choices' value='d' class='resp'> " + chD + "<br><br>";
            quiz.innerHTML += "<button onclick='checkAnswer()'>Next Question</button>"; 
                        
        } 

        //This function evaluates the reponse given by the quiz taker to determine whether it matches the correct response or not.
        //If the response was correct the number of correct responses is incremented by one.
        function checkAnswer() {
            choices = document.getElementsByName("choices");
            for (var i = 0; i < choices.length; i++) {
                if (choices[i].checked) {
                    choice = choices[i].value; 
                }
            }
            if (choice == questions[pos][5]) {
                correct++; 
            }
            pos++; 
            renderQuestion(); 

        }


        //This "loads" the quiz.
        addEventListener("load", renderQuestion, false);