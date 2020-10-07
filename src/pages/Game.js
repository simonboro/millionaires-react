import React from 'react';
import { CostContext } from '../App';
import { Redirect } from 'react-router-dom';
import '../styles/Game.css';

class Game extends React.Component {
    state = {
        levels: [],
        quiz: [],
        questionAdd: [],
        currentQuestion: null,
        currentLevel: 1,
        isGameOver: false,
        currentChecked: {
            text: null
        },
        currentAmount: 0
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/levels").then((res => {
            return res.json();
        })).then((levels => {
            this.setState({
                levels: levels
            })

        })).then(() => {
            fetch("http://localhost:3000/quiz").then((res => {
                return res.json();
            })).then(quiz => {
                this.setState({
                    quiz: quiz
                })
                setTimeout(() => {
                    this.pickQuestion();
                }, 100)
            })
        })
    }

    // LOSOWANIE PYTANIA
    pickQuestion = () => {
        if (this.state.questionAdd.length < this.state.quiz.length) {
            let number = Math.floor(Math.random() * (this.state.quiz.length));
            while (this.state.questionAdd.includes(number)) {
                number = Math.floor(Math.random() * (this.state.quiz.length));
            }

            const array = this.state.questionAdd;

            array.push(number);
            this.setState({
                currentQuestion: this.state.quiz[number],
                questionAdd: array
            })
        }
        else {
            this.props.history.push("/end-game");
        }

        if (this.state.questionAdd.length < this.state.levels.length)
            this.setState({
                currentAmount: this.state.levels[this.state.questionAdd.length - 1].amount // zapisywanie o jaką kwotę aktualnie gramy
            })
    }

    // SPRAWDZANIE ODPOWIEDZI
    checkAnswer = (ansNum) => {
        if (this.state.currentChecked.text === null) {
            this.setState({
                currentChecked: {
                    text: ansNum
                },
                isGameOver: ansNum === this.state.currentQuestion.correctAnswer ? false : true
            })
        }
    }

    // PRZYCISK DALEJ
    continueGame = (userName) => {

        let isGameOver = this.state.isGameOver
        if (this.state.questionAdd.length === 11) {
            isGameOver = true
        }
        if (isGameOver === false) {
            this.pickQuestion();
            console.log("gratuluje grasz dalej")

            this.setState({
                currentChecked: {
                    text: null,
                },
                currentLevel: this.state.currentLevel + 1
            })
        }
        else {



            fetch("http://localhost:3000/user", {
                method: "POST",
                body: JSON.stringify({
                    userName: userName,
                    score: this.state.levels[this.state.currentLevel - 1].amount
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {

                console.log(this.state.currentLevel)
                this.props.history.push("/end-game", { score: this.state.levels[this.state.currentLevel - 1].amount })

            })
        }
        this.setState({
            isGameOver

        })
    }


    render() {
        return (
            <CostContext.Consumer>
                {
                    ({ userName }) => {
                        return (
                            userName === null ?
                                <Redirect to="/" /> :
                                <div className="content-game">
                                    <div className="game">
                                        <div className="levels">
                                            {this.state.levels.map((value, index) => {
                                                return <div style={{ background: this.state.questionAdd.length === value.levelNumber ? "yellow" : "white" }} key={index}>{value.levelNumber}. Poziom - {value.amount} zł</div>
                                            })}

                                        </div>
                                        <div className="game-panel">
                                            <div className="game-header">
                                                <p>Grasz jako: {userName}</p>
                                                <p>Poziom {this.state.questionAdd === 0 ? 1 : this.state.questionAdd.length} - gra o {this.state.currentAmount} zł</p>
                                            </div>
                                            <div className="question">
                                                <h2>{this.state.currentQuestion === null ? "" : this.state.currentQuestion.question}</h2>
                                                <p
                                                    style={this.state.currentChecked.text === null ? {} : {
                                                        background: this.state.currentChecked.text === this.state.currentQuestion.answer1
                                                            ? this.state.currentChecked.text === this.state.currentQuestion.correctAnswer ? "#2abd28" : "red" : ""
                                                    }}
                                                    onClick={() => this.checkAnswer(this.state.currentQuestion.answer1)}
                                                >
                                                    A. {this.state.currentQuestion === null ? null : this.state.currentQuestion.answer1}</p>
                                                <p
                                                    style={this.state.currentChecked.text === null ? {} : {
                                                        background: this.state.currentChecked.text === this.state.currentQuestion.answer2
                                                            ? this.state.currentChecked.text === this.state.currentQuestion.correctAnswer ? "#2abd28" : "red" : ""
                                                    }}
                                                    onClick={() => this.checkAnswer(this.state.currentQuestion.answer2)}> B. {this.state.currentQuestion === null ? null : this.state.currentQuestion.answer2}</p>
                                                <p
                                                    style={this.state.currentChecked.text === null ? {} : {
                                                        background: this.state.currentChecked.text === this.state.currentQuestion.answer3
                                                            ? this.state.currentChecked.text === this.state.currentQuestion.correctAnswer ? "#2abd28" : "red" : ""
                                                    }}
                                                    onClick={() => this.checkAnswer(this.state.currentQuestion.answer3)}>C. {this.state.currentQuestion === null ? null : this.state.currentQuestion.answer3}</p>
                                                <p
                                                    style={this.state.currentChecked.text === null ? {} : {
                                                        background: this.state.currentChecked.text === this.state.currentQuestion.answer4
                                                            ? this.state.currentChecked.text === this.state.currentQuestion.correctAnswer ? "#2abd28" : "red" : ""
                                                    }}
                                                    onClick={() => this.checkAnswer(this.state.currentQuestion.answer4)}>D. {this.state.currentQuestion === null ? null : this.state.currentQuestion.answer4}</p>
                                                <button onClick={() => this.continueGame(userName)} disabled={this.state.currentChecked.text === null ? true : false}>Dalej</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    }
                }
            </CostContext.Consumer >)
    }

}

export default Game;