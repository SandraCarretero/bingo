import { createGame, resetGame, startGame } from "./bingo-functions";
import { buttoRestartElement, buttoStartElement } from "./dom";

createGame();

buttoStartElement.addEventListener('click', startGame);
buttoRestartElement.addEventListener('click', resetGame);
