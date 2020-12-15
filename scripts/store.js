
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
});