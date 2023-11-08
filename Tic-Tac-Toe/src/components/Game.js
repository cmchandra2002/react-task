import { useState, useEffect, useRef } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/CalcWinner';
import '../styles/Game.css';

export default function Game({ users }) {


    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    var xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');

    useEffect(() => {
        if (users.length < 2) {
            // Handle error: Not enough users to start the game
            alert('Need at least two players to start the game.');
            return;
        }
        const availablePlayers = users.filter((user) => user.name !== playerOne);
        if (availablePlayers.length === 0) {
            // Handle error: No available opponents
            alert('No available opponents to play with.');
            return;
        }
        setPlayerTwo(availablePlayers[0].name);
    }, [playerOne, users]);



    useEffect(() => {
        const winner = calculateWinner(currentSquares);
        if (winner === 'X') {
            alert(`${playerOne} wins!`);

        }
        else if (winner === 'O') {
            alert(`${playerTwo} wins!`)
        }

        else if (currentMove === 9) {
            alert('It\'s a draw!');
        }
    }, [currentMove, history]);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const historyRef = useRef(history);
    historyRef.current = history;

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setHistory(historyRef.current.slice(0, nextMove + 1));
        xIsNext = currentMove % 2 === 0;
        console.log(history)
    }

    const moves = history.map((_squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });



    return (
        <div className="game">
            <div className='drop-down'>

                <select value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} >
                    {users.map((user) => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>
                <select value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} >
                    {users.filter((user) => user.name !== playerOne).map((user) => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>

            </div>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );



}



