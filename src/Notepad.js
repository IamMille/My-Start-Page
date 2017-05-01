import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';


class Notepad extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
        firebase.database().ref(`users/${this.props.uid}/notepad`).update({
           text: e.target.value
        });
    };

    handleRandomWord = () => {
      fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then((res)=>{
          return res.json();
      }).then((data)=>{
          firebase.database().ref(`users/${this.props.uid}/notepad`).update({
              text: this.state.text + ' ' + data[0].word
          })
      });
    };

    updateNotepadText = () => {
        firebase.database().ref(`users/${this.props.uid}/notepad`).child('text').on('value', s=>{
            this.setState({text: s.val()});
        });
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) this.updateNotepadText();
            else this.setState({text: ''});
        });
    }

    render() {
        const injectButton = this.props.uid?<RaisedButton label="Inject random word" onTouchTap={this.handleRandomWord} />:<RaisedButton label="log in to use additional functions"  />;
        return (
            <Card>
                <CardHeader title="Notepad" subtitle="Type whatever is on you mind"/>
                <CardActions>
                    {injectButton}
                </CardActions>
                <CardText>
                    <TextField name='text' value={this.state.text} rows={11} rowsMax={11} fullWidth={true} multiLine={true} hintText="what's on you mind?" onChange={this.handleChange}/>
                </CardText>
            </Card>
        );
    }
}

export default Notepad;