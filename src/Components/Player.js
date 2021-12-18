import React from "react";
import './Player.css'



class Player extends React.Component{
    
    render (){
        return (
            <div className="Player">
        <div>Player  {this.props.PlayerNum}</div>
        <div>Current Score: {this.props.currentScore}</div>   
        <div>Global Score:  {this.props.globalScore}</div>
        </div>
        
            );
    }

}
export default Player;