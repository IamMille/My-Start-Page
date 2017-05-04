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
            information: [
                {topic: 'How to sign up', category: 'Registration', info: 'Click on the sign up button on the top right of the page. ' +
                'Then you will prompted with a dialog that asks you to ' +
                'log in with the wanted provider. Smooth.'},

                {topic: 'Make Widgify better', category: 'Charity', info: 'We are a small team trying to make a living by making applications that fits your life style. ' +
                'If you like our services we would appreciate donations so we could continue our development.'},

                {topic: 'How to change theme', category: 'Styling', info: 'You simply click on the switch on the top right of the page. Your style will be remembered ' +
                'if you are logged in'},

                {topic: 'How to hide widgets', category: 'Styling', info: 'When you are logged in an additional icon is added to the widget on the top right. ' +
                'Click on it to expose a new menu when you can choose the hide the widget.'},
                
                {topic: 'Anything else on you mind?', category: 'Contact', info: 'Do not hesitate to contact us at widgify@widgify.widgify if you have any questions' +
                ' or ideas on how to improve this site.'}
                ],
            currentInformation: ''
        }
    }

    popupAction = (index) => {
        let info;
        switch(index){
            case 0: info = this.state.information[index]; break;
            case 1: info = this.state.information[index]; break;
            case 2: info = this.state.information[index]; break;
            case 3: info = this.state.information[index]; break;
            default: info= this.state.information[index];
        }
        this.setState({currentInformation: info, popup: !this.state.popup});
    };

    close = () =>{
        this.setState({popup: false})
    };

    render() {
        let buttons = this.state.information.map((info, index)=>{return <ListItem key={`info${index}`} onTouchTap={()=>this.popupAction(index)} rightIcon={<ActionInfo />} primaryText={info.topic} secondaryText={info.category}/>});
        return (
            <Card>
                <PopupInfo popup={this.state.popup} close={this.close} info={this.state.currentInformation}/>
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
            <Dialog open={this.props.popup} titleStyle={{textAlign: 'center'}} actions={ <RaisedButton fullWidth={true}  label="Close" primary={true} onTouchTap={this.props.close}/>} title={this.props.info.topic} >
                {this.props.info.info}
            </Dialog>
        );
    }
}

export default Info;