# Memory Game Project
Friendly memory game built on HTML5, CSS3, vanilla Javascript and DOM manipulation.


![alt text][logo]
[logo]: https://github.com/jtmasta/MemoryGame/raw/master/images/memorygame.png "Logo Memory Game"

## Table of Contents
- [How the game works] (#)
- [Game instructions] (#)
- [Dependencies] (#)

### How the Game Works:
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

### Game Instructions 
- To start, click any of the facedown cards.
- A built in timer will begin once the first facedown card is flipped
- A counter is implement to keep track of the number of moves a user takes
- The reset icon can be clicked in the event of wanting to restart the game
- Results will be shown once all cards have been correctly matched

### Dependencies
- FontAwsome
- Google Fonts