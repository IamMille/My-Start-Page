import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Container from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class App extends Component {
    constructor(){
        super();
        this.state = {
            message: 'hello world!',
            user: {
                widgetOneSize: 1
            }
        }
    }


    render() {
        return (
            <Container muiTheme={getMuiTheme()}>
                <GridList cellHeight={500} cols={3} >
                    <GridTile  cols={3}>
                        <Header />
                    </GridTile>
                    <GridTile  cols={1}>
                        <Header />
                    </GridTile>
                    <GridTile  cols={1}>
                        <Header />
                    </GridTile>
                    <GridTile  cols={1}>
                        <Header />
                    </GridTile>
                </GridList>
            </Container>
        );
    }

}

export default App;