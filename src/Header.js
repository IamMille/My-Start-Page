import React, { Component } from 'react';
import './App.css';
import {Card, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
    constructor(){
        super();
        this.state = {
            text: 'Hello Word'
        }
    }
    render() {
        return (
            <Card style={{height: '490px'}}>
                <AppBar
                    title="Widgify"
                    iconElementRight={<FlatButton label="Login"/>}
                />
                <CardText>
                    <FlatButton label='update'/>
                </CardText>
            </Card>
        );
    }
}

export default Header;