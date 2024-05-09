import { animals } from "./quizData.js";

if (typeof Storage == "undefined") {
	window.alter("Local storage is not supported");
}

const submitQuiz = document.forms["submitQuiz"];
var user = {
	name: undefined,
	email: undefined,
};
var chosenAnimals = [];
var highscore;

function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function buildAnimalObject(animal, location) {
	location.innerHTML +=
		`
	<div class="animal-image_wrapper_wrapper draggable">
		<div class="animal-image_wrapper">
			<img src="` +
		animal.src +
		`"
				alt="` +
		animal.text +
		`" class="animal-image"
				style="` +
		animal.style +
		`">
		</div>
	</div>
	`;
}

function makeDraggable() {
	$(".draggable").draggable();
}

export function startQuiz(name, email, numberOfAnimals) {
	user.name = name;
	user.email = email;
	var startLocation = document.getElementById("animal-start-position");
	for (let i = 0; i < numberOfAnimals; i++) {
		do {
			let currentAnim = animals[getRandomArbitrary(0, animals.length)];
			if (chosenAnimals === undefined) {
				chosenAnimals.push(currentAnim);
				break;
			}
			if (
				!chosenAnimals
					.map(({ id, ...rest }) => id)
					.includes(currentAnim.id)
			) {
				console.log(chosenAnimals);
				console.log(chosenAnimals.map(({ id, ...rest }) => id));
				chosenAnimals.push(currentAnim);
				// console.log("repeat caught");
				break;
			}
		} while (true);
		buildAnimalObject(chosenAnimals[i], startLocation);
	}
	makeDraggable();
}

function checkHighscore() {
	//stored as Number/Number
	highscore = localStorage.getItem("highscore");
	if (highscore) {
		document.getElementById("highscore").innerHTML =
			"Current highscore " + highscore;
	}
}

function setHighscore(score, total) {
	localStorage.setItem("highscore", score + "/" + total);
}

function checkAnimal(animal, continent) {
	animal.classList.remove("draggable");
	animal = animal.children[0].children[0];
	console.log(animal.alt);
	console.log(
		animals.map(({ text, country, ...rest }) =>
			country === continent ? text : ""
		)
	);
	return animals
		.map(({ text, country, ...rest }) =>
			country === continent ? text : ""
		)
		.includes(animal.alt);
}

function checkResults(event) {
	event.preventDefault();
	let Europe = document.getElementById("c1").children;
	console.log(Europe);
	let Asia = document.getElementById("c2").children;
	let Africa = document.getElementById("c3").children;
	let Americas = document.getElementById("c4").children;
	let Oceania = document.getElementById("c5").children;

	let totScore = 0;
	let score = 0;

	for (let animal of Europe) {
		console.log(animal);
		score += checkAnimal(animal, "Europe") ? 1 : 0;
		if (score === 1) {
			animal.classList.add("correct");
		} else {
			animal.classList.add("incorrect");
		}

		totScore += score;
		score = 0;
	}
	for (let animal of Asia) {
		score += checkAnimal(animal, "Asia") ? 1 : 0;
		if (score === 1) {
			animal.classList.add("correct");
		} else {
			animal.classList.add("incorrect");
		}

		totScore += score;
		score = 0;
	}
	for (let animal of Africa) {
		score += checkAnimal(animal, "Africa") ? 1 : 0;
		if (score === 1) {
			animal.classList.add("correct");
		} else {
			animal.classList.add("incorrect");
		}

		totScore += score;
		score = 0;
	}
	for (let animal of Americas) {
		score += checkAnimal(animal, "Americas") ? 1 : 0;
		if (score === 1) {
			animal.classList.add("correct");
		} else {
			animal.classList.add("incorrect");
		}

		totScore += score;
		score = 0;
	}
	for (let animal of Oceania) {
		score += checkAnimal(animal, "Oceania") ? 1 : 0;
		if (score === 1) {
			animal.classList.add("correct");
		} else {
			animal.classList.add("incorrect");
		}

		totScore += score;
		score = 0;
	}
	let scoreHTML = document.getElementById("score");
	scoreHTML.style.display = "block";
	submitQuiz.style.display = "none";
	score = totScore;
	let total = chosenAnimals.length;
	let scorePerc = (score / total) * 100;
	checkHighscore();
	if (highscore === undefined || highscore === null) {
		setHighscore(score, total);
		scoreHTML.innerHTML =
			"Congratulations, " +
			user.name +
			".\nYou got a new Highscore!\n" +
			score +
			" out of a " +
			total +
			" animals were sorted into the right column.";
		return;
	}
	let highscorePerc = highscore.split("/");
	highscorePerc = parseInt(highscorePerc[0]) / parseInt(highscorePerc[1]);
	if (scorePerc > highscorePerc) {
		setHighscore(score, total);
		scoreHTML.innerHTML =
			"Congratulations, " +
			user.name +
			".\nYou got a new Highscore!\n" +
			score +
			" out of a " +
			total +
			" animals were sorted into the right column.";
		return;
	}
	if (scorePerc > 60) {
		scoreHTML.innerHTML =
			"Congratulations, " +
			user.name +
			".\nYou put \n" +
			score +
			" out of a " +
			total +
			" animals into the right column.";
		return;
	}
	scoreHTML.innerHTML =
		"You guessed \n" +
		score +
		" out of a " +
		total +
		" animals right.";
}

checkHighscore();
submitQuiz.addEventListener("submit", checkResults);
console.log("Brown Bear" in ["", "", "", "", "Iber", "Brown Bear", "", ""]);
