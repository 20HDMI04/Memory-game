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

function load() {
    const cards = [...document.querySelectorAll('.card')];
    for (let color of colors) {
        const cardAIndex = parseInt(Math.random() * cards.length);
        const cardA = cards[cardAIndex]
        cards.splice(cardAIndex, 1);
        cardA.classList.add(color);
        cardA.setAttribute('data-color', color)


        const cardBIndex = parseInt(Math.random() * cards.length);
        const cardB = cards[cardBIndex]
        cards.splice(cardBIndex, 1);
        cardB.classList.add(color);
        cardB.setAttribute('data-color', color)
    }
}

function onCardClicked(e) {
    const target = e.currentTarget;
    if (preventClick ||
        target === previousCard ||
        target.className.includes('done')) {
        return
    }
    target.classList.remove('color-hidden');
    target.classList.add('done');

    console.log(target.getAttribute('data-color'))

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
                clearInterval(timerVariable);
                setTimeout(function(){ alert(`You Win! Your Time IS: ${ timerVariable} `); }, 1000);
              }
            timeFunction()
        }
    }

var timerVariable = setInterval(countUpTimer, 1000);
var totalSeconds = 0;

function countUpTimer() {
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
}