import {startQuiz} from "./quizProcessing.js";
import {animals} from "./quizData.js";
const quizForm = document.forms["quizForm"];
const quiz = document.getElementById("quiz-wrapper");
export function validateQuizForm(event) {
	event.preventDefault();
	let form = event.target;
	console.log(event);
	let name = quizForm["name"].value;
	let email = quizForm["email"].value;
	let animalNum = parseInt(quizForm["animalNum"].value);
	const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g)	;
	const nameProhibitRegex = new RegExp(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g);
	if (name == "" || email == "" || animalNum == "") {
		alert("One of the required fields are not filled out");
		return;
	}
	if (nameProhibitRegex.test(name)) {
		alert("'Name' field must not use special characters");
		return;
	}
	if (!emailRegex.test(email)) {
		alert("Email entered is not valid");
		return;
	} if(animalNum == NaN){
		alert("Number of animals should be an integer");
		return;
	}
	if (animalNum <= 1 || animalNum >= animals.length) {
		alert(
			"You can choose between 1 and " +
				animals.length +
				" of animals to guess."
		);
		return;
	}
	document.getElementById("form-wrapper").style.display = 'none';
	quiz.style.display = 'flex';
	document.getElementById("submitQuizForm").style.display = 'block';
	startQuiz(name, email, animalNum);
}
quizForm.addEventListener("submit", validateQuizForm)

