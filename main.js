var assetHandler = new AssetHandler()
var screen;
window.onload = function(){
    screen = document.getElementById("gamescreen")
    handleWheel();
    assetHandler.loadImages([["bunker", "bunker.png"],["lili", "lili.png"],["spider", "spider.png"],["tim", "timase.png"], ["enemy", "enemy.png"]], function(){startGame()})
}

var lilisprite;
var timsprite;
var backgroundDomSprite;
var environmentOverlayA;
var environmentOverlayB;
var environmentOverlayC;
var environmentOverlayD;
var environmentOverlayE;
var environmentOverlayF;
function startGame(){
    backgroundDomSprite = new DomSprite(assetHandler.images.bunker)
    backgroundDomSprite.appendSprite(screen)
    backgroundDomSprite.updateDrawing(0,0,400,50,1)
    backgroundDomSprite.updatePosition(0,200,4000,500)
    backgroundDomSprite.updateZIndex(0)
    
    environmentOverlayA = new DomSprite(assetHandler.images.bunker)
    environmentOverlayA.appendSprite(screen)
    environmentOverlayA.updateDrawing(0,50,400,50,1)
    environmentOverlayA.updatePosition(0,200,4000,500)
    environmentOverlayA.updateZIndex(1)
    environmentOverlayA.hide()
    
    environmentOverlayB = new DomSprite(assetHandler.images.bunker)
    environmentOverlayB.appendSprite(screen)
    environmentOverlayB.updateDrawing(0,100,400,50,1)
    environmentOverlayB.updatePosition(0,200,4000,500)
    environmentOverlayB.updateZIndex(1)
    environmentOverlayB.hide()
    
    environmentOverlayC = new DomSprite(assetHandler.images.bunker)
    environmentOverlayC.appendSprite(screen)
    environmentOverlayC.updateDrawing(0,150,400,50,1)
    environmentOverlayC.updatePosition(0,200,4000,500)
    environmentOverlayC.updateZIndex(1)
    environmentOverlayC.hide()
    
    environmentOverlayD = new DomSprite(assetHandler.images.bunker)
    environmentOverlayD.appendSprite(screen)
    environmentOverlayD.updateDrawing(0,200,400,50,1)
    environmentOverlayD.updatePosition(0,200,4000,500)
    environmentOverlayD.updateZIndex(1)
    environmentOverlayD.hide()
    
    environmentOverlayE = new DomSprite(assetHandler.images.bunker)
    environmentOverlayE.appendSprite(screen)
    environmentOverlayE.updateDrawing(0,250,400,50,1)
    environmentOverlayE.updatePosition(0,200,4000,500)
    environmentOverlayE.updateZIndex(1)
    environmentOverlayE.hide()
    
    environmentOverlayF = new DomSprite(assetHandler.images.bunker)
    environmentOverlayF.appendSprite(screen)
    environmentOverlayF.updateDrawing(0,300,400,50,1)
    environmentOverlayF.updatePosition(0,200,4000,500)
    environmentOverlayF.updateZIndex(1)
    environmentOverlayF.hide()
    
    lilisprite = new DomSprite(assetHandler.images.lili)
    lilisprite.appendSprite(screen)
    lilisprite.updateDrawing(0,0,30,25,1)
    lilisprite.updatePosition(0,450,300,250)
    lilisprite.updateZIndex(10)
    
    timsprite = new DomSprite(assetHandler.images.tim)
    timsprite.appendSprite(screen)
    timsprite.updateDrawing(0,0,32,40,1)
    timsprite.updatePosition(0,450,320,400)
    timsprite.updateZIndex(9)
    
    spawnEnemy("creature")
    
    var input = document.getElementById("consoleInput");
    
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("consoleEnter").click();
      }
    });
    
    tick();
    
}



var lili = {
    x: 2500,
    y: 0,
    dir: "right",
    curFrame: 0,
    frameCounter: 0,
    action: "idle",
    gravity: 0,
    touchingGround: true,
    hp: 3,
}
var enemies = [];

