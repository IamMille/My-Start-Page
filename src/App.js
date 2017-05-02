import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import TestData from './Test'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Container from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
                <Grid>
                    <Row>
                        <Col className="widget" xs={12}>
                            <Header />
                        </Col>
                    </Row>
                    <Row around="xs">
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                        <Col className="widget" xs={4}>
                            <TestData />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }

}

export default App;