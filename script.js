
const counterContainer = document.querySelector('.counter');
const answers = document.querySelector('.answers').children;
const questionNumber = document.querySelector(".question-num");
const totalQuestion = document.querySelector(".total-question");
const question = document.querySelector(".question");
const correctAnswer = document.querySelector('.correct-answers');
const percent = document.querySelector('.percentage');
const totalQ = document.querySelector('.total');
const optOne = document.querySelector(".option1");
const optTwo = document.querySelector(".option2");
const optThree = document.querySelector(".option3");
const optFour = document.querySelector(".option4");
// checking for dupilcate questions
let duplicate = [];
let myArr = [];
let score = 0;

// set index to load the question and which question to load
let index; 
// set questionNum to assign number of question you are presently doing
let questionNum = 0;
// question options and answer

const questions =[
	{
		q: 'Who is the current president of Nigeria?',
		options: ['Gen. Muhammadu Buhari', 'Gen. Olusegun Mimiko', 'Gen. Sanni Abacha', 'Gen. Xylus'],	
		answer: 0
	},	
	{
		q: 'what is another word for boy?',
		options: ['Girl', 'Male', 'Female', 'None of the above'],
		answer: 1
	},
	{
		q: 'What colors are the primary colors?',
		options: ['Yellow, White and Black', 'Red, Green and Purple', 'Cyan, Green and Blue', 'Red, Green and Blue'],
		answer: 3
	},
	{
		q: 'A stage between the adolescent stage and adulthood is?',
		options: ['First stage', 'Puberty stage', 'Growth stage', 'All of the above'],
		answer: 1
	},
	{
		q: 'Nigeria become a republic in the year__?',
		options: [1996, 1960, 1963, 1900],
		answer: 2
	}
]

// set question numbers, question and options

function load(){
	questionNumber.innerHTML =  questionNum + 1;
	totalQuestion.innerHTML = questions.length;
	question.innerHTML = questions[index].q;
	optOne.innerHTML = questions[index].options[0];
	optTwo.innerHTML = questions[index].options[1];
	optThree.innerHTML = questions[index].options[2];
	optFour.innerHTML = questions[index].options[3];
	questionNum++; 
}
// console.log(answers.length);
function check(option){
	if (option.id == questions[index].answer){
		option.classList.add('correct');
		setCounter('correct');
		score++;
		console.log('score:' +score)

	}
	else{
		option.classList.add('wrong');
		setCounter('wrong')
	}
	// to disable the options from being selecting after selection
	disabledAnswers();
	
}

function disabledAnswers(){
 for (let a=0; a<answers.length; a++){
 	 answers[a].classList.add('disabled');
 	 // to show correct option when wrong option is selected
 	 if (answers[a].id == questions[index].answer){
 	 	answers[a].classList.add('correct');
 	 }
 	}
}

// to enable options for the next qeustions we have to enable the function in next button
function enableAnswers(){
 for (let a=0; a<answers.length; a++){
 	 answers[a].classList.remove('disabled', 'wrong', 'correct');
 	}
}

function randomQuestion(){
// for random questions
	let randomNumber = Math.floor(Math.random()*questions.length);
	let hitDuplicate = 0;
	if (questionNum==questions.length){
		quizOver();
		// console.log('questionNum: '+questionNum)
	}
	
	else{
		if(duplicate.length>0){
			for(let i = 0; i<duplicate.length; i++){
				if(duplicate[i] == randomNumber){
					hitDuplicate = 1;
					break;
				}
			}
			if(hitDuplicate ==1){
				randomQuestion();
			}
			else{
				index = randomNumber;
				load();
				myArr.push(index);
			}
		}
		if(duplicate.length === 0){
			index = randomNumber;
			load();
			myArr.push(index);
		}
		// console.log('myArr: '+myArr);
	duplicate.push(randomNumber);
	}

}

// to set the counter
function counter(){
	for(let i=0; i<questions.length; i++){
		const count = document.createElement('div')
			counterContainer.appendChild(count);
	}
}

// seting the counter

function setCounter(counters){
 	counterContainer.children[questionNum - 1].classList.add(counters);
}
// setting the next button
function validate(){
	if (!answers[0].classList.contains('disabled')){
		// user must select an option to proceed
		alert('select an option')
	}
	else{
		enableAnswers();
		randomQuestion();
	}
}

function next(){
	validate();
}

// to set the quiz over screen

function quizOver(){
	document.querySelector('.quizover').classList.add('show');
	correctAnswer.innerHTML = score;
	totalQ.innerHTML = questions.length;
	percent.innerHTML = (score/questions.length)*100 + '%';
}

function tryAgain(){
	window.location.reload();
}

window.onload = function(){
	randomQuestion();
	counter();
}

// console.log(totalQuestion);