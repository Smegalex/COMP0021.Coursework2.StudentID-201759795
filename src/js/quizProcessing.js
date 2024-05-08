import animals from "./quizData"

function buildAnimalObject(animal, location){
	location.innerHTML += `
	<div class="animal-image_wrapper draggable">
		<img src="`+animal.src+`"
			alt="`+animal.text+`" class="animal-image"
			style="`+animal.style+`">
	</div>
	`
}

function startQuiz(name, email, numberOfAnimals){
	
}