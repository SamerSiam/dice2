import React from "react";
import { Component } from "react/cjs/react.production.min";
import './Dice.css'

class Dice extends Component{

    renderDice(id){
        const url= `./images/${id}.png`
        return (url)
    }

    render(){

        return(
        <div className="dice-container">
        <img src= {this.renderDice(this.props.id)} 
         ref={img => this.img = img} 
         onError={() => this.img.src = './images/6.png'} 
         alt="dice roll"/>        
        </div>
        )
    }
}
export default Dice;
// 