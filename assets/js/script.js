var apiKey = "009830054dmsh3f54b2b26f2f90ep15938ejsnb252ef03d47c"

function getRandomNumber(nr) {
    return Math.floor(Math.random() * nr);
}

//Get random movies from the OTT API
function getRandomMovie() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ott-details.p.rapidapi.com/advancedsearch?start_year=2000&end_year=2020&min_imdb=6&max_imdb=10&language=english&type=movie&sort=lastest&page=" + getRandomNumber(100),
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "ott-details.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#synopsis').empty();
        var moviesAdded = [];
        do {
            var toAdd = getRandomNumber(49);
            //check array to make sure we don't add a repeated movie and check if there is synopsis
            if(!moviesAdded.includes(toAdd) && !(response.synopsis === "")){
                moviesAdded.push(toAdd)
                var movie = response.results[toAdd];
                fillCards(movie.synopsis, movie.imdbid);
                localStorage.setItem(movie.imdbid, JSON.stringify(movie));
            }
        }while (moviesAdded.length < 3);
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
    $("#modal-availability").empty();
    var sourceEl = $("<p>");    
    $.ajax(settings).done(function (response) {
        console.log(response);        
        if(response.length == 0 || !Array.isArray(response)){
            sourceEl.text("We couldn't find a source for this movie in our database");                        
        }else{            
            sourceEl.text(response[0].name +" to "+ response[0].type);            
        }        
    })
    .fail(function (xhr, status, error) {
        // Handle any errors
        sourceEl.text("Internal error Ask IT to change the API key");
    });
    $("#modal-availability").append(sourceEl);
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