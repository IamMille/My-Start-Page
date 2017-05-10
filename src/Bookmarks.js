import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';

import * as firebase from 'firebase';


class Bookmarks extends React.Component
{
  constructor()
  {
    super(...arguments);
    this.state = {
      message: "Why not save some bookmarks?",
      userInput: "",
      userInputError: "",
      bookmarks: {}
    }
  }

  componentWillMount()
  {
    firebase.auth().onAuthStateChanged((user) =>
    {
      if (!user) return;

      const rootRef = firebase.database().ref(`users/${user.uid}/bookmarks`);

      rootRef.child("hasBeenUsed").once('value', snap =>
      {
        if (snap.exists()) return;

        var newKey = () => rootRef.child('items').push().key;
        var updates = {
          [newKey()]: {url: "http://www.facebook.com"},
          [newKey()]: {url: "http://firebase.google.com"},
          [newKey()]: {url: "http://www.github.com"},
          [newKey()]: {url: "http://stackoverflow.com"}
        };

        rootRef.set({ hasBeenUsed: true });
        rootRef.child("items").update(updates);
      });

      rootRef.child("items").off('value');
      rootRef.child("items").on('value', snap =>
      {
        this.setState({bookmarks: snap.val() || {}});
      });

    });

  }

  handleAdd(e)
  {
    const {uid} = this.props
    const {userInput, userInputError} = this.state;

    if (!uid) return;
    if (!userInput) return;
    if (userInputError) return;

    var newItem = {
      url: userInput,
      title: "",
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    firebase.database()
      .ref(`users/${uid}/bookmarks`)
      .child("items").push(newItem);
  }

  handleChange(e)
  {
    const val = e.target.value;
    const validateURL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    var newState = {userInput: val};

    if (val === "" || validateURL.test(val))
      newState.userInputError = ""
    else
      newState.userInputError = "Invalid URL!"

    this.setState(newState);
  }

  render() {
    const {uid, popupAction} = this.props;
    const {userInput, userInputError, bookmarks} = this.state;

    return <Card>
      <CardTitle
          title="Bookmarks"
          subtitle={this.state.message}
      >
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Order by name" />
          <MenuItem primaryText="Order by added" />
        </IconMenu>
    </CardTitle>
    <CardActions>
      <List>
        <ListItem>
          <TextField hintText="Enter an URL"
            style={{width: 230}}
            value={userInput}
            errorText={userInputError}
            onChange={this.handleChange.bind(this)}
          />
          <RaisedButton label="Add"
            onClick={this.handleAdd.bind(this)}
          />
        </ListItem>
      </List>
    </CardActions>

      <CardText>
        <List>

        { !uid
          ? <ListItem>
              <RaisedButton label="Log in to use this widget" onTouchTap={popupAction} />
            </ListItem>

          : Object.keys(bookmarks).reverse().map(k =>
            {
              const title = bookmarks[k].title
                            ? bookmarks[k].title
                            : bookmarks[k].url.replace(/^https?:\/\/(?:www\.)?/i, "");

              return <ListItem key={k}
                insetChildren={true}
                style={{overflow:"hidden"}}
                primaryText={title}
                leftIcon={<Favicon url={bookmarks[k].url} />}
                rightIcon={<Delete id={k} color="white" hoverColor="#757575"
                                   onClick={() => this.handleDelete(k)} />}
              />
          })
        }

        </List>
      </CardText>
    </Card>;
  }

  handleDelete(id)
  {
    const {uid} = this.props;
    if (!uid) return;
    console.log(id);
    firebase.database()
      .ref(`users/${uid}/bookmarks/items`)
      .child(id).set(null);
  }
}

class Favicon extends React.Component
{
  render() {
    const {url} = this.props;
    const style = {
      position: 'absolute',
      top: 8,
      left: 8,
      height: 32,
      width: 32,
    };

    return <img alt={url} style={style}
      src={"http://www.google.com/s2/favicons?domain=" + url}
    />
  }
}

export default Bookmarks;
