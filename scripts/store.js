
let owned_games = localStorage.getItem("owned_games");
if (owned_games === null) {
    localStorage.setItem("owned_games", "[]");
}

$(document).ready(function() 
{
    document.getElementById("btn-load-more-videos").onclick = function(e) {
        e.preventDefault();
        document.getElementById("video-set-2").classList.toggle('visually-hidden');
        if(document.getElementById("btn-load-more-videos").innerHTML == "View More") {
            document.getElementById("btn-load-more-videos").innerHTML = "View Less";
        } else {
            document.getElementById("btn-load-more-videos").innerHTML = "View More";
        }
    }
    
    document.getElementById("carousel-item-1").onclick = function(e) {
        e.preventDefault();
        $("#carouselControls").carousel(0);
    }

    document.getElementById("carousel-item-2").onclick = function(e) {
        e.preventDefault();
        $("#carouselControls").carousel(1);
    }

    document.getElementById("carousel-item-3").onclick = function(e) {
        e.preventDefault();
        $("#carouselControls").carousel(2);
    }

    document.getElementById("carousel-item-4").onclick = function(e) {
        e.preventDefault();
        $("#carouselControls").carousel(3);
    }

    document.getElementById("carousel-item-5").onclick = function(e) {
        e.preventDefault();
        $("#carouselControls").carousel(4);
    }
});