function spawnEnemy(type){
    let xSpawn = -150;
    if(Math.random() < 0.5){xSpawn = 3650}
    xSpawn = 100;
    
    if(type == "creature"){
        let creatureSprite = new DomSprite(assetHandler.images.enemy)
        creatureSprite.appendSprite(screen)
        creatureSprite.updateDrawing(0,0,30,25,1)
        creatureSprite.updateZIndex(9)
        
        var creatureObject = {type: "creature", hp: 10, x: xSpawn, attackCooldown: 20 + (Math.random()*30), animationFrame: 0, animationCounter: 0, domSprite: creatureSprite, dir: "right", action: "run"}
        enemies.push(creatureObject)
    }
}

function drawAndUpdateEnemies(delta){
    for(let i = 0; i < enemies.length; i++){
        let enemy = enemies[i];
        if(enemy.type == "creature"){
            let distanceFromLili = Math.abs(lili.x - enemy.x)
            let distanceFromTim = Math.abs(tim.x - enemy.x)
            
            let targetX = lili.x;
            let distanceFromTarget = distanceFromLili;
            
            if(enemy.action != "dying" && enemy.action != "damage"){
                if(distanceFromTarget > 150 && enemy.action != "attack"){
                    if(enemy.x < targetX){
                        enemy.dir = 'right'
                        enemy.x += delta
                        enemy.action = "run"
                    }
                    else {
                        enemy.dir = 'left'
                        enemy.x -= delta
                        enemy.action = "run"
                    }
                }
                else {
                    enemy.attackCooldown -= delta/2
                    if(enemy.attackCooldown < 0 && enemy.action != "attack"){
                        enemy.action = "attack"
                        console.log("attack")
                        enemy.animationFrame = 0;
                        enemy.animationCounter = 0;
                    }
                    if(enemy.action != "attack"){
                        enemy.action = "idle"
                    }
                }
                
                if(enemy.action == 'idle'){
                    if(enemy.x < targetX){
                        enemy.dir = 'right'
                    }
                    else {
                        enemy.dir = 'left'
                    }
                }
            }
            
            var xFrame = 0;
            var yFrame = 0;
            
            if(enemy.action == "idle"){
                xFrame = 0;
            }
            else if(enemy.action == "run"){
                xFrame = (0+enemy.animationFrame);
                
                console.log(enemy.animationFrame)
                enemy.animationCounter += delta;
                if(enemy.animationCounter > 25){
                    enemy.animationCounter = 0;
                    enemy.animationFrame++;
                    if(enemy.animationFrame > 2){
                        enemy.animationFrame = 0;
                    }
                }
            }
            else if(enemy.action == "attack"){
                xFrame = (3+enemy.animationFrame);
                
                console.log(enemy.animationFrame)
                enemy.animationCounter += delta/2;
                if(enemy.animationCounter > 25){
                    enemy.animationCounter = 0;
                    enemy.animationFrame++;
                    if(enemy.animationFrame > 1){
                        enemy.animationCounter += delta/2;
                    }
                    if(enemy.animationFrame > 2){
                        enemy.animationFrame = 0;
                        enemy.attackCooldown =  150 + (Math.random()*30)
                        enemy.action = "idle"
                        if(enemy.dir = "left"){
                            if(lili.x > enemy.x - 160 && lili.x < enemy.x + 10 && lili.action != "crouch"){
                                message("<span style='color: red'>Ow!</span>")
                                lili.hp -= 1;
                            }
                        }
                        if(enemy.dir = "right"){
                            if(lili.x < enemy.x + 160 && lili.x > enemy.x - 10 && lili.action != "crouch"){
                                message("<span style='color: red'>Ow!</span>")
                                lili.hp -= 1;
                            }
                        }
                    }
                }
            }
            else if(enemy.action == "dying"){
                xFrame = 6;
                enemy.animationCounter += delta/50;
                if(enemy.dead == true){
                 enemy.animationCounter = 0;   
                }
                if(enemy.animationCounter > 1){
                    xFrame = 7;
                }
                if(enemy.animationCounter > 100){
                    enemy.action = "idle";
                }
            }
            else if(enemy.action == "damage"){
                xFrame = 6;
                enemy.animationCounter += delta/1;
                if(enemy.animationCounter > 50){
                    enemy.action = "idle";
                }
            }
            
            if(enemy.dir == 'right'){
                yFrame = 1;
                enemy.domSprite.updateDrawing(xFrame*30,yFrame*25,30,25,1)
                enemy.domSprite.updatePosition(-lili.x + window.innerWidth/2 - 150 + enemy.x + 70, 430, 300, 250);
            }
            if(enemy.dir == 'left'){
                yFrame = 0;
                enemy.domSprite.updateDrawing(xFrame*30,yFrame*25,30,25,1)
                enemy.domSprite.updatePosition(-lili.x + window.innerWidth/2 - 150 + enemy.x - 70, 430, 300, 250);
            }
        }
    }
}

