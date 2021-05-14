import React from 'react';
import './app.css';

//Tabuleiro
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i] == 'A' ? Matheus() : this.props.squares[i] == 'B' ? Matheuzudo() : ''}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="board-title"><h3>Jogo da Velha</h3>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//Jogo
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'A' : 'B';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Ir para a jogada #' + move :
                'Ir para o início';
            return (
                <li key={move}>
                    <button className="button-move" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            //status = 'Vencedor: ' + winner;
            window.location.href = "http://localhost:3000/scoreboard";
        } else if (history.length > 9 && !winner) {
            status = 'Empate'
        } else {
            status = 'Próximo jogador: ' + (this.state.xIsNext ? '1' : '2');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

//Quadrado
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    console.log(squares)
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Matheus() {
    return (
        <img className="image" src="http://localhost:3000/assets/images/matheus.jpeg" />
    )
}

function Matheuzudo() {
    return (
        <img className="image" src="http://localhost:3000/assets/images/matheuzudo.jpeg" />
    )
}

export default Game;
