import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';


class Note extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
        firebase.database().ref(`users/${this.props.uid}/note`).update({
           text: e.target.value
        });
    };

    handleRandomWord = () => {
      fetch('https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then((res)=>{
          return res.json();
      }).then((data)=>{
          firebase.database().ref(`users/${this.props.uid}/note`).update({
              text: this.state.text + ' ' + data[0].word
          })
      });
    };

    updateNoteText = () => {
        firebase.database().ref(`users/${this.props.uid}/note`).child('text').on('value', s=>{
            this.setState({text: s.val()});
        });
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) this.updateNoteText();
            else this.setState({text: ''});
        });
    }

    render() {
        return (
            <Card>
                <CardHeader title="Make a note"  subtitle={`I will remember it for you`}/>
                <CardActions>
                    {this.props.uid?<RaisedButton label="Inject random word" onTouchTap={this.props.uid?this.handleRandomWord:null} />:<RaisedButton label="log in to use the note widget" onTouchTap={this.props.popupAction}/>}
                </CardActions>
                <CardText>
                    <TextField name='text' value={this.state.text?this.state.text:''} rows={11} rowsMax={11} fullWidth={true} multiLine={true} hintText={`what's on your mind ${this.props.uid?',': ' '} ${this.props.username}?`} onChange={this.props.uid?this.handleChange:null}/>
                </CardText>
            </Card>
        );
    }
}

export default Note;

