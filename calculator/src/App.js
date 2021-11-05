import React from 'react';
import './App.css';

const number=[7,8,9,4,5,6,1,2,3];
const ops=['/','*','-','+']
const num=['/','*',7,8,9,'-',4,5,6,'+',1,2,3]
const index={
  '/':'divide',
  '*':'multiply',7:'seven',8:'eight',9:'nine','-':'minus',4:'four',5:'five',6:'six','+':'add',1:'one',2:'two',3:'three'
}
class App extends React.Component{
  state={
    currentInput:'0',
    displayResult:'0'
  }
  handleClick=(e)=>{
    // e.target.innerText gets innerText of button clicked
    const {innerText}=e.target
    const {currentInput}=this.state

    switch(innerText){
      case "=":{
        let evaluated=eval(currentInput) //eval is a method that evaluates numbers given we are giving whatever clicked which we are taking in default case
        this.setState({
          currentInput:evaluated,
          displayResult:evaluated
        })
        
        this.setState({
          currentInput:evaluated + "", //nothing will work unless cleared after clicking = so joining with empty string so after result also you can further calculate 
        })
        break
      }

      case "AC":{
        this.setState({
          currentInput:'0',//clear all
          displayResult:'0'
        })
        break;
      }
      case "C":{
        let slicing=currentInput.slice(0,-1)//to delete last element slice from 0 leaving last element
        this.setState({
          currentInput:slicing,
         
        })
        break;
      }
      case ".":{
        let decimalSlice=currentInput.split(/[\+\*\-\/]/)//to split where ever these operators match instead of spliting each element as we want to allow one (.) for every num and after using operators one(.)
        let last=decimalSlice.slice(-1)[0] //slice gives copy of new array we want last num found and access [0](remove from array get ex:9 and not [9])
        if(!last.includes('.')) //if the last num includes (.) then add one (.)
        this.setState({
          currentInput:currentInput+'.'
        })
        break;
      }
      default:{
        let def;
        if(ops.includes(innerText)){ //if innerText is operator
          if(ops.includes(innerText) && innerText!=='-'){ //if innerText is operator excluding '-'
            let last=currentInput.split('').reverse().findIndex(item=>number.includes(+item)) //we want to find at last first number so we can allow only one operator 
            //split it and reverse as findIndex finds the first index but we want from last 1st index and condition of findIndex is if item is number(number.includes(+item))
            //substract index of num found at last from total length of input it removes all operators then add innerText so only one operator works at a time  
            def=currentInput.slice(0,currentInput.length-last)+innerText
          }else{
           def=currentInput+innerText// if one operator and '-' then keep concatinating   
           
          }
        }else{
          def=currentInput=='0'?innerText:currentInput+innerText //on first click of anything 1st condition i.e., if will be executed as we kept state currentInput==0
          //ex: if 8 is entered it would become 01 with currentInput+innerText here as initial currentInput=0 only innerText wiil be displayed as 8(not 08) 
          //from 2nd num/operator entered else will run(currentInput+innerText)
          //if 0 is entered first 0(innerText) will be displayed and currentInput becomes 0, again if 0 is pressed again currentInput is 0 again 0(innerText) will be displayed initially not more than 1 zero is displayed
        }
        this.setState({
          lastPressed:innerText,
          currentInput:def,
          
          
        })
      
      }
    }
  
    
  }

  render(){
    const {displayResult,currentInput}=this.state
    return(
      <div className="container">
        <div className="grid">
        <div className="display">
          <input value={currentInput} disabled/>
          <div id="total">{displayResult}</div>
        </div>
        <button className="clear padButton red" onClick={this.handleClick}>AC</button>
        <button className="backspace padButton red" onClick={this.handleClick}>C</button>
        {num.map(item=><button key={index[item]} className={`${index[item]} padButton`} onClick={this.handleClick}>{item}</button>)}
        <button className="equals padButton" onClick={this.handleClick}>=</button>
        <button className="zero padButton" onClick={this.handleClick}>0</button>
        <button className="decimal padButton" onClick={this.handleClick}>.</button>
      </div>
     </div>
    )
  }
}


export default App;