var lastTime = new Date()
function tick(){
    var currentTime = new Date();
    var delta = (currentTime.getTime() - lastTime.getTime())/4;
    lastTime = currentTime;
    if(!bisou && !goingToElevator){
        if(lili.action != "attack"){
            if(keys.right && (!keys.down || !lili.touchingGround)){
                lili.x += 2*delta;
                lili.dir = "right"
            }
            if(keys.left && (!keys.down || !lili.touchingGround)){
                lili.x -= 2*delta;
                lili.dir = "left"
            }
            if(keys.up && lili.touchingGround){
                lili.gravity = -8
            }
            if(keys.right || keys.left){
                lili.action = "run"
            }
            else {
                lili.action = "idle"
            }
            if(keys.down && lili.touchingGround){
                lili.action = "crouch"
            } 
        }
    }
    
    if(goingToElevator){
        if(lili.x > 1129.5){
            lili.x -= 2*delta;
            lili.dir = "left"
            lili.action = "run"
        }
        else if (lili.x < 1125.5){
            lili.x += 2*delta;
            lili.dir = "right"
            lili.action = "run"
        }
        else {
            lili.action = "idle"
        }
    }
    
    lili.gravity += 0.1*delta;
    lili.y += lili.gravity;
    if(lili.y > 0){
        lili.touchingGround = true
        lili.y = 0;
    }
    else{
        lili.action = "jump"
        lili.touchingGround = false
    }
    
    if(lili.action!= "idle"){
        document.getElementById("safeMenu").style.display = "none";
    }
    
    
    
    drawLili(delta)
    drawTim(delta)
    updateUi(delta)
    
    if(lili.x > 3546.5){lili.x = 3546.5}
    if(lili.x < 80){lili.x = 80}
    if(tim.x > 3546.5){tim.x = 3546.5}
    if(tim.x < 80){tim.x = 80}
    
    if(tim.goal == "bisou"){
        if(lili.x > tim.x){
            tim.x += 2*delta;
            tim.dir = "right";
            tim.action="run"
           if(lili.x-tim.x < 25){
                tim.goal = "idle"
                lili.dir = "left"
                if(lili.action == "idle"){
                    if(lili.hp < 3){
                        lili.hp++
                    }
                    bisou = 100;
                    if(goingToElevator == true && lili.x < 1129.5 && lili.x > 1125.5){
                        endSequenceCounter = 0;
                    }
                }
            }
        }
         else {
            tim.x -= 2*delta;
            tim.dir = "left";
            tim.action="run"
           if(tim.x-lili.x < 25){
                tim.goal = "idle"
                lili.dir = "right"
                if(lili.action == "idle"){
                     if(lili.hp < 3){
                        lili.hp++
                    }
                    bisou = 100;
                    if(goingToElevator == true && lili.x < 1129.5 && lili.x > 1125.5){
                        endSequenceCounter = 0;
                    }
                }
           }
        }
        
    }
    else if(tim.goal == "fight"){
        
    }
    else if(tim.goal == "idle"){
        tim.action = "idle";
    }
    
    bisou -= delta;
    if(bisou < 0){
        bisou = 0;
    }
    
    drawAndUpdateEnemies(delta);
    
    window.requestAnimationFrame(tick)
}

var tim = {
    x: 2500,
    y: 0,
    dir: "right",
    curFrame: 0,
    goal: "none",
    frameCounter: 0,
    action: "idle",
    gravity: 0,
    touchingGround: true,
}

var bisou = 0;

