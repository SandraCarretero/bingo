import {
	bingoNumbersElement,
	buttoRestartElement,
	buttoStartElement,
	currentNumberElement,
	pcBoardElement,
	userBoardElement
} from './dom';

const allNumbers = Array(99)
	.fill()
	.map((value, i) => i + 1);

const appearedNumber = [];

const numberColors = {
	user: 'number-user',
	pc: 'number-pc'
};

const row = 3;
const column = 5;
const userNumbers = [];
const pcNumbers = [];

let currentRandomNumber;

const printBingoNumbers = () => {
	const fragment = document.createDocumentFragment();

	allNumbers.forEach(number => {
		const cellGameNumber = document.createElement('span');
		cellGameNumber.classList.add('bingo-number');
		cellGameNumber.textContent = number;
		cellGameNumber.dataset.bingo = number;
		fragment.append(cellGameNumber);
	});
	bingoNumbersElement.append(fragment);
};

const generateRandomNumbers = numbersArray => {
	numbersArray.length = 0;
	while (numbersArray.length < row * column) {
		const randomNumber = Math.floor(Math.random() * allNumbers.length) + 1;
		if (!numbersArray.includes(randomNumber)) {
			numbersArray.push(randomNumber);
		}
	}
	console.log(numbersArray);
};

const printRandomNumbers = (board, numbersArray, color) => {
	const fragment = document.createDocumentFragment();

	numbersArray.forEach(number => {
		const cellBoardNumber = document.createElement('span');
		cellBoardNumber.classList.add(color);
		cellBoardNumber.classList.add('number');
		cellBoardNumber.textContent = number;
		cellBoardNumber.dataset.number = number;
		fragment.append(cellBoardNumber);
	});
	board.append(fragment);
};

const startGame = () => {
	buttoStartElement.classList.add('hidden');
	currentNumberElement.classList.remove('hidden');

	let index = 0;
	const intervalId = setInterval(() => {
		if (index < appearedNumber.length) {
			currentRandomNumber = appearedNumber[index];
			currentNumberElement.textContent = `Número ${currentRandomNumber}`;

			const bingoNumber = document.querySelector(
				`[data-bingo="${currentRandomNumber}"]`
			);

			bingoNumber.classList.add('bingo-number-appeared');

			correctNumbers(userBoardElement, 'number-user-correct');
			correctNumbers(pcBoardElement, 'number-pc-correct');
			index++;
			console.log(currentRandomNumber);
		}
		if (isBoardFull(userBoardElement, 'number-user-correct')) {
			clearInterval(intervalId);
			currentNumberElement.textContent = 'You win';
		}

		if (isBoardFull(pcBoardElement, 'number-pc-correct')) {
			currentNumberElement.textContent = 'You lose';
			clearInterval(intervalId);
		}
	}, 100);

	while (appearedNumber.length < 99) {
		const randomNumber = Math.floor(Math.random() * allNumbers.length + 1);
		if (!appearedNumber.includes(randomNumber)) {
			appearedNumber.push(randomNumber);
		}
	}
};

const correctNumbers = (board, color) => {
	const matchingNumbers = board.querySelectorAll(
		`[data-number="${currentRandomNumber}"]`
	);
	matchingNumbers.forEach(bingoNumber => {
		bingoNumber.classList.add(color);
	});
};

const isBoardFull = (boardElement, color) => {
	const allNumbers = boardElement.querySelectorAll(`.number[data-number]`);
	for (const numberElement of allNumbers) {
		if (!numberElement.classList.contains(color)) {
			return false;
		}
	}
	buttoRestartElement.classList.remove('hidden');
	return true;
};

const resetGame = () => {
	clearBoard(userBoardElement);
	clearBoard(pcBoardElement);

	appearedNumber.length = 0;

	const allBingoNumbers = bingoNumbersElement.querySelectorAll('.bingo-number');
	allBingoNumbers.forEach(bingoNumber => {
		bingoNumber.classList.remove('bingo-number-appeared');
	});

	generateRandomNumbers(userNumbers);
	generateRandomNumbers(pcNumbers);

	printRandomNumbers(userBoardElement, userNumbers, numberColors.user);
	printRandomNumbers(pcBoardElement, pcNumbers, numberColors.pc);

	buttoRestartElement.classList.add('hidden');
	buttoStartElement.classList.remove('hidden');
	currentNumberElement.textContent = '';
	currentNumberElement.classList.add('hidden');
};

const clearBoard = boardElement => {
	const numbers = boardElement.querySelectorAll('.number[data-number]');
	numbers.forEach(number => {
		number.remove();
	});
};

const createGame = () => {
	generateRandomNumbers(userNumbers);
	generateRandomNumbers(pcNumbers);

	printRandomNumbers(userBoardElement, userNumbers, numberColors.user);
	printRandomNumbers(pcBoardElement, pcNumbers, numberColors.pc);

	printBingoNumbers();
};

export {createGame, resetGame, startGame}