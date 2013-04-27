module( "Initialization Tests", {
    setup: function() {
    	if(!$('#qunit-fixture').length) {
    		$('body').append('<div id="qunit-fixture"></div>');
    	} 
    	
    	$('#qunit-fixture').append('<div id="answers">Yo yo yo</div>');
    	$('#qunit-fixture').append('<div id="timeLeft">45</div>');
        
    	this.primeNumberQuiz = PrimeNumberQuiz();
    	this.primeNumberQuiz.
    }
});

test("prime number quiz can be instantiated", function(){
	ok(this.primeNumberQuiz);
});

test("quiz is not started before start button is pressed", function(){
	ok(!this.primeNumberQuiz.isQuizStarted());
});

test("quiz is started after start button is pressed", function(){
	this.primeNumberQuiz.startQuiz();
	
	ok(this.primeNumberQuiz.isQuizStarted());
});

test("answers div is cleared out when quiz is started", function(){
	this.primeNumberQuiz.startQuiz();
	console.log("Hello: " + $('#qunit-fixture').html());
	deepEqual("", $('#answers').html());
});

test("timer is reset to 0 when quiz is started", function(){
	this.primeNumberQuiz.startQuiz();
	
	deepEqual("0", $('#timeLeft').html());
});

module( "Timer Tests", {
    setup: function() {
    	if(!$('#qunit-fixture').length) {
    		$('body').append('<div id="qunit-fixture"></div>');
    	} 
    	$('#qunit-fixture').append('<div id="answers">Yo yo yo</div>');
    	$('#qunit-fixture').append('<div id="timeLeft">45</div>');
        
    	this.clock = sinon.useFakeTimers();
    	this.primeNumberQuiz = PrimeNumberQuiz();
    }
});

test("timer is 0 after quiz is started and less than one second has passed", function(){
	this.primeNumberQuiz.startQuiz();
	this.clock.tick(999);
	
	deepEqual("0", $('#timeLeft').html());
});

test("timer is incremented to 1 after quiz is started and one second has passed", function(){
	this.primeNumberQuiz.startQuiz();
	this.clock.tick(1001);
	
	deepEqual("1", $('#timeLeft').html());
});

test("timer is incremented to 2 after quiz is started and two seconds have passed", function(){
	this.primeNumberQuiz.startQuiz();
	this.clock.tick(2001);
	
	deepEqual("2", $('#timeLeft').html());
});

test("timer is incremented to 15 after quiz is started and 15 seconds have passed", function(){
	this.primeNumberQuiz.startQuiz();
	this.clock.tick(15001);
	
	deepEqual("15", $('#timeLeft').html());
});

test("timer is NOT incremented after quiz is started and more than 15 seconds have passed", function(){
	this.primeNumberQuiz.startQuiz();
	this.clock.tick(16000);
	
	deepEqual("15", $('#timeLeft').html());
});

test("quiz ends after 15 seconds have passed", function(){
	this.primeNumberQuiz.startQuiz();
	ok(this.primeNumberQuiz.isQuizStarted());
	this.clock.tick(16000);
	
	ok(!this.primeNumberQuiz.isQuizStarted());
});

module( "Quiz Tests", {
    setup: function() {
    	if(!$('#qunit-fixture').length) {
    		$('body').append('<div id="qunit-fixture"></div>');
    	} 
    	$('#qunit-fixture').append('<div id="answers">Yo yo yo</div>');
    	$('#qunit-fixture').append('<div id="timeLeft">45</div>');
    	$('#qunit-fixture').append('<<input type="text" name="numberInput" id="numberInput">');
    	$('#qunit-fixture').append('<input type="button" name="submitButton" id="submitButton" value="Submit">');
        
    	this.clock = sinon.useFakeTimers();
    	this.primeNumberQuiz = PrimeNumberQuiz();
    }
});

test("correct entry is added to answer area on submit after quiz is started", function(){
	this.primeNumberQuiz.startQuiz();
	
	$('#numberInput').val("1");
	$('#submitButton').click();
	
	deepEqual('<div class="correct">1</div>', $('#answers').html());
});

test("incorrect entry is added to answer area on submit after quiz is started", function(){
	this.primeNumberQuiz.startQuiz();
	
	$('#numberInput').val("4");
	$('#submitButton').click();
	
	deepEqual('<div class="incorrect">4</div>', $('#answers').html());
});

test("number entry area is cleared after a submit", function(){
	this.primeNumberQuiz.startQuiz();
	
	$('#numberInput').val("4");
	$('#submitButton').click();
	
	deepEqual($('#numberInput').val(), '');
});

test("answers are appended to previous answers", function(){
	this.primeNumberQuiz.startQuiz();
	
	$('#numberInput').val("1");
	$('#submitButton').click();
	$('#numberInput').val("4");
	$('#submitButton').click();
	
	ok($('#answers').html().indexOf('<div class="correct">1</div>') >= 0);
	ok($('#answers').html().indexOf('<div class="incorrect">4</div>') >= 0);
});

test("answers are not added after 15 seconds", function(){
	this.primeNumberQuiz.startQuiz();
	
	this.clock.tick(16000);
	
	$('#numberInput').val("1");
	$('#submitButton').click();
	
	ok($('#answers').html().indexOf('<div class="correct">1</div>') < 0);
});
