
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
set_filter_options(urlParams);

$(document).ready(function() 
{
    var nav_style = getComputedStyle(document.body);
    // ################ Create list items ##################
    populate_top_games(top_sellers_json, 15, urlParams);
    // #####################################################
    
    document.getElementById("filter-start-btn").onclick = function(e) {
        e.preventDefault();
        let filter_request = "";
        let filter_cost = document.getElementById("price-slider-custom").value;
        let filter_tag = new Array();
        let filter_os = new Array();
        let filter_no_free = false;
        if(document.getElementById("free-to-play-ck").checked) {
            filter_no_free = true;
        }
        if(document.getElementById("action-tag-check").checked) {
            filter_tag.push("Action");
        }
        if(document.getElementById("adventure-tag-check").checked) {
            filter_tag.push("Adventure");
        }
        if(document.getElementById("open-world-tag-check").checked) {
            filter_tag.push("Open World");
        }
        if(document.getElementById("rpg-tag-check").checked) {
            filter_tag.push("RPG");
        }
        if(document.getElementById("strategy-tag-check").checked) {
            filter_tag.push("Strategy");
        }
        if(document.getElementById("windows-check").checked) {
            filter_os.push("Windows");
        }
        if(document.getElementById("mac-check").checked) {
            filter_os.push("Mac");
        }
        if(document.getElementById("linux-check").checked) {
            filter_os.push("Linux");
        }
        filter_request = "&max_price=" + filter_cost + "&no_free=" + filter_no_free + "&tags=" + JSON.stringify(filter_tag) + "&os=" + JSON.stringify(filter_os);
        window.location = "./browse.html?filter=true" + filter_request;
    }

    document.getElementById("filter-clear-btn").onclick = function(e) {
        e.preventDefault();
        window.location = "./browse.html"
    }
    
    document.getElementById("top-sellers-selected").style.visibility = "visible";

    document.getElementById("tab-new-and-trending").onclick = function(e) {
        e.preventDefault();
        document.getElementById("new-and-trending-selected").style.visibility = "visible";
        document.getElementById("top-sellers-selected").style.visibility = "hidden";
    }
    document.getElementById("tab-top-sellers").onclick = function(e) {
        e.preventDefault();
        document.getElementById("new-and-trending-selected").style.visibility = "hidden";
        document.getElementById("top-sellers-selected").style.visibility = "visible";
    }
    
    document.getElementById("tab-new-and-trending").onmouseover = function(e) {
        e.preventDefault();
        document.getElementById("new-and-trending-selected").style.borderColor = nav_style.getPropertyValue('--theme-primary');
    }
    document.getElementById("tab-top-sellers").onmouseover = function(e) {
        e.preventDefault();
        document.getElementById("top-sellers-selected").style.borderColor = nav_style.getPropertyValue('--theme-primary');
    }

    document.getElementById("tab-new-and-trending").onmouseleave = function(e) {
        e.preventDefault();
        document.getElementById("new-and-trending-selected").style.borderColor = nav_style.getPropertyValue('--theme-secondary');
    }
    document.getElementById("tab-top-sellers").onmouseleave = function(e) {
        e.preventDefault();
        document.getElementById("top-sellers-selected").style.borderColor = nav_style.getPropertyValue('--theme-secondary');
    }
    document.getElementById("price-slider-custom").oninput = function(e) {
        e.preventDefault();
        let slider = document.getElementById("price-slider-custom");
        console.log(slider.value)
        document.getElementById("price-bubble").innerText = "Under CA $" + slider.value;
    }
    document.getElementById("price-slider-custom").onmouseenter = function(e) {
        e.preventDefault();
        document.getElementById("price-details").classList.remove('visually-hidden');
    }
    document.getElementById("price-slider-custom").onmouseleave = function(e) {
        e.preventDefault();
        document.getElementById("price-details").classList.add('visually-hidden');
    }
});

