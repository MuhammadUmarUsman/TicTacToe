# TicTacToe - React

A simple TicTacToe game implemented in React. Two players (X and O) can play the game by clicking on the grid, and the game determines the winner or a draw.

## Features
- Two players can alternate between X and O.
- The game checks for a winner after every move (rows, columns, diagonals).
- If the board is full and no player wins, the game declares a draw.
- Users can reset the game after a win or a draw.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tictactoe.git
```

### 2. Install Dependencies

```bash
cd tictactoe
npm install
```

### 3. Start the Application

```bash
npm start
```

Your TicTacToe game will now be running at `http://localhost:3000/`.

## Project Structure

```
tictactoe/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── BoxContainer.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

### **App.js**
The main component that manages the game state (board, current player, winner). It contains the game logic and renders the board with the `BoxContainer` component.

### **BoxContainer.js**
Represents individual squares on the board. Each box displays 'X' or 'O' based on the game state and handles user clicks.

### **App.css**
CSS styles for the game board, boxes, and buttons.

### **index.js**
The entry point for the app that renders the `App` component into the DOM.

### **package.json**
Manages project dependencies and configurations.

## Game Logic

- **Players**: Player 1 uses "X", and Player 2 uses "O".
- **Winning Conditions**: The first player to align three marks in a row (horizontally, vertically, or diagonally) wins.
- **Draw**: If all cells are filled without a winner, the game declares a draw.
- **Game Reset**: After a winner is declared or a draw occurs, a button is provided to restart the game.

## Example Usage

1. Clone the repository and run `npm start`.
2. Click on any square to place your mark (X or O).
3. The game will automatically check for a winner after every move.
4. When the game ends (win or draw), a button will appear to start a new game.





