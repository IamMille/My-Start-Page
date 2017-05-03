import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Notepad from './Notepad'
import Info from './Info'
import Game from './Game'
import Video from './Video'
import TestData from './Test'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Container from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
injectTapEventPlugin();


class App extends Component {
    constructor(){
        super();
        this.state = {
            uid: false,
            authPopup: false,
            username: ''
        }
    }
    //handle auth

    popupAction = () => {
        this.setState({authPopup: !this.state.authPopup});
    };

    handleLogin=(e)=> {
        let provider;
        switch (e.target.innerText) {
            case 'Github': provider =  new firebase.auth.GithubAuthProvider(); break;
            case 'Google': provider =  new firebase.auth.GoogleAuthProvider(); break;
            case 'Facebook': provider =  new firebase.auth.FacebookAuthProvider(); break;
            default: provider =  new firebase.auth.TwitterAuthProvider();
        }
        firebase.auth().signInWithPopup(provider).then(this.setState({authPopup:false}));
    };

    handleSignOut=()=>{
        firebase.auth().signOut().then(function() {
            console.log('Signed out!');
        }).catch(function(error) {
            console.log(`Could't sign out!`);
            console.log(error);
        });
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
                console.log('user logged in');
                this.setState({uid: user.uid, username: user.displayName});
            } else {
                console.log('no user logged in');
                this.setState({uid: false, username: ''});
            }
        }.bind(this));

    }

    render() {
            return (
            <Container muiTheme={getMuiTheme()}>
                <Grid fluid>
                    <Dialog open={this.state.authPopup} titleStyle={{textAlign: 'center'}} actions={ <RaisedButton fullWidth={true}  label="Close" primary={true} onTouchTap={this.popupAction}/>} title="Log in with one of the following providers" >
                        <FlatButton fullWidth={true} onTouchTap={this.handleLogin}>Github</FlatButton>
                        <FlatButton fullWidth={true} onTouchTap={this.handleLogin}>Google</FlatButton>
                        <FlatButton fullWidth={true} onTouchTap={this.handleLogin}>Facebook</FlatButton>
                        <FlatButton fullWidth={true} onTouchTap={this.handleLogin}>Twitter</FlatButton>
                    </Dialog>
                    <Row around="xs"  middle="xs">
                        <Col className="widget" xs={12}>
                            <Header popupAction={this.popupAction} signOut={this.handleSignOut} uid={this.state.uid} />
                        </Col>
                        <Col className="widget " xs={12}  md={6} lg={8}>
                            <Notepad uid={this.state.uid} username={this.state.username} popupAction={this.popupAction}/>
                        </Col>

                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <Info />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <Game />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={6} lg={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={12}  md={12} lg={8}>
                            <Video />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }

}




export default App;