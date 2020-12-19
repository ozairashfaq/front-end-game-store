$(document).ready(function() 
{
    var nav_style = getComputedStyle(document.body);
    let owned_games = JSON.parse(localStorage.getItem("owned_games"));
    if(owned_games.length > 0) {
        document.getElementById("games-owned").innerText = "Total Games: " + owned_games.length;
        document.getElementById("id-no-games-msg").classList.add("visually-hidden");
        let num = getRandomInt(owned_games.length);
        console.log(owned_games[num]);
        let bg_img = game_data[owned_games[num]].images[getRandomInt(game_data[owned_games[num]].images.length)];
        document.getElementById("user-profile").style.backgroundImage = 'url("' + bg_img + '")';
    }
    populate_games_list(owned_games);

    document.getElementById("search-input").onkeyup = function(e) {
        e.preventDefault();
        if (e.key === "Enter") {
            document.getElementById("search-btn").click();
        }
    }

    document.getElementById("search-btn").onclick = function(e) {
        e.preventDefault();
        window.location = "./browse.html?search=true&search_input=" + document.getElementById("search-input").value;
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function populate_games_list(owned_games) {
    let newHTML = ""
    owned_games.forEach(element => {
        let curr_game = game_data[element];
        let desc = ""
        for (i = 0; i <= 84; i++) {
            desc = desc + curr_game.desciption.charAt(i);
        }
        desc = desc + "..."

        let page_loc = "./games/game_page.html?game_name=" + element;
        newHTML = newHTML + '<div class="col"><div class="card shadow-sm"><img class="game-icon" preserveAspectRatio="xMidYMid slice" class="bd-placeholder-img card-img-top" src="' + curr_game.img_src + '" alt="game-image"><div class="card-body"><p class="card-text">' + desc + '</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-success">Download</button><a href="' + page_loc + '"><button type="button" class="btn btn-sm btn-outline-success">Store Page</button></a></div><small class="text-muted">Play Time: 0 hours</small></div></div></div></div>';
    });
    document.getElementById("games-list-div").innerHTML = newHTML;
}