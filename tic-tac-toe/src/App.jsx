import { useState, useEffect } from 'react'
import './App.css'
import BoxContainer from './components/boxContainer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [board, setBoard] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
  const [moveX, setMoveX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [boardList, setBoardList] = useState([[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]]);
  const [removedList, setRemovedList] = useState([]); 

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
    setBoardList((prevBoardList) => [...prevBoardList, newBoard]);
    setMoveX(!moveX);
    setRemovedList([]);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner !== null) {
      setWinner(gameWinner === 'draw' ? 'Draw' : gameWinner === 1 ? 'X' : 'O');
    }
  };

  const newGame = () => {
    setBoardList([[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]]);
    setBoard([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    setWinner(null);
    setRemovedList([]);
  };

  const goBack = () => {
    if (boardList.length <= 1 || winner) return;

    const updatedBoardList = boardList.slice(0, boardList.length - 1);
    const previousBoardState = boardList[updatedBoardList.length - 1];

    console.log(previousBoardState)

    setRemovedList((prevRemoved) => [...prevRemoved, boardList[boardList.length - 1]]);
    setBoardList(updatedBoardList);
    setBoard(previousBoardState);
    setMoveX(!moveX);
  };

  const goForward = () => {
    if (removedList.length === 0) return; 

    const nextBoardState = removedList[removedList.length - 1];
    setRemovedList((prevRemoved) => prevRemoved.slice(0, removedList.length - 1)); 
    setBoardList((prevBoardList) => [...prevBoardList, nextBoardState]);
    setBoard(nextBoardState);
    setMoveX(!moveX); 
  };

  return (
    <div className='App'>
      <div className='btn-container'>
        <button className='backbtn' onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className='backbtn' onClick={goForward}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className='container'>
        {board.map((rows, i) =>
          rows.map((value, j) => (
            <BoxContainer
              key={`${i},${j}`}
              row={i}
              col={j}
              value={value}
              handleClick={handleClick}
            />
          ))
        )}
      </div>
      {!winner &&<button className='btn bgyellow' onClick={newGame}>Reset</button>}
      {winner && (
        <div className='win'>
          <h2>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}!`}</h2>
          <button className='btn bggreen bold' onClick={newGame}>New Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
