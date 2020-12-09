import React, { Component } from 'react';
import { Button, Jumbotron } from 'reactstrap';
import './controlButtons.css';
class ControlButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: [],
      amount: 0,
      promises: 0,
    }
    this.increaseEatenDonutsAmount = this.increaseEatenDonutsAmount.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.increasePromisedDonutsAmount = this.increasePromisedDonutsAmount.bind(this);
    this.resetPromiseCounter = this.resetPromiseCounter.bind(this);
  }

  weekdays = {'Mon': 'Maanantaina', 
              'Tue': 'Tiistaina',
              'Wed': 'Keskiviikkona',
              'Thu': 'Torstaina',
              'Fri': 'Perjantaina',
              'Sat': 'Lauantaina',
              'Sun': 'Sunnuntaina'};
  
  getDonut() {
    fetch('/getDonut')
    .then((res) => res.json())
    .then((donut) => {
      this.setState({date: donut[0].date.split(' '), amount: donut[0].amount});
    });
  }

  getPromise() {
    fetch('/getPromise')
    .then((res) => res.json())
    .then((promises) => {
      this.setState({promises: promises[0].amount});
    })
  }

  increaseEatenDonutsAmount() {
    fetch('/increaseAmount', {
      method: 'post'
    })
    .then(() => {
      this.getDonut();
    });
  }

  increasePromisedDonutsAmount() {
    fetch('/increasePromiseAmount', {
      method: 'post'
    })
    .then(() => {
      this.getPromise();
    });
  }

  resetCounter() {
    fetch('/resetCounter', {
      method: 'post'
    })
    .then(() => {
      this.getDonut();
    })
  }

  resetPromiseCounter() {
    fetch('/resetPromiseCounter', {
      method: 'post'
    })
    .then(() => {
      this.getPromise();
    })
  }
  
  componentWillMount(){
    this.getDonut();
    this.getPromise();
  }

  render() {
    setTimeout(() => {
      window.location.reload();
    }, 600000);
    
    return (
      
        <Jumbotron>
          <h1 className="display-2">Syödyt munkit: {this.state.amount}</h1>
          <h1 className="display-2">Luvatut munkit: {this.state.promises}</h1>
          <p className="lead">Edellinen munkki syötiin {this.weekdays[this.state.date[0]]} {this.state.date[4]}!</p>
          <hr className="my-2" />
          <Button color="success" className="btn-lg" style={{marginRight:'10px', marginTop:'10px'}}
           onClick={() => {this.increaseEatenDonutsAmount();}}
          >
          Söin munkin!</Button>
          <Button color="danger" className="btn-lg" style={{marginRight:'10px', marginTop:'10px'}}
           onClick={() => {this.resetCounter();}}
          >
          Nollaa laskuri</Button>
          <Button color="info" className="btn-lg" style={{marginRight:'10px', marginTop:'10px'}}
           onClick={() => {this.increasePromisedDonutsAmount();}}
          >
          Lupasin syödä yhden lisää!</Button>
          <Button color="danger" className="btn-lg" style={{marginTop:'10px'}}
           onClick={() => {this.resetPromiseCounter();}}
          >
          Nollaa lupaukset</Button>
        </Jumbotron>
    )
  }
}

export default ControlButtons