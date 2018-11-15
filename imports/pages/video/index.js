import React, { Component } from 'react'
import VideoPlayer from '../../components/video/VideoPlayer'
import { Button, Container } from 'semantic-ui-react'

class Video extends Component {
    
    render () {
        console.log(this.props.match.params.id)
        return (
            <Container>
                <VideoPlayer url='https://www.youtube.com/watch?v=WOeHsQ7q3nw'/>
            </Container>
        )
    }
}

export default Video