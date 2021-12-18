import React from 'react';
import './App.css';
import Player from './Player';
import Button from './Button';
import Dice from './Dice';

class App extends React.Component {

  state = {
    pointsToWin: 100,
    dice1: null,
    dice2: null,
    activePlayer: 1,
    winner: false,
    players: [
        {
            id:1,
            currentScore: 0,
            globalScore: 0,
        },
        {
          id:2,  
          currentScore: 0,
          globalScore: 0,
        }
    ]

  }

/*********************Roll Dice *****************************
    * ************** */ 
   
  diceRoll= ()=> {
    console.log('Inside dice roll')
    const rand1= 1+Math.floor(Math.random()*6)
    const rand2= 1+Math.floor(Math.random()*6)
    const activePlayer= this.state.activePlayer;

    // updating our dice state with the latest roll
    this.setState((state) => {
    return {dice1:rand1, dice2:rand2}
    });
    console.log (this.state.dice1 + this.state.dice2)
    // get activePlayer object based on activePlayer ID
    const activePlayerObj=this.state.players.find((player)=>{
    return (player.id===activePlayer)
    })

    this.setState((state)=>{
      activePlayerObj.currentScore=this.state.dice1 + this.state.dice2
      activePlayerObj.globalScore = activePlayerObj.globalScore + activePlayerObj.currentScore
      
    });
    
      
    console.log(this.state)

    //update player total depending on active player

  }

   /*********************Hold Turn*****************************
   this passed the turn to the other player
   * ************** */ 
   holdTurn= ()=> {
    console.log('Inside Hold Turn')
    this.setState((state) => {
      if (this.state.activePlayer===1)
      {
        return {activePlayer:2}
      }
      else{
        return {activePlayer:1}
      }
      
    });
    console.log(this.state)
      
    }

   /*********************New Game*****************************
    * ************** */ 

    newGame=()=>{
      console.log('Inside New Game')
    }

    /*********************RENDER*****************************
    * ************** */ 

  render(){
    return (
      
      <div className="App">
        
        <Player PlayerNum= {this.state.players[0].id} currentScore={this.state.players[0].currentScore} globalScore= {this.state.players[0].globalScore}/>
        
        <div className='dice-container'>
        <Dice id={this.state.dice1}/>
        <Dice id={this.state.dice2}/>
        </div>
        
        <div className='button-container'>
        <Button  text='New Game'onHandleClick = {this.newGame}/>
        <Button  text='Roll'onHandleClick = {this.diceRoll}/>
        <Button  text='Hold' onHandleClick = {this.holdTurn}/>
        </div>
        

        <Player PlayerNum= {this.state.players[1].id} currentScore={this.state.players[1].currentScore} globalScore= {this.state.players[1].globalScore}/>
        
        
      </div>
    );
}
  
}

export default App;
