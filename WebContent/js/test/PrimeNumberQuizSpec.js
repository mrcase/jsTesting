describe("Before quiz start", function() {
	beforeEach(function () {
		this.primeNumberQuiz = PrimeNumberQuiz();
	  });
	
    it("prime number quiz can be constructed", function() {
        expect(this.primeNumberQuiz).toBeTruthy();
    });
    
    it("quiz is not started", function() {
        expect(this.primeNumberQuiz.isQuizStarted()).toBeFalsy();
    });
});

describe("After start button is pressed and before any entries are made", function() {
	beforeEach(function () {
		this.primeNumberQuiz = PrimeNumberQuiz();
		$('#fixture').remove();
		$('body').append('<div id="fixture"></div>');
		$('#fixture').append('<div id="answers">Yo yo yo</div>');
    	$('#fixture').append('<div id="timeLeft">45</div>');

	  });
	
	it("quiz is started", function(){
		this.primeNumberQuiz.startQuiz();
		
		expect(this.primeNumberQuiz.isQuizStarted()).toBeTruthy();
	});
	
	it("answers div is cleared out", function(){
		this.primeNumberQuiz.startQuiz();
		
		var answerHtml = $('#answers').html();
		
		expect(answerHtml).toEqual("");
	});
	
	it("timer is reset to 0", function(){
		this.primeNumberQuiz.startQuiz();
		
		expect($('#timeLeft').html()).toEqual("0");
	});
});

describe("After start button is pressed the timer", function() {
	beforeEach(function () {
		$('#fixture').remove();
		$('body').append('<div id="fixture"></div>');
		$('#fixture').append('<div id="answers">Yo yo yo</div>');
		$('#fixture').append('<div id="timeLeft">45</div>');
		
		this.clock = sinon.useFakeTimers();
		
		this.primeNumberQuiz = PrimeNumberQuiz();
	  });

	it("is 0 when less than one second has passed", function(){
		this.primeNumberQuiz.startQuiz();
		this.clock.tick(999);
		
		expect($('#timeLeft').html()).toEqual("0");
	});
	
	it("is incremented to 1 after one second has passed", function(){
		this.primeNumberQuiz.startQuiz();
		this.clock.tick(1001);
		
		expect($('#timeLeft').html()).toEqual("1");
	});
	
	it("is incremented to 2 after two seconds have passed", function(){
		this.primeNumberQuiz.startQuiz();
		this.clock.tick(2001);
		
		expect($('#timeLeft').html()).toEqual("2");
	});
	
	it("is incremented to 15 after 15 seconds have passed", function(){
		this.primeNumberQuiz.startQuiz();
		this.clock.tick(15001);
		
		expect($('#timeLeft').html()).toEqual("15");
	});

	it("is NOT incremented after more than 15 seconds have passed", function(){
		this.primeNumberQuiz.startQuiz();
		this.clock.tick(16000);
		
		expect($('#timeLeft').html()).toEqual("15");
	});
	
	it("quiz ends after 15 seconds have passed", function(){
		this.primeNumberQuiz.startQuiz();
		expect(this.primeNumberQuiz.isQuizStarted()).toBeTruthy();
		this.clock.tick(16000);
		
		expect(this.primeNumberQuiz.isQuizStarted()).toBeFalsy();
	});
});

describe("After start button is pressed and an entry is submitted", function() {
	beforeEach(function () {
		$('#fixture').remove();
		$('body').append('<div id="fixture"></div>');
		$('#fixture').append('<div id="answers">Yo yo yo</div>');
		$('#fixture').append('<div id="timeLeft">45</div>');
		$('#fixture').append('<<input type="text" name="numberInput" id="numberInput">');
    	$('#fixture').append('<input type="button" name="submitButton" id="submitButton" value="Submit">');
		
		this.clock = sinon.useFakeTimers();
		
		this.primeNumberQuiz = PrimeNumberQuiz();
	  });
	
	it("a correct entry is added to answer area", function(){
		this.primeNumberQuiz.startQuiz();
		
		$('#numberInput').val("1");
		$('#submitButton').click();
		
		expect($('#answers').html()).toEqual('<div class="correct">1</div>');
	});
	
	it("an incorrect entry is added to answer area", function(){
		this.primeNumberQuiz.startQuiz();
		
		$('#numberInput').val("4");
		$('#submitButton').click();
		
		expect($('#answers').html()).toEqual('<div class="incorrect">4</div>');
	});
	
	it("the number entry area is cleared", function(){
		this.primeNumberQuiz.startQuiz();
		
		$('#numberInput').val("4");
		$('#submitButton').click();
		
		expect($('#numberInput').html()).toEqual('');
	});
	
	it("answers are appended to previous answers", function(){
		this.primeNumberQuiz.startQuiz();
		
		$('#numberInput').val("1");
		$('#submitButton').click();
		$('#numberInput').val("4");
		$('#submitButton').click();
		
		expect($('#answers').html()).toContain('<div class="correct">1</div>');
		expect($('#answers').html()).toContain('<div class="incorrect">4</div>');
	});
	
	it("answers are not added after 15 seconds", function(){
		this.primeNumberQuiz.startQuiz();
		
		this.clock.tick(16000);
		
		$('#numberInput').val("1");
		$('#submitButton').click();
		
		expect($('#answers').html()).not.toContain('<div class="correct">1</div>');
	});
});	



