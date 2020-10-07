import React from 'react';
import { CostContext } from '../App';
import { Redirect } from 'react-router-dom'
import '../styles/EndGame.css';

class EndGame extends React.Component {

    playAgain = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            this.props.location.state !== undefined ?
                <CostContext.Consumer>
                    {
                        ({ userName }) => {
                            return (
                                <div className="end-game">
                                    <div className="end-game-panel">
                                        <h2>Koniec Gry!</h2>
                                        <p>Gracz: {userName}</p>
                                        <p>Twój wynik to: {this.props.location.state.score}</p>
                                        <button onClick={() => this.playAgain()}>Play Again</button>
                                    </div>
                                </div >
                            )
                        }
                    }
                </CostContext.Consumer>
                :
                <Redirect to="/" />
        )
    }
}

export default EndGame;