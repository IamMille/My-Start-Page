import React, { Component } from 'react';
import './App.css';
import Notepad from './Notepad'
import * as firebase from 'firebase';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Container from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class App extends Component {
  constructor(){
    super();
    this.state = {
      notepad: {
        text: ''
      }
    }
  }

  componentDidMount(){
    const notepad = this.state.notepad
    , rootRef = firebase.database().ref().child('react')
    , textRef = rootRef.child('text');
    textRef.on('value', s=>{
      notepad.text = s.val();
      this.setState({notepad});
    });
  }

  notepad_randomWord = () => {
      fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=d4f5df6c287508dce112b0d14b50d03381b0dd60b3dcf1ad3').then((res)=>{return res.json()}).then((data)=>{
          const notepad = this.state.notepad;
          notepad.text += ' ' + data[0].word;
          firebase.database().ref('react/').update({text: notepad.text});
      }).catch((err)=>{console.log(err);});

  };


  notepad_handleChange = (e) => {
    const notepad = this.state.notepad;
    notepad.text = e.target.value;
      firebase.database().ref('react/').update({
          text: notepad.text
      });
  };

  render() {
    return (
        <Container muiTheme={getMuiTheme()}>
          <Notepad data={this.state.notepad} handleChange={this.notepad_handleChange} randomWord={this.notepad_randomWord}/>
        </Container>
    );
  }
}

export default App;