function callTim(){
    tim.goal = "bisou";
    let random = Math.random()
    if(random < 0.2){
        message("<span style='color: orange'>you: mon amouuuuur</span>")
    }
    else if(random < 0.4){
        message("<span style='color: orange'>you: mon doudouuuu</span>")
    }
    else if(random < 0.7){
        message("<span style='color: orange'>you: timouuneeeeet</span>")
    }
    else if(random < 0.8){
        message("<span style='color: orange'>you: mon chatoooon</span>")
    }
    else {
        message("<span style='color: orange'>you: tim tim tim tim !</span>")
    }
}

function drawTim(delta){
    var frameX = 0;
    var frameY = 0;
    
    if(tim.action == "idle"){
        frameX = 0;
    }
    
    if(tim.action == "run"){
        frameX = (1+tim.curFrame)*32;
        
        tim.frameCounter += delta;
        if(tim.frameCounter > 25){
            tim.frameCounter = 0;
            tim.curFrame++;
            if(tim.curFrame > 3){
                tim.curFrame = 0;
            }
        }
    }
    
    
    if(tim.dir == "left"){
        frameY = 0
    }
    else {
        frameY = 40
    }
    
    if(bisou){
        timsprite.hide()
    }
    else {
        timsprite.show()
    }

    timsprite.updateDrawing(frameX,frameY,30,25,1)
    timsprite.updatePosition(-lili.x + window.innerWidth/2 - 150 + tim.x,445,300,250)
}

function openSafe(){
    if(elem("safeInput").value.toLowerCase() == "mwah!"){
        elem("keyBlue").style.display = "inline";
        hasBlueKey = true;
    }   
}

var currentKeypad = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
var rightKeypad = [
    [0,2,1],
    [2,1,0],
    [0,1,0]
]
function keypadPressed(x,y){
    x = x-1;
    y = y-1;
    if(currentKeypad[x][y] == 0){
        currentKeypad[x][y] = 1
    }
    else if(currentKeypad[x][y] == 1){
        currentKeypad[x][y] = 2
    }
    else if(currentKeypad[x][y] == 2){
        currentKeypad[x][y] = 0
    }
    var colorTable = ["grey", "yellow", "red"];
    elem("keypadButton" + (x+1) + (y+1)).style.background = colorTable[currentKeypad[x][y]];
    
    for(let a = 0; a < 3; a++){
        for(let b = 0; b < 3; b++){
            if(currentKeypad[a][b] != rightKeypad[a][b]){
                return
            }
        }
    }
    environmentOverlayC.show();
    elem("keypadPopup").style.display = "none";
    goingToElevator = true;
    deleteCreature()
}

var goingToElevator = false;
var endSequenceCounter = -1;

function deleteCreature(){
    enemies[0].domSprite.hide();
    enemies[0].action = "dying";
    enemies[0].dead = true;
}

function updateUi(delta){
    if(endSequenceCounter >= 0){
        endSequenceCounter+= delta/2;
        elem("endScreen").style.display = "block";
        elem("endScreen").innerHTML = "";
        if(endSequenceCounter < 100){
            elem("endScreen").style.opacity = endSequenceCounter/100
        }
        else {
            elem("endScreen").style.opacity = 1
            
            if(endSequenceCounter >= 150){
                elem("endScreen").style.fontSize = "20px";
                elem("endScreen").innerHTML = "Well done mon amour <br> Enjoy your prizes <br> \
                <img src='win.gif' class='endGif'></img><br>\
                <a href='flame.gif' target='_blank' download='perfect_match'>Perfect Match</a><br><a href='falling2.gif' target='_blank' download='taking_the_plunge'>Taking the Plunge</a>"
                endSequenceCounter = -1;
            }
        }
    }
    
    updateMessages(delta);
    var table = document.getElementById("lightUpTable");
    if(table){
        table.style.left = (window.innerWidth/2 - lili.x + 2300) + "px"
    }
    backgroundDomSprite.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayA.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayB.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayC.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayD.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayE.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    environmentOverlayF.updatePosition(-lili.x + window.innerWidth/2 - 150,200,4000,500)
    rotateWheel(safeDirection * delta/10);
    
    elem("hpCounter").innerHTML = ""
    for(let i = 0; i < lili.hp; i++){
        elem("hpCounter").innerHTML += "0";
    }
    if(lili.hp <= 0){
        endScreen.style.display = "block";
    }
    
    var bottomDrawer = document.getElementById("bottomDrawer");
    bottomDrawer.style.left = (window.innerWidth/2 - lili.x + 900) + "px"
    var midDrawer = document.getElementById("midDrawer");
    midDrawer.style.left = (window.innerWidth/2 - lili.x + 900) + "px"
    var topDrawer = document.getElementById("topDrawer");
    topDrawer.style.left = (window.innerWidth/2 - lili.x + 900) + "px"
    var computer = document.getElementById("computer");
    computer.style.left = (window.innerWidth/2 - lili.x + 630) + "px"
    var printer = document.getElementById("printer");
    printer.style.left = (window.innerWidth/2 - lili.x + 300) + "px"
    var machine = document.getElementById("machine");
    machine.style.left = (window.innerWidth/2 - lili.x + 1700) + "px"
    var plug = document.getElementById("plug");
    plug.style.left = (window.innerWidth/2 - lili.x + 2050) + "px"
    var safe = document.getElementById("safe");
    safe.style.left = (window.innerWidth/2 - lili.x + 2850) + "px"
    var numpad = document.getElementById("numpad");
    numpad.style.left = (window.innerWidth/2 - lili.x + 1260) + "px"
}

