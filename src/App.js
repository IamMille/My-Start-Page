import React, { Component } from 'react';
import './App.css';
import theme from ‘material-ui/styles/getMuiTheme’;
import Container from ‘material-ui/styles/MuiThemeProvider’;
import injectTapEventPlugin from ‘react-tap-event-plugin’;

injectTapEventPlugin();


class App extends Component {
  render() {
    return (
      <Container muiTheme={theme}>
          <Card>
            <CardHeader
                title="Notepad"
                subtitle="Remember stuff forever"
                actAsExpander={false}
                showExpandableButton={false}
            />
            <CardActions>
              <FlatButton}>Generate random word</FlatButton>
          </CardActions>
          <CardText expandable={false}>
            <TextField></TextField>
          </CardText>
        </Card>
      </Container>
    );
  }
}

export default App;
