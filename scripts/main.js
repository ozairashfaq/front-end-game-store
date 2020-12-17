const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let game_name = urlParams.get("game_name");
console.log(game_data[game_name]);
create_game_page(game_data[game_name]);

$(document).ready(function() 
{
    var nav_style = getComputedStyle(document.body);
    let owned_games = JSON.parse(localStorage.getItem("owned_games"));
    if (owned_games.includes(game_data[game_name].name)) {
        document.getElementById("btn-add-to-lib").disabled = true;
        document.getElementById("btn-add-to-lib").innerText = "Already in Library";
    }

    document.getElementById("btn_checkout_complete").onclick = function(e) {
        e.preventDefault();
        document.getElementById("modal-size-id").classList.remove("modal-xl");
        document.getElementById("modal-size-id").classList.add("modal");
        document.getElementById("buy-game-modal-inputs").classList.add("visually-hidden");
        document.getElementById("buy-game-modal-done").classList.remove("visually-hidden");
        document.getElementById("btn-add-to-lib").disabled = true;
        document.getElementById("btn-add-to-lib").innerText = "Already in Library";
        owned_games.push(game_data[game_name].name);
        // Store
        localStorage.setItem("owned_games", JSON.stringify(owned_games));
    };
});

function create_game_page(data) {
    if(data == null){
        // DO SOMETHING
    }
    let newHTML = "";
    document.getElementById("id-game-title").innerText = data.name;
    document.getElementById("game-logo").setAttribute("src", data.img_src);
    document.getElementById("game-description").innerText = data.desciption;
    document.getElementById("game-price").innerText = "CA $" + data.price;

    document.getElementById("id-trailer-video").innerHTML = '<source src="' + data.trailer_src + '">';

    newHTML = document.getElementById("game-imgs-holder").innerHTML;
    data.images.forEach(element => {
        newHTML = newHTML + '<div class="carousel-item"><img src="' + element + '" class="d-block w-100" alt="Game Image"></div>';
    });
    document.getElementById("game-imgs-holder").innerHTML = newHTML;
    newHTML = document.getElementById("game-img-indicators").innerHTML;
    for(i in data.images){
        newHTML = newHTML + '<li data-bs-target="#game-page-carousel-indicators" data-bs-slide-to="' + i + '"></li>';
    }
    document.getElementById("game-img-indicators").innerHTML = newHTML;

    if (data.win == "True" || data.mac == "True" || data.linux == "True"){
        good_os = "<div class=\"browse-game-os\">";
        if(data.win == "True"){
            good_os = good_os + "<i class=\"fa fa-windows\" aria-hidden=\"true\"></i>";
        }
        if(data.mac == "True"){
            good_os = good_os + "<i class=\"fa fa-apple\" aria-hidden=\"true\"></i>";
        }
        if(data.linux == "True"){
            good_os = good_os + "<i class=\"fa fa-linux\" aria-hidden=\"true\"></i>";
        }
        good_os = good_os + "</div>";
    }
    
    document.getElementById("id-about-game-name").innerText = "About " + data.name;
    document.getElementById("id-game-dev-span").innerText = data.developer;
    document.getElementById("id-game-publisher-span").innerText = data.developer;
    document.getElementById("id-game-release-date-span").innerText = data.release_date;
    document.getElementById("id-game-tags-span").innerText = data.tags;
    document.getElementById("id-game-rating-span").innerText = data.rating;
    document.getElementById("id-game-platform-span").innerHTML = good_os;

    newHTML = "";
    document.getElementById("id-review-rating").innerHTML = data.all_reviews;
    document.getElementById("id-review-value").innerHTML = data.review_percent + "%";

    newHTML = "";
    if(data.steam != null && data.steam !== "") {
        newHTML = '<a href="' + data.steam + '" target="_blank"><img src="../../images/steam-game-store.webp" alt="Steam Store"></a>';
    } else {
        document.getElementById("id-steam-link").classList.add("visually-hidden");
    }
    document.getElementById("id-steam-link").innerHTML = newHTML;

    if(data.epic != null && data.epic !== "") {
        newHTML = '<a href="' + data.epic + '" target="_blank"><img src="../../images/epic-game-store.png" alt="epic Store"></a>';
    } else {
        document.getElementById("id-epic-link").classList.add("visually-hidden");
    }
    document.getElementById("id-epic-link").innerHTML = newHTML;

    if(data.gog != null && data.gog !== "") {
        newHTML = '<a href="' + data.gog + '" target="_blank"><img src="../../images/gog-game-store.webp" alt="gog Store"></a>';
    } else {
        document.getElementById("id-gog-link").classList.add("visually-hidden");
    }
    document.getElementById("id-gog-link").innerHTML = newHTML;

    data.about = data.about.replaceAll("\n", "\n\n")
    document.getElementById("id-game-about-span").innerText = data.about;
}