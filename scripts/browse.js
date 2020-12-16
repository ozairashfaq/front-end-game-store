$(document).ready(function() 
{
    var nav_style = getComputedStyle(document.body);

    // ################ Create list items ##################
    populate_top_games(top_sellers_json);
    // #####################################################

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
});

function populate_top_games(data) {
    var good_os = "";
    var new_html = "";
    var temp_arr = new Array();
    for (i in data) {
        if (data[i].win == "True" || data[i].mac == "True" || data[i].linux == "True"){
            good_os = "<div class=\"browse-game-os\">";
            if(data[i].win == "True"){
                good_os = good_os + "<i class=\"fa fa-windows\" aria-hidden=\"true\"></i>";
            }
            if(data[i].mac == "True"){
                good_os = good_os + "<i class=\"fa fa-apple\" aria-hidden=\"true\"></i>";
            }
            if(data[i].linux == "True"){
                good_os = good_os + "<i class=\"fa fa-linux\" aria-hidden=\"true\"></i>";
            }
            good_os = good_os + "</div>";
        }
        new_html = "<a href=\"#\"><div class=\"browse-game-card\"><div class=\"browse-game-img\"><img src=\"" + data[i].img_src + "\" alt=\"" + data[i].name + "\"></div><div class=\"browse-game-details\"><span class=\"browse-game-title\">" + data[i].name + "</span>" + good_os + "<span class=\"browse-game-tags\">" + data[i].tags + "</span></div><div class=\"browse-game-cost\"><span>" + data[i].price + "</span></div></div></a>";
        temp_arr.push(new_html);
        new_html = "";
    }
    shuffle(temp_arr);
    for(i = 0; i < temp_arr.length; i++) {
        new_html = new_html + temp_arr[i];
    }
    document.getElementById("top-sellers-article").innerHTML = new_html;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
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