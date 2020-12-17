const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let game_name = urlParams.get("game_name");
console.log(game_data[game_name]);
create_game_page(game_data[game_name]);

$(document).ready(function() 
{
    var nav_style = getComputedStyle(document.body);
});

function create_game_page(data) {
    if(data == null){
        // DO SOMETHING
    }
    let newHTML = "";
    document.getElementById("id-game-title").innerText = data.name;
    document.getElementById("game-logo").setAttribute("src", data.img_src);
    document.getElementById("game-description").innerText = data.desciption;
    document.getElementById("game-price").innerText = data.price;

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

    data.about = data.about.replaceAll("\n", "\n\n")

    document.getElementById("id-game-about-span").innerText = data.about;
}