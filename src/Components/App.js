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
            class:'player-id',
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
    // if (prevState.dice1 !== this.state.dice1 && prevState.dice2 !== this.state.dice2 ) {
    //   console.log('dice state has changed-- inside did update')
    //   this.calculateScore();
    // }
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
    console.log('Inside dice roll')
    const rand1= 1+Math.floor(Math.random()*6)
    const rand2= 1+Math.floor(Math.random()*6)
  
      this.setState({
      dice1: rand1,
      dice2:rand2,
      });

    this.calculateScore();
    console.log(this.state)
   

    // console.log('state after rollong sice', this.state)
    
  }
  calculateScore= ()=> {
      const activePlayerObj=this.getActivePlayer();
      this.setState((state)=>{
      activePlayerObj.currentScore=this.state.dice1 + this.state.dice2
      // activePlayerObj.globalScore = activePlayerObj.globalScore
      
    });
    console.log(this.state)
  }
    

   /*********************Hold Turn*****************************
   this passed the turn to the other player
   * ************** */ 
   holdTurn= ()=> {
    console.log('Inside Hold Turn')
    const activePlayerObj=this.getActivePlayer();
    this.setState((state)=>{
    activePlayerObj.globalScore =  activePlayerObj.currentScore
    
  });
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
      console.log('Inside New Game')
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
        },
        {
          id:2,  
          currentScore: 0,
          globalScore: 0,
        }
    ]

  
        });
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
