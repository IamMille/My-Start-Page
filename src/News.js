import React, { Component } from 'react';
import './App.css';
import {Card, CardMedia, CardTitle, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import { Grid, Row, Col } from 'react-flexbox-grid';



const API_KEY = '11ac92a0bc2341b0bb01d5d43f8ad3af';

class News extends Component {

    constructor() {
        super();
        this.state = {
            providerListNames: [],
            providerListId:[],
            selectedProvider: 'bbc-news',
            selectedSortBy: 'top',
            currentResponse: ''
        }
    }

    getNews = () => {
        let url = new Request(`https://newsapi.org/v1/articles?source=${this.state.selectedProvider}&sortBy=${this.state.selectedSortBy}&apiKey=${API_KEY}`);
        fetch(url).then((res)=>{
            return res.json();
        }).then((data)=>{
            this.setState({currentResponse:data.articles});
        })
    };



    componentWillMount(){
        fetch('https://newsapi.org/v1/sources').then((res)=>{return res.json();}).then((data)=>{
            let newProviderNames = [],
            newProviderIds = [];
            data.sources.forEach(i=>{newProviderNames.push(i.name); newProviderIds.push(i.id)});
            this.setState({providerListNames: newProviderNames, providerListId: newProviderIds});
            this.getNews();
        });
    }


    render(){
        return (
            <Card>
                <CardHeader title="Top News" />
                <CardActions>
                    <AutoComplete
                        fullWidth={true}
                        floatingLabelText="search for news site"
                        hintText="ex. BBC News"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={this.state.providerListNames}
                        maxSearchResults={6}
                        onNewRequest={(string, index)=>{this.setState({selectedProvider: this.state.providerListId[index]}); this.getNews()}}
                    />
                </CardActions>
                <DisplayNews news={this.state.currentResponse}/>
            </Card>
        );
    }
}

class DisplayNews extends Component {
    render(){
        const news = this.props.news ? this.props.news:  false,
            media = this.props.news ? news.map((article, index)=>{
            return <Col style={{paddingTop: 10}} xs={12} lg={6} key={`arictle${index}`}>
            <CardMedia>
                <img style={article.urlToImage? {height: '100%'}: {height:270}} src={article.urlToImage} alt={article.description}/>
            </CardMedia>
            <CardTitle  title={article.title} subtitle={article.publishedAt} >
                <RaisedButton style={{marginTop: 10}} href={article.url} target="_blank" fullWidth={true} label="Read More"/>
            </CardTitle>
            </Col>
            }): <p>Not currently available. Try another one.</p>;
        return(
            <Grid fluid style={{overflowY: 'auto', height: 300}}>
                <Row bottom='xs'>
                    {media}
                </Row>
            </Grid>
        );
    }
}


export default News;