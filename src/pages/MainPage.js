import React from 'react';
import { CostContext } from '../App';
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import '../styles/MainPage.css';

class MainPage extends React.Component {
    state = {
        users: [],
        maxScore: null,
        bestUser: null,
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/user").then((res => {
            return res.json();
        })).then((users => {
            let max = 0;
            let bestUser = "";
            for (let i = 0; i < users.length; i++) {
                if (max < users[i].score) {
                    max = users[i].score;
                    bestUser = users[i].userName
                }
            }
            this.setState({
                users: users,
                maxScore: max,
                bestUser: bestUser
            })
        }))
    }

    render() {
        return (
            <CostContext.Consumer>
                {
                    ({ changeNick, startGame }) => {
                        return (
                            <div className="content-main-page">
                                <div className="main-page">
                                    <h1>Milionerzy</h1>
                                    <h2>Najlepszy wynik jak do tej pory: {this.state.maxScore} <br /> Wygrany przez gracza: {this.state.bestUser}</h2>
                                    <div>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1" >Wpisz nick:</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                onChange={(e) => changeNick(e.target.value)}
                                                placeholder="Username"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                        {/* <label>Wpisz nick: </label><input onChange={(e) => changeNick(e.target.value)} /> */}
                                    </div>
                                    <Button variant="primary" size="lg" onClick={() => startGame(this.props.history)}>Zacznij Grę</Button>
                                </div>
                            </div >
                        )
                    }
                }
            </CostContext.Consumer >
        )
    }

}

export default MainPage;