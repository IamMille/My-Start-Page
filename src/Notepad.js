import React, { Component } from 'react';
import './App.css';
    import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



class Notepad extends Component {

    render() {
        return (
            <Card className="App">
                <CardHeader
                    title="Notepad"
                    subtitle="Remember stuff forever"
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardActions>
                    <FlatButton onClick={this.props.randomWord}>Generate random word</FlatButton>
                </CardActions>
                <CardText expandable={false}>
                    <textarea cols="30" rows="10" onChange={this.props.handleChange} value={this.props.data.text}></textarea>
                </CardText>
            </Card>
        );
    }
}

export default Notepad;
