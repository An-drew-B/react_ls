import React, { Component } from 'react';

export default class App extends Component {
 animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
  ];
  
  counter = 0;

  notMarked = this.animals.map((item, index) => index);

  constructor() {
    super();

    this.state = {
      animals: JSON.parse(JSON.stringify(this.animals)),
      halfSize: false,
      fullLoad: false
    }
  }


  componentDidMount() {   
    console.log('componentDidMount');
    

    this.removeItemInterval = setInterval(() => { 
     console.log('interval' + this.counter ++) 

     this.notMarked.length === 0 && clearInterval(this.removeItemInterval);

      const randomMunber = this.randomNumberInRange(0, this.notMarked.length - 1);

      const indexToSelect = this.notMarked[randomMunber];

      console.log('interval random ' + randomMunber +' interval index ' + indexToSelect);

      this.notMarked = this.notMarked.filter(key => key !== indexToSelect)

      this.setState(actualState => {

        return (
        {
          animals:  actualState.animals.map ((item, index) => {
            if (indexToSelect === index) {
              item['selected'] = true;
            }
            return item;
          }),
          fullLoad: this.notMarked.length === 0,
          halfSize: this.notMarked.length < this.animals.length / 2

        })}, () => {
          console.log('callback interval actualState 2 '  + this.state.animals.map((item, index) => item.selected));
          console.log('callback interval size '  + this.state.halfSize + " " + this.state.fullLoad);
        } )
    }, 2000)
  }


  randomNumberInRange (min, max) {
    return Math.floor(Math.random() 
            * (max - min + 1)) + min;
  };

  render() {
    return (
      <>
        <table border={this.state.fullLoad ? '20px' : this.state.halfSize ? '10px' : '1px'}>
          <tbody>
              { 
                  this.state.animals.map((animal, index) =>
                  <tr key ={index} bgcolor={animal.selected ? "green": "white"}>
                    <td>{animal.type}</td>
                    <td>{animal.icon}</td>
                  </tr>)
              }
          </tbody>
        </table>
      </>
    );
  }
}