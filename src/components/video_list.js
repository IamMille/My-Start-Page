import React from 'react';
import VideoListItem from './video_list_item';
import {List} from 'material-ui/List';


const VideoList = (props) => {
    const videoItems = props.videos.map((video)=> {
        return (
            <VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.etag}
            video={video} />
        );
    });

    return (
            <List style={{height: 280,overflowY: 'auto'}}>
                {videoItems}
            </List>
        );
    };

export default VideoList;