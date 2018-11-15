import {Meteor} from 'meteor/meteor'
import Video from './video'

Meteor.publish('users.all', function(){
    return Meteor.users.find({},{limit: 10000, sort:{}})
})

Meteor.publish('video.all', function(){
    console.log("je passe la")
    return Video.find()
})