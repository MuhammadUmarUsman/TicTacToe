import { useState, useEffect } from 'react'
import './App.css'
import BoxContainer from './components/boxContainer'

function App() {
  const [board, setBoard] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]])
  const [moveX, setMoveX] = useState(true);
  const [winner, setWinner] = useState(null); 

  const checkWinner = (board) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== -1 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
      if (board[0][i] !== -1 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }

    if (board[0][0] !== -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== -1 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    if (board.every(row => row.every(cell => cell !== -1))) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (i, j) => {
    if (board[i][j] !== -1 || winner) {
      return;
    }

    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex === i) {
        return row.map((cell, colIndex) => {
          if (colIndex === j) {
            return moveX ? 1 : 0; 
          }
          return cell;
        });
      }
      return row;
    });

    setBoard(newBoard);
    setMoveX(!moveX);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner !== null) {
      setWinner(gameWinner === 'draw' ? 'Draw' : gameWinner === 1 ? 'X' : 'O');
    }
  };

  const newGame = () =>{
    setBoard([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]])
    setWinner(null)
  }

  return (
    <div className='App'>
      <div className='container'>
        {board.map((rows, i) => {
          return rows.map((value, j) => {
            return (
              <BoxContainer
                key={`${i},${j}`}
                row={i}
                col={j}
                value={value}
                handleClick={handleClick}
              />
            );
          });
        })}
      </div> 
        {winner &&
        <div className='win'>
          <h2>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h2>
          {/* <h2>Winner: Umar</h2> */}
          <button onClick={newGame}>NewGame</button>   
        </div>   
        }              
    </div>
  );
}

export default App
