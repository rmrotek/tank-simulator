var tank = document.querySelector('#tank');
var field = document.querySelector('#field');
var turretEnd = document.querySelector('#turret-end');
var ammoStatus = document.querySelector('.ammo-reload');
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

//turret base vars
var turretBase = document.querySelector('#turret-base');
var turretBaseX = (field.offsetWidth / 2);
var turretBaseY = (field.offsetHeight / 2);
var mouseX = 0;
var mouseY = 0;
var turretAngle = 0;

//ball
var ball;
var ballX;
var ballY;
var ballAngle;
var ballReady = false;
var ballReloading = false;

//turret

var turretEndX = turretEnd.getBoundingClientRect().left - field.offsetLeft;
var turretEndY = turretEnd.getBoundingClientRect().top - field.offsetTop;
var turretEndCenterX = turretEndX - (turretEnd.offsetWidth / 2);
var turretEndCenterY = turretEndY - (turretEnd.offsetHeight / 2);


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

function turretPositionUpdater() {
    turretEndX = turretEnd.getBoundingClientRect().left - field.offsetLeft;
    turretEndY = turretEnd.getBoundingClientRect().top - field.offsetTop;
    turretEndCenterX = turretEndX + (turretEnd.offsetWidth / 2);
    turretEndCenterY = turretEndY + (turretEnd.offsetHeight / 2);
}

function makeBall() {
    ball = document.createElement('div');
    ball.classList.add('ball');
    turretPositionUpdater();
    ballX = turretEndX;
    ballY = turretEndY;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    updateBallAngle();

    field.appendChild(ball);

    setTimeout(() => {
        field.removeChild(ball);
    }, 3000)
}

function updateBallAngle() {
    ballAngle = Math.atan2(-(turretBaseX - turretEndCenterX), -(turretBaseY - turretEndCenterY)) * (180 / Math.PI);
}

setInterval(() => {
    if (!ball) {
        return;
    }

    ballX = ballX + Math.sin(degInRadius * (ballAngle));
    ballY = ballY + Math.cos(degInRadius * (ballAngle));
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}, 10)

var mouseMoveHandler = function (e) {
    mouseX = e.clientX - field.offsetLeft;
    mouseY = e.clientY - field.offsetTop;

    turretAngle = Math.atan2(mouseX - turretBaseX, -(mouseY - turretBaseY)) * (180 / Math.PI);
    turretAngle -= tankAngle;
    turretBase.style.transform = 'rotate(' + turretAngle + 'deg)';

    //update turret pos
    turretPositionUpdater();
}

window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        offScreenCheck();
        turretPositionUpdater();


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
        turretPositionUpdater();

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
            turretPositionUpdater();
        }
    }
    if (event.code === 'KeyE') {
        if (!turretRotateToggle) {
            turretAngle++;
            turretBase.style.transform = 'rotate(' + turretAngle + 'deg)';
            turretPositionUpdater();
        }
    }
    if (event.code === 'Space') {
        if (ballReady && !ballReloading) {
            makeBall();
            ballReady = false;
            console.log(ballReady);
            ammoStatus.innerHTML = 'Reload needed!';

            return;
        }
        if (ballReloading) {
            console.log('reload in progress');

            return;
        }
        if (!ballReady) {
            console.log('reloading');
            ballReloading = true;
            i = 3;
            console.log('ball ready in ' + i)
            ammoStatus.innerHTML = 'Ready in ' + i + 's';

            interval = setInterval(() => {
                i--;
                console.log('ball ready in ' + i)
                ammoStatus.innerHTML = 'Ready in ' + i + 's';

            }, 1000);

            setTimeout(() => {
                ballReady = true;
                ballReloading = false;
                ammoStatus.innerHTML = 'Ready';
                console.log('ballReady');
                clearInterval(interval);
            }, 3000);
            return;
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
        rotateLeft = false;
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