let previousCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
    'pink',
    'yellow',
    'red',
    'cyan',
    'blue',
    'teal',
    'orange',
    'green',
];

function setColors() {
    const cards = [...document.querySelectorAll('.card')];
    for (let color of colors) {
        const cardAIndex = parseInt(Math.random() * cards.length);
        const cardA = cards[cardAIndex];
        cards.splice(cardAIndex, 1);
        cardA.classList.add(color);
        cardA.classList.add('color-hidden');
        cardA.setAttribute('data-color', color);


        const cardBIndex = parseInt(Math.random() * cards.length);
        const cardB = cards[cardBIndex];
        cards.splice(cardBIndex, 1);
        cardB.classList.add(color);
        cardB.classList.add('color-hidden');
        cardB.setAttribute('data-color', color);
    }
}

function onCardClicked(e) {
    const target = e.currentTarget;
    if (
        preventClick ||
        target === previousCard ||
        target.className.includes('done')
    ) {
        return;
    }
    target.classList.remove('color-hidden');
    target.classList.add('done');

    if (previousCard == null) {
        previousCard = target;
        return;
    }

    if (previousCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
        preventClick = true;
        setTimeout(() => {
            previousCard.className = previousCard.className.replace('done', '') + ' color-hidden';
            target.className = target.className.replace('done', '') + ' color-hidden';
            previousCard = null;
            preventClick = false;
        }, 500);
    } else {
        combosFound++;
        previousCard = null;
        if (combosFound === 8) {
            stopTimer();
            setTimeout(() => {
                const hour = Math.floor(totalSeconds / 3600);
                const minute = Math.floor((totalSeconds - hour * 3600) / 60);
                const seconds = totalSeconds - (hour * 3600 + minute * 60);

                alert(`You Win! Your Time IS: ${hour + ":" + minute + ":" + seconds} `);
            }, 1000);
        }
    }
}

let timerVariable;
let totalSeconds = 0;

function startGame() {
    totalSeconds = 0;
    setColors();
    stopTimer();
    document.getElementById('game').style.display = 'block';
    timerVariable = setInterval(countUpTimer, 1000);
}

function stopTimer() {
    if (timerVariable != null) {
        clearInterval(timerVariable);
        timerVariable = null;
    }
}

function countUpTimer() {
    ++totalSeconds;
    const hour = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minute = Math.floor((totalSeconds - hour * 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds - (hour * 3600 + minute * 60)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = hour + ":";
    document.getElementById("mins").innerText = minute + ":";
    document.getElementById("seconds").innerText = seconds;}