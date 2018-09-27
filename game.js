var tank = document.querySelector('#tank');
var position = 0;
var acceleration = 0;
var rotation = 0;
var forwardPressed = false;
var backwardsPressed = false;
var rotateLeft = false;
var rotateRight = false;
var turretRotateToggle = false;

window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        forwardPressed = true;
    }
    if (event.code === 'KeyS') {
        backwardsPressed = true;
    }
    if (event.code === 'KeyA') {
        rotateLeft = true;
    }
    if (event.code === 'KeyD') {
        rotateRight = true;
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

setInterval(() => {

    if (forwardPressed) {
        acceleration = 1;
    } else {
        acceleration = 0;
    }

    if (backwardsPressed) {
        acceleration = -1;
    } 

    position = position + acceleration;

    tank.style.left = position + 'px';

}, 16)