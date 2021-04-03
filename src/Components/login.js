import React, { Component } from 'react';
import firebase from 'firebase';
import '../config';
import Home from './home';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     mail:'',
     pass:'',
     name:'',
     user:null,
    };
  }
  delay = ms => new Promise(res => setTimeout(res, ms));   
  signUp = async () => {
    var auth = firebase.auth();
    var mail = this.state.mail;
    var pass = this.state.pass;
    var username = prompt("Username: ");
    auth.createUserWithEmailAndPassword(mail,pass)
      .then(
        await this.delay(2000),
        firebase.database().ref(this.state.user.uid).push({
          money: 0,
          clicklvl : 1,
          perlvl:0,
          upglvl:1,
          username:username,
          wealth:0,
        }),
      )
      .catch(e=>alert(e)) 
  }
 
  signIn=()=>{
    var mail = this.state.mail;
    var pass = this.state.pass;
    var auth = firebase.auth();
    auth.signInWithEmailAndPassword(mail,pass)
      .then('Succesfull')    
      .catch(e=>alert(e));
  
  }
  componentWillMount=()=>{
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        })
        
        
      } 
      else {
        this.setState({
          user:null
        })
        
        
      }
    });
  }


  render() {
    return (
      <div className="App">
      {this.state.user ? (
          <Home user={this.state.user}/>    
      ) : (
        <div id="logForm">
          <h3>Mail:</h3> <input type="email" onChange={ (e)=> this.setState({mail: e.target.value})} /><br/><br/>
          <h3>Password:</h3> <input type="password" onChange={ (e)=> this.setState({pass: e.target.value})} /><br/><br/>
          <button onClick={()=>this.signUp()}>Sign Up</button> <br/><br/>
          <button onClick={()=>this.signIn()}>Sign In</button>
        </div> 
        )}
          
      </div>
    );
  }
}

export default Login;