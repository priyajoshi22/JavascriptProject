const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.RecipeData');

var searchQuery= '';

const ApplicationId="485d94e7";
const ApplicationKey="34c03e29af51c601662b125be50f728a";

searchForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	fetchAPI();
});

async function fetchAPI(){
	const baseUrl=`https://api.edamam.com/search?q=${searchQuery}&app_id=${ApplicationId}&app_key=${ApplicationKey}&to=20`;
	const response = await fetch(baseUrl);
	const data = await response.json();
	console.log(data.hits)
	localStorage.setItem('FoodData',JSON.stringify(data.hits))
	GenerateHtml(data.hits);
}

function GenerateHtml(data){
	var htmlBody="";

	if((data.length)>0)
	{
		data.map((value,index)=>{	

		htmlBody += `
    <div class="card">
    <img src=${value.recipe.image} class="imgStyle" />
    <p class="card__name"> ${value.recipe.label}</p>
    <div class="grid-containers">
      <div class="grid-child-posts">
       Calories :  ${value.recipe.calories.toFixed(2)}
      </div>
      <div class="grid-child-followers">
        Total Weight : ${value.recipe.totalWeight.toFixed(2)}
      </div>
    </div>
    <p>
	    <span>
	        <a href=${value.recipe.shareAs} target="_blank"> Visit Website </a>
	    </span>
	</div>
		`	
	})

	}
	else{
		htmlBody +="No Result Found For "+searchQuery
	}
	searchResultDiv.innerHTML=htmlBody;
}


