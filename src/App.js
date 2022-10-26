import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import "./App.css";

const App = () => {
  const { width, height } = useWindowSize()
  const [board, setBoard] = useState([null, null, null, null, null, null, null, null, null,]);

  // useState([0,1,2,3,4,5,6,7,8]);

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("the winner is", board[a]);
        return board[a];
      }
    }
    return null;
  }
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = decideWinner(board);


  const handleClick = (index) => {
    console.log("clicked", index);

    if (winner === null && board[index] === null) {
      let boardCopy = [...board];
      boardCopy[index] = isXTurn ? "X" : "O";
      setBoard(boardCopy);
      setIsXTurn(!isXTurn);
    }
  }

  const restart = () =>{
    setBoard([null, null, null, null, null, null, null, null, null,]);
    setIsXTurn(true)
  }
  return (
    <div className='App'>
      {winner ? <Confetti
      width={width}
      height={height}
    /> : ""}
      <div className='Board'>
        {board.map((value, index) => <Box value={value} onPlayerClick={() => handleClick(index)} />)}
      </div>
      <div>
        <button onClick={restart} className="btn">Restart</button>
      </div>
      {winner ? <h2>The Winner is: {winner}</h2> : ""}
    </div>
  )
}

function Box(props) {
  // const [value, setValue] = useState(null);
  return (
    <div
      className='game_box'
      // onClick={() => setValue(value === "X" ? "O" : "X")}
      onClick={props.onPlayerClick}
      style={{ color: props.value === "X" ? "teal" : "crimson" }}
    >
      {props.value}
    </div>)
}

export default App