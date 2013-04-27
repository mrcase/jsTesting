
function PrimeNumberQuiz() {
	var quizStarted = false;
	var secondsElapsed = 1;
	
	var incrementSecondsElapsed = function() {
		$('#timeLeft').html(secondsElapsed);
		secondsElapsed++;
	};
	
	var endQuiz = function(intervalId) {
		window.clearInterval(intervalId);
		quizStarted = false;
	};
	
	var resetPageState = function() {
		$('#answers').empty();
		$('#timeLeft').html("0");
		
		quizStarted = true;
	};
	
	var handleSubmitting = function() {
		if(quizStarted) {
			var submittedAnswer = $('#numberInput').val();
			var answerClass = isPrime(submittedAnswer) ? 'correct' : 'incorrect';
			
			var displayAnswer = $('<div>').addClass(answerClass).append(submittedAnswer);
			$('#answers').append(displayAnswer);
			$('#numberInput').val('');
		}
	};
	
	
	var runQuizTimer = function() {
		var intervalId = window.setInterval(function(){incrementSecondsElapsed();},1000);
		window.setTimeout(function(){endQuiz(intervalId);}, 15100);
	};
	
	var isPrime = function(num) {
        var result = true;
        if (num !== 2) {
            if (num % 2 == 0) {
                result = false;
            } else {
                for (var x=3; x<=Math.sqrt(num); x+=2) {
                    if (num % x == 0) result = false;
                }
            }
        }
        return result;
    };
	
	var generateObj = function() {
		return {
			startQuiz: function(){
				resetPageState();
				
				$('#submitButton').click(handleSubmitting);
				
				runQuizTimer();
			},
			
			isQuizStarted: function(){
				return quizStarted;
			}
		};
		
	};
	
	return generateObj();
}