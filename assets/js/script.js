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

// Getting a random index from the response
var randomIndexFirstEl = Math.floor(Math.random() * response.results.length);
var randomIndexSecondEl = Math.floor(Math.random() * response.results.length +1);
var randomIndexThirdEl = Math.floor(Math.random() * response.results.length +2);

// 
var randomQuoteFirst = response.results[randomIndexFirstEl];
var randomQuoteSecond = response.results[randomIndexSecondEl];
var randomQuoteThird = response.results[randomIndexThirdEl];

// 
$('.synopsisFirst').text(randomQuoteFirst.synopsis)
$('.synopsisSecond').text(randomQuoteSecond.synopsis)
$('.synopsisThird').text(randomQuoteThird.synopsis)

// Get the title of the randomly generated quote
var firstQuoteTitle = randomQuoteFirst.title
var secondQuoteTitle = randomQuoteSecond.title
var thirdQuoteTitle = randomQuoteThird.title

localStorage.setItem('title', firstQuoteTitle)

// var filmsInfo = [ {
//     title: 


// }
// ]
});
}

function appendFilmInfo() {
    // var quoteCard
    // var quoteButton = $('<button>').text("See Info")
    // quoteButton.append()



}

$('.displayQuotes').click(function( event ) {
    event.preventDefault();
    getRandomMovie()
    setTimeout(() => {
        $('.loadingImage').removeClass('hide')
    }, 1000);
    setTimeout(() => {
        $('.quotesContainer').removeClass('hide')
        $('.loadingImage').addClass('hide')
    }, 5000);
});

$('#surpriseButton').empty()


// Add this to the BUTTON you need to open the modal 
// data-toggle="modal" data-target="#modelId"