var tank = document.querySelector('#tank');
var field = document.querySelector('#field');
// var position = 0;
// var acceleration = 0;
// var rotation = 0;
// var rotationChange = 0;
var forwardPressed = false;
var backwardsPressed = false;
var rotateLeft = false;
var rotateRight = false;
var turretRotateToggle = false;


var angle = 0;
var degInRadius = 2 * Math.PI / 360;
var tankX = field.offsetWidth / 2;
var tankY = field.offsetHeight / 2;

tank.setAttribute('style', `top: ${tankY}px; left: ${tankX}px`);





window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        forwardPressed = true;
        tankX = tankX + Math.cos(degInRadius * angle);
        tankY = tankY + Math.sin(degInRadius * angle);
        tank.style.top = tankY + 'px';
        tank.style.left = tankX + 'px';
    }
    if (event.code === 'KeyS') {
        backwardsPressed = true;
        tankX = tankX - Math.cos(degInRadius * angle);
        tankY = tankY - Math.sin(degInRadius * angle);
        tank.style.top = tankY + 'px';
        tank.style.left = tankX + 'px';
    }
    if (event.code === 'KeyA') {
        rotateLeft = true;
        angle--;
        tank.style.transform = 'rotate(' + angle + 'deg)'
    }
    if (event.code === 'KeyD') {
        rotateRight = true;
        angle++;
        tank.style.transform = 'rotate(' + angle + 'deg)'
    }
    if (event.code === 'KeyR') {
        turretRotateToggle = true;
    }
})
window.addEventListener('keyup', function () {
    if (event.code === 'KeyW') {
        forwardPressed = false;
    }
    if (event.code === 'KeyS') {
        backwardsPressed = false;
    }
    if (event.code === 'KeyA') {
        rotateLeft = false
    }
    if (event.code === 'KeyD') {
        rotateRight = false;
    }
    if (event.code === 'KeyR') {
        turretRotateToggle = false;
    }
})

//try to make turret rotate with mouse cursor pos
var turretBase = document.querySelector('#turret-base');
var mouseX = 0;
var mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    //TODO make torretbase rotate to match mouse pointer
})

// setInterval(() => {

//     if (forwardPressed) {
//         acceleration = 1;
//     } else {
//         acceleration = 0;
//     }

//     if (backwardsPressed) {
//         acceleration = -1;
//     } 

//     if (rotateRight) {
//         rotationChange = 1;
//     } else {
//         rotationChange = 0;
//     }

//     if (rotateLeft) {
//         rotationChange = -1;
//     }

//     position = position + acceleration;
//     rotation = rotation + rotationChange

//     tank.style.left = position + 'px';
//     tank.style.transform = 'rotate('+ rotation +'deg)'

// }, 16)