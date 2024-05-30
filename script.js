const emojis = [ '🌞', '🍎', '🚗', '🐱', '🌼', '🍕', '🏀', '🎸',
'🚀', '🦄', '🐶', '🎈', '🍔', '🎮', '📚', '✈️',
'🍦', '🐠', '🌈', '🚲', '🐸', '🎃', '🌵', '🛴',
'🍩', '🐒', '🎀', '🌇', '🌹', '🐥', '🎵', '📷',
'🌞', '🍎', '🚗', '🐱', '🌼', '🍕', '🏀', '🎸',
'🚀', '🦄', '🐶', '🎈', '🍔', '🎮', '📚', '✈️',
'🍦', '🐠', '🌈', '🚲', '🐸', '🎃', '🌵', '🛴',
'🍩', '🐒', '🎀', '🌇', '🌹', '🐥', '🎵', '📷', '🦞', '🦞'];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(emojis);

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matchedCards = [];

function createBoard() {
    emojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        if (matchedCards.length === emojis.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
        }
    } else {
        card1.classList.remove('flipped');
        card1.textContent = '';
        card2.classList.remove('flipped');
        card2.textContent = '';
    }
    flippedCards = [];
}

createBoard();
