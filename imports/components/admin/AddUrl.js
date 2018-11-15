import React, {Component} from 'react'
import { Form, Button,Container } from 'semantic-ui-react'
import { Mongo } from 'meteor/mongo'

export default class AddUrl extends Component {
    state = {
        rate : 0,
        nb_rate : 0,
        description : "",
    }

    onSubmit = () => {
        if(this.state.url){
            //const videos = new Mongo.Collection('videos');
            //videos.insert({url: this.state.url, description: this.state.description, rate: 0, nb_rate: 0})
           console.log(this.state.url)
            Meteor.call('video.insert', this.state.url,this.state.description,this.state.title,this.state.categorie, (error, result) => {
                if(error){
                    alert('Erreur', error)
                }else{
                    alert('Tout est bon')
                }
            })
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    render(){
        const {url, description, categorie,titre} = this.state

        return(
            <Container>
            <Form onSubmit={this.onSubmit}>
            <Form.Group>
                    <Form.Input
                        placeholder="Titre"
                        type="text"
                        name="titre"
                        value={titre}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        placeholder="Url de la vidéo"
                        type="text"
                        name="url"
                        value={url}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        placeholder="Description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        placeholder="Categorie"
                        type="text"
                        name="categorie"
                        value={categorie}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Button size="mini">Ajouter cette vidéo</Button>
                </Form.Group>
            </Form>
            </Container>
        )
    }
}