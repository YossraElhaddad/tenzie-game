import React from 'react';
import Confetti from 'react-confetti';
import Die from './components/Die';
import Tenzie from './components/Tenzie';
import { nanoid } from 'nanoid';

export default function App() {

    function generateRandomValues() {
        return Math.ceil(Math.random() * 6);
    }

    function initializeDiceValues() {
        const diceValues = [];
        for (let i = 0; i < 10; i++) {
            diceValues.push({
                id: nanoid(),
                value: generateRandomValues(),
                held: false
            });
        }
        return diceValues;
    }

    
    const [dice, setDice] = React.useState(initializeDiceValues());
    const [tenzie, setTenzie] = React.useState(false);

 //Render the app every time the die changes
    React.useEffect(()=>{
     const value = dice[0].value;
     const allHeld = dice.every((die) => die.held);
     const allsameNumber = dice.every((die) => die.value === value);

     if(allHeld && allsameNumber)
         setTenzie(true);
    
    }, [dice]);



    function holdDie(id) {
        setDice(oldDice => (oldDice.map((die) => (die.id === id ? { ...die, held: !die.held } : die))));
    }

    const dieElements = dice.map((die) => <Die key={die.id} {...die} holdDie={() => holdDie(die.id)} />);

 function rollUnheldDice(){
    if(!tenzie){
        setDice(oldDice => oldDice.map((die)=> die.held ? die : {...die, value: generateRandomValues()}))
    }
    else{
        setDice(initializeDiceValues());
        setTenzie(false);
    }
 }

    return (
        <main className='App'>
            {tenzie && <Confetti />}
            <Tenzie />
            <div className='dice-container'>
                {dieElements}
            </div>
        <button
        onClick={rollUnheldDice} 
        >
            {tenzie ? "Play again" : "Roll"}</button>
        </main>
    );
}