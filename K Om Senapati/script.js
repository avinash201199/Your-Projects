document.getElementById('generateRecipe').addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(response => response.json())
		.then(data => {
			const meal = data.meals[0];

			const recipeContainer = document.getElementById('recipeContainer');
			recipeContainer.innerHTML = `
				<div class="card">
					<div class="row no-gutters">
						<div class="col-md-4">
							<img src="${meal.strMealThumb}" class="card-img" alt="${meal.strMeal}" style="max-width: 100%;">
	   						<div class="col text-center mt-4">
							<p><strong>Tags:</strong> ${meal.strTags}</p>
							<p><strong>Area:</strong> ${meal.strArea}</p>
							<p><strong>Category:</strong> ${meal.strCategory}</p>
	   						</div>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<h5 class="card-title">${meal.strMeal}</h5>
								<h6>Ingredients</h6>
								<ul>${getIngredientsList(meal)}</ul>
								<h6>Recipe</h6>
								<ol>${getInstructionsList(meal)}</ol>
								<a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Watch Demo</a>
								<a href="${meal.strSource}" class="btn btn-secondary" target="_blank">View Source</a>
							</div>
						</div>
					</div>
				</div>
			`;
		})
		.catch(error => console.error('Error:', error));
});

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function getIngredientsList(meal) {
	let ingredientsList = '';
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal['strIngredient' + i];
		const measure = meal['strMeasure' + i];
		if (ingredient) {
			ingredientsList += `<li>${measure} - ${toTitleCase(ingredient)}</li>`;
		} else {
			break;
		}
	}
	return ingredientsList;
}

function getInstructionsList(meal) {
	const instructions = meal.strInstructions.split(/\r\n|\n/);
	let instructionsList = '';
	instructions.forEach(instruction => {
		if (instruction.trim() !== '' && instruction.toLowerCase().indexOf("step") === -1) {
			instructionsList += `<li>${instruction.trim()}</li>`;
		}
	});
	return instructionsList;
}
