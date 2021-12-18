import React from 'react';
import './App.css';
import Player from './Player';
import Button from './Button';
import Dice from './Dice';

class App extends React.Component {

  state = {
    message:'',
    pointsToWin: 20,
    dice1: null,
    dice2: null,
    activePlayer: 1,
    winner: 0,
    players: [
        {
            id:1,
            currentScore: 0,
            globalScore: 0,
            class:'active-player',
        },
        {
          id:2,  
          currentScore: 0,
          globalScore: 0,
          class:'player-id',
        }
    ]

  }

  /*********************************************************** */
  componentDidUpdate(prevState) {
    
    if (prevState.activePlayer !== this.state.activePlayer)
    {
     
      
      // toggle glow animation based on active player
      const activePlayer=this.getActivePlayer();
      this.setState((state)=>{
      activePlayer.class='active-player'
    }); 
      
      const nonActivePlayer=this.getNonActivePlayer();
      this.setState((state)=>{
      nonActivePlayer.class='player-id'
      }); 
    }

    
  }

   // get activePlayer object based on activePlayer ID
   getActivePlayer = ()=> {
    const activePlayerObj=this.state.players.find((player)=>{
    return (player.id===this.state.activePlayer)
    })
    return activePlayerObj;
  }


   // get non active player object based on activePlayer ID
   getNonActivePlayer = ()=> {
    const NonActivePlayerObj=this.state.players.find((player)=>{
    return (player.id!==this.state.activePlayer)
    })
    return NonActivePlayerObj;
  }
/*********************Roll Dice *****************************
    * ************** */ 
   
  diceRoll= ()=> {
    const rand1= 1+Math.floor(Math.random()*6)
    const rand2= 1+Math.floor(Math.random()*6)
      this.setState({
      dice1: rand1,
      dice2:rand2,
      }, ()=>{
        this.calculateScore();
        this.winGame();
      }); 
      
  }

  /*********************Calculate Score ***********************
    * ************ */ 

  calculateScore= ()=> {
      const updatedPlayers= [...this.state.players]
      const activePlayerObj=this.getActivePlayer();
      updatedPlayers.forEach((player)=>{
        if (player.id===activePlayerObj.id)
        {
          player.currentScore+=this.state.dice1 + this.state.dice2
        }
      })
      this.setState({players:updatedPlayers})
   
  }
    
   /*********************Hold Turn*****************************
   this passed the turn to the other player
   * ************** */ 
   holdTurn= ()=> {
    const activePlayerObj=this.getActivePlayer();
    const updatedPlayers= [...this.state.players]
    updatedPlayers.forEach((player)=>{
      if (player.id===activePlayerObj.id)
      {
        player.globalScore+=player.currentScore;
        player.currentScore=0;
      }
    })
    this.setState({players:updatedPlayers})

    this.setState((state) => {

      if (this.state.activePlayer===1)
      {
        return {activePlayer:2}
      }
      else{
        return {activePlayer:1}
      }
      
    });
    
  }

   /*********************New Game*****************************
    * ************** */ 

    newGame=()=>{
      
      this.setState({
          dice1: null,
          dice2: null,
          activePlayer: 1,
          winner: false,
      players: [
        {
            id:1,
            currentScore: 0,
            globalScore: 0,
            class:'active-player',
        },
        {
          id:2,  
          currentScore: 0,
          globalScore: 0,
          class:'player-id',
        }
    ]

        });
    }

    winGame=()=>{
      const updatedPlayers= [...this.state.players]
      updatedPlayers.forEach((player)=>{
        if (player.globalScore >= this.state.pointsToWin)
        {
          console.log("WINNER" , player.id)
          this.setState.winner=player.id;
          this.setState({message:"Winner is Player: " +player.id});
        }
      })
      // const myMessage=this.setState.message;
      
      // this.setState.message="winner message";
      console.log(this.state)
    }
  
    /*********************RENDER*****************************
    * ************** */ 

  render(){
    
      return (
      <div className="App"> 
     
      
      
        <Player className= {this.state.players[0].class} PlayerNum= {this.state.players[0].id} currentScore={this.state.players[0].currentScore} globalScore= {this.state.players[0].globalScore}/>
        
        <div className='dice-container'>
       
        <Dice id={this.state.dice1}/>
        <Dice id={this.state.dice2}/>
        </div>
       
        <div className='button-container'>
        <p className='active-player'> {this.state.message}</p> 
        
        <Button  text='New Game'onHandleClick = {this.newGame}/>
        <Button  text='Roll'onHandleClick = {this.diceRoll}/>
        <Button  text='Hold' onHandleClick = {this.holdTurn}/>
        </div>
        
        <Player className= {this.state.players[1].class} PlayerNum= {this.state.players[1].id} currentScore={this.state.players[1].currentScore} globalScore= {this.state.players[1].globalScore}/>
        
        
      </div>
    );
}
  
}

export default App;
