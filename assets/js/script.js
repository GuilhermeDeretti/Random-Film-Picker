





function getRandomMovie() {
var randomPage = Math.floor(Math.random() * 50); 

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&page=" + randomPage,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "4b0f065569mshd328a2a1a34d744p1e6b38jsnff01d51dcc7e",
		"X-RapidAPI-Host": "ott-details.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);

var randomIndexFirstEl = Math.floor(Math.random() * response.results.length);
var randomIndexSecondEl = Math.floor(Math.random() * response.results.length + 1);
var randomIndexThirdEl = Math.floor(Math.random() * response.results.length + 2);

var randomQuoteFirst = response.results[randomIndexFirstEl];
var randomQuoteSecond = response.results[randomIndexSecondEl];
var randomQuoteThird = response.results[randomIndexThirdEl];

$('.synopsisFirst').text(randomQuoteFirst.synopsis)
$('.synopsisSecond').text(randomQuoteSecond.synopsis)
$('.synopsisThird').text(randomQuoteThird.synopsis)

});
}

$('.displayQuotes').click(function( event ) {
    event.preventDefault();
    getRandomMovie()
});

$('#surpriseButton').empty()