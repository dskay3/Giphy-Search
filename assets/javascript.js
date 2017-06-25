var gifArr = [
    "dog",
    "cat",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "gerbil",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "salamander",
    "frog"
]

// Adds GIF Search buttons
function addButtons() {
    // Clears div to prevent repetition of buttons
    $("#gifButtons").empty();

    // Creates the buttons
    for (var i = 0; i < gifArr.length; i++) {
        var btns = $("<button>");
        btns.addClass("btns");
        btns.attr("data-value", gifArr[i]);
        btns.text(gifArr[i]);
        $("#gifButtons").append(btns);
    }
}

addButtons();

// Executes and uses Giphy API to generate GIFs
$(document.body).on("click", ".btns", function() {
    // Clears div to prevent repetition of GIFs
    $("#gifResults").empty();

    // API Key
    var apiKey = "83c96803edec4d8ca805dcb6bdb5d6a5";
    var tag = $(this).data("value");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=" + apiKey + "&limit=" + limit;

    console.log("QueryURL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response){
        // Objects Array from Giphy API
        var gifArr = response.data;

        var loading = $("<img>");
        loading.attr("id", "loading");
        loading.attr("src", "assets/images/loading.jpg");
        loading.css("display", "block");
        $("#gifResults").append(loading);

        console.log(response)

        for (var i = 0; i < gifArr.length; i++) {
            var img = $("<img>");
            var gifImgDiv = $("<div>");
            var ratingText = $("<figcaption>");
            var ratingSrc = "Rating: " + gifArr[i].rating;
            var imgSrc = gifArr[i].images.fixed_height.url;

            ratingText.addClass("gifRating text-center");
            ratingText.text(ratingSrc);

            img.addClass("gifImgs");
            img.attr("src", imgSrc);
            img.attr("data-animate", gifArr[i].images.fixed_height.url);
            img.attr("data-still", gifArr[i].images.fixed_height_still.url);
            img.data("state", "animate");   

            gifImgDiv.addClass("imgDiv");
            
            $(gifImgDiv).append(ratingText);
            $(gifImgDiv).append(img);

            $("#gifResults").append(gifImgDiv);
            $(gifImgDiv).css("display", "none");
        }

        // Loads the loading gif to give time for the GIFs to load
        setTimeout(function() {
            $("#loading").css("display", "none");
            $(".imgDiv").css("display", "block");
        }, 3000);
    })

});

// Pauses and unpauses GIFs
$(document.body).on("click", ".gifImgs",function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// Adds additional buttons from the search box
$("#searchGif").on("click", function() {
    event.preventDefault();
    
    var addButton = $("#search-input").val().trim();

    if (addButton === '') {
        return 0;
    } else {
        gifArr.push(addButton);
        addButtons();
    }
})