import {Meteor} from 'meteor/meteor'
import Video from './video'


Meteor.methods({
    'users.signup'({email, password}){
        Accounts.createUser({email, password})
    },
    'users.remove'(user_id){
        Meteor.users.remove({_id: user_id})
    }
})


Meteor.methods({
    'video.insert'(url, description, title, categorie){
        Video.insert({title: title, url: url, description: description,categorie: categorie, rate: 0, nb_rate: 0, nb_view : 0})
    }
})