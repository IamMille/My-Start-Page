import React, {Component} from 'react';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';



class Video extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("Miike Snow - Genghis Khan");
    }

    videoSearch = (term) =>{
        const API_KEY = 'AIzaSyCQMSAf-4GdhWVd8YrSC43s-OskR0GzT98';
        YTSearch({key: API_KEY, term:term}, (videos)=>{
            this.setState({
                videos: videos,
                selectedVideo:videos[0]
            });
        });

    };
    render() {
        const videoSearch=(term)=>{this.videoSearch(term)};

        return (
            <Card>
                <CardHeader title="Video"/>
                <CardActions>
                    <SearchBar onSearchTermChange={videoSearch} />
                </CardActions>
                <CardMedia style={{width:'95%', margin:'0 auto'}}>
                    <Grid>
                        <Row>
                            <Col xs={8}>
                                <VideoDetail video={this.state.selectedVideo}/>
                            </Col>
                            <Col xs={4}>
                                Search results:
                                <VideoList onVideoSelect={selectedVideo=>this.setState({selectedVideo})} videos={this.state.videos}/>
                            </Col>
                        </Row>
                    </Grid>
                </CardMedia>


            </Card>
        );
    }}

export default Video