var table = [[0,0,0,2,0,0,0],
             [0,2,0,0,0,2,0],
             [0,0,0,0,0,0,0],
             [2,0,0,0,0,0,2],
             [0,0,0,0,0,0,0],
             [0,2,0,0,0,2,0],
             [0,0,0,2,0,0,0]];
var correct_table =
            [[0,1,0,2,0,0,1],
             [1,2,1,0,0,2,0],
             [0,1,0,0,0,0,0],
             [2,0,0,0,0,1,2],
             [0,0,0,1,0,0,0],
             [1,2,0,0,1,2,1],
             [0,1,0,2,0,1,0]];
function tableClick(area){
    if(lili.x > 2128.5 && lili.x < 2844){
        var x = area[2];
        var y = area[0];
        console.log(x,y);
        
        if(table[y][x] != 2){
             if(table[y][x] == 0){
                table[y][x] = 1;
                document.getElementById(area).style.background = "green"
             }
             else {
                table[y][x] = 0;
                document.getElementById(area).style.background = "none";
             }
        }
        
        for(let xx = 0; xx < table[0].length; xx++){
            for(let yy = 0; yy < table[0].length; yy++){
                if(table[xx][yy] != correct_table[xx][yy]){
                    return;
                }
            }
        }
        environmentOverlayF.show();
        document.body.removeChild(document.getElementById("lightUpTable"));
    }
}

function attack(){
    lili.action = "attack"
}

var safeDirection = 0;
var machinePlugged = false;
function plugClicked(){
    environmentOverlayB.show();
    machinePlugged = true;
    document.getElementById("plug").style.width = "0px" 
}

function bottomDrawerClicked(){
    if(lili.x > 791 && lili.x < 1121.5){
        document.getElementById("note").style.display = "inline";
        document.getElementById("bottomDrawer").style.width = "0px";
        message("You recieved a note!");
    }
    else {
        message("You're too far.")
    }
}

function midDrawerClicked(){
    if(lili.x > 791 && lili.x < 1121.5){
        if(hasBlueKey){
            elem("keyRed").style.display = "inline";
            elem("stickyNote").style.display = "inline";
            hasRedKey = true;
            document.getElementById("midDrawer").style.width = "0px";
            message("You've received a sticky note and a red key!")
        }
        else {
            message("Needs a key!")
        }
    }
    else {
        message("You're too far.")
    }
}

