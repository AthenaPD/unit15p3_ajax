console.log("Let's get this party started!");

const api_key = "1pfdD7x5yu2KYOkBO32Gl7NYQAPpsIG9";
const gifUrl = "https://api.giphy.com/v1/gifs/search";
const searchObj = {};

$("form").on("submit", handleFormSubmit);
$("#remove").on("click", function() {$("#gifs").empty();});

function handleFormSubmit(evt) {
    evt.preventDefault();
    const searchTerm = $("#search").val();
    if (searchTerm in searchObj) {
        searchObj[searchTerm] = searchObj[searchTerm] + 1;
    }else {
        searchObj[searchTerm] = 1;
    }
    appendGif(searchTerm);
    evt.target.reset();
}

async function appendGif(q) {
    const gifObj = await axios.get(gifUrl, {params: {api_key, q, limit: 1, offset: searchObj[q]-1}});
    const newDiv = document.createElement("div");
    newDiv.classList.add("col-auto");
    const newGif = document.createElement("img");
    newGif.src = gifObj.data.data[0].images.fixed_height.url;
    newGif.alt = gifObj.data.data[0].alt_text;
    newDiv.append(newGif);
    $("#gifs").append(newDiv);
}