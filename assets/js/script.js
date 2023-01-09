// page load	
// -call umdbAPI
function getRandomMovie() {
    var randomPage = Math.floor(Math.random() * 50);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=7.8&genre=action&language=english&type=movie&page=" + randomPage,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "53d4430f9bmsh7231787a6b61f06p15a0b7jsna1d2a6fce79c",
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        for (var i = 0; i < 3; i++) {
            var movie = response.results[i];
            fillCards(movie.synopsis, movie.imdbid);
            localStorage.setItem(movie.imdbid, JSON.stringify(movie));            
        }
        // 	-create cards
        // 	-fill cards with random movie
        // 	-text area for "sinopse"
        // 	-dataset for imdbID on card	
        // 	-store extra info to be used in the modal to the localstorage as an object(title, image, year, rating)
    });
}

function fillCards(synopsis, imdbId) {
    var synopsisEl = $('#synopsis');
    synopsisEl.append(
        `<a data-toggle="modal" data-target="#modelId"><div class="card movieCard" data-id="` + imdbId + `">
            <div class="card-header">
                <h4> Synopsis </h4>
            </div>
            <div class="card-body">                    
                <p>`+ synopsis + `</p>                    
            </div>
        </div></a>`
    );
}

$(document).on("click", ".movieCard", function () {     
        var movie = JSON.parse(localStorage.getItem($(this).data("id")));
        $('.modal-title').text(movie.title + " (" + movie.released + ")");
        $('#modal-image').attr('src', movie.imageurl[0]);
        $('#modal-rating').text("Rating: " + movie.imdbrating);
        $('#modal-genre').text("Genre: " + movie.genre[0]);
        
        // -create modal with (title, image, year, rating, where to watch)
        // -on card click using(dataset imdbID)
        // 	-get localStorage info for the specific movie to fill the modal
        // 	-load StreamingAvailabilityAPI passing imdbID	
        // 		-append availability

        // 	-show modal   
        // $('#my-modal').show();

        // function getAvailability(imdbId) {

        //     const settings = {
        //         "async": true,
        //         "crossDomain": true,
        //         "url": "https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=" + imdbId + "&output_language=en",
        //         "method": "GET",
        //         "headers": {
        //             "X-RapidAPI-Key": "830e974347mshf13c1bba5b122b8p13c6bejsn622c0f9f166e",
        //             "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
        //         }
        //     };

        //     $.ajax(settings).done(function (response) {
        //         console.log(response);
        //     });
        // }        
        
    });

function appendFilmInfo() {
    // var quoteCard
    // var quoteButton = $('<button>').text("See Info")
    // quoteButton.append()
}

$('.synopsisDisplay').click(function (event) {
    event.preventDefault();
    getRandomMovie();
    setTimeout(() => {
        $('.loadingImage').removeClass('hide')
    }, 1000);
    setTimeout(() => {
        $('.synopsisContainer').removeClass('hide')
        $('.loadingImage').addClass('hide')
    }, 5000);
});

$('#surpriseButton').empty()