function set_filter_options(params) {
    if (urlParams.get("max_price") !== null) {
        document.getElementById("price-slider-custom").value = urlParams.get("max_price");
        document.getElementById("price-bubble").innerText = "Under CA$ " + urlParams.get("max_price");
    }
    if (urlParams.get("no_free") !== null) {
        if (urlParams.get("no_free") === "true") {
            document.getElementById("free-to-play-ck").checked = true;
        }
    }

    if (urlParams.get("tags") !== null) {
        let tags = JSON.parse(urlParams.get("tags"));
        let os = JSON.parse(urlParams.get("os"));
        if (!tags.includes("Action")) {
            document.getElementById("action-tag-check").checked = false;
        }
        if (!tags.includes("Adventure")) {
            document.getElementById("adventure-tag-check").checked = false;
        }
        if (!tags.includes("Open World")) {
            document.getElementById("open-world-tag-check").checked = false;
        }
        if (!tags.includes("RPG")) {
            document.getElementById("rpg-tag-check").checked = false;
        }
        if (!tags.includes("Strategy")) {
            document.getElementById("strategy-tag-check").checked = false;
        }
        if (!os.includes("Windows")) {
            document.getElementById("windows-check").checked = false;
        }
        if (!os.includes("Mac")) {
            document.getElementById("mac-check").checked = false;
        }
        if (!os.includes("Linux")) {
            document.getElementById("linux-check").checked = false;
        }
    }
}

function populate_top_games(data, num_output, urlParams) {
    let set_filter = urlParams.get("filter");
    
    let max_price = 120;
    let allowed_tags = ["Action","Adventure","Open%20World","RPG","Strategy"];
    let allowed_os = ["Windows","Mac","Linux"];
    let no_free = false;
    if (set_filter === "true") {
        max_price = parseInt(urlParams.get("max_price"));
        if (urlParams.get("no_free") === "true") {
            no_free = true;
        }
        allowed_tags = JSON.parse(urlParams.get("tags"));
        allowed_os = JSON.parse(urlParams.get("os"));

        if (allowed_os.length == 0) {
            return;
        }
    }
    let gotonext = false;
    let good_os = "";
    let new_html = "";
    let temp_arr = new Array();
    for (i in data) {
        gotonext = false;
        let curr_os = new Array();
        if (data[i].win == "True" || data[i].mac == "True" || data[i].linux == "True"){
            good_os = "<div class=\"browse-game-os\">";
            if(data[i].win == "True"){
                good_os = good_os + "<i class=\"fa fa-windows\" aria-hidden=\"true\"></i>";
                curr_os.push("Windows");
            }
            if(data[i].mac == "True"){
                good_os = good_os + "<i class=\"fa fa-apple\" aria-hidden=\"true\"></i>";
                curr_os.push("Mac");
            }
            if(data[i].linux == "True"){
                good_os = good_os + "<i class=\"fa fa-linux\" aria-hidden=\"true\"></i>";
                curr_os.push("Linux");
            }
            good_os = good_os + "</div>";
        }
        let num_match = 0;
        curr_os.forEach(element => {
            if (allowed_os.includes(element)) {
                num_match++;
            }
        });

        if(num_match === 0) {
            continue;
        }

        let price = data[i].price;
        if (no_free === true && price.trim() === "Free to Play") {
            continue;
        }
        if (!(price.trim() === "Free to Play") && parseFloat(price) > max_price){
            continue;
        }

        num_match = 0;
        let curr_tags = data[i].tags.split(",");
        curr_tags.forEach(element => {
            if (allowed_tags.includes(element.trim())) {
                num_match++;
            }
        });
        if(num_match === 0) {
            continue;
        }

        let page_link = (data[i].name).toLowerCase().replaceAll("'", "").replaceAll("’", "").replaceAll(" ", "-").replaceAll("™", "").replaceAll("®", "").replaceAll(":", "");
        let page_loc = "./games/game_page.html?game_name=" + page_link;
        if (!(price.trim() === "Free to Play")){
            price = "CA$ " + data[i].price;
        }
        // console.log(page_loc);
        new_html = "<a href=\"" + page_loc + "\"><div class=\"browse-game-card\"><div class=\"browse-game-img\"><img src=\"" + data[i].img_src + "\" alt=\"" + data[i].name + "\"></div><div class=\"browse-game-details\"><span class=\"browse-game-title\">" + data[i].name + "</span>" + good_os + "<span class=\"browse-game-tags\">" + data[i].tags + "</span></div><div class=\"browse-game-cost\"><span>" + price + "</span></div></div></a>";
        temp_arr.push(new_html);
        new_html = "";
    }
    console.log(temp_arr);
    shuffle(temp_arr);
    for(i = 0; i < temp_arr.length; i++) {
        new_html = new_html + temp_arr[i];
    }
    document.getElementById("top-sellers-article").innerHTML = new_html;

    new_html = "";
    shuffle(temp_arr);
    for(i = 0; i < temp_arr.length; i++) {
        new_html = new_html + temp_arr[i];
    }
    document.getElementById("new-and-trending-article").innerHTML = new_html;
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}