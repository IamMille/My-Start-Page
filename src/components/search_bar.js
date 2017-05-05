import React, {Component} from 'react';
import TextField from 'material-ui/TextField';


class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = { term: ''};
        
    }
    onInputChange = (term) =>{
        this.setState({term});
        this.props.onSearchTermChange(term);
    };

    render(){
         return (
             <TextField value={this.state.term} hintText="search for video" fullWidth={true} onChange={(event)=>this.onInputChange(event.target.value)}/>
         );
    }
}



export default SearchBar;