var consoleStage = 0;
var hasPrinted = false;
function verifyComputerInput(){
    elem("consoleText").innerHTML += "<span style='color: white'>" + elem("consoleInput").value + "<br></span>";
    let value = elem("consoleInput").value
    if(consoleStage == 0){
        if(value == "alittlebite"){
            elem("consoleText").innerHTML += "<span style='color: blue'>Password: </span>";
            consoleStage = 1;
        }
        else {
            elem("consoleText").innerHTML += "Incorrect username. Try again? <br><span style='color: blue'>Username: </span>";
        }
    }
    else if(consoleStage == 1){
        if(value == "hehehe"){
            elem("consoleText").innerHTML += "Your password has been changed recently. Let's try some security questions instead. <br> What's your birthday day and month? (E.x. June 12)\
            <br><span style='color: blue'>Response: </span>";
            consoleStage = 2;
        }
        else {
            elem("consoleText").innerHTML += "Incorrect password. Try again? <br><span style='color: blue'>Username: </span>";
            consoleStage = 0;
        }
    }
    else if(consoleStage == 2){
        if(value.toLowerCase() == "march 18"){
            elem("consoleText").innerHTML += "Least favorite movie genre?\
            <br><span style='color: blue'>Response: </span>";
            consoleStage = 3;
        }
        else {
            elem("consoleText").innerHTML += "I'm disappointed :( Try again?<br> <span style='color: blue'>Username: </span>";
            consoleStage = 0;
        }
    }
    else if(consoleStage == 3){
        if(value.toLowerCase() == "horror"){
            elem("consoleText").innerHTML += "Favorite American singer?\
            <br><span style='color: blue'>Response: </span>";
            consoleStage = 4;
        }
        else {
            elem("consoleText").innerHTML += "I'm disappointed :( Try again?<br> <span style='color: blue'>Username: </span>";
            consoleStage = 0;
        }
    }
    else if(consoleStage == 4){
        if(value.toLowerCase() == "taylor swift"){
            elem("consoleText").innerHTML += "Favorite person in the entire world? (4 letters)\
            <br><span style='color: blue'>Response: </span>";
            consoleStage = 5;
        }
        else {
            elem("consoleText").innerHTML += "I'm disappointed :( Try again?<br> <span style='color: blue'>Username: </span>";
            consoleStage = 0;
        }
    }
    else if(consoleStage == 5){
        if(value.toLowerCase() == "lili"){
            elem("consoleText").innerHTML += "<span style='color: yellow'>Accepted! You're logged in</span><br>C:// Would you like to print the file on this computer?<br><span style='color: white'>User: </span>";
            consoleStage = 6;
        }
        else {
            elem("consoleText").innerHTML += "mdrrr t'es nulle";
            consoleStage = 0;
        }
    }
    else if(consoleStage == 6){
        if(value.toLowerCase() == "y" || value.toLowerCase() == "yes"){
            elem("consoleText").innerHTML += "C:// Whats the magic word?<br><span style='color: white'>User: </span>";
            consoleStage = 7;
        }
        else {
            elem("consoleText").innerHTML += "C:// Would you like to print the file on this computer?<br><span style='color: white'>User: </span>";
        }
    }
    else if(consoleStage == 7){
        if(value.toLowerCase() == "please" || value.toLowerCase() == "please?"){
            elem("consoleText").innerHTML += "C:// Wrong magic word. ;)<br><span style='color: white'>User: </span>";
        }
        else if(value.toLowerCase() == "i love you") {
             elem("consoleText").innerHTML += "C:// Wrong language.<br><span style='color: white'>User: </span>";
        }
        else if(value.toLowerCase() == "je t'aime"){
            elem("consoleText").innerHTML += "C:// je t'aime aussi mon amour. Good luck with the rest of the game!<br><span style='color: red'>Printing...</span>";
            environmentOverlayD.show();
            hasPrinted = true;
            consoleStage = 8;
        }
        else {
            elem("consoleText").innerHTML += "C:// Not the magic word.<br><span style='color: white'>User: </span>";
        }
    }
    elem("consoleInput").value = '';
    elem("consoleText").scrollTop =  elem("consoleText").scrollHeight;
}

function computerClicked(){
    if(lili.x > 490 && lili.x < 955.5){
        elem("computerConsole").style.display = "block";
    }
    else {
        message("You're too far.")
    }
}

function printerClicked(){
    if(lili.x > 170 && lili.x < 646){
        if(hasPrinted){
            message("You've received a mysterious diagram!")
            environmentOverlayD.hide();
            elem("diagramIcon").style.display = "block";
            hasPrinted = false;
        }
        else {
            message("There's nothing in the tray.")
        }
    }
    else {
        message("You're too far.")
    }
}

function numpadClicked(){
    if(lili.x > 1143 && lili.x < 1548){
        elem("keypadPopup").style.display = "block";
    }
    else {
        message("You're too far.")
    }
}

