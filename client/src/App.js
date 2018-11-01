import React, { Component } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import store from './store'
import Actors from "./components/Actors/Actors";

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
            <Actors/>
        </div>
      </Provider>
    )
  }
}

export default App
