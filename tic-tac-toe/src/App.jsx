import { useState, useEffect } from 'react';
import './App.css';
import BoxContainer from './components/boxContainer';
import GameControls from './components/gameControls.jsx'; 

function App() {
  const [board, setBoard] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
  const [moveX, setMoveX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [boardList, setBoardList] = useState([[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]]);
  const [removedList, setRemovedList] = useState([]);
  const totalItems = 3;
  const [selectedCell, setSelectedCell] = useState(null);
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);


  const isPlacementPhase = () => xCount < 3 || oCount < 3;

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
    if (winner) return;

    const player = moveX ? 1 : 0;
    const playerCount = moveX ? xCount : oCount;

    if (isPlacementPhase()) {
      if (board[i][j] !== -1 || playerCount >= 3) return;

      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? player : cell))
      );

      setBoard(newBoard);
      setBoardList(prev => [...prev, newBoard]);
      setRemovedList([]);

      moveX ? setXCount(xCount + 1) : setOCount(oCount + 1);
      setMoveX(!moveX);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner !== null) {
        setWinner(gameWinner === 1 ? 'X' : 'O');
      }
    } else {
      const cellValue = board[i][j];

      if (!selectedCell) {
        if (cellValue === player) {
          setSelectedCell({ i, j });
        }
        else if (cellValue !== -1) {
          alert("You can't select your opponent's piece.");
        } else {
          alert("Please select your piece first.");
        }
      } else {
        if (cellValue === -1) {
          const newBoard = board.map(row => row.slice());
          newBoard[selectedCell.i][selectedCell.j] = -1;
          newBoard[i][j] = player;

          setBoard(newBoard);
          setBoardList(prev => [...prev, newBoard]);
          setRemovedList([]);
          setSelectedCell(null);
          setMoveX(!moveX);

          const gameWinner = checkWinner(newBoard);
          if (gameWinner !== null) {
            setWinner(gameWinner === 1 ? 'X' : 'O');
          }
        } else if (cellValue === player) {
          setSelectedCell(null);
        } else {
          setSelectedCell(null);
          console.log("Cant place here - already occupied")
          alert("Cant place here - already occupied")
        }
      }
    }
  };

  const newGame = () => {
    setBoardList([[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]]);
    setBoard([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    setWinner(null);
    setRemovedList([]);
    setMoveX(true);
    setSelectedCell(null);
    setXCount(0);
    setOCount(0);
  };

  const goBack = () => {
    if (boardList.length <= 1 || winner) return;

    const updatedBoardList = boardList.slice(0, boardList.length - 1);
    const boardState = updatedBoardList[updatedBoardList.length - 1];

    setRemovedList((prevRemoved) => [...prevRemoved, boardList[boardList.length - 1]]);
    setBoardList(updatedBoardList);
    setBoard(boardState);
    setMoveX(!moveX);

    if (isPlacementPhase()) {
      moveX ? setXCount(xCount - 1) : setOCount(oCount - 1);
    }

    setSelectedCell(null);
  };

  const goForward = () => {
    if (removedList.length === 0) return;

    const nextBoardState = removedList[removedList.length - 1];
    setRemovedList((prevRemoved) => prevRemoved.slice(0, removedList.length - 1));
    setBoardList((prevBoardList) => [...prevBoardList, nextBoardState]);
    setBoard(nextBoardState);
    setMoveX(!moveX);

    if (isPlacementPhase()) {
      moveX ? setXCount(xCount + 1) : setOCount(oCount + 1);
    }

    setSelectedCell(null);
  };

  return (
    <div className='App'>
      {!winner && (
        <GameControls
          moveX={moveX}
          goBack={goBack}
          goForward={goForward}
        />
      )}
      <h3>{isPlacementPhase() ? "Placement Phase" : "Movement Phase"}</h3>

      <div className='container'>
        {board.map((rows, i) =>
          rows.map((value, j) => (
            <BoxContainer
              key={`${i},${j}`}
              row={i}
              col={j}
              value={value}
              handleClick={handleClick}
              selected={selectedCell?.i === i && selectedCell?.j === j}
            />
          ))
        )}
      </div>
      {!winner && <button className='btn bgyellow' onClick={newGame}>Reset</button>}
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
