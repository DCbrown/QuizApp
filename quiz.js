$(document).ready(function() {
$('h1').hide().delay(500).fadeIn('slow');
$('.status').hide().delay(700).fadeIn('slow');
generateQuestions();
generateAnswers();
submit();
restart();
}); 

var currentQuestion = 0;
var selectedAnswer = "";
var score = 0;
var questions = new Array();


//list of questions
function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions [0] = new Question ("In Sonic 2 after finding all the Chaos Emeralds exactly how many rings do you need to turn into Super Sonic?",["100", "40", "50", "60", "45"], 2);
questions [1] = new Question ("Which of the following games did ''Treasure'' developed?",["Sonic Blastman", "Gunstar Hero", "Streets of Rage", "Contra", "Grandia 2"], 1);
questions [2] = new Question ("What is the first game that ''Game Freak'' developed?",["Mendel Palace", "Pokemon", "Pulseman", "Yoshi", "Sin and Punishment"], 0);
questions [3] = new Question ("What game is this message from? ''It's dangerous to go alone take this.''",["Resident Evil", "Halo", "Super Mario RPG", "Chrono Trigger", "Lengend of Zelda"], 4);
questions [4] = new Question ("In the Castlvania Series, What game did Alcucard first become a playable character?",["Castlevania Legends", "Castlevania The Dracula X Chronicles", "Castlevania III: Dracula's Curse", "Castlevania: Symphony of the Night ", "Castlevania: Aria of Sorrow"], 2);
questions [5] = new Question ("Who is the voice actor for Solid Snake in Metal Gear Solid?",["Sonny Stright", "David Hayter", "Roger Craig Smith", "Greg Cipes", "Crispin Freeman"], 1);
questions [6] = new Question ("What is the name of main Villain of Final Fantasy 6?",["X Death", "Cloud of Darkness" , "Golbez", "Chaos", "Kefka"], 4);
questions [7] = new Question ("In Earthbound what Character learns PSI fire at level 3?",["Ness", "Paula", "Lucas", "Kumatora", "Poo"], 1);
questions [8] = new Question ("In Megaman X after finding all the upgrades and boss weapons who's stage can you select to acquire the Hadouken technique?",["Storm Eagle", "Gravity Beatle", "Chill Penguin ", "Armored Armadillo", "None of the above"], 3);
questions [9] = new Question ("What Mario game did the Tanooki suit made it's first appearance?",["Super Mario Bros. 3", "Super Mario World", "Super Mario Land 3D", "Super Mario RPG", "Mario Kart 7"], 0);


//questions appear
function generateQuestions() {
var q = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q + '</h4>').hide().delay(1200).fadeIn('slow');
}

//answers appear
function generateAnswers(){
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
}
$("#answers").append(write).hide().delay(1200).fadeIn('slow');
}

//radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
}

//evaluate answer 
function evaluation() {
var selected = $("input[type='radio'][name='radio']:checked");
	if (selected.length >= 0) {
    	selectedAnswer = selected.val();
	}
	if (selectedAnswer == questions [currentQuestion].correct) {
		$('#correct').append("<p>Correct!</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		$('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		playerScore();
		currentQuestion++;
	}
	
	else {
		$('#incorrect').append("<p>Incorrect.</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		$('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		currentQuestion++;
	}
}

//next question 
function nextQuestion() {
 	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 10) {
	complete();
	restart();
	return;
	}
else {
	questionNumber();
	generateQuestions();
	generateAnswers();
	submit();
	}
});

}

//set score
function playerScore() {
	$('#score p').remove();
	score++;
	$('#score').append(" " + '<p>' + score + '</p>');

}

//question marker
function questionNumber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/10</p>');
}

//final tally
function complete() {
	$('.status').hide();
	$('#heading').append("<h4>You scored" + " " + score + " " + "out of 10 <br>" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
	$('.restart').addClass('quiz-end');
}

//restart button
function restart() {
	$('.restart').click(function() {
		$('.restart').removeClass('quiz-end');
		currentQuestion = 0;
		score = (score-(score+1));
		questions [0];
		$('#score').hide().delay(400).fadeIn('slow');
		$('#question').hide().delay(400).fadeIn('slow');
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();
		questionNumber();
		generateQuestions();
		generateAnswers();
		submit();
		playerScore();
		$('.status').show();
	});
}