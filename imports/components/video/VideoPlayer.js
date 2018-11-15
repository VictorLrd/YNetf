import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Rating } from 'semantic-ui-react'
import { Embed } from 'semantic-ui-react'

class VideoPlayer extends Component {

    state = {}

    handleRate = (e, { rating }) => this.setState({ rating })
    render () {
        const {url} = this.props
        if(url){
            return (
                
                <div>
                    <ReactPlayer url={url} playing="true" />
                    <Rating maxRating={5} clearable onRate={this.handleRate}/>
                </div>
            )
        }else{
            return(
                <h1>Vidéo Non Répertorié</h1>
            )
        }
    }
}

export default VideoPlayer