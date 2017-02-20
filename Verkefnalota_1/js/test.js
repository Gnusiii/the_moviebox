let movieInstances = [];

// get the data
function getMovieList(apiPath){
  let database = new XMLHttpRequest();

  database.open('GET', 'https://api.themoviedb.org/3/'+ apiPath + '?api_key=7e3f45efbe0625c1d035fbe7da2ec64f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
  database.onreadystatechange = function () {
  // check for success
    if (database.readyState != 4 || database.status != 200) return;
    let movieList = JSON.parse(database.responseText).results;
        initializeApp(movieList);

  }
  database.send();
}


getMovieList("discover/movie");

// let imdbDatabase = new XMLHttpRequest();
// imdbDatabase.open('GET', 'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>')

// movie class
const image_path = "http://image.tmdb.org/t/p/original";

class Movie{
  constructor(info){
    $.extend( this, info);
  }
}

// class Instance{
//   constructor(id){
//     this.id = info.id;
//   }
//   get getInstance(){
//     return this.id;
//   }
// }



// movie instances array 

function initializeApp(movieList){
  for (let movieInfo of movieList){
    let movieInstance = new Movie(movieInfo);
    movieInstances.push(movieInstance)
  }
  for (let movieInstance of movieInstances){
    displayMovie(movieInstance, function(){
      getActors(movieInstance, function(crewList){
        displayActors(movieInstance, crewList);
      });
      getGenres(movieInstance, function(genreList){
        displayGenres(movieInstance, genreList)
      });
    });  
  }
   $("#movieSlider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
        }
      },
      {
        breakpoint: 802,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        }
      },
      {
        breakpoint: 535,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        }
      },
    ]
  });
}

//display movies



function displayMovie(movieInstance, callback){

  const slide = `<div class="movieSlide" style="background:url(${image_path + movieInstance.poster_path}); background-size: cover;
  background-position: 50% 0%;" data-open="movieReveal">
                        <div class="movieOverlay">
                            <div class="textOverlay" id="movie-${movieInstance.id}">
                                <h4 id="movieName">${movieInstance.title}</h4>
                                <a class="actors" href="#">${movieInstance.crewMember}</a><br>
                                <a class="genres" href="#"></a>
                                <div class="circle">
                                    <div id="movieRating">${movieInstance.vote_average}</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
  
  document.getElementById('movieSlider').innerHTML += slide; 
  console.log($("#movieSlider"));
 
  callback();
}

function getActors(movieInstance, callback){
  let database = new XMLHttpRequest();

  database.open('GET', 'https://api.themoviedb.org/3/movie/' + movieInstance.id + '/credits?api_key=7e3f45efbe0625c1d035fbe7da2ec64f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
  database.onreadystatechange = function () {
  // check for success
    if (database.readyState != 4 || database.status != 200) return;
    let crewList = JSON.parse(database.responseText).crew;
      callback(crewList);
  }
  database.send();
}

function displayActors(movieInstance, crewList){
 let actorsContainer = document.querySelector('#movie-' + movieInstance.id + ' .actors');
 let actors = [];
 crewList.forEach((crewMember, i) => {
  if (i < 3) {
    actors.push(crewMember.name);
  }
 });

 actorsContainer.innerHTML = actors.join(' | ');
}

function getGenres(movieInstance, callback){
  let database = new XMLHttpRequest();
  database.open('GET', 'https://api.themoviedb.org/3/genre/movie/list?api_key=7e3f45efbe0625c1d035fbe7da2ec64f&language=en-US');
  database.onreadystatechange = function(){
    if (database.readyState != 4 || database.status != 200) return;
    let genreList = JSON.parse(database.responseText).genres;
      callback(genreList);
  }
  database.send();
}

function displayGenres(movieInstance, genreList){
  let genresContainer = document.querySelector('#movie-' + movieInstance.id + ' .genres');//Take a look!
  let genres = genreList.filter(genre => movieInstance.genre_ids.indexOf(genre.id) > -1);
  genres.forEach(genre => {
    genresContainer.innerHTML += genre.name + ' ';
  });  
}


$(document).ready(function(){
	$(document).foundation();
	
	$("#castSlider").slick({
		dots: false,
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 5,
		speed: 1000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
				}
			},
			{
				breakpoint: 802,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				}
			},
			{
				breakpoint: 535,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				}
			},
		]
	});


});