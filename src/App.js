import React, { createContext } from 'react';
import './styles/App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Game from './pages/Game';
import EndGame from './pages/EndGame';
import 'bootstrap/dist/css/bootstrap.min.css';


const CostContext = createContext();

class App extends React.Component {
  state = {
    userName: null
  }

  changeNick = (userName) => {
    if (userName.length > 4) {
      this.setState({
        userName: userName
      })
    }
    else {
      console.log("Za krótki Nick")
    }
  }

  startGame = (history) => {
    if (this.state.userName != null) {
      history.push("/game")
    }
  }


  render() {
    return (
      <CostContext.Provider
        value={{ changeNick: this.changeNick, startGame: this.startGame, userName: this.state.userName }}
      >
        <div className="App" >
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/game" component={Game} />
              <Route path="/end-game" component={EndGame} />
            </Switch>
          </BrowserRouter>

        </div>
      </CostContext.Provider>)
  }
}

export default App;
export { CostContext } 
