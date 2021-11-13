function handleWheel(){
var wheel = document.getElementById('wheel')
var wheelRect = wheel.getBoundingClientRect();
var radius = 220;
var rotationPowerup = 2.5;
var cx = wheelRect.left + wheelRect.width / 2;
var cy = wheelRect.top + wheelRect.height / 2;

var x1 = null, y1 = null;
var initialRotation = 0;
var currentRotation = initialRotation;
rotateWheel = function(deg) {
    currentRotation = currentRotation + deg;
    wheel.style.transform = "rotate("+currentRotation+"deg)";
}
}
var rotateWheel;