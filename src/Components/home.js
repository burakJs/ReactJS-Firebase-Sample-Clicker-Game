import React, { Component } from 'react';
import firebase from 'firebase';
import './home.css'

class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
       user:this.props.user,
       wealth:null,
       perlvl:null,
       clicklvl:null,
       money:null,
       key:null,
       upgmoney:5,
       upglvl:1,
       username:"",
       users:[],
       
    }
  }
  delay = ms => new Promise(res => setTimeout(res, ms));
  componentDidMount=()=>{
    this.readData();
 
  }
  upgrade = () => {
    var upgmoney = this.state.upgmoney;
    var upglvl = this.state.upglvl;
    var money = this.state.money;
    var clicklvl = this.state.clicklvl;
    var wealth = this.state.wealth;
    var perlvl = this.state.perlvl;
    var username = this.state.username;

    if(money >= upgmoney){
      money -= upgmoney;
      clicklvl+=1;
      upglvl+=1;
      wealth+=1
      upgmoney = ((upglvl*2)*(upglvl*2))+(upglvl*2);
    }
    else{
      alert('sorry for Not enough money')
    }
    this.setState({
      upgmoney:upgmoney,
      clicklvl:clicklvl,
      upglvl:upglvl,
      money:money,
      wealth:wealth,
    })
    this.setData(wealth,perlvl,clicklvl,money,upglvl,username)
  }
  click = () => {
    var perlvl = this.state.perlvl
    var wealth = this.state.wealth;
    var money = this.state.money;
    var clicklvl = this.state.clicklvl;
    var upglvl = this.state.upglvl;
    wealth+=clicklvl;
    money+=clicklvl;
    this.setState({
      wealth:wealth,
      money:money
    })
    this.setData(wealth,perlvl,clicklvl,money,upglvl,this.state.username)
    }
    
    setData( wealth,perlvl,clicklvl,money,upglvl,username) {
      var key = this.state.key;
      var uid = this.state.user.uid;
      firebase.database().ref(uid).child(key).set({
        clicklvl : clicklvl,
        money: money,
        perlvl: perlvl,
        upglvl:upglvl, 
        username:username,
        wealth:wealth     
      });
      
    }
  
  readData=() => {
    var uid = this.state.user.uid;
    var refdb = firebase.database().ref(uid);
    refdb.on('value', snapshot => {
      snapshot.forEach( childSnapshot => {
        let key = childSnapshot.key;
        this.getData(childSnapshot.val(),key);
      });
  });
  }
  
 
  getData(data,key){
    this.setState({
      money:data.money,
      clicklvl:data.clicklvl,
      perlvl:data.perlvl,
      key:key,
      upglvl:data.upglvl,
      username:data.username
    })
  }
  
  
  logOut=()=>{
    var auth = firebase.auth();
    auth.signOut(); 
  }
    render() {
        return(
        <div> 
            <h1>{this.state.username}</h1>
            wealth: {this.state.wealth}<br/>
            clicklvl: {this.state.clicklvl}<br/>
            perlvl: {this.state.perlvl}<br/>
            money: {this.state.money}<br/><br/>
            <button id="click" onClick={()=>this.click()}>CLICK</button><br/><br/>
            <button id="upgrade" onClick={()=>this.upgrade()}><h3>{this.state.upgmoney}</h3> for UPGRADE </button><br/><br/>

            <button onClick={()=>this.logOut()}>Log Out</button> 
            <br/>  <br/>   
             
        </div>  
        ) 
    }
}
export default Home;
