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

function addButtons() {
    $("#gifButtons").empty();

    for (var i = 0; i < gifArr.length; i++) {
        var btns = $("<button>");
        btns.addClass("btns");
        btns.attr("data-value", gifArr[i].replace(/\s+/g,''));
        btns.text(gifArr[i]);
        $("#gifButtons").append(btns);
    }
}

addButtons();

$(document.body).on("click", ".btns", function() {
    var apiKey = "dc6zaTOxFJmzC";
    var tag = $(this).data("value");
    var limit = 10;
    var queryURL = "http://api.giphy.com/v1/gifs/search" + "?q=" + tag + "&api_key=" + apiKey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        $("#gifResults").empty();
        var gifArr = response.data;
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
        }

    })

});

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