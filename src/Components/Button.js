import { compose } from "async";
import React from "react";
import { Component } from "react/cjs/react.production.min";
import './Button.css'


    class Button extends React.Component{
        constructor(props){
            super(props)
        };
        onHandleClick=()=>{
       this.props.onHandleClick()
        }


        render (){
            return (
                <div className="button">
                <button  className='ui inverted olive button'onClick={this.onHandleClick}> {this.props.text} </button>
                </div>
                );
        }
    }
    export default Button;