function topDrawerClicked(){
    if(lili.x > 791 && lili.x < 1121.5){
        if(hasRedKey){
            elem("keyRed").style.display = "inline";
            hasRedKey = true;
            document.getElementById("topDrawer").style.width = "0px";
        }
        else {
            message("Needs a key!")
        }
    }
    else {
        message("You're too far.")
    }
}

function showNote(){
    document.getElementById("notePopup").style.display = "block";
}

function showLoginPopup(){
    document.getElementById("loginNotePopup").style.display = "block";
}

function safeClicked(){
    if(lili.x > 2765.5 && lili.x < 3297){
        document.getElementById("safeMenu").style.display = "block";
    }
    else {
        message("You're too far.")
    }
}

function showKey(){
    message("Probably opens something.");
}

function machineClicked(){
    if(lili.x > 1528 && lili.x < 2132){
        if(machinePlugged){
            
        }
        else {
            message("hmm... it appears to be broken")
        }
    }
    else {
        message("You're too far.")
    }
}

function updateMessages(delta){
    for(let i = messages.length-1; i >= 0; i--){
        messages[i][1] -= delta/3;
        elem('msg' + messages[i][0]).style.opacity = messages[i][1]/200
        if(messages[i][1] < 0){
            elem("bottomText").removeChild(elem('msg' + messages[i][0]));
            messages.splice(i,1)
        }
    }
}

var messages = [];
var messageId = 0;
function message(m){
    messages.push([messageId, 200])
    elem("bottomText").innerHTML += "<span class='message' id = 'msg" + messageId + "'>" + m + "<br></span>"
    messageId++;
}

function elem(e){
    return document.getElementById(e)
}

var hasRedKey = false;
var hasBlueKey = false;

function drawLili(delta){
    var frameX = 0;
    var frameY = 0;
    
    if(lili.action == "idle"){
        frameX = 0;
    }
    
    if(lili.action == "run"){
        frameX = (3+lili.curFrame)*30;
        
        lili.frameCounter += delta;
        if(lili.frameCounter > 25){
            lili.frameCounter = 0;
            lili.curFrame++;
            if(lili.curFrame > 3){
                lili.curFrame = 0;
            }
        }
    }
    
    if(lili.action == "jump"){
        frameX = 30*1;
    }
    
    if(lili.action == "crouch"){
        frameX = 30*2;
    }
    
    if(bisou){
        frameX = 10*30;
    }
    
    if(lili.action == "attack"){
        frameX = (5+lili.curFrame)*30;
        
        lili.frameCounter += delta;
        if(lili.frameCounter > 25){
            lili.frameCounter = 0;
            lili.curFrame++;
            if(lili.curFrame > 3){
                lili.curFrame = 0;
                lili.action = "idle";
                
                for(let i = 0; i < enemies.length; i++){
                    if(lili.dir == "left"){
                        if(enemies[i].x > lili.x - 200 && enemies[i].x < lili.x && enemies[i].action != "dying"){
                            enemies[i].hp -= 10;
                            enemies[i].animationCounter = 0;
                            enemies[i].action = "damage";
                            if(enemies[i].hp <= 0){
                                enemies[i].hp = maxEnemyHp;
                                maxEnemyHp += 15;
                                enemies[i].action = "dying";
                                enemies[i].animationCounter = 0;
                            }
                        }
                    }
                    else {
                        if(enemies[i].x < lili.x + 200 && enemies[i].x > lili.x && enemies[i].action != "dying"){
                            enemies[i].hp -= 10;
                            enemies[i].animationCounter = 0;
                            enemies[i].action = "damage";
                            if(enemies[i].hp <= 0){
                                enemies[i].hp = maxEnemyHp;
                                maxEnemyHp += 15;
                                enemies[i].action = "dying";
                                enemies[i].animationCounter = 0;
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    if(lili.dir == "left"){
        frameY = 25
    }
    else {
        frameY = 0
    }
    
    lilisprite.updateDrawing(frameX,frameY,30,25,1)
    lilisprite.updatePosition(window.innerWidth/2 - 150,450+lili.y,300,250)
}
var maxEnemyHp = 10;