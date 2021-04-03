import React,{ Component } from 'react';
import './App.css';
import Login from './Components/login'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
       
    }
  } 
  render() {
    return(
      <div className="App">
        <Login/>
      </div>
    )
  }
}

export default App;
