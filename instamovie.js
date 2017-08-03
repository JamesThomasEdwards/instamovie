
//  var url = 'https://api.themoviedb.org/3/movie/'+ movieCategorySelector + '?api_key=d8d94bcf898938939d96dd422b52b026'
//  var imageUrl = 'http://image.tmdb.org/t/p/w500/'
//  var imageId = ''


var movieCategorySelector = "";
var currentMovieTitle;
var currentMovieOverview;
var currentMovieCategory;

$("#getMovie").click(
    getMovie
);
$('#pass').click(
    getMovie
);
$('#addMovie').click(
    addMovie
)
$('#showWatchlist').click(
    showWatchlist
)
$('#topmenu li').click(function(){
    console.log($(this).text())
    if($(this).text()==='Top Rated'){
        currentMovieCategory = "top_rated";
    }else if($(this).text()==='Popular'){
        currentMovieCategory = "popular";
    }else if($(this).text()==='Now Playing'){
        currentMovieCategory = "now_playing";
    }else if($(this).text()==='Upcoming'){
        currentMovieCategory = "upcoming";
    }
    
    getMovie();
})


function showWatchlist() {
    var watchlist = {};
    var database = firebase.database()
    var movies = database.ref("movies");

    movies.ref.on("value", function (dataSnapshot) {
        console.log(dataSnapshot.val());
        watchlist = dataSnapshot.val();
        console.log(watchlist);
        for (var list in watchlist) {
            console.log(watchlist[list].title);
            $('#watchlist').append('<li>'+watchlist[list].title+'</li>')

        }

    })

}

function addMovie() {
    var database = firebase.database()
    var movies = database.ref("movies");
    var childRef = movies.push();
    childRef.set({ title: currentMovieTitle, overview: currentMovieOverview })

}

function getMovie() {
    var movieCategory = currentMovieCategory;
    var url = 'https://api.themoviedb.org/3/movie/' + movieCategory + '?api_key=d8d94bcf898938939d96dd422b52b026'
    movie(url);

}

function randomMovie(totalResults) {
    var randomMovieSelector = Math.floor(Math.random() * (totalResults) + 1)

    console.log(randomMovieSelector)
    return randomMovieSelector;

}

function movie(url) {

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {
            var totalResults = data.total_results;
            var movieNumber = randomMovie(totalResults);
            var moviePage = Math.ceil(movieNumber / 20);
            var movieIndex = movieNumber - (20 * (moviePage - 1)) - 1;
            $.ajax({
                type: 'GET',
                url: url + "&page=" + moviePage,
                dataType: 'json',
                success: function (movieData) {
                    var movie = movieData.results[movieIndex];
                    $("#movieTitle").text(movie.title);
                    $("#voteAverage").text(movie.vote_average);
                    $("#overview").text(movie.overview);
                    $("#posterImage").attr("src", "http://image.tmdb.org/t/p/w500" + movie.poster_path);
                    currentMovieTitle = movie.title;
                    currentMovieOverview = movie.overview;
                    // console.log(currentMovieTitle);
                }
            })

            console.log(movieNumber, moviePage, movieIndex);

            // $.ajax({
            //     type: 'GET',
            //     url: url + '&page=' + randomMovie(data.results.length, pageNumbers).page,
            //     dataType: 'json',
            //     success: function () {
            //         var movie = data.results[randomMovie(data.results.length)];


            //         $("#movieTitle").text(movie.title);
            //         $("#posterImage").attr("src", "http://image.tmdb.org/t/p/w500/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg")

            //     }
            // })

        }
    })

}
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

