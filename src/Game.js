import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class Game extends Component
{
  constructor() {
    super(...arguments);

    this.state = {
      numPins: 20,
      numSelectedPins: 0,
      isGameStarted: false,
      isUserTurn: null,
      statusMsg: "Wanna play a game?"
    };

    this.handlePinClick = this.handlePinClick.bind(this);
  }

  render() {

    const { isGameStarted,
            isUserTurn,
            numSelectedPins } = this.state;

    return <Card>
      <CardHeader
          title="Game Widget"
          subtitle={this.state.statusMsg}
          actAsExpander={false}
          showExpandableButton={false}
      />
      <CardActions >
        
        { !isGameStarted
          ? <RaisedButton label="Start game" onClick={this.handleStartgameClick.bind(this)} />
          : "" }

        { isGameStarted && isUserTurn === null
          ? <span>
              <RaisedButton label="Yes" onClick={this.handleWhostartsClick.bind(this)} />
              <RaisedButton label="No" onClick={this.handleWhostartsClick.bind(this)} />
            </span>
          : "" }

        { isGameStarted && isUserTurn !== null && numSelectedPins === 0
          ? <RaisedButton label="Restart game" onClick={this.handleRestartgameClick.bind(this)} />
          : "" }

        { numSelectedPins > 0
          ? <RaisedButton label="Remove selected pins" />
          :"" }

      </CardActions>


      <CardText expandable={false}>

        { isGameStarted && isUserTurn !== null
          ? [...Array(20)].map( (e,i) =>
              <Pin key={i} handlePinClick={this.handlePinClick} /> )
          : ""
        }

      </CardText>

    </Card>;
  }

  handleStartgameClick(e) {
    this.setState({
      isGameStarted: true,
      statusMsg: "Would you like to be the start player?"
    })
  }
  handleWhostartsClick(e) {

    if (e.target.innerText === "YES")
      this.setState({
          isUserTurn: true,
          statusMsg: "You begin..."
      });

    else if (e.target.innerText === "NO")
      this.setState({
          isUserTurn: false,
          statusMsg: "Computer picks..."
      });
  }

  handleRestartgameClick(e) {
    this.setState({
      isGameStarted: false,
      isUserTurn: null,
      numPins: 20,
      numSelectedPins: 0,
      statusMsg: "Do you wanna play again?"
    })
  }



  handlePinClick(e) {
    const {isUserTurn, numSelectedPins} = this.state;

    if (!isUserTurn) return;
    else if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      this.setState({ numSelectedPins: this.state.numSelectedPins - 1});
    }
    else {
      if (numSelectedPins === 3) { alert("Max 3"); return; };
      e.target.classList.add("selected");
      this.setState({ numSelectedPins: this.state.numSelectedPins + 1});
    }
  }

  handleTxtStatusMsg(msg) {
    this.setState({
      txtStatusMessage: msg
    });
  }

}

class Pin extends Component
{
  render() {
    return <div className="pin"
                onClick={this.props.handlePinClick}>|</div>;
  }

}

/*class TxtStatus extends Component
{
  render() {
    return <p>
      {this.props.message}
    </p>;
  }
}*/

export default Game; //<-- Remember to export it
