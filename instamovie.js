
//  var url = 'https://api.themoviedb.org/3/movie/'+ movieCategorySelector + '?api_key=d8d94bcf898938939d96dd422b52b026'
//  var imageUrl = 'http://image.tmdb.org/t/p/w500/'
//  var imageId = ''


var movieCategorySelector = "";

$("#getMovie").click(
    getMovie
);
$('#pass').click(
    getMovie
);

function getMovie () {
    movieCategorySelector = $("#movieCategory").val();
    var url = 'https://api.themoviedb.org/3/movie/' + movieCategorySelector + '?api_key=d8d94bcf898938939d96dd422b52b026'
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


