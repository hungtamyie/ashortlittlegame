var keys = {
    up: false,
    left: false,
    down: false,
    right: false,
}

document.onkeydown = function(e){
    e = e || window.event;
    if (e.keyCode == '38') {
        keys.up = true;
    }
    else if (e.keyCode == '40') {
        keys.down = true;
    }
    else if (e.keyCode == '37') {
       keys.left = true;
    }
    else if (e.keyCode == '39') {
       keys.right = true;
    }
    if(e.keyCode == '17'){
        callTim();
    }
    if(e.key== ' ' && lili.action != "attack"){
        attack();
        lili.curFrame = 0;
        lili.frameCounter = 0;
    }
    
}

document.onkeyup = function(e){
    e = e || window.event;
    if (e.keyCode == '38') {
        keys.up = false;
    }
    else if (e.keyCode == '40') {
        keys.down = false;
    }
    else if (e.keyCode == '37') {
       keys.left = false;
    }
    else if (e.keyCode == '39') {
       keys.right = false;
    }
}

