import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';
const API_KEY = 'AIzaSyBT6jRu5WgEHPDx8FSOpGKvcvvv3V0qaRk';

class Note extends React.Component {
    constructor(){
        super()
        this.state = {
			text: ' '
		} 
    }
    
    
/** firebase, här lagras och hanteras textändringen som gjorts **/
    
    handleChange=(e)=>{
        this.setState({notes: e.target.value});
        firebase.database().ref(`users/${this.props.uid}/notes`).update({
           text: e.target.value
        });
    };


/** user id **/

   componentWillMount() {
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) this.updateNotes();
            else this.setState({text: ' '});
        });
    }


/** text lagras till id och uppdateras till handleChange **/

    updateNotes = () => {
            firebase.database().ref(`users/${this.props.uid}/notes`).child('text').on('value', s=>{
                this.setState({text: s.val()});
            });
        };
    
    render() {
        return <Card>
            <CardHeader title="Note" subtitle={`Make a note`}/>
            
            <TextField
              hintText="MultiLine with rows: 2 and rowsMax: 4"
              multiLine={true}
              rows={2}
              rowsMax={6}
                value={this.state.text}
                onChange={this.handleChange}
            />
        </Card>
    }
}



export default Note;



/*import React, { Component } from 'react';
import './notepad.css';
//import App from './App';
//import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Input from 'react-toolbox/lib/input';
//import MarkdownTextarea from 'react-markdown-textarea';

  
class Notepad extends React.Component {
  state = {multiline: ''};

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <section>
        
        
        <Input type='text' multiline label='Multiline' maxLength={20} value={this.state.multiline} onChange={this.handleChange.bind(this, 'multiline')} />

      </section>
    );
  }
}





export default Notepad;*/

 
/*<div class="react-markdown-textarea__textarea-wrapper" data-reactid=".0.v.1"><textarea class="react-markdown-textarea__textarea" style="display: block; resize: none; overflow: hidden; height: 169px;" rows="6" data-reactid=".0.v.1.0">jkkkk</textarea><button class="react-markdown-textarea__save-button" data-reactid=".0.v.1.1">Save</button></div>*/