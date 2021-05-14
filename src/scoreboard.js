import React from 'react';
import './scoreboard.css';

class Scoreboard extends React.Component {
    render() {
        return (
            <div className="scoreboard">
                <h3>Você Venceu!</h3>
                <img className="imageTrophy" src="http://localhost:3000/assets/images/trofeu.svg" />
                <button type="button" 
                onClick={() => click()}>Reiniciar!</button>
            </div>
        );
    }
}

function click() {
    window.location.href = "http://localhost:3000"
}

export default Scoreboard;