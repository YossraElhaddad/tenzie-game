import React from 'react';

export default function Die(props){

    return(
        <div className={`die ${props.held ? "held" : "unheld"}`}
        onClick={props.holdDie}
        >
            {props.value}
        </div>
    )
}