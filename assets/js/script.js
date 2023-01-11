var apiKey = "009830054dmsh3f54b2b26f2f90ep15938ejsnb252ef03d47c"

function getRandomNumber(nr) {
    return Math.floor(Math.random() * nr);
}

//Get random movies from the OTT API
function getRandomMovie() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ott-details.p.rapidapi.com/advancedsearch?start_year=1970&end_year=2020&min_imdb=6&max_imdb=10&language=english&type=movie&sort=lastest&page=" + getRandomNumber(100),
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        $('#synopsis').empty();
        for (var i = 0; i < 3; i++) {
            var movie = response.results[getRandomNumber(49)];
            fillCards(movie.synopsis, movie.imdbid);
            localStorage.setItem(movie.imdbid, JSON.stringify(movie));
        }
    });
}

//show the Synopsis to the user
function fillCards(synopsis, imdbId) {
    var synopsisEl = $('#synopsis');
    synopsisEl.append(
        `<a data-toggle="modal" data-target="#modelId">
            <div class="card movieCard" data-id="` + imdbId + `">
                <div class="card-header">
                    <h4> Synopsis </h4>
                </div>
                <div class="card-body">                    
                    <p>`+ synopsis + `</p>   
                </div> 
            </div>
        </a>`
    );
}

//when click on the container load stored data from the OTT API to the modal following a call to watchmode API
$(document).on("click", ".movieCard", function () {
    var movie = JSON.parse(localStorage.getItem($(this).data("id")));
    $('.modal-title').text(movie.title + " (" + movie.released + ")");
    $('#modal-image').attr('src', movie.imageurl[0]);
    $('#modal-rating').text("Rating: " + movie.imdbrating);
    $('#modal-genre').text("Genre: " + movie.genre);
    getAvailability($(this).data("id"));
});

//call watchmode API using imdb id to find the sources to watch the movie
function getAvailability(imdbId) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://watchmode.p.rapidapi.com/title/" + imdbId + "/sources/",
        "method": "GET",
        "headers": {
            "regions": "US",
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "watchmode.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.length == 0){
            $('#modal-availability').text("We couldn't find a source for this movie in our database");                        
        }else{
            $('#modal-availability').text(response[0].name +" for "+ response[0].type);
        }        
    })
    .fail(function (xhr, status, error) {
        // Handle any errors
        $('#modal-availability').text("Internal error Ask IT to change the API key");
    });
}

//API Loading Image
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