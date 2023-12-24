const clockCanvas = document.querySelector('#clock');
const clockCanvasCtx = clockCanvas.getContext('2d');

const formatInput = document.getElementById('24hr-toggle');

hoursElement = document.getElementById('hours');
minutesElement = document.getElementById('minutes');
secondsElement = document.getElementById('seconds');
AM_PM = document.getElementById('am_pm');

// automatically adapts to default state
if (formatInput.checked) {
    AM_PM.classList.remove('opacity-100');
    AM_PM.classList.add('opacity-0', 'pointer-events-none');

    hoursElement.classList.toggle('after:translate-y-20');
} else {
    AM_PM.classList.remove('opacity-0', 'pointer-events-none');
    AM_PM.classList.add('opacity-100');

    hoursElement.classList.toggle('before:-translate-y-20');
}
// automatically adapts to default state

formatInput.addEventListener('change', () => {
    // check for checkbox
    if (formatInput.checked) {
        AM_PM.classList.remove('opacity-100');
        AM_PM.classList.add('opacity-0', 'pointer-events-none');
    } else {
        AM_PM.classList.remove('opacity-0', 'pointer-events-none');
        AM_PM.classList.add('opacity-100');
    }

    hoursElement.classList.toggle('before:-translate-y-20');
    hoursElement.classList.toggle('after:translate-y-20');
});

function reset() {
    clockCanvas.width = 200;
    clockCanvas.height = 200;

    clockCanvasCtx.strokeStyle = 'white';
    clockCanvasCtx.lineWidth = 6;

    // draw the arc for the circle
    clockCanvasCtx.beginPath();
    clockCanvasCtx.arc(
        clockCanvas.width / 2,
        clockCanvas.height / 2,
        90,
        0,
        Math.PI * 2
    );
    clockCanvasCtx.stroke();

    clockCanvasCtx.font = '15px REM';
    clockCanvasCtx.fillStyle = 'white';
    clockCanvasCtx.textAlign = 'center';

    // drawing the numbers
    for (let i = 1; i < 13; i++) {
        // calculate the x and y position
        const angle = (Math.PI * i) / 6;

        const x = clockCanvas.width / 2 + Math.sin(angle) * 70;
        const y = clockCanvas.height / 2 - Math.cos(angle) * 70 + 5;

        clockCanvasCtx.fillText(i.toString(), x, y);
    }

    // draw a point on the center
    clockCanvasCtx.beginPath();
    clockCanvasCtx.arc(
        clockCanvas.width / 2,
        clockCanvas.height / 2,
        3,
        0,
        Math.PI * 2
    );
    clockCanvasCtx.fill();
}

function update() {
    reset();
    const date = new Date();
    updateClock(date);
    updateTime(date);

    requestAnimationFrame(update);
}

function updateClock(date) {
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourHandRadius = 40;
    const minuteHandRadius = 50;
    const secondHandRadius = 60;

    // draw the hour hand
    const hourAngle = Math.PI * (hours / 6 + minutes / 360);
    const hourHandStartX = 5 * Math.sin(hourAngle);
    const hourHandStartY = -5 * Math.cos(hourAngle);

    const hourHandEndX = hourHandRadius * Math.sin(hourAngle);
    const hourHandEndY = -hourHandRadius * Math.cos(hourAngle);

    clockCanvasCtx.lineWidth = 3;

    clockCanvasCtx.beginPath();
    clockCanvasCtx.moveTo(
        clockCanvas.width / 2 + hourHandStartX,
        clockCanvas.height / 2 + hourHandStartY
    );
    clockCanvasCtx.lineTo(
        clockCanvas.width / 2 + hourHandEndX,
        clockCanvas.height / 2 + hourHandEndY
    );
    clockCanvasCtx.stroke();

    // draw the minute hand
    const minuteAngle = Math.PI * (minutes / 30);
    const minuteHandStartX = 5 * Math.sin(minuteAngle);
    const minuteHandStartY = -5 * Math.cos(minuteAngle);

    const minuteHandEndX = minuteHandRadius * Math.sin(minuteAngle);
    const minuteHandEndY = -minuteHandRadius * Math.cos(minuteAngle);

    clockCanvasCtx.lineWidth = 2;

    clockCanvasCtx.beginPath();
    clockCanvasCtx.moveTo(
        clockCanvas.width / 2 + minuteHandStartX,
        clockCanvas.height / 2 + minuteHandStartY
    );
    clockCanvasCtx.lineTo(
        clockCanvas.width / 2 + minuteHandEndX,
        clockCanvas.height / 2 + minuteHandEndY
    );
    clockCanvasCtx.stroke();

    // draw the hour hand
    const secondAngle =
        Math.PI * (seconds / 30) +
        ((date.getMilliseconds() % 1000) / 30000) * Math.PI;
    const secondHandStartX = 5 * Math.sin(secondAngle);
    const secondHandStartY = -5 * Math.cos(secondAngle);

    const secondHandEndX = secondHandRadius * Math.sin(secondAngle);
    const secondHandEndY = -secondHandRadius * Math.cos(secondAngle);

    clockCanvasCtx.lineWidth = 1;

    clockCanvasCtx.beginPath();
    clockCanvasCtx.moveTo(
        clockCanvas.width / 2 + secondHandStartX,
        clockCanvas.height / 2 + secondHandStartY
    );
    clockCanvasCtx.lineTo(
        clockCanvas.width / 2 + secondHandEndX,
        clockCanvas.height / 2 + secondHandEndY
    );
    clockCanvasCtx.stroke();
}

function updateTime(date) {
    let hours24 = date.getHours();
    let hours12 = hours24 > 12 ? hours24 - 12 : hours24 === 0 ? 12 : hours24;

    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // make it two digits
    if (hours12 < 10) hours12 = `0${hours12}`;
    if (hours24 < 10) hours24 = `0${hours24}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    AM_PM.innerHTML = hours24 > 12 ? 'PM' : 'AM';

    hoursElement.setAttribute('data-hour-24', hours24.toString());
    hoursElement.setAttribute('data-hour-12', hours12.toString());
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
}

update();
