let r = new XMLHttpRequest();
r.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=7e3f45efbe0625c1d035fbe7da2ec64f");
r.onreadystatechange = function () {
 if (r.readyState != 4 || r.status != 200) return;


const response = JSON.parse(r.responseText);
 
 let movieList = document.querySelector('.movieList');

 const IdInfo = new generalInfo();

 for (let movie of response.results) {

   console.log(movie);
   const image_path = "http://image.tmdb.org/t/p/original"; //poster path
   const poster_loc = image_path + movie.poster_path;
   const movie_title = movie.title;
   const rating = movie.vote_average;
   const genre = movie.genre_ids;
   const getGenre = IdInfo.getGenres(genre);

$(document).ready(function(){
    $('.superslider').slick({
        arrows: false,
        dots: true,
   slidesToShow: 2.5,
   slidesToScroll: 2,
   dots: false,
    });

$(document).foundation();

});

   let movieStr = `\
     <div class="slide-content image"><a href="#"><img src="${poster_path}"></a>
       <div class="textOverlayBg">
         <div class="skew">
           <h3 class="textOverlayH3">${movie_title}</h3>
           <a class="textOverlayA" href="#">Felicity Jones | Diego Luna | Forest Whitaker</a>
           <p class="textOverlayP">${getGenre}</p>
           <div class="textOverlayC circleBase type2"><h4 class="rating"><strong>${rating}</strong></h4></div>
         </div>
       </div>
     </div>
   `;

   movieList.innerHTML += movieStr;

 }

$(movieList).slick({
 arrows: true,
 dots: false,    
 infinite: true,
 dots: false,
 infinite: true,
 speed: 300,
 slidesToShow: 4,
 slidesToScroll: 2,

 responsive: [
   {
     breakpoint: 1024,
     settings: {
        slidesToShow: 3.05,
        slidesToScroll: 1,
        arrows: false,
        dots: false
     }
   },
   {
     breakpoint: 600,
     settings: {
       slidesToShow: 2.05,
       slidesToScroll: 1,
       arrows: false,
       dots: false
     }
   },
   {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.05,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
   }
 ]
});

};
r.send();

class generalInfo {
 constructor(movieID) {
   this.cast = " ";
   this.genres = " ";
   this.movideID = movieID;

 }
 getGenres(IDs){
  let movieGenres = [ ];
   movieGenres = genres.filter(function(genre){
     return IDs.indexOf(genre.id) > -1;
   });
   console.log(movieGenres);
   let genreString = " ";
   movieGenres.forEach(function(movieGenre){
     genreString += movieGenre.name + ", ";
   });
   return genreString;    
 }
}