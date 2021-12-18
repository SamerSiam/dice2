
import React from "react";
import './Button.css'


    class Button extends React.Component{
        
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