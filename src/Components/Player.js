import React from "react";
import './Player.css'



class Player extends React.Component{
    
    render (){
        return (
        <div className="Player">
            <div className={this.props.className}>Player  {this.props.PlayerNum}</div>
            <div className="current-score">Current Score: {this.props.currentScore}</div>   
            <div className="global-score">Total Score:  {this.props.globalScore}</div>
        </div>
        
            );
    }

}
export default Player;