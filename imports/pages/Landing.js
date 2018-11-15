import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Button, Container, Fragment } from 'semantic-ui-react'
import UserPartial from '/imports/components/users/UserPartial'
import VideoPlayer from '/imports/components/video/VideoPlayer'


class Landing extends Component {
    state = {

    }


    render(){
        const {users} = this.props
        return(
            <div>
                <Container>
                        {users.map(user => <UserPartial user={user}/>)}
                        {users.map(user => <VideoPlayer url='https://www.youtube.com/watch?v=rzA8aCl9ZJk'/>)}
                </Container>
            </div>
        )
    }

}

export default LandingContainer = withTracker(() => {
    const usersPublication = Meteor.subscribe('users.all')
    
    const videoAll = Meteor.subscribe('video.all')
    console.log("video",Meteor.subscribe('video.all'))
    
    const users = Meteor.users.find().fetch()
    console.log("user",users)
    return {
        users,
        videoAll
    }
})(Landing)