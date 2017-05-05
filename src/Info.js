import React, { Component } from 'react';
import './App.css';
import {Card, CardHeader} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false,
            buttons: [{topic: 'How to sign up', category: 'Registration'},{topic: 'Make Widgify better', category: 'Charity'},{topic: 'How to change theme', category: 'Styling'},{topic: 'How to hide widgets', category: 'Styling'},{topic: 'Anything else on you mind?', category: 'Contact'}]
        }
    }

    popupAction = (e) => {
        this.setState({popup: !this.state.popup});
    };

    render() {
        let buttons = this.state.buttons.map((button, index)=>{return <ListItem key={`info${index}`} onTouchTap={this.popupAction} rightIcon={<ActionInfo />} primaryText={button.topic} secondaryText={button.category}/>});
        return (
            <Card>
                <PopupInfo popup={this.state.popup} popupAction={this.popupAction}/>
                <CardHeader title="Information"  actAsExpander={false} showExpandableButton={false}/>
                <List>
                    {buttons}
                </List>
            </Card>
        );
    }
}

class PopupInfo extends Component {
    render(){
        return(
            <Dialog open={this.props.popup} titleStyle={{textAlign: 'center'}} actions={ <RaisedButton fullWidth={true}  label="Close" primary={true} onTouchTap={this.props.popupAction}/>} title="How to do that thing" >
                <p>Turn it off and on again</p>
            </Dialog>
        );
    }
}

export default Info;