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

// tank vars 
var tankAngle = 0;
var degInRadius = 2 * Math.PI / 360;
var tankX = (field.offsetWidth / 2) - (tank.offsetWidth / 2);
var tankY = (field.offsetHeight / 2) - (tank.offsetHeight / 2);

tank.setAttribute('style', `top: ${tankY}px; left: ${tankX}px`);

//turret vars
var turretBase = document.querySelector('#turret-base');
var turretBaseX = (field.offsetWidth / 2);
var turretBaseY = (field.offsetHeight / 2);
var mouseX = 0;
var mouseY = 0;
var turretAngle = 0;

function offScreenCheck() {
    if (turretBaseX > field.offsetWidth) {
        tankX = 0 - (tank.offsetWidth / 2);
        turretBaseX = 0;
    }
    if (turretBaseX < 0) {
        tankX = field.offsetWidth - (tank.offsetWidth / 2);
        turretBaseX = field.offsetWidth;
    }

    if (turretBaseY > field.offsetHeight) {
        tankY = 0 - (tank.offsetHeight / 2);
        turretBaseY = 0;
    }

    if (turretBaseY < 0) {
        tankY = field.offsetHeight - (tank.offsetHeight / 2);
        turretBaseY = field.offsetHeight;
    }
}

var mouseMoveHandler = function (e) {
    mouseX = e.clientX - field.offsetLeft;
    mouseY = e.clientY - field.offsetTop;

    turretAngle = Math.atan2(mouseX - turretBaseX, -(mouseY - turretBaseY)) * (180 / Math.PI);
    turretAngle -= tankAngle;
    turretBase.style.transform = 'rotate(' + turretAngle + 'deg)';

}

window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        offScreenCheck();


        forwardPressed = true;
        tankX = tankX + Math.cos(degInRadius * tankAngle);
        tankY = tankY + Math.sin(degInRadius * tankAngle);
        turretBaseX = turretBaseX + Math.cos(degInRadius * tankAngle);
        turretBaseY = turretBaseY + Math.sin(degInRadius * tankAngle);
        tank.style.top = tankY + 'px';
        tank.style.left = tankX + 'px';
    }
    if (event.code === 'KeyS') {
        offScreenCheck();

        backwardsPressed = true;
        tankX = tankX - Math.cos(degInRadius * tankAngle);
        tankY = tankY - Math.sin(degInRadius * tankAngle);
        turretBaseX = turretBaseX - Math.cos(degInRadius * tankAngle);
        turretBaseY = turretBaseY - Math.sin(degInRadius * tankAngle);

        tank.style.top = tankY + 'px';
        tank.style.left = tankX + 'px';
    }
    if (event.code === 'KeyA') {
        rotateLeft = true;
        tankAngle--;
        tank.style.transform = 'rotate(' + tankAngle + 'deg)';

        return turretAngle;
    }
    if (event.code === 'KeyD') {
        rotateRight = true;
        tankAngle++;
        tank.style.transform = 'rotate(' + tankAngle + 'deg)';

        return turretAngle;
    }
    if (event.code === 'KeyR') {
        if (!turretRotateToggle) {
            window.addEventListener('mousemove', mouseMoveHandler)
            turretRotateToggle = true;
            console.log(turretRotateToggle);

            return;
        }
        if (turretRotateToggle) {
            window.removeEventListener('mousemove', mouseMoveHandler);
            turretRotateToggle = false;
            console.log(turretRotateToggle)
            return;

        }
    }
    if (event.code === 'KeyQ') {
        if (!turretRotateToggle) {
            turretAngle--;
            turretBase.style.transform = 'rotate(' + turretAngle + 'deg)';

        }
    }
    if (event.code === 'KeyE') {
        if (!turretRotateToggle) {
            turretAngle++;
            turretBase.style.transform = 'rotate(' + turretAngle + 'deg)';

        }
    }
})

//for inevitable switch to interval ;( 
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
        // turretRotateToggle = false;
    }
    if (event.code === 'KeyQ') {
        // turretRotateToggle = true;
    }
    if (event.code === 'KeyE') {
        // turretRotateToggle = true;
    }
})











// for later
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