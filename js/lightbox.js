document.onkeydown = checkKeypress;
function checkKeypress() {
    if (window.event.keyCode == '37') { goLeft(); }
    if (window.event.keyCode == '39') { goRight(); }
    if (window.event.keyCode == '88') { hide(); }
}


function show(selection) {
    transistioning = true;
    document.body.style.overflow = "hidden";
    document.getElementById("lbphoto").src = (selection.src);
	updateSelected();
    
    // Set to 0 opacity and visible
    var lbElements = document.getElementsByClassName("lightbox");
    for (var i = 0; i < lbElements.length; i++) {
        lbElements[i].style.opacity = 0;
        lbElements[i].style.visibility = "visible";
    }
    
    // Format for animation from:
    // https://www.w3schools.com/js/js_htmldom_animate.asp
    var opacity = 0;
    var id = setInterval(transistion, 6);
    function transistion() {
        if (opacity == 100) {
            clearInterval(id);
            transistioning = false;
        }
        else {
            // Fade in and out
            opacity++;
            for (var i = 0; i < lbElements.length; i++) {
                lbElements[i].style.opacity = opacity/100;
            }
            document.getElementById("lightboxnext").style.opacity = 0;
        }
    }
}

function initialize() {
	
	// Initialize images on page
    var photos = document.getElementsByClassName("photo");
    for (var i = 0; i < photos.length; i++) {
        photos[i].addEventListener("click", function() { show(this); }, false);
    }
	
	// Initialize thumbnails
    photos = document.getElementsByClassName("imgthumbnail");
    for (var i = 0; i < photos.length; i++) {
        photos[i].addEventListener("click", function() { show(this); }, false);
    }
}

function hide() {
    transistioning = true;
    document.body.style.overflow = "scroll";
    var lbElements = document.getElementsByClassName("lightbox");
    
    // Format for animation from:
    // https://www.w3schools.com/js/js_htmldom_animate.asp
    var opacity = 0;
    var id = setInterval(transistion, 5);
    function transistion() {
        if (opacity == 100) {
            clearInterval(id);
            transistioning = false;
            
            // Set to hidden
            for (var i = 0; i < lbElements.length; i++) {
                lbElements[i].style.visibility = "hidden";
            }
        }
        else {
            // Fade in and out
            opacity++;
            for (var i = 0; i < lbElements.length; i++) {
                lbElements[i].style.opacity = (100-opacity)/100;
            }
        }
    }
}

function getCurrentImage() {
    
    // Get current image
    var currentImage = document.getElementById("lbphoto").src;
    
    // Isolate number
    var photoNum = parseInt(currentImage.charAt(currentImage.length-5));
    
    // Isolate double digit number
    if (!isNaN(parseInt(currentImage.slice(-6,-4)))) {
        photoNum = parseInt(currentImage.slice(-6,-4));
    }
    
    return photoNum;
}

var transistioning = false;
function goRight() {
    
    if (transistioning == false) {
        transistioning = true;
        var currentImage = getCurrentImage();
        
        // Set new image
        if (currentImage != 19) {
            document.getElementById("lbphotonext").src = ("photos/" + (currentImage+1) + ".jpg");
            
            // Format for animation from:
            // https://www.w3schools.com/js/js_htmldom_animate.asp
            var opacity = 0;
            var id = setInterval(transistion, 5);
            function transistion() {
                if (opacity == 100) {
                    clearInterval(id);
                    
                    // Reset divs and flags
                    document.getElementById("lbphoto").src = ("photos/" + (currentImage+1) + ".jpg");
                    document.getElementById("lightboxnext").style.opacity = 0;
                    document.getElementById("lightboxcurrent").style.opacity = 1;
                    updateSelected();
                    transistioning = false;
                }
                else {
                    // Fade in and out
                    opacity++;
                    document.getElementById("lightboxnext").style.opacity = opacity/100;
                    document.getElementById("lightboxcurrent").style.opacity = (100-opacity)/100;
                }
            }
        }
        else {
            //window.alert("There are no more pictures in this direction");
        }
    }
} // goRight()

function goLeft() {
    
    if (transistioning == false) {
        transistioning = true;
        var currentImage = getCurrentImage();
        
        // Set new image
        if (currentImage != 0) {
            document.getElementById("lbphotonext").src = ("photos/" + (currentImage-1) + ".jpg");
            
            // Format for animation from:
            // https://www.w3schools.com/js/js_htmldom_animate.asp
            var opacity = 0;
            var id = setInterval(transistion, 5);
            function transistion() {
                if (opacity == 100) {
                    clearInterval(id);
                    
                    // Reset divs and flags
                    document.getElementById("lbphoto").src = ("photos/" + (currentImage-1) + ".jpg");
                    document.getElementById("lightboxnext").style.opacity = 0;
                    document.getElementById("lightboxcurrent").style.opacity = 1;
                    updateSelected();
                    transistioning = false;
                }
                else {
                    // Fade in and out
                    opacity++;
                    document.getElementById("lightboxnext").style.opacity = opacity/100;
                    document.getElementById("lightboxcurrent").style.opacity = (100-opacity)/100;
                }
            }
        }
        else {
            //window.alert("There are no more pictures in this direction");
        }
    }
} // goLeft()

function updateSelected() {
	var currentImage = getCurrentImage();
	
	var thumbnails = document.getElementsByClassName("imgthumbnail");
	
	for (var i = 0; i < thumbnails.length; i++) {
		thumbnails[i].style.border = "none";
	}
	
	thumbnails[currentImage].style.border = "5px solid gray";
	
	// Scroll to position
	//window.alert(thumbnails[currentImage].offsetLeft);
	//window.scroll(thumbnails[currentImage].offsetLeft);
}

// Function from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var playing = false;
async function play() {
    
    // If button is on pause
    if (playing == true) {
        document.getElementById("playpause").src = "img/play.png";
        playing == false;
    }
    else {
        document.getElementById("playpause").src = "img/pause.png";
        playing = true;
        while (getCurrentImage() != 19 && playing == true) {
            await sleep(10000);
            
            // Check again incase paused during sleep
            if (playing == true) {
                goRight();
            }
        }
    }
    playing = false;
    document.getElementById("playpause").src = "img/play.png";
}

function prepareNext() {
    var currentImage = getCurrentImage();
    
    if (currentImage != 0) {
        document.getElementById("lbphotoleft").src = ("photos/" + (currentImage-1) + ".jpg");
    }
    
    if (currentImage != 19) {
        document.getElementById("lbphotoleft").src = ("photos/" + (currentImage+1) + ".jpg");
    }
}

